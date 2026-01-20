"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { Text, type TextProps } from "../typography";
import { useFieldGroup } from "./FieldGroupContext";
import type { Size } from "../elements/tokens";

// Map form Size to Typography size
const sizeMap: Record<Size, TextProps["size"]> = {
  "1": "1",
  "2": "2",
  "3": "2",
  "4": "3",
};

export interface LabelProps extends Omit<TextProps, "as"> {
  /** The size of the label - inherits from FieldGroup if not specified */
  size?: Size;
  /** The id of the form element this label is for */
  htmlFor?: string;
  /** Whether the associated field is disabled */
  disabled?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      size: sizeProp,
      weight = "medium",
      htmlFor,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const fieldGroup = useFieldGroup();
    const size = sizeProp ?? fieldGroup.size;
    const textSize = sizeMap[size];

    return (
      <Text
        ref={ref as React.Ref<HTMLElement>}
        as="label"
        size={textSize}
        weight={weight}
        className={cn(
          "leading-none cursor-pointer",
          disabled && "cursor-not-allowed opacity-70",
          className,
        )}
        {...props}
        {...(htmlFor && { htmlFor })}
      >
        {children}
      </Text>
    );
  },
);

Label.displayName = "Label";
