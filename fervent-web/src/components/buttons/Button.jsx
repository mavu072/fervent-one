import React from "react";
import MuiButton from "@mui/material/Button";
import Typography from "@mui/material/Typography";

/**
 * Button.
 * @description A generic all-purpose button component.
 * @param {object} props
 * @returns JSX Component.
 */
function Button({ title, handleClick, icon, variant = "contained", color = "primary", autoFocus = false, loading = false,
    loadingPosition = "center", sx = {} }) {
    return (
        <MuiButton
            type="button"
            size="small"
            color={color}
            variant={variant}
            onClick={handleClick}
            startIcon={icon}
            autoFocus={autoFocus}
            loading={loading}
            loadingPosition={loadingPosition}
            sx={sx}
        >
            <Typography textTransform={"none"}>{title}</Typography>
        </MuiButton>
    );
}

export default Button;