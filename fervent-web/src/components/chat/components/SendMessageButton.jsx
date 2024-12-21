import React from "react";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

function SendMessageButton(props) {
    const { onSendMessage } = props;
    return (
        <Tooltip title="Send message">
            <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                sx={{ justifySelf: 'flex-end' }}
                onClick={() => { onSendMessage() }}
            >
                <SendRoundedIcon />
            </IconButton>
        </Tooltip>
    )
}

export default SendMessageButton;