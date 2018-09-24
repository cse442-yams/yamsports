import * as React from 'react';
import green from "@material-ui/core/colors/green";
import purple from "@material-ui/core/colors/purple";
import { createStyles, WithStyles, withStyles, Typography, Theme, createMuiTheme, MuiThemeProvider, Button } from '@material-ui/core';
import jamesImage from "./james.jpg";

const landingTheme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: green,
        type: 'dark'
    }
});

const styles = (theme: Theme) => createStyles({
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

const LandingPage: React.SFC<WithStyles<typeof styles>> = (props) => (
    <MuiThemeProvider theme={landingTheme}>
        <div className={props.classes.root}>
            <header className={props.classes.header}>
                <Typography variant="headline">YAMSports</Typography>
                <Button variant="outlined">Login / Sign Up</Button>
            </header>
            <div className={props.classes.splash}>
                <div className={props.classes.splashBackground}/>
                <Typography gutterBottom={true} variant="display4">
                    Get the edge in fantasy sports
                </Typography>
                <Typography gutterBottom={true} variant="display1">
                    Use our advanced algorithms to help choose the best players for each matchup
                </Typography>
                <Button variant="raised" color="primary">Choose Your Team</Button>
            </div>
        </div>
    </MuiThemeProvider>
)

export default withStyles(styles)(LandingPage);