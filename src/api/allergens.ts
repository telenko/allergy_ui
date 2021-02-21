import axios from 'axios';

export const fetchAllergens = async () => {
    const resp = await axios.get('/allergens');
    return resp.data;
}