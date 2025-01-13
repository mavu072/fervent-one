import React from "react";
import Paper from '@mui/material/Paper';
import ComplianceCheckerPane from './components/ComplianceCheckerPane';

/**
 * ComplianceChecker
 * @returns JSX Component.
 */
function ComplianceChecker() {

    return (
        <Paper
            sx={{
                flex: 1,
                width: '100%',
                mx: 'auto',
                pt: 'var(--Header-height)',
                borderRadius: 0,
            }}
        >
            <ComplianceCheckerPane />
        </Paper>
    );
}

export default ComplianceChecker;