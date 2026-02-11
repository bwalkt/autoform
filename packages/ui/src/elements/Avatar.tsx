'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { type Color, designTokens, type Radius, type Size } from './tokens'

export const avatarSizes = {
  '1': 'rt-avatar-size',
  '2': 'rt-avatar-size',
  '3': 'rt-avatar-size',
  '4': 'rt-avatar-size',
  '5': 'rt-avatar-size',
  '6': 'rt-avatar-size',
}

export type AvatarSize = Size | '5' | '6'

type AvatarSizeStyle = React.CSSProperties & {
  '--rt-avatar-size': string
  '--rt-avatar-font-size': string
  '--rt-avatar-line-height': string
}

export const avatarSizeStyles: Record<AvatarSize, AvatarSizeStyle> = {
  '1': {
    '--rt-avatar-size': designTokens.size['1'].height,
    '--rt-avatar-font-size': designTokens.size['1'].fontSize,
    '--rt-avatar-line-height': designTokens.size['1'].lineHeight,
  },
  '2': {
    '--rt-avatar-size': designTokens.size['2'].height,
    '--rt-avatar-font-size': designTokens.size['2'].fontSize,
    '--rt-avatar-line-height': designTokens.size['2'].lineHeight,
  },
  '3': {
    '--rt-avatar-size': designTokens.size['3'].height,
    '--rt-avatar-font-size': designTokens.size['3'].fontSize,
    '--rt-avatar-line-height': designTokens.size['3'].lineHeight,
  },
  '4': {
    '--rt-avatar-size': designTokens.size['4'].height,
    '--rt-avatar-font-size': designTokens.size['4'].fontSize,
    '--rt-avatar-line-height': designTokens.size['4'].lineHeight,
  },
  '5': {
    '--rt-avatar-size': '4rem',
    '--rt-avatar-font-size': designTokens.typography['5'].fontSize,
    '--rt-avatar-line-height': designTokens.typography['5'].lineHeight,
  },
  '6': {
    '--rt-avatar-size': '5rem',
    '--rt-avatar-font-size': designTokens.typography['6'].fontSize,
    '--rt-avatar-line-height': designTokens.typography['6'].lineHeight,
  },
}

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
        style={avatarSizeStyles[size]}
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
