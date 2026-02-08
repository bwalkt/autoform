'use client'

import {
  addDays,
  addMonths,
  endOfDay,
  endOfMonth,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from 'date-fns'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/elements/Button'
import { cn } from '@/lib/utils'
import { Calendar } from './Calendar'

export interface DateRangePreset {
  /** Label displayed on the button */
  label: string
  /** Function that returns the date range */
  getValue: () => DateRange
}

/** Default presets for common date ranges */
export const defaultPresets: DateRangePreset[] = [
  {
    label: 'Today',
    getValue: () => {
      const today = startOfDay(new Date())
      return { from: today, to: today }
    },
  },
  {
    label: 'Yesterday',
    getValue: () => {
      const yesterday = startOfDay(subDays(new Date(), 1))
      return { from: yesterday, to: yesterday }
    },
  },
  {
    label: 'Tomorrow',
    getValue: () => {
      const tomorrow = startOfDay(addDays(new Date(), 1))
      return { from: tomorrow, to: tomorrow }
    },
  },
  {
    label: 'Last 7 days',
    getValue: () => {
      const today = endOfDay(new Date())
      const from = startOfDay(subDays(new Date(), 6))
      return { from, to: today }
    },
  },
  {
    label: 'Next 7 days',
    getValue: () => {
      const today = startOfDay(new Date())
      const to = endOfDay(addDays(new Date(), 6))
      return { from: today, to }
    },
  },
  {
    label: 'Last 30 days',
    getValue: () => {
      const today = endOfDay(new Date())
      const from = startOfDay(subDays(new Date(), 29))
      return { from, to: today }
    },
  },
  {
    label: 'Month to date',
    getValue: () => {
      const today = endOfDay(new Date())
      const from = startOfMonth(new Date())
      return { from, to: today }
    },
  },
  {
    label: 'Last month',
    getValue: () => {
      const lastMonth = subMonths(new Date(), 1)
      return {
        from: startOfMonth(lastMonth),
        to: endOfMonth(lastMonth),
      }
    },
  },
  {
    label: 'Next month',
    getValue: () => {
      const nextMonth = addMonths(new Date(), 1)
      return {
        from: startOfMonth(nextMonth),
        to: endOfMonth(nextMonth),
      }
    },
  },
  {
    label: 'Year to date',
    getValue: () => {
      const today = endOfDay(new Date())
      const from = startOfYear(new Date())
      return { from, to: today }
    },
  },
  {
    label: 'Last year',
    getValue: () => {
      const lastYear = subYears(new Date(), 1)
      return {
        from: startOfYear(lastYear),
        to: endOfYear(lastYear),
      }
    },
  },
]

export interface CalendarWithPresetsProps {
  /** Selected date range */
  value?: DateRange
  /** Callback when date range changes */
  onChange?: (range: DateRange | undefined) => void
  /** Custom presets (uses defaultPresets if not provided) */
  presets?: DateRangePreset[]
  /** Whether to show the calendar */
  showCalendar?: boolean
  /** Number of months to display */
  numberOfMonths?: 1 | 2
  /** Layout direction */
  layout?: 'vertical' | 'horizontal'
  /** Additional class names */
  className?: string
  /** Whether the picker is disabled */
  disabled?: boolean
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Specific dates to disable */
  disabledDates?: Date[]
  /** First day of week (0 = Sunday, 1 = Monday) */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

/**
 * CalendarWithPresets - A range calendar with preset date range buttons.
 * Perfect for filtering dashboards, reports, or analytics.
 *
 * @example
 * ```tsx
 * import { CalendarWithPresets, type DateRange } from "@/form";
 *
 * const [range, setRange] = React.useState<DateRange>();
 *
 * <CalendarWithPresets
 *   value={range}
 *   onChange={setRange}
 * />
 * ```
 */
/** CalendarWithPresets export. */
export const CalendarWithPresets = React.forwardRef<HTMLDivElement, CalendarWithPresetsProps>(
  (
    {
      value,
      onChange,
      presets = defaultPresets,
      showCalendar = true,
      numberOfMonths = 1,
      layout = 'vertical',
      className,
      disabled = false,
      minDate,
      maxDate,
      disabledDates,
      weekStartsOn = 0,
    },
    ref,
  ) => {
    const [month, setMonth] = React.useState<Date | undefined>(value?.from)

    // Update month when value changes
    React.useEffect(() => {
      if (value?.from) {
        setMonth(value.from)
      }
    }, [value?.from])

    // Build disabled matcher for react-day-picker
    const disabledMatcher = React.useMemo(() => {
      const matchers: Array<Date | { before: Date } | { after: Date }> = []

      if (minDate) {
        matchers.push({ before: minDate })
      }
      if (maxDate) {
        matchers.push({ after: maxDate })
      }
      if (disabledDates) {
        matchers.push(...disabledDates)
      }

      return matchers.length > 0 ? matchers : undefined
    }, [minDate, maxDate, disabledDates])

    const handlePresetClick = (preset: DateRangePreset) => {
      if (disabled) return
      const range = preset.getValue()

      // Clamp range to min/max bounds
      let clampedFrom = range.from
      let clampedTo = range.to

      if (minDate && clampedFrom && clampedFrom < minDate) {
        clampedFrom = minDate
      }
      if (maxDate && clampedTo && clampedTo > maxDate) {
        clampedTo = maxDate
      }

      // Skip if range becomes invalid (from > to)
      if (clampedFrom && clampedTo && clampedFrom > clampedTo) {
        return
      }

      const clampedRange = { from: clampedFrom, to: clampedTo }
      onChange?.(clampedRange)
      if (clampedRange.from) {
        setMonth(clampedRange.from)
      }
    }

    const isHorizontal = layout === 'horizontal'

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border bg-background p-4',
          isHorizontal ? 'flex gap-4' : 'flex flex-col gap-4',
          disabled && 'opacity-50 pointer-events-none',
          className,
        )}
      >
        {showCalendar && (
          <div className={cn(isHorizontal && 'border-r pr-4')}>
            <Calendar
              mode="range"
              selected={value}
              onSelect={onChange}
              month={month}
              onMonthChange={setMonth}
              numberOfMonths={numberOfMonths}
              disabled={disabledMatcher}
              weekStartsOn={weekStartsOn}
              classNames={{
                months: 'flex flex-col sm:flex-row gap-4',
                week: cn('flex w-full mt-2', 'rounded-md bg-muted/30'),
              }}
            />
          </div>
        )}

        <div
          className={cn(isHorizontal && showCalendar && 'border-t-0', !isHorizontal && showCalendar && 'border-t pt-4')}
        >
          <div className="flex flex-wrap gap-2">
            {presets.map((preset, index) => (
              <Button
                key={`${preset.label}-${index}`}
                variant="outline"
                size="1"
                onClick={() => handlePresetClick(preset)}
                disabled={disabled}
                className="text-xs"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    )
  },
)

CalendarWithPresets.displayName = 'CalendarWithPresets'
