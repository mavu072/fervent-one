import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SectionTitle, { Details } from "./Clause";
import ArticleContent from "./ArticleContent";

/**
 * ErrorCard.
 * @param {object} props 
 * @returns JSX Component.
 */
function ErrorCard({ details }) {
    const { text, error } = details;
    return (
        <Card variant="outlined" sx={{ maxWidth: '100%' }}>
            <CardContent>
                <SectionTitle title="Error analysing article..." />
                <ArticleContent text={text} />
                <Details text={error} />
            </CardContent>
        </Card>
    );
}

export default ErrorCard;