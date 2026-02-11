'use client'

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import * as React from 'react'
import {
  DayPicker,
  type DayPickerProps,
  getDefaultClassNames,
  type MonthChangeEventHandler,
  type PropsMulti,
  type PropsRange,
  type PropsSingle,
} from 'react-day-picker'
import { IconButton } from '@/elements/IconButton'
import { useOptionalThemeContext } from '@/elements/Theme'
import { type Color, designTokens, type Radius } from '@/elements/tokens'
import { cn } from '@/lib/utils'

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
  color?: Color
  radius?: Radius
  month?: Date
  defaultMonth?: Date
  onMonthChange?: MonthChangeEventHandler
  numberOfMonths?: number
  pagedNavigation?: boolean
  navButtonBordered?: boolean
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

/** Calendar export. */
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  from,
  to = null,
  color = 'default',
  radius,
  month: monthProp,
  defaultMonth,
  onMonthChange: onMonthChangeProp,
  pagedNavigation: pagedNavigationProp,
  numberOfMonths,
  navButtonBordered: navButtonBorderedProp,
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
  const [uncontrolledMultipleSelected, setUncontrolledMultipleSelected] = React.useState<Date[] | undefined>(
    Array.isArray(multipleSelectedProp) ? multipleSelectedProp : undefined,
  )
  const multipleSelected = multipleSelectedProp ?? uncontrolledMultipleSelected
  const resolvedNavButtonColor: Color = color
  const resolvedRadius = radius ?? theme?.calendar.radius ?? theme?.radius ?? 'md'
  const resolvedNavButtonBordered = navButtonBorderedProp ?? theme?.calendar.navButtonBordered ?? false
  const resolvedNumberOfMonths = to
    ? Math.max(2, (to.getFullYear() - resolvedFrom.getFullYear()) * 12 + (to.getMonth() - resolvedFrom.getMonth()) + 1)
    : (numberOfMonths ?? 1)
  const resolvedPagedNavigation = pagedNavigationProp ?? resolvedNumberOfMonths > 1
  const resolvedColors = resolveCalendarColors(color)
  const navButtonClassName = resolvedNavButtonBordered
    ? cn(
        'shrink-0 border touch-manipulation [webkit-tap-highlight-color:transparent]',
        'border-[var(--rdp-accent-color)] text-[var(--rdp-accent-color)]',
        'hover:bg-[var(--rdp-accent-background-color)] hover:text-[var(--rdp-accent-color)]',
      )
    : cn(
        'shrink-0 touch-manipulation [webkit-tap-highlight-color:transparent]',
        'bg-[var(--rdp-accent-background-color)] text-[var(--rdp-accent-color)]',
        'hover:bg-[var(--rdp-accent-color)] hover:text-[var(--cal-accent-foreground)]',
      )

  const handleMonthChange = React.useCallback<MonthChangeEventHandler>(
    month => {
      if (monthProp === undefined) {
        setUncontrolledMonth(month)
      }
      onMonthChangeProp?.(month)
    },
    [monthProp, onMonthChangeProp],
  )

  React.useEffect(() => {
    if (resolvedMode !== 'multiple') {
      return
    }
    if (Array.isArray(multipleSelectedProp)) {
      setUncontrolledMultipleSelected(multipleSelectedProp)
    }
  }, [resolvedMode, multipleSelectedProp])

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
        if (multipleSelectedProp === undefined) {
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
      if (multipleSelectedProp === undefined) {
        setUncontrolledMultipleSelected(normalized)
      }
      multipleModeProps.onSelect?.(normalized, triggerDate, modifiers, event)
    },
    [multipleModeProps, multipleSelected, multipleSelectedProp],
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
    },
    button_next: {
      ...(dayPickerProps.styles?.button_next ?? {}),
    },
  }

  const pickerProps = {
    ...dayPickerProps,
    mode: resolvedMode,
    selected: resolvedMode === 'multiple' ? multipleSelected : dayPickerProps.selected,
    onSelect: resolvedMode === 'multiple' ? handleMultipleSelect : dayPickerProps.onSelect,
    month: displayedMonth,
    onMonthChange: handleMonthChange,
    defaultMonth: resolvedFrom,
    numberOfMonths: resolvedNumberOfMonths,
    pagedNavigation: resolvedPagedNavigation,
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
      formatMonthDropdown: (date: Date) => date.toLocaleString('default', { month: 'short' }),
      ...formatters,
    },
    classNames: {
      root: cn('w-fit', defaultClassNames.root),
      months: cn('flex gap-4 flex-col md:flex-row relative', defaultClassNames.months),
      month: cn('flex flex-col w-full gap-2', defaultClassNames.month),
      nav: cn('flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between', defaultClassNames.nav),
      button_previous: '',
      button_next: '',
      month_caption: cn(
        'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
        defaultClassNames.month_caption,
      ),
      dropdowns: cn(
        'w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5',
        defaultClassNames.dropdowns,
      ),
      dropdown_root: cn(
        'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
        defaultClassNames.dropdown_root,
      ),
      dropdown: cn('absolute bg-popover inset-0 opacity-0', defaultClassNames.dropdown),
      caption_label: cn('select-none text-sm font-medium', defaultClassNames.caption_label),
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
        'p-0 rounded-[var(--cal-radius)] border-0 bg-transparent shadow-none appearance-none touch-manipulation [webkit-tap-highlight-color:transparent]',
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
        defaultClassNames.today,
      ),
      selected: cn(
        'font-normal text-sm',
        '[&>button]:bg-[var(--rdp-accent-color)] [&>button]:text-[var(--cal-accent-foreground)]',
        defaultClassNames.selected,
      ),
      outside: cn('text-muted-foreground aria-selected:text-muted-foreground', defaultClassNames.outside),
      disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
      hidden: cn('invisible', defaultClassNames.hidden),
      ...classNames,
    },
    components: {
      PreviousMonthButton: ({ children, ...buttonProps }) => {
        const {
          color: _unusedColor,
          className: _unusedClassName,
          style: _unusedStyle,
          ...safeButtonProps
        } = buttonProps as React.ComponentPropsWithoutRef<'button'>
        return (
          <IconButton
            size="2"
            color={resolvedNavButtonColor}
            radius={resolvedRadius}
            variant={resolvedNavButtonBordered ? 'outline' : 'soft'}
            className={navButtonClassName}
            {...safeButtonProps}
          >
            {children}
          </IconButton>
        )
      },
      NextMonthButton: ({ children, ...buttonProps }) => {
        const {
          color: _unusedColor,
          className: _unusedClassName,
          style: _unusedStyle,
          ...safeButtonProps
        } = buttonProps as React.ComponentPropsWithoutRef<'button'>
        return (
          <IconButton
            size="2"
            color={resolvedNavButtonColor}
            radius={resolvedRadius}
            variant={resolvedNavButtonBordered ? 'outline' : 'soft'}
            className={navButtonClassName}
            {...safeButtonProps}
          >
            {children}
          </IconButton>
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

  return <DayPicker {...pickerProps} />
}

Calendar.displayName = 'Calendar'
