import {action, observable, runInAction} from "mobx";
import authorized_api from "../utils/api";
import {userTeamService} from "./UserTeamService";

export interface NBAPlayer {
    readonly id: number;
    readonly first_name: string;
    readonly last_ame: string;
    readonly jersey: number;
    readonly position: string;
    readonly current_team: NBATeam;
}

export interface NBATeam {
    readonly id: number;
    readonly city: string;
    readonly name: string;
    readonly abbr: string;
}

export interface UserTeam {
    readonly id: number;
    players: NBAPlayer[];
}

class UserTeamStore {
    @observable inProgress = false;
    @observable allUserTeams: UserTeam[] = [];


    @action public fetchUserTeams() {
        userTeamService.fetchUserTeams()
            .then(resp => {
                runInAction(() => this.allUserTeams = resp.data);
            })
    }
}

