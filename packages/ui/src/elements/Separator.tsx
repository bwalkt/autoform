"use client";

import * as React from "react";
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cn } from "@/lib/utils";
import type { Size, Color } from "./tokens";

// Size configurations
const separatorSizes = {
  "1": "border",
  "2": "border-2",
  "3": "border-4",
  "4": "border-8",
};

// Color styles
const colorStyles: Record<Color, string> = {
  default: "border-border",
  primary: "border-primary/50",
  neutral: "border-muted-foreground/30",
  info: "border-blue-500/50",
  success: "border-green-500/50",
  warning: "border-amber-500/50",
  error: "border-red-500/50",
};

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Size (thickness) */
  size?: Size;
  /** Color */
  color?: Color;
  /** Whether to use decorative styling */
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      orientation = "horizontal",
      size = "1",
      color = "default",
      decorative = true,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <SeparatorPrimitive
        ref={ref}
        orientation={orientation}
        className={cn(
          "shrink-0",
          separatorSizes[size],
          colorStyles[color],
          orientation === "horizontal" ? "w-full border-t" : "h-full border-l",
          className,
        )}
        {...props}
      />
    );
  },
);

Separator.displayName = "Separator";

export { Separator };
