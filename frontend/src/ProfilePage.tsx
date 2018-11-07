import * as React from "react";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import { Navbar } from "./Navbar";
import {userStore} from "./auth/UserStore";
import {Redirect} from "react-router";
import {observer} from "mobx-react";
import Sidebar from "./Sidebar";
import TeamList from "./userteam/TeamList";

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

    public render() {
        if(!userStore.isAuthenticated) {
            return(
                <Redirect to={"/"}/>
            )
        }
        return(
            <div className={this.props.classes.root}>

                <Navbar/>
                <Sidebar/>
                <TeamList/>
            </div>
        )
    }
}

export default withStyles(styles)(ProfilePage);