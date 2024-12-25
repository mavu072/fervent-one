import React from "react";
import firebase from "firebase/compat/app";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
// import Divider from "@mui/material/Divider";
import AccountAvatar from './AccountAvatar';
import SignOutButton from "../../login/components/SignOutButton";

/**
 * AccountContextMenu.
 * @param {object} props 
 * @param {firebase.User} props.user
 * @param {firebase.auth.Auth} props.auth
 * @returns JSX Component
 */
function AccountContextMenu({ user, auth }) {
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
                <AccountAvatar user={user} tooltipTitle={"Open Menu"} />
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
                {/* <MenuItem onClick={handleClose}>My Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <Divider /> */}
                <MenuItem>
                    <SignOutButton label={"Log out"} auth={auth} onClick={handleClose} />
                </MenuItem>
            </Menu>
        </div>
    );
}

export default AccountContextMenu;