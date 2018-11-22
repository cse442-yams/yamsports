import * as React from "react";
import {
    Button, createStyles,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    TextField,
    Theme, Typography, withStyles,
    WithStyles
} from "@material-ui/core";
import {authStore} from "./AuthStore";
import {ChangeEvent, FormEvent} from "react";
import {observer} from "mobx-react";


const styles = (theme: Theme) => createStyles({
    dialogDivider: {
        marginBottom: theme.spacing.unit * 2
    }
});

@observer
class LoginForm extends React.Component<WithStyles<typeof styles>, any> {

    private handleUsernameChange = (e: ChangeEvent<HTMLTextAreaElement>) => authStore.setUsername(e.target.value);
    private handlePasswordChange = (e: ChangeEvent<HTMLTextAreaElement>) => authStore.setPassword(e.target.value);
    private handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        authStore.login();
    };

    public componentWillUnmount() {
        authStore.reset()
    }

    public render() {
        return (
            <React.Fragment>
                <DialogTitle>Login</DialogTitle>
                <form onSubmit={this.handleSubmit}>
                    <DialogContent>
                        {authStore.nonfieldError !== '' && <Typography color={"error"}>{authStore.nonfieldError}</Typography>}
                        <TextField autoFocus={true} label="Username" fullWidth={true} margin="normal"
                                   onChange={this.handleUsernameChange} error={authStore.errorValues.username !== ''} helperText={authStore.errorValues.username}/>
                        <TextField label="Password" type="password" fullWidth={true} margin="normal"
                                   onChange={this.handlePasswordChange} error={authStore.errorValues.password !== ''} helperText={authStore.errorValues.password}/>
                    </DialogContent>
                    <DialogActions>
                        <Button type={"submit"}>Log In</Button>
                    </DialogActions>
                </form>
                {/*<Divider className={this.props.classes.dialogDivider}/>*/}
                {/*<DialogContent>*/}
                {/*/!*<Button fullWidth>Continue without an account</Button>*!/*/}
                {/*/!* <Button variant="raised" disabled={true}>Connect with Facebook</Button> *!/*/}
                {/*</DialogContent>*/}
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(LoginForm);