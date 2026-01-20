"use client";

import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { cn } from "@/lib/utils";
import { Text } from "@/typography";
import type { Size, Color } from "@/elements/tokens";
import { useFieldGroup } from "./FieldGroupContext";

// Size configurations with CSS values for reliable styling
const radioSizes = {
  "1": {
    radioSize: "0.75rem",      // 12px
    indicatorSize: "0.375rem", // 6px
    textSize: "1" as const,
    gapClass: "gap-1.5",
  },
  "2": {
    radioSize: "1rem",         // 16px
    indicatorSize: "0.5rem",   // 8px
    textSize: "2" as const,
    gapClass: "gap-2",
  },
  "3": {
    radioSize: "1.25rem",      // 20px
    indicatorSize: "0.625rem", // 10px
    textSize: "2" as const,
    gapClass: "gap-2.5",
  },
  "4": {
    radioSize: "1.5rem",       // 24px
    indicatorSize: "0.75rem",  // 12px
    textSize: "3" as const,
    gapClass: "gap-3",
  },
} as const;

// Color styles
const colorStyles: Record<Color, string> = {
  default: "data-[checked]:border-primary data-[checked]:bg-primary",
  primary: "data-[checked]:border-primary data-[checked]:bg-primary",
  neutral: "data-[checked]:border-gray-500 data-[checked]:bg-gray-500 dark:data-[checked]:border-gray-400 dark:data-[checked]:bg-gray-400",
  info: "data-[checked]:border-blue-500 data-[checked]:bg-blue-500",
  success: "data-[checked]:border-green-500 data-[checked]:bg-green-500",
  warning: "data-[checked]:border-amber-500 data-[checked]:bg-amber-500",
  error: "data-[checked]:border-red-500 data-[checked]:bg-red-500",
};

// Context for sharing props
interface RadioGroupContextValue {
  size: Size;
  color: Color;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({
  size: "2",
  color: "default",
});

// ============================================================================
// Root
// ============================================================================

export interface RadioGroupRootProps {
  /** Size of the radio buttons */
  size?: Size;
  /** Color of the radio buttons */
  color?: Color;
  /** Current value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Whether all radios are disabled */
  disabled?: boolean;
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

const RadioGroupRoot = React.forwardRef<HTMLDivElement, RadioGroupRootProps>(
  (
    {
      size: sizeProp,
      color = "default",
      value,
      defaultValue,
      onValueChange,
      disabled,
      orientation = "vertical",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const fieldGroup = useFieldGroup();
    const size = sizeProp ?? fieldGroup.size;

    const handleValueChange = React.useCallback(
      (newValue: unknown) => {
        if (onValueChange && typeof newValue === "string") {
          onValueChange(newValue);
        }
      },
      [onValueChange],
    );

    return (
      <RadioGroupContext.Provider value={{ size, color, disabled }}>
        <RadioGroupPrimitive
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          disabled={disabled}
          className={cn(
            "flex",
            orientation === "vertical" && "flex-col gap-2",
            orientation === "horizontal" && "flex-row gap-4",
            className,
          )}
          {...props}
        >
          {children}
        </RadioGroupPrimitive>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroupRoot.displayName = "RadioGroup.Root";

// ============================================================================
// Item
// ============================================================================

export interface RadioGroupItemProps {
  /** Value of this radio */
  value: string;
  /** Label for the radio */
  label?: string;
  /** Whether this radio is disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Children (alternative to label) */
  children?: React.ReactNode;
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ value, label, disabled, className, children, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext);
    const id = React.useId();
    const sizeConfig = radioSizes[context.size];
    const isDisabled = disabled || context.disabled;

    // Inline styles for reliable sizing
    const radioStyles: React.CSSProperties = {
      width: sizeConfig.radioSize,
      height: sizeConfig.radioSize,
    };

    const indicatorStyles: React.CSSProperties = {
      width: sizeConfig.indicatorSize,
      height: sizeConfig.indicatorSize,
    };

    return (
      <label
        htmlFor={id}
        className={cn(
          "flex items-center cursor-pointer",
          sizeConfig.gapClass,
          isDisabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <RadioPrimitive.Root
          ref={ref}
          id={id}
          value={value}
          disabled={isDisabled}
          style={radioStyles}
          className={cn(
            "peer inline-flex items-center justify-center rounded-full",
            "border-2 border-input bg-background",
            "transition-all duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            colorStyles[context.color],
          )}
          {...props}
        >
          <RadioPrimitive.Indicator
            style={indicatorStyles}
            className="rounded-full bg-white"
          />
        </RadioPrimitive.Root>
        {(label || children) && (
          <Text size={sizeConfig.textSize} weight="medium">
            {label || children}
          </Text>
        )}
      </label>
    );
  },
);

RadioGroupItem.displayName = "RadioGroup.Item";

// ============================================================================
// Export compound component
// ============================================================================

export const RadioGroup = {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
};
