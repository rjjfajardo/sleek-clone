import Alert, { AlertColor } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button, { ButtonProps } from "@mui/material/Button";
import Dialog, { DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import * as React from "react";

export interface DialogProps extends MuiDialogProps {
  /**
   * Determines if as dialog is shown or not.
   */
  open: boolean;
  /**
   * Executed when close button is clicked
   */
  handleClose: () => void;
  /**
   * Executed when cancel button is clicked.
   */
  handleCancel: () => void;
  /**
   * Executed when success button is clicked.
   */
  handleSuccess: () => void;
  /**
   * Dialog's title
   */
  dialogTitle: string | React.ReactElement;
  /**
   * Content for the centrl part of the dialog
   */
  children?: React.ReactNode;
  dialogAction?: string | React.ReactElement;
  /**
   * Properties to pass to cancel button.
   */
  cancelButtonProps?: Pick<ButtonProps, "color" | "variant">;
  /**
   * Text for cancel button.
   */
  cancelButtonLabel?: string;
  /**
   * Properties to pass to success button.
   */
  successButtonProps?: Pick<ButtonProps, "color" | "variant" | "disabled">;
  /**
   * Text for success button.
   */
  successButtonLabel: string;
  /**
   * Disables/enables the success button.
   */
  disabled?: boolean;

  info?: {
    severity: AlertColor;
    message: string;
  };
}

const CustomDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paperScrollPaper": {
    width: "100%",
  },
}));

/**
 * Dialogs inform users about a task and can contain critical information,
 * require decisions, or involve multiple tasks.
 *
 * @param props @see {@link DialogProps}
 */
const MuiDialog = (props: DialogProps) => {
  const {
    open,
    handleClose,
    handleCancel,
    handleSuccess,
    dialogTitle,
    info,
    children,
    dialogAction,
    cancelButtonProps,
    cancelButtonLabel,
    successButtonProps,
    successButtonLabel,
    disabled,
    ...rest
  } = props;

  return (
    <CustomDialog onClose={handleClose} open={open} {...rest}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      {info && (
        <Alert severity={info.severity ?? "info"}>
          <strong>{info.message}</strong>
        </Alert>
      )}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {dialogAction}
        {cancelButtonLabel && (
          <Button {...cancelButtonProps} onClick={handleCancel}>
            {cancelButtonLabel}
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          {...successButtonProps}
          onClick={handleSuccess}
          disabled={disabled}
        >
          {successButtonLabel}
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};

export default MuiDialog;
