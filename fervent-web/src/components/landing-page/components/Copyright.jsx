import React from "react";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { orgName } from "../../../config/appConfig";

/**
 * Copyright.
 * @param {object} props Props
 * @param {object} props.sx The system prop that allows defining system overrides as well as additional CSS styles.
 * @returns JSX Component
 */
function Copyright({ sx = {}}) {
    return (
        <Typography variant="body2" color="text.secondary" mt={1} sx={{ ...sx }}>
            {'Copyright © '}<Link href="/about" color="inherit">{orgName}</Link>&nbsp;{new Date().getFullYear()}{'. All Rights Reserved.'}
        </Typography>
    );
}

export default Copyright;