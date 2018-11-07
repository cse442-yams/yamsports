import * as React from "react";
import {CircularProgress, createStyles, Grid, Theme, withStyles, WithStyles} from "@material-ui/core";
import {observer} from "mobx-react";
import {userTeamStore} from "./UserTeamStore";
import {NBAPlayerCard} from "./NBAPlayerCard";

const styles = (theme: Theme) => createStyles({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },

    spacer: theme.mixins.toolbar
});

@observer
class TeamList extends React.Component<WithStyles<typeof styles>, any> {
    public componentDidMount(): void {
        userTeamStore.fetchUserTeams();
    }

    public render(): React.ReactNode {
        return (
            <main className={this.props.classes.content}>
                <div className={this.props.classes.spacer}/>
                {getContent()}
            </main>
        )
    }
}

const getContent = () => {
    if (userTeamStore.inProgress) {
        return <CircularProgress size={50}/>
    } else if (!userTeamStore.hasTeam) {
        return "No teams"
    } else {
        return (
            <Grid container spacing={16}>
                {userTeamStore.allUserTeams[0].players.map((value => (
                    <Grid item key={value.id}>
                        <NBAPlayerCard player={value}/>
                    </Grid>
                )))}
            </Grid>
        )
    }
};

export default withStyles(styles)(TeamList);