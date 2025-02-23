import React from "react";
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

/**
 * MenuButton.
 * @param {object} props
 * @param {Function} props.onClickHandler 
 * @returns JSX Component
 */
function MenuButton({ onClickHandler }) {
    return (
        <IconButton
            onClick={() => onClickHandler()}
            variant="outlined"
            color="neutral"
            size="sm"
        >
            <MenuRoundedIcon />
        </IconButton>
    );
}

export default MenuButton;