'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
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

function buildMonthOptions(localeCode: string): WheelPickerOption<number>[] {
  const formatter = new Intl.DateTimeFormat(localeCode, { month: 'long' })
  return Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: formatter.format(new Date(2000, i, 1)),
  }))
}

function buildYearOptions(startYear: number, endYear: number): WheelPickerOption<number>[] {
  const options: WheelPickerOption<number>[] = []
  for (let y = startYear; y <= endYear; y++) {
    options.push({ value: y, label: String(y) })
  }
  return options
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
  const titleRef = React.useRef<HTMLSpanElement>(null)
  const overlayRef = React.useRef<HTMLDivElement>(null)

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

  const monthOptions = React.useMemo(() => buildMonthOptions(localeCode), [localeCode])
  const yearOptions = React.useMemo(() => buildYearOptions(startYear, endYear), [startYear, endYear])

  const handleTitleClick = () => {
    if (!onMonthYearChange) return
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
      setSelectedMonth(value)
      onMonthYearChange?.(new Date(selectedYear, value, 1))
    },
    [selectedYear, onMonthYearChange],
  )

  const handleYearChange = React.useCallback(
    (value: number) => {
      setSelectedYear(value)
      onMonthYearChange?.(new Date(value, selectedMonth, 1))
    },
    [selectedMonth, onMonthYearChange],
  )

  return (
    <div className={cn('flex h-(--cell-size) items-center justify-between gap-2', className)}>
      <span
        ref={titleRef}
        role="button"
        tabIndex={onMonthYearChange ? 0 : undefined}
        onClick={handleTitleClick}
        onKeyDown={e => {
          if (onMonthYearChange && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            handleTitleClick()
          }
        }}
        className={cn(
          'truncate text-sm font-medium select-none',
          onMonthYearChange && 'cursor-pointer',
          titleClassName,
        )}
      >
        {title}
      </span>
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
              }}
              onClick={() => setPickerOpen(false)}
              onKeyDown={e => {
                if (e.key === 'Escape') setPickerOpen(false)
              }}
            />
            <div
              ref={overlayRef}
              style={{
                position: 'fixed',
                zIndex: 99999,
                top: portalPos.top,
                left: portalPos.left,
                width: 288,
                borderRadius: 12,
                boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                border: '1px solid #e4e4e7',
                background: '#fff',
                overflow: 'hidden',
                padding: '0 4px',
              }}
            >
              <WheelPickerWrapper className="!w-full !border-0 !shadow-none !rounded-none">
                <WheelPicker<number> options={monthOptions} value={selectedMonth} onValueChange={handleMonthChange} />
                <WheelPicker<number> options={yearOptions} value={selectedYear} onValueChange={handleYearChange} />
              </WheelPickerWrapper>
            </div>
          </>,
          document.body,
        )}
    </div>
  )
}
