"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { ChevronDown, CheckIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { getElementStyles } from "./utils";
import type { Variant, Color, Radius, Size } from "./tokens";

export interface SelectProps {
  size?: Size;
  variant?: Variant;
  color?: Color;
  radius?: Radius;
  error?: boolean;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Select = React.forwardRef<
  HTMLButtonElement,
  SelectProps
>(
  (
    {
      size = "2",
      variant = "surface",
      color,
      radius = "medium",
      error = false,
      placeholder = "Select...",
      value,
      onValueChange,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const resolvedSize = size || "2";
    const elementStyles = getElementStyles(
      resolvedSize,
      variant,
      color,
      radius,
    );

    return (
      <SelectPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          ref={ref}
          className={cn(
            "inline-flex items-center justify-between w-full outline-none transition-all duration-150 ease-in-out",
            "h-[var(--element-height)]",
            "px-[var(--element-padding-x)] py-[var(--element-padding-y)]",
            "text-[var(--element-font-size)] leading-[var(--element-line-height)]",
            "rounded-[var(--element-border-radius)]",
            "text-[var(--color-text)]",

            // Variant-specific styles
            variant === "classic" && [
              "border border-[var(--color-border)]",
              "bg-[var(--color-background)]",
              "focus:border-[var(--color-primary)]",
              "focus:ring-2 focus:ring-[var(--color-primary-alpha)]",
            ],
            variant === "surface" && [
              "border border-[var(--color-border-subtle)]",
              "bg-[var(--color-surface)]",
              "focus:border-[var(--color-primary)]",
              "focus:ring-2 focus:ring-[var(--color-primary-alpha)]",
            ],
            variant === "soft" && [
              "border-0",
              "bg-[var(--color-soft-background)]",
              "hover:bg-[var(--color-soft-background-hover)]",
              "focus:bg-[var(--color-soft-background-hover)]",
            ],

            // Error state
            error && [
              "border-red-500 focus:border-red-500",
              variant === "soft" && "bg-red-50",
            ],

            // Disabled state
            disabled && ["opacity-50 cursor-not-allowed"],
          )}
          style={elementStyles}
          {...props}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon
            render={<ChevronDown className="h-4 w-4 opacity-50 ml-2" />}
          />
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Positioner sideOffset={4} className="z-50">
            <SelectPrimitive.Popup
              className={cn(
                "relative min-w-[8rem] overflow-hidden rounded-md border bg-white text-popover-foreground shadow-md",
                "data-open:animate-in data-closed:animate-out",
                "data-closed:fade-out-0 data-open:fade-in-0",
                "data-closed:zoom-out-95 data-open:zoom-in-95",
                "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
                "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              )}
            >
              <SelectPrimitive.List className="p-1">
                {children}
              </SelectPrimitive.List>
            </SelectPrimitive.Popup>
          </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  },
);

Select.displayName = "Select";

export function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

SelectItem.displayName = "SelectItem";
