'use client'

import { format } from 'date-fns'
import { Check } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/elements/Button'
import { ScrollArea } from '@/elements/ScrollArea'
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
export const defaultTimeSlots: TimeSlot[] = [
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
  /** Available time slots */
  timeSlots?: TimeSlot[]
  /** Function to get available slots for a specific date */
  getTimeSlotsForDate?: (date: Date) => TimeSlot[]
  /** Callback when continue/confirm button is clicked */
  onConfirm?: (value: AppointmentValue) => void
  /** Text for the confirm button */
  confirmText?: string
  /** Whether to show the confirm button */
  showConfirmButton?: boolean
  /** Whether to show the confirmation message */
  showConfirmation?: boolean
  /** Custom confirmation message format */
  formatConfirmation?: (value: AppointmentValue) => string
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
export const AppointmentPicker = React.forwardRef<HTMLDivElement, AppointmentPickerProps>(
  (
    {
      value,
      onChange,
      title = 'Book your appointment',
      timeSlots,
      getTimeSlotsForDate,
      onConfirm,
      confirmText = 'Continue',
      showConfirmButton = true,
      showConfirmation = true,
      formatConfirmation,
      className,
      disabled = false,
      minDate,
      maxDate,
      disabledDates,
      timeSlotHeight = '320px',
    },
    ref,
  ) => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value?.date)
    const [selectedTime, setSelectedTime] = React.useState<string | undefined>(value?.time)
    const [month, setMonth] = React.useState<Date | undefined>(value?.date)

    // Update internal state when value changes
    React.useEffect(() => {
      if (value?.date) {
        setSelectedDate(value.date)
        setMonth(value.date)
      } else {
        setSelectedDate(undefined)
      }
      if (value?.time) {
        setSelectedTime(value.time)
      } else {
        setSelectedTime(undefined)
      }
    }, [value?.date, value?.time])

    // Get time slots for the selected date
    const availableSlots = React.useMemo(() => {
      if (getTimeSlotsForDate && selectedDate) {
        return getTimeSlotsForDate(selectedDate)
      }
      return timeSlots ?? defaultTimeSlots
    }, [selectedDate, timeSlots, getTimeSlotsForDate])

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

      if (formatConfirmation) {
        return formatConfirmation({ date: selectedDate, time: selectedTime })
      }

      return `Your meeting is booked for ${format(selectedDate, 'EEEE, MMMM d')} at ${selectedTime}.`
    }

    const isComplete = selectedDate && selectedTime

    return (
      <div
        ref={ref}
        className={cn('rounded-lg border bg-background', disabled && 'opacity-50 pointer-events-none', className)}
      >
        {title && (
          <div className="border-b px-6 py-4">
            <h3 className="text-lg font-semibold text-center">{title}</h3>
          </div>
        )}

        <div className="flex">
          {/* Calendar */}
          <div className="border-r p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              month={month}
              onMonthChange={setMonth}
              disabled={disabledMatcher}
            />
          </div>

          {/* Time Slots */}
          <div className="flex-1 p-4">
            <ScrollArea className="pr-4" style={{ height: timeSlotHeight }}>
              <div className="flex flex-col gap-2">
                {availableSlots.map(slot => {
                  const isSelected = selectedTime === slot.time
                  const isDisabled = slot.available === false

                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => !isDisabled && handleTimeSelect(slot.time)}
                      disabled={disabled || isDisabled || !selectedDate}
                      className={cn(
                        'px-4 py-3 text-sm font-medium rounded-lg border transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        isSelected
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background hover:bg-accent hover:text-accent-foreground border-input',
                        isDisabled && 'opacity-50 cursor-not-allowed line-through',
                        !selectedDate && 'opacity-50 cursor-not-allowed',
                      )}
                    >
                      {slot.label ?? slot.time}
                    </button>
                  )
                })}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Footer with confirmation and button */}
        {(showConfirmation || showConfirmButton) && (
          <div className="border-t px-6 py-4 flex items-center justify-between gap-4">
            {showConfirmation && (
              <div className="flex items-center gap-2 flex-1">
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
              <Button variant="outline" size="2" onClick={handleConfirm} disabled={disabled || !isComplete}>
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
