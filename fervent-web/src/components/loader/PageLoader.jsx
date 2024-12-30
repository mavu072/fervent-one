import React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from '@mui/material/CircularProgress';

function PageLoader() {
    return (
        <Stack sx={{
            height: '100dvh',
            width: '100dvw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <CircularProgress />
        </Stack>
    );
}

export default PageLoader;