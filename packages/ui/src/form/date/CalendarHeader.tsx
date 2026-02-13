'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import type * as React from 'react'
import type { Color, Radius } from '@/elements/tokens'
import { cn } from '@/lib/utils'
import { CalendarNavButton } from './CalendarNavButton'

export interface CalendarHeaderProps {
  title: React.ReactNode
  color: Color
  radius: Radius
  navButtonVariant: 'soft' | 'outline' | 'ghost'
  navButtonBordered: boolean
  accentColor: string
  softColor: string
  foregroundColor: string
  onPrevious: () => void
  onNext: () => void
  previousDisabled?: boolean
  nextDisabled?: boolean
  previousAriaLabel?: string
  nextAriaLabel?: string
  previousIcon?: React.ReactNode
  nextIcon?: React.ReactNode
  className?: string
  titleClassName?: string
  navClassName?: string
  navButtonClassName?: string
}

/** Shared header for calendar-style components. */
export function CalendarHeader({
  title,
  color,
  radius,
  navButtonVariant,
  navButtonBordered,
  accentColor,
  softColor,
  foregroundColor,
  onPrevious,
  onNext,
  previousDisabled = false,
  nextDisabled = false,
  previousAriaLabel = 'Previous',
  nextAriaLabel = 'Next',
  previousIcon,
  nextIcon,
  className,
  titleClassName,
  navClassName,
  navButtonClassName,
}: CalendarHeaderProps) {
  const fallbackPrevIcon = <ChevronLeftIcon className="!text-current !opacity-100" width={14} height={14} />
  const fallbackNextIcon = <ChevronRightIcon className="!text-current !opacity-100" width={14} height={14} />

  return (
    <div className={cn('flex h-(--cell-size) items-center justify-between gap-2', className)}>
      <span className={cn('truncate text-sm font-medium', titleClassName)}>{title}</span>
      <div className={cn('flex items-center gap-1', navClassName)}>
        <CalendarNavButton
          color={color}
          radius={radius}
          variant={navButtonVariant}
          bordered={navButtonBordered}
          accentColor={accentColor}
          softColor={softColor}
          foregroundColor={foregroundColor}
          className={navButtonClassName}
          aria-label={previousAriaLabel}
          onClick={onPrevious}
          disabled={previousDisabled}
        >
          {previousIcon ?? fallbackPrevIcon}
        </CalendarNavButton>
        <CalendarNavButton
          color={color}
          radius={radius}
          variant={navButtonVariant}
          bordered={navButtonBordered}
          accentColor={accentColor}
          softColor={softColor}
          foregroundColor={foregroundColor}
          className={navButtonClassName}
          aria-label={nextAriaLabel}
          onClick={onNext}
          disabled={nextDisabled}
        >
          {nextIcon ?? fallbackNextIcon}
        </CalendarNavButton>
      </div>
    </div>
  )
}
