"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { Size, Radius } from "./tokens";

// Size configurations
const segmentSizes = {
  "1": {
    root: "h-7 p-0.5 text-xs",
    item: "px-2",
  },
  "2": {
    root: "h-8 p-0.5 text-sm",
    item: "px-3",
  },
  "3": {
    root: "h-10 p-1 text-sm",
    item: "px-4",
  },
  "4": {
    root: "h-12 p-1 text-base",
    item: "px-5",
  },
};

// Radius styles
const radiusStyles: Record<Radius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

// Context for sharing props
interface SegmentedControlContextValue {
  size: Size;
  radius: Radius;
  value: string;
  onValueChange: (value: string) => void;
}

const SegmentedControlContext = React.createContext<SegmentedControlContextValue | null>(null);

// ============================================================================
// Root
// ============================================================================

export interface SegmentedControlRootProps {
  /** Size of the control */
  size?: Size;
  /** Border radius */
  radius?: Radius;
  /** Current value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

const SegmentedControlRoot = React.forwardRef<HTMLDivElement, SegmentedControlRootProps>(
  (
    {
      size = "2",
      radius = "md",
      value: controlledValue,
      defaultValue,
      onValueChange,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");
    const value = controlledValue ?? internalValue;

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [controlledValue, onValueChange],
    );

    const sizeConfig = segmentSizes[size];

    return (
      <SegmentedControlContext.Provider
        value={{ size, radius, value, onValueChange: handleValueChange }}
      >
        <div
          ref={ref}
          role="radiogroup"
          className={cn(
            "inline-flex items-center bg-muted",
            sizeConfig.root,
            radiusStyles[radius],
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </SegmentedControlContext.Provider>
    );
  },
);

SegmentedControlRoot.displayName = "SegmentedControl.Root";

// ============================================================================
// Item
// ============================================================================

export interface SegmentedControlItemProps {
  /** Value of this item */
  value: string;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Item content */
  children: React.ReactNode;
}

const SegmentedControlItem = React.forwardRef<
  HTMLButtonElement,
  SegmentedControlItemProps
>(({ value, disabled, className, children, ...props }, ref) => {
  const context = React.useContext(SegmentedControlContext);

  if (!context) {
    throw new Error("SegmentedControl.Item must be used within SegmentedControl.Root");
  }

  const { size, radius, value: selectedValue, onValueChange } = context;
  const isSelected = value === selectedValue;
  const sizeConfig = segmentSizes[size];

  // Calculate inner radius (slightly smaller than outer)
  const innerRadiusMap: Record<Radius, string> = {
    none: "rounded-none",
    sm: "rounded-[2px]",
    md: "rounded-[4px]",
    lg: "rounded-[6px]",
    full: "rounded-full",
  };

  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={isSelected}
      disabled={disabled}
      onClick={() => onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        sizeConfig.item,
        innerRadiusMap[radius],

        // Selected state
        isSelected
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground",

        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});

SegmentedControlItem.displayName = "SegmentedControl.Item";

// ============================================================================
// Export compound component
// ============================================================================

export const SegmentedControl = {
  Root: SegmentedControlRoot,
  Item: SegmentedControlItem,
};
