"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "../lib/utils";

// ============================================================================
// Root
// ============================================================================

export interface HoverCardRootProps {
  /** Whether the hover card is open */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Default open state */
  defaultOpen?: boolean;
  /** Children elements */
  children: React.ReactNode;
}

const HoverCardRoot: React.FC<HoverCardRootProps> = ({
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

HoverCardRoot.displayName = "HoverCard.Root";

// ============================================================================
// Trigger
// ============================================================================

export interface HoverCardTriggerProps {
  /** Trigger content */
  children: React.ReactNode;
  /** Additional class names */
  className?: string;
}

const HoverCardTrigger = React.forwardRef<HTMLButtonElement, HoverCardTriggerProps>(
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

HoverCardTrigger.displayName = "HoverCard.Trigger";

// ============================================================================
// Content
// ============================================================================

type MaxWidth = "xs" | "sm" | "md" | "lg";

const maxWidthStyles: Record<MaxWidth, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

export interface HoverCardContentProps {
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

const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
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
              "z-50 rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg",
              "animate-in fade-in-0 zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
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

HoverCardContent.displayName = "HoverCard.Content";

// ============================================================================
// Export compound component
// ============================================================================

export const HoverCard = {
  Root: HoverCardRoot,
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
};
