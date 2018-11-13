import * as React from "react";
import {
    Button,
    CircularProgress,
    createStyles,
    FormControlLabel,
    Grid, Switch,
    Theme,
    Typography,
    withStyles,
    WithStyles, Zoom
} from "@material-ui/core";
import {observer} from "mobx-react";
import {userTeamStore, userTeamUIStore} from "./UserTeamStore";
import {NBAPlayerCard} from "./NBAPlayerCard";
import AddIcon from "@material-ui/icons/Add";
import {AddPlayerDialog} from "./AddPlayerDialog";

const styles = (theme: Theme) => createStyles({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },

    spacer: theme.mixins.toolbar,

    heading: {
        display: "flex",
        alignItems: "baseline"
    },

    title: {
        marginRight: theme.spacing.unit * 4
    }
});

@observer
class TeamList extends React.Component<WithStyles<typeof styles>, any> {

    public componentDidMount(): void {
        userTeamStore.fetchUserTeams();
        userTeamStore.fetchAllPlayers();
    }

    private toggleEditMode = (e: any, checked: boolean) => { userTeamUIStore.editMode = checked};

    public render(): React.ReactNode {
        return (
            <main className={this.props.classes.content}>
                <div className={this.props.classes.spacer}/>
                <div className={this.props.classes.heading}>
                    <Typography className={this.props.classes.title} variant={"display3"} gutterBottom={true}>Your team</Typography>
                    <FormControlLabel control={<Switch checked={userTeamUIStore.editMode}/>} label={"Edit"} onChange={this.toggleEditMode}/>
                </div>
                <AddPlayerDialog/>
                {getContent()}
            </main>
        )
    }
}

const toggleDialog = () => { userTeamUIStore.addPlayerDialogOpen = true };

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
                <Grid item>
                    <Zoom in={userTeamUIStore.editMode}>
                        <Button variant={"fab"} color={"secondary"} onClick={toggleDialog}><AddIcon/></Button>
                    </Zoom>
                </Grid>
            </Grid>
        )
    }
};

export default withStyles(styles)(TeamList);