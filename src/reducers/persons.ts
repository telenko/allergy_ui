import type { PersonI } from '../types/persons';
import type { PersonAction } from '../actions/persons';
import { PERSONS } from '../actions/persons';

export interface PersonState {
    list: PersonI[],
    pending: boolean,
    error: Error | null
}

const initialState: PersonState = {
    list: [],
    pending: false,
    error: null
}

export const persons = (state:PersonState=initialState, action: PersonAction): PersonState => {
    switch (action.type) {
        case PERSONS.FETCH_START: {
            return {
                ...state,
                pending: true
            };
        }
        case PERSONS.FETCH_SUCCESS: {
            return {
                ...state,
                error: null,
                pending: false,
                list: action.payload
            };
        }
        case PERSONS.FETCH_FAILED: {
            return {
                ...state,
                pending: false,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
}