import { addDays, endOfMonth, endOfWeek, isAfter, isBefore, isSameDay, startOfMonth, startOfWeek } from 'date-fns'
import type { Matcher } from 'react-day-picker'

export type DayPickerCoreMode = 'single' | 'range' | 'multiple'

export type DayPickerCoreMatcher = Matcher

export interface MonthCell {
  date: Date
  outside: boolean
}

export function normalizeDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function buildMonthCells(month: Date, weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0): MonthCell[] {
  const monthStart = startOfMonth(month)
  const monthEnd = endOfMonth(month)
  const gridStart = startOfWeek(monthStart, { weekStartsOn })
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn })

  const cells: MonthCell[] = []
  for (let day = gridStart; !isAfter(day, gridEnd); day = addDays(day, 1)) {
    cells.push({
      date: day,
      outside: day.getMonth() !== monthStart.getMonth(),
    })
  }

  return cells
}

export function toMonthMatrix(cells: MonthCell[]): MonthCell[][] {
  const rows: MonthCell[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7))
  }
  return rows
}

export function matchesCoreMatcher(date: Date, matcher: DayPickerCoreMatcher): boolean {
  const day = normalizeDay(date)

  if (typeof matcher === 'boolean') {
    return matcher
  }
  if (typeof matcher === 'function') {
    return matcher(day)
  }
  if (matcher instanceof Date) {
    return isSameDay(day, normalizeDay(matcher))
  }
  if (Array.isArray(matcher)) {
    return matcher.some(d => isSameDay(day, normalizeDay(d)))
  }
  if ('dayOfWeek' in matcher) {
    return matcher.dayOfWeek.includes(day.getDay())
  }
  if ('before' in matcher && 'after' in matcher) {
    const before = normalizeDay(matcher.before)
    const after = normalizeDay(matcher.after)
    // DateInterval is exclusive on both ends.
    return isAfter(day, after) && isBefore(day, before)
  }
  if ('before' in matcher) {
    const before = normalizeDay(matcher.before)
    return isBefore(day, before)
  }
  if ('after' in matcher) {
    const after = normalizeDay(matcher.after)
    return isAfter(day, after)
  }
  if ('from' in matcher || 'to' in matcher) {
    const from = matcher.from ? normalizeDay(matcher.from) : undefined
    const to = matcher.to ? normalizeDay(matcher.to) : undefined
    if (from && to) {
      return !isBefore(day, from) && !isAfter(day, to)
    }
    if (from) {
      return !isBefore(day, from)
    }
    if (to) {
      return !isAfter(day, to)
    }
    return false
  }

  return false
}

export function isCoreDateDisabled(
  date: Date,
  {
    min,
    max,
    disabled,
  }: {
    min?: Date
    max?: Date
    disabled?: DayPickerCoreMatcher | DayPickerCoreMatcher[]
  },
): boolean {
  const day = normalizeDay(date)
  const minDay = min ? normalizeDay(min) : undefined
  const maxDay = max ? normalizeDay(max) : undefined

  if (minDay && isBefore(day, minDay)) return true
  if (maxDay && isAfter(day, maxDay)) return true

  if (!disabled) return false

  const matchers = Array.isArray(disabled) ? disabled : [disabled]
  return matchers.some(matcher => matchesCoreMatcher(day, matcher))
}
