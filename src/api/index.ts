import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000 * 60 * 2, // 3 minutes
});
    
const getToken = () => {
    return localStorage.getItem('token');
}

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)