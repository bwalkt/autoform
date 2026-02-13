'use client'

import { addDays, addWeeks, format, isSameDay, isToday, startOfDay, startOfWeek, subWeeks } from 'date-fns'
import * as React from 'react'
import { useOptionalThemeContext } from '@/elements/Theme'
import { type Color, designTokens, type Radius } from '@/elements/tokens'
import { cn } from '@/lib/utils'
import { CalendarHeader } from './CalendarHeader'

export interface MiniCalendarProps {
  /** Selected date */
  value?: Date
  /** Callback when date changes */
  onChange?: (date: Date) => void
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** First day of week (0 = Sunday, 1 = Monday) */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  /** Whether the picker is disabled */
  disabled?: boolean
  /** Additional class names */
  className?: string
  /** Show month/year header */
  showHeader?: boolean
  /** Compact mode - smaller buttons */
  compact?: boolean
  /** Accent color token */
  color?: Color
  /** Border radius token */
  radius?: Radius
  /** Whether nav buttons should use border outline */
  navButtonBordered?: boolean
  /** Nav button visual variant */
  navButtonVariant?: 'soft' | 'outline' | 'ghost'
}

/**
 * Compute CSS color tokens for the calendar UI based on a Color token.
 *
 * @param color - The color token to resolve; `'default'` and `'primary'` map to CSS variables, other values map to entries in `designTokens.color`
 * @returns An object with `accent`, `soft`, and `foreground` CSS color values:
 *  - `accent`: primary accent color
 *  - `soft`: translucent/soft variant used for subtle backgrounds
 *  - `foreground`: text/foreground color that pairs with the accent
 */
function resolveCalendarColors(color: Color): { accent: string; soft: string; foreground: string } {
  if (color === 'default') {
    return {
      accent: 'var(--accent)',
      soft: 'color-mix(in oklab, var(--accent) 18%, transparent)',
      foreground: 'var(--accent-foreground)',
    }
  }

  if (color === 'primary') {
    return {
      accent: 'var(--primary)',
      soft: 'color-mix(in oklab, var(--primary) 18%, transparent)',
      foreground: 'var(--primary-foreground)',
    }
  }

  const token = designTokens.color[color]
  return {
    accent: token.primary,
    soft: token.primaryAlpha,
    foreground: token.text,
  }
}

/**
 * MiniCalendar - A compact horizontal week-based date picker.
 * Perfect for dashboards, sidebars, or mobile interfaces.
 *
 * @example
 * ```tsx
 * import { MiniCalendar } from "@/form";
 *
 * const [date, setDate] = React.useState<Date>(new Date());
 *
 * <MiniCalendar
 *   value={date}
 *   onChange={setDate}
 * />
 * ```
 */
