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
    initial: size.initial || "2",
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

export function getElementStyles(
  size: Size,
  variant: Variant,
  color: Color | undefined,
  radius: Radius,
) {
  const sizeTokens = designTokens.size[size];
  const variantTokens = designTokens.variant[variant];
  const radiusToken = designTokens.radius[radius];
  const colorTokens = color
    ? designTokens.color[color]
    : designTokens.color.default;

  return {
    "--element-height": sizeTokens.height,
    "--element-font-size": sizeTokens.fontSize,
    "--element-padding-x": sizeTokens.paddingX,
    "--element-padding-y": sizeTokens.paddingY,
    "--element-line-height": sizeTokens.lineHeight,
    "--element-border-radius": radiusToken,
    "--color-border": colorTokens.border,
    "--color-border-subtle": colorTokens.borderSubtle,
    "--color-background": colorTokens.background,
    "--color-surface": colorTokens.surface,
    "--color-soft-background": colorTokens.softBackground,
    "--color-soft-background-hover": colorTokens.softBackgroundHover,
    "--color-primary": colorTokens.primary,
    "--color-primary-alpha": colorTokens.primaryAlpha,
    "--color-text": colorTokens.text,
  } as React.CSSProperties;
}
