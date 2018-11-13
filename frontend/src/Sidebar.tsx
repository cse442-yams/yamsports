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

const sidebarWidth = 240;

const styles = (theme: Theme) => createStyles({
    spacer: theme.mixins.toolbar,
    sidebar: {
        flexShrink: 0,
        width: sidebarWidth
    },
    sidebarPaper: {
        width: sidebarWidth
    }
});

class Sidebar extends React.Component<WithStyles<typeof styles>, any> {

    public render() {
        return (
            <Drawer variant={"permanent"} className={this.props.classes.sidebar} classes={{paper: this.props.classes.sidebarPaper}}>
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