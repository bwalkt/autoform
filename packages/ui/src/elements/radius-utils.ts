import { designTokens, type Radius } from './tokens'

export const RADIUS_VALUE_MAP: Record<Radius, string> = {
  none: designTokens.radius.none,
  sm: designTokens.radius.sm,
  md: designTokens.radius.md,
  lg: designTokens.radius.lg,
  full: designTokens.radius.full,
}

const RADIUS_REVERSE_MAP = Object.fromEntries(
  Object.entries(RADIUS_VALUE_MAP).map(([token, value]) => [value, token]),
) as Record<string, Radius>

/** getThemeRadiusValue export. */
export function getThemeRadiusValue(radius: Radius): string {
  return RADIUS_VALUE_MAP[radius] ?? RADIUS_VALUE_MAP.md
}

/** resolveThemeRadius export. */
export function resolveThemeRadius(value: string): Radius {
  return RADIUS_REVERSE_MAP[value] ?? 'md'
}
