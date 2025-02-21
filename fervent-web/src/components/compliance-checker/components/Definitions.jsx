import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ARTICLE_DEFINITION = "refers to analysed clauses/sections in a document.";

function Definitions() {
    return (
        <Stack gap={0.5}>
            <Typography variant="body2" component="small" sx={{ color: 'text.secondary' }}>
                <strong>Article</strong> {ARTICLE_DEFINITION}
            </Typography>
        </Stack>
    );
}

export default Definitions;