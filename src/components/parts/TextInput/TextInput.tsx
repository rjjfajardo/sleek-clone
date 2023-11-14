import FormControl, { FormControlProps } from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { memo } from "react";

import InputLabel from "@/components/parts/InputLabel";
import ValidationLabel from "@/components/parts/ValidationLabel/index";

export type TextInputFormControlProps = Omit<
  FormControlProps,
  "error" | "disabled"
>;

export type TextInputProps = Omit<TextFieldProps, "error"> & {
  error?: string;
  label?: string;
  hasRequiredLabel?: boolean;
  formControlProps?: TextInputFormControlProps;
};

function TextInput(props: TextInputProps) {
  const {
    label,
    error,
    disabled,
    formControlProps,
    hasRequiredLabel,
    ...rest
  } = props;
  const helperText = error ?? undefined;

  return (
    <FormControl error={!!error} disabled={disabled} {...formControlProps}>
      <Stack direction="row">
        {label && <InputLabel>{label}</InputLabel>}

        {hasRequiredLabel && (
          <ValidationLabel
            sx={{
              color: "common.white",
              mb: 0.5,
              mr: 1,
              bgcolor: "error.main",
            }}
            label="Required"
          />
        )}
      </Stack>
      <TextField
        {...rest}
        value={rest.value ?? ""}
        variant="outlined"
        sx={{
          backgroundColor: "#FCFDFE",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#F0F1F7",
          },
        }}
        helperText={helperText}
        error={!!error}
        disabled={disabled}
      />
    </FormControl>
  );
}
export default memo(TextInput);
