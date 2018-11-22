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

const styles = (theme: Theme) => createStyles({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    }
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
                <Switch>
                    {userTeamStore.hasTeam &&
                    <Route path={"/"} exact render={() => <Redirect to={`/teams/${userTeamStore.defaultTeam.id}`}/>}/>}
                    <Route exact path={"/teams/:teamId"}
                           render={(props) => <TeamList teamId={Number(props.match.params.teamId)}
                                                        location={props.location}/>}
                    />
                    <Route path={"/teams/:teamId/news"}
                        render={(props) => <NewsfeedPage teamId={Number(props.match.params.teamId)} location={props.location}/>}
                    />
                </Switch>
            </div>
        )
    }
}

export default withStyles(styles)(withRouter(ProfilePage));