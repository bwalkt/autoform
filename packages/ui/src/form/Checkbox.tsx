"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Text } from "@/typography";
import type { Size, Color } from "@/elements/tokens";
import { useFieldGroup } from "./FieldGroupContext";
import { Label } from "./Label";

// Checkbox-specific size tokens (smaller than form elements)
const checkboxSizes = {
  "1": {
    boxSize: "0.875rem", // 14px
    iconSize: "0.75rem",  // 12px
    borderRadius: "0.125rem",
  },
  "2": {
    boxSize: "1rem",      // 16px
    iconSize: "0.875rem", // 14px
    borderRadius: "0.125rem",
  },
  "3": {
    boxSize: "1.25rem",   // 20px
    iconSize: "1rem",     // 16px
    borderRadius: "0.25rem",
  },
  "4": {
    boxSize: "1.5rem",    // 24px
    iconSize: "1.25rem",  // 20px
    borderRadius: "0.25rem",
  },
} as const;

// Checkbox variants (subset of form variants that make sense for checkboxes)
type CheckboxVariant = "solid" | "soft" | "outline";

export interface CheckboxProps {
  /** The size of the checkbox */
  size?: Size;
  /** The visual variant */
  variant?: CheckboxVariant;
  /** The accent color */
  color?: Color;
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether the checkbox is in an indeterminate state */
  indeterminate?: boolean;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Whether the checkbox is required */
  required?: boolean;
  /** The name attribute for form submission */
  name?: string;
  /** The value attribute for form submission */
  value?: string;
  /** Additional class names */
  className?: string;
  /** The id attribute */
  id?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

// Color-specific styles for checked state - following Radix Themes patterns
const colorStyles: Record<Color, { solid: string; soft: string; outline: string }> = {
  default: {
    solid: "data-[checked]:bg-gray-900 data-[checked]:border-transparent dark:data-[checked]:bg-gray-100 dark:data-[checked]:border-transparent",
    soft: "bg-gray-100 data-[checked]:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:data-[checked]:bg-gray-700 dark:text-gray-300",
    outline: "data-[checked]:border-gray-900 text-gray-700 dark:data-[checked]:border-gray-100 dark:text-gray-300",
  },
  primary: {
    solid: "data-[checked]:bg-primary data-[checked]:border-transparent data-[checked]:text-primary-foreground",
    soft: "bg-primary/10 data-[checked]:bg-primary/20 text-primary",
    outline: "data-[checked]:border-primary text-primary",
  },
  neutral: {
    solid: "data-[checked]:bg-gray-500 data-[checked]:border-transparent data-[checked]:text-white dark:data-[checked]:bg-gray-400 dark:data-[checked]:text-gray-900",
    soft: "bg-muted data-[checked]:bg-muted text-muted-foreground",
    outline: "data-[checked]:border-gray-500 text-muted-foreground dark:data-[checked]:border-gray-400",
  },
  info: {
    solid: "data-[checked]:bg-blue-500 data-[checked]:border-transparent data-[checked]:text-white",
    soft: "bg-blue-50 data-[checked]:bg-blue-100 text-blue-600 dark:bg-blue-950 dark:data-[checked]:bg-blue-900 dark:text-blue-400",
    outline: "data-[checked]:border-blue-500 text-blue-600 dark:text-blue-400",
  },
  success: {
    solid: "data-[checked]:bg-green-500 data-[checked]:border-transparent data-[checked]:text-white",
    soft: "bg-green-50 data-[checked]:bg-green-100 text-green-600 dark:bg-green-950 dark:data-[checked]:bg-green-900 dark:text-green-400",
    outline: "data-[checked]:border-green-500 text-green-600 dark:text-green-400",
  },
  warning: {
    solid: "data-[checked]:bg-amber-500 data-[checked]:border-transparent data-[checked]:text-white",
    soft: "bg-amber-50 data-[checked]:bg-amber-100 text-amber-600 dark:bg-amber-950 dark:data-[checked]:bg-amber-900 dark:text-amber-400",
    outline: "data-[checked]:border-amber-500 text-amber-600 dark:text-amber-400",
  },
  error: {
    solid: "data-[checked]:bg-red-500 data-[checked]:border-transparent data-[checked]:text-white",
    soft: "bg-red-50 data-[checked]:bg-red-100 text-red-600 dark:bg-red-950 dark:data-[checked]:bg-red-900 dark:text-red-400",
    outline: "data-[checked]:border-red-500 text-red-600 dark:text-red-400",
  },
};

// Variant base styles - following Radix Themes subtle aesthetic
const variantStyles: Record<CheckboxVariant, string> = {
  solid: cn(
    // Subtle border like Radix Themes
    "border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900",
    // White tick on colored background when checked
    "data-[checked]:text-white dark:data-[checked]:text-gray-900",
    "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1",
    "hover:border-gray-300 dark:hover:border-gray-600",
    "transition-colors duration-150",
  ),
  soft: cn(
    // Soft has subtle background, colored tick
    "border-0",
    "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1",
    "transition-colors duration-150",
  ),
  outline: cn(
    // Outline has transparent bg, subtle border
    "border border-gray-200 bg-transparent dark:border-gray-700",
    "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1",
    "hover:border-gray-300 dark:hover:border-gray-600",
    "transition-colors duration-150",
  ),
};

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      size: sizeProp,
      variant = "solid",
      color = "default",
      checked,
      defaultChecked,
      onCheckedChange,
      indeterminate = false,
      disabled = false,
      required,
      name,
      value,
      className,
      id,
      style,
      ...props
    },
    ref,
  ) => {
    const fieldGroup = useFieldGroup();
    const size = sizeProp ?? fieldGroup.size;
    const sizeConfig = checkboxSizes[size];

    // Use inline styles for reliable sizing
    const checkboxStyles: React.CSSProperties = {
      width: sizeConfig.boxSize,
      height: sizeConfig.boxSize,
      borderRadius: sizeConfig.borderRadius,
      ...style,
    };

    const indicatorStyles: React.CSSProperties = {
      width: sizeConfig.iconSize,
      height: sizeConfig.iconSize,
    };

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        indeterminate={indeterminate}
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        style={checkboxStyles}
        className={cn(
          "peer inline-flex items-center justify-center shrink-0",
          "transition-all duration-150 ease-in-out",
          "outline-none",
          variantStyles[variant],
          colorStyles[color][variant],
          // Indeterminate state
          "data-[indeterminate]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:text-primary-foreground",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className="flex items-center justify-center text-inherit"
          style={indicatorStyles}
        >
          {indeterminate ? (
            <Minus className="h-full w-full stroke-current" strokeWidth={3} />
          ) : (
            <Check className="h-full w-full stroke-current" strokeWidth={3} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);

Checkbox.displayName = "Checkbox";

// Convenience component for Checkbox with Label
export interface CheckboxWithLabelProps extends CheckboxProps {
  /** The label text */
  label: string;
  /** Optional description text */
  description?: string;
}

export const CheckboxWithLabel = React.forwardRef<
  HTMLButtonElement,
  CheckboxWithLabelProps
>(({ label, description, id, size = "2", className, ...props }, ref) => {
  const generatedId = React.useId();
  const checkboxId = id || generatedId;

  return (
    <div className={cn("flex items-start gap-2", className)}>
      <Checkbox ref={ref} id={checkboxId} size={size} {...props} />
      <div className="flex flex-col">
        <Label htmlFor={checkboxId} size={size} disabled={props.disabled}>
          {label}
        </Label>
        {description && (
          <Text size="1" className="text-muted-foreground mt-1">
            {description}
          </Text>
        )}
      </div>
    </div>
  );
});

CheckboxWithLabel.displayName = "CheckboxWithLabel";

// ============================================================================
// CheckboxGroup Components
// ============================================================================

// Context for sharing props across checkbox group
interface CheckboxGroupContextValue {
  size: Size;
  variant: CheckboxVariant;
  color: Color;
  disabled?: boolean;
}

const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue>({
  size: "2",
  variant: "solid",
  color: "default",
});

export interface CheckboxGroupRootProps {
  /** The size of all checkboxes in the group */
  size?: Size;
  /** The visual variant of all checkboxes */
  variant?: CheckboxVariant;
  /** The accent color of all checkboxes */
  color?: Color;
  /** The controlled value of the checkbox group */
  value?: string[];
  /** The default value for uncontrolled usage */
  defaultValue?: string[];
  /** Callback when values change */
  onValueChange?: (value: string[]) => void;
  /** Whether all checkboxes are disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Children elements */
  children: React.ReactNode;
}

const CheckboxGroupRoot = React.forwardRef<HTMLDivElement, CheckboxGroupRootProps>(
  (
    {
      size = "2",
      variant = "solid",
      color = "default",
      value,
      defaultValue,
      onValueChange,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <CheckboxGroupContext.Provider value={{ size, variant, color, disabled }}>
        <CheckboxGroupPrimitive
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          className={cn("flex flex-col gap-2", className)}
          {...props}
        >
          {children}
        </CheckboxGroupPrimitive>
      </CheckboxGroupContext.Provider>
    );
  },
);

CheckboxGroupRoot.displayName = "CheckboxGroup.Root";

export interface CheckboxGroupItemProps {
  /** Unique value for this checkbox */
  value: string;
  /** The label text */
  label?: string;
  /** Optional description text */
  description?: string;
  /** Whether this specific checkbox is disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Children (alternative to label prop) */
  children?: React.ReactNode;
}

const CheckboxGroupItem = React.forwardRef<HTMLButtonElement, CheckboxGroupItemProps>(
  ({ value, label, description, disabled, className, children, ...props }, ref) => {
    const context = React.useContext(CheckboxGroupContext);
    const id = React.useId();
    const sizeConfig = checkboxSizes[context.size];

    const isDisabled = disabled || context.disabled;
    const displayLabel = label || children;

    // Use inline styles for reliable sizing
    const checkboxStyles: React.CSSProperties = {
      width: sizeConfig.boxSize,
      height: sizeConfig.boxSize,
      borderRadius: sizeConfig.borderRadius,
    };

    const indicatorStyles: React.CSSProperties = {
      width: sizeConfig.iconSize,
      height: sizeConfig.iconSize,
    };

    return (
      <div className={cn("flex items-start gap-2", className)}>
        <CheckboxPrimitive.Root
          ref={ref}
          id={id}
          name={value}
          value={value}
          disabled={isDisabled}
          style={checkboxStyles}
          className={cn(
            "peer inline-flex items-center justify-center shrink-0",
            "transition-all duration-150 ease-in-out",
            "outline-none",
            variantStyles[context.variant],
            colorStyles[context.color][context.variant],
            "data-[indeterminate]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:text-primary-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            className="flex items-center justify-center text-inherit"
            style={indicatorStyles}
          >
            <Check className="h-full w-full stroke-current" strokeWidth={3} />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {displayLabel && (
          <div className="flex flex-col">
            <Label htmlFor={id} size={context.size} disabled={isDisabled}>
              {displayLabel}
            </Label>
            {description && (
              <Text size="1" className="text-muted-foreground mt-1">
                {description}
              </Text>
            )}
          </div>
        )}
      </div>
    );
  },
);

CheckboxGroupItem.displayName = "CheckboxGroup.Item";

// Export the compound component
export const CheckboxGroup = {
  Root: CheckboxGroupRoot,
  Item: CheckboxGroupItem,
};

export type { CheckboxGroupRootProps as CheckboxGroupProps };
