'use client'

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import * as React from 'react'
import { createPortal } from 'react-dom'
import type { Color, Radius } from '@/elements/tokens'
import type { WheelPickerOption } from '@/elements/wheel-picker/wheel-picker'
import { WheelPicker, WheelPickerWrapper } from '@/elements/wheel-picker/wheel-picker'
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
  displayedMonth?: Date
  onMonthYearChange?: (date: Date) => void
  localeCode?: string
  startMonth?: Date
  endMonth?: Date
}

function buildMonthOptions(
  localeCode: string,
  year: number,
  startMonth?: Date,
  endMonth?: Date,
): WheelPickerOption<number>[] {
  const formatter = new Intl.DateTimeFormat(localeCode, { month: 'long' })
  const minMonth = startMonth && year === startMonth.getFullYear() ? startMonth.getMonth() : 0
  const maxMonth = endMonth && year === endMonth.getFullYear() ? endMonth.getMonth() : 11

  return Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: formatter.format(new Date(2000, i, 1)),
    disabled: i < minMonth || i > maxMonth,
  }))
}

function buildYearOptions(startYear: number, endYear: number): WheelPickerOption<number>[] {
  const options: WheelPickerOption<number>[] = []
  for (let y = startYear; y <= endYear; y++) {
    options.push({ value: y, label: String(y) })
  }
  return options
}

