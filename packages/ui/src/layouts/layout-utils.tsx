"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import type {
  Responsive,
  Spacing,
  Display,
  Position,
  Overflow,
  FlexDirection,
  FlexWrap,
  AlignItems,
  JustifyContent,
} from "../elements/tokens";

// Re-export shared types for convenience
export type {
  Responsive,
  Spacing,
  Display,
  Position,
  Overflow,
  FlexDirection,
  FlexWrap,
  AlignItems,
  JustifyContent,
};

// ============================================================================
// Layout-specific Types
// ============================================================================

// Grid types
export type GridFlow = "row" | "column" | "dense" | "row-dense" | "column-dense";

// Container types
export type ContainerSize = "1" | "2" | "3" | "4";
export type ContainerAlign = "left" | "center" | "right";

// Section types
export type SectionSize = "1" | "2" | "3" | "4";

// ============================================================================
// Spacing Scale Mapping
// ============================================================================

export const spacingScale: Record<Spacing, string> = {
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "8",
  "8": "10",
  "9": "12",
};

// Gap scale (can use larger values)
export const gapScale: Record<string, string> = {
  ...spacingScale,
};

// ============================================================================
// Responsive Class Helpers
// ============================================================================

export function getResponsiveClasses<T extends string>(
  prop: Responsive<T> | undefined,
  prefix: string,
  valueMap?: Record<string, string>,
): string {
  if (prop === undefined) return "";

  const mapValue = (val: T) => (valueMap ? valueMap[val] || val : val);

  if (typeof prop === "string") {
    return `${prefix}-${mapValue(prop)}`;
  }

  const classes: string[] = [];
  if (prop.initial) classes.push(`${prefix}-${mapValue(prop.initial)}`);
  if (prop.xs) classes.push(`xs:${prefix}-${mapValue(prop.xs)}`);
  if (prop.sm) classes.push(`sm:${prefix}-${mapValue(prop.sm)}`);
  if (prop.md) classes.push(`md:${prefix}-${mapValue(prop.md)}`);
  if (prop.lg) classes.push(`lg:${prefix}-${mapValue(prop.lg)}`);
  if (prop.xl) classes.push(`xl:${prefix}-${mapValue(prop.xl)}`);

  return classes.join(" ");
}

export function getSpacingClasses(
  prop: Responsive<Spacing> | undefined,
  prefix: string,
): string {
  return getResponsiveClasses(prop, prefix, spacingScale);
}

export function getGapClasses(
  prop: Responsive<Spacing> | undefined,
  prefix: string,
): string {
  return getResponsiveClasses(prop, prefix, gapScale);
}

// Display mapping
const displayMap: Record<Display, string> = {
  "none": "hidden",
  "inline": "inline",
  "inline-block": "inline-block",
  "block": "block",
  "flex": "flex",
  "inline-flex": "inline-flex",
  "grid": "grid",
  "inline-grid": "inline-grid",
  "contents": "contents",
};

export function getDisplayClasses(prop: Responsive<Display> | undefined): string {
  if (prop === undefined) return "";

  if (typeof prop === "string") {
    return displayMap[prop] || "";
  }

  const classes: string[] = [];
  if (prop.initial) classes.push(displayMap[prop.initial]);
  if (prop.xs) classes.push(`xs:${displayMap[prop.xs]}`);
  if (prop.sm) classes.push(`sm:${displayMap[prop.sm]}`);
  if (prop.md) classes.push(`md:${displayMap[prop.md]}`);
  if (prop.lg) classes.push(`lg:${displayMap[prop.lg]}`);
  if (prop.xl) classes.push(`xl:${displayMap[prop.xl]}`);

  return classes.join(" ");
}

// Position mapping (no prefix needed - Tailwind uses bare class names)
const positionMap: Record<Position, string> = {
  "static": "static",
  "relative": "relative",
  "absolute": "absolute",
  "fixed": "fixed",
  "sticky": "sticky",
};

