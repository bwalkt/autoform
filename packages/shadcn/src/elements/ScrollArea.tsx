"use client";

import * as React from "react";
import { cn } from "../lib/utils";

// Size configurations for scrollbar
type ScrollbarSize = "none" | "1" | "2" | "3";

const scrollbarSizes: Record<ScrollbarSize, string> = {
  none: "scrollbar-none",
  "1": "scrollbar-thin",
  "2": "scrollbar",
  "3": "scrollbar-thick",
};

// Type configurations
type ScrollType = "auto" | "always" | "scroll" | "hover";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Type of scrollbar visibility */
  type?: ScrollType;
  /** Scrollbar size */
  scrollbars?: "vertical" | "horizontal" | "both";
  /** Size of the scrollbar */
  size?: ScrollbarSize;
  /** Scroll hiding behavior */
  scrollHideDelay?: number;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      type = "hover",
      scrollbars = "vertical",
      size = "2",
      className,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          // Scrollbar visibility by type
          type === "always" && "overflow-scroll",
          type === "auto" && "overflow-auto",
          type === "scroll" && "overflow-scroll",
          type === "hover" && "overflow-auto hover:overflow-scroll",

          // Scrollbar direction
          scrollbars === "vertical" && "overflow-x-hidden",
          scrollbars === "horizontal" && "overflow-y-hidden",

          // Scrollbar styling
          "scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground/50",
          scrollbarSizes[size],

          className,
        )}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
