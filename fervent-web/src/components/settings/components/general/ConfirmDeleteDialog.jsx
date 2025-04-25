import React from "react";
import ConfirmationDialog from "../../../dialog/ConfirmationDialog";

function ConfirmDeleteDialog({ open, confirmAction, dismissAction }) {
    const dialogContent = (
        <React.Fragment>
            Are you sure you want to delete all messages?
            <br />
            This action is permanent and cannot be undone.
        </React.Fragment>
    );

    return (
        <ConfirmationDialog
            dialogTitle={"Delete all messages?"}
            dialogContent={dialogContent}
            confirmAction={confirmAction}
            dismissAction={dismissAction}
            open={open}
        />
    );
}

export default ConfirmDeleteDialog;