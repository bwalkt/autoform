import type { ExtendableAutoFormProps } from "@bwalk/react";
import type { FieldValues } from "react-hook-form";

export interface AutoFormProps<
  T extends FieldValues,
> extends ExtendableAutoFormProps<T> {}
