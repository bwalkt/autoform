'use client'

import type * as React from 'react'
import { IconButton } from '@/elements/IconButton'
import type { Color, Radius } from '@/elements/tokens'
import { cn } from '@/lib/utils'

export interface CalendarNavButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof IconButton>, 'size' | 'variant' | 'color' | 'radius'> {
  color: Color
  radius: Radius
  bordered: boolean
  accentColor: string
  softColor: string
  foregroundColor: string
}

/**
 * Render a calendar navigation button styled for calendar controls.
 *
 * @param bordered - When true, render with an outlined (bordered) style; otherwise render with a filled (soft) style.
 * @param color - Color token forwarded to the underlying IconButton.
 * @param radius - Corner radius forwarded to the underlying IconButton.
 * @param accentColor - CSS color used for the accent (controls border/text color).
 * @param softColor - CSS color used for the accent background.
 * @param foregroundColor - CSS color used for foreground text/icons when highlighted.
 * @param className - Additional class names appended to the button.
 * @param props - Additional IconButton props that are forwarded to the rendered element.
 * @returns A configured IconButton element used for calendar navigation controls.
 */
export function CalendarNavButton({
  bordered,
  color,
  radius,
  accentColor,
  softColor,
  foregroundColor,
  className,
  ...props
}: CalendarNavButtonProps) {
  return (
    <IconButton
      variant={bordered ? 'outline' : 'soft'}
      size="1"
      color={color}
      radius={radius}
      className={cn(
        'shrink-0 touch-manipulation [-webkit-tap-highlight-color:transparent]',
        bordered
          ? 'border border-[var(--rdp-accent-color)] bg-transparent text-[var(--rdp-accent-color)] hover:bg-[var(--rdp-accent-background-color)] hover:text-[var(--rdp-accent-color)]'
          : 'border border-transparent bg-[var(--rdp-accent-background-color)] text-[var(--rdp-accent-color)] hover:bg-[var(--rdp-accent-color)] hover:text-[var(--rdp-accent-foreground)]',
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