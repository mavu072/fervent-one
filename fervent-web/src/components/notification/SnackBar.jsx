import React, { Fragment, useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

/**
 * SnackBarNotification.
 * @param {object} props
 * @param {string} props.message
 * @returns JSX Component
 */
function SnackBarNotification({ message }) {
    const [open, setOpen] = useState(false);

    useEffect(() => { setOpen(true); }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    const closeAction = (
        <Fragment>
            <IconButton size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={message}
            action={closeAction}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{
                zIndex: 9999,
            }}
        />
    );
}

export default SnackBarNotification;