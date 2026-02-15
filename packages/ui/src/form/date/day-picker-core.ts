import { addDays, endOfMonth, endOfWeek, isAfter, isBefore, isSameDay, startOfMonth, startOfWeek } from 'date-fns'

export type DayPickerCoreMode = 'single' | 'range' | 'multiple'

export type DayRange = {
  from: Date
  to: Date
}

export type DayOfWeekMatcher = {
  dayOfWeek: number[]
}

export type DayPickerCoreMatcher = boolean | Date | Date[] | DayRange | DayOfWeekMatcher | ((date: Date) => boolean)

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
  if ('from' in matcher && 'to' in matcher) {
    const from = normalizeDay(matcher.from)
    const to = normalizeDay(matcher.to)
    return !isBefore(day, from) && !isAfter(day, to)
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
