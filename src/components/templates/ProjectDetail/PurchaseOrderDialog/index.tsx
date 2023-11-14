import Dialog from "@/components/parts/Dialog";
import Box from "@mui/material/Box";

import { UploadDropzone } from "@/utils/uploadthing";
import FilePreviewPanel from "@/components/parts/FilePreviewPanel";
import { UploadFileResponse } from "uploadthing/client";
import { useHooks } from "./hooks";
import { DialogAlertMessage } from "@/common/alertMessage";
import PurchaseOrderNewForm from "../../PurchaseOrderDetails";
import TextInput from "@/components/parts/TextInput";
import { Alert, Stack } from "@mui/material";
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";

export interface PurchaseOrderProps {
  projectId: string;
  open: boolean;
  handleClose: () => void;
  status: string;
}

const PurchaseOrderDialog = ({
  projectId,
  open,
  handleClose,
  status,
}: PurchaseOrderProps) => {
  const { handleResetAndClose, file, setFile, onSubmit, control } = useHooks({
    handleClose,
    projectId,
    status,
  });
  return (
    <Dialog
      open={open}
      dialogTitle="Purchase Order"
      info={DialogAlertMessage}
      handleClose={handleResetAndClose}
      handleCancel={handleResetAndClose}
      handleSuccess={() => onSubmit()}
      cancelButtonProps={{ variant: "outlined", color: "primary" }}
      cancelButtonLabel={"Close"}
      successButtonProps={{ variant: "contained", color: "primary" }}
      successButtonLabel={"Confirm"}
      disabled={!file}
    >
      <Alert variant="standard" severity="info" sx={{ mb: 2 }}>
        <strong>
          Make sure to input the the same purchase number written in the
          attached document.
        </strong>
      </Alert>
      <TextInput
        name="purchaseOrderNumber"
        control={control}
        formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
        label="Purchase Order #"
        hasRequiredLabel
      />
      {file?.fileName && file.fileUrl ? (
        <Stack direction="column" gap={2}>
          <FilePreviewPanel
            fileName={file.fileName}
            fileUrl={file.fileUrl}
            onRemove={() => setFile({ fileName: "", fileUrl: "" })}
            showDownloadIcon={false}
          />
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              fileUrl={file.fileUrl || ""}
              defaultScale={SpecialZoomLevel.ActualSize}
            />
          </Worker>
        </Stack>
      ) : (
        <Box>
          <UploadDropzone
            endpoint="bucketFiles"
            onClientUploadComplete={(res: UploadFileResponse[] | undefined) => {
              setFile({ fileName: res?.[0].name, fileUrl: res?.[0].url });
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
            onUploadBegin={(name) => {
              // Do something once upload begins
              console.log("Uploading: ", name);
            }}
          />
        </Box>
      )}
    </Dialog>
  );
};

export default PurchaseOrderDialog;
