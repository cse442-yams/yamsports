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
import {Redirect} from "react-router";

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

interface Props extends WithStyles<typeof styles> {
    teamId: number;
    location: any;
}

@observer
class TeamList extends React.Component<Props, any> {

    // public componentDidMount(): void {
    //     userTeamStore.fetchUserTeams();
    //     userTeamStore.fetchAllPlayers();
    // }

    private toggleEditMode = (e: any, checked: boolean) => { userTeamUIStore.editMode = checked};

    public render(): React.ReactNode {
        console.log(this.props.teamId);
        if (userTeamStore.inProgress) {
            return (
                <CircularProgress size={50}/>
            )
        }

        const team = userTeamStore.userTeams.get(this.props.teamId);
        if (team === undefined) {
            return (<Redirect to={"/"}/>)
        }

        return (
            <>
                <div className={this.props.classes.heading}>
                    <Typography className={this.props.classes.title} variant={"display3"} gutterBottom={true}>{team.name}</Typography>
                    <FormControlLabel control={<Switch checked={userTeamUIStore.editMode}/>} label={"Edit"} onChange={this.toggleEditMode}/>
                </div>
                <AddPlayerDialog teamId={team.id}/>
                <Grid container spacing={16}>
                    {team.players.map((value => (
                        <Grid item key={value.id}>
                            <NBAPlayerCard player={value} teamId={team.id}/>
                        </Grid>
                    )))}
                    <Grid item>
                        <Zoom in={userTeamUIStore.editMode}>
                            <Button variant={"fab"} color={"secondary"} onClick={toggleDialog}><AddIcon/></Button>
                        </Zoom>
                    </Grid>
                </Grid>
            </>
        )
    }
}

const toggleDialog = () => { userTeamUIStore.addPlayerDialogOpen = true };

export default withStyles(styles)(TeamList);