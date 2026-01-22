"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSizeStyles, getRadiusStyles } from "@/elements/utils";
import { useFieldGroup } from "./FieldGroupContext";
import type { Color, Radius, Size, TextFieldVariant } from "@/elements/tokens";

// ============================================================================
// Types
// ============================================================================

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
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
  /** Whether to show password strength indicator */
  showStrength?: boolean;
  /** Custom strength calculator (returns 0-4) */
  strengthCalculator?: (password: string) => number;
}

// ============================================================================
// Variant Styles
// ============================================================================

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

const colorStyles: Record<Color, string> = {
  default: "",
  primary: "border-primary focus:border-primary focus:ring-primary/30",
  neutral: "border-gray-500 focus:border-gray-500 focus:ring-gray-500/30",
  info: "border-blue-500 focus:border-blue-500 focus:ring-blue-500/30",
  success: "border-green-500 focus:border-green-500 focus:ring-green-500/30",
  warning: "border-amber-500 focus:border-amber-500 focus:ring-amber-500/30",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500/30",
};

const solidColorStyles: Record<Color, string> = {
  default: "",
  primary: "bg-primary/10 focus:bg-primary/15 focus:ring-primary/30",
  neutral: "bg-gray-500/10 focus:bg-gray-500/15 focus:ring-gray-500/30",
  info: "bg-blue-500/10 focus:bg-blue-500/15 focus:ring-blue-500/30",
  success: "bg-green-500/10 focus:bg-green-500/15 focus:ring-green-500/30",
  warning: "bg-amber-500/10 focus:bg-amber-500/15 focus:ring-amber-500/30",
  error: "bg-red-500/10 focus:bg-red-500/15 focus:ring-red-500/30",
};

// ============================================================================
// Password Strength Calculator
// ============================================================================

const defaultStrengthCalculator = (password: string): number => {
  if (!password) return 0;

  let strength = 0;

  // Length checks
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;

  // Character variety checks
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
  if (/\d/.test(password)) strength += 0.5;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 0.5;

  return Math.min(4, Math.floor(strength));
};

const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
const strengthColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
];

// ============================================================================
// Strength Indicator Component
// ============================================================================

interface StrengthIndicatorProps {
  strength: number;
}

const StrengthIndicator: React.FC<StrengthIndicatorProps> = ({ strength }) => (
  <div className="mt-2 space-y-1">
    <div className="flex gap-1">
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={cn(
            "h-1 flex-1 rounded-full transition-colors",
            index < strength ? strengthColors[strength] : "bg-muted",
          )}
        />
      ))}
    </div>
    <p className={cn("text-xs", strength < 2 ? "text-destructive" : "text-muted-foreground")}>
      {strengthLabels[strength]}
    </p>
  </div>
);

// ============================================================================
// Main Component
// ============================================================================

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      size: sizeProp,
      variant: variantProp,
      color,
      radius = "md",
      error = false,
      leftIcon,
      showStrength = false,
      strengthCalculator = defaultStrengthCalculator,
      className,
      style,
      disabled,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const fieldGroup = useFieldGroup();
    const size = sizeProp ?? fieldGroup.size;
    const variant = variantProp ?? fieldGroup.variant;

    const sizeStyles = getSizeStyles(size);
    const radiusStyles = getRadiusStyles(radius);
    const combinedStyles = { ...sizeStyles, ...radiusStyles, ...style };

    const [showPassword, setShowPassword] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(
      () => (value as string) ?? (defaultValue as string) ?? "",
    );

    // Sync internal value with controlled value
    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value as string);
      }
    }, [value]);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
        onChange?.(e);
      },
      [onChange],
    );

    const effectiveColor = error ? "error" : color;
    const baseVariant = variant.startsWith("floating-") ? "outline" : variant;
    const strength = showStrength ? strengthCalculator(internalValue) : 0;

    return (
      <div className={cn("w-full", className)}>
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(var(--element-padding-x)*2+1rem)] pointer-events-none z-10">
              <div className="w-4 h-4 text-muted-foreground flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                {leftIcon}
              </div>
            </div>
          )}

          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            className={cn(
              "w-full outline-none transition-all duration-150 ease-in-out",
              "h-[var(--element-height)]",
              "px-[var(--element-padding-x)] py-[var(--element-padding-y)]",
              "text-[var(--element-font-size)] leading-[var(--element-line-height)]",
              "rounded-[var(--element-border-radius)]",

              // Variant styles
              variantStyles[baseVariant],

              // Color overrides
              baseVariant === "solid"
                ? effectiveColor && solidColorStyles[effectiveColor]
                : effectiveColor && colorStyles[effectiveColor],

              // Icon padding adjustments
              leftIcon && "pl-[calc(var(--element-padding-x)*2+1rem)]",
              "pr-[calc(var(--element-padding-x)*2+1rem)]", // Always have padding for toggle button

              // Disabled state
              disabled && "opacity-50 cursor-not-allowed",
            )}
            style={combinedStyles}
            {...props}
          />

          {/* Toggle visibility button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center",
              "w-[calc(var(--element-padding-x)*2+1rem)] h-full",
              "text-muted-foreground hover:text-foreground transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-r-[var(--element-border-radius)]",
              disabled && "pointer-events-none opacity-50",
            )}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Strength indicator */}
        {showStrength && internalValue && <StrengthIndicator strength={strength} />}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
