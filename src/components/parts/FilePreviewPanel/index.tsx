import React from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  SxProps,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

interface FilePreviewBoxProps {
  fileName: string;
  fileUrl: string;
  onRemove?: () => void;
  showDelete?: boolean;
  onClick?: () => void;
  showDownloadIcon?: boolean;
  sx?: SxProps;
}

const FilePreviewBox: React.FC<FilePreviewBoxProps> = ({
  fileName,
  fileUrl,
  onRemove,
  showDelete = true,
  showDownloadIcon = true,
  onClick,
  sx,
}) => {
  const handleDownload = () => {
    window.open(fileUrl, "_blank");
  };

  return (
    <Paper elevation={3} sx={{ padding: "16px", ...sx }} onClick={onClick}>
      <Box mt={1} display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" textOverflow="ellipsis">
          {fileName}
        </Typography>

        {showDownloadIcon && (
          <Button variant="contained" color="primary" onClick={handleDownload}>
            Download
          </Button>
        )}
        {showDelete && (
          <IconButton color="primary" onClick={onRemove}>
            <Delete />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};

export default FilePreviewBox;
