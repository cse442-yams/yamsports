import * as React from "react";
import {
    Card,
    CardActionArea,
    CardContent, CardMedia,
    createStyles,
    Theme,
    Typography,
    withStyles,
    WithStyles
} from "@material-ui/core";
import {NBAPlayer, userTeamStore, userTeamUIStore} from "./UserTeamStore";
import CardActions from "@material-ui/core/CardActions/CardActions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = (theme: Theme) => createStyles({
    media: {
        height: 190
    },

    card: {
        width: 260
    },

    deleteButton: {
        margin: "2px"
    }
});

interface IProps extends WithStyles<typeof styles> {
    player: NBAPlayer;
    teamId: number;
}

const getImageUrl = (nbaId: number) => {
    return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${nbaId}.png`
};

const handleDelete = (id: number, teamId: number) => () => {
    userTeamStore.removePlayer(id, teamId);
};

export const NBAPlayerCard = withStyles(styles)((props: IProps) => (
    <Card className={props.classes.card}>
        {/*<CardActionArea>*/}
        <CardMedia className={props.classes.media} image={getImageUrl(props.player.nba_id)}>
            {userTeamUIStore.editMode && <IconButton onClick={handleDelete(props.player.id, props.teamId)}
                                                     className={props.classes.deleteButton}><DeleteIcon/></IconButton>}
        </CardMedia>

        <CardContent>
            <Typography gutterBottom variant={"headline"}>{`${props.player.first_name} ${props.player.last_name}`}
            </Typography>
            <Typography variant={"subheading"} color={"textSecondary"}>
                {`${props.player.current_team.abbr} | ${props.player.jersey} | ${props.player.position}`}
            </Typography>
        </CardContent>
        {/*</CardActionArea>*/}
    </Card>
));