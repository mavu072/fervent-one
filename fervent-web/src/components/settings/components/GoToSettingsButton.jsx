import React, { useContext } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/SettingsRounded';
import { SETTINGS_PATH } from "../../../config/appConfig";
import { SidebarContext } from "../../context-provider/SidebarContext";

/**
 * Go to Settings.
 * @param {object} props  
 * @param {string} props.label (Optional) Button label.
 * @param {Function} props.onClick (Optional) Additional onclick event handler.
 * @returns JSX Component
 */
function GoToSettingsButton({ label = undefined, onClick = undefined }) {
    const { switchTab } = useContext(SidebarContext);

    function handleClick(e) {
        if (onClick) onClick(e);
        switchTab(SETTINGS_PATH);
    }

    return (
        <Button
            type="button"
            fullWidth
            variant="text"
            color="neutral"
            size="small"
            aria-label="button to go to settings"
            onClick={handleClick}
            sx={{
                textTransform: "capitalize",
            }}
            startIcon={<SettingsIcon />}
        >
            {label && <Typography>{label}</Typography>}
        </Button>
    );
}

export default GoToSettingsButton;