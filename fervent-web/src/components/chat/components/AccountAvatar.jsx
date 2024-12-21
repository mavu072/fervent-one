import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../../../util/avatarUtil";
import { stringToColor } from "../../../util/colorUtil";

function AccountAvatar(props) {
  const { user, placement = "bottom", tooltipTitle = null } = props;
  return (
    <Tooltip title={tooltipTitle ? tooltipTitle : user.displayName ? user.displayName : user.email} placement={placement}>
      <Avatar
        variant="outlined"
        size="sm"
        {...stringAvatar(user.displayName ? user.displayName : user.email, stringToColor(user.displayName ? user.displayName : user.email))}
      />
    </Tooltip>
  )
}

export default AccountAvatar;