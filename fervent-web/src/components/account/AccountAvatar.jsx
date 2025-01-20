import React from "react";
import firebase from "firebase/compat/app";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../../util/avatarUtil";
import { stringToColor } from "../../util/colorUtil";

/**
 * AccountAvatar.
 * @param {object} props 
 * @param {firebase.User} props.user
 * @param {string | undefined} props.tooltipTitle
 * @returns JSX Component
 */
function AccountAvatar({ user, tooltipTitle = undefined, placement = "bottom", variant = "outlined", size = "sm" }) {
  const username = user.displayName ? user.displayName : user.email;
  const title = tooltipTitle ? tooltipTitle : "";
  const avatarBgColor = stringToColor(username);

  return (
    <Tooltip title={title} placement={placement}>
      <Avatar
        variant={variant}
        size={size}
        {...stringAvatar(username, avatarBgColor)}
      />
    </Tooltip>
  )
}

export default AccountAvatar;