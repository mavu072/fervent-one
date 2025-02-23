import React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import { formatFileSize } from "../../../util/fileUtil";

/**
 * FolderItem.
 * @param {object} props
 * @param {object} props.attachment
 * @param {string} props.attachment.name
 * @param {number} props.attachment.size
 * @param {string} props.arrivedAt Date String
 * @returns JSX Component
 */
function FolderItem({ attachment, arrivedAt }) {
    return (
        <Tooltip title={`Uploaded on ${arrivedAt}`} placement="top" >
            <Paper
                variant="outlined"
                sx={{
                    width: '100%',
                    px: 1.75,
                    py: 1.25,
                    backgroundColor: 'background.body',
                    overflow: "hidden",
                }}
            >
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar color="primary" size="lg">
                        <InsertDriveFileRoundedIcon />
                    </Avatar>
                    <Stack>
                        <Typography fontSize="sm" flex={1} textOverflow='ellipsis' noWrap>
                            {attachment.name}
                        </Typography>
                        <Stack direction="row" spacing={1} flex={1}>
                            <Typography level="body-sm" noWrap >
                                {arrivedAt}
                            </Typography>
                            <Typography level="body-sm">
                                &ndash;
                            </Typography>
                            <Typography level="body-sm" noWrap>
                                {formatFileSize(attachment.size)}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        </Tooltip>
    );
}

export default FolderItem;