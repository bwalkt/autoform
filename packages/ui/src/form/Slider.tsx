"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "@/lib/utils";
import type { Size, Color, Radius } from "@/elements/tokens";
import { useFieldGroup } from "./FieldGroupContext";

// Size configurations
const sliderSizes = {
  "1": {
    track: "h-1",
    thumb: "h-3 w-3",
  },
  "2": {
    track: "h-1.5",
    thumb: "h-4 w-4",
  },
  "3": {
    track: "h-2",
    thumb: "h-5 w-5",
  },
  "4": {
    track: "h-3",
    thumb: "h-6 w-6",
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

// Color styles
const colorStyles: Record<Color, string> = {
  default: "bg-primary",
  primary: "bg-primary",
  neutral: "bg-gray-500 dark:bg-gray-400",
  info: "bg-blue-500",
  success: "bg-green-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
};

// Variant styles
type SliderVariant = "surface" | "classic" | "soft";

export interface SliderProps {
  /** Current value */
  value?: number[];
  /** Default value */
  defaultValue?: number[];
  /** Callback when value changes */
  onValueChange?: (value: number[]) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Size of the slider */
  size?: Size;
  /** Visual variant */
  variant?: SliderVariant;
  /** Color of the slider */
  color?: Color;
  /** Border radius */
  radius?: Radius;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Additional class names */
  className?: string;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      defaultValue = [0],
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      size: sizeProp,
      variant = "surface",
      color = "primary",
      radius = "full",
      disabled = false,
      orientation = "horizontal",
      className,
    },
    ref,
  ) => {
    const fieldGroup = useFieldGroup();
    const size = sizeProp ?? fieldGroup.size;
    const sizeConfig = sliderSizes[size];

    return (
      <SliderPrimitive.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        orientation={orientation}
        className={cn(
          "relative flex touch-none select-none items-center",
          orientation === "horizontal" && "w-full",
          orientation === "vertical" && "h-full flex-col",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
      >
        <SliderPrimitive.Track
          className={cn(
            "relative grow overflow-hidden",
            radiusStyles[radius],
            sizeConfig.track,
            orientation === "horizontal" && "w-full",
            orientation === "vertical" && "h-full",

            // Variant styles for track background
            variant === "surface" && "bg-gray-200 dark:bg-gray-700",
            variant === "classic" && "bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:border-gray-600",
            variant === "soft" && "bg-gray-100/50 dark:bg-gray-800/50",
          )}
        >
          <SliderPrimitive.Indicator
            className={cn(
              "absolute",
              radiusStyles[radius],
              colorStyles[color],
              orientation === "horizontal" && "h-full",
              orientation === "vertical" && "w-full bottom-0",
            )}
          />
        </SliderPrimitive.Track>
        {(value ?? defaultValue).map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className={cn(
              "block border-2 bg-background shadow transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-50",
              radiusStyles[radius],
              sizeConfig.thumb,
              color === "default" || color === "primary"
                ? "border-primary"
                : colorStyles[color].replace("bg-", "border-"),
            )}
          />
        ))}
      </SliderPrimitive.Root>
    );
  },
);

Slider.displayName = "Slider";

export { Slider };
