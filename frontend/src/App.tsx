import green from "@material-ui/core/colors/green";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import * as React from 'react';
import {CssBaseline} from "@material-ui/core";
import LandingPage from "./LandingPage";
import ProfilePage from "./ProfilePage";
import {BrowserRouter} from "react-router-dom";
import {authStore} from "./auth/AuthStore";
import DevTools from "mobx-react-devtools";
import {observer} from "mobx-react";
import {deepPurple} from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: green
  }
});

export const App = observer(() => (
    <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <BrowserRouter>
            {authStore.token ? <ProfilePage/> : <LandingPage/>}
        </BrowserRouter>
        <DevTools/>
    </MuiThemeProvider>
));
