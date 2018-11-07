import * as React from "react";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import { Navbar } from "./Navbar";
import {userStore} from "./auth/UserStore";
import {Redirect} from "react-router";
import {observer} from "mobx-react";
import Sidebar from "./Sidebar";

const styles = (theme: Theme) => createStyles({});

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