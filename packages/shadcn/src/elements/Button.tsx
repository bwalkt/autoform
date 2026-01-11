"use client";

import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import { getSizeStyles, getRadiusStyles } from "./utils";
import type { Size, Variant, Color, Radius, Responsive } from "./tokens";

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "color"> {
  /** The size of the button */
  size?: Responsive<Size>;
  /** The visual variant of the button */
  variant?: Variant;
  /** The accent color of the button */
  color?: Color;
  /** The border radius of the button */
  radius?: Radius;
  /** Whether the button is in a loading state */
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  solid: cn(
    "bg-primary text-primary-foreground",
    "hover:bg-primary/90",
    "active:bg-primary/80",
  ),
  soft: cn(
    "bg-secondary text-secondary-foreground",
    "hover:bg-secondary/80",
    "active:bg-secondary/70",
  ),
  outline: cn(
    "border border-input bg-background",
    "hover:bg-accent hover:text-accent-foreground",
    "active:bg-accent/80",
  ),
  ghost: cn(
    "bg-transparent",
    "hover:bg-accent hover:text-accent-foreground",
    "active:bg-accent/80",
  ),
};

const colorStyles: Record<Color, Record<Variant, string>> = {
  default: {
    solid: "bg-primary text-primary-foreground hover:bg-primary/90",
    soft: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  },
  primary: {
    solid: "bg-primary text-primary-foreground hover:bg-primary/90",
    soft: "bg-primary/10 text-primary hover:bg-primary/20",
    outline: "border-primary text-primary hover:bg-primary/10",
    ghost: "text-primary hover:bg-primary/10",
  },
  info: {
    solid: "bg-blue-600 text-white hover:bg-blue-700",
    soft: "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400",
    outline: "border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
    ghost: "text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20",
  },
  success: {
    solid: "bg-green-600 text-white hover:bg-green-700",
    soft: "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400",
    outline: "border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20",
    ghost: "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20",
  },
  warning: {
    solid: "bg-amber-500 text-white hover:bg-amber-600",
    soft: "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400",
    outline: "border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20",
    ghost: "text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/20",
  },
  error: {
    solid: "bg-red-600 text-white hover:bg-red-700",
    soft: "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400",
    outline: "border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20",
    ghost: "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20",
  },
};

function getResolvedSize(size: Responsive<Size>): Size {
  if (typeof size === "string") {
    return size;
  }
  return size.initial || "md";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      size = "md",
      variant = "solid",
      color = "default",
      radius = "md",
      loading = false,
      disabled,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const resolvedSize = getResolvedSize(size);
    const sizeStyles = getSizeStyles(resolvedSize);
    const radiusStyles = getRadiusStyles(radius);

    const combinedStyles = {
      ...sizeStyles,
      ...radiusStyles,
      ...style,
    };

    const buttonClasses = cn(
      // Base styles
      "inline-flex items-center justify-center whitespace-nowrap font-medium",
      "transition-colors duration-150 ease-in-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "select-none",

      // Size-based styles using CSS variables
      "h-[var(--element-height)]",
      "px-[var(--element-padding-x)] py-[var(--element-padding-y)]",
      "text-[var(--element-font-size)] leading-[var(--element-line-height)]",
      "gap-[var(--element-gap)]",
      "rounded-[var(--element-border-radius)]",

      // Icon sizing
      "[&_svg]:size-[var(--element-icon-size)]",
      "[&_svg]:shrink-0",

      // Variant and color styles
      color !== "default" ? colorStyles[color][variant] : variantStyles[variant],

      // Loading state
      loading && "relative text-transparent",

      className,
    );

    return (
      <ButtonPrimitive
        ref={ref}
        className={buttonClasses}
        style={combinedStyles}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin text-current" style={{ width: "var(--element-icon-size)", height: "var(--element-icon-size)" }} />
          </span>
        )}
        {children}
      </ButtonPrimitive>
    );
  },
);

Button.displayName = "Button";
