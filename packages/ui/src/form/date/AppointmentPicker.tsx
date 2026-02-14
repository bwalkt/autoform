'use client'

import { format } from 'date-fns'
import { Check } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/elements/Button'
import { ScrollArea } from '@/elements/ScrollArea'
import { type Color, designTokens } from '@/elements/tokens'
import { cn } from '@/lib/utils'
import { Calendar } from './Calendar'

export interface TimeSlot {
  /** Time value (e.g., "09:00", "09:15") */
  time: string
  /** Display label (defaults to time if not provided) */
  label?: string
  /** Whether the slot is available */
  available?: boolean
}

export interface AppointmentValue {
  /** Selected date */
  date: Date
  /** Selected time slot */
  time: string
}

/** Default time slots (15-minute intervals from 9am to 5pm) */
export const defaultTimeSlotsList: TimeSlot[] = [
  { time: '09:00', available: true },
  { time: '09:15', available: true },
  { time: '09:30', available: true },
  { time: '09:45', available: true },
  { time: '10:00', available: true },
  { time: '10:15', available: true },
  { time: '10:30', available: true },
  { time: '10:45', available: true },
  { time: '11:00', available: true },
  { time: '11:15', available: true },
  { time: '11:30', available: true },
  { time: '11:45', available: true },
  { time: '12:00', available: true },
  { time: '12:15', available: true },
  { time: '12:30', available: true },
  { time: '12:45', available: true },
  { time: '13:00', available: true },
  { time: '13:15', available: true },
  { time: '13:30', available: true },
  { time: '13:45', available: true },
  { time: '14:00', available: true },
  { time: '14:15', available: true },
  { time: '14:30', available: true },
  { time: '14:45', available: true },
  { time: '15:00', available: true },
  { time: '15:15', available: true },
  { time: '15:30', available: true },
  { time: '15:45', available: true },
  { time: '16:00', available: true },
  { time: '16:15', available: true },
  { time: '16:30', available: true },
  { time: '16:45', available: true },
]

export interface AppointmentPickerProps {
  /** Selected appointment value */
  value?: AppointmentValue
  /** Callback when appointment changes */
  onChange?: (value: AppointmentValue | undefined) => void
  /** Title displayed at the top */
  title?: string
  /** Available time slots for each day */
  getAvailableTimeSlots?: (date: Date) => TimeSlot[]
  /** Fallback slots used when getAvailableTimeSlots is not provided */
  defaultTimeSlots?: TimeSlot[]
  /** Meeting duration in minutes */
  meetingDurationMinutes?: number
  /** Callback when continue/confirm button is clicked */
  onConfirm?: (value: AppointmentValue) => void
  /** Text for the confirm button */
  confirmText?: string
  /** Whether to show the confirm button */
  showConfirmButton?: boolean
  /** Whether to show the confirmation message */
  showConfirmation?: boolean
  /** Custom booking message */
  bookingMessage?: (value: AppointmentValue, durationMinutes: number) => string
  /** Additional class names */
  className?: string
  /** Whether the picker is disabled */
  disabled?: boolean
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Dates to disable */
  disabledDates?: Date[]
  /** Height of the time slots container */
  timeSlotHeight?: string
  /** Calendar color token */
  calendarColor?: Color
}

/**
 * AppointmentPicker - A calendar with time slot selection for booking appointments.
 * Shows calendar on the left and available time slots on the right.
 *
 * @example
 * ```tsx
 * import { AppointmentPicker, type AppointmentValue } from "@/form";
 *
 * const [appointment, setAppointment] = React.useState<AppointmentValue>();
 *
 * <AppointmentPicker
 *   value={appointment}
 *   onChange={setAppointment}
 *   title="Book your appointment"
 *   onConfirm={(value) => console.log("Booked:", value)}
 * />
 * ```
 */
