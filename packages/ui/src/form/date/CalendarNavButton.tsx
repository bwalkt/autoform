'use client'

import type * as React from 'react'
import { IconButton } from '@/elements/IconButton'
import type { Color, Radius } from '@/elements/tokens'
import { cn } from '@/lib/utils'

export interface CalendarNavButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof IconButton>, 'size' | 'variant' | 'color' | 'radius'> {
  color: Color
  radius: Radius
  variant?: 'soft' | 'outline' | 'ghost'
  bordered: boolean
  accentColor: string
  softColor: string
  foregroundColor: string
}

/**
 * Render a compact, themed IconButton used for calendar navigation (previous/next).
 *
 * The component applies one of three visual variants (`soft`, `outline`, `ghost`) — if `variant`
 * is not provided, the presence of `bordered` selects `outline`; otherwise `soft` is used.
 *
 * @param variant - Visual variant to apply; if omitted, `bordered` determines the default.
 * @param bordered - When true and `variant` is undefined, use the `outline` appearance.
 * @param color - Color token forwarded to the underlying IconButton.
 * @param radius - Corner radius token forwarded to the underlying IconButton.
 * @param accentColor - CSS color used for the accent custom property (`--rdp-accent-color`).
 * @param softColor - CSS color used for the accent background custom property (`--rdp-accent-background-color`).
 * @param foregroundColor - CSS color used for the accent foreground custom property (`--rdp-accent-foreground`).
 * @param className - Additional class names appended to the button.
 * @param props - Remaining IconButton props forwarded to the rendered element.
 * @returns The configured IconButton element for calendar navigation.
 */
export function CalendarNavButton({
  variant,
  bordered,
  color,
  radius,
  accentColor,
  softColor,
  foregroundColor,
  className,
  ...props
}: CalendarNavButtonProps) {
  const resolvedVariant = variant ?? (bordered ? 'outline' : 'soft')
  return (
    <IconButton
      variant={resolvedVariant === 'outline' ? 'outline' : resolvedVariant === 'ghost' ? 'ghost' : 'soft'}
      size="1"
      color={color}
      radius={radius}
      className={cn(
        'shrink-0 touch-manipulation [-webkit-tap-highlight-color:transparent]',
        '[&_svg]:size-5 [&_svg]:stroke-[2.4]',
        resolvedVariant === 'outline'
          ? 'border border-[var(--rdp-accent-color)] bg-transparent text-[var(--rdp-accent-color)] hover:bg-[var(--rdp-accent-background-color)] hover:text-[var(--rdp-accent-color)]'
          : resolvedVariant === 'soft'
            ? 'border border-transparent bg-[var(--rdp-accent-background-color)] text-[var(--rdp-accent-color)] hover:bg-[var(--rdp-accent-color)] hover:text-[var(--rdp-accent-foreground)]'
            : 'border border-transparent bg-transparent text-[var(--rdp-accent-color)] hover:bg-[var(--rdp-accent-background-color)] hover:text-[var(--rdp-accent-color)]',
        className,
      )}
      style={
        {
          '--rdp-accent-color': accentColor,
          '--rdp-accent-background-color': softColor,
          '--rdp-accent-foreground': foregroundColor,
        } as React.CSSProperties
      }
      {...props}
    />
  )
}
