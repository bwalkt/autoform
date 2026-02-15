'use client'

import { format } from 'date-fns'
import * as React from 'react'
import { Grid } from '@/layouts'
import { cn } from '@/lib/utils'
import { buildMonthCells, type DayPickerCoreMatcher, isCoreDateDisabled, toMonthMatrix } from './day-picker-core'

export interface DayPickerCoreProps {
  month?: Date
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  showOutsideDays?: boolean
  showCaption?: boolean
  weekdayLabelFormatter?: (date: Date) => string
  selected?: Date
  required?: boolean
  min?: Date
  max?: Date
  disabled?: DayPickerCoreMatcher | DayPickerCoreMatcher[]
  onSelect?: (date: Date | undefined) => void
  className?: string
  style?: React.CSSProperties
}

export function DayPickerCore({
  month = new Date(),
  weekStartsOn = 0,
  showOutsideDays = true,
  showCaption = true,
  weekdayLabelFormatter,
  selected,
  required = false,
  min,
  max,
  disabled,
  onSelect,
  className,
  style,
}: DayPickerCoreProps) {
  const cells = React.useMemo(() => buildMonthCells(month, weekStartsOn), [month, weekStartsOn])
  const matrix = React.useMemo(() => toMonthMatrix(cells), [cells])

  const weekdayStart = React.useMemo(() => {
    const base = new Date(2024, 0, 7)
    const result: string[] = []
    for (let i = 0; i < 7; i++) {
      const offset = (weekStartsOn + i) % 7
      const date = new Date(base.getFullYear(), base.getMonth(), base.getDate() + offset)
      result.push(weekdayLabelFormatter ? weekdayLabelFormatter(date) : format(date, 'EEE'))
    }
    return result
  }, [weekStartsOn, weekdayLabelFormatter])
  const today = React.useMemo(() => new Date(), [])

  return (
    <div className={cn('inline-block rounded-[var(--cal-radius)] border bg-background p-3', className)} style={style}>
      {showCaption ? (
        <h2 className="mb-2 text-center font-semibold" style={{ fontSize: 'var(--cal-header-font-size)' }}>
          {format(month, 'MMMM yyyy')}
        </h2>
      ) : null}
      <Grid
        as="div"
        columns="repeat(7, var(--cell-size))"
        gap="1"
        className="m-0 mx-auto w-max p-0 text-center font-medium text-muted-foreground"
        style={{ fontSize: 'var(--cal-weekday-font-size)' }}
      >
        {weekdayStart.map((day, index) => (
          <div key={index} className="flex h-[var(--cell-size)] w-[var(--cell-size)] items-center justify-center">
            {day}
          </div>
        ))}
      </Grid>
      <Grid as="div" columns="repeat(7, var(--cell-size))" gap="1" className="m-0 mx-auto mt-2 w-max p-0 text-center">
        {matrix.flat().map(cell => {
          const isSelected =
            selected &&
            selected.getFullYear() === cell.date.getFullYear() &&
            selected.getMonth() === cell.date.getMonth() &&
            selected.getDate() === cell.date.getDate()
          const isDisabled = isCoreDateDisabled(cell.date, { min, max, disabled })
          const isToday =
            today.getFullYear() === cell.date.getFullYear() &&
            today.getMonth() === cell.date.getMonth() &&
            today.getDate() === cell.date.getDate()

          if (cell.outside && !showOutsideDays) {
            return (
              <div
                key={cell.date.toISOString()}
                className="flex h-[var(--cell-size)] w-[var(--cell-size)] items-center justify-center"
                aria-hidden="true"
              />
            )
          }

          return (
            <div
              key={cell.date.toISOString()}
              className="flex h-[var(--cell-size)] w-[var(--cell-size)] items-center justify-center"
            >
              <button
                type="button"
                disabled={isDisabled}
                aria-disabled={isDisabled}
                onClick={() => {
                  if (isDisabled) return
                  if (isSelected && !required) {
                    onSelect?.(undefined)
                    return
                  }
                  onSelect?.(cell.date)
                }}
                aria-label={format(cell.date, 'EEEE, MMMM d, yyyy')}
                style={{ fontSize: 'var(--cal-font-size)' }}
                className={cn(
                  'h-[var(--cell-size)] w-[var(--cell-size)] appearance-none rounded-[var(--cal-radius)] border-0 bg-transparent p-0 shadow-none transition-colors disabled:pointer-events-none disabled:opacity-50',
                  cell.outside ? 'text-muted-foreground/60' : 'text-foreground',
                  !isSelected && isToday && 'bg-[var(--rdp-accent-background-color)] text-foreground',
                  isSelected && 'bg-[var(--rdp-accent-color)] text-[var(--cal-accent-foreground)]',
                )}
              >
                {cell.date.getDate()}
              </button>
            </div>
          )
        })}
      </Grid>
    </div>
  )
}
