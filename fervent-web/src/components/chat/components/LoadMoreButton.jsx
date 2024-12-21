import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RefreshIcon from "@mui/icons-material/RefreshRounded";
import Grow from "@mui/material/Grow";

function LoadMoreButton(props) {
    const { onLoadMore, title = "Load more" } = props;

    const handleClick = () => {
        onLoadMore();
    }

    return (
        <Grow in={true}>
            <Tooltip title={title}>
                <IconButton
                    size="sm"
                    variant="plain"
                    color="neutral"
                    sx={{}}
                    onClick={handleClick}
                >
                    <RefreshIcon />
                </IconButton>
            </Tooltip>
        </Grow>
    )
}

export default LoadMoreButton;