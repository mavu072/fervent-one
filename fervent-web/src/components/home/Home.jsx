import React from "react";
import Box from '@mui/material/Box';
import ServiceProvider from "../context-provider/ServiceContext";
import PaneNavigationProvider from "../context-provider/PaneNavigationContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

/**
 * Home.
 * @returns JSX component
 */
function Home() {
    return (
        <ServiceProvider>
            <PaneNavigationProvider>
                <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                    <Sidebar />
                    <Header />
                    <MainContent />
                </Box>
            </PaneNavigationProvider>
        </ServiceProvider>
    );
}

export default Home;