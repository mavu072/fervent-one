import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { UploadFileButton } from "../buttons/UploadFileButton";

/**
 * DropFileZone.
 * @param {object} props 
 * @returns JSX Component
 */
function DropFileZone({ files, setFiles, accept }) {

    /**
     * Handle drop event.
     * @param {React.SyntheticEvent} event 
     */
    function handleDrop(event) {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        if (droppedFiles.length > 0) {
            setFiles(droppedFiles);
        } 
    }

    /**
     * Handle choose file event.
     * @param {React.SyntheticEvent} event 
     */
    function handleChooseFile(files) {
        setFiles(files);
    }

    return (
        <Stack
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                borderStyle: "dotted",
                borderRadius: "8px",
                textAlign: "center",
                p: 2,
            }}
        >
            <FileUploadIcon />
            <Typography>Drag and drop your files.</Typography>
            <Box>
                <Typography variant="body2" component="span">Limit 15 MB per file.</Typography>
                &nbsp;
                <Typography variant="body2" component="span">Supported files: *{accept}.</Typography>
            </Box>
            <Box>
                <UploadFileButton title="Browse files" onAddSelectedFiles={handleChooseFile} accept={accept} multiple={false} />
            </Box>

        </Stack>
    );
}

export default DropFileZone;