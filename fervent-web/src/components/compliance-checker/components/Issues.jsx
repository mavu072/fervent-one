import React from "react";
import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';
import SectionLoader from "../../loader/SectionLoader";

function Issues({ issues, loading }) {
    return (
        <Stack flex={1}>
            <Typography gutterBottom variant="h7" component="div" fontWeight={600} pb={2}>
                <Chip label={issues?.length || 0} /> All issues
            </Typography>

            {loading && <SectionLoader />}
            {issues && issues.map((issue, index) => {
                const { sectionTitle, nonCompliantText, explanation, reference, suggestedAlternative } = issue;
                return (
                    <Card key={index} variant="outlined" sx={{ maxWidth: '100%' }}>
                        <CardContent>
                            <Typography component="span">
                                <Typography
                                    variant="body2"
                                    component="span"
                                    sx={{
                                        color: 'text.secondary',
                                        textDecoration: "line-through",
                                    }}
                                >
                                    {nonCompliantText}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    component="span"
                                    sx={{ color: 'text.secondary', p: 1 }}
                                >
                                    &rarr;
                                </Typography>

                                <Typography
                                    variant="body2"
                                    component="span"
                                    sx={{
                                        color: 'text.secondary',
                                    }}
                                >
                                    {suggestedAlternative.text}
                                </Typography>
                            </Typography>

                            <Typography variant="body2" sx={{ color: 'text.primary', pt: 1 }}>
                                {explanation}
                            </Typography>
                        </CardContent>
                    </Card>
                )
            })}
        </Stack>
    );
}

export default Issues;