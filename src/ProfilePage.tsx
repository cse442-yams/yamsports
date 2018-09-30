import * as React from "react";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import { Navbar } from "./Navbar";
import players from "./data/players_nba_2018.json";

const styles = (theme: Theme) => createStyles({});
console.log(players);

class ProfilePage extends React.Component<WithStyles<typeof styles>, any> {

    public render() {
        return(
            <Navbar/>
        )
    }
}

export default withStyles(styles)(ProfilePage);