export function getPositionClasses(prop: Responsive<Position> | undefined): string {
  if (prop === undefined) return "";

  if (typeof prop === "string") {
    return positionMap[prop] || "";
  }

  const classes: string[] = [];
  if (prop.initial) classes.push(positionMap[prop.initial]);
  if (prop.xs) classes.push(`xs:${positionMap[prop.xs]}`);
  if (prop.sm) classes.push(`sm:${positionMap[prop.sm]}`);
  if (prop.md) classes.push(`md:${positionMap[prop.md]}`);
  if (prop.lg) classes.push(`lg:${positionMap[prop.lg]}`);
  if (prop.xl) classes.push(`xl:${positionMap[prop.xl]}`);

  return classes.join(" ");
}

// ============================================================================
// Flex Class Helpers
// ============================================================================

const flexDirectionMap: Record<FlexDirection, string> = {
  "row": "flex-row",
  "row-reverse": "flex-row-reverse",
  "column": "flex-col",
  "column-reverse": "flex-col-reverse",
};

const flexWrapMap: Record<FlexWrap, string> = {
  "nowrap": "flex-nowrap",
  "wrap": "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
};

const alignItemsMap: Record<AlignItems, string> = {
  "start": "items-start",
  "center": "items-center",
  "end": "items-end",
  "baseline": "items-baseline",
  "stretch": "items-stretch",
};

const justifyContentMap: Record<JustifyContent, string> = {
  "start": "justify-start",
  "center": "justify-center",
  "end": "justify-end",
  "between": "justify-between",
  "around": "justify-around",
  "evenly": "justify-evenly",
};

export function getFlexDirectionClasses(prop: Responsive<FlexDirection> | undefined): string {
  if (prop === undefined) return "";
  if (typeof prop === "string") return flexDirectionMap[prop];

  const classes: string[] = [];
  if (prop.initial) classes.push(flexDirectionMap[prop.initial]);
  if (prop.xs) classes.push(`xs:${flexDirectionMap[prop.xs]}`);
  if (prop.sm) classes.push(`sm:${flexDirectionMap[prop.sm]}`);
  if (prop.md) classes.push(`md:${flexDirectionMap[prop.md]}`);
  if (prop.lg) classes.push(`lg:${flexDirectionMap[prop.lg]}`);
  if (prop.xl) classes.push(`xl:${flexDirectionMap[prop.xl]}`);
  return classes.join(" ");
}

export function getFlexWrapClasses(prop: Responsive<FlexWrap> | undefined): string {
  if (prop === undefined) return "";
  if (typeof prop === "string") return flexWrapMap[prop];

  const classes: string[] = [];
  if (prop.initial) classes.push(flexWrapMap[prop.initial]);
  if (prop.xs) classes.push(`xs:${flexWrapMap[prop.xs]}`);
  if (prop.sm) classes.push(`sm:${flexWrapMap[prop.sm]}`);
  if (prop.md) classes.push(`md:${flexWrapMap[prop.md]}`);
  if (prop.lg) classes.push(`lg:${flexWrapMap[prop.lg]}`);
  if (prop.xl) classes.push(`xl:${flexWrapMap[prop.xl]}`);
  return classes.join(" ");
}

export function getAlignItemsClasses(prop: Responsive<AlignItems> | undefined): string {
  if (prop === undefined) return "";
  if (typeof prop === "string") return alignItemsMap[prop];

  const classes: string[] = [];
  if (prop.initial) classes.push(alignItemsMap[prop.initial]);
  if (prop.xs) classes.push(`xs:${alignItemsMap[prop.xs]}`);
  if (prop.sm) classes.push(`sm:${alignItemsMap[prop.sm]}`);
  if (prop.md) classes.push(`md:${alignItemsMap[prop.md]}`);
  if (prop.lg) classes.push(`lg:${alignItemsMap[prop.lg]}`);
  if (prop.xl) classes.push(`xl:${alignItemsMap[prop.xl]}`);
  return classes.join(" ");
}

