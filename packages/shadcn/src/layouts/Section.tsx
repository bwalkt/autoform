"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import {
  Slot,
  getSharedLayoutClasses,
  getSharedLayoutStyles,
  type Responsive,
  type SectionSize,
  type SharedLayoutProps,
} from "./layout-utils";

// ============================================================================
// Section Props
// ============================================================================

type SectionDisplay = "none" | "initial";

export interface SectionOwnProps extends SharedLayoutProps {
  /** Merge props onto child element */
  asChild?: boolean;
  /** CSS display property */
  display?: Responsive<SectionDisplay>;
  /** Vertical padding size */
  size?: Responsive<SectionSize>;
}

export type SectionProps = SectionOwnProps &
  Omit<React.ComponentPropsWithoutRef<"section">, keyof SectionOwnProps>;

// ============================================================================
// Section Size Values (vertical padding)
// ============================================================================

const sectionSizeClasses: Record<SectionSize, string> = {
  "1": "py-6",    // 24px
  "2": "py-10",   // 40px
  "3": "py-16",   // 64px
  "4": "py-24",   // 96px
};

// ============================================================================
// Section Component
// ============================================================================

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      asChild = false,
      className,
      style,
      // Section-specific props
      display,
      size = "3",
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
    const Comp = asChild ? Slot : "section";

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

    // Get resolved size value for default padding
    const resolvedSize = typeof size === "string" ? size : size.initial || "3";
    const sizeClass = sectionSizeClasses[resolvedSize];

    // Get display classes
    const getDisplayClass = (displayProp: Responsive<SectionDisplay> | undefined) => {
      if (!displayProp) return "";
      const displayValue = typeof displayProp === "string" ? displayProp : displayProp.initial;
      return displayValue === "none" ? "hidden" : "";
    };

    // Only apply default size padding if py/p/pt/pb are not specified
    const hasPaddingOverride = py !== undefined || p !== undefined || pt !== undefined || pb !== undefined;

    const classes = cn(
      "rt-Section",
      "box-border",
      getDisplayClass(display),
      !hasPaddingOverride && sizeClass,
      getSharedLayoutClasses(sharedLayoutProps),
      className,
    );

    const styles: React.CSSProperties = {
      ...getSharedLayoutStyles(sharedLayoutProps),
      ...style,
    };

    return (
      <Comp
        ref={ref as React.Ref<HTMLElement>}
        className={classes}
        style={Object.keys(styles).length > 0 ? styles : undefined}
        {...restProps}
      >
        {children}
      </Comp>
    );
  },
);

Section.displayName = "Section";
