import React from "react";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { appName, SETTINGS_TITLE } from "../../../config/appConfig";

function Footer() {
    return (
        <Stack className="Footer"
            sx={{
                width: '100%',
                height: 'var(--Footer-height)',
            }}
        >
            <Typography
                variant="caption"
                sx={{
                    color: 'text.secondary',
                    textAlign: "center",
                    pt: '10px',
                    pb: '10px',
                    whiteSpace: 'nowrap',
                }}
            >
                {SETTINGS_TITLE} - {appName}
            </Typography>
        </Stack>
    );
}

export default Footer;