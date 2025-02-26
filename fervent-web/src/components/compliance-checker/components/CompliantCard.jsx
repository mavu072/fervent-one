import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SectionTitle, { CompliantText, Details } from "./ArticleSection";
import TextSearch from "./TextSearch";

/**
 * CompliantCard.
 * @param {object} obj 
 * @returns JSX Component.
 */
function CompliantCard({ id, details, onTextSearch }) {
    const { sectionTitle, compliantText, positiveNote } = details;

    return (
        <Card key={id} variant="outlined" sx={{ maxWidth: '100%' }}>
            <CardContent>
                <SectionTitle title={sectionTitle} />
                <CompliantText text={compliantText} />
                <Details text={positiveNote} />
                <TextSearch text={compliantText} onTextSearch={onTextSearch} />
            </CardContent>
        </Card>
    );
}

export default CompliantCard;