"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { getSizeStyles, getRadiusStyles } from "./utils";
import type { Variant, Color, Radius, Size } from "./tokens";

export type FloatingLabelStyle = "filled" | "outlined" | "standard";

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** The size of the text field */
  size?: Size;
  /** The visual variant */
  variant?: Variant;
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
  /** Label text for floating label */
  label?: string;
  /** Floating label style variant */
  floatingLabel?: FloatingLabelStyle;
}

// Variant styles for regular (non-floating) mode
const variantStyles: Record<Variant, string> = {
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

// Color-specific overrides
const colorStyles: Record<Color, string> = {
  default: "",
  primary: "focus:border-primary focus:ring-primary/20",
  neutral: "focus:border-gray-500 focus:ring-gray-500/20",
  info: "focus:border-blue-500 focus:ring-blue-500/20",
  success: "focus:border-green-500 focus:ring-green-500/20",
  warning: "focus:border-amber-500 focus:ring-amber-500/20",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500/20",
};

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      size = "2",
      variant = "outline",
      color,
      radius = "md",
      error = false,
      leftIcon,
      rightIcon,
      label,
      floatingLabel,
      className,
      style,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const sizeStyles = getSizeStyles(size);
    const radiusStyles = getRadiusStyles(radius);
    const inputId = id || React.useId();

    const combinedStyles = {
      ...sizeStyles,
      ...radiusStyles,
      ...style,
    };

    // Determine effective color (error overrides)
    const effectiveColor = error ? "error" : color;

    // If floating label is enabled, render the floating variant
    if (floatingLabel && label) {
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
              floatingLabel === "filled" && [
                "rounded-t-[var(--element-border-radius)] rounded-b-none",
                "px-[var(--element-padding-x)] pt-5 pb-2",
                "bg-secondary border-0 border-b-2 border-input",
                "focus:border-primary",
                variant === "soft" && "bg-secondary/60",
                effectiveColor && colorStyles[effectiveColor],
              ],

              floatingLabel === "outlined" && [
                "rounded-[var(--element-border-radius)]",
                "px-[var(--element-padding-x)] pt-4 pb-2",
                "bg-transparent border border-input",
                "focus:border-primary focus:ring-2 focus:ring-ring focus:ring-offset-2",
                effectiveColor && colorStyles[effectiveColor],
              ],

              floatingLabel === "standard" && [
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
            {...props}
          />

          <label
            htmlFor={inputId}
            className={cn(
              "absolute text-[var(--element-font-size)] text-muted-foreground",
              "duration-300 transform origin-[0]",
              "pointer-events-none select-none",

              // Floating label positioning by variant
              floatingLabel === "filled" && [
                "left-[var(--element-padding-x)] top-4 z-10",
                "-translate-y-4 scale-75",
                "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0",
                "peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary",
                leftIcon && "left-[calc(var(--element-padding-x)*2+1rem)]",
              ],

              floatingLabel === "outlined" && [
                "left-[var(--element-padding-x)] top-2 z-10",
                "-translate-y-4 scale-75 bg-background px-1",
                "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3",
                "peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary peer-focus:px-1",
                leftIcon && "left-[calc(var(--element-padding-x)*2+1rem)]",
              ],

              floatingLabel === "standard" && [
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
            {label}
          </label>

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
            variantStyles[variant],

            // Color overrides
            effectiveColor && colorStyles[effectiveColor],

            // Icon padding adjustments
            leftIcon && "pl-[calc(var(--element-padding-x)*2+1rem)]",
            rightIcon && "pr-[calc(var(--element-padding-x)*2+1rem)]",

            // Disabled state
            disabled && "opacity-50 cursor-not-allowed",
          )}
          {...props}
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
