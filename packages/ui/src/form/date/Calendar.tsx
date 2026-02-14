'use client'

import { addMonths, startOfMonth } from 'date-fns'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import * as React from 'react'
import {
  DayPicker,
  type DayPickerProps,
  getDefaultClassNames,
  type Matcher,
  type MonthChangeEventHandler,
  type PropsMulti,
  type PropsRange,
  type PropsSingle,
} from 'react-day-picker'
import { useOptionalThemeContext } from '@/elements/Theme'
import { type Color, designTokens, type Radius } from '@/elements/tokens'
import { cn } from '@/lib/utils'
import { CalendarHeader } from './CalendarHeader'
import { CalendarNavButton } from './CalendarNavButton'

type CalendarCommonProps = Omit<
  DayPickerProps,
  | 'mode'
  | 'selected'
  | 'onSelect'
  | 'required'
  | 'min'
  | 'max'
  | 'excludeDisabled'
  | 'month'
  | 'defaultMonth'
  | 'onMonthChange'
  | 'numberOfMonths'
  | 'pagedNavigation'
> & {
  className?: string
  from?: Date
  to?: Date | null
  localeCode?: string
  timeZone?: string
  color?: Color
  radius?: Radius
  month?: Date
  defaultMonth?: Date
  onMonthChange?: MonthChangeEventHandler
  numberOfMonths?: number
  pagedNavigation?: boolean
  navButtonBordered?: boolean
  navButtonVariant?: 'soft' | 'outline' | 'ghost'
}

type CalendarSingleProps = {
  mode?: 'single'
  selected?: PropsSingle['selected']
  onSelect?: PropsSingle['onSelect']
  required?: PropsSingle['required']
}

type CalendarRangeProps = {
  mode: 'range'
  selected?: PropsRange['selected']
  onSelect?: PropsRange['onSelect']
  required?: PropsRange['required']
  min?: PropsRange['min']
  max?: PropsRange['max']
  excludeDisabled?: PropsRange['excludeDisabled']
}

type CalendarMultipleProps = {
  mode: 'multiple'
  selected?: PropsMulti['selected']
  onSelect?: PropsMulti['onSelect']
  required?: PropsMulti['required']
  min?: PropsMulti['min']
  max?: PropsMulti['max']
}

export type CalendarProps = CalendarCommonProps & (CalendarSingleProps | CalendarRangeProps | CalendarMultipleProps)

function isSameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  )
}

function resolveCalendarColors(color: Color): { accent: string; soft: string; foreground: string } {
  if (color === 'default') {
    return {
      accent: 'var(--accent)',
      soft: 'color-mix(in oklab, var(--accent) 18%, transparent)',
      foreground: 'var(--accent-foreground)',
    }
  }
  if (color === 'primary') {
    return {
      accent: 'var(--primary)',
      soft: 'color-mix(in oklab, var(--primary) 18%, transparent)',
      foreground: 'var(--primary-foreground)',
    }
  }

  const token = designTokens.color[color]
  return {
    accent: token.primary,
    soft: token.primaryAlpha,
    foreground: 'white',
  }
}

function toMatcherArray(matcher: Matcher | Matcher[] | undefined): Matcher[] {
  if (!matcher) {
    return []
  }
  return Array.isArray(matcher) ? matcher : [matcher]
}

