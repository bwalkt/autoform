"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { X } from "lucide-react";
import { cn } from "../lib/utils";

// ============================================================================
// Root
// ============================================================================

export interface PopoverRootProps {
  /** Whether the popover is open */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Default open state */
  defaultOpen?: boolean;
  /** Children elements */
  children: React.ReactNode;
}

const PopoverRoot: React.FC<PopoverRootProps> = ({
  open,
  onOpenChange,
  defaultOpen,
  children,
}) => {
  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
    >
      {children}
    </PopoverPrimitive.Root>
  );
};

PopoverRoot.displayName = "Popover.Root";

// ============================================================================
// Trigger
// ============================================================================

export interface PopoverTriggerProps {
  /** Trigger content */
  children: React.ReactNode;
  /** Additional class names */
  className?: string;
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <PopoverPrimitive.Trigger
        ref={ref}
        className={cn("outline-none", className)}
        {...props}
      >
        {children}
      </PopoverPrimitive.Trigger>
    );
  },
);

PopoverTrigger.displayName = "Popover.Trigger";

// ============================================================================
// Content
// ============================================================================

type MaxWidth = "xs" | "sm" | "md" | "lg" | "xl";

const maxWidthStyles: Record<MaxWidth, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export interface PopoverContentProps {
  /** Maximum width */
  maxWidth?: MaxWidth;
  /** Side of trigger */
  side?: "top" | "right" | "bottom" | "left";
  /** Alignment */
  align?: "start" | "center" | "end";
  /** Side offset */
  sideOffset?: number;
  /** Alignment offset */
  alignOffset?: number;
  /** Additional class names */
  className?: string;
  /** Content */
  children: React.ReactNode;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      maxWidth = "sm",
      side = "bottom",
      align = "center",
      sideOffset = 8,
      alignOffset = 0,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <PopoverPrimitive.Popup
            ref={ref}
            className={cn(
              "z-50 w-full rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg",
              "animate-in fade-in-0 zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "focus:outline-none",
              maxWidthStyles[maxWidth],
              className,
            )}
            {...props}
          >
            {children}
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    );
  },
);

PopoverContent.displayName = "Popover.Content";

// ============================================================================
// Close
// ============================================================================

export interface PopoverCloseProps {
  /** Additional class names */
  className?: string;
  /** Close button content */
  children?: React.ReactNode;
}

const PopoverClose = React.forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <PopoverPrimitive.Close
        ref={ref}
        className={cn(
          "absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity",
          "hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:pointer-events-none",
          className,
        )}
        {...props}
      >
        {children || <X className="h-4 w-4" />}
        <span className="sr-only">Close</span>
      </PopoverPrimitive.Close>
    );
  },
);

PopoverClose.displayName = "Popover.Close";

// ============================================================================
// Arrow
// ============================================================================

export interface PopoverArrowProps {
  /** Additional class names */
  className?: string;
}

const PopoverArrow: React.FC<PopoverArrowProps> = ({ className, ...props }) => {
  return (
    <PopoverPrimitive.Arrow
      className={cn("fill-popover", className)}
      {...props}
    />
  );
};

PopoverArrow.displayName = "Popover.Arrow";

// ============================================================================
// Export compound component
// ============================================================================

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Close: PopoverClose,
  Arrow: PopoverArrow,
};
