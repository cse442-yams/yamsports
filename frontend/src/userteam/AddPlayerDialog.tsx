import * as React from "react";
import createStyles from "@material-ui/core/styles/createStyles";
import {Theme, WithStyles} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {userTeamUIStore} from "./UserTeamStore";
import {observer} from "mobx-react";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";

const styles = (theme: Theme) => createStyles({});

const handleClose = () => { userTeamUIStore.addPlayerDialogOpen = false };

export const AddPlayerDialog = withStyles(styles)(observer((props: WithStyles<typeof styles>) => (
    <Dialog open={userTeamUIStore.addPlayerDialogOpen} onClose={handleClose}>
        <DialogTitle>Add a player</DialogTitle>

    </Dialog>
)));

