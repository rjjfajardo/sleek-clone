import { memo } from "react";
import type { Control, RegisterOptions } from "react-hook-form";
import { useController } from "react-hook-form";

import type { SelectInputProps, Options } from "./SelectInput";
import Presentation from "./SelectInput";

export type FormatType = "phone" | "email" | "zenhan" | "zipcode";

type Props = Omit<SelectInputProps, "t" | "onChange"> & {
  name: string;
  onChange?: (v: string | number | boolean) => void;
  control: Control<any>;
  rules?: RegisterOptions;
  defaultValue?: string | null;
  formatType?: FormatType;
  parse?: (v: string | number | boolean) => string | string[];
  format?: (v: string | any) => string | number | boolean | any;
  options: Options[];
  multiple?: boolean;
};
function SelectInput(props: Props) {
  const {
    name,
    control,
    rules,
    defaultValue,
    formatType,
    parse,
    format,
    options,
    multiple,
    ...inputProps
  } = props;
  const {
    field: { ref, ...rest },
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue });

  return (
    <Presentation
      inputRef={ref}
      error={error?.message}
      {...rest}
      value={parse ? parse(rest.value) : rest.value}
      {...inputProps}
      onChange={(e) => {
        const v = e.target.value;
        rest.onChange(format ? format(v) : v);
        inputProps.onChange?.(format ? format(v) : v);
        // inputProps.onChange?.(format ? format(v) : v);
      }}
      options={options}
      multiple={multiple}
    />
  );
}

export default memo(SelectInput);
