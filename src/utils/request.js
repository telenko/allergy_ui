import axios from 'axios';
import { ABORT_REQUEST } from './symbols';

export const perform = (method, url, config={}) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const call = axios[method](url, {
        cancelToken: source.token,
        ...config
    });
    call[ABORT_REQUEST] = () => {
        source.cancel();
    }
}

export const fetchAllergens = async () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const resp = await axios.get('/allergens');
    resp[ABORT_REQUEST] = () => {
        source.cancel();
    }
    return resp;
}