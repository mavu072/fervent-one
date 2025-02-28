import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';
import SectionLoader from "../../loader/SectionLoader";
import IssueCard from "./IssueCard";

/**
 * Issues.
 * @param {object} obj 
 * @param {Array<object>} obj.issues Possible issues.
 * @param {boolean} obj.loading Loading.
 * @returns JSX Component
 */
function Issues({ issues, loading = false, onTextSearch }) {
    return (
        <Stack flex={1} gap={1}>
            <Typography gutterBottom variant="h7" component="div" fontWeight={600}>
                <Chip label={issues?.length || 0} sx={{ bgcolor: "warning.main", color: "white" }} /> All issues
            </Typography>

            {loading && <SectionLoader />}
            {issues && issues.map((issue, index) => (
                <IssueCard
                    key={index}
                    id={index}
                    details={issue}
                    onTextSearch={onTextSearch}
                />))}
        </Stack>
    );
}

export default Issues;