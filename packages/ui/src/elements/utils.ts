import type React from 'react'
import { type Color, designTokens, type Radius, type ResponsiveSize, type Size, type Variant } from './tokens'

/** getResponsiveSize export. */
export function getResponsiveSize(size: ResponsiveSize): string {
  if (typeof size === 'string') {
    return `size-${size}`
  }

  const breakpoints = {
    initial: size.initial || '2',
    xs: size.xs,
    sm: size.sm,
    md: size.md,
    lg: size.lg,
    xl: size.xl,
  }

  let classes = ''

  if (breakpoints.initial) {
    classes += ` size-${breakpoints.initial}`
  }
  if (breakpoints.xs) {
    classes += ` xs:size-${breakpoints.xs}`
  }
  if (breakpoints.sm) {
    classes += ` sm:size-${breakpoints.sm}`
  }
  if (breakpoints.md) {
    classes += ` md:size-${breakpoints.md}`
  }
  if (breakpoints.lg) {
    classes += ` lg:size-${breakpoints.lg}`
  }
  if (breakpoints.xl) {
    classes += ` xl:size-${breakpoints.xl}`
  }

  return classes.trim()
}

/** getSizeStyles export. */
export function getSizeStyles(size: Size) {
  const sizeTokens = designTokens.size[size]
  return {
    '--element-height': sizeTokens.height,
    '--element-font-size': sizeTokens.fontSize,
    '--element-padding-x': sizeTokens.paddingX,
    '--element-padding-y': sizeTokens.paddingY,
    '--element-line-height': sizeTokens.lineHeight,
    '--element-icon-size': sizeTokens.iconSize,
    '--element-gap': sizeTokens.gap,
  } as React.CSSProperties
}

/** getRadiusStyles export. */
export function getRadiusStyles(radius: Radius) {
  return {
    '--element-border-radius': designTokens.radius[radius],
  } as React.CSSProperties
}

/** getElementStyles export. */
export function getElementStyles(size: Size, _variant: Variant, _color: Color | undefined, radius: Radius) {
  return {
    ...getSizeStyles(size),
    ...getRadiusStyles(radius),
  } as React.CSSProperties
}
