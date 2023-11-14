import Alert from "@mui/material/Alert";
import MuiSnackbar from "@mui/material/Snackbar";

import { useSnackbar } from "@/hooks/useSnackbar";
import { SnackProps } from "@/store/slice/snackbarSlice";

export default function Snackbar() {
  const { snackbarProps, setSnackbarProps } = useSnackbar();
  const {
    message,
    action,
    severity = "success",
    ...rest
  } = snackbarProps as SnackProps;

  const onClose = () => {
    setSnackbarProps({ message, severity, open: false });
  };

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      {...rest}
      onClose={onClose}
      onClick={onClose}
    >
      <Alert
        onClose={onClose}
        elevation={6}
        variant="filled"
        severity={severity}
        action={action}
        sx={{ display: "flex", alignItems: "center" }}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
}
