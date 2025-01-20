import React, { useContext } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import AccountAvatar from './AccountAvatar';
import SignOutButton from "../login/components/SignOutButton";
import { AppContext } from "../context-provider/AppContext";
import AccountPreview from "./AccountPreview";

/**
 * AccountContextMenu.
 * @returns JSX Component
 */
function AccountContextMenu() {
    const { user, } = useContext(AppContext);

    const [anchorElement, setAnchorElement] = React.useState(null);
    const open = Boolean(anchorElement);

    function handleClick(event) {
        setAnchorElement(event.currentTarget);
    };

    function handleClose() {
        setAnchorElement(null);
    };

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size="small"
            >
                <AccountAvatar user={user} />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorElement}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{ zIndex: 9996, }}
            >
                <AccountPreview />
                {/* <MenuItem onClick={handleClose}>My Profile</MenuItem> */}
                {/* <MenuItem onClick={handleClose}>Settings</MenuItem> */}
                <Divider />
                <MenuItem>
                    <SignOutButton label={"Log out"} onClick={handleClose} />
                </MenuItem>
            </Menu>
        </div>
    );
}

export default AccountContextMenu;