import * as React from "react";
import createStyles from "@material-ui/core/styles/createStyles";
import {Button, Theme, WithStyles} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {userTeamStore, userTeamUIStore} from "./UserTeamStore";
import {observer} from "mobx-react";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import PlayerSelectList from "./PlayerSelectList";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";

const styles = (theme: Theme) => createStyles({
    content: {
        // maxHeight: "40vh"
    }
});

const handleClose = () => { userTeamUIStore.addPlayerDialogOpen = false };

const handleSubmit = (teamId: number) => () => { userTeamStore.submitAddPlayers(teamId) };

interface Props extends WithStyles<typeof styles> {
    teamId: number;
}

export const AddPlayerDialog = withStyles(styles)(observer((props: Props) => (
    <Dialog open={userTeamUIStore.addPlayerDialogOpen} onClose={handleClose} scroll={"body"} PaperProps={{style: {backgroundColor: "#eee"}}}>
        <DialogTitle>Add players</DialogTitle>
        <DialogContent className={props.classes.content}>
            <PlayerSelectList/>
        </DialogContent>
        <DialogActions>
            <Button variant={"contained"} color={"primary"} onClick={handleSubmit(props.teamId)}>Submit</Button>
        </DialogActions>
    </Dialog>
)));

