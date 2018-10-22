import * as React from "react";
import {
    createStyles,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Theme,
    withStyles,
    WithStyles
} from "@material-ui/core";
import Dashboard from '@material-ui/icons/Dashboard'


const styles = (theme: Theme) => createStyles({
    spacer: theme.mixins.toolbar
});

class Sidebar extends React.Component<WithStyles<typeof styles>, any> {

    public render() {
        return (
            <Drawer variant={"permanent"}>

                <div className={(this.props.classes.spacer)}/>
                <List>
                    <ListItem button>
                        <ListItemIcon><Dashboard/></ListItemIcon>
                        <ListItemText primary={"Team Profile"}/>
                    </ListItem>
                </List>
            </Drawer>
        )
    }
}

export default withStyles(styles)(Sidebar);