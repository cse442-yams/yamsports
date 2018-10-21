import axios from 'axios';
import {authStore} from "./AuthStore";

class UserService {
    private readonly api = axios.create({
        baseURL: 'localhost:8000/api/v1/',
        headers: {
            "Content-Type": "application/json"
        }
    });

    constructor() {
        this.api.interceptors.request.use(config => {
            const token = authStore.token;
            if (token) {
                config.headers["Authorization"] = `Token ${token}`
            }
            return config
        })
    }

    public getUserDetails() {
        return this.api.get("/rest-auth/user")
    }
}

export const userService = new UserService();