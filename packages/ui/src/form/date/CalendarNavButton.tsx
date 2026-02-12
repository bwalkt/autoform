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
