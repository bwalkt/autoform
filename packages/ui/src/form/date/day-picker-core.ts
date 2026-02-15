import { addDays, endOfMonth, endOfWeek, isAfter, isBefore, isSameDay, startOfMonth, startOfWeek } from 'date-fns'
import type { Matcher } from 'react-day-picker'

export type DayPickerCoreMode = 'single' | 'range' | 'multiple'

export type DayPickerCoreMatcher = Matcher

export interface MonthCell {
  date: Date
  outside: boolean
}

/**
 * Normalize a Date to its calendar day by removing time components.
 *
 * @param date - The input date to normalize
 * @returns A new Date with the same year, month, and day and time set to local midnight
 */
export function normalizeDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/**
 * Builds the calendar grid of MonthCell objects for the given month, including leading and trailing days to fill full weeks.
 *
 * @param weekStartsOn - Index of the first day of the week (0 = Sunday, 1 = Monday, …, 6 = Saturday)
 * @returns An array of MonthCell representing each day in the month grid; `outside` is `true` for days that are not in the target month
 */
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

/**
 * Splits a flat array of month cells into a matrix of weeks (rows of 7 days).
 *
 * @param cells - Flat array of MonthCell representing a contiguous grid of days
 * @returns An array of weeks, each week being an array of 7 MonthCell objects
 */
export function toMonthMatrix(cells: MonthCell[]): MonthCell[][] {
  const rows: MonthCell[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7))
  }
  return rows
}

/**
 * Checks whether a given date satisfies a day picker matcher.
 *
 * Supports the following matcher shapes: `boolean`, `Date`, `Date[]`, `DayRange` (`{ from, to }`),
 * `DayOfWeekMatcher` (`{ dayOfWeek: number[] }`), or a predicate function `(date: Date) => boolean`.
 *
 * @param date - The date to test
 * @param matcher - The matcher used to evaluate the date
 * @returns `true` if `date` matches `matcher`, `false` otherwise
 */
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
    const dayOfWeek = matcher.dayOfWeek
    return Array.isArray(dayOfWeek) ? dayOfWeek.includes(day.getDay()) : dayOfWeek === day.getDay()
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

/**
 * Checks whether a calendar date is disabled according to optional minimum/maximum bounds and matcher(s).
 *
 * @param date - The date to evaluate (time components are ignored).
 * @param min - Inclusive minimum allowed date; dates before this are considered disabled.
 * @param max - Inclusive maximum allowed date; dates after this are considered disabled.
 * @param disabled - One or more matcher(s) (boolean, Date, Date[], DayRange, DayOfWeekMatcher, or predicate) that mark matching dates as disabled.
 * @returns `true` if the date is disabled because it is before `min`, after `max`, or matches any `disabled` matcher, `false` otherwise.
 */
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