import React, { useContext, useState } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AppContext } from "../../../context-provider/AppContext";
import { ServiceContext } from "../../../context-provider/ServiceContext";
import MessageService from "../../../../service/MessageService";

function DeleteChatsButton() {
    const { onInfoMessage, messageBulkDeleteInProgress, updateMessageBulkDeleteStatus } = useContext(AppContext);
    const { messageRepository } = useContext(ServiceContext);
    const [open, setOpen] = useState(false);
    const messageService = new MessageService(messageRepository);

    function handleClickOpen() {
        setOpen(true);
    };

    function handleClose() {
        setOpen(false);
    };

    function handleConfirm() {
        handleClose();
        onInfoMessage("Deleting all messages.");
        updateMessageBulkDeleteStatus(true);

        messageService.deleteAll()
            .then(() => {
                updateMessageBulkDeleteStatus(false);
                onInfoMessage("All messages have been deleted.");
            }).catch((error) => {
                onInfoMessage(error?.message || "Delete Error");
            });
    }

    return (
        <React.Fragment>
            <Button
                type="button"
                variant="outlined"
                color="error"
                size="small"
                aria-label="delete all chats"
                onClick={handleClickOpen}
                disabled={messageBulkDeleteInProgress}
                sx={{
                    textTransform: "capitalize",
                }}
            >
                <Typography>Delete All</Typography>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    zIndex: 9999,
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    Delete all messages?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete all messages?
                        <br />
                        This action is permanent and cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm} autoFocus>Ok</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DeleteChatsButton;