"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "../lib/utils";

// ============================================================================
// Provider
// ============================================================================

export interface TooltipProviderProps {
  /** Delay before showing tooltips (ms) */
  delayDuration?: number;
  /** Delay before hiding tooltips (ms) */
  closeDelay?: number;
  /** Children */
  children: React.ReactNode;
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({
  delayDuration = 400,
  closeDelay = 0,
  children,
}) => {
  return (
    <TooltipPrimitive.Provider delay={delayDuration} closeDelay={closeDelay}>
      {children}
    </TooltipPrimitive.Provider>
  );
};

TooltipProvider.displayName = "Tooltip.Provider";

// ============================================================================
// Root
// ============================================================================

export interface TooltipRootProps {
  /** Whether the tooltip is open */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Default open state */
  defaultOpen?: boolean;
  /** Children elements */
  children: React.ReactNode;
}

const TooltipRoot: React.FC<TooltipRootProps> = ({
  open,
  onOpenChange,
  defaultOpen,
  children,
}) => {
  return (
    <TooltipPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
    >
      {children}
    </TooltipPrimitive.Root>
  );
};

TooltipRoot.displayName = "Tooltip.Root";

// ============================================================================
// Trigger
// ============================================================================

export interface TooltipTriggerProps {
  /** Trigger content */
  children: React.ReactNode;
  /** Additional class names */
  className?: string;
}

const TooltipTrigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <TooltipPrimitive.Trigger
        ref={ref}
        className={cn("outline-none", className)}
        {...props}
      >
        {children}
      </TooltipPrimitive.Trigger>
    );
  },
);

TooltipTrigger.displayName = "Tooltip.Trigger";

// ============================================================================
// Content
// ============================================================================

type MaxWidth = "xs" | "sm" | "md";

const maxWidthStyles: Record<MaxWidth, string> = {
  xs: "max-w-[150px]",
  sm: "max-w-[200px]",
  md: "max-w-[300px]",
};

export interface TooltipContentProps {
  /** Maximum width */
  maxWidth?: MaxWidth;
  /** Side of trigger */
  side?: "top" | "right" | "bottom" | "left";
  /** Alignment */
  align?: "start" | "center" | "end";
  /** Side offset */
  sideOffset?: number;
  /** Additional class names */
  className?: string;
  /** Content */
  children: React.ReactNode;
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  (
    {
      maxWidth = "sm",
      side = "top",
      align = "center",
      sideOffset = 4,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <TooltipPrimitive.Popup
            ref={ref}
            className={cn(
              "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-md",
              "animate-in fade-in-0 zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              maxWidthStyles[maxWidth],
              className,
            )}
            {...props}
          >
            {children}
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    );
  },
);

TooltipContent.displayName = "Tooltip.Content";

// ============================================================================
// Arrow
// ============================================================================

export interface TooltipArrowProps {
  /** Additional class names */
  className?: string;
}

const TooltipArrow: React.FC<TooltipArrowProps> = ({ className, ...props }) => {
  return (
    <TooltipPrimitive.Arrow
      className={cn("fill-primary", className)}
      {...props}
    />
  );
};

TooltipArrow.displayName = "Tooltip.Arrow";

// ============================================================================
// Simple Tooltip (convenience component)
// ============================================================================

export interface SimpleTooltipProps {
  /** Tooltip content */
  content: React.ReactNode;
  /** Side of trigger */
  side?: "top" | "right" | "bottom" | "left";
  /** Trigger element */
  children: React.ReactElement;
}

const SimpleTooltip: React.FC<SimpleTooltipProps> = ({
  content,
  side = "top",
  children,
}) => {
  return (
    <TooltipRoot>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </TooltipRoot>
  );
};

SimpleTooltip.displayName = "SimpleTooltip";

// ============================================================================
// Export compound component
// ============================================================================

export const Tooltip = {
  Provider: TooltipProvider,
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Arrow: TooltipArrow,
};

export { SimpleTooltip };
