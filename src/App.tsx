import React from 'react';
import {Box, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {AppBar} from "./components/layout/app-bar/app-bar";
import {AppProvider} from "./store/provider";
import {Router} from "./pages/router";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {

    return (
        <AppProvider>
            <ThemeProvider theme={darkTheme}>
                <>
                    <CssBaseline/>
                    <Box padding="20px">
                        <AppBar/>
                        <Router/>
                    </Box>
                </>
            </ThemeProvider>
        </AppProvider>
    );
}

export default App;
