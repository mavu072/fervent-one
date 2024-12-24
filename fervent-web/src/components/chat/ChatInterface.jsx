import React, { useContext  } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MyMessages from './components/MyMessages';
import { AppContext } from '../context-provider/Context';

export default function ChatInterface() {
    const { user, mode, app } = useContext(AppContext);
    
    const defaultTheme = createTheme({ palette: { mode } });
    
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box sx={{
                display: 'flex',
                minHeight: '100dvh'
            }}>
                <Sidebar />
                <Header />
                <Box component="section" className="MainContent" sx={{ flex: 1 }}>
                    { user && <MyMessages user={user} app={app} /> }
                </Box>
            </Box>
        </ThemeProvider>
    );
}
