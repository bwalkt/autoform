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
  /** High contrast mode for better accessibility */
  highContrast?: boolean;
}

const variantStyles: Record<Variant, string> = {
  classic: cn(
    "bg-gradient-to-b from-primary/90 to-primary text-primary-foreground shadow-sm",
    "hover:from-primary/80 hover:to-primary/95",
    "active:from-primary active:to-primary",
  ),
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
  surface: cn(
    "bg-background border border-input text-foreground shadow-sm",
    "hover:bg-accent/50",
    "active:bg-accent",
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
    classic: "bg-gradient-to-b from-primary/90 to-primary text-primary-foreground shadow-sm hover:from-primary/80 hover:to-primary/95",
    solid: "bg-primary text-primary-foreground hover:bg-primary/90",
    soft: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    surface: "bg-background border border-input text-foreground shadow-sm hover:bg-accent/50",
    outline: "border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  },
  primary: {
    classic: "bg-gradient-to-b from-primary/90 to-primary text-primary-foreground shadow-sm hover:from-primary/80 hover:to-primary/95",
    solid: "bg-primary text-primary-foreground hover:bg-primary/90",
    soft: "bg-primary/10 text-primary hover:bg-primary/20",
    surface: "bg-primary/5 border border-primary/20 text-primary shadow-sm hover:bg-primary/10",
    outline: "border-primary text-primary hover:bg-primary/10",
    ghost: "text-primary hover:bg-primary/10",
  },
  neutral: {
    classic: "bg-gradient-to-b from-gray-400 to-gray-500 text-white shadow-sm hover:from-gray-300 hover:to-gray-400 dark:from-gray-500 dark:to-gray-600",
    solid: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    soft: "bg-muted text-muted-foreground hover:bg-muted/80",
    surface: "bg-muted/30 border border-input text-foreground shadow-sm hover:bg-muted/50",
    outline: "border-input text-foreground hover:bg-accent hover:text-accent-foreground",
    ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
  },
  info: {
    classic: "bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-sm hover:from-blue-400 hover:to-blue-500",
    solid: "bg-blue-600 text-white hover:bg-blue-700",
    soft: "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400",
    surface: "bg-blue-50 border border-blue-200 text-blue-700 shadow-sm hover:bg-blue-100 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400",
    outline: "border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
    ghost: "text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20",
  },
  success: {
    classic: "bg-gradient-to-b from-green-500 to-green-600 text-white shadow-sm hover:from-green-400 hover:to-green-500",
    solid: "bg-green-600 text-white hover:bg-green-700",
    soft: "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400",
    surface: "bg-green-50 border border-green-200 text-green-700 shadow-sm hover:bg-green-100 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400",
    outline: "border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20",
    ghost: "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20",
  },
  warning: {
    classic: "bg-gradient-to-b from-amber-400 to-amber-500 text-white shadow-sm hover:from-amber-300 hover:to-amber-400",
    solid: "bg-amber-500 text-white hover:bg-amber-600",
    soft: "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400",
    surface: "bg-amber-50 border border-amber-200 text-amber-700 shadow-sm hover:bg-amber-100 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400",
    outline: "border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20",
    ghost: "text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/20",
  },
  error: {
    classic: "bg-gradient-to-b from-red-500 to-red-600 text-white shadow-sm hover:from-red-400 hover:to-red-500",
    solid: "bg-red-600 text-white hover:bg-red-700",
    soft: "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400",
    surface: "bg-red-50 border border-red-200 text-red-700 shadow-sm hover:bg-red-100 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400",
    outline: "border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20",
    ghost: "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20",
  },
};

function getResolvedSize(size: Responsive<Size>): Size {
  if (typeof size === "string") {
    return size;
  }
  return size.initial || "2";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      size = "2",
      variant = "solid",
      color = "default",
      radius = "md",
      loading = false,
      highContrast = false,
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

      // High contrast mode
      highContrast && variant === "solid" && "shadow-md saturate-[1.1] brightness-[0.95]",
      highContrast && variant === "soft" && "saturate-[1.2]",
      highContrast && (variant === "outline" || variant === "ghost") && "font-semibold",

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
