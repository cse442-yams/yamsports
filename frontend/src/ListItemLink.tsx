import * as React from "react";
import ListItem from "@material-ui/core/ListItem/ListItem";
import {Link} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const renderLink = (to: string) => (itemProps: any) => <Link to={to} {...itemProps}/>

export const ListItemLink = (props: any) => (
    <li>
        <ListItem button component={renderLink(props.to)}>
            {props.icon && <ListItemIcon>{props.icon}</ListItemIcon>}
            <ListItemText primary={props.primary} secondary={props.secondary}/>
        </ListItem>
    </li>
);