import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SectionTitle, { Details } from "./ArticleSection";
import ArticleContent from "./ArticleContent";

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

            {errors && errors.map((err, index) => (
                <Card key={index} variant="outlined" sx={{ maxWidth: '100%' }}>
                    <CardContent>
                        <SectionTitle title="Error analysing article..." />
                        <ArticleContent text={err?.text} />
                        <Details text={err?.error} />
                    </CardContent>
                </Card>
            ))}
        </Stack>
    );
}

export default Errors;