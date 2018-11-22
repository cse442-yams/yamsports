import * as React from "react";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {observer} from "mobx-react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {userTeamStore, userTeamUIStore} from "./UserTeamStore";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import PlayerSelectList from "./PlayerSelectList";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";

const styles = (theme: Theme) => createStyles({
    nameInput: {
        marginBottom: theme.spacing.unit * 2
    }
});

const handleNameChange = (e: any) => userTeamStore.newTeamName = e.target.value;

const handleClose = () => userTeamUIStore.createTeamDialogOpen = false;

const handleSubmit = () => userTeamStore.createTeam();

export const CreateTeamDialog = withStyles(styles)(observer((props: WithStyles<typeof styles>) => (
    <Dialog open={userTeamUIStore.createTeamDialogOpen} onClose={handleClose} scroll={"body"} PaperProps={{style: {backgroundColor: "#eee"}}}>
        <DialogTitle>Create a Team</DialogTitle>
        <DialogContent>
            <TextField label={"Team name"} onChange={handleNameChange} fullWidth className={props.classes.nameInput}/>
            <PlayerSelectList/>
        </DialogContent>
        <DialogActions>
            <Button variant={"contained"} color={"primary"} onClick={handleSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>
)));