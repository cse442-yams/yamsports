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
import {observer} from "mobx-react";

const sidebarWidth = 240;

const styles = (theme: Theme) => createStyles({
    spacer: theme.mixins.toolbar,
    sidebar: {
        flexShrink: 0,
        width: sidebarWidth
    },
    sidebarPaper: {
        width: sidebarWidth
    },

    sidebarButton: {
        margin: `0 ${theme.spacing.unit}px`
    }
});

@observer
class Sidebar extends React.Component<WithStyles<typeof styles>, any> {

    public render() {
        return (
            <Drawer variant={"permanent"} className={this.props.classes.sidebar} classes={{paper: this.props.classes.sidebarPaper}}>
                <div className={(this.props.classes.spacer)}/>
                {/*<List>*/}
                    {/*<ListItemLink>*/}
                        {/*<ListItemIcon><Home/></ListItemIcon>*/}
                        {/*<ListItemText primary={"Home"}/>*/}
                    {/*</ListItemLink>*/}
                {/*</List>*/}
                {/*{userTeamStore.hasTeam && <Divider/>}*/}
                <List>
                    {getTeamItems()}
                </List>
                <Button color={"primary"} variant={"outlined"} className={this.props.classes.sidebarButton}>New Team</Button>
            </Drawer>
        )
    }
}

const getTeamItems = () => {
    return Array.from(userTeamStore.userTeams.values(), team => {
        return (
            <>
                <ListSubheader>{team.name}</ListSubheader>
                <ListItemLink href={`/teams/${team.id}`}>
                    <ListItemIcon><Dashboard/></ListItemIcon>
                    <ListItemText primary={"Team Profile"}/>
                </ListItemLink>
            </>
        )
    })
};

export default withStyles(styles)(Sidebar);