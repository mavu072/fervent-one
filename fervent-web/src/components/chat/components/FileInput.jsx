import React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ClearIcon from '@mui/icons-material/Clear';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import IconButton from "@mui/material/IconButton";
import { Grow } from "@mui/material";

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
                    borderRadius: 'var(--Chat-Bubble-radius)',
                    backgroundColor: 'background.body',
                }}
            >
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar color="primary" size="sm">
                        <InsertDriveFileRoundedIcon />
                    </Avatar>
                    <Stack>
                        <Typography variant="caption" sx={{ display: 'block' }}>{file.name}</Typography>
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