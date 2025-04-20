import React from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { appName, SETTINGS_TITLE } from "../../config/appConfig";

function Settings() {
    return (
        <Paper
            className="Settings-container"
            sx={{
                width: '100%',
                height: '100dvh',
                display: 'flex',
                flexDirection: 'column',
                overflowX: 'hidden',
                backgroundColor: 'background.body',
                borderRadius: 0,
            }}
        >
            <title>
                {SETTINGS_TITLE} – {appName}
            </title>
            <Box
                className="Inner-container"
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    p: 0,
                }}
            >
            </Box>
        </Paper>
    );
}

export default Settings;