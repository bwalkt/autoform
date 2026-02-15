'use client'

import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import { Theme } from '@/elements/Theme'
import { Calendar } from './Calendar'

const meta: Meta<typeof Calendar> = {
  title: 'Form/Date/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['default', 'primary', 'neutral', 'info', 'success', 'warning', 'error'],
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    navButtonBordered: {
      table: { disable: true },
    },
    navButtonVariant: {
      control: { type: 'select' },
      options: ['soft', 'outline', 'ghost'],
    },
    size: {
      control: { type: 'radio' },
      options: ['1', '2'],
    },
    experimentalCorePicker: {
      table: { disable: true },
    },
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

type CalendarMode = 'single' | 'range' | 'multiple'

type CalendarMatrixArgs = {
  mode: CalendarMode
  months: 1 | 2
  color: 'default' | 'primary' | 'neutral' | 'info' | 'success' | 'warning' | 'error'
  radius: 'none' | 'sm' | 'md' | 'lg' | 'full'
  navButtonBordered: boolean
  navButtonVariant: 'soft' | 'outline' | 'ghost'
  size: '1' | '2'
  min?: number
  max?: number
}

type CalendarLocaleArgs = {
  localeCode: string
  timeZone?: string
}

const localeOptions = ['en-US', 'fr-FR', 'de-DE', 'es-ES'] as const
const timeZoneOptions = [
  '',
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Dubai',
] as const

// calendar-01 style
export const DefaultMonth: Story = {
  args: {
    color: 'default',
    radius: 'md',
    navButtonBordered: false,
    navButtonVariant: 'soft',
    size: '1',
  },
  render: args => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <div>
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
          color={args.color}
          radius={args.radius}
          navButtonBordered={args.navButtonBordered}
          navButtonVariant={args.navButtonVariant}
          size={args.size}
          className="rounded-md border"
        />
      </div>
    )
  },
}

export const ExperimentalCore: Story = {
  args: {
    color: 'default',
    radius: 'md',
    navButtonBordered: false,
    navButtonVariant: 'soft',
    size: '1',
    experimentalCorePicker: true,
  },
  render: args => {
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    return (
      <Calendar
        mode="single"
        defaultMonth={new Date(2026, 1, 1)}
        selected={date}
        onSelect={setDate}
        color={args.color}
        radius={args.radius}
        navButtonBordered={args.navButtonBordered}
        navButtonVariant={args.navButtonVariant}
        size={args.size}
        experimentalCorePicker={true}
        className="rounded-md border"
      />
    )
  },
}

export const ModeAndMonths: StoryObj<CalendarMatrixArgs> = {
  args: {
    mode: 'single',
    months: 1,
    color: 'default',
    radius: 'md',
    navButtonBordered: false,
    navButtonVariant: 'soft',
    size: '1',
    min: undefined,
    max: undefined,
  },
  argTypes: {
    mode: {
      control: { type: 'radio' },
      options: ['single', 'range', 'multiple'],
    },
    months: {
      control: { type: 'radio' },
      options: [1, 2],
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'primary', 'neutral', 'info', 'success', 'warning', 'error'],
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    navButtonBordered: {
      table: { disable: true },
    },
    navButtonVariant: {
      control: { type: 'select' },
      options: ['soft', 'outline', 'ghost'],
    },
    size: {
      control: { type: 'radio' },
      options: ['1', '2'],
    },
    min: {
      control: { type: 'number' },
    },
    max: {
      control: { type: 'number' },
    },
  },
  render: args => {
    const [singleDate, setSingleDate] = React.useState<Date | undefined>(new Date())
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2025, 5, 4),
      to: new Date(2025, 5, 17),
    })
    const [multipleDates, setMultipleDates] = React.useState<Date[] | undefined>([
      new Date(2025, 5, 4),
      new Date(2025, 5, 17),
    ])

    const sharedProps = {
      color: args.color,
      radius: args.radius,
      navButtonBordered: args.navButtonBordered,
      navButtonVariant: args.navButtonVariant,
      size: args.size,
      numberOfMonths: args.months,
      pagedNavigation: args.months > 1,
      defaultMonth: new Date(2025, 5, 1),
      className: 'rounded-md border',
    } as const

    if (args.mode === 'range') {
      return (
        <Calendar {...sharedProps} mode="range" selected={range} onSelect={setRange} min={args.min} max={args.max} />
      )
    }

    if (args.mode === 'multiple') {
      return (
        <Calendar
          {...sharedProps}
          mode="multiple"
          selected={multipleDates}
          onSelect={setMultipleDates}
          min={args.min}
          max={args.max}
        />
      )
    }

    return <Calendar {...sharedProps} mode="single" selected={singleDate} onSelect={setSingleDate} />
  },
}

// Single-month range selection
export const SingleMonthRange: Story = {
  args: {
    color: 'primary',
    radius: 'md',
    navButtonBordered: false,
    navButtonVariant: 'soft',
    size: '1',
  },
  render: args => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2025, 5, 4),
      to: new Date(2025, 5, 17),
    })

    return (
      <div>
        <Calendar
          mode="range"
          defaultMonth={new Date(2025, 5, 1)}
          selected={range}
          onSelect={setRange}
          color={args.color}
          radius={args.radius}
          navButtonBordered={args.navButtonBordered}
          navButtonVariant={args.navButtonVariant}
          size={args.size}
          className="rounded-md border"
        />
        <p className="text-muted-foreground mt-3 text-center text-xs">Single month range selection</p>
      </div>
    )
  },
}

// Multi-month automatic range mode (calendar-04 style)
export const MultiMonthRange: Story = {
  args: {
    color: 'primary',
    radius: 'md',
    navButtonBordered: false,
    navButtonVariant: 'soft',
    size: '1',
  },
  render: args => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2025, 4, 22),
      to: new Date(2025, 5, 17),
    })

    return (
      <div>
        <Calendar
          mode="range"
          defaultMonth={new Date(2025, 4, 1)}
          numberOfMonths={2}
          pagedNavigation
          selected={range}
          onSelect={setRange}
          color={args.color}
          radius={args.radius}
          navButtonBordered={args.navButtonBordered}
          navButtonVariant={args.navButtonVariant}
          size={args.size}
          className="rounded-md border"
        />
        <p className="text-muted-foreground mt-3 text-center text-xs">Multi month calendar with range selection</p>
      </div>
    )
  },
}

// Multiple date selection (explicit mode override)
export const Multiple: Story = {
  args: {
    color: 'default',
    radius: 'md',
    navButtonBordered: false,
    navButtonVariant: 'soft',
    size: '1',
  },
  render: args => {
    const [dates, setDates] = React.useState<Date[] | undefined>([])
    return (
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        color={args.color}
        radius={args.radius}
        navButtonBordered={args.navButtonBordered}
        navButtonVariant={args.navButtonVariant}
        size={args.size}
        className="rounded-md border"
      />
    )
  },
}

// With min/max dates
export const WithMinMaxDates: Story = {
  args: {
    color: 'default',
    radius: 'md',
    navButtonBordered: false,
    navButtonVariant: 'soft',
    size: '1',
  },
  render: args => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const today = new Date()
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const maxDate = new Date(today)
    maxDate.setDate(today.getDate() + 30)

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={[{ before: minDate }, { after: maxDate }]}
        color={args.color}
        radius={args.radius}
        navButtonBordered={args.navButtonBordered}
        navButtonVariant={args.navButtonVariant}
        size={args.size}
        className="rounded-md border"
      />
    )
  },
}

// Hide outside days
export const HideOutsideDays: Story = {
  args: {
    color: 'default',
    radius: 'md',
    navButtonBordered: false,
    navButtonVariant: 'soft',
    size: '1',
  },
  render: args => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={false}
        color={args.color}
        radius={args.radius}
        navButtonBordered={args.navButtonBordered}
        navButtonVariant={args.navButtonVariant}
        size={args.size}
        className="rounded-md border"
      />
    )
  },
}

// ThemeProvider-driven calendar defaults
export const ThemeProviderDefaults: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <Theme calendar={{ navButtonBordered: true, radius: 'lg' }}>
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
      </Theme>
    )
  },
}

export const ThemeProviderLocaleDefaults: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <Theme locale={{ locale: 'fr-FR', language: 'fr', country: 'FR', timezone: 'Europe/Paris' }}>
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
      </Theme>
    )
  },
}

export const ThemeLocaleVsPropOverride: Story = {
  render: () => {
    const [themeDate, setThemeDate] = React.useState<Date | undefined>(new Date(2025, 5, 12))
    const [overrideDate, setOverrideDate] = React.useState<Date | undefined>(new Date(2025, 5, 12))

    return (
      <Theme
        locale={{ locale: 'fr-FR', language: 'fr', country: 'FR', timezone: 'Europe/Paris' }}
        calendar={{ locale: 'de-DE' }}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-2 text-center text-xs font-medium">Theme defaults (`de-DE`)</p>
            <Calendar
              mode="single"
              selected={themeDate}
              onSelect={setThemeDate}
              defaultMonth={new Date(2025, 5, 1)}
              className="rounded-md border"
            />
          </div>
          <div>
            <p className="mb-2 text-center text-xs font-medium">Prop override (`es-ES` + `UTC`)</p>
            <Calendar
              mode="single"
              localeCode="es-ES"
              timeZone="UTC"
              selected={overrideDate}
              onSelect={setOverrideDate}
              defaultMonth={new Date(2025, 5, 1)}
              className="rounded-md border"
            />
          </div>
        </div>
      </Theme>
    )
  },
}

export const LocaleKnobs: StoryObj<CalendarLocaleArgs> = {
  args: {
    localeCode: 'en-US',
    timeZone: 'UTC',
  },
  argTypes: {
    localeCode: {
      control: { type: 'select' },
      options: localeOptions,
    },
    timeZone: {
      control: { type: 'select' },
      options: timeZoneOptions,
    },
  },
  render: args => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 5, 12))
    const safeTimeZone = React.useMemo(() => {
      if (!args.timeZone) return undefined
      try {
        new Intl.DateTimeFormat('en-US', { timeZone: args.timeZone })
        return args.timeZone
      } catch {
        return undefined
      }
    }, [args.timeZone])

    return (
      <Calendar
        mode="single"
        localeCode={args.localeCode}
        timeZone={safeTimeZone}
        selected={date}
        onSelect={setDate}
        defaultMonth={new Date(2025, 5, 1)}
        className="rounded-md border"
      />
    )
  },
}
