"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
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

// Display mapping for Section (limited to none/initial)
const sectionDisplayMap: Record<SectionDisplay, string> = {
  "none": "hidden",
  "initial": "block",
};

// Generate responsive size classes
function getSectionSizeClasses(sizeProp: Responsive<SectionSize> | undefined): string {
  if (!sizeProp) return sectionSizeClasses["3"]; // default
  if (typeof sizeProp === "string") return sectionSizeClasses[sizeProp];

  const classes: string[] = [];
  if (sizeProp.initial) classes.push(sectionSizeClasses[sizeProp.initial]);
  if (sizeProp.xs) classes.push(`xs:${sectionSizeClasses[sizeProp.xs]}`);
  if (sizeProp.sm) classes.push(`sm:${sectionSizeClasses[sizeProp.sm]}`);
  if (sizeProp.md) classes.push(`md:${sectionSizeClasses[sizeProp.md]}`);
  if (sizeProp.lg) classes.push(`lg:${sectionSizeClasses[sizeProp.lg]}`);
  if (sizeProp.xl) classes.push(`xl:${sectionSizeClasses[sizeProp.xl]}`);
  return classes.join(" ");
}

// Generate responsive display classes
function getSectionDisplayClasses(displayProp: Responsive<SectionDisplay> | undefined): string {
  if (!displayProp) return "";
  if (typeof displayProp === "string") return sectionDisplayMap[displayProp];

  const classes: string[] = [];
  if (displayProp.initial) classes.push(sectionDisplayMap[displayProp.initial]);
  if (displayProp.xs) classes.push(`xs:${sectionDisplayMap[displayProp.xs]}`);
  if (displayProp.sm) classes.push(`sm:${sectionDisplayMap[displayProp.sm]}`);
  if (displayProp.md) classes.push(`md:${sectionDisplayMap[displayProp.md]}`);
  if (displayProp.lg) classes.push(`lg:${sectionDisplayMap[displayProp.lg]}`);
  if (displayProp.xl) classes.push(`xl:${sectionDisplayMap[displayProp.xl]}`);
  return classes.join(" ");
}

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

    // Only apply default size padding if py/p/pt/pb are not specified
    const hasPaddingOverride = py !== undefined || p !== undefined || pt !== undefined || pb !== undefined;

    const classes = cn(
      "rt-Section",
      "box-border",
      getSectionDisplayClasses(display),
      !hasPaddingOverride && getSectionSizeClasses(size),
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
