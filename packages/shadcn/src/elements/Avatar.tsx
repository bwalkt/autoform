"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import type { Size, Color, Radius } from "./tokens";

// Size configurations
const avatarSizes = {
  "1": "h-6 w-6 text-xs",
  "2": "h-8 w-8 text-sm",
  "3": "h-10 w-10 text-base",
  "4": "h-12 w-12 text-lg",
  "5": "h-16 w-16 text-xl",
  "6": "h-20 w-20 text-2xl",
};

type AvatarSize = Size | "5" | "6";

// Variant styles
type AvatarVariant = "solid" | "soft";

// Radius styles
const radiusStyles: Record<Radius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

// Color styles for fallback
const solidColorStyles: Record<Color, string> = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary text-primary-foreground",
  neutral: "bg-secondary text-secondary-foreground",
  info: "bg-blue-500 text-white",
  success: "bg-green-500 text-white",
  warning: "bg-amber-500 text-white",
  error: "bg-red-500 text-white",
};

const softColorStyles: Record<Color, string> = {
  default: "bg-muted/50 text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  neutral: "bg-muted text-muted-foreground",
  info: "bg-blue-500/10 text-blue-600",
  success: "bg-green-500/10 text-green-600",
  warning: "bg-amber-500/10 text-amber-600",
  error: "bg-red-500/10 text-red-600",
};

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Fallback text (usually initials) */
  fallback?: string;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Visual variant */
  variant?: AvatarVariant;
  /** Color for fallback */
  color?: Color;
  /** Border radius */
  radius?: Radius;
  /** Additional class names */
  className?: string;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt,
      fallback,
      size = "2",
      variant = "soft",
      color = "default",
      radius = "full",
      className,
      ...props
    },
    ref,
  ) => {
    const [hasError, setHasError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(!!src);

    const showImage = src && !hasError;
    const showFallback = !showImage || isLoading;

    // Get initials from fallback
    const initials = React.useMemo(() => {
      if (!fallback) return "";
      return fallback
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }, [fallback]);

    return (
      <span
        ref={ref}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
          avatarSizes[size],
          radiusStyles[radius],
          // Fallback colors
          showFallback && variant === "solid" && solidColorStyles[color],
          showFallback && variant === "soft" && softColorStyles[color],
          className,
        )}
        {...props}
      >
        {showImage && (
          <img
            src={src}
            alt={alt || fallback || "Avatar"}
            className={cn(
              "h-full w-full object-cover",
              isLoading && "opacity-0",
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
          />
        )}
        {showFallback && (
          <span className="flex items-center justify-center font-medium">
            {initials || (
              <svg
                className="h-[60%] w-[60%]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </span>
        )}
      </span>
    );
  },
);

Avatar.displayName = "Avatar";

// ============================================================================
// Avatar Group
// ============================================================================

export interface AvatarGroupProps {
  /** Maximum avatars to show before +N indicator */
  max?: number;
  /** Size of avatars */
  size?: AvatarSize;
  /** Additional class names */
  className?: string;
  /** Avatar children */
  children: React.ReactNode;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max, size = "2", className, children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = max ? Math.max(0, childrenArray.length - max) : 0;

    return (
      <div
        ref={ref}
        className={cn("flex -space-x-2", className)}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <span
            key={index}
            className="relative ring-2 ring-background rounded-full"
          >
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
              : child}
          </span>
        ))}
        {remainingCount > 0 && (
          <span
            className={cn(
              "relative inline-flex items-center justify-center ring-2 ring-background rounded-full",
              "bg-muted text-muted-foreground font-medium",
              avatarSizes[size],
            )}
          >
            +{remainingCount}
          </span>
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup };
