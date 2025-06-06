import React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import { formatFileSize } from "../../../util/fileUtil";

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
        <Tooltip title={arrivedAt} placement={isSent ? "top" : "top"} arrow>
            <Paper
                variant="outlined"
                sx={(theme) => ({
                    px: 1.75,
                    py: 1.25,
                    borderRadius: 'var(--Chat-Bubble-radius)',
                    backgroundColor: theme.palette.mode === 'light' ? 'background.body' : 'grey.900',
                })}
            >
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar color="primary" size="lg">
                        <InsertDriveFileRoundedIcon />
                    </Avatar>
                    <div>
                        <Typography fontSize="sm">{attachment.name}</Typography>
                        <Typography level="body-sm">{formatFileSize(attachment.size)}</Typography>
                    </div>
                </Stack>
            </Paper>
        </Tooltip>
    );
}

export default AttachmentBubble;