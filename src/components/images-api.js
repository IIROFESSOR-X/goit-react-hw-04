import axios from "axios";
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://api.unsplash.com/';

export const fetchImages = async (searchQuery, page) => {
    const accessKey = 'PAkOFV46TDL2tAhwdIk4TDzaP7RT3Nhx6tyEaOvJQ54'; 

    try {
        const response = await axios.get("/search/photos", {
            params: {
                query: searchQuery,
                page: page,
                per_page: 12,
                orientation: 'landscape',
            },
            headers: {
                Authorization: `Client-ID ${accessKey}`, 
                'Accept-Version': 'v1'
            },
        });
        return response.data.results;
    } catch (error) {
        toast.error('An error occurred while fetching images.');
        throw error;
    }
};
