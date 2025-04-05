import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';;
import { appName } from "../../../config/appConfig";

const items = [
    {
        title: 'Our Mission',
        description:
            <div>
                <p>
                    Our mission is to make legal information accessible and understandable for all employees and laborers in South Africa.
                </p>
                <p>
                    We believe that every worker deserves to know their rights and have the means to address workplace issues effectively and confidently.
                </p>
            </div>,
    },
    {
        title: 'Our Vision',
        description:
            <div>
                <p>
                    We envision a future where employees are well-informed and equipped to advocate for themselves, creating fairer and more transparent workplaces across the country.
                </p>
                <p>
                    Through innovative technology and a commitment to user empowerment, we strive to be a trusted resource for legal information and guidance.
                </p>
            </div>,
    },
    {
        title: 'Our Product',
        description:
            <div>
                <p>
                    <b>{appName}</b> is our flagship product, designed to bridge the gap between complex legal texts and everyday workplace scenarios.
                </p>
                <p>
                    Leveraging advanced AI technology, our platform provides tailored legal information, compliance checking for employment agreements, and guidance on responding to workplace incidents.
                </p>
            </div>,
    },
];

function Mission() {
    return (
        <Box
            id="mission"
            sx={(theme) => ({
                width: '100%',
                bgcolor: '#06090a',
            })}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', sm: 'left' },
                    pt: { xs: 4, sm: 12 },
                    pb: { xs: 8, sm: 16 },
                }}
            >
                <Stack useFlexGap sx={{ width: '100%' }}>
                    <Box
                        sx={{
                            width: '100%',
                            textAlign: { xs: 'left', sm: 'center' },
                        }}
                    >
                        <Typography component="h2" variant="h4" color="grey.100">
                            Our Vision, Mission & Product
                        </Typography>
                        <Typography variant="body1"
                            sx={{
                                color: 'grey.400',
                                mb: { xs: 2, sm: 4 }
                            }}
                        >
                            What we are doing and how we are doing it.
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            display: { xs: 'flex', md: 'grid' },
                            gridTemplateColumns: `repeat(auto-fill, minmax(min(32%, 100%), 1fr))`,
                            flexDirection: 'column',
                            gap: { xs: 4, sm: 2 },
                        }}
                    >
                        {items.map((card, index) => (
                            <Card key={index}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'grey.800',
                                    background: 'transparent',
                                    backgroundColor: 'grey.900',
                                }}
                            >
                                <CardContent
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                    }}
                                >
                                    <Typography component="div" variant="h5" color="grey.100" textAlign={"center"}>
                                        {card.title}
                                    </Typography>
                                    <Typography component="div" variant="body2" color="grey.400">
                                        {card.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default Mission;