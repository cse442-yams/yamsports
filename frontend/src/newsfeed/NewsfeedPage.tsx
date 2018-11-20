import * as React from "react";
import {Theme, withStyles, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {observer} from "mobx-react";
import {newsfeedStore} from "./NewsfeedStore";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Typography from "@material-ui/core/Typography/Typography";

const styles = (theme: Theme) => createStyles({

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
        return (
            <div>
                <Typography variant={"headline"} gutterBottom>Team News</Typography>
                {getContent()}
            </div>
        )
    }
}

const getContent = () => {
    if (newsfeedStore.newsfeedLoading) {
        return (
            <CircularProgress/>
        )
    } else {
        return (
            <div></div>
        )
    }
};

export default withStyles(styles)(NewsfeedPage);