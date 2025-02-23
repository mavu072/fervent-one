import React from "react";
import Typography from "@mui/material/Typography";

/**
 * FileName.
 * @param {object} props 
 * @param {string} props.name File name.
 * @returns JSX Component
 */
function FileName({ name }) {
    return (
        <Typography variant="h6" component="div"
            sx={{
                width: "100%",
                fontWeight: 600,
                textWrap: { xs: "wrap", sm: "nowrap" },
                textOverflow: "ellipsis",
            }}
        >
            {name}
        </Typography>
    );
}

export default FileName;