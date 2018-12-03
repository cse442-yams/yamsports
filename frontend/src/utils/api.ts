import axios from 'axios';
import {authStore} from "../auth/AuthStore";

const url = process.env.REACT_APP_APIURL || 'http://localhost:8000/api/v1';

const authorized_api = axios.create({
    baseURL: url,
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
