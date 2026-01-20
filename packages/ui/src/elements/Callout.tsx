"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { Size, Color } from "./tokens";

// Callout-specific variant type (different from Button variants)
type CalloutVariant = "soft" | "surface" | "outline";

// Context for sharing size across subcomponents
interface CalloutContextValue {
  size: Size;
}

const CalloutContext = React.createContext<CalloutContextValue>({ size: "2" });

// Size token mappings
const sizeStyles: Record<Size, { padding: string; radius: string; gap: string; iconSize: string }> = {
  "1": { padding: "0.5rem", radius: "0.25rem", gap: "0.5rem", iconSize: "0.875rem" },
  "2": { padding: "0.75rem", radius: "0.375rem", gap: "0.5rem", iconSize: "1rem" },
  "3": { padding: "1rem", radius: "0.5rem", gap: "0.75rem", iconSize: "1.125rem" },
  "4": { padding: "1.25rem", radius: "0.625rem", gap: "1rem", iconSize: "1.25rem" },
};

const textSizeStyles: Record<Size, string> = {
  "1": "text-xs",
  "2": "text-sm",
  "3": "text-sm",
  "4": "text-base",
};

// Color styles for each variant
const colorVariantStyles: Record<Color, Record<CalloutVariant, string>> = {
  default: {
    soft: "bg-muted text-foreground",
    surface: "bg-muted/50 ring-1 ring-inset ring-border text-foreground",
    outline: "ring-1 ring-inset ring-border text-foreground",
  },
  primary: {
    soft: "bg-primary/10 text-primary",
    surface: "bg-primary/5 ring-1 ring-inset ring-primary/20 text-primary",
    outline: "ring-1 ring-inset ring-primary/30 text-primary",
  },
  neutral: {
    soft: "bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300",
    surface: "bg-gray-50 ring-1 ring-inset ring-gray-200 text-gray-700 dark:bg-gray-800/30 dark:ring-gray-700 dark:text-gray-300",
    outline: "ring-1 ring-inset ring-gray-300 text-gray-700 dark:ring-gray-600 dark:text-gray-300",
  },
  info: {
    soft: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    surface: "bg-blue-50 ring-1 ring-inset ring-blue-200 text-blue-700 dark:bg-blue-900/20 dark:ring-blue-800 dark:text-blue-400",
    outline: "ring-1 ring-inset ring-blue-300 text-blue-700 dark:ring-blue-700 dark:text-blue-400",
  },
  success: {
    soft: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    surface: "bg-green-50 ring-1 ring-inset ring-green-200 text-green-700 dark:bg-green-900/20 dark:ring-green-800 dark:text-green-400",
    outline: "ring-1 ring-inset ring-green-300 text-green-700 dark:ring-green-700 dark:text-green-400",
  },
  warning: {
    soft: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    surface: "bg-amber-50 ring-1 ring-inset ring-amber-200 text-amber-700 dark:bg-amber-900/20 dark:ring-amber-800 dark:text-amber-400",
    outline: "ring-1 ring-inset ring-amber-300 text-amber-700 dark:ring-amber-700 dark:text-amber-400",
  },
  error: {
    soft: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    surface: "bg-red-50 ring-1 ring-inset ring-red-200 text-red-700 dark:bg-red-900/20 dark:ring-red-800 dark:text-red-400",
    outline: "ring-1 ring-inset ring-red-300 text-red-700 dark:ring-red-700 dark:text-red-400",
  },
};

// ============================================================================
// CalloutRoot
// ============================================================================

export interface CalloutRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The size of the callout */
  size?: Size;
  /** The visual variant */
  variant?: CalloutVariant;
  /** The accent color */
  color?: Color;
  /** High contrast mode for better accessibility */
  highContrast?: boolean;
}

const CalloutRoot = React.forwardRef<HTMLDivElement, CalloutRootProps>(
  (
    {
      className,
      size = "2",
      variant = "soft",
      color = "default",
      highContrast = false,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const sizeTokens = sizeStyles[size];
    const contextValue = React.useMemo(() => ({ size }), [size]);

    return (
      <CalloutContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            // Base layout - CSS Grid with icon column and content column
            "grid grid-cols-[auto_1fr] items-start",
            // Color and variant styles
            colorVariantStyles[color][variant],
            // High contrast mode
            highContrast && variant === "soft" && "saturate-[1.2]",
            highContrast && variant === "surface" && "saturate-[1.1] ring-2",
            highContrast && variant === "outline" && "font-semibold ring-2",
            className,
          )}
          style={{
            padding: sizeTokens.padding,
            borderRadius: sizeTokens.radius,
            gap: sizeTokens.gap,
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      </CalloutContext.Provider>
    );
  },
);

CalloutRoot.displayName = "Callout.Root";

// ============================================================================
// CalloutIcon
// ============================================================================

export interface CalloutIconProps extends React.HTMLAttributes<HTMLDivElement> {}

const CalloutIcon = React.forwardRef<HTMLDivElement, CalloutIconProps>(
  ({ className, children, style, ...props }, ref) => {
    const { size } = React.useContext(CalloutContext);
    const sizeTokens = sizeStyles[size];

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center shrink-0",
          "[&>svg]:w-[var(--callout-icon-size)] [&>svg]:h-[var(--callout-icon-size)]",
          className,
        )}
        style={{
          "--callout-icon-size": sizeTokens.iconSize,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CalloutIcon.displayName = "Callout.Icon";

// ============================================================================
// CalloutText
// ============================================================================

export interface CalloutTextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CalloutText = React.forwardRef<HTMLParagraphElement, CalloutTextProps>(
  ({ className, ...props }, ref) => {
    const { size } = React.useContext(CalloutContext);

    return (
      <p
        ref={ref}
        className={cn(
          textSizeStyles[size],
          "leading-relaxed",
          className,
        )}
        {...props}
      />
    );
  },
);

CalloutText.displayName = "Callout.Text";

// ============================================================================
// Compound Component Export
// ============================================================================

export const Callout = {
  Root: CalloutRoot,
  Icon: CalloutIcon,
  Text: CalloutText,
};

// Also export individual components for convenience
export { CalloutRoot, CalloutIcon, CalloutText };

// Re-export the variant type
export type { CalloutVariant };
