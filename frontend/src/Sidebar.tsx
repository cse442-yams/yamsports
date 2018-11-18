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
import {userTeamStore} from "./userteam/UserTeamStore";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import {ListItemLink} from "./ListItemLink";
import Home from "@material-ui/icons/Home";
import Divider from "@material-ui/core/Divider/Divider";
import Button from "@material-ui/core/Button/Button";

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
                    <ListItemLink>
                        <ListItemIcon><Home/></ListItemIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItemLink>
                </List>
                {userTeamStore.hasTeam && <Divider/>}
                <List>
                    {getTeamItems()}
                </List>
                <Button color={"primary"}>New Team</Button>
            </Drawer>
        )
    }
}

const getTeamItems = () => {
    return userTeamStore.allUserTeams.map(team => {
        return (
            <>
                <ListSubheader>{team.name}</ListSubheader>
                <ListItemLink>
                    <ListItemIcon><Dashboard/></ListItemIcon>
                    <ListItemText primary={"Team Profile"}/>
                </ListItemLink>
            </>
        )
    })
};

export default withStyles(styles)(Sidebar);