import React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Grow from "@mui/material/Grow";
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';

/**
 * AttachmentBubble.
 * @param {object} props
 * @param {boolean} props.isSent
 * @param {object} props.attachment
 * @param {string} props.attachment.name
 * @param {number} props.attachment.size
 * @param {string} props.arrivedAt Date String
 * @returns JSX Component
 */
function AttachmentBubble({ isSent, attachment, arrivedAt }) {
    return (
        <Tooltip title={arrivedAt} placement={isSent ? "left" : "right"}>
            <Grow in>
                <Paper
                    variant="outlined"
                    sx={{
                        px: 1.75,
                        py: 1.25,
                        borderRadius: 'var(--Chat-Bubble-radius)',
                        borderTopRightRadius: isSent ? 0 : 'var(--Chat-Bubble-radius)',
                        borderTopLeftRadius: isSent ? 'var(--Chat-Bubble-radius)' : 0,
                        backgroundColor: 'background.body',
                    }}
                >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar color="primary" size="lg">
                            <InsertDriveFileRoundedIcon />
                        </Avatar>
                        <div>
                            <Typography fontSize="sm">{attachment.name}</Typography>
                            <Typography level="body-sm">{attachment.size}</Typography>
                        </div>
                    </Stack>
                </Paper>
            </Grow>
        </Tooltip>
    );
}

export default AttachmentBubble;