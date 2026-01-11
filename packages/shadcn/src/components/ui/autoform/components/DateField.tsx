import { TextField } from "@/elements";
import type { AutoFormFieldProps } from "@bwalkt/react";
import type React from "react";

export const DateField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => {
  const { key, ...props } = inputProps;

  return (
    <TextField
      id={id}
      type="date"
      color={error ? "error" : "default"}
      variant="outline"
      size="md"
      {...props}
    />
  );
};
