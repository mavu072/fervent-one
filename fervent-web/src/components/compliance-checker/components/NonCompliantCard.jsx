import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SectionTitle, { NonCompliantText, SuggestedAlternative, Details, ForwardArrow } from "./ArticleSection";
import TextSearch from "./TextSearch";


/**
 * NonCompliantCard.
 * @param {object} obj 
 * @returns JSX Component.
 */
function NonCompliantCard({ id, details, onTextSearch }) {
    const { sectionTitle, nonCompliantText, explanation, reference, suggestedAlternative } = details;

    return (
        <Card key={id} variant="outlined" sx={{ maxWidth: '100%' }}>
            <CardContent>
                <SectionTitle title={sectionTitle} />
                <NonCompliantText text={nonCompliantText} />
                <ForwardArrow />
                <SuggestedAlternative suggestion={suggestedAlternative} />
                <Details text={explanation} />
                <TextSearch text={nonCompliantText} onTextSearch={onTextSearch} />
            </CardContent>
        </Card>
    );
}

export default NonCompliantCard;