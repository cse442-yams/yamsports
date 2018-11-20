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
    @observable userTeams: Map<number, UserTeam> = new Map<number, UserTeam>();
    @observable.shallow allPlayers: NBAPlayer[] = [];

    @observable.shallow playersToAdd: NBAPlayer[] = [];
    @observable newTeamName: string = "";

    @computed get hasTeam() {
        return this.userTeams.size > 0;
    }

    @computed get defaultTeam() {
        return this.userTeams.values().next().value;
    }

    @action public setUserTeams(data: UserTeam[]) {
        data.forEach(team => this.userTeams.set(team.id, team));
    }

    @action public fetchUserTeams() {
        this.inProgress = true;
        userTeamService.fetchUserTeams()
            .then(resp => {
                runInAction("Set user teams",() => {
                    this.setUserTeams(resp.data);
                    this.inProgress = false;
                });
            })
    }

    @action public fetchAllPlayers() {

        userTeamService.fetchAllPlayers()
            .then(resp => {
                runInAction("Set all players", () => {
                    this.allPlayers = resp.data;
                })
            })
    }

    @action public submitAddPlayers(teamId: number) {
        const team = this.userTeams.get(teamId)!;
        const newTeam = new Set(team.players.concat(this.playersToAdd).map(player => player.id));
        this.inProgress = true;
        this.playersToAdd = [];
        userTeamUIStore.addPlayerDialogOpen = false;
        userTeamUIStore.editMode = false;
        userTeamService.updateUserTeam(teamId, Array.from(newTeam), team.name)
            .then(resp => {
                runInAction("Add players to team", () => {
                    this.userTeams.set(team.id, resp.data);
                    this.inProgress = false;
                })
            })
    }

    @action public removePlayer(playerId: number, teamId: number) {
        const team = this.userTeams.get(teamId)!;
        const oldTeam = team.players.slice();
        const newTeam = team.players.filter(p => p.id !== playerId);
        team.players = newTeam;
        userTeamService.updateUserTeam(teamId, newTeam.map(p => p.id), team.name)
            .then(resp => {
                runInAction("Remove players from team", () => {
                    this.userTeams.set(team.id, resp.data);
                });
            })
            .catch(reason => {
                runInAction("Remove players failed", () => {
                    team.players = oldTeam;
                    // TODO: error message
                })
            })
    }

    @action public createTeam() {
        userTeamUIStore.createTeamDialogOpen = false;
        const ids = this.playersToAdd.map(p => p.id);
        userTeamService.createUserTeam(ids, this.newTeamName)
            .then(resp => {
                runInAction("Create new team", () => {
                    this.userTeams.set(resp.data.id, resp.data);
                    this.newTeamName = "";
                    this.playersToAdd = [];
                    window.history.pushState(null, '', `/teams/${resp.data.id}`)
                })
            })
    }
}

class UserTeamUIStore {
    @observable editMode = false;
    @observable addPlayerDialogOpen = false;
    @observable createTeamDialogOpen = false;

}

export const userTeamStore = new UserTeamStore();
export const userTeamUIStore = new UserTeamUIStore();

