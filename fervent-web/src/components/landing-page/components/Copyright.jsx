import React from "react";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { orgName } from "../../../config/appConfig";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" mt={1}>
            {'Copyright © '}<Link href="/about">{orgName}</Link>&nbsp;{new Date().getFullYear()}{'. All Rights Reserved.'}
        </Typography>
    );
}

export default Copyright;