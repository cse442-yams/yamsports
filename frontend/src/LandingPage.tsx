import * as React from "react";
import green from "@material-ui/core/colors/green";
import purple from "@material-ui/core/colors/purple";
import {
  createStyles,
  WithStyles,
  withStyles,
  Typography,
  Theme,
  createMuiTheme,
  MuiThemeProvider,
  Button,
  Paper
} from "@material-ui/core";
import jamesImage from "./james.jpg";
import LoginDialog from "./LoginDialog";
import SelectTeams from "./SelectTeams";

import { any } from "prop-types";

const landingTheme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
    type: "dark"
  }
});

export const styles = (theme: Theme) =>
  createStyles({
    root: {},
    header: {
      position: "absolute",
      width: "100%",
      zIndex: 10,
      display: "flex",
      justifyContent: "space-between",
      padding: "35px 100px 0"
    },
    splashBackground: {
      position: "absolute",
      background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${jamesImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: "100%",
      height: "100%",
      zIndex: -1
    },
    splash: {
      height: "100vh",
      width: "100vw",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }
  });

const initialState = {
  loginOpen: false,
  buttonopen: false,
  anchorEl: null
};
type State = Readonly<typeof initialState>;

class LandingPage extends React.Component<WithStyles<typeof styles>, State> {
  public readonly state: State = initialState;

  public render() {
    return (
      <MuiThemeProvider theme={landingTheme}>
        <SelectTeams
          isOpen={this.state.buttonopen}
          handleClose={this.closeitem}
          anchorEl={this.state.anchorEl}
        />
        <LoginDialog
          isOpen={this.state.loginOpen}
          handleClose={this.closeLogin}
        />
        <div className={this.props.classes.root}>
          <header className={this.props.classes.header}>
            <Typography variant="headline">YAMSports</Typography>
            <Button variant="outlined" onClick={this.openLogin}>
              Login / Sign Up
            </Button>
          </header>
          <div className={this.props.classes.splash}>
            <div className={this.props.classes.splashBackground} />
            <Typography gutterBottom={true} variant="display4">
              Get the edge in fantasy sports
            </Typography>
            <Typography gutterBottom={true} variant="display1">
              Use our advanced algorithms to help choose the best players for
              each matchup
            </Typography>
            <Button variant="raised" color="primary" onClick={this.openitem}>
              Choose Your Team
            </Button>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

  private openLogin = () => this.setState({ loginOpen: true });
  private openitem = () => this.setState({ buttonopen: true });
  private closeitem = () => this.setState({ buttonopen: false });

  private closeLogin = () => this.setState({ loginOpen: false });
}

export default withStyles(styles)(LandingPage);
