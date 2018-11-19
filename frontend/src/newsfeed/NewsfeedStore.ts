import {action, observable, runInAction} from "mobx";
import Parser from "rss-parser";
import {userTeamStore} from "../userteam/UserTeamStore";
import {newsfeedService} from "./NewsfeedService";


class NewsfeedStore {
    private readonly parser = new Parser();

    @observable public newsfeedLoading = false;
    @observable.shallow public teamNewsfeeds = new Map();

    @action public fetchNews() {
        this.newsfeedLoading = true;
        userTeamStore.userTeams.forEach(team => {
            newsfeedService.fetchNewsfeed(team.id)
                .then(resp => {
                    this.parser.parseString(resp.data)
                        .then(feed => {
                            runInAction(() => { this.teamNewsfeeds.set(team.id, feed) })
                        })
                })
        })
    }
}

export const newsfeedStore = new NewsfeedStore();