import axios from 'axios';

export const fetchAllergens = async () => {
    const resp = await axios.get('/api/allergens');
    return resp.data;
}