function clampMonth(month: number, year: number, startMonth?: Date, endMonth?: Date): number {
  if (startMonth && year === startMonth.getFullYear() && month < startMonth.getMonth()) {
    return startMonth.getMonth()
  }
  if (endMonth && year === endMonth.getFullYear() && month > endMonth.getMonth()) {
    return endMonth.getMonth()
  }
  return month
}

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
  displayedMonth,
  onMonthYearChange,
  localeCode = 'en-US',
  startMonth,
  endMonth,
}: CalendarHeaderProps) {
  const fallbackPrevIcon = <ChevronLeftIcon className="!text-current !opacity-100" width={14} height={14} />
  const fallbackNextIcon = <ChevronRightIcon className="!text-current !opacity-100" width={14} height={14} />

  const [pickerOpen, setPickerOpen] = React.useState(false)
  const [portalPos, setPortalPos] = React.useState({ top: 0, left: 0 })
  const titleRef = React.useRef<HTMLElement>(null)
  const overlayRef = React.useRef<HTMLDivElement>(null)
  const pickerDialogId = React.useId()
  const hasMonthYearPicker = Boolean(onMonthYearChange)

  const currentMonth = displayedMonth?.getMonth() ?? new Date().getMonth()
  const currentYear = displayedMonth?.getFullYear() ?? new Date().getFullYear()

  const [selectedMonth, setSelectedMonth] = React.useState(currentMonth)
  const [selectedYear, setSelectedYear] = React.useState(currentYear)

  React.useEffect(() => {
    setSelectedMonth(currentMonth)
    setSelectedYear(currentYear)
  }, [currentMonth, currentYear])

  const startYear = startMonth?.getFullYear() ?? currentYear - 100
  const endYear = endMonth?.getFullYear() ?? currentYear + 100

  const monthOptions = React.useMemo(
    () => buildMonthOptions(localeCode, selectedYear, startMonth, endMonth),
    [localeCode, selectedYear, startMonth, endMonth],
  )
  const yearOptions = React.useMemo(() => buildYearOptions(startYear, endYear), [startYear, endYear])

  React.useEffect(() => {
    if (!pickerOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPickerOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [pickerOpen])

  React.useEffect(() => {
    if (pickerOpen) {
      overlayRef.current?.focus()
    }
  }, [pickerOpen])

  const handleTitleClick = () => {
    if (!hasMonthYearPicker) return
    if (pickerOpen) {
      setPickerOpen(false)
      return
    }
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect()
      setPortalPos({ top: rect.bottom + 4, left: rect.left })
    }
    setPickerOpen(true)
  }

  const handleMonthChange = React.useCallback(
    (value: number) => {
      const clampedMonth = clampMonth(value, selectedYear, startMonth, endMonth)
      setSelectedMonth(clampedMonth)
      onMonthYearChange?.(new Date(selectedYear, clampedMonth, 1))
    },
    [selectedYear, onMonthYearChange, startMonth, endMonth],
  )

  const handleYearChange = React.useCallback(
    (value: number) => {
      setSelectedYear(value)
      const clampedMonth = clampMonth(selectedMonth, value, startMonth, endMonth)
      setSelectedMonth(clampedMonth)
      onMonthYearChange?.(new Date(value, clampedMonth, 1))
    },
    [selectedMonth, onMonthYearChange, startMonth, endMonth],
  )

  return (
    <div className={cn('flex h-(--cell-size) items-center justify-between gap-2', className)}>
      {hasMonthYearPicker ? (
        <button
          ref={node => {
            titleRef.current = node
          }}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={pickerOpen}
          aria-controls={pickerOpen ? pickerDialogId : undefined}
          onClick={handleTitleClick}
          className={cn(
            'inline-flex items-center gap-1 truncate text-sm font-medium select-none',
            'cursor-pointer transition-colors hover:text-foreground/60',
            'appearance-none border-0 bg-transparent p-0 m-0 text-inherit text-left font-inherit',
            titleClassName,
          )}
        >
          {title}
          <ChevronDownIcon
            className={cn('shrink-0 transition-transform', pickerOpen && 'rotate-180')}
            width={14}
            height={14}
          />
        </button>
      ) : (
        <span
          ref={node => {
            titleRef.current = node
          }}
          className={cn('truncate text-sm font-medium', titleClassName)}
        >
          {title}
        </span>
      )}
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
      {pickerOpen &&
        createPortal(
          <>
            <div
              role="button"
              tabIndex={-1}
              aria-label="Close picker"
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99998,
                background: 'transparent',
                border: 'none',
                cursor: 'default',
              }}
              onClick={() => setPickerOpen(false)}
              onKeyDown={e => {
                if (e.key === 'Escape') setPickerOpen(false)
              }}
            />
            <div
              ref={overlayRef}
              id={pickerDialogId}
              role="dialog"
              aria-label="Select month and year"
              aria-modal="true"
              tabIndex={-1}
              style={{
                position: 'fixed',
                zIndex: 99999,
                top: portalPos.top,
                left: portalPos.left,
                width: 'var(--calendar-header-picker-width, 200px)',
                borderRadius: 'var(--calendar-header-picker-radius, 12px)',
                boxShadow: 'var(--calendar-header-picker-shadow, 0 4px 24px rgba(0,0,0,0.15))',
                border:
                  'var(--calendar-header-picker-border-width, 1px) solid var(--calendar-header-picker-border-color, #e4e4e7)',
                background: 'var(--calendar-header-picker-bg, #fff)',
                overflow: 'hidden',
                padding: 'var(--calendar-header-picker-padding, 0 4px)',
              }}
            >
              <WheelPickerWrapper className="!w-full !border-0 !shadow-none !rounded-none">
                <WheelPicker<number>
                  options={monthOptions}
                  value={selectedMonth}
                  onValueChange={handleMonthChange}
                  classNames={{
                    highlightItem: '!text-[0.875rem]',
                    highlightWrapper: '!text-[0.875rem] !font-semibold !text-primary',
                  }}
                />
                <WheelPicker<number>
                  options={yearOptions}
                  value={selectedYear}
                  onValueChange={handleYearChange}
                  classNames={{
                    highlightItem: '!text-[0.875rem]',
                    highlightWrapper: '!text-[0.875rem] !font-semibold !text-primary',
                  }}
                />
              </WheelPickerWrapper>
            </div>
          </>,
          document.body,
        )}
    </div>
  )
}
