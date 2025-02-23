import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/**
 * ArticleContent.
 * @param {object} obj 
 * @param {string} obj.text Text content.
 * @returns JSX Component.
 */
function ArticleContent({ text }) {
    return (
        <Stack flex={1}>
            <Typography component="span" sx={{
                color: 'text.secondary',
                textOverflow: 'ellipsis',
                wordWrap: 'break-word'
            }}>
                {text ? (text.substring(0, 50) + "...") : ""}
            </Typography>
        </Stack>
    )
}

export default ArticleContent;