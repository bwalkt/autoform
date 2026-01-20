"use client";

import * as React from "react";
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cn } from "../lib/utils";
import type { Size, Color, Radius } from "./tokens";

// Size configurations
const progressSizes = {
  "1": "h-1",
  "2": "h-1.5",
  "3": "h-2",
  "4": "h-3",
};

// Radius styles
const radiusStyles: Record<Radius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

// Variant styles
type ProgressVariant = "surface" | "classic" | "soft";

// Color styles for indicator
const colorStyles: Record<Color, string> = {
  default: "bg-primary",
  primary: "bg-primary",
  neutral: "bg-gray-500 dark:bg-gray-400",
  info: "bg-blue-500",
  success: "bg-green-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
};

export interface ProgressProps {
  /** Current value (0-100 or max) */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Size of the progress bar */
  size?: Size;
  /** Visual variant */
  variant?: ProgressVariant;
  /** Color of the indicator */
  color?: Color;
  /** Border radius */
  radius?: Radius;
  /** Animation duration for indeterminate state */
  duration?: string;
  /** Additional class names */
  className?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      size = "2",
      variant = "surface",
      color = "primary",
      radius = "full",
      duration = "1s",
      className,
      ...props
    },
    ref,
  ) => {
    const isIndeterminate = value === undefined;
    const progressValue = isIndeterminate ? null : value;

    return (
      <ProgressPrimitive.Root
        ref={ref}
        value={progressValue}
        max={max}
        className={cn(
          "relative w-full overflow-hidden",
          progressSizes[size],
          radiusStyles[radius],

          // Variant styles for track
          variant === "surface" && "bg-secondary",
          variant === "classic" && "bg-secondary border border-border",
          variant === "soft" && "bg-secondary/50",

          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full transition-all",
            radiusStyles[radius],
            colorStyles[color],

            // Indeterminate animation
            isIndeterminate && "animate-progress-indeterminate",
          )}
          style={
            isIndeterminate
              ? {
                  width: "50%",
                  animationDuration: duration,
                }
              : {
                  width: `${((value || 0) / max) * 100}%`,
                }
          }
        />
      </ProgressPrimitive.Root>
    );
  },
);

Progress.displayName = "Progress";

export { Progress };
