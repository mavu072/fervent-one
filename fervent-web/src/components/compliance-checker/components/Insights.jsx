import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';
import SectionLoader from "../../loader/SectionLoader";
import InsightCard from "./InsightCard";

/**
 * Insights.
 * @param {object} obj 
 * @param {Array<object>} obj.insights Positive insights.
 * @param {boolean} obj.loading Loading.
 * @returns JSX Component
 */
function Insights({ insights, loading = false, onTextSearch }) {
    return (
        <Stack flex={1} gap={1}>
            <Typography gutterBottom variant="h7" component="div" fontWeight={600}>
                <Chip label={insights?.length || 0} sx={{ bgcolor: "secondary.main", color: "white" }} /> All insights
            </Typography>

            {loading && <SectionLoader />}
            {insights && insights.map((insight, index) => (
                <InsightCard
                    key={index}
                    id={index}
                    details={insight}
                    onTextSearch={onTextSearch}
                />
            ))}
        </Stack>
    );
}

export default Insights;