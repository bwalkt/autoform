'use client'

import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import { Calendar } from './Calendar'

const meta: Meta<typeof Calendar> = {
  title: 'Form/Date/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

// calendar-01 style
export const DefaultMonth: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const today = new Date()
    return (
      <div>
        <Calendar selected={date} onSelect={setDate} today={today} className="rounded-md border" />
      </div>
    )
  },
}

// Multi-month automatic range mode (calendar-04 style)
export const MultiMonthRange: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2025, 4, 22),
      to: new Date(2025, 5, 17),
    })

    return (
      <div>
        <Calendar
          from={new Date(2025, 4, 1)}
          to={new Date(2025, 5, 1)}
          selected={range}
          onSelect={setRange}
          className="rounded-md border"
        />
        <p className="text-muted-foreground mt-3 text-center text-xs">Multi month calendar with range selection</p>
      </div>
    )
  },
}

// Multiple date selection (explicit mode override)
export const Multiple: Story = {
  render: () => {
    const [dates, setDates] = React.useState<Date[] | undefined>([])
    return <Calendar mode="multiple" selected={dates} onSelect={setDates} className="rounded-md border" />
  },
}

// With min/max dates
export const WithMinMaxDates: Story = {
  render: () => {
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
        className="rounded-md border"
      />
    )
  },
}

// Hide outside days
export const HideOutsideDays: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={false}
        className="rounded-md border"
      />
    )
  },
}
