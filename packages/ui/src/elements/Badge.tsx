'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Color, Radius, Size } from './tokens'

// Size configurations
const badgeSizes = {
  '1': 'px-1.5 py-0.5 text-[10px]',
  '2': 'px-2 py-0.5 text-xs',
  '3': 'px-2.5 py-1 text-sm',
  '4': 'px-3 py-1.5 text-base',
}

// Variant styles
type BadgeVariant = 'solid' | 'soft' | 'outline' | 'surface'

// Radius styles
const radiusStyles: Record<Radius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

// Solid color styles
const solidColorStyles: Record<Color, string> = {
  default: 'bg-secondary text-secondary-foreground',
  primary: 'bg-primary text-primary-foreground',
  neutral: 'bg-gray-500 text-white dark:bg-gray-400 dark:text-gray-900',
  info: 'bg-blue-500 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-amber-500 text-white',
  error: 'bg-red-500 text-white',
}

// Soft color styles
const softColorStyles: Record<Color, string> = {
  default: 'bg-secondary/50 text-secondary-foreground',
  primary: 'bg-primary/10 text-primary',
  neutral: 'bg-muted text-muted-foreground',
  info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  success: 'bg-green-500/10 text-green-600 dark:text-green-400',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  error: 'bg-red-500/10 text-red-600 dark:text-red-400',
}

// Outline color styles
const outlineColorStyles: Record<Color, string> = {
  default: 'border-border text-foreground',
  primary: 'border-primary text-primary',
  neutral: 'border-input text-muted-foreground',
  info: 'border-blue-500 text-blue-600 dark:text-blue-400',
  success: 'border-green-500 text-green-600 dark:text-green-400',
  warning: 'border-amber-500 text-amber-600 dark:text-amber-400',
  error: 'border-red-500 text-red-600 dark:text-red-400',
}

// Surface color styles
const surfaceColorStyles: Record<Color, string> = {
  default: 'bg-background border-border text-foreground',
  primary: 'bg-primary/5 border-primary/20 text-primary',
  neutral: 'bg-muted/50 border-input text-muted-foreground',
  info: 'bg-blue-500/5 border-blue-500/20 text-blue-600 dark:text-blue-400',
  success: 'bg-green-500/5 border-green-500/20 text-green-600 dark:text-green-400',
  warning: 'bg-amber-500/5 border-amber-500/20 text-amber-600 dark:text-amber-400',
  error: 'bg-red-500/5 border-red-500/20 text-red-600 dark:text-red-400',
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Size of the badge */
  size?: Size
  /** Visual variant */
  variant?: BadgeVariant
  /** Color scheme */
  color?: Color
  /** Border radius */
  radius?: Radius
  /** Whether to add high contrast */
  highContrast?: boolean
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      size = '2',
      variant = 'soft',
      color = 'default',
      radius = 'full',
      highContrast = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium whitespace-nowrap',
          badgeSizes[size],
          radiusStyles[radius],

          // Variant + color styles
          variant === 'solid' && solidColorStyles[color],
          variant === 'soft' && softColorStyles[color],
          variant === 'outline' && ['border', outlineColorStyles[color]],
          variant === 'surface' && ['border', surfaceColorStyles[color]],

          // High contrast
          highContrast && variant === 'soft' && 'font-semibold',

          className,
        )}
        {...props}
      >
        {children}
      </span>
    )
  },
)

Badge.displayName = 'Badge'

export { Badge }
