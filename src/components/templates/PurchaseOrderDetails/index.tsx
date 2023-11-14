import BackArrowButton from "@/components/parts/BackArrowButton";
import FormBase from "@/components/parts/FormBase";
import TextInput from "@/components/parts/TextInput";
import ValidationLabel from "@/components/parts/ValidationLabel";
import { UploadDropzone } from "@/utils/uploadthing";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  LinearProgressProps,
  Stack,
  Typography,
} from "@mui/material";
import { UploadFileResponse } from "uploadthing/client";
import { useHooks } from "./hooks";

import InputLabel from "@/components/parts/InputLabel";
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";

import DateInput from "@/components/parts/DateInput";
import FilePreviewPanel from "@/components/parts/FilePreviewPanel";
import Link from "@/components/parts/Link";
import SelectInput from "@/components/parts/SelectInput";
import { CheckCircle } from "@mui/icons-material";
import { PurchaseOrderStatus } from "@prisma/client";
import { format } from "date-fns";

const PurchaseOrderDetails = () => {
  const {
    order,
    control,
    onSubmit,
    files,
    setFiles,
    isDirty,
    fileToPreview,
    setFileToPreview,
    uploadFileProgress,
    setUploadFileProgess,
    isUploading,
    setIsUploading,
    watchStatus,
  } = useHooks();

  return (
    <>
      <Stack direction="row" alignItems="center" mb={2}>
        <BackArrowButton href={"/order-management"} />
        <Box ml={2} sx={{ fontSize: 20, fontWeight: "bold" }}>
          {`Purchase Order # ${order?.purchaseOrderNumber}`}
        </Box>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            lg={6}
            zeroMinWidth
            sx={{ overflowX: "auto", height: 700 }}
          >
            <Stack direction="row" justifyContent="flex-end">
              {/* <Alert severity="info"> */}
              <Link href={`/projects/${order?.projectId}`}>
                View Project Here
              </Link>
              {/* </Alert> */}
            </Stack>
            <FormBase onSubmit={onSubmit}>
              <TextInput
                name="purchaseOrderNumber"
                control={control}
                formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
                label="Purchase Order #"
                disabled
              />

              {order?.deliveredAt ? (
                <Stack mb={2}>
                  <InputLabel>Delivered Date</InputLabel>
                  <Box display="flex">
                    {format(new Date(order.deliveredAt), "yyyy-mm-dd")}
                    <CheckCircle color="success" />
                  </Box>
                </Stack>
              ) : (
                <SelectInput
                  name="status"
                  control={control}
                  options={[
                    { id: "Ordered", label: "Ordered" },
                    { id: "Delivered", label: "Delivered" },
                  ]}
                  formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
                  label="Status"
                  hasRequiredLabel
                />
              )}
              {watchStatus === PurchaseOrderStatus.Delivered &&
                !order?.deliveredAt && (
                  <Box mb={3}>
                    <Stack direction="row" gap={1}>
                      <InputLabel>Delivered Date</InputLabel>

                      <ValidationLabel
                        sx={{
                          color: "common.white",
                          mb: 0.5,
                          mr: 1,
                          bgcolor: "error.main",
                        }}
                        label="Required"
                      />
                    </Stack>
                    <DateInput
                      label=""
                      control={control}
                      name="deliveredAt"
                      minDate={new Date("2023-11-11T22:53:40.366Z")}
                      //TODO: NICE TO HAVAE FEATURE TO ONLY LIMIT BASED ON THE CONTRACT DURATION
                      // maxDate={
                      //   add(new Date(order?.project.createdAt!), {
                      //     days: Number(order?.project.contractDuration),
                      //   }) || ""
                      // }
                    />
                  </Box>
                )}
              <Stack direction="row" gap={1}>
                <InputLabel>Attachment</InputLabel>

                <ValidationLabel
                  sx={{
                    color: "common.white",
                    mb: 0.5,
                    mr: 1,
                    bgcolor: "error.main",
                  }}
                  label="Required"
                />
              </Stack>

              <Box mb={2}>
                <UploadDropzone
                  endpoint="bucketFiles"
                  onClientUploadComplete={(
                    res: UploadFileResponse[] | undefined
                  ) => {
                    if (res && res.length > 0) {
                      setFiles((prev) => [
                        ...prev,
                        {
                          fileName: res[0].name,
                          fileUrl: res[0].url,
                        },
                      ]);
                    }
                    setFileToPreview({
                      fileName: res?.[0].name,
                      fileUrl: res?.[0].url,
                    });
                    setUploadFileProgess(0);
                    setIsUploading(false);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                  onUploadBegin={(name) => {
                    console.log("Uploading: ", name);
                  }}
                  onUploadProgress={(progress) => {
                    setIsUploading(true);
                    setUploadFileProgess(progress);
                  }}
                />

                {uploadFileProgress ? (
                  <LinearProgressWithLabel value={uploadFileProgress} />
                ) : null}

                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  marginTop={3}
                >
                  {!!files?.length &&
                    files?.map((file) => (
                      <Grid item xs={6} key={file.fileName}>
                        <FilePreviewPanel
                          {...(file.fileName === fileToPreview?.fileName
                            ? {
                                sx: {
                                  borderColor: "primary.main",
                                  borderWidth: 3,
                                },
                              }
                            : {})}
                          fileName={file.fileName || ""}
                          fileUrl={file.fileUrl || ""}
                          onRemove={() => {
                            setFiles((prev) =>
                              prev.filter(
                                (item) => item.fileName !== file.fileName
                              )
                            );

                            // Find the index of the current file in the files array
                            const currentIndex = files.findIndex(
                              (item) => item.fileName === file.fileName
                            );

                            // Set fileToPreview to the next available file or the first file if no next file
                            setFileToPreview(() => {
                              if (currentIndex < files.length - 1) {
                                return {
                                  fileName: files[currentIndex + 1].fileName,
                                  fileUrl: files[currentIndex + 1].fileUrl,
                                };
                              } else if (files.length > 0) {
                                return {
                                  fileName: files[0].fileName,
                                  fileUrl: files[0].fileUrl,
                                };
                              } else {
                                // If no files left, set to undefined
                                return undefined;
                              }
                            });
                          }}
                          showDownloadIcon={false}
                          onClick={() =>
                            setFileToPreview({
                              fileName: file.fileName,
                              fileUrl: file.fileUrl,
                            })
                          }
                        />
                      </Grid>
                    ))}
                </Grid>
              </Box>

              <Stack direction="row" gap={2} mt={5}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{ width: 150 }}
                  disabled={!files || !isDirty}
                >
                  Save
                </Button>
              </Stack>
            </FormBase>
          </Grid>
          <Grid item xs={12} lg={6} zeroMinWidth>
            <Box height={680} border={3} borderColor="grey.300">
              {fileToPreview ? (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={fileToPreview.fileUrl || ""}
                    defaultScale={SpecialZoomLevel.ActualSize}
                  />
                </Worker>
              ) : (
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  height={680}
                >
                  <Typography>No file to preview</Typography>
                </Stack>
              )}
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default PurchaseOrderDetails;

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
