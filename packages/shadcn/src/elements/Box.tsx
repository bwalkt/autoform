"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import type {
  Display,
  Position,
  Overflow,
  Spacing,
  Responsive,
} from "./tokens";

// Spacing scale mapping to Tailwind values
const spacingScale: Record<string, string> = {
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

// Helper to convert responsive prop to Tailwind classes
function getResponsiveClasses<T extends string>(
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

// Helper to get spacing classes
function getSpacingClasses(
  prop: Responsive<Spacing> | undefined,
  prefix: string,
): string {
  return getResponsiveClasses(prop, prefix, spacingScale);
}

export interface BoxOwnProps {
  /** Render as a different element */
  as?: "div" | "span";
  /** Merge props onto child element */
  asChild?: boolean;

  // Display
  display?: Responsive<Display>;

  // Position
  position?: Responsive<Position>;
  inset?: Responsive<Spacing>;
  top?: Responsive<Spacing>;
  right?: Responsive<Spacing>;
  bottom?: Responsive<Spacing>;
  left?: Responsive<Spacing>;

  // Sizing
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;

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

  // Overflow
  overflow?: Responsive<Overflow>;
  overflowX?: Responsive<Overflow>;
  overflowY?: Responsive<Overflow>;

  // Flex item props
  flexGrow?: Responsive<"0" | "1">;
  flexShrink?: Responsive<"0" | "1">;
  flexBasis?: string;
}

type BoxDivProps = BoxOwnProps & Omit<React.ComponentPropsWithoutRef<"div">, keyof BoxOwnProps>;
type BoxSpanProps = BoxOwnProps & { as: "span" } & Omit<React.ComponentPropsWithoutRef<"span">, keyof BoxOwnProps>;
export type BoxProps = BoxDivProps | BoxSpanProps;

// Simple Slot implementation for asChild
function Slot({
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

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      as: Tag = "div",
      asChild = false,
      className,
      style,
      // Display
      display,
      // Position
      position,
      inset,
      top,
      right,
      bottom,
      left,
      // Sizing
      width,
      minWidth,
      maxWidth,
      height,
      minHeight,
      maxHeight,
      // Padding
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
      // Margin
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      // Overflow
      overflow,
      overflowX,
      overflowY,
      // Flex
      flexGrow,
      flexShrink,
      flexBasis,
      children,
      ...restProps
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : Tag;

    // Build className from props
    const classes = cn(
      "box-border",
      // Display
      getResponsiveClasses(display, ""),
      // Position
      getResponsiveClasses(position, ""),
      // Inset/position values
      getSpacingClasses(inset, "inset"),
      getSpacingClasses(top, "top"),
      getSpacingClasses(right, "right"),
      getSpacingClasses(bottom, "bottom"),
      getSpacingClasses(left, "left"),
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
      // Overflow
      getResponsiveClasses(overflow, "overflow"),
      getResponsiveClasses(overflowX, "overflow-x"),
      getResponsiveClasses(overflowY, "overflow-y"),
      // Flex
      getResponsiveClasses(flexGrow, "grow"),
      getResponsiveClasses(flexShrink, "shrink"),
      className,
    );

    // Build inline styles for non-token values
    const inlineStyles: React.CSSProperties = {
      ...style,
      ...(width && { width }),
      ...(minWidth && { minWidth }),
      ...(maxWidth && { maxWidth }),
      ...(height && { height }),
      ...(minHeight && { minHeight }),
      ...(maxHeight && { maxHeight }),
      ...(flexBasis && { flexBasis }),
    };

    return (
      <Comp
        ref={ref}
        data-slot="box"
        className={classes}
        style={Object.keys(inlineStyles).length > 0 ? inlineStyles : undefined}
        {...restProps}
      >
        {children}
      </Comp>
    );
  },
);

Box.displayName = "Box";
