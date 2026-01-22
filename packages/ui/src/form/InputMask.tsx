"use client";

import * as React from "react";
import { withMask } from "use-mask-input";
import { cn } from "@/lib/utils";
import { getSizeStyles, getRadiusStyles } from "@/elements/utils";
import { useFieldGroup } from "./FieldGroupContext";
import type { Color, Radius, Size, TextFieldVariant } from "@/elements/tokens";

// Common mask presets
export const maskPresets = {
  phone: "(999) 999-9999",
  phoneInternational: "+9 (999) 999-9999",
  date: "99/99/9999",
  dateISO: "9999-99-99",
  time: "99:99",
  time12h: "99:99 aa",
  ssn: "999-99-9999",
  zip: "99999",
  zipPlus4: "99999-9999",
  creditCard: "9999 9999 9999 9999",
  cvv: "999",
  expiry: "99/99",
  currency: "$ 9{1,3}[,999][,999][,999]",
  percentage: "9{1,3}%",
  ipAddress: "999.999.999.999",
} as const;

export type MaskPreset = keyof typeof maskPresets;

/** Mask options for use-mask-input */
export interface MaskOptions {
  /** Show mask on focus */
  showMaskOnFocus?: boolean;
  /** Show mask on hover */
  showMaskOnHover?: boolean;
  /** Placeholder character */
  placeholder?: string;
  /** Auto unmask value */
  autoUnmask?: boolean;
  /** Right align the value */
  rightAlign?: boolean;
  /** Clear incomplete input on blur */
  clearIncomplete?: boolean;
  /** Allow input to be optional */
  nullable?: boolean;
  /** JIT masking - mask expands as you type */
  jitMasking?: boolean;
}

export interface InputMaskProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * The mask pattern or a preset name.
   * Use '9' for digits, 'a' for letters, '*' for alphanumeric.
   * Or use a preset like 'phone', 'date', 'creditCard', etc.
   */
  mask: string | MaskPreset;
  /** Additional mask options from use-mask-input */
  maskOptions?: MaskOptions;
  /** The size of the input */
  size?: Size;
  /** The visual variant */
  variant?: TextFieldVariant;
  /** The accent color */
  color?: Color;
  /** The border radius */
  radius?: Radius;
  /** Whether the field has an error */
  error?: boolean;
  /** Icon to display on the left */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right */
  rightIcon?: React.ReactNode;
}

// Variant styles
const variantStyles: Record<string, string> = {
  classic: cn(
    "border border-input",
    "bg-gradient-to-b from-background to-muted/30 text-foreground shadow-sm",
    "focus:border-ring",
    "focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ),
  solid: cn(
    "border-0",
    "bg-primary/10 text-foreground",
    "focus:bg-primary/15",
    "focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ),
  soft: cn(
    "border-0",
    "bg-secondary text-foreground",
    "hover:bg-secondary/80",
    "focus:bg-secondary/80",
    "focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ),
  surface: cn(
    "border border-input",
    "bg-background text-foreground shadow-sm",
    "focus:border-ring",
    "focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ),
  outline: cn(
    "border border-input",
    "bg-background text-foreground",
    "focus:border-ring",
    "focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ),
  ghost: cn(
    "border-0",
    "bg-transparent text-foreground",
    "hover:bg-accent",
    "focus:bg-accent",
    "focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ),
};

// Color-specific overrides for bordered variants
const colorStyles: Record<Color, string> = {
  default: "",
  primary: "border-primary focus:border-primary focus:ring-primary/30",
  neutral: "border-gray-500 focus:border-gray-500 focus:ring-gray-500/30",
  info: "border-blue-500 focus:border-blue-500 focus:ring-blue-500/30",
  success: "border-green-500 focus:border-green-500 focus:ring-green-500/30",
  warning: "border-amber-500 focus:border-amber-500 focus:ring-amber-500/30",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500/30",
};

// Background color overrides for solid variant
const solidColorStyles: Record<Color, string> = {
  default: "",
  primary: "bg-primary/10 focus:bg-primary/15 focus:ring-primary/30",
  neutral: "bg-gray-500/10 focus:bg-gray-500/15 focus:ring-gray-500/30",
  info: "bg-blue-500/10 focus:bg-blue-500/15 focus:ring-blue-500/30",
  success: "bg-green-500/10 focus:bg-green-500/15 focus:ring-green-500/30",
  warning: "bg-amber-500/10 focus:bg-amber-500/15 focus:ring-amber-500/30",
  error: "bg-red-500/10 focus:bg-red-500/15 focus:ring-red-500/30",
};

// Helper to get the actual mask pattern
function getMaskPattern(mask: string | MaskPreset): string {
  if (mask in maskPresets) {
    return maskPresets[mask as MaskPreset];
  }
  return mask;
}

export const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
  (
    {
      mask,
      maskOptions,
      size: sizeProp,
      variant: variantProp,
      color,
      radius = "md",
      error = false,
      leftIcon,
      rightIcon,
      className,
      style,
      disabled,
      ...props
    },
    ref,
  ) => {
    // Get context values from FieldGroup (if wrapped)
    const fieldGroup = useFieldGroup();
    const size = sizeProp ?? fieldGroup.size;
    const variant = variantProp ?? fieldGroup.variant;

    const sizeStyles = getSizeStyles(size);
    const radiusStyles = getRadiusStyles(radius);

    const combinedStyles = {
      ...sizeStyles,
      ...radiusStyles,
      ...style,
    };

    // Determine effective color (error overrides)
    const effectiveColor = error ? "error" : color;

    // Get the mask pattern
    const maskPattern = getMaskPattern(mask);

    // Memoize the mask ref to avoid recreating on every render
    const maskRef = React.useMemo(
      () => withMask(maskPattern, maskOptions),
      [maskPattern, maskOptions],
    );

    // Combine refs - withMask returns a ref callback
    const combinedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        // Handle the forwarded ref
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        // Handle the mask ref
        maskRef(node);
      },
      [ref, maskRef],
    );

    // Handle floating variants - strip them to base variant for simplicity
    const baseVariant = variant?.startsWith("floating-") ? "outline" : (variant ?? "outline");

    return (
      <div
        className={cn("relative w-full", className)}
        style={combinedStyles}
      >
        {leftIcon && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(var(--element-padding-x)*2+1rem)] pointer-events-none z-10">
            <div className="w-4 h-4 text-muted-foreground flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
              {leftIcon}
            </div>
          </div>
        )}

        <input
          ref={combinedRef}
          disabled={disabled}
          className={cn(
            "w-full outline-none transition-all duration-150 ease-in-out",
            "h-[var(--element-height)]",
            "px-[var(--element-padding-x)] py-[var(--element-padding-y)]",
            "text-[var(--element-font-size)] leading-[var(--element-line-height)]",
            "rounded-[var(--element-border-radius)]",

            // Variant styles
            variantStyles[baseVariant],

            // Color overrides (use solidColorStyles for solid variant)
            baseVariant === "solid"
              ? effectiveColor && solidColorStyles[effectiveColor]
              : effectiveColor && colorStyles[effectiveColor],

            // Icon padding adjustments
            leftIcon && "pl-[calc(var(--element-padding-x)*2+1rem)]",
            rightIcon && "pr-[calc(var(--element-padding-x)*2+1rem)]",

            // Disabled state
            disabled && "opacity-50 cursor-not-allowed",
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(var(--element-padding-x)*2+1rem)] pointer-events-none z-10">
            <div className="w-4 h-4 text-muted-foreground flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
              {rightIcon}
            </div>
          </div>
        )}
      </div>
    );
  },
);

InputMask.displayName = "InputMask";
