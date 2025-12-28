import { TextField } from "@/elements";
import { AutoFormFieldProps } from "@autoform/react";
import React from "react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => {
  const { key, ...props } = inputProps;

  return (
    <TextField 
      id={id} 
      color={error ? "error" : "default"}
      variant="surface"
      size="2"
      {...props} 
    />
  );
};
