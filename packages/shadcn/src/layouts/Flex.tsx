"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import {
  Slot,
  getDisplayClasses,
  getFlexDirectionClasses,
  getFlexWrapClasses,
  getAlignItemsClasses,
  getJustifyContentClasses,
  getGapClasses,
  getSharedLayoutClasses,
  getSharedLayoutStyles,
  type Responsive,
  type Display,
  type FlexDirection,
  type FlexWrap,
  type AlignItems,
  type JustifyContent,
  type Spacing,
  type SharedLayoutProps,
} from "./layout-utils";

// ============================================================================
// Flex Props
// ============================================================================

type FlexDisplay = "none" | "flex" | "inline-flex";

export interface FlexOwnProps extends SharedLayoutProps {
  /** Render as a different element */
  as?: "div" | "span";
  /** Merge props onto child element */
  asChild?: boolean;
  /** CSS display property */
  display?: Responsive<FlexDisplay>;
  /** Flex direction */
  direction?: Responsive<FlexDirection>;
  /** Align items along the cross axis */
  align?: Responsive<AlignItems>;
  /** Justify content along the main axis */
  justify?: Responsive<JustifyContent>;
  /** Flex wrap behavior */
  wrap?: Responsive<FlexWrap>;
  /** Gap between items */
  gap?: Responsive<Spacing>;
  /** Horizontal gap between items */
  gapX?: Responsive<Spacing>;
  /** Vertical gap between items */
  gapY?: Responsive<Spacing>;
}

type FlexDivProps = FlexOwnProps &
  Omit<React.ComponentPropsWithoutRef<"div">, keyof FlexOwnProps>;
type FlexSpanProps = FlexOwnProps & { as: "span" } &
  Omit<React.ComponentPropsWithoutRef<"span">, keyof FlexOwnProps>;

export type FlexProps = FlexDivProps | FlexSpanProps;

// ============================================================================
// Flex Component
// ============================================================================

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      as: Tag = "div",
      asChild = false,
      className,
      style,
      // Flex-specific props
      display,
      direction,
      align,
      justify,
      wrap,
      gap,
      gapX,
      gapY,
      // Shared layout props
      p, px, py, pt, pr, pb, pl,
      m, mx, my, mt, mr, mb, ml,
      width, minWidth, maxWidth,
      height, minHeight, maxHeight,
      position,
      inset, top, right, bottom, left,
      overflow, overflowX, overflowY,
      flexGrow, flexShrink, flexBasis,
      gridArea, gridColumn, gridColumnStart, gridColumnEnd,
      gridRow, gridRowStart, gridRowEnd,
      children,
      ...restProps
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : Tag;

    const sharedLayoutProps: SharedLayoutProps = {
      p, px, py, pt, pr, pb, pl,
      m, mx, my, mt, mr, mb, ml,
      width, minWidth, maxWidth,
      height, minHeight, maxHeight,
      position,
      inset, top, right, bottom, left,
      overflow, overflowX, overflowY,
      flexGrow, flexShrink, flexBasis,
      gridArea, gridColumn, gridColumnStart, gridColumnEnd,
      gridRow, gridRowStart, gridRowEnd,
    };

    // Default to flex display if not specified
    const resolvedDisplay = display || "flex";

    const classes = cn(
      "rt-Flex",
      "box-border",
      getDisplayClasses(resolvedDisplay as Responsive<Display>),
      getFlexDirectionClasses(direction),
      getFlexWrapClasses(wrap),
      getAlignItemsClasses(align),
      getJustifyContentClasses(justify),
      getGapClasses(gap, "gap"),
      getGapClasses(gapX, "gap-x"),
      getGapClasses(gapY, "gap-y"),
      getSharedLayoutClasses(sharedLayoutProps),
      className,
    );

    const styles: React.CSSProperties = {
      ...getSharedLayoutStyles(sharedLayoutProps),
      ...style,
    };

    return (
      <Comp
        ref={ref}
        className={classes}
        style={Object.keys(styles).length > 0 ? styles : undefined}
        {...restProps}
      >
        {children}
      </Comp>
    );
  },
);

Flex.displayName = "Flex";
