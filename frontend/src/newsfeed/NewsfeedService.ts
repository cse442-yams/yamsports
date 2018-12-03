import authorized_api from "../utils/api";

class NewsfeedService {
    private readonly api = authorized_api;

    public fetchNewsfeed(teamId: number) {
        return this.api.get(`/nba/teams/${teamId}/rss/`, {
            responseType: "text"
        });
    }
}

export const newsfeedService = new NewsfeedService();
