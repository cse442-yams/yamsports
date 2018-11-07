import * as React from "react";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core";
import {observer} from "mobx-react";

const styles = (theme: Theme) => createStyles({});

@observer
class TeamList extends React.Component<WithStyles<typeof styles>, any> {

}

export default withStyles(styles)(TeamList);