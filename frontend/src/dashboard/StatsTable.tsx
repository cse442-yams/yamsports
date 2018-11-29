import * as React from "react";
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme: Theme) => createStyles({
});

interface Props extends WithStyles<typeof styles> {
    teamId: number;
}

class StatsTable extends React.Component<Props> {

    render(): React.ReactNode {
        return super.render();
    }
}

export default withStyles(styles)(StatsTable);


