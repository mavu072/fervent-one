import React, { useContext } from "react";
import IconButton from '@mui/material/IconButton';
import CollapseIcon from "@mui/icons-material/KeyboardArrowLeft";
import ExpandIcon from "@mui/icons-material/KeyboardArrowRight";
import { SidebarContext } from "../../context-provider/SidebarContext";

/**
 * ToggleCollapseSidebar.
 * @returns JSX Component
 */
function ToggleCollapseSidebar() {
    const { collapsed, toggleCollapse } = useContext(SidebarContext);

    return (
        <IconButton
            onClick={toggleCollapse}
            variant="outlined"
            color="neutral"
            size="sm"
            sx={{
                p: 1,
                // color: (theme) => theme.palette.mode === 'light' ? 'grey.300' : 'grey.700',
                ':hover': {
                    backgroundColor: 'inherit'
                },
            }}
        >
            {collapsed ? <ExpandIcon /> : <CollapseIcon />}
        </IconButton>
    );
}

export default ToggleCollapseSidebar;