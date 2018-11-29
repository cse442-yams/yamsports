import * as React from "react";
import {Theme, createStyles, WithStyles, withStyles} from "@material-ui/core";
import {Navbar} from "./Navbar";
import {userStore} from "./auth/UserStore";
import {Redirect, Route, RouteComponentProps, RouterProps, Switch, withRouter} from "react-router";
import {observer} from "mobx-react";
import Sidebar from "./Sidebar";
import TeamList from "./userteam/TeamList";
import {userTeamStore} from "./userteam/UserTeamStore";
import NewsfeedPage from "./newsfeed/NewsfeedPage";
import TeamDashboardPage from "./dashboard/TeamDashboardPage";

const styles = (theme: Theme) => createStyles({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },

    spacer: theme.mixins.toolbar,
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps {

}

@observer
class ProfilePage extends React.Component<Props, any> {

    componentDidMount() {
        userTeamStore.fetchUserTeams();
        userTeamStore.fetchAllPlayers();
    }

    public render() {
        return (
            <div className={this.props.classes.root}>

                <Navbar/>
                <Sidebar/>
                <main className={this.props.classes.content}>
                    <div className={this.props.classes.spacer}/>
                    <Switch>
                        {userTeamStore.hasTeam &&
                        <Route path={"/"} exact render={() => <Redirect to={`/teams/${userTeamStore.defaultTeam.id}`}/>}/>}
                        <Route exact path={"/teams/:teamId"}
                               render={(props) => <TeamDashboardPage teamId={Number(props.match.params.teamId)}
                                                            location={props.location}/>}
                        />
                        <Route exact path={"/teams/:teamId/roster"}
                               render={(props) => <TeamList teamId={Number(props.match.params.teamId)}
                                                            location={props.location}/>}
                        />
                        <Route path={"/teams/:teamId/news"}
                               render={(props) => <NewsfeedPage teamId={Number(props.match.params.teamId)} location={props.location}/>}
                        />
                    </Switch>
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(withRouter(ProfilePage));