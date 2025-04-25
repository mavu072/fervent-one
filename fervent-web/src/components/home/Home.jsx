import React from "react";
import Box from '@mui/material/Box';
import ServiceProvider from "../context-provider/ServiceContext";
import SidebarProvider from "../context-provider/SidebarContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

/**
 * Home.
 * @returns JSX component
 */
function Home() {
    return (
        <ServiceProvider>
            <SidebarProvider>
                <Box sx={{ display: 'flex', width: '100dvw', minHeight: '100dvh' }}>
                    <Sidebar />
                    <Header />
                    <Main />
                </Box>
            </SidebarProvider>
        </ServiceProvider>
    );
}

export default Home;