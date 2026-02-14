'use client'

import { format } from 'date-fns'
import { CircleCheckIcon } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/elements/Button'
import { ScrollArea } from '@/elements/ScrollArea'
import type { Color } from '@/elements/tokens'
import { cn } from '@/lib/utils'
import { Calendar, type CalendarSize, resolveCalendarColors } from './Calendar'

const appointmentSizeTokens: Record<
  CalendarSize,
  {
    titleClass: string
    calendarPadding: string
    buttonSize: '1' | '2'
    buttonGap: string
    slotPadding: string
    footerPadding: string
    footerTextClass: string
    iconSize: string
    defaultSlotWidth: string
    defaultSlotHeight: string
  }
> = {
  '1': {
    titleClass: 'text-sm font-semibold',
    calendarPadding: 'px-2 py-3',
    buttonSize: '2',
    buttonGap: '0.25rem',
    slotPadding: 'p-1',
    footerPadding: 'px-3 py-3',
    footerTextClass: 'text-xs',
    iconSize: '0.75rem',
    defaultSlotWidth: '6rem',
    defaultSlotHeight: '200px',
  },
  '2': {
    titleClass: 'text-lg font-semibold',
    calendarPadding: 'px-4 py-5',
    buttonSize: '2',
    buttonGap: '0.5rem',
    slotPadding: 'p-2',
    footerPadding: 'px-6 py-5',
    footerTextClass: 'text-base',
    iconSize: '1rem',
    defaultSlotWidth: '8rem',
    defaultSlotHeight: '200px',
  },
}

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
  /** Width of the time slots panel */
  timeSlotWidth?: string
  /** Height of the time slots scroll area */
  timeSlotHeight?: string
  /** Calendar color token */
  calendarColor?: Color
  /** Size of the appointment picker (1=small, 2=medium) */
  size?: CalendarSize
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
      timeSlotWidth,
      timeSlotHeight,
      calendarColor = 'primary',
      size = '1',
    },
    ref,
  ) => {
    const sizeTokens = appointmentSizeTokens[size]
    const resolvedSlotWidth = timeSlotWidth ?? sizeTokens.defaultSlotWidth
    const resolvedSlotHeight = timeSlotHeight ?? sizeTokens.defaultSlotHeight
    const resolvedColors = React.useMemo(() => resolveCalendarColors(calendarColor), [calendarColor])

    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value?.date)
    const [selectedTime, setSelectedTime] = React.useState<string | undefined>(value?.time)
    const [month, setMonth] = React.useState<Date | undefined>(value?.date ?? new Date())

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
        className={cn('w-min rounded-lg border bg-background', disabled && 'opacity-50 pointer-events-none', className)}
        style={
          {
            '--rdp-accent-color': resolvedColors.accent,
            '--rdp-accent-background-color': resolvedColors.soft,
            '--cal-accent-foreground': resolvedColors.foreground,
          } as React.CSSProperties
        }
      >
        {title && (
          <div className={cn('flex justify-center border-b', sizeTokens.footerPadding)}>
            <h3 className={sizeTokens.titleClass}>{title}</h3>
          </div>
        )}

        <div className="flex" style={{ gap: '0.5rem' }}>
          <div className={cn('shrink-0', sizeTokens.calendarPadding)}>
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
              size={size}
              className="bg-transparent p-0"
            />
          </div>
          <div className="shrink-0 border-l" style={{ width: resolvedSlotWidth }}>
            <ScrollArea style={{ height: resolvedSlotHeight }}>
              <div className={sizeTokens.slotPadding}>
                {availableSlots.map(slot => {
                  const isSelected = selectedTime === slot.time
                  const isDisabled = slot.available === false

                  return (
                    <Button
                      key={slot.time}
                      onClick={() => !isDisabled && handleTimeSelect(slot.time)}
                      disabled={disabled || isDisabled || !selectedDate}
                      variant={isSelected ? 'solid' : 'outline'}
                      size={sizeTokens.buttonSize}
                      color={isSelected ? calendarColor : undefined}
                      className={cn(
                        'w-full shadow-none',
                        !isSelected && 'hover:!bg-[var(--rdp-accent-background-color)] hover:!text-foreground',
                        isDisabled && 'line-through opacity-50 cursor-not-allowed',
                        !selectedDate && 'opacity-50 cursor-not-allowed',
                      )}
                      style={{ display: 'flex', marginBottom: sizeTokens.buttonGap }}
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
          <div className={cn('flex flex-col gap-4 border-t md:flex-row', sizeTokens.footerPadding)}>
            {showConfirmation && (
              <div className="flex flex-1 items-center gap-2">
                {isComplete && (
                  <>
                    <CircleCheckIcon
                      style={{
                        width: sizeTokens.iconSize,
                        height: sizeTokens.iconSize,
                        color: 'var(--color-success-primary)',
                        marginRight: '0.5rem',
                        flexShrink: 0,
                      }}
                    />
                    <span className={sizeTokens.footerTextClass}>{getConfirmationMessage()}</span>
                  </>
                )}
              </div>
            )}
            {showConfirmButton && (
              <Button
                variant="outline"
                size={sizeTokens.buttonSize}
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
