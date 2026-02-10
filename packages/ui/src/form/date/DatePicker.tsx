'use client'

import { parseDate } from 'chrono-node'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/elements/Button'
import { Popover } from '@/elements/Popover'
import type { Color, Radius, Size, TextFieldVariant, Variant } from '@/elements/tokens'
import { cn } from '@/lib/utils'
import { useFieldGroup } from '../FieldGroupContext'
import { TextField } from '../TextField'
import { Calendar } from './Calendar'

/** Check if variant is a floating type */
const isFloatingVariant = (variant?: string): boolean => variant?.startsWith('floating-') ?? false

/** Map TextFieldVariant to Button Variant */
const toButtonVariant = (variant?: TextFieldVariant): Variant => {
  if (!variant || variant.startsWith('floating-')) return 'outline'
  return variant as Variant
}

export interface DatePickerProps {
  /** Selected date */
  value?: Date
  /** Callback when date changes */
  onChange?: (date: Date | undefined) => void
  /** Placeholder text when no date selected */
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
  /** Border radius */
  radius?: Radius
  /** Additional class names for the trigger */
  className?: string
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Dates that should be disabled */
  disabledDates?: Date[]
  /** ID for form association */
  id?: string
  /** Name for form submission */
  name?: string
  /** Enable natural language input (e.g., "tomorrow", "next week") */
  enableNaturalLanguage?: boolean
}

/**
 * DatePicker component combining Calendar with Popover.
 * Supports natural language input when enableNaturalLanguage is true.
 *
 * @example
 * ```tsx
 * import { DatePicker } from "@/form";
 *
 * const [date, setDate] = React.useState<Date>();
 *
 * // Standard picker
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   placeholder="Select a date"
 * />
 *
 * // With natural language input
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   enableNaturalLanguage
 *   placeholder="Tomorrow or next week"
 * />
 * ```
 */
/** DatePicker export. */
export const DatePicker = React.forwardRef<HTMLButtonElement | HTMLInputElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = 'Pick a date',
      dateFormat = 'PPP',
      disabled = false,
      size: sizeProp,
      variant: variantProp,
      color,
      radius = 'md',
      className,
      minDate,
      maxDate,
      disabledDates,
      id,
      name,
      enableNaturalLanguage = false,
    },
    ref,
  ) => {
    const fieldGroup = useFieldGroup()
    const variant = variantProp ?? fieldGroup.variant ?? 'outline'
    const size = sizeProp ?? fieldGroup.size
    // Use TextField mode if floating variant or natural language enabled
    const useTextField = isFloatingVariant(variant) || enableNaturalLanguage

    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState('')
    const [month, setMonth] = React.useState<Date | undefined>(value)

    // Sync input value with date value
    React.useEffect(() => {
      if (value && !open) {
        setInputValue(format(value, dateFormat))
      }
    }, [value, dateFormat, open])

    // Update month when value changes
    React.useEffect(() => {
      if (value) {
        setMonth(value)
      }
    }, [value])

    const handleSelect = (date: Date | undefined) => {
      onChange?.(date)
      if (date) {
        setInputValue(format(date, dateFormat))
      }
      setOpen(false)
    }

    // Check if a date is allowed based on constraints
    const isDateAllowed = React.useCallback(
      (date: Date) => {
        if (minDate && date < minDate) return false
        if (maxDate && date > maxDate) return false
        if (disabledDates?.some(d => d.toDateString() === date.toDateString())) return false
        return true
      },
      [minDate, maxDate, disabledDates],
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)

      // Try to parse natural language
      const parsed = parseDate(newValue)
      if (parsed && isDateAllowed(parsed)) {
        onChange?.(parsed)
        setMonth(parsed)
      }
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setOpen(true)
      }
    }

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

    // Trigger button for TextField mode
    const textFieldTrigger = (
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(true)}
        className="pointer-events-auto cursor-pointer hover:text-foreground disabled:cursor-not-allowed"
        aria-label="Open date picker"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <CalendarIcon className="h-4 w-4" />
      </button>
    )

    // TextField mode (floating variants or natural language)
    if (useTextField) {
      return (
        <Popover.Root open={open} onOpenChange={setOpen}>
          {name && <input type="hidden" name={name} value={value ? value.toISOString() : ''} />}
          <div className={cn('relative w-full', className)}>
            <TextField
              ref={ref as React.Ref<HTMLInputElement>}
              id={id}
              value={enableNaturalLanguage ? inputValue : value ? format(value, dateFormat) : ''}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={!enableNaturalLanguage}
              onClick={!enableNaturalLanguage ? () => !disabled && setOpen(true) : undefined}
              onChange={enableNaturalLanguage ? handleInputChange : undefined}
              onKeyDown={enableNaturalLanguage ? handleInputKeyDown : undefined}
              size={size}
              variant={variant}
              color={color}
              radius={radius}
              rightElement={textFieldTrigger}
              className={!enableNaturalLanguage ? 'cursor-pointer' : undefined}
            />
          </div>
          <Popover.Content align="end" sideOffset={10} className="w-auto p-0">
            <Calendar
              mode="single"
              selected={value}
              month={month}
              onMonthChange={setMonth}
              onSelect={handleSelect}
              disabled={disabledMatcher}
              color={color}
              autoFocus
            />
          </Popover.Content>
        </Popover.Root>
      )
    }

    // Standard button mode
    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        {name && <input type="hidden" name={name} value={value ? value.toISOString() : ''} />}
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
            {value ? format(value, dateFormat) : <span>{placeholder}</span>}
          </Button>
        </Popover.Trigger>
        <Popover.Content align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            disabled={disabledMatcher}
            color={color}
            autoFocus
          />
        </Popover.Content>
      </Popover.Root>
    )
  },
)

DatePicker.displayName = 'DatePicker'
