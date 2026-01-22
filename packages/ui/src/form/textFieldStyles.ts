import type { Color } from '@/elements/tokens'
import { cn } from '@/lib/utils'

// ============================================================================
// Variant Styles - Input Focus (for single inputs like TextField)
// ============================================================================

/**
 * Variant styles using `focus:` pseudo-class.
 * Use for single input components where the input itself receives focus.
 */
export const variantStyles: Record<string, string> = {
  classic: cn(
    'border border-input',
    'bg-gradient-to-b from-background to-muted/30 text-foreground shadow-sm',
    'focus:border-ring',
    'focus:ring-2 focus:ring-ring focus:ring-offset-2',
  ),
  solid: cn(
    'border-0',
    'bg-primary/10 text-foreground',
    'focus:bg-primary/15',
    'focus:ring-2 focus:ring-ring focus:ring-offset-2',
  ),
  soft: cn(
    'border-0',
    'bg-secondary text-foreground',
    'hover:bg-secondary/80',
    'focus:bg-secondary/80',
    'focus:ring-2 focus:ring-ring focus:ring-offset-2',
  ),
  surface: cn(
    'border border-input',
    'bg-background text-foreground shadow-sm',
    'focus:border-ring',
    'focus:ring-2 focus:ring-ring focus:ring-offset-2',
  ),
  outline: cn(
    'border border-input',
    'bg-background text-foreground',
    'focus:border-ring',
    'focus:ring-2 focus:ring-ring focus:ring-offset-2',
  ),
  ghost: cn(
    'border-0',
    'bg-transparent text-foreground',
    'hover:bg-accent',
    'focus:bg-accent',
    'focus:ring-2 focus:ring-ring focus:ring-offset-2',
  ),
}

// ============================================================================
// Variant Styles - Container Focus-Within (for compound inputs)
// ============================================================================

/**
 * Variant styles using `focus-within:` pseudo-class.
 * Use for compound components where a container wraps multiple elements
 * and should show focus state when any child receives focus.
 */
export const containerVariantStyles: Record<string, string> = {
  classic: cn(
    'border border-input',
    'bg-gradient-to-b from-background to-muted/30 text-foreground shadow-sm',
    'focus-within:border-ring',
    'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
  ),
  solid: cn(
    'border-0',
    'bg-primary/10 text-foreground',
    'focus-within:bg-primary/15',
    'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
  ),
  soft: cn(
    'border-0',
    'bg-secondary text-foreground',
    'hover:bg-secondary/80',
    'focus-within:bg-secondary/80',
    'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
  ),
  surface: cn(
    'border border-input',
    'bg-background text-foreground shadow-sm',
    'focus-within:border-ring',
    'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
  ),
  outline: cn(
    'border border-input',
    'bg-background text-foreground',
    'focus-within:border-ring',
    'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
  ),
  ghost: cn(
    'border-0',
    'bg-transparent text-foreground',
    'hover:bg-accent',
    'focus-within:bg-accent',
    'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
  ),
}

// ============================================================================
// Color Styles - Input Focus (for single inputs)
// ============================================================================

/**
 * Color-specific overrides using `focus:` pseudo-class.
 * For bordered variants (classic, surface, outline).
 */
export const colorStyles: Record<Color, string> = {
  default: '',
  primary: 'border-primary focus:border-primary focus:ring-primary/30',
  neutral: 'border-gray-500 focus:border-gray-500 focus:ring-gray-500/30',
  info: 'border-blue-500 focus:border-blue-500 focus:ring-blue-500/30',
  success: 'border-green-500 focus:border-green-500 focus:ring-green-500/30',
  warning: 'border-amber-500 focus:border-amber-500 focus:ring-amber-500/30',
  error: 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
}

// ============================================================================
// Color Styles - Container Focus-Within (for compound inputs)
// ============================================================================

/**
 * Color-specific overrides using `focus-within:` pseudo-class.
 * For compound components with bordered variants.
 */
export const containerColorStyles: Record<Color, string> = {
  default: '',
  primary: 'border-primary focus-within:border-primary focus-within:ring-primary/30',
  neutral: 'border-gray-500 focus-within:border-gray-500 focus-within:ring-gray-500/30',
  info: 'border-blue-500 focus-within:border-blue-500 focus-within:ring-blue-500/30',
  success: 'border-green-500 focus-within:border-green-500 focus-within:ring-green-500/30',
  warning: 'border-amber-500 focus-within:border-amber-500 focus-within:ring-amber-500/30',
  error: 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500/30',
}

// ============================================================================
// Solid Color Styles (same for both - background colors)
// ============================================================================

/**
 * Background color overrides for solid variant.
 * Works for both single inputs and compound components.
 */
export const solidColorStyles: Record<Color, string> = {
  default: '',
  primary:
    'bg-primary/10 focus:bg-primary/15 focus-within:bg-primary/15 focus:ring-primary/30 focus-within:ring-primary/30',
  neutral:
    'bg-gray-500/10 focus:bg-gray-500/15 focus-within:bg-gray-500/15 focus:ring-gray-500/30 focus-within:ring-gray-500/30',
  info: 'bg-blue-500/10 focus:bg-blue-500/15 focus-within:bg-blue-500/15 focus:ring-blue-500/30 focus-within:ring-blue-500/30',
  success:
    'bg-green-500/10 focus:bg-green-500/15 focus-within:bg-green-500/15 focus:ring-green-500/30 focus-within:ring-green-500/30',
  warning:
    'bg-amber-500/10 focus:bg-amber-500/15 focus-within:bg-amber-500/15 focus:ring-amber-500/30 focus-within:ring-amber-500/30',
  error:
    'bg-red-500/10 focus:bg-red-500/15 focus-within:bg-red-500/15 focus:ring-red-500/30 focus-within:ring-red-500/30',
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get the base variant from a TextFieldVariant (strips floating- prefix).
 */
export function getBaseVariant(variant?: string): string {
  if (variant?.startsWith('floating-')) {
    return 'outline'
  }
  return variant ?? 'outline'
}