/** MiniCalendar export. */
export const MiniCalendar = React.forwardRef<HTMLDivElement, MiniCalendarProps>(
  (
    {
      value,
      onChange,
      minDate,
      maxDate,
      weekStartsOn = 0,
      disabled = false,
      className,
      showHeader = true,
      compact = false,
      color = 'default',
      radius,
      navButtonBordered,
      navButtonVariant,
    },
    ref,
  ) => {
    const theme = useOptionalThemeContext()
    const resolvedRadius = radius ?? theme?.calendar?.radius ?? theme?.radius ?? 'md'
    const resolvedNavButtonBordered = navButtonBordered ?? theme?.calendar?.navButtonBordered ?? false
    const resolvedNavButtonVariant = navButtonVariant ?? (resolvedNavButtonBordered ? 'outline' : 'soft')
    const resolvedColors = resolveCalendarColors(color)
    const isControlled = value !== undefined
    const [selectedDateState, setSelectedDateState] = React.useState<Date>(value ?? new Date())
    const selectedDate = isControlled ? value : selectedDateState
    const [currentDate, setCurrentDate] = React.useState<Date>(selectedDate ?? new Date())

    // Keep local selection/date in sync with controlled value updates
    React.useEffect(() => {
      if (value !== undefined) {
        setCurrentDate(value)
        setSelectedDateState(value)
      }
    }, [value])

    // Get week days based on current date
    const weekStart = startOfWeek(currentDate, { weekStartsOn })
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

    const handlePrevWeek = () => {
      setCurrentDate(subWeeks(currentDate, 1))
    }

    const handleNextWeek = () => {
      setCurrentDate(addWeeks(currentDate, 1))
    }

    // Normalize comparisons to day granularity to avoid time-of-day issues
    const isDateDisabled = (date: Date): boolean => {
      const d = startOfDay(date)
      if (minDate && d < startOfDay(minDate)) return true
      if (maxDate && d > startOfDay(maxDate)) return true
      return false
    }

    const handleDateSelect = (date: Date) => {
      if (disabled) return
      if (isDateDisabled(date)) return
      if (!isControlled) {
        setSelectedDateState(date)
      }
      setCurrentDate(date)
      onChange?.(date)
    }

    const dayCellSize = compact ? 'text-base' : 'text-[1.125rem]'
    const dayCellPixelSize = compact ? '2.25rem' : '2.75rem'
    const navButtonSize = compact ? '!h-8 !w-8' : '!h-9 !w-9'
    const title = format(currentDate, 'MMMM yyyy')

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex w-full flex-col gap-1.5 border bg-background p-3',
          'rounded-lg',
          disabled && 'opacity-50 pointer-events-none',
          className,
        )}
        style={
          {
            '--mini-cal-radius': designTokens.radius[resolvedRadius],
            '--mini-cal-accent': resolvedColors.accent,
            '--mini-cal-soft': resolvedColors.soft,
            '--mini-cal-fg': resolvedColors.foreground,
            '--mini-cal-cell-size': dayCellPixelSize,
          } as React.CSSProperties
        }
      >
        {/* Header with navigation */}
        {showHeader && (
          <CalendarHeader
            title={title}
            titleClassName={cn('font-medium text-foreground', compact ? 'text-sm' : 'text-[1.125rem]')}
            color={color}
            radius={resolvedRadius}
            navButtonVariant={resolvedNavButtonVariant}
            navButtonBordered={resolvedNavButtonBordered}
            accentColor={resolvedColors.accent}
            softColor={resolvedColors.soft}
            foregroundColor={resolvedColors.foreground}
            navButtonClassName={cn(
              navButtonSize,
              'text-[color-mix(in_oklab,var(--mini-cal-accent),black_35%)] disabled:opacity-70',
            )}
            previousAriaLabel="Previous week"
            nextAriaLabel="Next week"
            onPrevious={handlePrevWeek}
            onNext={handleNextWeek}
            previousDisabled={disabled}
            nextDisabled={disabled}
          />
        )}

        <div className="grid grid-cols-7 place-items-center gap-0">
          {weekDays.map(day => (
            <div
              key={`label-${day.toISOString()}`}
              className={cn('text-center font-medium text-muted-foreground', compact ? 'text-xs' : 'text-[0.875rem]')}
            >
              {format(day, 'EEEEE')}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 place-items-center gap-0">
          {weekDays.map(day => {
            const isSelected = Boolean(selectedDate && isSameDay(day, selectedDate))
            const isTodayDate = isToday(day)
            const isDisabled = isDateDisabled(day)

            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => handleDateSelect(day)}
                disabled={disabled || isDisabled}
                aria-pressed={isSelected}
                aria-current={isTodayDate ? 'date' : undefined}
                aria-label={format(day, 'EEEE, MMMM d, yyyy')}
                style={{
                  width: 'var(--mini-cal-cell-size)',
                  height: 'var(--mini-cal-cell-size)',
                  flex: '0 0 auto',
                }}
                className={cn(
                  'inline-flex shrink-0 items-center justify-center font-medium transition-colors',
                  'appearance-none border-0 bg-transparent p-0 shadow-none',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  'disabled:pointer-events-none disabled:opacity-45',
                  'rounded-[var(--mini-cal-radius)]',
                  dayCellSize,
                  isSelected
                    ? 'bg-[var(--mini-cal-accent)] text-[var(--mini-cal-fg)]'
                    : isTodayDate
                      ? 'bg-[var(--mini-cal-soft)] text-foreground'
                      : 'text-foreground hover:bg-[var(--mini-cal-soft)]',
                )}
              >
                {format(day, 'd')}
              </button>
            )
          })}
        </div>
      </div>
    )
  },
)

MiniCalendar.displayName = 'MiniCalendar'