import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ConfirmationDialog({ dialogTitle, dialogContent, confirmAction, dismissAction, open }) {
    return (
        <Dialog
            open={open}
            onClose={dismissAction}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                zIndex: 9999,
            }}
        >
            <DialogTitle id="alert-dialog-title">
                {dialogTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialogContent}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={dismissAction}>Cancel</Button>
                <Button onClick={confirmAction} autoFocus>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;