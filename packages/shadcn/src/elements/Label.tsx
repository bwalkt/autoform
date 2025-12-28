import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../lib/utils";
import { Text, type TextProps } from "./Text";

export interface LabelProps 
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  size?: TextProps['size'];
  weight?: TextProps['weight'];
  color?: TextProps['color'];
}

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, size = "2", weight = "medium", color = "default", ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    asChild
    className={cn("peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
  >
    <Text as="label" size={size} weight={weight} color={color} {...props} />
  </LabelPrimitive.Root>
));

Label.displayName = "Label";