/**
 * Renders a themed, localized calendar UI based on react-day-picker with configurable selection modes, theming, and formatting.
 *
 * @param localeCode - BCP 47 locale for month, weekday, and day formatting; falls back to theme or "en-US" if invalid
 * @param timeZone - IANA time zone identifier applied when formatting dates; falls back to theme if not provided
 * @returns A DayPicker React element configured as a calendar
 */
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  from,
  to = null,
  localeCode,
  timeZone,
  color = 'default',
  radius,
  month: monthProp,
  defaultMonth,
  onMonthChange: onMonthChangeProp,
  pagedNavigation: pagedNavigationProp,
  numberOfMonths,
  navButtonBordered: navButtonBorderedProp,
  navButtonVariant: navButtonVariantProp,
  formatters,
  components,
  ...dayPickerProps
}: CalendarProps) {
  const theme = useOptionalThemeContext()
  const defaultClassNames = getDefaultClassNames()
  const initialMonthRef = React.useRef(monthProp ?? from ?? defaultMonth ?? new Date())
  const resolvedFrom = from ?? defaultMonth ?? initialMonthRef.current
  const [uncontrolledMonth, setUncontrolledMonth] = React.useState<Date>(resolvedFrom)
  const displayedMonth = monthProp ?? uncontrolledMonth
  const resolvedMode = dayPickerProps.mode ?? 'single'
  const multipleModeProps = resolvedMode === 'multiple' ? (dayPickerProps as CalendarMultipleProps) : null
  const multipleSelectedProp = multipleModeProps?.selected
  const isMultipleControlled = resolvedMode === 'multiple' && 'selected' in dayPickerProps
  const [uncontrolledMultipleSelected, setUncontrolledMultipleSelected] = React.useState<Date[] | undefined>(
    Array.isArray(multipleSelectedProp) ? multipleSelectedProp : undefined,
  )
  const multipleSelected = isMultipleControlled ? multipleSelectedProp : uncontrolledMultipleSelected
  const isMultipleAtMax =
    resolvedMode === 'multiple' &&
    typeof multipleModeProps?.max === 'number' &&
    (multipleSelected?.length ?? 0) >= multipleModeProps.max
  const maxReachedDisabledMatcher: Matcher = React.useCallback(
    (date: Date) => !(multipleSelected ?? []).some(selectedDate => isSameDay(selectedDate, date)),
    [multipleSelected],
  )
  const resolvedDisabled = isMultipleAtMax
    ? [...toMatcherArray(dayPickerProps.disabled), maxReachedDisabledMatcher]
    : dayPickerProps.disabled
  const resolvedNavButtonColor: Color = color
  const resolvedRadius = radius ?? theme?.calendar.radius ?? theme?.radius ?? 'md'
  const resolvedNavButtonBordered = navButtonBorderedProp ?? theme?.calendar.navButtonBordered ?? false
  const resolvedNavButtonVariant = navButtonVariantProp ?? (resolvedNavButtonBordered ? 'outline' : 'soft')
  const resolvedLocaleCode = localeCode ?? theme?.calendar.locale ?? theme?.locale.locale ?? 'en-US'
  const safeLocaleCode = React.useMemo(() => {
    try {
      new Intl.DateTimeFormat(resolvedLocaleCode)
      return resolvedLocaleCode
    } catch {
      return 'en-US'
    }
  }, [resolvedLocaleCode])
  const resolvedTimeZone = timeZone ?? theme?.calendar.timezone ?? theme?.locale.timezone
  const resolvedNumberOfMonths = to
    ? Math.max(2, (to.getFullYear() - resolvedFrom.getFullYear()) * 12 + (to.getMonth() - resolvedFrom.getMonth()) + 1)
    : (numberOfMonths ?? 1)
  const resolvedPagedNavigation = pagedNavigationProp ?? resolvedNumberOfMonths > 1
  const useCustomHeader = resolvedNumberOfMonths === 1
  const resolvedColors = resolveCalendarColors(color)
  const dateFormatOptions = React.useMemo(
    () => (resolvedTimeZone ? ({ timeZone: resolvedTimeZone } as const) : undefined),
    [resolvedTimeZone],
  )
  const captionFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(safeLocaleCode, {
        month: 'long',
        year: 'numeric',
        ...dateFormatOptions,
      }),
    [safeLocaleCode, dateFormatOptions],
  )
  const monthDropdownFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(safeLocaleCode, {
        month: 'short',
        ...dateFormatOptions,
      }),
    [safeLocaleCode, dateFormatOptions],
  )
  const yearDropdownFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(safeLocaleCode, {
        year: 'numeric',
        ...dateFormatOptions,
      }),
    [safeLocaleCode, dateFormatOptions],
  )
  const weekdayFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(safeLocaleCode, {
        weekday: 'short',
        ...dateFormatOptions,
      }),
    [safeLocaleCode, dateFormatOptions],
  )
  const dayFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(safeLocaleCode, {
        day: 'numeric',
        ...dateFormatOptions,
      }),
    [safeLocaleCode, dateFormatOptions],
  )
  const navButtonClassName =
    'static shrink-0 touch-manipulation [-webkit-tap-highlight-color:transparent] text-[color-mix(in_oklab,var(--rdp-accent-color),black_50%)]'

  const handleMonthChange = React.useCallback<MonthChangeEventHandler>(
    month => {
      if (monthProp === undefined) {
        setUncontrolledMonth(month)
      }
      onMonthChangeProp?.(month)
    },
    [monthProp, onMonthChangeProp],
  )

  const fromMonthBoundary = dayPickerProps.startMonth ?? (from ? startOfMonth(from) : undefined)
  const toMonthBoundary = dayPickerProps.endMonth ?? (to ? startOfMonth(to) : undefined)
  const normalizedDisplayedMonth = startOfMonth(displayedMonth)
  const canNavigatePrev = !fromMonthBoundary || normalizedDisplayedMonth > startOfMonth(fromMonthBoundary)
  const canNavigateNext = !toMonthBoundary || normalizedDisplayedMonth < startOfMonth(toMonthBoundary)

  const handlePrevMonth = React.useCallback(() => {
    if (!canNavigatePrev || dayPickerProps.disableNavigation) return
    handleMonthChange(addMonths(displayedMonth, -1))
  }, [canNavigatePrev, dayPickerProps.disableNavigation, displayedMonth, handleMonthChange])

  const handleNextMonth = React.useCallback(() => {
    if (!canNavigateNext || dayPickerProps.disableNavigation) return
    handleMonthChange(addMonths(displayedMonth, 1))
  }, [canNavigateNext, dayPickerProps.disableNavigation, displayedMonth, handleMonthChange])

  React.useEffect(() => {
    if (resolvedMode !== 'multiple' || !isMultipleControlled) {
      return
    }
    setUncontrolledMultipleSelected(Array.isArray(multipleSelectedProp) ? multipleSelectedProp : undefined)
  }, [resolvedMode, isMultipleControlled, multipleSelectedProp])

  const handleMultipleSelect = React.useCallback<NonNullable<PropsMulti['onSelect']>>(
    (nextSelected, triggerDate, modifiers, event) => {
      if (!multipleModeProps) return
      const current = multipleSelected ?? []
      const max = multipleModeProps.max
      const min = multipleModeProps.min
      const required = multipleModeProps.required

      if (modifiers.selected) {
        const canUnselect = !(required && current.length <= 1) && !(typeof min === 'number' && current.length <= min)
        if (!canUnselect) {
          multipleModeProps.onSelect?.(current.length > 0 ? current : undefined, triggerDate, modifiers, event)
          return
        }
        const updated = current.filter(day => !isSameDay(day, triggerDate))
        const normalized = updated.length > 0 ? updated : undefined
        if (!isMultipleControlled) {
          setUncontrolledMultipleSelected(normalized)
        }
        multipleModeProps.onSelect?.(normalized, triggerDate, modifiers, event)
        return
      }

      if (typeof max === 'number' && current.length >= max) {
        multipleModeProps.onSelect?.(current.length > 0 ? current : undefined, triggerDate, modifiers, event)
        return
      }

      const normalized = nextSelected && nextSelected.length > 0 ? nextSelected : undefined
      if (!isMultipleControlled) {
        setUncontrolledMultipleSelected(normalized)
      }
      multipleModeProps.onSelect?.(normalized, triggerDate, modifiers, event)
    },
    [isMultipleControlled, multipleModeProps, multipleSelected],
  )

  const mergedStyles = {
    ...dayPickerProps.styles,
    month_caption: {
      ...(dayPickerProps.styles?.month_caption ?? {}),
      marginBottom: '0.75rem',
    },
    week: {
      ...(dayPickerProps.styles?.week ?? {}),
      paddingTop: '0.5rem',
    },
    day: {
      ...(dayPickerProps.styles?.day ?? {}),
      width: '1.75rem',
      height: '1.75rem',
    },
    day_button: {
      ...(dayPickerProps.styles?.day_button ?? {}),
      width: '1.75rem',
      height: '1.75rem',
      borderRadius: 'var(--cal-radius)',
    },
    button_previous: {
      ...(dayPickerProps.styles?.button_previous ?? {}),
      position: 'static',
      inset: 'auto',
    },
    button_next: {
      ...(dayPickerProps.styles?.button_next ?? {}),
      position: 'static',
      inset: 'auto',
    },
  }

  const pickerProps = {
    ...dayPickerProps,
    mode: resolvedMode,
    selected: resolvedMode === 'multiple' ? multipleSelected : dayPickerProps.selected,
    onSelect: resolvedMode === 'multiple' ? handleMultipleSelect : dayPickerProps.onSelect,
    disabled: resolvedDisabled,
    month: displayedMonth,
    onMonthChange: handleMonthChange,
    defaultMonth: resolvedFrom,
    numberOfMonths: resolvedNumberOfMonths,
    pagedNavigation: resolvedPagedNavigation,
    hideNavigation: useCustomHeader ? true : dayPickerProps.hideNavigation,
    showOutsideDays,
    className: cn(
      'bg-background group/calendar p-3 [--cell-size:--spacing(8)]',
      String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
      String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
      className,
    ),
    style: {
      '--rdp-accent-color': resolvedColors.accent,
      '--rdp-accent-background-color': resolvedColors.soft,
      '--rdp-day_button-border': '0px',
      '--rdp-selected-border': '0px',
      '--cal-accent-foreground': resolvedColors.foreground,
      '--rdp-day-height': 'var(--cell-size)',
      '--rdp-day-width': 'var(--cell-size)',
      '--rdp-day_button-height': 'var(--cell-size)',
      '--rdp-day_button-width': 'var(--cell-size)',
      '--rdp-nav_button-height': 'var(--cell-size)',
      '--rdp-nav_button-width': 'var(--cell-size)',
      '--cal-radius': designTokens.radius[resolvedRadius],
      '--cal-nav-radius': designTokens.radius[resolvedRadius],
    } as React.CSSProperties,
    styles: mergedStyles,
    formatters: {
      formatCaption: (date: Date, _options?: unknown, _dateLib?: unknown) =>
        useCustomHeader ? '' : captionFormatter.format(date),
      formatMonthDropdown: (date: Date, _options?: unknown, _dateLib?: unknown) => monthDropdownFormatter.format(date),
      formatYearDropdown: (date: Date, _options?: unknown, _dateLib?: unknown) => yearDropdownFormatter.format(date),
      formatWeekdayName: (date: Date, _options?: unknown, _dateLib?: unknown) => weekdayFormatter.format(date),
      formatDay: (date: Date, _options?: unknown, _dateLib?: unknown) => dayFormatter.format(date),
      ...formatters,
    },
    classNames: {
      root: cn('w-fit', defaultClassNames.root),
      months: cn('flex gap-4 flex-col md:flex-row relative', defaultClassNames.months),
      month: cn('flex flex-col w-full gap-2', defaultClassNames.month),
      nav: 'absolute right-0 top-0 z-10 flex items-center justify-end gap-1',
      button_previous: '',
      button_next: '',
      month_caption: useCustomHeader
        ? 'hidden'
        : 'flex h-(--cell-size) w-full items-center justify-start pr-[calc(var(--cell-size)*2+0.5rem)]',
      dropdowns: useCustomHeader
        ? 'hidden'
        : 'flex h-(--cell-size) w-full items-center justify-start gap-1.5 pr-[calc(var(--cell-size)*2+0.5rem)] text-sm font-medium',
      dropdown_root: cn(
        'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
        defaultClassNames.dropdown_root,
      ),
      dropdown: cn('absolute bg-popover inset-0 opacity-0', defaultClassNames.dropdown),
      caption_label: useCustomHeader
        ? 'hidden'
        : cn('select-none text-sm font-medium', defaultClassNames.caption_label),
      month_grid: cn('w-full border-collapse', defaultClassNames.month_grid),
      weekdays: cn('flex mt-1', defaultClassNames.weekdays),
      weekday: cn(
        'text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none',
        defaultClassNames.weekday,
      ),
      week: cn('flex w-full mt-2', defaultClassNames.week),
      day: cn(
        'relative p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-[var(--cal-radius)] group/day select-none',
        dayPickerProps.showWeekNumber
          ? '[&:nth-child(2)[data-selected=true]_button]:rounded-l-[var(--cal-radius)]'
          : '[&:first-child[data-selected=true]_button]:rounded-l-[var(--cal-radius)]',
        defaultClassNames.day,
      ),
      day_button: cn(
        defaultClassNames.day_button,
        'p-0 rounded-[var(--cal-radius)] border-0 bg-transparent shadow-none appearance-none touch-manipulation [-webkit-tap-highlight-color:transparent]',
        'inline-flex items-center justify-center cursor-pointer text-sm font-normal text-foreground',
        'hover:bg-[var(--rdp-accent-background-color)] hover:text-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      ),
      range_start: cn(
        'bg-[var(--rdp-accent-background-color)] rounded-l-[var(--cal-radius)]',
        '[&>button]:bg-[var(--rdp-accent-color)] [&>button]:text-[var(--cal-accent-foreground)]',
        defaultClassNames.range_start,
      ),
      range_middle: cn(
        'bg-[var(--rdp-accent-background-color)] rounded-none',
        '[&>button]:!bg-transparent [&>button]:!text-foreground [&>button:hover]:!bg-transparent [&>button:hover]:!text-foreground',
        defaultClassNames.range_middle,
      ),
      range_end: cn(
        'bg-[var(--rdp-accent-background-color)] rounded-r-[var(--cal-radius)]',
        '[&>button]:bg-[var(--rdp-accent-color)] [&>button]:text-[var(--cal-accent-foreground)]',
        defaultClassNames.range_end,
      ),
      today: cn(
        'font-normal',
        '[&>button]:bg-[var(--rdp-accent-background-color)] [&>button]:text-foreground',
        '[&[data-selected=true]>button]:bg-[var(--rdp-accent-color)] [&[data-selected=true]>button]:text-[var(--cal-accent-foreground)]',
        '[&[data-selected=true]>button]:ring-2 [&[data-selected=true]>button]:ring-[var(--rdp-accent-background-color)]',
        defaultClassNames.today,
      ),
      selected: cn(
        'font-normal text-sm',
        '[&>button]:bg-[var(--rdp-accent-color)] [&>button]:text-[var(--cal-accent-foreground)]',
        defaultClassNames.selected,
      ),
      outside: cn('text-muted-foreground aria-selected:text-muted-foreground', defaultClassNames.outside),
      disabled: cn(
        'text-muted-foreground opacity-50 [&>button]:pointer-events-none [&>button]:cursor-not-allowed',
        defaultClassNames.disabled,
      ),
      hidden: cn('invisible', defaultClassNames.hidden),
      ...classNames,
    },
    components: {
      PreviousMonthButton: ({ children, ...buttonProps }) => {
        const {
          color: _unusedColor,
          style: _unusedStyle,
          ...safeButtonProps
        } = buttonProps as React.ComponentPropsWithoutRef<'button'>
        return (
          <CalendarNavButton
            color={resolvedNavButtonColor}
            radius={resolvedRadius}
            variant={resolvedNavButtonVariant}
            bordered={resolvedNavButtonBordered}
            accentColor={resolvedColors.accent}
            softColor={resolvedColors.soft}
            foregroundColor={resolvedColors.foreground}
            className={navButtonClassName}
            {...safeButtonProps}
          >
            {children}
          </CalendarNavButton>
        )
      },
      NextMonthButton: ({ children, ...buttonProps }) => {
        const {
          color: _unusedColor,
          style: _unusedStyle,
          ...safeButtonProps
        } = buttonProps as React.ComponentPropsWithoutRef<'button'>
        return (
          <CalendarNavButton
            color={resolvedNavButtonColor}
            radius={resolvedRadius}
            variant={resolvedNavButtonVariant}
            bordered={resolvedNavButtonBordered}
            accentColor={resolvedColors.accent}
            softColor={resolvedColors.soft}
            foregroundColor={resolvedColors.foreground}
            className={navButtonClassName}
            {...safeButtonProps}
          >
            {children}
          </CalendarNavButton>
        )
      },
      Chevron: ({
        className,
        orientation,
        ...iconProps
      }: {
        className?: string
        size?: number
        disabled?: boolean
        orientation?: 'left' | 'right' | 'down' | 'up'
      }) => {
        const forcedSizeProps = { width: 14, height: 14 }
        const iconClassName = cn(className, '!text-current !opacity-100')
        if (orientation === 'left') {
          return <ChevronLeftIcon className={iconClassName} {...forcedSizeProps} {...iconProps} />
        }
        if (orientation === 'right') {
          return <ChevronRightIcon className={iconClassName} {...forcedSizeProps} {...iconProps} />
        }
        if (orientation === 'up') {
          return <ChevronDownIcon className={cn(iconClassName, 'rotate-180')} {...forcedSizeProps} {...iconProps} />
        }
        return <ChevronDownIcon className={iconClassName} {...forcedSizeProps} {...iconProps} />
      },
      ...components,
    },
  } as DayPickerProps

  const ChevronComponent = components?.Chevron
  const previousIcon = ChevronComponent ? (
    <ChevronComponent orientation="left" className="!text-current !opacity-100" />
  ) : (
    <ChevronLeftIcon className="!text-current !opacity-100" width={14} height={14} />
  )
  const nextIcon = ChevronComponent ? (
    <ChevronComponent orientation="right" className="!text-current !opacity-100" />
  ) : (
    <ChevronRightIcon className="!text-current !opacity-100" width={14} height={14} />
  )

  return (
    <div className="w-fit">
      {useCustomHeader ? (
        <CalendarHeader
          className="mb-1"
          title={captionFormatter.format(displayedMonth)}
          color={resolvedNavButtonColor}
          radius={resolvedRadius}
          navButtonVariant={resolvedNavButtonVariant}
          navButtonBordered={resolvedNavButtonBordered}
          accentColor={resolvedColors.accent}
          softColor={resolvedColors.soft}
          foregroundColor={resolvedColors.foreground}
          navButtonClassName={navButtonClassName}
          previousAriaLabel="Previous month"
          nextAriaLabel="Next month"
          previousIcon={previousIcon}
          nextIcon={nextIcon}
          onPrevious={handlePrevMonth}
          onNext={handleNextMonth}
          previousDisabled={Boolean(dayPickerProps.disableNavigation) || !canNavigatePrev}
          nextDisabled={Boolean(dayPickerProps.disableNavigation) || !canNavigateNext}
          displayedMonth={displayedMonth}
          onMonthYearChange={handleMonthChange}
          localeCode={safeLocaleCode}
          startMonth={fromMonthBoundary ?? undefined}
          endMonth={toMonthBoundary ?? undefined}
        />
      ) : null}
      <DayPicker {...pickerProps} />
    </div>
  )
}

Calendar.displayName = 'Calendar'
