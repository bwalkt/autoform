'use client'

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/elements/Button'
import { cn } from '@/lib/utils'

export interface DayPrice {
  /** The date */
  date: Date
  /** The price for this date */
  price: number
  /** Whether this is a highlighted/deal price */
  isHighlighted?: boolean
  /** Whether the date is available */
  available?: boolean
}

export interface CalendarWithPricingProps {
  /** Selected date */
  value?: Date
  /** Callback when date changes */
  onChange?: (date: Date | undefined) => void
  /** Price data for dates */
  prices: DayPrice[]
  /** Function to format price display */
  formatPrice?: (price: number) => string
  /** Currency symbol (default: "$") */
  currency?: string
  /** Whether the picker is disabled */
  disabled?: boolean
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Additional class names */
  className?: string
  /** First day of week (0 = Sunday, 1 = Monday) */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  /** Show prices for outside days (days from adjacent months) */
  showOutsideDayPrices?: boolean
}

/**
 * CalendarWithPricing - A calendar that displays prices below each date.
 * Perfect for booking flights, hotels, or any date-based pricing.
 *
 * @example
 * ```tsx
 * import { CalendarWithPricing, type DayPrice } from "@/form";
 *
 * const prices: DayPrice[] = [
 *   { date: new Date(2026, 0, 20), price: 84, isHighlighted: true },
 *   { date: new Date(2026, 0, 21), price: 92, isHighlighted: true },
 *   // ...more prices
 * ];
 *
 * const [date, setDate] = React.useState<Date>();
 *
 * <CalendarWithPricing
 *   value={date}
 *   onChange={setDate}
 *   prices={prices}
 * />
 * ```
 */
/** CalendarWithPricing export. */
export const CalendarWithPricing = React.forwardRef<HTMLDivElement, CalendarWithPricingProps>(
  (
    {
      value,
      onChange,
      prices,
      formatPrice,
      currency = '$',
      disabled = false,
      minDate,
      maxDate,
      className,
      weekStartsOn = 0,
      showOutsideDayPrices = false,
    },
    ref,
  ) => {
    const [currentMonth, setCurrentMonth] = React.useState<Date>(value ?? new Date())

    // Update month when value changes
    React.useEffect(() => {
      if (value) {
        setCurrentMonth(value)
      }
    }, [value])

    // Build price map for quick lookup
    const priceMap = React.useMemo(() => {
      const map = new Map<string, DayPrice>()
      for (const price of prices) {
        const key = format(price.date, 'yyyy-MM-dd')
        map.set(key, price)
      }
      return map
    }, [prices])

    // Get calendar days
    const calendarDays = React.useMemo(() => {
      const monthStart = startOfMonth(currentMonth)
      const monthEnd = endOfMonth(currentMonth)
      const start = startOfWeek(monthStart, { weekStartsOn })
      const end = endOfWeek(monthEnd, { weekStartsOn })
      return eachDayOfInterval({ start, end })
    }, [currentMonth, weekStartsOn])

    // Get week day names
    const weekDays = React.useMemo(() => {
      const start = startOfWeek(new Date(), { weekStartsOn })
      return Array.from({ length: 7 }, (_, i) => {
        const day = new Date(start)
        day.setDate(start.getDate() + i)
        return format(day, 'EEE').slice(0, 2)
      })
    }, [weekStartsOn])

    const handlePrevMonth = () => {
      setCurrentMonth(subMonths(currentMonth, 1))
    }

    const handleNextMonth = () => {
      setCurrentMonth(addMonths(currentMonth, 1))
    }

    const handleDateSelect = (date: Date) => {
      if (disabled) return
      if (minDate && isBefore(date, minDate)) return
      if (maxDate && isAfter(date, maxDate)) return

      const priceData = priceMap.get(format(date, 'yyyy-MM-dd'))
      if (priceData?.available === false) return

      onChange?.(date)
    }

    const formatPriceDisplay = (price: number): string => {
      if (formatPrice) {
        return formatPrice(price)
      }
      return `${currency}${price}`
    }

    const isDateDisabled = (date: Date): boolean => {
      if (minDate && isBefore(date, minDate)) return true
      if (maxDate && isAfter(date, maxDate)) return true
      const priceData = priceMap.get(format(date, 'yyyy-MM-dd'))
      if (priceData?.available === false) return true
      return false
    }

    // Group days into weeks
    const weeks: Date[][] = []
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7))
    }

    return (
      <div
        ref={ref}
        className={cn('rounded-lg border bg-background p-4', disabled && 'opacity-50 pointer-events-none', className)}
      >
        {/* Header with navigation */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="1" onClick={handlePrevMonth} disabled={disabled} className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>

          <span className="text-sm font-medium">{format(currentMonth, 'MMMM yyyy')}</span>

          <Button variant="ghost" size="1" onClick={handleNextMonth} disabled={disabled} className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
        </div>

        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {weeks.map(week =>
            week.map(day => {
              const dateKey = format(day, 'yyyy-MM-dd')
              const priceData = priceMap.get(dateKey)
              const isCurrentMonth = isSameMonth(day, currentMonth)
              const isSelected = value && isSameDay(day, value)
              const isTodayDate = isToday(day)
              const isDisabled = isDateDisabled(day)
              const showPrice = isCurrentMonth || showOutsideDayPrices

              return (
                <button
                  key={dateKey}
                  type="button"
                  onClick={() => handleDateSelect(day)}
                  disabled={disabled || isDisabled || !isCurrentMonth}
                  className={cn(
                    'flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-h-[60px]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : isCurrentMonth
                        ? 'hover:bg-accent'
                        : 'text-muted-foreground/50',
                    isDisabled && isCurrentMonth && 'opacity-50 cursor-not-allowed',
                    !isCurrentMonth && 'cursor-default',
                  )}
                >
                  <span className={cn('text-sm font-medium', isTodayDate && !isSelected && 'text-primary font-bold')}>
                    {format(day, 'd')}
                  </span>
                  {showPrice && priceData && (
                    <span
                      className={cn(
                        'text-xs mt-0.5',
                        isSelected
                          ? 'text-primary-foreground/90'
                          : priceData.isHighlighted
                            ? 'text-green-600 font-medium'
                            : 'text-muted-foreground',
                      )}
                    >
                      {formatPriceDisplay(priceData.price)}
                    </span>
                  )}
                </button>
              )
            }),
          )}
        </div>
      </div>
    )
  },
)

CalendarWithPricing.displayName = 'CalendarWithPricing'
