'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import type * as React from 'react'
import { useRef, useState } from 'react'
import { type DayButton, DayPicker, type DayPickerProps, getDefaultClassNames } from 'react-day-picker'
import { type Color, designTokens } from '@/elements/tokens'
import { cn } from '@/lib/utils'

export type CalendarSelectionVariant = 'solid' | 'soft' | 'outline'
const DayPickerAny = DayPicker as unknown as React.ComponentType<Record<string, unknown>>

export type CalendarProps = DayPickerProps & {
  /** Additional class names */
  className?: string
  /** First month shown (defaults to current month) */
  from?: Date
  /** Last month shown; when present calendar switches to range mode */
  to?: Date | null
  /** Accent color for selections */
  color?: Color
}

function resolveCalendarColors(color: Color): { accent: string; soft: string; foreground: string } {
  if (color === 'default' || color === 'primary') {
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
    foreground: 'white',
  }
}

/**
 * Calendar component built on react-day-picker.
 * Single month by default. When `to` is provided, it renders a multi-month
 * range calendar similar to shadcn calendar-04.
 *
 * @example
 * ```tsx
 * import { Calendar } from "@/form"
 *
 * // calendar-01 style (single month)
 * <Calendar selected={date} onSelect={setDate} />
 *
 * // calendar-04 style (multi-month range)
 * <Calendar from={new Date(2025, 4, 1)} to={new Date(2025, 5, 1)} selected={range} onSelect={setRange} />
 * ```
 */
/** Calendar export. */
export function Calendar({
  className,
  from,
  to = null,
  classNames,
  showOutsideDays = true,
  color = 'primary',
  mode,
  defaultMonth,
  numberOfMonths,
  startMonth,
  endMonth,
  hideNavigation: _hideNavigation,
  ...props
}: CalendarProps) {
  const resolvedColors = resolveCalendarColors(color)
  const initialMonthRef = useRef(from ?? defaultMonth ?? new Date())
  const resolvedFrom = from ?? defaultMonth ?? initialMonthRef.current
  const [month, setMonth] = useState(resolvedFrom)
  const defaultClassNames = getDefaultClassNames()
  const resolvedMode = to ? 'range' : (mode ?? 'single')
  const forcedModeProps =
    resolvedMode === 'range'
      ? { mode: 'range' as const }
      : resolvedMode === 'multiple'
        ? { mode: 'multiple' as const }
        : { mode: 'single' as const }
  const resolvedNumberOfMonths = to
    ? Math.max(2, (to.getFullYear() - resolvedFrom.getFullYear()) * 12 + (to.getMonth() - resolvedFrom.getMonth()) + 1)
    : (numberOfMonths ?? 1)

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Go to previous month"
        onClick={() => {
          const nextMonth = new Date(month)
          nextMonth.setMonth(nextMonth.getMonth() - 1)
          if (startMonth && nextMonth < startMonth) return
          setMonth(nextMonth)
        }}
        className={cn(
          'absolute left-0 top-0 z-20 inline-flex h-9 w-9 items-center justify-center rounded-md p-0',
          'bg-transparent border-0 shadow-none',
          'opacity-50 hover:opacity-100',
          'text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Go to next month"
        onClick={() => {
          const nextMonth = new Date(month)
          nextMonth.setMonth(nextMonth.getMonth() + 1)
          if (endMonth && nextMonth > endMonth) return
          setMonth(nextMonth)
        }}
        className={cn(
          'absolute right-0 top-0 z-20 inline-flex h-9 w-9 items-center justify-center rounded-md p-0',
          'bg-transparent border-0 shadow-none',
          'opacity-50 hover:opacity-100',
          'text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
      <DayPickerAny
        {...props}
        {...forcedModeProps}
        month={month}
        onMonthChange={setMonth}
        defaultMonth={resolvedFrom}
        numberOfMonths={resolvedNumberOfMonths}
        showOutsideDays={showOutsideDays}
        hideNavigation
        className={cn('rdp-calendar p-3', className)}
        style={
          {
            '--cal-accent': resolvedColors.accent,
            '--cal-accent-soft': resolvedColors.soft,
            '--cal-accent-foreground': resolvedColors.foreground,
            '--rdp-day-width': '2.5rem',
            '--rdp-day-height': '2.5rem',
            '--rdp-day_button-width': '2.25rem',
            '--rdp-day_button-height': '2.25rem',
            '--rdp-day_button-border': '0',
            '--rdp-day_button-border-radius': '0.5rem',
          } as React.CSSProperties
        }
        classNames={{
          root: cn('w-fit', defaultClassNames.root),
          months: cn('flex gap-4 flex-col sm:flex-row', defaultClassNames.months),
          month: cn('flex flex-col gap-4', defaultClassNames.month),
          month_caption: cn('relative flex h-9 items-center justify-center px-10', defaultClassNames.month_caption),
          caption_label: cn('text-sm font-medium', defaultClassNames.caption_label),
          month_grid: cn('w-full border-collapse', defaultClassNames.month_grid),
          weekdays: cn(defaultClassNames.weekdays),
          weekday: cn(
            'text-muted-foreground rounded-md font-normal text-[0.8rem] text-center',
            defaultClassNames.weekday,
          ),
          week: cn(defaultClassNames.week),
          day: cn('relative p-0 text-center text-sm', defaultClassNames.day),
          day_button: cn('h-9 w-9 p-0 rounded-md border-0 bg-transparent', defaultClassNames.day_button),
          range_start: cn('bg-transparent', defaultClassNames.range_start),
          range_end: cn('bg-transparent', defaultClassNames.range_end),
          range_middle: cn('bg-transparent', defaultClassNames.range_middle),
          selected: cn('font-normal text-sm', defaultClassNames.selected),
          today: cn('font-normal', defaultClassNames.today),
          outside: cn('text-muted-foreground opacity-50', defaultClassNames.outside),
          disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
          hidden: cn('invisible', defaultClassNames.hidden),
          ...classNames,
        }}
        components={{
          DayButton: CalendarDayButton,
        }}
        startMonth={startMonth}
        endMonth={endMonth}
      />
    </div>
  )
}

function CalendarDayButton({ className, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  return (
    <button
      {...props}
      data-today={modifiers.today}
      data-selected-single={
        modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'h-9 w-9 p-0 rounded-md border-0 bg-transparent',
        'inline-flex items-center justify-center cursor-pointer text-sm font-normal text-foreground',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'data-[today=true]:bg-[var(--cal-accent-soft)] data-[today=true]:font-semibold',
        'data-[today=true][data-selected-single=true]:bg-[var(--cal-accent)] data-[today=true][data-selected-single=true]:text-[var(--cal-accent-foreground)]',
        'data-[selected-single=true]:bg-[var(--cal-accent)] data-[selected-single=true]:text-[var(--cal-accent-foreground)]',
        'data-[range-start=true]:bg-[var(--cal-accent)] data-[range-start=true]:text-[var(--cal-accent-foreground)]',
        'data-[range-end=true]:bg-[var(--cal-accent)] data-[range-end=true]:text-[var(--cal-accent-foreground)]',
        'data-[range-middle=true]:bg-[var(--cal-accent-soft)] data-[range-middle=true]:rounded-none',
        'data-[range-start=true]:rounded-l-md data-[range-end=true]:rounded-r-md',
        className,
      )}
    />
  )
}

Calendar.displayName = 'Calendar'
