import React from "react";
import MuiButton from "@mui/material/Button";
import Typography from "@mui/material/Typography";

/**
 * Button.
 * @description A generic all-purpose button component.
 * @param {object} props
 * @param {string} props.title Button title.
 * @param {React.JSX.Element} props.icon Button icon.
 * @param {"contained" | "text" | "outlined"} props.variant Button variant.
 * @param {boolean} props.autoFocus AutoFocus.
 * @param {Function} props.handleClick OnClick event handler.
 * @returns JSX Component.
 */
function Button({ title, icon, variant="contained", autoFocus = false, handleClick }) {
    return (
        <MuiButton
            color="primary"
            variant={variant}
            size="small"
            type="button"
            component="label"
            onClick={handleClick}
            startIcon={icon}
            autoFocus
        >
            <Typography textTransform={"none"}>{title}</Typography>
        </MuiButton>
    );
}

export default Button;