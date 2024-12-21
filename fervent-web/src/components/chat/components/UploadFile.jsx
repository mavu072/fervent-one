import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
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

function UploadFile(props) {
    const { setSelectedFiles } = props;

    const handleChange = (event) => {
        setSelectedFiles((prevFiles) => {
            return [...prevFiles, ...event.target.files];
        });
    }

    return (
        <Stack>
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
                        accept=".jpg,.jpeg,.png,.pdf" // Accepts images and PDFs
                        multiple={true}
                        onChange={handleChange}
                    />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}

export default UploadFile;