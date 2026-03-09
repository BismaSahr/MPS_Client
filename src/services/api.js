import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pv-backend-1zb3.onrender.com/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
});

export default api;
