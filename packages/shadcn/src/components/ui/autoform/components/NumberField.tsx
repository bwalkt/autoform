import { TextField } from "@/elements";
import type { AutoFormFieldProps } from "@bwalkt/react";
import type React from "react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => {
  const { key, ...props } = inputProps;

  return (
    <TextField
      id={id}
      type="number"
      color={error ? "error" : "default"}
      variant="surface"
      size="2"
      {...props}
    />
  );
};
