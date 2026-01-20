"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { getSizeStyles, getRadiusStyles } from "../elements/utils";
import { useFieldGroup } from "./FieldGroupContext";
import type { Color, Radius, Size, TextFieldVariant } from "../elements/tokens";

// Re-export for backward compatibility
export type { TextFieldVariant } from "../elements/tokens";

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** The size of the text field */
  size?: Size;
  /** The visual variant */
  variant?: TextFieldVariant;
  /** The accent color */
  color?: Color;
  /** The border radius */
  radius?: Radius;
  /** Whether the field has an error */
  error?: boolean;
  /** Icon to display on the left */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right */
  rightIcon?: React.ReactNode;
  /** Label text (required for floating-* variants) */
  label?: string;
}

// Variant styles for regular (non-floating) mode
const regularVariantStyles: Record<string, string> = {
  classic: cn(
    "border border-input",
    "bg-gradient-to-b from-background to-muted/30 text-foreground shadow-sm",
    "focus:border-ring",
    "focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ),
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
  surface: cn(
    "border border-input",
    "bg-background text-foreground shadow-sm",
    "focus:border-ring",
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

// Color-specific overrides for bordered variants
const colorStyles: Record<Color, string> = {
  default: "",
  primary: "border-primary focus:border-primary focus:ring-primary/30",
  neutral: "border-gray-500 focus:border-gray-500 focus:ring-gray-500/30",
  info: "border-blue-500 focus:border-blue-500 focus:ring-blue-500/30",
  success: "border-green-500 focus:border-green-500 focus:ring-green-500/30",
  warning: "border-amber-500 focus:border-amber-500 focus:ring-amber-500/30",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500/30",
};

// Background color overrides for solid variant
const solidColorStyles: Record<Color, string> = {
  default: "",
  primary: "bg-primary/10 focus:bg-primary/15 focus:ring-primary/30",
  neutral: "bg-gray-500/10 focus:bg-gray-500/15 focus:ring-gray-500/30",
  info: "bg-blue-500/10 focus:bg-blue-500/15 focus:ring-blue-500/30",
  success: "bg-green-500/10 focus:bg-green-500/15 focus:ring-green-500/30",
  warning: "bg-amber-500/10 focus:bg-amber-500/15 focus:ring-amber-500/30",
  error: "bg-red-500/10 focus:bg-red-500/15 focus:ring-red-500/30",
};

// Helper to check if variant is a floating type
const isFloatingVariant = (variant: TextFieldVariant): boolean =>
  variant.startsWith("floating-");

// Get the floating style type from variant
const getFloatingStyle = (variant: TextFieldVariant): "filled" | "standard" | "outlined" | null => {
  if (variant === "floating-filled") return "filled";
  if (variant === "floating-standard") return "standard";
  if (variant === "floating-outlined") return "outlined";
  return null;
};

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      size: sizeProp,
      variant: variantProp,
      color,
      radius = "md",
      error = false,
      leftIcon,
      rightIcon,
      label,
      className,
      style,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    // Get context values from FieldGroup (if wrapped)
    const fieldGroup = useFieldGroup();
    const size = sizeProp ?? fieldGroup.size;
    const variant = variantProp ?? fieldGroup.variant;

    const sizeStyles = getSizeStyles(size);
    const radiusStyles = getRadiusStyles(radius);
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const combinedStyles = {
      ...sizeStyles,
      ...radiusStyles,
      ...style,
    };

    // Determine effective color (error overrides)
    const effectiveColor = error ? "error" : color;

    const floatingStyle = getFloatingStyle(variant);

    // For floating variants, use placeholder as label if no label provided
    // Strip placeholder from props for floating variants to prevent text collision with label
    const { placeholder, ...inputProps } = props;
    const effectiveLabel = label || (isFloatingVariant(variant) ? placeholder : undefined);

    // If floating variant, render the floating version
    if (isFloatingVariant(variant)) {
      return (
        <div
          className={cn("relative w-full", className)}
          style={combinedStyles}
        >
          {leftIcon && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(var(--element-padding-x)*2+1rem)] pointer-events-none z-10">
              <div className="w-4 h-4 text-muted-foreground flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                {leftIcon}
              </div>
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            placeholder=" "
            disabled={disabled}
            className={cn(
              "peer w-full outline-none transition-all duration-150 ease-in-out",
              "text-[var(--element-font-size)] leading-[var(--element-line-height)]",
              "text-foreground placeholder-transparent",
              "disabled:opacity-50 disabled:cursor-not-allowed",

              // Floating label specific styles
              floatingStyle === "filled" && [
                "rounded-t-[var(--element-border-radius)] rounded-b-none",
                "px-[var(--element-padding-x)] pt-5 pb-2",
                "bg-secondary border-0 border-b-2 border-input",
                "focus:border-primary",
                effectiveColor && colorStyles[effectiveColor],
              ],

              floatingStyle === "outlined" && [
                "rounded-[var(--element-border-radius)]",
                "px-[var(--element-padding-x)] pt-4 pb-2",
                "bg-transparent border border-input",
                "focus:border-primary focus:ring-2 focus:ring-ring focus:ring-offset-2",
                effectiveColor && colorStyles[effectiveColor],
              ],

              floatingStyle === "standard" && [
                "rounded-none",
                "px-0 pt-4 pb-2",
                "bg-transparent border-0 border-b-2 border-input",
                "focus:border-primary",
                effectiveColor && colorStyles[effectiveColor],
              ],

              // Icon padding adjustments
              leftIcon && "pl-[calc(var(--element-padding-x)*2+1rem)]",
              rightIcon && "pr-[calc(var(--element-padding-x)*2+1rem)]",
            )}
            {...inputProps}
          />

          {effectiveLabel && (
            <label
              htmlFor={inputId}
              className={cn(
                "absolute text-[var(--element-font-size)] text-muted-foreground",
                "duration-300 transform origin-[0]",
                "pointer-events-none select-none",

                // Floating label positioning by style
                floatingStyle === "filled" && [
                  "left-[var(--element-padding-x)] top-4 z-10",
                  "-translate-y-4 scale-75",
                  "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0",
                  "peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary",
                  leftIcon && "left-[calc(var(--element-padding-x)*2+1rem)]",
                ],

                floatingStyle === "outlined" && [
                  "left-[var(--element-padding-x)] top-2 z-10",
                  "-translate-y-4 scale-75 bg-background px-1",
                  "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3",
                  "peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary peer-focus:px-1",
                  leftIcon && "left-[calc(var(--element-padding-x)*2+1rem)]",
                ],

                floatingStyle === "standard" && [
                  "left-0 top-3 z-10",
                  "-translate-y-6 scale-75",
                  "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0",
                  "peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary",
                  leftIcon && "left-[calc(var(--element-padding-x)*2+1rem)]",
                ],

                // Error state
                error && "text-red-500 peer-focus:text-red-500",
              )}
            >
              {effectiveLabel}
            </label>
          )}

          {rightIcon && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(var(--element-padding-x)*2+1rem)] pointer-events-none z-10">
              <div className="w-4 h-4 text-muted-foreground flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                {rightIcon}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Regular (non-floating) text field

    return (
      <div
        className={cn("relative w-full", className)}
        style={combinedStyles}
      >
        {leftIcon && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(var(--element-padding-x)*2+1rem)] pointer-events-none z-10">
            <div className="w-4 h-4 text-muted-foreground flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
              {leftIcon}
            </div>
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={cn(
            "w-full outline-none transition-all duration-150 ease-in-out",
            "h-[var(--element-height)]",
            "px-[var(--element-padding-x)] py-[var(--element-padding-y)]",
            "text-[var(--element-font-size)] leading-[var(--element-line-height)]",
            "rounded-[var(--element-border-radius)]",

            // Variant styles
            regularVariantStyles[variant],

            // Color overrides (use solidColorStyles for solid variant)
            variant === "solid"
              ? effectiveColor && solidColorStyles[effectiveColor]
              : effectiveColor && colorStyles[effectiveColor],

            // Icon padding adjustments
            leftIcon && "pl-[calc(var(--element-padding-x)*2+1rem)]",
            rightIcon && "pr-[calc(var(--element-padding-x)*2+1rem)]",

            // Disabled state
            disabled && "opacity-50 cursor-not-allowed",
          )}
          placeholder={placeholder}
          {...inputProps}
        />

        {rightIcon && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(var(--element-padding-x)*2+1rem)] pointer-events-none z-10">
            <div className="w-4 h-4 text-muted-foreground flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
              {rightIcon}
            </div>
          </div>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";
