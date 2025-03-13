import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const definitions = [
    {
        term: "Article",
        meaning: "refers to a subset of all the clauses/sections in a document."
    },
    {
        term: "Clause",
        meaning: "is a statement, rule, condition, or requirement in a document."
    }
]

/**
 * Definitions.
 * @returns JSX Component.
 */
function Definitions() {
    return (
        <Card variant="outlined" sx={{ maxWidth: '100%' }}>
            <CardContent
                sx={{
                    p: 1,
                    "&:last-child": {
                        pb: 1,
                    }
                }}
            >
                <Stack gap={0.5}>
                    <Typography variant="body1" component="small" sx={{ color: 'text.secondary' }}>
                        Glossary
                    </Typography>
                    {definitions.map((item, index) => (
                        <Typography key={index} variant="body2" component="small" sx={{ color: 'text.secondary' }}>
                            &bull; <strong>{item.term}</strong> {item.meaning}
                        </Typography>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}

export default Definitions;