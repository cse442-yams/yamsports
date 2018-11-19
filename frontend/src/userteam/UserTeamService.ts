import authorized_api from "../utils/api";

class UserTeamService {
    private readonly api = authorized_api;

    public fetchUserTeams() {
        return this.api.get("/nba/teams/");
    }

    public fetchAllPlayers() {
        return this.api.get("/nba/players/");
    }

    public updateUserTeam(teamId: number, playerIds: number[], name: string) {
        return this.api.patch(`/nba/teams/${teamId}/`, {
            player_ids: playerIds,
            name: name
        });

    }

    public createUserTeam(playerIds: number[], name: string) {
        return this.api.post(`/nba/teams/`, {
            name: name,
            player_ids: playerIds
        })
    }
}

export const userTeamService = new UserTeamService();