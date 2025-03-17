import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MessagesPane from "../../chat/MessagesPane";
import ComplianceCheckerPane from "../../compliance-checker/ComplianceCheckerPane";
import SnackBarNotification from "../../notification/SnackBar";
import { AppContext } from "../../context-provider/AppContext";
import { ErrorPageNotFound } from "../../error/RouteErrors";
import { COMPLIANCE_CHECKER_PATH } from "../../../config/appConfig";

/**
 * MainContent.
 * @returns JSX component
 */
function MainContent() {
    const { infoMsg } = useContext(AppContext); // Display messages from all nested routes.

    return (
        <Box component="section" className="MainContent" sx={{ flex: 1 }}>
            {infoMsg.message && <SnackBarNotification key={infoMsg.count} message={infoMsg.message} />}
            <Paper
                sx={{
                    flex: 1,
                    width: '100%',
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
                        element={<MessagesPane />}
                    />
                    <Route
                        path={COMPLIANCE_CHECKER_PATH}
                        element={<ComplianceCheckerPane />}
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

export default MainContent;