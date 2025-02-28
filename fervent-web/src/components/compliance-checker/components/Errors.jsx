import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';
import ErrorCard from "./ErrorCard";

/**
 * Errors.
 * @param {object} obj 
 * @param {Array<object>} obj.errors Errors.
 * @returns JSX Component
 */
function Errors({ errors }) {
    return (
        <Stack flex={1} gap={1}>
            <Typography gutterBottom variant="h7" component="div" fontWeight={600}>
                <Chip label={errors?.length || 0} sx={{ bgcolor: "error.main", color: "white" }} /> All errors
            </Typography>

            {errors && errors.map((err, index) => <ErrorCard key={index} details={err} />)}
        </Stack>
    );
}

export default Errors;