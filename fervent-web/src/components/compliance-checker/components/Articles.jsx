import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Issues from "./Issues";
import Insights from "./Insights";
import ArticleContent from "./ArticleContent";

/**
 * Articles
 * @param {object} obj 
 * @param {Array<object>} obj.articles Articles.
 * @returns JSX Component.
 */
function Articles({ articles }) {
    const [expanded, setExpanded] = useState(articles[0]?.id);

    const handleExpand = (target) => (event, newTarget) => {
        setExpanded(newTarget ? target : false);
    }

    return (
        <Stack flex={1}>
            {articles && articles.map((article, index) => {
                const id = index;
                const { text, nonCompliantSections, compliantSections } = article;

                return (
                    <Accordion
                        key={id}
                        expanded={expanded === id}
                        onChange={handleExpand(id)}
                        sx={{ boxShadow: "none", width: "100%" }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${id}-content`}
                            id={`panel${id}-header`}
                            sx={{ p: 0, height: "50px" }}
                        >
                            <Typography gutterBottom variant="h7" component="span" fontWeight={600}>
                                Article {id + 1}
                            </Typography>

                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0 }}>
                            <Stack flex={1} gap={2}>
                                <ArticleContent text={text} />
                                <Issues issues={nonCompliantSections} />
                                <Insights insights={compliantSections} />
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Stack>
    );
}

export default Articles;