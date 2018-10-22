import {observable, action, reaction, computed, autorun, runInAction} from "mobx";
import {authService} from "./AuthService";
import {userStore} from "./UserStore";

class AuthStore {

    @observable inProgress = false;

    @observable formValues = {
        username: '',
        email: '',
        password: '',
        passwordConf: ''
    };

    @observable errorValues = {
        username: '',
        password: '',
        password1: '',
        password2: ''
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

        autorun(() => {
            if (this.token) {
                userStore.fetchUser();
            }
        })
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

    @action public setPasswordConf(password: string) {
        this.formValues.passwordConf = password;
    }

    @action public reset() {
        this.formValues.username = '';
        this.formValues.email = '';
        this.formValues.password = '';

        // reset all error values to empty string
        Object.keys(this.errorValues).forEach(k => this.errorValues[k] = '');
    }

    @action public login() {
        authService.login(this.formValues.username, this.formValues.password)
            .then(resp => {
                this.setToken(resp.data.key);
            })
    }

    @action public register() {
        authService.register(this.formValues.username, this.formValues.password, this.formValues.passwordConf)
            .then(resp => {
                this.setToken(resp.data.key);
            })
            .catch(err => {
                if(err.response && err.response.status === 400) {
                    runInAction(() => {
                        const data = err.response.data;
                        // set all errorValues to the corresponding key in the error response
                        Object.keys(data).forEach(k => this.errorValues[k] = data[k][0]);
                    })
                }
            })
    }

    @action public logout() {
        this.setToken(null);
        userStore.forgetUser();
    }

    @action public setToken(token: string | null) {
        this.token = token
    }
}

export const authStore = new AuthStore();