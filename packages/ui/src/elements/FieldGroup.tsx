"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { FieldGroupProvider } from "./FieldGroupContext";
import { Separator } from "./Separator";
import { Text, Heading } from "../typography";
import type { Size, Spacing, FieldGroupLayout, GridColumns, AlignItems, Responsive } from "./tokens";
import type { TextFieldVariant } from "./TextField";

// Gap mapping to Tailwind classes
const gapClasses: Record<Spacing, string> = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "5": "gap-5",
  "6": "gap-6",
  "7": "gap-7",
  "8": "gap-8",
  "9": "gap-9",
};

// ============================================================================
// FieldGroup.Section Component
// ============================================================================

interface FieldGroupSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Whether to show separator before section */
  separator?: boolean;
}

const FieldGroupSection = React.forwardRef<HTMLDivElement, FieldGroupSectionProps>(
  ({ title, description, separator = true, className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col", className)} {...props}>
      {separator && <Separator className="my-6" />}
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <Heading size="4" weight="medium">
              {title}
            </Heading>
          )}
          {description && (
            <Text size="2" className="text-muted-foreground mt-1">
              {description}
            </Text>
          )}
        </div>
      )}
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  )
);

FieldGroupSection.displayName = "FieldGroup.Section";

// ============================================================================
// FieldGroup.Row Component (for side-labels layout)
// ============================================================================

interface FieldGroupRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Row label */
  label?: string;
  /** Row description */
  description?: string;
}

const FieldGroupRow = React.forwardRef<HTMLDivElement, FieldGroupRowProps>(
  ({ label, description, className, children, ...props }, ref) => (
    <>
      <div ref={ref} className="py-1" {...props}>
        {label && (
          <Text weight="medium" size="2">
            {label}
          </Text>
        )}
        {description && (
          <Text size="1" className="text-muted-foreground mt-1">
            {description}
          </Text>
        )}
      </div>
      <div className={cn("flex flex-col gap-4", className)}>{children}</div>
    </>
  )
);

FieldGroupRow.displayName = "FieldGroup.Row";

// ============================================================================
// Main FieldGroup Component
// ============================================================================

export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size to apply to all child form fields */
  size?: Size;
  /** Variant to apply to all child form fields */
  variant?: TextFieldVariant;
  /** Gap between child elements */
  gap?: Spacing;
  /** Layout mode */
  layout?: FieldGroupLayout;
  /** Grid columns (for grid layout) */
  columns?: Responsive<GridColumns>;
  /** Alignment for inline layout */
  align?: AlignItems;
  /** Children elements */
  children: React.ReactNode;
}

const FieldGroupRoot = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  (
    {
      size,
      variant,
      gap = "4",
      layout = "stacked",
      columns = "2",
      align,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    // Get column count for grid
    const colCount = typeof columns === "string" ? columns : columns.initial || "2";

    // Build classes and styles based on layout
    let layoutClassName = "";
    let layoutStyle: React.CSSProperties = {};

    switch (layout) {
      case "stacked":
        layoutClassName = cn("flex flex-col", gapClasses[gap]);
        break;
      case "inline":
        layoutClassName = cn(
          "flex flex-row flex-wrap",
          align === "start" ? "items-start" :
          align === "center" ? "items-center" :
          align === "baseline" ? "items-baseline" :
          align === "stretch" ? "items-stretch" :
          "items-end",
          gapClasses[gap]
        );
        break;
      case "grid":
        layoutClassName = cn("grid", gapClasses[gap]);
        layoutStyle = { gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` };
        break;
      case "side-labels":
        layoutClassName = "grid gap-x-8 gap-y-6";
        layoutStyle = { gridTemplateColumns: "1fr 2fr" };
        break;
      case "sectioned":
        layoutClassName = "flex flex-col";
        break;
      default:
        layoutClassName = cn("flex flex-col", gapClasses[gap]);
    }

    return (
      <FieldGroupProvider value={{ size, variant, layout }}>
        <div
          ref={ref}
          className={cn(layoutClassName, className)}
          style={{ ...layoutStyle, ...style }}
          {...props}
        >
          {children}
        </div>
      </FieldGroupProvider>
    );
  }
);

FieldGroupRoot.displayName = "FieldGroup";

// ============================================================================
// Compound Component Export
// ============================================================================

export const FieldGroup = Object.assign(FieldGroupRoot, {
  Section: FieldGroupSection,
  Row: FieldGroupRow,
});

// Export sub-component types
export type { FieldGroupSectionProps, FieldGroupRowProps };
