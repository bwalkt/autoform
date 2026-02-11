'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Color, Radius, Size } from './tokens'

export const avatarSizes = {
  '1': 'avatar-size-1',
  '2': 'avatar-size-2',
  '3': 'avatar-size-3',
  '4': 'avatar-size-4',
  '5': 'avatar-size-5',
  '6': 'avatar-size-6',
}

export type AvatarSize = Size | '5' | '6'

// Variant styles
type AvatarVariant = 'solid' | 'soft'

// Radius styles
const radiusStyles: Record<Radius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

// Color styles for fallback
const solidColorStyles: Record<Color, string> = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary text-primary-foreground',
  neutral: 'bg-secondary text-secondary-foreground',
  info: 'bg-blue-500 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-amber-500 text-white',
  error: 'bg-red-500 text-white',
}

const softColorStyles: Record<Color, string> = {
  default: 'bg-muted/50 text-muted-foreground',
  primary: 'bg-primary/10 text-primary',
  neutral: 'bg-muted text-muted-foreground',
  info: 'bg-blue-500/10 text-blue-600',
  success: 'bg-green-500/10 text-green-600',
  warning: 'bg-amber-500/10 text-amber-600',
  error: 'bg-red-500/10 text-red-600',
}

export interface AvatarProps {
  /** Image source URL */
  src?: string
  /** Alt text for the image */
  alt?: string
  /** Fallback text (usually initials) */
  fallback?: string
  /** Size of the avatar */
  size?: AvatarSize
  /** Visual variant */
  variant?: AvatarVariant
  /** Color for fallback */
  color?: Color
  /** Border radius */
  radius?: Radius
  /** Additional class names */
  className?: string
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    { src, alt, fallback, size = '2', variant = 'soft', color = 'default', radius = 'full', className, ...props },
    ref,
  ) => {
    const [hasError, setHasError] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(!!src)

    // Reset loading/error state when src changes
    React.useEffect(() => {
      setHasError(false)
      setIsLoading(!!src)
    }, [src])

    const showImage = src && !hasError
    const showFallback = !showImage || isLoading

    // Get initials from fallback
    const initials = React.useMemo(() => {
      if (!fallback) return ''
      return fallback
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }, [fallback])

    return (
      <span
        ref={ref}
        className={cn(
          'relative inline-flex shrink-0 items-center justify-center overflow-hidden',
          avatarSizes[size],
          radiusStyles[radius],
          showFallback && variant === 'solid' && solidColorStyles[color],
          showFallback && variant === 'soft' && softColorStyles[color],
          className,
        )}
        {...props}
      >
        {showImage && (
          <img
            src={src}
            alt={alt || fallback || 'Avatar'}
            className={cn('h-full w-full object-cover', isLoading && 'opacity-0')}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true)
              setIsLoading(false)
            }}
          />
        )}
        {showFallback && (
          <span className="flex items-center justify-center font-medium">
            {initials || (
              <svg className="h-[60%] w-[60%]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </span>
        )}
      </span>
    )
  },
)

Avatar.displayName = 'Avatar'

export { Avatar }
