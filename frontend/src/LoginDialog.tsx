import * as React from 'react';
import { WithStyles, Theme, createStyles, withStyles, Dialog, DialogTitle, Divider, DialogContent, TextField, Tabs, Tab, DialogActions, Button } from '@material-ui/core';


const styles = (theme: Theme) => createStyles({})

interface IProps extends WithStyles<typeof styles> {
    isOpen: boolean,
    handleClose: any
}

const initialState = { tab: 0 }
type State = Readonly<typeof initialState>

class LoginDialog extends React.Component<IProps, State> {
    public state = initialState;


    public render() {
        return (
            <Dialog open={this.props.isOpen} onClose={this.props.handleClose}>
                <Tabs value={this.state.tab} onChange={this.handleTabChange}>
                    <Tab label={"Login"}/>
                    <Tab label={"Register"} disabled={true}/>
                </Tabs>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <TextField autoFocus={true} label="Email Address" type="email" fullWidth={true} margin="normal"/>
                    <TextField label="Password" type="password" fullWidth={true} margin="normal"/>
                </DialogContent>
                <DialogActions>
                    <Button disabled={true}>Log In</Button>
                </DialogActions>
                {/* <Divider/>
                <DialogContent>
                    <Button variant="raised" disabled={true}>Connect with Facebook</Button>
                </DialogContent> */}
            </Dialog>
        )
    }

    private handleTabChange = (event: any, value: any) => this.setState({tab: value})
}

export default withStyles(styles)(LoginDialog);