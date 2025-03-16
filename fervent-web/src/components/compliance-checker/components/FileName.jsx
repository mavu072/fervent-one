import React from "react";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import ClearButton from "../../buttons/ClearButton";

/**
 * FileName.
 * @param {object} props 
 * @param {string} props.fileName File name.
 * @param {Function} props.onRemoveFile Handle remove file.
 * @returns JSX Component
 */
function FileName({ fileName, onRemoveFile }) {
    return (
        <Box className="File-name"
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Typography variant="h6" component="div"
                sx={{
                    width: "100%",
                    fontWeight: 600,
                    textWrap: "wrap",
                }}
            >
                {fileName}
            </Typography>
            <ClearButton handleClick={onRemoveFile} tooltipTitle="Remove file" />
        </Box>
    );
}

export default FileName;