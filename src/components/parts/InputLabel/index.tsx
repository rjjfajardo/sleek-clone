import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";

const InputLabel = styled(FormLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 14,
  fontWeight: "bold",
  marginBottom: theme.spacing(0.5),
  marginRight: theme.spacing(1),
  "&.Mui-focused": {
    color: theme.palette.text.primary,
  },
}));

export default InputLabel;
