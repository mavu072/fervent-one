import React from "react";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

/**
 * SectionTitle.
 * @param {object} props
 * @param {string} props.title The title of a section/clause within an article in a document.
 * @returns JSX Component
 */
function SectionTitle({ title }) {
    return (
        <Typography
            variant="h7"
            component="div"
            sx={{
                color: 'text.secondary',
                fontWeight: 600,
                pb: 1,
            }}
        >
            {title}
        </Typography>
    );
}

export function CompliantText({ text }) {
    return (
        <Typography
            variant="body2"
            component="span"
            sx={{
                color: 'text.secondary',
            }}
        >
            {text}
        </Typography>
    );
}

export function NonCompliantText({ text }) {
    return (
        <Typography
            variant="body2"
            component="span"
            sx={{
                color: 'text.secondary',
                textDecoration: "line-through",
                textDecorationColor: "crimson",
            }}
        >
            {text}
        </Typography>
    );
}

export function SuggestedAlternative({ suggestion = {} }) {
    return (
        <Typography
            variant="body2"
            component="div"
            sx={{
                bgcolor: "success.main",
                color: 'white',
                p: 1,
                borderRadius: "5px",
                boxDecorationBreak: "clone",
                fontWeight: 600,
            }}
        >
            <AutoAwesomeIcon sx={{ width: '15px', height: '15px' }} />
            &nbsp;
            {suggestion?.text || ""}
        </Typography>
    );
}

export function Details({ text }) {
    return (
        <Typography variant="body2" sx={{ color: 'text.primary', pt: 1 }}>
            {text}
        </Typography>
    );
}

export function ForwardArrow() {
    return (
        <Typography
            variant="body2"
            component="span"
            sx={{ color: 'text.secondary', p: 1, }}
        >
            &rarr;
        </Typography>
    );
}

export default SectionTitle;