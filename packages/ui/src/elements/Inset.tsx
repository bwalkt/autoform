"use client";

import * as React from "react";
import { cn } from "../lib/utils";

// Side configurations
type Side = "all" | "x" | "y" | "top" | "right" | "bottom" | "left";

// Padding configurations
type Padding = "current" | "0" | "1" | "2" | "3" | "4" | "5" | "6";

const paddingStyles: Record<Padding, string> = {
  current: "",
  "0": "p-0",
  "1": "p-1",
  "2": "p-2",
  "3": "p-3",
  "4": "p-4",
  "5": "p-5",
  "6": "p-6",
};

export interface InsetProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which sides to clip */
  side?: Side;
  /** Clip padding (negative margin) */
  clip?: Padding;
  /** Content padding */
  p?: Padding;
  /** Horizontal padding */
  px?: Padding;
  /** Vertical padding */
  py?: Padding;
  /** Padding top */
  pt?: Padding;
  /** Padding right */
  pr?: Padding;
  /** Padding bottom */
  pb?: Padding;
  /** Padding left */
  pl?: Padding;
}

const Inset = React.forwardRef<HTMLDivElement, InsetProps>(
  (
    {
      side = "all",
      clip = "current",
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
      className,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    // Calculate negative margins based on side
    const marginClasses = cn(
      // All sides
      side === "all" && "-m-[--inset-padding]",
      // X axis
      side === "x" && "-mx-[--inset-padding]",
      // Y axis
      side === "y" && "-my-[--inset-padding]",
      // Individual sides
      side === "top" && "-mt-[--inset-padding]",
      side === "right" && "-mr-[--inset-padding]",
      side === "bottom" && "-mb-[--inset-padding]",
      side === "left" && "-ml-[--inset-padding]",
    );

    // Calculate padding classes
    const paddingClasses = cn(
      p && paddingStyles[p],
      px && `px-${px}`,
      py && `py-${py}`,
      pt && `pt-${pt}`,
      pr && `pr-${pr}`,
      pb && `pb-${pb}`,
      pl && `pl-${pl}`,
    );

    return (
      <div
        ref={ref}
        className={cn(marginClasses, paddingClasses, className)}
        style={{
          ...style,
          // Use CSS variable for the inset padding
          // "current" inherits from parent, numeric values map to rem (e.g., "4" = 1rem)
          "--inset-padding": clip === "current" ? "inherit" : `${parseInt(clip, 10) * 0.25}rem`,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Inset.displayName = "Inset";

export { Inset };
