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
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

// calendar-01 style
export const DefaultMonth: Story = {
  args: {
    color: 'default',
    radius: 'md',
    navButtonBordered: false,
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
          className="rounded-md border"
        />
      </div>
    )
  },
}

// Single-month range selection
export const SingleMonthRange: Story = {
  args: {
    color: 'primary',
    radius: 'md',
    navButtonBordered: false,
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
