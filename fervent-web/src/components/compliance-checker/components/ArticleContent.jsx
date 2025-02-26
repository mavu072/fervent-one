import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from "../../buttons/Button";

/**
 * ArticleContent.
 * @param {object} obj 
 * @param {string} obj.text Text content.
 * @returns JSX Component.
 */
function ArticleContent({ text }) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <React.Fragment>
            <Stack flex={1}>
                <Button title="View article" handleClick={handleClickOpen} variant="outlined" />
            </Stack>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                sx={{
                    zIndex: 9999,
                }}
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Article"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button title="Done" variant="text" autoFocus handleClick={handleClose} />
                </DialogActions>
            </Dialog>
        </React.Fragment>

    );
}

export default ArticleContent;