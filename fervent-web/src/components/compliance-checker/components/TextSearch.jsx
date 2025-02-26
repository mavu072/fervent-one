import React from "react";
import Box from '@mui/material/Box';
import Button from "../../buttons/Button";
import FindInPageIcon from '@mui/icons-material/FindInPage';

/**
 * TextSearch.
 * @param {object} props 
 * @param {string} props.text The text to search.
 * @param {Function} props.onTextSearch The function to perform and handle the search.
 * @returns JSX Component.
 */
function TextSearch({ text, onTextSearch }) {
    return (
        <Box
            sx={{
                pt: 1,
                display: "flex",
                justifyContent: "flex-end",
            }}
        >
            <Button
                title="Find clause on page"
                icon={<FindInPageIcon />}
                variant="outlined"
                handleClick={() => { onTextSearch(text); }}
            />
        </Box>
    );
}

export default TextSearch;