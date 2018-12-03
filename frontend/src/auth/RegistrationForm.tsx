import {
    Button,
    createStyles,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Theme, Typography,
    WithStyles,
    withStyles
} from "@material-ui/core";
import * as React from "react";
import {ChangeEvent, FormEvent} from "react";
import {authStore} from "./AuthStore";
import {observer} from "mobx-react";


const styles = (theme: Theme) => createStyles({});

const handleUsernameChange = (e: ChangeEvent<HTMLTextAreaElement>) => authStore.setUsername(e.target.value);
const handlePasswordChange = (e: ChangeEvent<HTMLTextAreaElement>) => authStore.setPassword(e.target.value);
const handlePasswordConfChange = (e: ChangeEvent<HTMLTextAreaElement>) => authStore.setPasswordConf(e.target.value);

const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    authStore.register();
};

export const RegistrationForm = withStyles(styles)(observer((props: WithStyles<typeof styles>) => (
    <React.Fragment>
        <DialogTitle>Create Account</DialogTitle>
        <form onSubmit={handleSubmit}>
            <DialogContent>
                {authStore.nonfieldError !== '' && <Typography color={"error"}>{authStore.nonfieldError}</Typography>}
                <TextField autoFocus={true} label="Username" fullWidth={true} margin="normal"
                           onChange={handleUsernameChange} error={authStore.errorValues.username !== ''} helperText={authStore.errorValues.username}/>
                <TextField label="Password" type="password" fullWidth={true} margin="normal"
                           onChange={handlePasswordChange} error={authStore.errorValues.password1 !== ''} helperText={authStore.errorValues.password1}/>
                <TextField label="Confirm Password" type="password" fullWidth={true} margin="normal"
                           onChange={handlePasswordConfChange} error={authStore.errorValues.password2 !== ''} helperText={authStore.errorValues.password2}/>
            </DialogContent>
            <DialogActions>
                <Button type={"submit"}>Register</Button>
            </DialogActions>
        </form>
    </React.Fragment>
)));
