import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SectionTitle, { CompliantText, Details } from "./ArticleSection";

/**
 * CompliantCard.
 * @param {object} obj 
 * @returns JSX Component.
 */
function CompliantCard({ id, details }) {
    const { sectionTitle, compliantText, positiveNote } = details;

    return (
        <Card key={id} variant="outlined" sx={{ maxWidth: '100%' }}>
            <CardContent>
                <SectionTitle title={sectionTitle} />
                <CompliantText text={compliantText} />
                <Details text={positiveNote} />
            </CardContent>
        </Card>
    );
}

export default CompliantCard;