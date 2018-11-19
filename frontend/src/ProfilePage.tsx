import * as React from "react";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import { Navbar } from "./Navbar";
import {userStore} from "./auth/UserStore";
import {Redirect, Route, Switch} from "react-router";
import {observer} from "mobx-react";
import Sidebar from "./Sidebar";
import TeamList from "./userteam/TeamList";
import {userTeamStore} from "./userteam/UserTeamStore";

const styles = (theme: Theme) => createStyles({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    }
});

@observer
class ProfilePage extends React.Component<WithStyles<typeof styles>, any> {

    componentDidMount() {
        userTeamStore.fetchUserTeams();
        userTeamStore.fetchAllPlayers();
    }

    public render() {
        return(
            <div className={this.props.classes.root}>
                {userTeamStore.hasTeam && <Redirect to={`/teams/${userTeamStore.defaultTeam.id}`}/>}

                <Navbar/>
                <Sidebar/>
                <Switch>
                    <Route path={"/teams/:teamId"} render={({match}) => <TeamList teamId={Number(match.params.teamId)}/>}/>
                    {/*<Route path={"*"} render={params => {console.log(params); return "404"}}/>*/}
                </Switch>
            </div>
        )
    }
}

export default withStyles(styles)(ProfilePage);