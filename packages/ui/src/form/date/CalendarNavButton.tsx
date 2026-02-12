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

/** CalendarNavButton export. */
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
          ? 'border border-[var(--cal-nav-accent)] bg-transparent text-[var(--cal-nav-accent)] hover:bg-[var(--cal-nav-soft)] hover:text-[var(--cal-nav-accent)]'
          : 'border border-transparent bg-[var(--cal-nav-soft)] text-[var(--cal-nav-accent)] hover:bg-[var(--cal-nav-accent)] hover:text-[var(--cal-nav-foreground)]',
        className,
      )}
      style={
        {
          '--cal-nav-accent': accentColor,
          '--cal-nav-soft': softColor,
          '--cal-nav-foreground': foregroundColor,
        } as React.CSSProperties
      }
      {...props}
    />
  )
}
