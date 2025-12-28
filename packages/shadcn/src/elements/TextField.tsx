import * as React from "react";
import { cn } from "../lib/utils";
import { getElementStyles } from "./utils";
import type { Variant, Color, Radius, Size } from "./tokens";

export interface TextFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  size?: Size;
  variant?: Variant;
  color?: Color;
  radius?: Radius;
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      size = "2",
      variant = "surface",
      color,
      radius = "medium",
      error = false,
      leftIcon,
      rightIcon,
      className,
      style,
      disabled,
      ...props
    },
    ref,
  ) => {
    const resolvedSize = size || "2";
    const elementStyles = getElementStyles(
      resolvedSize,
      variant,
      color,
      radius,
    );

    return (
      <div
        className={cn("relative w-full", className)}
        style={{ ...elementStyles, ...style }}
      >
        {leftIcon && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(var(--element-padding-x)*2+1rem)] pointer-events-none z-10">
            <div className="w-4 h-4 text-gray-400 flex items-center justify-center">
              {leftIcon}
            </div>
          </div>
        )}

        <input
          ref={ref}
          className={cn(
            "w-full outline-none transition-all duration-150 ease-in-out",
            "h-[var(--element-height)]",
            "px-[var(--element-padding-x)] py-[var(--element-padding-y)]",
            "text-[var(--element-font-size)] leading-[var(--element-line-height)]",
            "rounded-[var(--element-border-radius)]",
            "text-[var(--color-text)]",

            // Variant-specific styles
            variant === "classic" && [
              "border border-[var(--color-border)]",
              "bg-[var(--color-background)]",
              "focus:border-[var(--color-primary)]",
              "focus:ring-2 focus:ring-[var(--color-primary-alpha)]",
            ],
            variant === "surface" && [
              "border border-[var(--color-border-subtle)]",
              "bg-[var(--color-surface)]",
              "focus:border-[var(--color-primary)]",
              "focus:ring-2 focus:ring-[var(--color-primary-alpha)]",
            ],
            variant === "soft" && [
              "border-0",
              "bg-[var(--color-soft-background)]",
              "hover:bg-[var(--color-soft-background-hover)]",
              "focus:bg-[var(--color-soft-background-hover)]",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-[var(--color-primary-alpha)]",
            ],

            // Icon padding adjustments
            leftIcon && "pl-[calc(var(--element-padding-x)*2+1rem)]",
            rightIcon && "pr-[calc(var(--element-padding-x)*2+1rem)]",

            // Error state
            error && [
              "border-red-500 focus:border-red-500",
              variant === "soft" && "bg-red-50",
            ],

            // Disabled state
            disabled && [
              "opacity-50 cursor-not-allowed",
              "hover:bg-[var(--color-background)]",
            ],
          )}
          disabled={disabled}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(var(--element-padding-x)*2+1rem)] pointer-events-none z-10">
            <div className="w-4 h-4 text-gray-400 flex items-center justify-center">
              {rightIcon}
            </div>
          </div>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";
