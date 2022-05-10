import React from 'react';
import {OrderHistory} from "./components/order-history/order-history";
import {SearchBar} from "./components/search-bar/search-bar";
import {ThemeProvider, createTheme, Box, Button, CssBaseline} from "@mui/material";
import {AppBar} from "./components/layout/app-bar/app-bar";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {

    return (
        <ThemeProvider theme={darkTheme}>
            <>
                <CssBaseline />
                <Box>
                    <AppBar/>
                    <SearchBar/>
                    <Button variant="text">Text</Button>
                    {/*  <LatestPrice/>*/}
                    <OrderHistory/>
                </Box>
            </>
        </ThemeProvider>
    );
}

export default App;
