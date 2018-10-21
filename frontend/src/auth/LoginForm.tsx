import * as React from "react";
import {
    Button, createStyles,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    TextField,
    Theme, withStyles,
    WithStyles
} from "@material-ui/core";
import {authStore} from "./AuthStore";
import {ChangeEvent} from "react";


const styles = (theme: Theme) => createStyles({
    dialogDivider: {
        marginBottom: theme.spacing.unit * 2
    }
});

class LoginForm extends React.Component<WithStyles<typeof styles>, any> {

    private handleUsernameChange = (e: ChangeEvent<HTMLTextAreaElement>) => authStore.setUsername(e.target.value);
    private handlePasswordChange = (e: ChangeEvent<HTMLTextAreaElement>) => authStore.setPassword(e.target.value);
    private handleSubmit = () => authStore.login();

    public componentWillUnmount() {
        authStore.reset()
    }

    public render() {
        return (
            <React.Fragment>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <TextField autoFocus={true} label="Username" fullWidth={true} margin="normal" onChange={this.handleUsernameChange}/>
                    <TextField label="Password" type="password" fullWidth={true} margin="normal" onChange={this.handlePasswordChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSubmit}>Log In</Button>
                </DialogActions>
                <Divider className={this.props.classes.dialogDivider}/>
                <DialogContent>
                    <Button fullWidth>Continue without an account</Button>
                    {/* <Button variant="raised" disabled={true}>Connect with Facebook</Button> */}
                </DialogContent>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(LoginForm);