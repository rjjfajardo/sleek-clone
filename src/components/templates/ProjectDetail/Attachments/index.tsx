import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FilePreviewPanel from "@/components/parts/FilePreviewPanel";
import { Typography } from "@mui/material";

interface Props {
  mobileHandleCloseDrawer: (close: boolean) => void;
  projectId: string;
  media: {
    fileName: string;
    fileUrl: string;
    origin: string;
  }[];
}
const AttachmentsDrawer = ({ mobileHandleCloseDrawer, media }: Props) => {
  return (
    <Stack fontSize={20} fontWeight={600}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        Attachments
        <IconButton
          size="large"
          onClick={() => mobileHandleCloseDrawer(false)}
          sx={{ display: { md: "none", xs: "block" } }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ marginTop: 1, marginBottom: 5 }} />

      {media.map(({ fileName, origin, fileUrl }) => (
        <Stack key={fileUrl} mb={3}>
          <Typography fontSize={18} fontWeight={600}>
            {origin}
          </Typography>
          <FilePreviewPanel
            fileName={fileName}
            fileUrl={fileUrl}
            showDelete={false}
          />
        </Stack>
      ))}
    </Stack>
  );
};
export default AttachmentsDrawer;
