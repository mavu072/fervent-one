import React, { useContext } from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SectionLoader from '../loader/SectionLoader';
import SnackBarNotification from '../notification/SnackBar';
import { AppContext } from "../context-provider/AppContext";
import { scrollbarStyle } from "../ui/scrollbarUtil";

/**
 * ComplianceCheckerPane.
 * @returns JSX Component.
 */
function ComplianceCheckerPane() {
    const { user, infoMsg, onInfoMessage } = useContext(AppContext);

    return (
        <Paper
            sx={{
                height: 'calc(100dvh - var(--Header-height))',
                width: { xs: '100dvw', lg: 'calc(100dvw - var(--Sidebar-width))' },
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'hidden',
                backgroundColor: 'background.body',
                borderRadius: 0,
            }}
        >
            {true && <SectionLoader />}
            {infoMsg.message && <SnackBarNotification key={infoMsg.count} message={infoMsg.message} />}
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    minHeight: 0,
                    px: 2,
                    py: 0,
                    ...scrollbarStyle,
                }}
            >

            </Box>
        </Paper>
    )
}

export default ComplianceCheckerPane;