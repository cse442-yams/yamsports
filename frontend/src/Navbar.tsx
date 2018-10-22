import * as React from "react";
import {Theme, createStyles, WithStyles, withStyles, AppBar, Toolbar, Typography, Button} from "@material-ui/core";
import {userStore} from "./auth/UserStore";
import {observer} from "mobx-react";
import {authStore} from "./auth/AuthStore";

const styles = (theme: Theme) => createStyles({
    grow: {
        flexGrow: 1
    },

    logoutButton: {
        marginLeft: theme.spacing.unit * 2
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1
    }
});

const handleLogout = () => authStore.logout();

export const Navbar = withStyles(styles)(observer((props: WithStyles<typeof styles>) => (
    <AppBar className={props.classes.appBar}>
        <Toolbar>
            <Typography variant="title" color="inherit" className={props.classes.grow}>YAMSports</Typography>

            <Typography variant="body1" color={"inherit"}>Welcome, {`${userStore.username}`}</Typography>
            <Button color={"inherit"} className={props.classes.logoutButton} onClick={handleLogout}>Logout</Button>
        </Toolbar>
    </AppBar>
)));