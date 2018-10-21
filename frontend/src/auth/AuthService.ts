import axios from 'axios';

class AuthService {
    private readonly api = axios.create({
        baseURL: "localhost:8000/api/v1",
        headers: {
            "Content-Type": "application/json"
        }
    });

    public login(username: string, password: string) {
        return this.api.post("/rest-auth/login", {
            "username": username,
            "password": password
        })
    }
}

export const authService = new AuthService();