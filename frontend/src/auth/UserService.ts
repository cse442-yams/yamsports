import axios from 'axios';
import {authStore} from "./AuthStore";
import authorized_api from "../utils/api";

class UserService {

    public getUserDetails() {
        return authorized_api.get("/rest-auth/user/")
    }
}

export const userService = new UserService();