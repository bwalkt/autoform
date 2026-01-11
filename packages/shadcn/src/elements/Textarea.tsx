import * as React from "react";
import { cn } from "../lib/utils";
import { getSizeStyles, getRadiusStyles } from "./utils";
import type { Variant, Color, Radius, Size } from "./tokens";

export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> {
  size?: Size;
  variant?: Variant;
  color?: Color;
  radius?: Radius;
  error?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

// Variant styles matching TextField
const variantStyles: Record<Variant, string> = {
  solid: cn(
    "border-0",
    "bg-primary/10 text-foreground",
    "focus:bg-primary/15",
    "focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ),
  soft: cn(
    "border-0",
    "bg-secondary text-foreground",
    "hover:bg-secondary/80",
    "focus:bg-secondary/80",
    "focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ),
  outline: cn(
    "border border-input",
    "bg-background text-foreground",
    "focus:border-ring",
    "focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ),
  ghost: cn(
    "border-0",
    "bg-transparent text-foreground",
    "hover:bg-accent",
    "focus:bg-accent",
    "focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ),
};

// Color-specific overrides
const colorStyles: Record<Color, string> = {
  default: "",
  primary: "focus:border-primary focus:ring-primary/20",
  info: "focus:border-blue-500 focus:ring-blue-500/20",
  success: "focus:border-green-500 focus:ring-green-500/20",
  warning: "focus:border-amber-500 focus:ring-amber-500/20",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500/20",
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = "md",
      variant = "outline",
      color,
      radius = "md",
      error = false,
      resize = "vertical",
      className,
      style,
      disabled,
      ...props
    },
    ref,
  ) => {
    const sizeStyles = getSizeStyles(size);
    const radiusStyles = getRadiusStyles(radius);

    const combinedStyles = {
      ...sizeStyles,
      ...radiusStyles,
      ...style,
    };

    // Determine effective color (error overrides)
    const effectiveColor = error ? "error" : color;

    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full outline-none transition-all duration-150 ease-in-out",
          "min-h-[calc(var(--element-height)*2)]",
          "px-[var(--element-padding-x)] py-[var(--element-padding-y)]",
          "text-[var(--element-font-size)] leading-[var(--element-line-height)]",
          "rounded-[var(--element-border-radius)]",

          // Resize behavior
          resize === "none" && "resize-none",
          resize === "vertical" && "resize-y",
          resize === "horizontal" && "resize-x",
          resize === "both" && "resize",

          // Variant styles
          variantStyles[variant],

          // Color overrides
          effectiveColor && colorStyles[effectiveColor],

          // Disabled state
          disabled && "opacity-50 cursor-not-allowed",

          className,
        )}
        style={combinedStyles}
        disabled={disabled}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
