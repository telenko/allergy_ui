import axios from 'axios';
import type { IncidentI } from '../types';

export const createIncident = (incident: IncidentI): Promise<any> => {
    return axios.post('/api/incidents', incident);
}

export const fetchTypes = async () => {
    const resp = await axios.get('/api/types/states');
    return resp.data;
}