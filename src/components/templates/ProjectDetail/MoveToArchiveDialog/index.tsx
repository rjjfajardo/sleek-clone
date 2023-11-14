import Dialog from "@/components/parts/Dialog";

import { useHooks } from "./hooks";
import { AlertColor } from "@mui/material";

export interface MoveToArchiveProps {
  projectId: string;
  open: boolean;
  handleClose: () => void;
}

const MoveToArchiveDialog = ({
  projectId,
  open,
  handleClose,
}: MoveToArchiveProps) => {
  const { handleResetAndClose, onSubmit } = useHooks({
    handleClose,
    projectId,
  });

  const info = {
    severity: "error" as AlertColor,
    message:
      "This action is irreversible and this data can only be access on finish/archived projects page.",
  };

  return (
    <Dialog
      open={open}
      dialogTitle="Moved project to archive?"
      info={info}
      handleClose={() => onSubmit}
      handleCancel={handleResetAndClose}
      handleSuccess={() => onSubmit()}
      cancelButtonProps={{ variant: "outlined", color: "primary" }}
      cancelButtonLabel={"Close"}
      successButtonProps={{ variant: "contained", color: "error" }}
      successButtonLabel={"Confirm"}
    ></Dialog>
  );
};

export default MoveToArchiveDialog;
