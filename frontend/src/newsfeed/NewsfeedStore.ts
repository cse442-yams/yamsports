import {action, autorun, IReactionDisposer, observable, reaction, runInAction} from "mobx";
import Parser from "rss-parser";
import {UserTeam, userTeamStore} from "../userteam/UserTeamStore";
import {newsfeedService} from "./NewsfeedService";


class NewsfeedStore {
    private readonly parser = new Parser();

    @observable public newsfeedLoading = false;
    @observable.shallow public teamNewsfeeds = new Map();
    private disposer: IReactionDisposer | null = null;

    public observeNews() {
        this.disposer = reaction(
            () => Array.from(userTeamStore.userTeams.values()),
            (teams) => this.fetchNews(teams),
            {name: "Fetch news"}
        );
    }

    public stopObservingNews() {
        if (this.disposer) {
            this.disposer();
        }
    }

    @action public fetchNews(teams: UserTeam[]) {
        this.newsfeedLoading = true;
        teams.forEach(team => {
            newsfeedService.fetchNewsfeed(team.id)
                .then(resp => {
                    this.parser.parseString(resp.data)
                        .then(feed => {
                            runInAction(() => {
                                this.teamNewsfeeds.set(team.id, feed);
                                this.newsfeedLoading = false;
                            })
                        })
                })
        })
    }
}

export const newsfeedStore = new NewsfeedStore();