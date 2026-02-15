'use client'

import { format } from 'date-fns'
import * as React from 'react'
import { Grid } from '@/layouts'
import { cn } from '@/lib/utils'
import { buildMonthCells, toMonthMatrix } from './day-picker-core'

export interface DayPickerCoreProps {
  month?: Date
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  showOutsideDays?: boolean
  showCaption?: boolean
  weekdayLabelFormatter?: (date: Date) => string
  selected?: Date
  onSelect?: (date: Date) => void
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
    <div className={cn('inline-block rounded-lg border bg-background p-3', className)} style={style}>
      {showCaption ? <h2 className="mb-2 text-center text-base font-semibold">{format(month, 'MMMM yyyy')}</h2> : null}
      <Grid
        as="div"
        columns="repeat(7, var(--cell-size))"
        gap="1"
        className="m-0 mx-auto w-max p-0 text-center text-xs font-medium text-muted-foreground"
      >
        {weekdayStart.map(day => (
          <div key={day} className="flex h-[var(--cell-size)] w-[var(--cell-size)] items-center justify-center">
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
                onClick={() => onSelect?.(cell.date)}
                className={cn(
                  'h-[var(--cell-size)] w-[var(--cell-size)] appearance-none rounded-md border-0 bg-transparent p-0 text-sm shadow-none transition-colors',
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
