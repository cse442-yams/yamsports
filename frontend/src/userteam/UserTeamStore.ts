import {action, computed, observable, runInAction} from "mobx";
import authorized_api from "../utils/api";
import {userTeamService} from "./UserTeamService";

export interface NBAPlayer {
    readonly id: number;
    readonly nba_id: number;
    readonly first_name: string;
    readonly last_name: string;
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
    @observable.shallow allPlayers: NBAPlayer[] = [];

    @computed get hasTeam() {
        return this.allUserTeams.length > 0;
    }

    @action public fetchUserTeams() {
        this.inProgress = true
        userTeamService.fetchUserTeams()
            .then(resp => {
                runInAction(() => {
                    this.allUserTeams = resp.data;
                    this.inProgress = false;
                });
            })
    }
}

class UserTeamUIStore {
    @observable editMode = false;
    @observable addPlayerDialogOpen = false;

}

export const userTeamStore = new UserTeamStore();
export const userTeamUIStore = new UserTeamUIStore();

