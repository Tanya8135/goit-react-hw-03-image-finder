import axios from "axios";

const API_URL = `https://pixabay.com/api/`;
const API_KEY = '35960524-5bd2480db88a553ddbd2d768d';

const HTTPClient = axios.create({
    baseURL: API_URL,
})

export async function fetchImages(query, page = 1) {
    try {
        const resp = await HTTPClient.get('', {
            params: {
                key: API_KEY,
                q: query,
                page: page,
                per_page: 12,
                image_type: 'photo',
                orientation: 'horizontal',
            },
        });

        const images = resp.data.hits;
        return images;
    } catch (err) {
        console.error('Error fetching images:', err);
        return [];
    }
}