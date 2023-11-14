import Dialog from "@/components/parts/Dialog";
import Box from "@mui/material/Box";

import SelectInput from "@/components/parts/SelectInput";
import TextInput from "@/components/parts/TextInput/index";
import { useHooks } from "./hooks";
import { FormProvider } from "react-hook-form";
import MoveToArchiveDialog from "../MoveToArchiveDialog";

export interface PostQualificationProps {
  projectId: string;
  status: string;
  open: boolean;
  handleClose: () => void;
}

const PostQualificationDialog = ({
  projectId,
  open,
  handleClose,
  status,
}: PostQualificationProps) => {
  const { control, onSubmit, handleResetAndClose, formMethods } = useHooks({
    handleClose,
    projectId,
    status,
  });

  return (
    <>
      <Dialog
        open={open}
        dialogTitle="Post Qualifacation"
        handleClose={handleResetAndClose}
        handleCancel={handleResetAndClose}
        handleSuccess={() => onSubmit()}
        cancelButtonProps={{ variant: "outlined", color: "primary" }}
        cancelButtonLabel={"Close"}
        successButtonProps={{ variant: "contained", color: "primary" }}
        successButtonLabel={"Confirm"}
      >
        <FormProvider {...formMethods}>
          <SelectInput
            control={control}
            name="result"
            label="Result"
            options={[
              { id: "Accepted", label: "Accepted" },
              { id: "Disqualified", label: "Disqualified" },
            ]}
            formControlProps={{ sx: { width: "50%", my: 3 } }}
          />
          <TextInput
            name="remarks"
            control={control}
            formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
            label="Remarks"
          />
        </FormProvider>
      </Dialog>
    </>
  );
};

export default PostQualificationDialog;
