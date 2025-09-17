import React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import ClearIcon from '@mui/icons-material/Clear';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import IconButton from "@mui/material/IconButton";
import { Grow } from "@mui/material";
import { getFileType } from "../../../util/fileUtil";

/**
 * FileInput.
 * @param {object} props 
 * @param {string | number} props.fileId
 * @param {File} props.file
 * @param {Function} props.onRemoveFile
 * @returns JSX Component
 */
function FileInput({ fileId, file, onRemoveFile }) {

    function handleClick() {
        onRemoveFile(fileId);
    }

    return (
        <Grow in >
            <Paper
                variant="outlined"
                sx={{
                    px: 1,
                    py: 1,
                    borderRadius: 4,
                    backgroundColor: 'background.body', 
                }}
            >
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar color="primary" size="sm">
                        <InsertDriveFileRoundedIcon />
                    </Avatar>
                    <Stack pr={2}>
                        <Tooltip title={file.name} arrow>
                            <Typography
                                variant="caption"
                                sx={{
                                    display: 'block',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '100px',
                                }}
                            >
                                {file.name}
                            </Typography>
                        </Tooltip>
                        <Typography variant="caption" sx={{ display: 'block', textTransform: "uppercase" }}>
                            {getFileType(file.type)}
                        </Typography>
                    </Stack>
                    <IconButton size="small" onClick={handleClick}>
                        <ClearIcon />
                    </IconButton>
                </Stack>
            </Paper>
        </Grow>
    );
}

export default FileInput;