export function getJustifyContentClasses(prop: Responsive<JustifyContent> | undefined): string {
  if (prop === undefined) return "";
  if (typeof prop === "string") return justifyContentMap[prop];

  const classes: string[] = [];
  if (prop.initial) classes.push(justifyContentMap[prop.initial]);
  if (prop.xs) classes.push(`xs:${justifyContentMap[prop.xs]}`);
  if (prop.sm) classes.push(`sm:${justifyContentMap[prop.sm]}`);
  if (prop.md) classes.push(`md:${justifyContentMap[prop.md]}`);
  if (prop.lg) classes.push(`lg:${justifyContentMap[prop.lg]}`);
  if (prop.xl) classes.push(`xl:${justifyContentMap[prop.xl]}`);
  return classes.join(" ");
}

// Flex grow/shrink mapping (Tailwind uses grow/grow-0, not grow-1/grow-0)
const flexGrowMap: Record<"0" | "1", string> = {
  "0": "grow-0",
  "1": "grow",
};

const flexShrinkMap: Record<"0" | "1", string> = {
  "0": "shrink-0",
  "1": "shrink",
};

export function getFlexGrowClasses(prop: Responsive<"0" | "1"> | undefined): string {
  if (prop === undefined) return "";
  if (typeof prop === "string") return flexGrowMap[prop];

  const classes: string[] = [];
  if (prop.initial) classes.push(flexGrowMap[prop.initial]);
  if (prop.xs) classes.push(`xs:${flexGrowMap[prop.xs]}`);
  if (prop.sm) classes.push(`sm:${flexGrowMap[prop.sm]}`);
  if (prop.md) classes.push(`md:${flexGrowMap[prop.md]}`);
  if (prop.lg) classes.push(`lg:${flexGrowMap[prop.lg]}`);
  if (prop.xl) classes.push(`xl:${flexGrowMap[prop.xl]}`);
  return classes.join(" ");
}

export function getFlexShrinkClasses(prop: Responsive<"0" | "1"> | undefined): string {
  if (prop === undefined) return "";
  if (typeof prop === "string") return flexShrinkMap[prop];

  const classes: string[] = [];
  if (prop.initial) classes.push(flexShrinkMap[prop.initial]);
  if (prop.xs) classes.push(`xs:${flexShrinkMap[prop.xs]}`);
  if (prop.sm) classes.push(`sm:${flexShrinkMap[prop.sm]}`);
  if (prop.md) classes.push(`md:${flexShrinkMap[prop.md]}`);
  if (prop.lg) classes.push(`lg:${flexShrinkMap[prop.lg]}`);
  if (prop.xl) classes.push(`xl:${flexShrinkMap[prop.xl]}`);
  return classes.join(" ");
}

// ============================================================================
// Grid Class Helpers
// ============================================================================

const gridFlowMap: Record<GridFlow, string> = {
  "row": "grid-flow-row",
  "column": "grid-flow-col",
  "dense": "grid-flow-dense",
  "row-dense": "grid-flow-row-dense",
  "column-dense": "grid-flow-col-dense",
};

export function getGridFlowClasses(prop: Responsive<GridFlow> | undefined): string {
  if (prop === undefined) return "";
  if (typeof prop === "string") return gridFlowMap[prop];

  const classes: string[] = [];
  if (prop.initial) classes.push(gridFlowMap[prop.initial]);
  if (prop.xs) classes.push(`xs:${gridFlowMap[prop.xs]}`);
  if (prop.sm) classes.push(`sm:${gridFlowMap[prop.sm]}`);
  if (prop.md) classes.push(`md:${gridFlowMap[prop.md]}`);
  if (prop.lg) classes.push(`lg:${gridFlowMap[prop.lg]}`);
  if (prop.xl) classes.push(`xl:${gridFlowMap[prop.xl]}`);
  return classes.join(" ");
}

// Grid columns - map to Tailwind grid-cols-{n} classes
const gridColumnsMap: Record<string, string> = {
  "1": "grid-cols-1",
  "2": "grid-cols-2",
  "3": "grid-cols-3",
  "4": "grid-cols-4",
  "5": "grid-cols-5",
  "6": "grid-cols-6",
  "7": "grid-cols-7",
  "8": "grid-cols-8",
  "9": "grid-cols-9",
  "10": "grid-cols-10",
  "11": "grid-cols-11",
  "12": "grid-cols-12",
  "none": "grid-cols-none",
};

