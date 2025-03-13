import React from "react";
import Typography from "@mui/material/Typography";
import { appName } from "../../../config/appConfig";

function PageTitle() {
    return (
        <Typography
            component="h1"
            variant="h3"
            sx={{ mt: 2, textAlign: { xs: 'center', sm: 'left' } }}
        >
            Sign in to {appName}
        </Typography>
    );
}

export default PageTitle;