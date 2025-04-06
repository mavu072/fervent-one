import React from "react";
import Typography from '@mui/material/Typography';
import { orgName } from "../../../../config/appConfig";

/**
 * Copyright.
 * @param {object} props Props
 * @param {object} props.sx The system prop that allows defining system overrides as well as additional CSS styles.
 * @returns JSX Component
 */
function Copyright({ sx = {} }) {
    return (
        <Typography variant="body2" color="text.secondary" sx={{ ...sx }}>
            {'Copyright © '}
            <Typography
                variant="body2"
                component="span"
                color="inherit"
                sx={{
                    textDecoration: "underline",
                    cursor: "pointer"
                }}
                onClick={() => window.open("/about", "_blank")}
            >
                {orgName}
            </Typography>
            &nbsp;{new Date().getFullYear()}{'. All Rights Reserved.'}
        </Typography>
    );
}

export default Copyright;