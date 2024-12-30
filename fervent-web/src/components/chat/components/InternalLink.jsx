import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ComplianceReport from "./ComplianceReport";

/**
 * InternalLink.
 * @param {object} props 
 * @param {object} props.source 
 * @param {string} props.source.title 
 * @param {string} props.source.link 
 * @param {string} props.source.type 
 * @returns JSX Component
 */
function InternalLink({ source }) {
    const [open, setOpen] = useState(false);

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Button size="small" onClick={handleOpen}>
                <PlayArrowIcon />
                <Typography>{source.title}</Typography>
            </Button>
            <ComplianceReport dataUrl={source.link} open={open} onClose={handleClose} />
        </React.Fragment>
    );
}

export default InternalLink;