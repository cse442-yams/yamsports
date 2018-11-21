import * as React from "react";
import {Theme, withStyles, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {observer} from "mobx-react";
import {newsfeedStore} from "./NewsfeedStore";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Typography from "@material-ui/core/Typography/Typography";
import {NewsCard} from "./NewsCard";

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

@observer
class NewsfeedPage extends React.Component<Props> {


    public componentDidMount(): void {
        newsfeedStore.observeNews();
    }

    public componentWillUnmount(): void {
        newsfeedStore.stopObservingNews();
    }

    public render(): React.ReactNode {
        const { classes } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.spacer}/>
                <Typography variant={"display3"} gutterBottom>Team News</Typography>
                {getContent(this.props.teamId)}
            </main>
        )
    }
}

const getContent = (teamId: number) => {
    if (newsfeedStore.newsfeedLoading) {
        return (
            <CircularProgress/>
        )
    } else {
        const feed: any = newsfeedStore.teamNewsfeeds.get(teamId);
        if (feed) {
            return (
                feed.items.map((item: any) => (
                    <NewsCard newsItem={item}/>
                ))
            )
        }
    }
};

export default withStyles(styles)(NewsfeedPage);