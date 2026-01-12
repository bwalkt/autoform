"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import type { Size, Color, Radius } from "./tokens";

// Size configurations
const iconButtonSizes = {
  "1": "h-6 w-6 text-xs",
  "2": "h-8 w-8 text-sm",
  "3": "h-10 w-10 text-base",
  "4": "h-12 w-12 text-lg",
};

// Variant styles
type IconButtonVariant = "solid" | "soft" | "outline" | "ghost";

// Radius styles
const radiusStyles: Record<Radius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

// Solid color styles
const solidColorStyles: Record<Color, string> = {
  default: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  neutral: "bg-gray-500 text-white hover:bg-gray-600 dark:bg-gray-400 dark:text-gray-900 dark:hover:bg-gray-300",
  info: "bg-blue-500 text-white hover:bg-blue-600",
  success: "bg-green-500 text-white hover:bg-green-600",
  warning: "bg-amber-500 text-white hover:bg-amber-600",
  error: "bg-red-500 text-white hover:bg-red-600",
};

// Soft color styles
const softColorStyles: Record<Color, string> = {
  default: "bg-secondary/50 text-secondary-foreground hover:bg-secondary/70",
  primary: "bg-primary/10 text-primary hover:bg-primary/20",
  neutral: "bg-muted text-muted-foreground hover:bg-muted/80",
  info: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:text-blue-400",
  success: "bg-green-500/10 text-green-600 hover:bg-green-500/20 dark:text-green-400",
  warning: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 dark:text-amber-400",
  error: "bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-400",
};

// Outline color styles
const outlineColorStyles: Record<Color, string> = {
  default: "border-input text-foreground hover:bg-accent hover:text-accent-foreground",
  primary: "border-primary text-primary hover:bg-primary/10",
  neutral: "border-input text-muted-foreground hover:bg-muted",
  info: "border-blue-500 text-blue-600 hover:bg-blue-500/10 dark:text-blue-400",
  success: "border-green-500 text-green-600 hover:bg-green-500/10 dark:text-green-400",
  warning: "border-amber-500 text-amber-600 hover:bg-amber-500/10 dark:text-amber-400",
  error: "border-red-500 text-red-600 hover:bg-red-500/10 dark:text-red-400",
};

// Ghost color styles
const ghostColorStyles: Record<Color, string> = {
  default: "text-foreground hover:bg-accent hover:text-accent-foreground",
  primary: "text-primary hover:bg-primary/10",
  neutral: "text-muted-foreground hover:bg-muted",
  info: "text-blue-600 hover:bg-blue-500/10 dark:text-blue-400",
  success: "text-green-600 hover:bg-green-500/10 dark:text-green-400",
  warning: "text-amber-600 hover:bg-amber-500/10 dark:text-amber-400",
  error: "text-red-600 hover:bg-red-500/10 dark:text-red-400",
};

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Size of the button */
  size?: Size;
  /** Visual variant */
  variant?: IconButtonVariant;
  /** Color scheme */
  color?: Color;
  /** Border radius */
  radius?: Radius;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** High contrast mode */
  highContrast?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      size = "2",
      variant = "soft",
      color = "default",
      radius = "md",
      loading = false,
      highContrast = false,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          iconButtonSizes[size],
          radiusStyles[radius],

          // Variant + color styles
          variant === "solid" && solidColorStyles[color],
          variant === "soft" && softColorStyles[color],
          variant === "outline" && ["border", outlineColorStyles[color]],
          variant === "ghost" && ghostColorStyles[color],

          // High contrast
          highContrast && variant === "solid" && "shadow-md",

          className,
        )}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-[1em] w-[1em]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          children
        )}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";

export { IconButton };
