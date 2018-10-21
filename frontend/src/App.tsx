import green from "@material-ui/core/colors/green";
import purple from "@material-ui/core/colors/purple";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import * as React from 'react';
import { CssBaseline } from "@material-ui/core";
import LandingPage from "./LandingPage";
import ProfilePage from "./ProfilePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {authStore} from "./auth/AuthStore";
import DevTools from "mobx-react-devtools";
import {observer} from "mobx-react";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  }
});

export const App = observer(() => (
    <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <BrowserRouter>
            <Switch>
                <Route exact={true} path={"/"} component={LandingPage}/>
                <Route path={"/profile"} component={ProfilePage}/>
            </Switch>
        </BrowserRouter>
        <DevTools/>
    </MuiThemeProvider>
));
