import * as React from "react";
import { Theme, createStyles, WithStyles, withStyles, AppBar, Toolbar, Typography } from "@material-ui/core";

const styles = (theme: Theme) => createStyles({});

export const Navbar = withStyles(styles)((props: WithStyles<typeof styles>) => (
    <AppBar>
        <Toolbar>
            <Typography variant="title" color="inherit">YAMSports</Typography>
        </Toolbar>
    </AppBar>
));