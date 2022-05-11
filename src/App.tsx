import React from 'react';
import {OrderHistory} from "./components/order-history/order-history";
import {SearchBar} from "./components/search-bar/search-bar";
import {Box, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {AppBar} from "./components/layout/app-bar/app-bar";
import {AppProvider} from "./store/provider";

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
                    <Box>
                        <AppBar/>
                        <SearchBar/>
                        {/*  <LatestPrice/>*/}
                        <OrderHistory/>
                    </Box>
                </>
            </ThemeProvider>
        </AppProvider>
    );
}

export default App;