export type GridColumns = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "none";

export function getGridColumnsClasses(prop: Responsive<GridColumns | string> | undefined): string {
  if (prop === undefined) return "";

  if (typeof prop === "string") {
    // If it's a known column count, use the class
    if (gridColumnsMap[prop]) {
      return gridColumnsMap[prop];
    }
    // Otherwise return empty (will fall back to style)
    return "";
  }

  const classes: string[] = [];
  if (prop.initial && gridColumnsMap[prop.initial]) {
    classes.push(gridColumnsMap[prop.initial]);
  }
  if (prop.xs && gridColumnsMap[prop.xs]) {
    classes.push(`xs:${gridColumnsMap[prop.xs]}`);
  }
  if (prop.sm && gridColumnsMap[prop.sm]) {
    classes.push(`sm:${gridColumnsMap[prop.sm]}`);
  }
  if (prop.md && gridColumnsMap[prop.md]) {
    classes.push(`md:${gridColumnsMap[prop.md]}`);
  }
  if (prop.lg && gridColumnsMap[prop.lg]) {
    classes.push(`lg:${gridColumnsMap[prop.lg]}`);
  }
  if (prop.xl && gridColumnsMap[prop.xl]) {
    classes.push(`xl:${gridColumnsMap[prop.xl]}`);
  }

  return classes.join(" ");
}

// Check if columns value can be handled by classes (is numeric preset)
export function canUseGridColumnsClasses(prop: Responsive<string> | undefined): boolean {
  if (prop === undefined) return false;

  if (typeof prop === "string") {
    return !!gridColumnsMap[prop];
  }

  // For responsive objects, check if all values are known
  return Object.values(prop).every(val => !val || gridColumnsMap[val]);
}

// Grid columns/rows - returns style object for custom values
export function getGridColumnsStyle(columns: Responsive<string> | undefined): React.CSSProperties {
  if (columns === undefined) return {};

  if (typeof columns === "string") {
    // Check if it's a pure number (strict check to avoid parsing "200px 1fr" as 200)
    if (/^\d+$/.test(columns)) {
      const num = Number(columns);
      return { gridTemplateColumns: `repeat(${num}, minmax(0, 1fr))` };
    }
    return { gridTemplateColumns: columns };
  }

  // For responsive, we'll use CSS variables approach
  // This is simplified - in production you'd use CSS custom properties with media queries
  const initial = columns.initial;
  if (initial) {
    if (/^\d+$/.test(initial)) {
      const num = Number(initial);
      return { gridTemplateColumns: `repeat(${num}, minmax(0, 1fr))` };
    }
    return { gridTemplateColumns: initial };
  }

  return {};
}

export function getGridRowsStyle(rows: Responsive<string> | undefined): React.CSSProperties {
  if (rows === undefined) return {};

  if (typeof rows === "string") {
    // Check if it's a pure number (strict check to avoid parsing "200px 1fr" as 200)
    if (/^\d+$/.test(rows)) {
      const num = Number(rows);
      return { gridTemplateRows: `repeat(${num}, minmax(0, 1fr))` };
    }
    return { gridTemplateRows: rows };
  }

  const initial = rows.initial;
  if (initial) {
    if (/^\d+$/.test(initial)) {
      const num = Number(initial);
      return { gridTemplateRows: `repeat(${num}, minmax(0, 1fr))` };
    }
    return { gridTemplateRows: initial };
  }

  return {};
}

// ============================================================================
// Slot Component
// ============================================================================

export function Slot({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>) {
  if (React.isValidElement<React.HTMLAttributes<HTMLElement>>(children)) {
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      className: cn(props.className, children.props.className),
    });
  }
  return <>{children}</>;
}

// ============================================================================
// Shared Layout Props
// ============================================================================

