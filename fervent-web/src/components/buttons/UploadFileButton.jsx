import React from "react";
import Box from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AttachFileIcon from '@mui/icons-material/AttachFileRounded';
import { styled } from "@mui/material/";

const HiddenFileInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

/**
 * UploadFileButton.
 * @param {object} props Props
 * @param {string} props.title Button title. Default is `Upload file`.
 * @param {Function} props.onAddSelectedFiles Updater function for the saved state of the file input.
 * @param {string} props.accept Comma seperated file types e.g. ".jpg,.jpeg,.png,.pdf". Defaults to all.
 * @param {boolean} props.multiple Allow multiple files. Defaults to false.
 * @returns JSX Component
 */
export function UploadFileButton({ title = "Upload file", onAddSelectedFiles, accept = "*", multiple = false }) {

    const handleChange = (event) => {
        onAddSelectedFiles(event.target.files);
    }

    return (
        <Button
            color="primary"
            variant="contained"
            size="small"
            type="button"
            component="label"
        >
            <Typography textTransform={"none"}>{title}</Typography>
            <HiddenFileInput
                type="file"
                accept={accept} // Accepts images and PDFs
                multiple={multiple}
                onChange={handleChange}
            />
        </Button>
    );
}

/**
 * UploadFileIconButton.
 * @param {object} props Props
 * @param {Function} props.onAddSelectedFiles Updater function for the saved state of the file input.
 * @param {string} props.accept Comma seperated file types e.g. ".jpg,.jpeg,.png,.pdf". Defaults to all.
 * @param {boolean} props.multiple Allow multiple files. Defaults to false.
 * @returns JSX Component
 */
function UploadFileIconButton({ onAddSelectedFiles, accept = "*", multiple = false }) {

    const handleChange = (event) => {
        onAddSelectedFiles(event.target.files);
    }

    return (
        <Box>
            <Tooltip title="Upload file">
                <IconButton
                    component="label"
                    size="sm"
                    variant="plain"
                    color="neutral"
                >
                    <AttachFileIcon />
                    <HiddenFileInput
                        type="file"
                        accept={accept} // Accepts images and PDFs
                        multiple={multiple}
                        onChange={handleChange}
                    />
                </IconButton>
            </Tooltip>
        </Box>
    );
}

export default UploadFileIconButton;