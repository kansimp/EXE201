import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Set config defaults when creating the instance
const instance: AxiosInstance = axios.create({
    baseURL: 'https://souvi-be-v1.onrender.com',
});
instance.defaults.withCredentials = true;

// Hàm để refresh token
const refreshToken = async () => {
    try {
        const refresh_token = localStorage.getItem('refresh_token');
        if (!refresh_token) {
            throw new Error('No refresh token found');
        }

        // Gọi API để refresh token
        const response = await axios.post(
            'https://souvi-be-v1.onrender.com/auth/refresh-token',
            {},
            {
                headers: {
                    Authorization: `Bearer ${refresh_token}`,
                },
            },
        );

        const access_token = response.data.data.access_token;

        // Lưu lại access token mới và thời gian hết hạn nếu cần
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', response.data.data.refresh_token);

        return access_token;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        // Nếu refresh token thất bại, có thể chuyển người dùng đến trang đăng nhập hoặc thông báo lỗi
        return null;
    }
};

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
    async (error) => {
        const originalRequest = error.config;

        // Nếu lỗi là 401 và chưa thử refresh token
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Đánh dấu request này là đã thử refresh token

            // Gọi hàm refresh token
            const newToken = await refreshToken();

            if (newToken) {
                // Cập nhật token mới vào header và retry request gốc
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return axios(originalRequest); // Gửi lại request ban đầu với token mới
            } else {
                // Refresh token thất bại, có thể redirect đến trang đăng nhập hoặc xử lý khác
                return Promise.reject(error);
            }
        }

        // Any status codes that fall outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default instance;
