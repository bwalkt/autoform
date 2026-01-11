"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";
import { Check, Minus } from "lucide-react";
import { cn } from "../lib/utils";
import type { Size, Color } from "./tokens";

// Checkbox-specific size tokens (smaller than form elements)
const checkboxSizes = {
  xs: {
    box: "h-3.5 w-3.5",
    icon: "h-3 w-3",
    radius: "rounded-sm",
  },
  sm: {
    box: "h-4 w-4",
    icon: "h-3.5 w-3.5",
    radius: "rounded-sm",
  },
  md: {
    box: "h-5 w-5",
    icon: "h-4 w-4",
    radius: "rounded",
  },
  lg: {
    box: "h-6 w-6",
    icon: "h-5 w-5",
    radius: "rounded",
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
}

// Color-specific styles for checked state
const colorStyles: Record<Color, { solid: string; soft: string; outline: string }> = {
  default: {
    solid: "data-[checked]:bg-primary data-[checked]:border-primary",
    soft: "data-[checked]:bg-primary/20 data-[checked]:text-primary",
    outline: "data-[checked]:border-primary data-[checked]:text-primary",
  },
  primary: {
    solid: "data-[checked]:bg-primary data-[checked]:border-primary",
    soft: "data-[checked]:bg-primary/20 data-[checked]:text-primary",
    outline: "data-[checked]:border-primary data-[checked]:text-primary",
  },
  info: {
    solid: "data-[checked]:bg-blue-500 data-[checked]:border-blue-500",
    soft: "data-[checked]:bg-blue-500/20 data-[checked]:text-blue-600",
    outline: "data-[checked]:border-blue-500 data-[checked]:text-blue-600",
  },
  success: {
    solid: "data-[checked]:bg-green-500 data-[checked]:border-green-500",
    soft: "data-[checked]:bg-green-500/20 data-[checked]:text-green-600",
    outline: "data-[checked]:border-green-500 data-[checked]:text-green-600",
  },
  warning: {
    solid: "data-[checked]:bg-amber-500 data-[checked]:border-amber-500",
    soft: "data-[checked]:bg-amber-500/20 data-[checked]:text-amber-600",
    outline: "data-[checked]:border-amber-500 data-[checked]:text-amber-600",
  },
  error: {
    solid: "data-[checked]:bg-red-500 data-[checked]:border-red-500",
    soft: "data-[checked]:bg-red-500/20 data-[checked]:text-red-600",
    outline: "data-[checked]:border-red-500 data-[checked]:text-red-600",
  },
};

// Variant base styles
const variantStyles: Record<CheckboxVariant, string> = {
  solid: cn(
    "border-2 border-input bg-background",
    "data-[checked]:text-primary-foreground",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  ),
  soft: cn(
    "border-0 bg-secondary",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  ),
  outline: cn(
    "border-2 border-input bg-transparent",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  ),
};

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      size = "md",
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
      ...props
    },
    ref,
  ) => {
    const sizeConfig = checkboxSizes[size];

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
        className={cn(
          "peer inline-flex items-center justify-center shrink-0",
          "transition-all duration-150 ease-in-out",
          "outline-none",
          sizeConfig.box,
          sizeConfig.radius,
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
          className={cn(
            "flex items-center justify-center",
            sizeConfig.icon,
          )}
        >
          {indeterminate ? (
            <Minus className="h-full w-full" strokeWidth={3} />
          ) : (
            <Check className="h-full w-full" strokeWidth={3} />
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
>(({ label, description, id, size = "md", className, ...props }, ref) => {
  const generatedId = React.useId();
  const checkboxId = id || generatedId;

  const textSizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
  };

  const descriptionSizes = {
    xs: "text-xs",
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  };

  return (
    <div className={cn("flex items-start gap-2", className)}>
      <Checkbox ref={ref} id={checkboxId} size={size} {...props} />
      <div className="flex flex-col">
        <label
          htmlFor={checkboxId}
          className={cn(
            "font-medium leading-none cursor-pointer",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            textSizes[size],
          )}
        >
          {label}
        </label>
        {description && (
          <p
            className={cn(
              "text-muted-foreground mt-1",
              descriptionSizes[size],
            )}
          >
            {description}
          </p>
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
  size: "md",
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
      size = "md",
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

    const textSizes = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
    };

    const descriptionSizes = {
      xs: "text-xs",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
    };

    const isDisabled = disabled || context.disabled;
    const displayLabel = label || children;

    return (
      <div className={cn("flex items-start gap-2", className)}>
        <CheckboxPrimitive.Root
          ref={ref}
          id={id}
          name={value}
          disabled={isDisabled}
          className={cn(
            "peer inline-flex items-center justify-center shrink-0",
            "transition-all duration-150 ease-in-out",
            "outline-none",
            sizeConfig.box,
            sizeConfig.radius,
            variantStyles[context.variant],
            colorStyles[context.color][context.variant],
            "data-[indeterminate]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:text-primary-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            className={cn(
              "flex items-center justify-center",
              sizeConfig.icon,
            )}
          >
            <Check className="h-full w-full" strokeWidth={3} />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {displayLabel && (
          <div className="flex flex-col">
            <label
              htmlFor={id}
              className={cn(
                "font-medium leading-none cursor-pointer",
                isDisabled && "cursor-not-allowed opacity-70",
                textSizes[context.size],
              )}
            >
              {displayLabel}
            </label>
            {description && (
              <p
                className={cn(
                  "text-muted-foreground mt-1",
                  descriptionSizes[context.size],
                )}
              >
                {description}
              </p>
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
