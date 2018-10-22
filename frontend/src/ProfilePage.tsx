import * as React from "react";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import { Navbar } from "./Navbar";
import players from "./data/players_nba_2018.json";
import {userStore} from "./auth/UserStore";
import {Redirect} from "react-router";
import {observer} from "mobx-react";
import Sidebar from "./Sidebar";

const styles = (theme: Theme) => createStyles({});
console.log(players);

@observer
class ProfilePage extends React.Component<WithStyles<typeof styles>, any> {

    public render() {
        if(!userStore.isAuthenticated) {
            return(
                <Redirect to={"/"}/>
            )
        }
        return(
            <div>

                <Navbar/>
                <Sidebar/>
            </div>
        )
    }
}

export default withStyles(styles)(ProfilePage);