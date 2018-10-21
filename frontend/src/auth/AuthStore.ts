import {observable, action, reaction, computed} from "mobx";
import {authService} from "./AuthService";
import {userStore} from "./UserStore";

class AuthStore {

    @observable inProgress = false;

    @observable formValues = {
        username: '',
        email: '',
        password: ''
    };

    @observable public token = window.localStorage.getItem("token");

    constructor() {
        // This sets up a reaction so when this.token changes, the token gets set or removed from localStorage
        reaction(
            () => this.token,
            token => {
                if(token) {
                    window.localStorage.setItem('token', token)
                } else {
                    window.localStorage.removeItem('token')
                }
            }
        )
    }

    @computed get isAuthenticated() {
        return this.token !== null;
    }

    @action public setUsername(username: string) {
        this.formValues.username = username;
    }

    @action public setEmail(email: string) {
        this.formValues.email = email;
    }

    @action public setPassword(password: string) {
        this.formValues.password = password;
    }

    @action public reset() {
        this.formValues.username = '';
        this.formValues.email = '';
        this.formValues.password = '';
    }

    @action public login() {
        authService.login(this.formValues.username, this.formValues.password)
            .then(resp => {
                this.setToken(resp.data.key);
                userStore.fetchUser();
            })
    }

    @action public setToken(token: string) {
        this.token = token
    }
}

export const authStore = new AuthStore();