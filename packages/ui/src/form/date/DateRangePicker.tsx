'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/elements/Button'
import { Popover } from '@/elements/Popover'
import type { Color, Radius, Size, TextFieldVariant, Variant } from '@/elements/tokens'
import { cn } from '@/lib/utils'
import { useFieldGroup } from '../FieldGroupContext'
import { TextField } from '../TextField'
import { Calendar, type CalendarSelectionVariant } from './Calendar'

/** Check if variant is a floating type */
const isFloatingVariant = (variant?: string): boolean => variant?.startsWith('floating-') ?? false

/** Map TextFieldVariant to Button Variant */
const toButtonVariant = (variant?: TextFieldVariant): Variant => {
  if (!variant || variant.startsWith('floating-')) return 'outline'
  return variant as Variant
}

/** Map button variant to calendar selection variant */
const getCalendarVariant = (variant?: TextFieldVariant): CalendarSelectionVariant => {
  const buttonVariant = toButtonVariant(variant)
  switch (buttonVariant) {
    case 'soft':
      return 'soft'
    case 'outline':
    case 'ghost':
      return 'outline'
    default:
      return 'solid'
  }
}

export type { DateRange }

export interface DateRangePickerProps {
  /** Selected date range */
  value?: DateRange
  /** Callback when date range changes */
  onChange?: (range: DateRange | undefined) => void
  /** Placeholder text when no dates selected */
  placeholder?: string
  /** Date format string (date-fns format) */
  dateFormat?: string
  /** Whether the picker is disabled */
  disabled?: boolean
  /** Size of the trigger */
  size?: Size
  /** Visual variant - supports floating variants for TextField mode */
  variant?: TextFieldVariant
  /** Accent color */
  color?: Color
  /** Border radius (for floating variants) */
  radius?: Radius
  /** Additional class names for the trigger */
  className?: string
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Number of months to display (1 = single calendar, 2 = side by side) */
  numberOfMonths?: 1 | 2
  /** Show range summary inside popover */
  showRangeSummary?: boolean
  /** ID for form association */
  id?: string
  /** Name for form submission */
  name?: string
}

/**
 * DateRangePicker component for selecting a date range.
 * Supports single or dual calendar view.
 *
 * @example
 * ```tsx
 * import { DateRangePicker, type DateRange } from "@/form";
 *
 * const [range, setRange] = React.useState<DateRange>();
 *
 * // Standard dual calendar
 * <DateRangePicker
 *   value={range}
 *   onChange={setRange}
 *   placeholder="Select date range"
 * />
 *
 * // Single calendar with range summary
 * <DateRangePicker
 *   value={range}
 *   onChange={setRange}
 *   numberOfMonths={1}
 *   showRangeSummary
 * />
 * ```
 */
/** DateRangePicker export. */
export const DateRangePicker = React.forwardRef<HTMLButtonElement | HTMLInputElement, DateRangePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = 'Pick a date range',
      dateFormat = 'LLL dd, y',
      disabled = false,
      size: sizeProp,
      variant: variantProp,
      color,
      radius = 'md',
      className,
      minDate,
      maxDate,
      numberOfMonths = 2,
      showRangeSummary = false,
      id,
      name,
    },
    ref,
  ) => {
    const fieldGroup = useFieldGroup()
    const variant = variantProp ?? fieldGroup.variant ?? 'outline'
    const size = sizeProp ?? fieldGroup.size
    const useTextField = isFloatingVariant(variant)
    const [open, setOpen] = React.useState(false)
    const [month, setMonth] = React.useState<Date | undefined>(value?.from)

    // Update month when value changes
    React.useEffect(() => {
      if (value?.from) {
        setMonth(value.from)
      }
    }, [value?.from])

    // Build disabled matcher for react-day-picker
    const disabledMatcher = React.useMemo(() => {
      const matchers: Array<{ before: Date } | { after: Date }> = []

      if (minDate) {
        matchers.push({ before: minDate })
      }
      if (maxDate) {
        matchers.push({ after: maxDate })
      }

      return matchers.length > 0 ? matchers : undefined
    }, [minDate, maxDate])

    const formatDateRange = () => {
      if (!value?.from) {
        return <span>{placeholder}</span>
      }

      if (value.to) {
        return (
          <>
            {format(value.from, dateFormat)} - {format(value.to, dateFormat)}
          </>
        )
      }

      return format(value.from, dateFormat)
    }

    const formatRangeSummary = () => {
      if (!value?.from) {
        return 'Select dates'
      }

      const shortFormat = 'M/d/yyyy'
      if (value.to) {
        return `${format(value.from, shortFormat)} - ${format(value.to, shortFormat)}`
      }

      return format(value.from, shortFormat)
    }

    // Format display value for TextField mode
    const formatDisplayValue = (): string => {
      if (!value?.from) return ''
      if (value.to) {
        return `${format(value.from, dateFormat)} - ${format(value.to, dateFormat)}`
      }
      return format(value.from, dateFormat)
    }

    // Trigger button for TextField mode
    const textFieldTrigger = (
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(true)}
        className="pointer-events-auto cursor-pointer hover:text-foreground disabled:cursor-not-allowed"
        aria-label="Open date range picker"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <CalendarIcon className="h-4 w-4" />
      </button>
    )

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        {name && (
          <>
            <input type="hidden" name={`${name}_from`} value={value?.from ? value.from.toISOString() : ''} />
            <input type="hidden" name={`${name}_to`} value={value?.to ? value.to.toISOString() : ''} />
          </>
        )}
        {useTextField ? (
          <div className={cn('relative w-full', className)}>
            <TextField
              ref={ref as React.Ref<HTMLInputElement>}
              id={id}
              value={formatDisplayValue()}
              placeholder={placeholder}
              disabled={disabled}
              readOnly
              onClick={() => !disabled && setOpen(true)}
              size={size}
              variant={variant}
              color={color}
              radius={radius}
              rightElement={textFieldTrigger}
              className="cursor-pointer"
            />
          </div>
        ) : (
          <Popover.Trigger>
            <Button
              ref={ref as React.Ref<HTMLButtonElement>}
              id={id}
              variant={toButtonVariant(variant)}
              color={color}
              size={size}
              disabled={disabled}
              className={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground', className)}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatDateRange()}
            </Button>
          </Popover.Trigger>
        )}
        <Popover.Content align="start" maxWidth="none" className="w-auto p-0">
          <div className="flex flex-col">
            <Calendar
              mode="range"
              defaultMonth={value?.from}
              month={month}
              onMonthChange={setMonth}
              selected={value}
              onSelect={onChange}
              numberOfMonths={numberOfMonths}
              disabled={disabledMatcher}
              selectionVariant={getCalendarVariant(variant)}
              color={color}
              autoFocus
            />
            {showRangeSummary && (
              <div className="border-t border-border p-3">
                <div
                  className={cn(
                    'flex items-center justify-between',
                    'rounded-md border border-input bg-background px-3 py-2',
                    'text-sm',
                  )}
                >
                  <span className={!value?.from ? 'text-muted-foreground' : ''}>{formatRangeSummary()}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </Popover.Content>
      </Popover.Root>
    )
  },
)

DateRangePicker.displayName = 'DateRangePicker'
