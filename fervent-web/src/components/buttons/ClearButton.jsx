import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from "@mui/material/Tooltip";

/**
 * ClearButton.
 * @param {object} props Props
 * @param {Function} props.handleClick Handler function for the on click event.
 * @param {boolean} props.disabled If true, the component is disabled.
 * @param {string} props.tooltipTitle Custom Tooltip title. Default is `Clear`. Pass empty string to disable tooltip.
 * @returns JSX Component
 */
function ClearButton({ handleClick, disabled = false, tooltipTitle = "Clear" }) {
    return (
        <Box>
            <Tooltip title={tooltipTitle}>
                <IconButton
                    onClick={handleClick}
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    disabled={disabled}
                >
                    <ClearIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
}

export default ClearButton;