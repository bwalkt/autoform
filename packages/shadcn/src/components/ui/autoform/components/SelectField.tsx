import { Select, SelectItem } from "@/elements";
import type { AutoFormFieldProps } from "@bwalkt/react";
import type React from "react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  field,
  inputProps,
  error,
  id: _id,
}) => {
  const { key, ...props } = inputProps;

  return (
    <Select
      onValueChange={(value) => {
        const syntheticEvent = {
          target: {
            value,
            name: field.key,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        props.onChange(syntheticEvent);
      }}
      value={props.value || field.default}
      color={error ? "error" : "default"}
      variant="surface"
      size="2"
      placeholder="Select an option"
    >
      {(field.options || []).map(([key, label]) => (
        <SelectItem key={key} value={key}>
          {label}
        </SelectItem>
      ))}
    </Select>
  );
};
