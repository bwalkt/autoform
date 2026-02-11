'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { AVATAR_SIZE_CLASS, type AvatarProps, type AvatarSize, avatarSizeStyles } from './Avatar'

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
  onOverflowClick?: (overflowCount: number, overflowChildren: React.ReactNode[]) => void
  /** Custom render for overflow indicator */
  renderOverflow?: (count: number) => React.ReactNode
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max, size = '2', layout = 'stack', className, children, onOverflowClick, renderOverflow, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children)
    const hasMax = max !== undefined
    const visibleChildren = hasMax ? childrenArray.slice(0, max) : childrenArray
    const remainingCount = hasMax ? Math.max(0, childrenArray.length - max) : 0

    const isStack = layout === 'stack'
    const spacing = isStack ? stackSpacing[size] : spreadSpacing[size]

    const handleOverflowClick = () => {
      if (onOverflowClick && remainingCount > 0) {
        onOverflowClick(remainingCount, childrenArray.slice(max))
      }
    }

    return (
      <div ref={ref} className={cn('flex items-center', spacing, className)} {...props}>
        {visibleChildren.map((child, index) => {
          const key = React.isValidElement(child) && child.key != null ? child.key : index
          return (
            <span
              key={key}
              className={cn('relative', isStack && 'ring-2 ring-background rounded-full')}
              style={isStack ? { zIndex: visibleChildren.length - index } : undefined}
            >
              {React.isValidElement(child)
                ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
                : child}
            </span>
          )
        })}
        {remainingCount > 0 &&
          (renderOverflow ? (
            renderOverflow(remainingCount)
          ) : (
            <button
              type="button"
              onClick={handleOverflowClick}
              disabled={!onOverflowClick}
              style={avatarSizeStyles[size]}
              className={cn(
                'relative inline-flex items-center justify-center rounded-full',
                'bg-muted text-muted-foreground font-medium',
                'transition-colors',
                isStack && 'ring-2 ring-background',
                onOverflowClick && 'hover:bg-muted/80 cursor-pointer',
                !onOverflowClick && 'cursor-default',
                AVATAR_SIZE_CLASS,
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

export { AvatarGroup }
