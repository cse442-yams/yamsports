import axios from 'axios';

class AuthService {
    private readonly api = axios.create({
        baseURL: "http://localhost:8000/api/v1",
        headers: {
            "Content-Type": "application/json"
        }
    });

    public login(username: string, password: string) {
        return this.api.post("/rest-auth/login/", {
            "username": username,
            "password": password
        })
    }

    public register(username: string, pass1: string, pass2: string) {
        return this.api.post("/rest-auth/registration", {
            "username": username,
            "password1": pass1,
            "password2": pass2
        })
    }
}

export const authService = new AuthService();