import * as React from "react";
import ListItem from "@material-ui/core/ListItem/ListItem";

export const ListItemLink = (props: any) => (
    <ListItem button component={"a"} {...props}/>
);