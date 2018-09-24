import green from "@material-ui/core/colors/green";
import purple from "@material-ui/core/colors/purple";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import * as React from 'react';
import { CssBaseline } from "@material-ui/core";
import LandingPage from "./LandingPage";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  }
});

export const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline/>
    <LandingPage/>
  </MuiThemeProvider>
)
