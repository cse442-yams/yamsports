import {action, observable, runInAction} from "mobx";
import {userService} from "./UserService";
import {authStore} from "./AuthStore";


class UserStore {
    @observable public username: string = "";
    @observable public isAuthenticated = false;

    @action public fetchUser() {
        userService.getUserDetails()
            .then(resp => {
                runInAction(() => {
                    this.username = resp.data.username;
                    this.isAuthenticated = true;
                })
            })
            .catch(err => {
                if(err.response) {
                    authStore.logout();
                }
            })
    }

    @action public forgetUser() {
        this.username = "";
        this.isAuthenticated = false;
    }
}

export const userStore = new UserStore();

