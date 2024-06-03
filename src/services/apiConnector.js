import axios from 'axios';

// Create an axios instance
export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true, // Ensure credentials (cookies) are sent if required
});

// API connector function
export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: method,
        url: url,
        data: bodyData || null,
        headers: headers || null,
        params: params || null,
    });
};
