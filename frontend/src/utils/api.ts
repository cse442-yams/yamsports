import axios from 'axios';
import {authStore} from "../auth/AuthStore";

const authorized_api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        "Content-Type": "application/json"
    }
});

authorized_api.interceptors.request.use(config => {
    const token = authStore.token;
    if (token) {
        config.headers["Authorization"] = `Token ${token}`
    }
    return config
});

export default authorized_api;
