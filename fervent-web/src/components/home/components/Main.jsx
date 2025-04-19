import React from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyles from '@mui/material/GlobalStyles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Messages from "../../chat/Messages";
import ComplianceChecker from "../../compliance-checker/ComplianceChecker";
import { ErrorPageNotFound } from "../../error/RouteErrors";
import { COMPLIANCE_CHECKER_PATH } from "../../../config/appConfig";

/**
 * Main.
 * @returns JSX component
 */
function Main() {
    return (
        <Box component="section" className="Main" sx={{ flex: 1 }}>
            <GlobalStyles
                styles={{
                    'html': {
                        overflowY: 'hidden',
                        overflowX: 'hidden',
                    },
                }}
            />
            <Paper
                sx={{
                    flex: 1,
                    width: { xs: '100%', lg: 'calc(100dvw - var(--Sidebar-width))' },
                    minHeight: '100%',
                    mx: 'auto',
                    pt: 'var(--Header-height)',
                    borderRadius: '0',
                }}
            >
                <Routes>
                    <Route
                        path="/"
                        index
                        element={<Messages />}
                    />
                    <Route
                        path={COMPLIANCE_CHECKER_PATH}
                        element={<ComplianceChecker />}
                    />
                    <Route
                        path="*"
                        element={<ErrorPageNotFound />}
                    />
                </Routes>
            </Paper>
        </Box>
    )
}

export default Main;