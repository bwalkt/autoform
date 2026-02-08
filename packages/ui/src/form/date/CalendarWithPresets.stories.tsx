'use client'

import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import { CalendarWithPresets, type DateRangePreset } from './CalendarWithPresets'

const meta: Meta<typeof CalendarWithPresets> = {
  title: 'Form/Date/CalendarWithPresets',
  component: CalendarWithPresets,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof CalendarWithPresets>

// Default CalendarWithPresets
/** Default export. */
export const Default: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>()
    return (
      <div className="w-[360px]">
        <CalendarWithPresets value={range} onChange={setRange} />
        {range?.from && (
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Selected: {range.from.toLocaleDateString()}
            {range.to && ` - ${range.to.toLocaleDateString()}`}
          </p>
        )}
      </div>
    )
  },
}

// Horizontal layout
/** HorizontalLayout export. */
export const HorizontalLayout: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>()
    return (
      <div className="w-[600px]">
        <CalendarWithPresets value={range} onChange={setRange} layout="horizontal" />
      </div>
    )
  },
}

// Two month view
/** TwoMonths export. */
export const TwoMonths: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>()
    return (
      <div className="w-[600px]">
        <CalendarWithPresets value={range} onChange={setRange} numberOfMonths={2} />
      </div>
    )
  },
}

// Presets only (no calendar)
/** PresetsOnly export. */
export const PresetsOnly: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>()
    return (
      <div className="w-[360px]">
        <CalendarWithPresets value={range} onChange={setRange} showCalendar={false} />
        {range?.from && (
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Selected: {range.from.toLocaleDateString()}
            {range.to && ` - ${range.to.toLocaleDateString()}`}
          </p>
        )}
      </div>
    )
  },
}

// Custom presets
/** CustomPresets export. */
export const CustomPresets: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>()

    const customPresets: DateRangePreset[] = [
      {
        label: 'This week',
        getValue: () => {
          const today = new Date()
          const start = new Date(today)
          start.setDate(today.getDate() - today.getDay())
          const end = new Date(start)
          end.setDate(start.getDate() + 6)
          return { from: start, to: end }
        },
      },
      {
        label: 'This month',
        getValue: () => {
          const today = new Date()
          const start = new Date(today.getFullYear(), today.getMonth(), 1)
          const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
          return { from: start, to: end }
        },
      },
      {
        label: 'Q1',
        getValue: () => ({
          from: new Date(2026, 0, 1),
          to: new Date(2026, 2, 31),
        }),
      },
      {
        label: 'Q2',
        getValue: () => ({
          from: new Date(2026, 3, 1),
          to: new Date(2026, 5, 30),
        }),
      },
    ]

    return (
      <div className="w-[360px]">
        <CalendarWithPresets value={range} onChange={setRange} presets={customPresets} />
      </div>
    )
  },
}

// With min/max date
/** WithMinMaxDate export. */
export const WithMinMaxDate: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>()
    const today = new Date()
    const minDate = new Date(today)
    minDate.setDate(today.getDate() - 30)
    const maxDate = new Date(today)
    maxDate.setDate(today.getDate() + 30)

    return (
      <div className="w-[360px]">
        <CalendarWithPresets value={range} onChange={setRange} minDate={minDate} maxDate={maxDate} />
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Only dates within 30 days of today are selectable
        </p>
      </div>
    )
  },
}

// Disabled state
/** Disabled export. */
export const Disabled: Story = {
  render: () => {
    const today = new Date()
    const endDate = new Date(today)
    endDate.setDate(today.getDate() + 7)

    return (
      <div className="w-[360px]">
        <CalendarWithPresets value={{ from: today, to: endDate }} disabled />
      </div>
    )
  },
}

// Week starts Monday
/** WeekStartsMonday export. */
export const WeekStartsMonday: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>()
    return (
      <div className="w-[360px]">
        <CalendarWithPresets value={range} onChange={setRange} weekStartsOn={1} />
      </div>
    )
  },
}
