"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "../lib/utils";
import type { Size, Color, Radius } from "../elements/tokens";
import { useFieldGroup } from "./FieldGroupContext";
import { Label } from "./Label";

// Size configurations with CSS values for reliable styling
const switchSizes = {
  "1": {
    rootHeight: "1rem",      // 16px
    rootWidth: "1.75rem",    // 28px
    thumbSize: "0.75rem",    // 12px
    thumbTranslate: "0.75rem", // 12px
  },
  "2": {
    rootHeight: "1.25rem",   // 20px
    rootWidth: "2.25rem",    // 36px
    thumbSize: "1rem",       // 16px
    thumbTranslate: "1rem",  // 16px
  },
  "3": {
    rootHeight: "1.5rem",    // 24px
    rootWidth: "2.75rem",    // 44px
    thumbSize: "1.25rem",    // 20px
    thumbTranslate: "1.25rem", // 20px
  },
  "4": {
    rootHeight: "1.75rem",   // 28px
    rootWidth: "3.5rem",     // 56px
    thumbSize: "1.5rem",     // 24px
    thumbTranslate: "1.75rem", // 28px
  },
} as const;

// Radius styles
const radiusStyles: Record<Radius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

// Color styles for checked state
const colorStyles: Record<Color, string> = {
  default: "data-[checked]:bg-primary",
  primary: "data-[checked]:bg-primary",
  neutral: "data-[checked]:bg-gray-500 dark:data-[checked]:bg-gray-400",
  info: "data-[checked]:bg-blue-500",
  success: "data-[checked]:bg-green-500",
  warning: "data-[checked]:bg-amber-500",
  error: "data-[checked]:bg-red-500",
};

// Variant styles
type SwitchVariant = "surface" | "classic" | "soft";

export interface SwitchProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
  "checked" | "defaultChecked" | "onCheckedChange"
> {
  /** Whether the switch is checked */
  checked?: boolean;
  /** Default checked state */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Size of the switch */
  size?: Size;
  /** Visual variant */
  variant?: SwitchVariant;
  /** Color when checked */
  color?: Color;
  /** Border radius */
  radius?: Radius;
  /** High contrast mode */
  highContrast?: boolean;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked,
      onCheckedChange,
      size: sizeProp,
      variant = "surface",
      color = "primary",
      radius = "full",
      highContrast = false,
      className,
      ...props
    },
    ref,
  ) => {
    const fieldGroup = useFieldGroup();
    const size = sizeProp ?? fieldGroup.size;
    const sizeConfig = switchSizes[size];

    // Inline styles for reliable sizing
    const rootStyles: React.CSSProperties = {
      height: sizeConfig.rootHeight,
      width: sizeConfig.rootWidth,
    };

    const thumbStyles: React.CSSProperties = {
      width: sizeConfig.thumbSize,
      height: sizeConfig.thumbSize,
    };

    // We need to handle the checked translation with CSS custom property
    const thumbCheckedTranslate = sizeConfig.thumbTranslate;

    return (
      <SwitchPrimitive.Root
        ref={ref as React.Ref<HTMLElement>}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        style={rootStyles}
        className={cn(
          "peer inline-flex shrink-0 cursor-pointer items-center border-2 border-transparent transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          radiusStyles[radius],
          colorStyles[color],

          // Variant styles for unchecked state
          variant === "surface" && "bg-input",
          variant === "classic" && "bg-input border-border",
          variant === "soft" && "bg-secondary/50",

          // High contrast
          highContrast && "data-[checked]:shadow-md",

          className,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          style={{
            ...thumbStyles,
            "--thumb-translate": thumbCheckedTranslate,
          } as React.CSSProperties}
          className={cn(
            "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
            "translate-x-0 data-[checked]:translate-x-[var(--thumb-translate)]",
          )}
        />
      </SwitchPrimitive.Root>
    );
  },
);

Switch.displayName = "Switch";

// ============================================================================
// Switch with Label
// ============================================================================

export interface SwitchWithLabelProps extends SwitchProps {
  /** Label text */
  label: string;
  /** Label position */
  labelPosition?: "left" | "right";
}

const SwitchWithLabel = React.forwardRef<HTMLButtonElement, SwitchWithLabelProps>(
  ({ label, labelPosition = "right", size = "2", className, id: idProp, ...props }, ref) => {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;

    return (
      <div
        className={cn(
          "flex items-center gap-2",
          labelPosition === "left" && "flex-row-reverse",
          className,
        )}
      >
        <Switch ref={ref} id={id} {...props} size={size} />
        <Label htmlFor={id} size={size} disabled={props.disabled}>
          {label}
        </Label>
      </div>
    );
  },
);

SwitchWithLabel.displayName = "SwitchWithLabel";

export { Switch, SwitchWithLabel };
