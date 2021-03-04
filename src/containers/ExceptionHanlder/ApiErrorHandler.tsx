import axios from 'axios';
import { useCallback, useEffect, useReducer } from 'react';
import Fade from '@material-ui/core/Fade';
import { Alert } from '@material-ui/lab';
import { customizeItem, deleteItem } from '../../utils/immutable';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

interface ApiError extends Error {
    id: number
    status: number
    timedOut: boolean
}

let COUNTER = 0;

type ApiErrorAction = {type: "PUSH" | "RELEASE" | "TIMEOUT", payload: ApiError};

let callbacks: ((e:Error)=>void|boolean)[] = [];

const runCallbacks = (error: Error) => {
    for (let callback of callbacks) {
        const resp = callback(error);
        if (!resp) {
            return;
        }
    }
};

axios.interceptors.response.use(response => response, (error: Error) => {
    runCallbacks(error);
    return Promise.reject(error);
});

export const useApiErrorCallback = (cb: (e:Error)=>void|boolean): void => {
    useEffect(() => {
        if (callbacks.includes(cb)) {
            return;
        }
        callbacks = [cb, ...callbacks];

        return () => {
            callbacks = deleteItem(callbacks, cb);
        };
    }, []);
}

const apiErrorReducer = (errors: ApiError[], action: ApiErrorAction): ApiError[] => {
    switch (action.type) {
        case "PUSH": {
            action.payload.id = ++COUNTER;
            return [action.payload, ...errors];
        }
        case "RELEASE": {
            return deleteItem<ApiError>(errors, action.payload);
        }
    }
    return errors;
}



const ApiErrorHandler: React.FC = () => {//TODO fade out
    const timeout = useSelector<RootState, number>(state => state.gui.alertTimeout);
    const [errors, dispatch] = useReducer(apiErrorReducer, []);
    const errorCallback = useCallback((error: Error) => {
        dispatch({ type: "PUSH", payload: error as ApiError});
        setTimeout(() => {
            dispatch({ type: "RELEASE", payload: error as ApiError});
        }, timeout);
    }, []);
    useApiErrorCallback(errorCallback);
    
    return <>
            {errors.map((error: ApiError) => (
                // <Fade in={error.timedOut} key={error.id}>
                    <Alert key={error.id}
                           severity="error"
                           onClose={() => dispatch({ type: "RELEASE", payload: error })}>
                               {error.message}
                    </Alert>
                // </Fade>
            ))}
        </>;
}

export default ApiErrorHandler;