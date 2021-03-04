import axios from 'axios';

export const fetchPersons = async () => {
    const resp = await axios.get('/api/persons');
    return resp.data;
}