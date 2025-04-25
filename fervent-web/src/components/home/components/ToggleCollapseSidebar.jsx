import React from "react";
import IconButton from '@mui/material/IconButton';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebarOutlined';

/**
 * ToggleCollapseSidebar.
 * @param {object} props
 * @param {Function} props.onClickHandler 
 * @returns JSX Component
 */
function ToggleCollapseSidebar({ onClickHandler }) {
    return (
        <IconButton
            onClick={() => onClickHandler()}
            variant="outlined"
            color="neutral"
            size="sm"
            sx={{
                p: 0,
            }}
        >
            <ViewSidebarIcon />
        </IconButton>
    );
}

export default ToggleCollapseSidebar;