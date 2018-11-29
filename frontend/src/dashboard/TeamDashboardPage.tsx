import * as React from "react";
import {CircularProgress, Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {userTeamStore} from "../userteam/UserTeamStore";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import {Redirect} from "react-router";
import StatsTable from "./StatsTable";


const styles = (theme: Theme) => createStyles({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },

    spacer: theme.mixins.toolbar,

});

interface Props extends WithStyles<typeof styles> {
    teamId: number;
    location: any;
}

class TeamDashboardPage extends React.Component<Props> {

    public render() {
        const team = userTeamStore.userTeams.get(this.props.teamId);
        if (team === undefined) {
            return (<Redirect to={"/"}/>)
        }

        const { classes } = this.props;
        if(userTeamStore.inProgress) {
            return (
                <CircularProgress/>
            )
        }

        return (
            <>
                <Typography variant={"display3"} gutterBottom>{team.name}</Typography>
                <StatsTable team={team}/>
            </>
        )
    }
}

const getContent = (teamId: number) => {


};

export default withStyles(styles)(TeamDashboardPage)
