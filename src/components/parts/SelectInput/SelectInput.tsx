import FormControl, { FormControlProps } from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { memo } from "react";

import InputLabel from "@/components/parts/InputLabel";
import ValidationLabel from "@/components/parts/ValidationLabel/index";

export interface Options {
  id: string;
  label: string;
}

export type SelectInputFormControlProps = Omit<
  FormControlProps,
  "error" | "disabled"
>;

export type SelectInputProps = Omit<SelectProps, "error"> & {
  error?: string;
  label?: string;
  hasRequiredLabel?: boolean;
  formControlProps?: SelectInputFormControlProps;
  options: Options[];
  multiple?: boolean;
};

function SelectInput(props: SelectInputProps) {
  const {
    label,
    error,
    disabled,
    formControlProps,
    hasRequiredLabel,
    options,
    multiple,
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
      <Select
        {...rest}
        value={rest.value ?? []}
        sx={{
          backgroundColor: "#FCFDFE",
          borderColor: "#F0F1F7",
        }}
        error={!!error}
        disabled={disabled}
        multiple={multiple}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export default memo(SelectInput);
