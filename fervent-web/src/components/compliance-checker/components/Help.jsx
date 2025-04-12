import React from "react";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const definitions = [
    {
        term: "Article",
        meaning: "refers to a subset of all the clauses or sections in a document."
    },
    {
        term: "Clause",
        meaning: "is a statement, rule, condition, or requirement in a document."
    },
    {
        term: "Issues",
        meaning: "are areas where we find non-compliant clauses or sections."
    },
    {
        term: "Positive Insights",
        meaning: "are the sections that meet compliance standards."
    },
    {
        term: "Overall score",
        meaning: "indicates how well the document meets compliance standards."
    }
];

/**
 * Help.
 * @returns JSX Component.
 */
function Help() {
    const [anchorElement, setAnchorElement] = React.useState(null);
    const open = Boolean(anchorElement);

    function handleClick(event) {
        setAnchorElement(event.currentTarget);
    };

    function handleClose() {
        setAnchorElement(null);
    };

    return (
        <div>
            <IconButton
                id="def-button"
                aria-controls={open ? 'def-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                < HelpOutlineIcon />
            </IconButton>
            <Menu
                id="def-menu"
                anchorEl={anchorElement}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'def-button',
                }}
                sx={{ zIndex: 9996, }}
            >
                <Stack py={1} px={2}>
                    <Typography variant="body2" component="small" sx={{ color: 'text.secondary', pb: 1 }}>
                        Important terms to understand.
                    </Typography>
                    <Stack gap={0.5}>
                        {definitions.map((item, index) => (
                            <Typography key={index} variant="body2" component="small" sx={{ color: 'text.secondary' }}>
                                &bull; <strong>{item.term}</strong> {item.meaning}
                            </Typography>
                        ))}
                    </Stack>
                </Stack>
            </Menu>
        </div>
    );
}

export default Help;