export interface SharedLayoutProps {
  // Padding
  p?: Responsive<Spacing>;
  px?: Responsive<Spacing>;
  py?: Responsive<Spacing>;
  pt?: Responsive<Spacing>;
  pr?: Responsive<Spacing>;
  pb?: Responsive<Spacing>;
  pl?: Responsive<Spacing>;

  // Margin
  m?: Responsive<Spacing>;
  mx?: Responsive<Spacing>;
  my?: Responsive<Spacing>;
  mt?: Responsive<Spacing>;
  mr?: Responsive<Spacing>;
  mb?: Responsive<Spacing>;
  ml?: Responsive<Spacing>;

  // Sizing
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;

  // Position
  position?: Responsive<Position>;
  inset?: Responsive<Spacing>;
  top?: Responsive<Spacing>;
  right?: Responsive<Spacing>;
  bottom?: Responsive<Spacing>;
  left?: Responsive<Spacing>;

  // Overflow
  overflow?: Responsive<Overflow>;
  overflowX?: Responsive<Overflow>;
  overflowY?: Responsive<Overflow>;

  // Flex item props
  flexGrow?: Responsive<"0" | "1">;
  flexShrink?: Responsive<"0" | "1">;
  flexBasis?: string;

  // Grid item props
  gridArea?: string;
  gridColumn?: string;
  gridColumnStart?: string;
  gridColumnEnd?: string;
  gridRow?: string;
  gridRowStart?: string;
  gridRowEnd?: string;
}

export function getSharedLayoutClasses(props: SharedLayoutProps): string {
  const {
    p, px, py, pt, pr, pb, pl,
    m, mx, my, mt, mr, mb, ml,
    position,
    inset, top, right, bottom, left,
    overflow, overflowX, overflowY,
    flexGrow, flexShrink,
  } = props;

  return cn(
    // Padding
    getSpacingClasses(p, "p"),
    getSpacingClasses(px, "px"),
    getSpacingClasses(py, "py"),
    getSpacingClasses(pt, "pt"),
    getSpacingClasses(pr, "pr"),
    getSpacingClasses(pb, "pb"),
    getSpacingClasses(pl, "pl"),
    // Margin
    getSpacingClasses(m, "m"),
    getSpacingClasses(mx, "mx"),
    getSpacingClasses(my, "my"),
    getSpacingClasses(mt, "mt"),
    getSpacingClasses(mr, "mr"),
    getSpacingClasses(mb, "mb"),
    getSpacingClasses(ml, "ml"),
    // Position
    getPositionClasses(position),
    getSpacingClasses(inset, "inset"),
    getSpacingClasses(top, "top"),
    getSpacingClasses(right, "right"),
    getSpacingClasses(bottom, "bottom"),
    getSpacingClasses(left, "left"),
    // Overflow
    getResponsiveClasses(overflow, "overflow"),
    getResponsiveClasses(overflowX, "overflow-x"),
    getResponsiveClasses(overflowY, "overflow-y"),
    // Flex
    getFlexGrowClasses(flexGrow),
    getFlexShrinkClasses(flexShrink),
  );
}

export function getSharedLayoutStyles(props: SharedLayoutProps): React.CSSProperties {
  const {
    width, minWidth, maxWidth,
    height, minHeight, maxHeight,
    flexBasis,
    gridArea, gridColumn, gridColumnStart, gridColumnEnd,
    gridRow, gridRowStart, gridRowEnd,
  } = props;

  return {
    ...(width && { width }),
    ...(minWidth && { minWidth }),
    ...(maxWidth && { maxWidth }),
    ...(height && { height }),
    ...(minHeight && { minHeight }),
    ...(maxHeight && { maxHeight }),
    ...(flexBasis && { flexBasis }),
    ...(gridArea && { gridArea }),
    ...(gridColumn && { gridColumn }),
    ...(gridColumnStart && { gridColumnStart }),
    ...(gridColumnEnd && { gridColumnEnd }),
    ...(gridRow && { gridRow }),
    ...(gridRowStart && { gridRowStart }),
    ...(gridRowEnd && { gridRowEnd }),
  };
}
