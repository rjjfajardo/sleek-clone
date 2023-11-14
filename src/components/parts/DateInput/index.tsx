import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import React from "react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";

interface DateInputProps {
  label: string;
  control: Control<any>; // or use the specific type for your control
  name: string;
  minDate?: Date;
  maxDate?: Date;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  control,
  name,
  minDate,
  maxDate,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({
        field: { onChange, value },
        fieldState: { error, invalid },
      }) => (
        <DatePicker
          value={new Date(value)}
          onChange={(newValue) =>
            onChange(format(newValue ? newValue : new Date(), "yyyy-mm-dd"))
          }
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
    />
  );
};

export default DateInput;
