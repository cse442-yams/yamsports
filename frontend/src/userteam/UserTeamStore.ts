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
    name: string;
    players: NBAPlayer[];
}

class UserTeamStore {
    @observable inProgress = false;
    @observable allUserTeams: UserTeam[] = [];
    @observable.shallow allPlayers: NBAPlayer[] = [];

    @observable.shallow playersToAdd: NBAPlayer[] = [];
    @observable newTeamName: string = "";

    @computed get hasTeam() {
        return this.allUserTeams.length > 0;
    }

    @action public fetchUserTeams() {
        this.inProgress = true;
        userTeamService.fetchUserTeams()
            .then(resp => {
                runInAction(() => {
                    this.allUserTeams = resp.data;
                    this.inProgress = false;
                });
            })
    }

    @action public fetchAllPlayers() {
        userTeamService.fetchAllPlayers()
            .then(resp => {
                runInAction(() => {
                    this.allPlayers = resp.data;
                })
            })
    }

    @action public submitAddPlayers() {
        const newTeam = new Set(this.allUserTeams[0].players.concat(this.playersToAdd).map(player => player.id));
        this.inProgress = true;
        this.playersToAdd = [];
        userTeamUIStore.addPlayerDialogOpen = false;
        userTeamUIStore.editMode = false;
        userTeamService.updateUserTeam(this.allUserTeams[0].id, Array.from(newTeam), this.allUserTeams[0].name)
            .then(resp => {
                runInAction(() => {
                    this.allUserTeams[0] = resp.data;
                    this.inProgress = false;
                })
            })
    }

    @action public removePlayer(playerId: number) {
        const oldTeam = this.allUserTeams[0].players.slice();
        const newTeam = this.allUserTeams[0].players.filter(p => p.id !== playerId);
        this.allUserTeams[0].players = newTeam;
        userTeamService.updateUserTeam(this.allUserTeams[0].id, newTeam.map(p => p.id), this.allUserTeams[0].name)
            .then(resp => {
                runInAction(() => { this.allUserTeams[0] = resp.data })
            })
            .catch(reason => {
                runInAction(() => {
                    this.allUserTeams[0].players = oldTeam;
                    // TODO: error message
                })
            })
    }
}

class UserTeamUIStore {
    @observable editMode = false;
    @observable addPlayerDialogOpen = false;

}

export const userTeamStore = new UserTeamStore();
export const userTeamUIStore = new UserTeamUIStore();

