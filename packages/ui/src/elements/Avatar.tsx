'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Color, Radius, Size } from './tokens'

// Size configurations
const avatarSizes = {
  '1': 'h-6 w-6 text-xs',
  '2': 'h-8 w-8 text-sm',
  '3': 'h-10 w-10 text-base',
  '4': 'h-12 w-12 text-lg',
  '5': 'h-16 w-16 text-xl',
  '6': 'h-20 w-20 text-2xl',
}

type AvatarSize = Size | '5' | '6'

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
          // Fallback colors
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

// ============================================================================
// Avatar Group
// ============================================================================

type AvatarGroupLayout = 'spread' | 'stack'

// Spacing for stack layout (negative margin to create overlap)
const stackSpacing: Record<AvatarSize, string> = {
  '1': '-space-x-1.5',
  '2': '-space-x-2',
  '3': '-space-x-2.5',
  '4': '-space-x-3',
  '5': '-space-x-4',
  '6': '-space-x-5',
}

// Spacing for spread layout (positive gap)
const spreadSpacing: Record<AvatarSize, string> = {
  '1': 'gap-1',
  '2': 'gap-1.5',
  '3': 'gap-2',
  '4': 'gap-2',
  '5': 'gap-3',
  '6': 'gap-3',
}

export interface AvatarGroupProps {
  /** Maximum avatars to show before +N indicator */
  max?: number
  /** Size of avatars */
  size?: AvatarSize
  /** Layout style - spread (side by side) or stack (overlapping) */
  layout?: AvatarGroupLayout
  /** Additional class names */
  className?: string
  /** Avatar children */
  children: React.ReactNode
  /** Callback when overflow indicator is clicked */
  onOverflowClick?: (overflowCount: number, allChildren: React.ReactNode[]) => void
  /** Custom render for overflow indicator */
  renderOverflow?: (count: number) => React.ReactNode
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max, size = '2', layout = 'stack', className, children, onOverflowClick, renderOverflow, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children)
    const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray
    const remainingCount = max ? Math.max(0, childrenArray.length - max) : 0

    const isStack = layout === 'stack'
    const spacing = isStack ? stackSpacing[size] : spreadSpacing[size]

    const handleOverflowClick = () => {
      if (onOverflowClick && remainingCount > 0) {
        onOverflowClick(remainingCount, childrenArray.slice(max))
      }
    }

    return (
      <div ref={ref} className={cn('flex items-center', spacing, className)} {...props}>
        {visibleChildren.map((child, index) => (
          <span
            key={index}
            className={cn('relative', isStack && 'ring-2 ring-background rounded-full')}
            style={isStack ? { zIndex: visibleChildren.length - index } : undefined}
          >
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
              : child}
          </span>
        ))}
        {remainingCount > 0 &&
          (renderOverflow ? (
            renderOverflow(remainingCount)
          ) : (
            <button
              type="button"
              onClick={handleOverflowClick}
              disabled={!onOverflowClick}
              className={cn(
                'relative inline-flex items-center justify-center rounded-full',
                'bg-muted text-muted-foreground font-medium',
                'transition-colors',
                isStack && 'ring-2 ring-background',
                onOverflowClick && 'hover:bg-muted/80 cursor-pointer',
                !onOverflowClick && 'cursor-default',
                avatarSizes[size],
              )}
              aria-label={`${remainingCount} more`}
            >
              +{remainingCount}
            </button>
          ))}
      </div>
    )
  },
)

AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarGroup }
