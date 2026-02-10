'use client'

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import * as React from 'react'
import { DayPicker, type DayPickerProps, getDefaultClassNames } from 'react-day-picker'
import { type Color, designTokens } from '@/elements/tokens'
import { cn } from '@/lib/utils'

export type CalendarProps = DayPickerProps & {
  className?: string
  from?: Date
  to?: Date | null
  color?: Color
}

const DayPickerAny = DayPicker as unknown as React.ComponentType<Record<string, unknown>>

function resolveCalendarColors(color: Color): { accent: string; soft: string; foreground: string } {
  if (color === 'default' || color === 'primary') {
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
  color = 'primary',
  mode,
  defaultMonth,
  numberOfMonths,
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()
  const initialMonthRef = React.useRef(from ?? defaultMonth ?? new Date())
  const resolvedFrom = from ?? defaultMonth ?? initialMonthRef.current
  const resolvedMode = to ? 'range' : (mode ?? 'single')
  const resolvedNumberOfMonths = to
    ? Math.max(2, (to.getFullYear() - resolvedFrom.getFullYear()) * 12 + (to.getMonth() - resolvedFrom.getMonth()) + 1)
    : (numberOfMonths ?? 1)
  const resolvedColors = resolveCalendarColors(color)

  const forcedModeProps =
    resolvedMode === 'range'
      ? { mode: 'range' as const }
      : resolvedMode === 'multiple'
        ? { mode: 'multiple' as const }
        : { mode: 'single' as const }

  return (
    <DayPickerAny
      {...props}
      {...forcedModeProps}
      defaultMonth={resolvedFrom}
      numberOfMonths={resolvedNumberOfMonths}
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-background group/calendar p-3 [--cell-size:--spacing(8)]',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      style={
        {
          '--rdp-accent-color': resolvedColors.accent,
          '--rdp-accent-background-color': resolvedColors.soft,
          '--rdp-day_button-border': '0px',
          '--rdp-selected-border': '0px',
          '--cal-accent-foreground': resolvedColors.foreground,
        } as React.CSSProperties
      }
      formatters={{
        formatMonthDropdown: (date: Date) => date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('flex gap-4 flex-col md:flex-row relative', defaultClassNames.months),
        month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
        nav: cn('flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between', defaultClassNames.nav),
        button_previous: cn(
          'inline-flex size-(--cell-size) items-center justify-center rounded-md p-0',
          'bg-transparent border-0 shadow-none',
          'text-muted-foreground opacity-70 hover:opacity-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          'inline-flex size-(--cell-size) items-center justify-center rounded-md p-0',
          'bg-transparent border-0 shadow-none',
          'text-muted-foreground opacity-70 hover:opacity-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          defaultClassNames.button_next,
        ),
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
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none',
          defaultClassNames.weekday,
        ),
        week: cn('flex w-full mt-2', defaultClassNames.week),
        day: cn(
          'relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none',
          props.showWeekNumber
            ? '[&:nth-child(2)[data-selected=true]_button]:rounded-l-md'
            : '[&:first-child[data-selected=true]_button]:rounded-l-md',
          defaultClassNames.day,
        ),
        day_button: cn(
          'h-9 w-9 p-0 rounded-md border-0 bg-transparent shadow-none appearance-none',
          'inline-flex items-center justify-center cursor-pointer text-sm font-normal text-foreground',
          'hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'group-data-[today=true]/day:bg-[var(--rdp-accent-background-color)] group-data-[today=true]/day:text-foreground',
          'group-data-[selected=true]/day:bg-[var(--rdp-accent-color)] group-data-[selected=true]/day:text-[var(--cal-accent-foreground)]',
          'group-data-[today=true]/day:group-data-[selected=true]/day:bg-[var(--rdp-accent-color)] group-data-[today=true]/day:group-data-[selected=true]/day:text-[var(--cal-accent-foreground)]',
          'group-data-[range-middle=true]/day:bg-[var(--rdp-accent-background-color)] group-data-[range-middle=true]/day:rounded-none',
          'group-data-[range-start=true]/day:bg-[var(--rdp-accent-color)] group-data-[range-start=true]/day:text-[var(--cal-accent-foreground)] group-data-[range-start=true]/day:rounded-l-md',
          'group-data-[range-end=true]/day:bg-[var(--rdp-accent-color)] group-data-[range-end=true]/day:text-[var(--cal-accent-foreground)] group-data-[range-end=true]/day:rounded-r-md',
          defaultClassNames.day_button,
        ),
        range_start: cn('rounded-l-md bg-accent', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r-md bg-accent', defaultClassNames.range_end),
        today: cn('font-normal', defaultClassNames.today),
        selected: cn('font-normal text-sm', defaultClassNames.selected),
        outside: cn('text-muted-foreground aria-selected:text-muted-foreground', defaultClassNames.outside),
        disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({
          className,
          orientation,
          ...iconProps
        }: { className?: string; orientation?: 'left' | 'right' | 'down' } & React.SVGProps<SVGSVGElement>) => {
          const forcedSizeProps = { width: 14, height: 14 }
          if (orientation === 'left') {
            return <ChevronLeftIcon className={cn(className)} {...forcedSizeProps} {...iconProps} />
          }
          if (orientation === 'right') {
            return <ChevronRightIcon className={cn(className)} {...forcedSizeProps} {...iconProps} />
          }
          return <ChevronDownIcon className={cn(className)} {...forcedSizeProps} {...iconProps} />
        },
        ...components,
      }}
    />
  )
}

Calendar.displayName = 'Calendar'
