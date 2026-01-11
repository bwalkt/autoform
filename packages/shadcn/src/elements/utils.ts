import {
  designTokens,
  type Size,
  type Variant,
  type Color,
  type Radius,
  type ResponsiveSize,
} from "./tokens";

export function getResponsiveSize(size: ResponsiveSize): string {
  if (typeof size === "string") {
    return size;
  }

  const breakpoints = {
    initial: size.initial || "md",
    xs: size.xs,
    sm: size.sm,
    md: size.md,
    lg: size.lg,
    xl: size.xl,
  };

  let classes = "";

  if (breakpoints.initial) {
    classes += ` size-${breakpoints.initial}`;
  }
  if (breakpoints.xs) {
    classes += ` xs:size-${breakpoints.xs}`;
  }
  if (breakpoints.sm) {
    classes += ` sm:size-${breakpoints.sm}`;
  }
  if (breakpoints.md) {
    classes += ` md:size-${breakpoints.md}`;
  }
  if (breakpoints.lg) {
    classes += ` lg:size-${breakpoints.lg}`;
  }
  if (breakpoints.xl) {
    classes += ` xl:size-${breakpoints.xl}`;
  }

  return classes.trim();
}

export function getSizeStyles(size: Size) {
  const sizeTokens = designTokens.size[size];
  return {
    "--element-height": sizeTokens.height,
    "--element-font-size": sizeTokens.fontSize,
    "--element-padding-x": sizeTokens.paddingX,
    "--element-padding-y": sizeTokens.paddingY,
    "--element-line-height": sizeTokens.lineHeight,
    "--element-icon-size": sizeTokens.iconSize,
    "--element-gap": sizeTokens.gap,
  } as React.CSSProperties;
}

export function getRadiusStyles(radius: Radius) {
  return {
    "--element-border-radius": designTokens.radius[radius],
  } as React.CSSProperties;
}

export function getElementStyles(
  size: Size,
  _variant: Variant,
  _color: Color | undefined,
  radius: Radius,
) {
  return {
    ...getSizeStyles(size),
    ...getRadiusStyles(radius),
  } as React.CSSProperties;
}
