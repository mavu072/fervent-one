import React from "react";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

/**
 * OverallScoreCard.
 * @param {object} props
 * @param {number} props.score
 * @returns JSX Component
 */
function OverallScoreCard({ score = 0 }) {
    return (
        <Card variant="outlined" sx={{ maxWidth: 'fit-content', background: 'transparent' }}>
            <CardContent
                sx={{
                    p: 1,
                    "&:last-child": {
                        pb: 1,
                    }
                }}
            >
                <Typography variant="h7" component="div" sx={{ color: 'text.secondary' }}>
                    <strong>{score}</strong> Overall score
                </Typography>
            </CardContent>
        </Card>
    );
}

export default OverallScoreCard;