import * as React from "react";
import {Theme, Typography, withStyles, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import List from "@material-ui/core/List/List";
import {NBAPlayer, userTeamStore} from "./UserTeamStore";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import TextField from "@material-ui/core/TextField/TextField";
import {observable} from "mobx";
import {observer} from "mobx-react";
import Chip from "@material-ui/core/Chip/Chip";
import Paper from "@material-ui/core/Paper/Paper";

const styles = (theme: Theme) => createStyles({
    listRoot: {
        overflow: 'auto',
        maxHeight: 400,
        backgroundColor: theme.palette.background.paper
    },

    selectedPlayersPaper: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit,
        minHeight: `52px`,
        marginBottom: theme.spacing.unit * 2
    },

    playerChip: {
        margin: "2px"
    },

    searchField: {
        marginBottom: theme.spacing.unit
    },

    listPaper: {}
});

const PlayerListItem = (props: { playerName: string, playerId: number, onClick: any }) => {
    const innerOnClick = (event: any) => {
        props.onClick(event, props.playerId)
    };
    return (
        <ListItem button key={props.playerId} onClick={innerOnClick}>
            <ListItemText primary={props.playerName}/>
        </ListItem>
    );
};

@observer
class PlayerSelectList extends React.Component<WithStyles<typeof styles>> {
    @observable private searchValue: string = '';

    private onClick = (event: any, playerId: number) => {
        const clickedPlayer = userTeamStore.allPlayers.find(player => player.id === playerId);
        if (clickedPlayer && userTeamStore.playersToAdd.indexOf(clickedPlayer) === -1) {
            userTeamStore.playersToAdd.push(clickedPlayer);
        }
    };

    private onChange: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
        this.searchValue = event.target.value.toLowerCase();
    };

    private onDeleteChip = (id: number) => () => {
        userTeamStore.playersToAdd = userTeamStore.playersToAdd.filter(player => player.id !== id);
    };


    public render(): React.ReactNode {
        const classes = this.props.classes;

        return (
            <div>
                <Paper className={classes.selectedPlayersPaper}>
                    <Typography color={"textSecondary"}>Selected Players: </Typography>
                    {userTeamStore.playersToAdd.map(player => (
                        <Chip key={player.id} label={`${player.first_name} ${player.last_name}`}
                              onDelete={this.onDeleteChip(player.id)} className={classes.playerChip}/>
                    ))}
                </Paper>
                <TextField placeholder={"Filter players"} fullWidth onChange={this.onChange} autoFocus={true}
                           className={classes.searchField}/>
                <Paper square className={classes.listPaper}>
                    <List className={this.props.classes.listRoot}>
                        {userTeamStore.allPlayers
                            .filter(player => player.first_name.toLowerCase().includes(this.searchValue) || player.last_name.toLowerCase().includes(this.searchValue))
                            .map(player => (
                                <PlayerListItem playerName={`${player.first_name} ${player.last_name}`}
                                                playerId={player.id}
                                                onClick={this.onClick}/>
                            ))}
                    </List>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(PlayerSelectList);