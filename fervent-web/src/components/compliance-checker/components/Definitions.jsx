import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from "@mui/material/styles";

const definitions = [
    {
        term: "Article",
        meaning: "refers to a subset of all the clauses/sections in a document."
    },
    {
        term: "Clause",
        meaning: "is a statement, rule, condition, or requirement in a document."
    }
];

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

/**
 * Definitions.
 * @returns JSX Component.
 */
function Definitions() {
    const [expanded, setExpanded] = useState(false);

    function handleClickExpand() {
        setExpanded(expanded === false ? true : false); // Toggle.
    }

    return (
        <Card variant="outlined" sx={{ maxWidth: '100%' }}>
            <CardActions sx={{ py: 0.5, px: 1 }} disableSpacing>
                <Typography variant="body1" component="small" sx={{ color: 'text.secondary' }}>
                    Glossary
                </Typography>
                <ExpandMore
                    expand={expanded}
                    onClick={handleClickExpand}
                    aria-expanded={expanded}
                    aria-label="Collapse"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{ m: 0, py: 0, "&:last-child": { pb: 1 } }}>
                    <Stack gap={0.5}>
                        {definitions.map((item, index) => (
                            <Typography key={index} variant="body2" component="small" sx={{ color: 'text.secondary' }}>
                                &bull; <strong>{item.term}</strong> {item.meaning}
                            </Typography>
                        ))}
                    </Stack>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default Definitions;