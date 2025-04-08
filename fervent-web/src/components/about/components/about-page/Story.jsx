import React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { appName } from '../../../../config/appConfig';

function Story() {
    return (
        <Box
            id="story"
            sx={(theme) => ({
                width: '100%',
                bgcolor: theme.palette.mode === 'light' ? '#FFF' : `${alpha('#090E10', 0.0)}`,
            })}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'left', sm: 'center' },
                    pt: { xs: 4, sm: 12 },
                    pb: { xs: 8, sm: 14 },
                }}
            >
                <Stack useFlexGap sx={{ width: '100%' }}>
                    <Box
                        sx={{
                            width: '100%',
                            textAlign: { xs: 'left', sm: 'center' },
                        }}
                    >
                        <Typography component="h2" variant="h4" color="text.primary">
                            Our Story
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                        >
                            Why we created {appName}.
                        </Typography>
                    </Box>
                    <Typography
                        component="div"
                        variant="body1"
                        color="text.secondary"
                        sx={{ alignSelf: 'center', width: '100%' }}
                    >
                        <p>
                            {appName} was born out of a need for accessible, clear, and reliable legal information for South African employees and labourers. Many workers face unfair treatment, contract disputes, and workplace injustices but struggle to navigate complex labour laws or afford legal assistance.
                        </p>
                        <p>
                            The idea for {appName} came from the first-hand workplace experiences of our founders, their family, and friends. Seeing loved ones struggle with unpaid wages, unfair dismissals, and deceptive contracts made us realize how difficult it is for the average employee to understand and protect their rights.
                        </p>
                        <p>
                            Recognizing this gap, we set out to create a solution that empowers employees with knowledge and confidence in the workplace. Using AI-powered technology, we built a platform that simplifies legal jargon, provides instant access to employment laws, and helps users understand their rights in real-world scenarios.
                        </p>
                        <p>
                            Our goal is simple: to make workplace rights understandable and accessible for all. {appName} is not a law firm and does not provide legal advice, but it serves as a powerful tool to inform and guide employees in handling workplace challenges.
                        </p>
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
}

export default Story;