/** AppointmentPicker export. */
export const AppointmentPicker = React.forwardRef<HTMLDivElement, AppointmentPickerProps>(
  (
    {
      value,
      onChange,
      title = 'Book your appointment',
      getAvailableTimeSlots,
      defaultTimeSlots,
      meetingDurationMinutes = 60,
      onConfirm,
      confirmText = 'Continue',
      showConfirmButton = true,
      showConfirmation = true,
      bookingMessage,
      className,
      disabled = false,
      minDate,
      maxDate,
      disabledDates,
      timeSlotHeight = '200px',
      calendarColor = 'primary',
    },
    ref,
  ) => {
    const resolvedSlotColors = React.useMemo(() => {
      if (calendarColor === 'default') {
        return {
          accent: 'var(--accent)',
          soft: 'color-mix(in oklab, var(--accent) 18%, transparent)',
          foreground: 'var(--accent-foreground)',
        }
      }
      if (calendarColor === 'primary') {
        return {
          accent: 'var(--primary)',
          soft: 'color-mix(in oklab, var(--primary) 18%, transparent)',
          foreground: 'var(--primary-foreground)',
        }
      }
      const token = designTokens.color[calendarColor]
      return {
        accent: token.primary,
        soft: token.primaryAlpha,
        foreground: token.text,
      }
    }, [calendarColor])

    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value?.date ?? new Date())
    const [selectedTime, setSelectedTime] = React.useState<string | undefined>(value?.time)
    const [month, setMonth] = React.useState<Date | undefined>(value?.date ?? new Date())

    // Update internal state when value changes
    React.useEffect(() => {
      if (value?.date) {
        setSelectedDate(value.date)
        setMonth(value.date)
      } else if (value !== undefined) {
        setSelectedDate(undefined)
      }
      if (value?.time) {
        setSelectedTime(value.time)
      } else if (value !== undefined) {
        setSelectedTime(undefined)
      }
    }, [value])

    // Get time slots for the selected date
    const availableSlots = React.useMemo(() => {
      if (getAvailableTimeSlots && selectedDate) {
        return getAvailableTimeSlots(selectedDate)
      }
      return defaultTimeSlots ?? defaultTimeSlotsList
    }, [selectedDate, defaultTimeSlots, getAvailableTimeSlots])

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

    const handleDateSelect = (date: Date | undefined) => {
      if (disabled || !date) return
      setSelectedDate(date)
      // Reset time when date changes
      setSelectedTime(undefined)
      onChange?.(undefined)
    }

    const handleTimeSelect = (time: string) => {
      if (disabled || !selectedDate) return
      setSelectedTime(time)
      onChange?.({ date: selectedDate, time })
    }

    const handleConfirm = () => {
      if (selectedDate && selectedTime) {
        onConfirm?.({ date: selectedDate, time: selectedTime })
      }
    }

    const getConfirmationMessage = () => {
      if (!selectedDate || !selectedTime) return null

      if (bookingMessage) {
        return bookingMessage({ date: selectedDate, time: selectedTime }, meetingDurationMinutes)
      }

      return `Your meeting is booked for ${format(selectedDate, 'EEEE, MMMM d')} at ${selectedTime} (${meetingDurationMinutes} min).`
    }

    const isComplete = selectedDate && selectedTime

    return (
      <div
        ref={ref}
        className={cn('rounded-lg border bg-background', disabled && 'opacity-50 pointer-events-none', className)}
        style={
          {
            '--appt-accent': resolvedSlotColors.accent,
            '--appt-soft': resolvedSlotColors.soft,
            '--appt-foreground': resolvedSlotColors.foreground,
          } as React.CSSProperties
        }
      >
        {title && (
          <div className="border-b px-6 py-5">
            <h3 className="text-center text-3xl font-semibold tracking-tight">{title}</h3>
          </div>
        )}

        <div className="grid grid-cols-[max-content_3rem_8rem] justify-center p-0">
          {/* Calendar */}
          <div className="p-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              month={month}
              onMonthChange={setMonth}
              disabled={disabledMatcher}
              color={calendarColor}
              navButtonVariant="ghost"
              showMonthYearPicker={false}
              showOutsideDays={false}
              modifiers={{
                booked: disabledDates ?? [],
              }}
              modifiersClassNames={{
                booked: '[&>button]:line-through opacity-100',
              }}
              formatters={{
                formatWeekdayName: date => date.toLocaleString('en-US', { weekday: 'short' }),
              }}
              className="bg-transparent p-0 [--cell-size:--spacing(10)]"
            />
          </div>

          {/* Time Slots */}
          <div aria-hidden className="w-12" />

          <div className="flex flex-col border-l">
            <ScrollArea className="h-full" style={{ height: timeSlotHeight }}>
              <div className="flex flex-col gap-3 p-6">
                {availableSlots.map(slot => {
                  const isSelected = selectedTime === slot.time
                  const isDisabled = slot.available === false

                  return (
                    <Button
                      key={slot.time}
                      onClick={() => !isDisabled && handleTimeSelect(slot.time)}
                      disabled={disabled || isDisabled || !selectedDate}
                      variant="outline"
                      size="2"
                      className={cn(
                        'h-16 w-full rounded-sm px-3 py-3 text-base font-medium shadow-none transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                        isSelected
                          ? 'border-transparent bg-[var(--appt-accent)] text-[var(--appt-foreground)] hover:bg-[var(--appt-accent)] hover:text-[var(--appt-foreground)]'
                          : 'border-input bg-background text-foreground hover:border-transparent hover:bg-[var(--appt-soft)] hover:text-foreground',
                        isDisabled && 'line-through opacity-50 cursor-not-allowed',
                        !selectedDate && 'opacity-50 cursor-not-allowed',
                      )}
                    >
                      {slot.label ?? slot.time}
                    </Button>
                  )
                })}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Footer with confirmation and button */}
        {(showConfirmation || showConfirmButton) && (
          <div className="flex flex-col gap-4 border-t px-6 py-5 md:flex-row">
            {showConfirmation && (
              <div className="flex flex-1 items-center gap-2">
                {isComplete && (
                  <>
                    <div className="flex items-center justify-center h-5 w-5 rounded-full border-2 border-green-500 text-green-500">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-sm">{getConfirmationMessage()}</span>
                  </>
                )}
              </div>
            )}
            {showConfirmButton && (
              <Button
                variant="outline"
                size="2"
                onClick={handleConfirm}
                disabled={disabled || !isComplete}
                className="w-full md:ml-auto md:w-auto"
              >
                {confirmText}
              </Button>
            )}
          </div>
        )}
      </div>
    )
  },
)

AppointmentPicker.displayName = 'AppointmentPicker'
