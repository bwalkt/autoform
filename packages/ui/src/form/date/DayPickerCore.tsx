'use client'

import { format } from 'date-fns'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { buildMonthCells, toMonthMatrix } from './day-picker-core'

export interface DayPickerCoreProps {
  month?: Date
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  showOutsideDays?: boolean
  selected?: Date
  onSelect?: (date: Date) => void
  className?: string
}

export function DayPickerCore({
  month = new Date(),
  weekStartsOn = 0,
  showOutsideDays = true,
  selected,
  onSelect,
  className,
}: DayPickerCoreProps) {
  const cells = React.useMemo(() => buildMonthCells(month, weekStartsOn), [month, weekStartsOn])
  const matrix = React.useMemo(() => toMonthMatrix(cells), [cells])

  const weekdayStart = React.useMemo(() => {
    const base = new Date(2024, 0, 7)
    const result: string[] = []
    for (let i = 0; i < 7; i++) {
      const offset = (weekStartsOn + i) % 7
      result.push(format(new Date(base.getFullYear(), base.getMonth(), base.getDate() + offset), 'EEE'))
    }
    return result
  }, [weekStartsOn])

  return (
    <div className={cn('inline-block rounded-lg border bg-background p-3', className)}>
      <h2 className="mb-2 text-center text-base font-semibold">{format(month, 'MMMM yyyy')}</h2>
      <ol className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
        {weekdayStart.map(day => (
          <li key={day}>{day}</li>
        ))}
      </ol>
      <ol className="mt-2 grid grid-cols-7 gap-1 text-center">
        {matrix.flat().map(cell => {
          const isSelected =
            selected &&
            selected.getFullYear() === cell.date.getFullYear() &&
            selected.getMonth() === cell.date.getMonth() &&
            selected.getDate() === cell.date.getDate()

          if (cell.outside && !showOutsideDays) {
            return <li key={cell.date.toISOString()} className="h-9 w-9" aria-hidden="true" />
          }

          return (
            <li key={cell.date.toISOString()}>
              <button
                type="button"
                onClick={() => onSelect?.(cell.date)}
                className={cn(
                  'h-9 w-9 rounded-md text-sm transition-colors',
                  cell.outside ? 'text-muted-foreground/60' : 'text-foreground',
                  isSelected && 'bg-primary text-primary-foreground',
                )}
              >
                {cell.date.getDate()}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
