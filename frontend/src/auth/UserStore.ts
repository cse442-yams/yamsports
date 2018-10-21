import {action, observable} from "mobx";
import {userService} from "./UserService";


class UserStore {
    @observable public username: string

    @action public fetchUser() {
        userService.getUserDetails()
            .then(resp => {
                action(() => this.username = resp.data.username)
            })
    }
}

export const userStore = new UserStore();

