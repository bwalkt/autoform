"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";
import { Check } from "lucide-react";
import { cn } from "../lib/utils";
import type { Size, Color } from "./tokens";

// Card-specific size tokens
const cardSizes = {
  "1": {
    card: "p-3",
    checkbox: "h-3.5 w-3.5",
    checkIcon: "h-3 w-3",
    text: "text-xs",
    gap: "gap-2",
  },
  "2": {
    card: "p-3",
    checkbox: "h-4 w-4",
    checkIcon: "h-3.5 w-3.5",
    text: "text-sm",
    gap: "gap-2",
  },
  "3": {
    card: "p-4",
    checkbox: "h-5 w-5",
    checkIcon: "h-4 w-4",
    text: "text-sm",
    gap: "gap-3",
  },
  "4": {
    card: "p-5",
    checkbox: "h-6 w-6",
    checkIcon: "h-5 w-5",
    text: "text-base",
    gap: "gap-3",
  },
} as const;

// Variant styles for cards
type CardVariant = "surface" | "outline";

// Context for sharing props across checkbox cards
interface CheckboxCardsContextValue {
  size: Size;
  variant: CardVariant;
  color: Color;
  disabled?: boolean;
}

const CheckboxCardsContext = React.createContext<CheckboxCardsContextValue>({
  size: "2",
  variant: "surface",
  color: "default",
});

// Column options for responsive grid
type Columns = "1" | "2" | "3" | "4" | "auto";

const columnStyles: Record<Columns, string> = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 sm:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  auto: "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
};

// Gap options
type Gap = "1" | "2" | "3" | "4" | "5" | "6";

const gapStyles: Record<Gap, string> = {
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "5": "gap-5",
  "6": "gap-6",
};

export interface CheckboxCardsRootProps {
  /** The size of all cards */
  size?: Size;
  /** The visual variant */
  variant?: CardVariant;
  /** The accent color */
  color?: Color;
  /** Number of columns (responsive) */
  columns?: Columns;
  /** Gap between cards */
  gap?: Gap;
  /** The controlled value */
  value?: string[];
  /** The default value */
  defaultValue?: string[];
  /** Callback when values change */
  onValueChange?: (value: string[]) => void;
  /** Whether all cards are disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Children elements */
  children: React.ReactNode;
}

const CheckboxCardsRoot = React.forwardRef<HTMLDivElement, CheckboxCardsRootProps>(
  (
    {
      size = "2",
      variant = "surface",
      color = "default",
      columns = "auto",
      gap = "4",
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
      <CheckboxCardsContext.Provider value={{ size, variant, color, disabled }}>
        <CheckboxGroupPrimitive
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          className={cn(
            "grid",
            columnStyles[columns],
            gapStyles[gap],
            className,
          )}
          {...props}
        >
          {children}
        </CheckboxGroupPrimitive>
      </CheckboxCardsContext.Provider>
    );
  },
);

CheckboxCardsRoot.displayName = "CheckboxCards.Root";

// Color styles for checked state
const colorStyles: Record<Color, string> = {
  default: "data-[checked]:border-primary data-[checked]:bg-primary/5",
  primary: "data-[checked]:border-primary data-[checked]:bg-primary/5",
  neutral: "data-[checked]:border-gray-500 data-[checked]:bg-gray-500/5 dark:data-[checked]:border-gray-400",
  info: "data-[checked]:border-blue-500 data-[checked]:bg-blue-500/5",
  success: "data-[checked]:border-green-500 data-[checked]:bg-green-500/5",
  warning: "data-[checked]:border-amber-500 data-[checked]:bg-amber-500/5",
  error: "data-[checked]:border-red-500 data-[checked]:bg-red-500/5",
};

const checkboxColorStyles: Record<Color, string> = {
  default: "data-[checked]:bg-primary data-[checked]:border-primary",
  primary: "data-[checked]:bg-primary data-[checked]:border-primary",
  neutral: "data-[checked]:bg-gray-500 data-[checked]:border-gray-500 dark:data-[checked]:bg-gray-400 dark:data-[checked]:border-gray-400",
  info: "data-[checked]:bg-blue-500 data-[checked]:border-blue-500",
  success: "data-[checked]:bg-green-500 data-[checked]:border-green-500",
  warning: "data-[checked]:bg-amber-500 data-[checked]:border-amber-500",
  error: "data-[checked]:bg-red-500 data-[checked]:border-red-500",
};

export interface CheckboxCardsItemProps {
  /** Unique value for this card */
  value: string;
  /** Whether this card is disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Card content */
  children: React.ReactNode;
}

const CheckboxCardsItem = React.forwardRef<HTMLLabelElement, CheckboxCardsItemProps>(
  ({ value, disabled, className, children, ...props }, ref) => {
    const context = React.useContext(CheckboxCardsContext);
    const id = React.useId();
    const sizeConfig = cardSizes[context.size];
    const isDisabled = disabled || context.disabled;

    return (
      <label
        ref={ref}
        htmlFor={id}
        className={cn(
          "relative flex cursor-pointer select-none rounded-xl border transition-all duration-150",
          sizeConfig.card,
          sizeConfig.gap,

          // Variant styles - subtle like Radix Themes
          context.variant === "surface" && [
            "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900",
            "hover:border-gray-300 hover:bg-gray-50 dark:hover:border-gray-700 dark:hover:bg-gray-800/50",
          ],
          context.variant === "outline" && [
            "border-gray-200 bg-transparent dark:border-gray-800",
            "hover:border-gray-300 dark:hover:border-gray-700",
          ],

          // Color styles for checked state (applied via data attribute)
          colorStyles[context.color],

          // Disabled state
          isDisabled && "cursor-not-allowed opacity-50 hover:border-gray-200 hover:bg-white",

          className,
        )}
        data-disabled={isDisabled || undefined}
        {...props}
      >
        <CheckboxPrimitive.Root
          id={id}
          name={value}
          value={value}
          disabled={isDisabled}
          className={cn(
            "peer inline-flex shrink-0 items-center justify-center rounded",
            "border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900",
            "transition-all duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1",
            "data-[checked]:text-white data-[checked]:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            sizeConfig.checkbox,
            checkboxColorStyles[context.color],
          )}
        >
          <CheckboxPrimitive.Indicator
            className={cn(
              "flex items-center justify-center text-inherit",
              sizeConfig.checkIcon,
            )}
          >
            <Check className="h-full w-full stroke-current" strokeWidth={3} />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        <div className={cn("flex flex-1 flex-col", sizeConfig.text)}>
          {children}
        </div>
      </label>
    );
  },
);

CheckboxCardsItem.displayName = "CheckboxCards.Item";

// Export compound component
export const CheckboxCards = {
  Root: CheckboxCardsRoot,
  Item: CheckboxCardsItem,
};

export type { CheckboxCardsRootProps as CheckboxCardsProps };
