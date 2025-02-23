import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

/**
 * DirectionArrowButton.
 * @param {object} props 
 * @returns JSX Component
 */
function DirectionArrowButton({ handleClick, disabled = false, variant, invertDarkMode = false }) {
    const isLeft = variant === "left" ? true : false;
    return (
        <Box>
            <IconButton
                onClick={handleClick}
                variant="outlined"
                color="neutral"
                size="sm"
                disabled={disabled}
                sx={[
                    (theme) => theme.applyStyles("dark", {
                        color: invertDarkMode ? "grey" : "default",
                        "&.Mui-disabled": {
                            color: invertDarkMode ? "lightgrey" : "default",
                        },
                    }),
                ]}
            >
                {isLeft && <ArrowCircleLeftIcon />}
                {!isLeft && <ArrowCircleRightIcon />}
            </IconButton>
        </Box>
    );
}

export default DirectionArrowButton;