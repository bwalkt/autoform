"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Whether to show loading animation */
  loading?: boolean;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ width, height, loading = true, className, style, children, ...props }, ref) => {
    if (!loading) {
      return <>{children}</>;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "animate-pulse rounded-md bg-muted",
          className,
        )}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          ...style,
        }}
        {...props}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";

// ============================================================================
// Skeleton Text - for text placeholders
// ============================================================================

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of lines */
  lines?: number;
  /** Gap between lines */
  gap?: "sm" | "md" | "lg";
  /** Whether to show loading animation */
  loading?: boolean;
}

const gapStyles = {
  sm: "gap-1",
  md: "gap-2",
  lg: "gap-3",
};

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, gap = "md", loading = true, className, children, ...props }, ref) => {
    if (!loading) {
      return <>{children}</>;
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col", gapStyles[gap], className)}
        {...props}
      >
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-4 animate-pulse rounded bg-muted",
              // Make last line shorter for a more natural look
              index === lines - 1 && "w-4/5",
            )}
          />
        ))}
      </div>
    );
  },
);

SkeletonText.displayName = "SkeletonText";

// ============================================================================
// Skeleton Avatar - for avatar placeholders
// ============================================================================

export interface SkeletonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the avatar */
  size?: "1" | "2" | "3" | "4" | "xl";
  /** Whether to show loading animation */
  loading?: boolean;
}

const avatarSizes = {
  "1": "h-6 w-6",
  "2": "h-8 w-8",
  "3": "h-10 w-10",
  "4": "h-12 w-12",
  xl: "h-16 w-16",
};

const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = "3", loading = true, className, children, ...props }, ref) => {
    if (!loading) {
      return <>{children}</>;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "animate-pulse rounded-full bg-muted",
          avatarSizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

SkeletonAvatar.displayName = "SkeletonAvatar";

export { Skeleton, SkeletonText, SkeletonAvatar };
