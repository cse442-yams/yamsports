import authorized_api from "../utils/api";

class UserTeamService {
    private readonly api = authorized_api;

    public fetchUserTeams() {
        return this.api.get("/nba/teams/");
    }
}

export const userTeamService = new UserTeamService();