import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Set config defaults when creating the instance
const instance: AxiosInstance = axios.create({
    baseURL: 'https://souvi-be-v1.onrender.com',
});
instance.defaults.withCredentials = true;

// Add a request interceptor
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Lấy token mới nhất từ localStorage
        const access_token = localStorage.getItem('access_token');

        if (access_token) {
            config.headers['Authorization'] = `Bearer ${access_token}`;
        }

        // Do something before the request is sent
        return config;
    },
    (error) => {
        // Do something with the request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Any status code that lies within the range of 2xx causes this function to trigger
        // Do something with response data
        return response.data;
    },
    (error) => {
        // Any status codes that fall outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default instance;
