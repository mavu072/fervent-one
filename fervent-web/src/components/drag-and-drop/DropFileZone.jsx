import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { UploadFileButton } from "../buttons/UploadFileButton";

const styleClasses = `
.drag-active {
    background-color: var(--mui-palette-text-disabled);
}
`;

/**
 * DropFileZone.
 * @param {object} props 
 * @param {Function} props.setFiles Function for passing files to state.
 * @param {Function} props.onMessage Function for passing errors and messages to state.
 * @param {string} props.accept Accepted file types.
 * @param {number} props.sizeLimit File size limit.
 * @returns JSX Component
 */
function DropFileZone({ setFiles, accept, sizeLimit = 5000000, onMessage }) {
    const maxLimitMB = Math.floor(sizeLimit / 1000000);

    /**
     * Validate selected files.
     * @param {Array<File> | FileList} files 
     */
    function validateFiles(files) {
        if (files.length === 0) {
            throw new Error("No file selected.");
        }
        if (files.length > 1) {
            throw new Error("Only one file may be uploaded at a time.");
        }

        const extension = files[0].name.split(".")[1];
        const size = files[0].size;

        if (!accept.includes(extension)) {
            throw new Error(`Only files with the following extensions may be uploaded: ${accept}`);
        }
        if (size > sizeLimit) {
            throw new Error(`The specified file could not be uploaded as it's bigger than ${maxLimitMB} MB.`);
        }
    }

    /**
     * Handle drop event.
     * @param {React.SyntheticEvent} event 
     */
    function handleDrop(event) {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        handleChooseFiles(droppedFiles);
    }

    /**
     * Handle choose files.
     * @param {Array<File> | FileList} files 
     */
    function handleChooseFiles(files) {
        try {
            validateFiles(files);
            setFiles(files);
        } catch (error) {
            onMessage(error.message);
        }
    }

    /**
    * Handle drag enter event.
    * @param {React.SyntheticEvent} event 
    */
    function handleDragEnter(event) {
        event.currentTarget.classList.add("drag-active");
    }

    /**
    * Handle drag leave event.
    * @param {React.SyntheticEvent} event 
    */
    function handleDragLeave(event) {
        event.currentTarget.classList.remove("drag-active");
    }

    return (
        <>
            <style>
                {styleClasses}
            </style>
            <Stack
                onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
                onDragStart={handleDragEnter}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    borderStyle: "dotted",
                    borderRadius: "8px",
                    borderColor: "text.disabled",
                    textAlign: "center",
                    p: 4,
                    width: '100%',
                    height: '100%',
                }}
            >
                <FileUploadIcon />
                <Typography>Drag and drop your files.</Typography>
                <Box>
                    <Typography variant="body2" component="span">Limit {maxLimitMB} MB per file.</Typography>
                    &nbsp;
                    <Typography variant="body2" component="span">Supported files: *{accept}.</Typography>
                </Box>
                <Box>
                    <UploadFileButton title="Browse files" onAddSelectedFiles={handleChooseFiles} accept={accept} multiple={false} />
                </Box>
            </Stack>
        </>
    );
}

export default DropFileZone;