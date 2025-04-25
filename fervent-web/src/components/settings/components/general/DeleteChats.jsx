import React, { useContext, useState } from "react";
import Button from "../../../buttons/Button";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import MessageService from "../../../../service/MessageService";
import { AppContext } from "../../../context-provider/AppContext";
import { ServiceContext } from "../../../context-provider/ServiceContext";

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
                title="Delete All"
                variant="outlined"
                color="error"
                aria-label="delete all messages"
                handleClick={handleClickOpen}
                loading={messageBulkDeleteInProgress}
                loadingPosition="end"
            />
            <ConfirmDeleteDialog
                open={open}
                confirmAction={handleConfirm}
                dismissAction={handleClose}
            />
        </React.Fragment>
    );
}

export default DeleteChatsButton;