import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Theme } from '@/elements/Theme'
import { Label } from '@/form'
import { MiniCalendar } from './MiniCalendar'

const meta: Meta<typeof MiniCalendar> = {
  title: 'Form/Date/MiniCalendar',
  component: MiniCalendar,
  parameters: {
    layout: 'centered',
  },
  args: {
    color: 'default',
    radius: 'md',
    navButtonBordered: false,
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'neutral', 'info', 'success', 'warning', 'error'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    navButtonBordered: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof MiniCalendar>

// Default MiniCalendar
export const Default: Story = {
  render: args => {
    const [date, setDate] = React.useState<Date>(new Date())
    return (
      <div className="w-[520px]">
        <MiniCalendar {...args} value={date} onChange={setDate} />
        <p className="text-sm text-muted-foreground mt-2 text-center">Selected: {date.toLocaleDateString()}</p>
      </div>
    )
  },
}

// Compact mode
export const Compact: Story = {
  render: args => {
    const [date, setDate] = React.useState<Date>(new Date())
    return (
      <div className="w-[300px]">
        <MiniCalendar {...args} value={date} onChange={setDate} compact />
        <p className="text-xs text-muted-foreground mt-2 text-center">Selected: {date.toLocaleDateString()}</p>
      </div>
    )
  },
}

// Without header
export const WithoutHeader: Story = {
  render: args => {
    const [date, setDate] = React.useState<Date>(new Date())
    return (
      <div className="w-[320px]">
        <MiniCalendar {...args} value={date} onChange={setDate} showHeader={false} />
      </div>
    )
  },
}

// Week starts on Monday
export const WeekStartsMonday: Story = {
  render: args => {
    const [date, setDate] = React.useState<Date>(new Date())
    return (
      <div className="w-[360px]">
        <MiniCalendar {...args} value={date} onChange={setDate} weekStartsOn={1} />
      </div>
    )
  },
}

// With min/max date
export const WithMinMaxDate: Story = {
  render: args => {
    const [date, setDate] = React.useState<Date>(new Date())
    const today = new Date()
    const minDate = new Date(today)
    minDate.setDate(today.getDate() - 3)
    const maxDate = new Date(today)
    maxDate.setDate(today.getDate() + 7)

    return (
      <div className="w-[360px]">
        <MiniCalendar {...args} value={date} onChange={setDate} minDate={minDate} maxDate={maxDate} />
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Only dates from {minDate.toLocaleDateString()} to {maxDate.toLocaleDateString()} are selectable
        </p>
      </div>
    )
  },
}

// Disabled state
export const Disabled: Story = {
  render: args => {
    return (
      <div className="w-[360px]">
        <MiniCalendar {...args} value={new Date()} disabled />
      </div>
    )
  },
}

// Multiple calendars
export const MultipleCalendars: Story = {
  render: args => {
    const [startDate, setStartDate] = React.useState<Date>(new Date())
    const [endDate, setEndDate] = React.useState<Date>(() => {
      const d = new Date()
      d.setDate(d.getDate() + 7)
      return d
    })

    return (
      <div className="flex flex-col gap-4 w-[360px]">
        <div>
          <Label className="mb-1 block">Start Date</Label>
          <MiniCalendar {...args} value={startDate} onChange={setStartDate} compact />
        </div>
        <div>
          <Label className="mb-1 block">End Date</Label>
          <MiniCalendar {...args} value={endDate} onChange={setEndDate} minDate={startDate} compact />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Range: {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </p>
      </div>
    )
  },
}

// In a card layout
export const InCard: Story = {
  render: args => {
    const [date, setDate] = React.useState<Date>(new Date())
    return (
      <div className="w-[400px] p-4 rounded-lg border bg-card shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Schedule</h3>
        <MiniCalendar {...args} value={date} onChange={setDate} className="border-0 p-0" />
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm">
            <span className="text-muted-foreground">Selected:</span>{' '}
            <span className="font-medium">
              {date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </p>
        </div>
      </div>
    )
  },
}

export const ThemeOverrideComparison: Story = {
  render: args => {
    const [leftDate, setLeftDate] = React.useState<Date>(new Date(2026, 1, 11))
    const [rightDate, setRightDate] = React.useState<Date>(new Date(2026, 1, 11))

    return (
      <div className="grid w-[980px] grid-cols-2 gap-6">
        <Theme
          radius="full"
          calendar={{
            radius: 'full',
            navButtonBordered: true,
          }}
        >
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Theme defaults only</p>
            <MiniCalendar value={leftDate} onChange={setLeftDate} />
          </div>
        </Theme>

        <Theme
          radius="sm"
          calendar={{
            radius: 'sm',
            navButtonBordered: false,
          }}
        >
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Component prop overrides</p>
            <MiniCalendar {...args} value={rightDate} onChange={setRightDate} />
          </div>
        </Theme>
      </div>
    )
  },
}
