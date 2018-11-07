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
import {NBAPlayer} from "./UserTeamStore";

const styles = (theme: Theme) => createStyles({
    media: {
        height: 190
    },

    card: {
        maxWidth: 260
    }
});

interface IProps extends WithStyles<typeof styles> {
    player: NBAPlayer;
}

const getImageUrl = (nbaId: number) => {
    return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${nbaId}.png`
};

export const NBAPlayerCard = withStyles(styles)((props: IProps) => (
    <Card className={props.classes.card}>
        <CardActionArea>
            <CardMedia className={props.classes.media} image={getImageUrl(props.player.nba_id)}/>

            <CardContent>
                <Typography gutterBottom variant={"headline"}>{`${props.player.first_name} ${props.player.last_name}`}</Typography>
                <Typography variant={"subheading"} color={"textSecondary"}>
                    {`${props.player.current_team.abbr} | ${props.player.jersey} | ${props.player.position}`}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
));