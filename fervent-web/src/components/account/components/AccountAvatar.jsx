import React from "react";
import firebase from "firebase/compat/app";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../../../util/avatarUtil";
import { stringToColor } from "../../../util/colorUtil";

/**
 * AccountAvatar.
 * @param {object} props 
 * @param {firebase.User} props.user
 * @param {string} props.placement
 * @param {string | undefined} props.tooltipTitle
 * @returns JSX Component
 */
function AccountAvatar({ user, placement = "bottom", tooltipTitle = undefined }) {
  const username = user.displayName ? user.displayName : user.email;
  const title = tooltipTitle ? tooltipTitle : "";
  const avatarBgColor = stringToColor(username);

  return (
    <Tooltip title={title} placement={placement}>
      <Avatar
        variant="outlined"
        size="sm"
        {...stringAvatar(username, avatarBgColor)}
      />
    </Tooltip>
  )
}

export default AccountAvatar;