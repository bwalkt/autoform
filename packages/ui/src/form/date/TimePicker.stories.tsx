import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { FieldGroup, Label } from '@/form'
import { TimePicker, type TimeValue } from './TimePicker'

const meta: Meta<typeof TimePicker> = {
  title: 'Form/Date/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof TimePicker>

// Default TimePicker
/** Default export. */
export const Default: Story = {
  render: () => {
    const [time, setTime] = React.useState<TimeValue | undefined>()
    return (
      <div className="w-[200px]">
        <TimePicker value={time} onChange={setTime} placeholder="Select time" />
      </div>
    )
  },
}

// With preselected time
/** WithValue export. */
export const WithValue: Story = {
  render: () => {
    const [time, setTime] = React.useState<TimeValue | undefined>({
      hours: 14,
      minutes: 30,
    })
    return (
      <div className="w-[200px]">
        <TimePicker value={time} onChange={setTime} />
      </div>
    )
  },
}

// With seconds
/** WithSeconds export. */
export const WithSeconds: Story = {
  render: () => {
    const [time, setTime] = React.useState<TimeValue | undefined>({
      hours: 9,
      minutes: 15,
      seconds: 45,
    })
    return (
      <div className="w-[200px]">
        <TimePicker value={time} onChange={setTime} showSeconds />
      </div>
    )
  },
}

// 12-hour format with AM/PM
/** TwelveHourFormat export. */
export const TwelveHourFormat: Story = {
  render: () => {
    const [time, setTime] = React.useState<TimeValue | undefined>({
      hours: 14,
      minutes: 30,
    })
    return (
      <div className="w-[200px]">
        <TimePicker value={time} onChange={setTime} use12HourFormat placeholder="Select time (12h)" />
      </div>
    )
  },
}

// 12-hour format with seconds
/** TwelveHourWithSeconds export. */
export const TwelveHourWithSeconds: Story = {
  render: () => {
    const [time, setTime] = React.useState<TimeValue | undefined>({
      hours: 9,
      minutes: 15,
      seconds: 30,
    })
    return (
      <div className="w-[240px]">
        <TimePicker value={time} onChange={setTime} use12HourFormat showSeconds />
      </div>
    )
  },
}

// With minute step
/** WithMinuteStep export. */
export const WithMinuteStep: Story = {
  render: () => {
    const [time, setTime] = React.useState<TimeValue | undefined>()
    return (
      <div className="w-[200px]">
        <TimePicker value={time} onChange={setTime} minuteStep={15} placeholder="15-minute intervals" />
      </div>
    )
  },
}

// Disabled state
/** Disabled export. */
export const Disabled: Story = {
  render: () => {
    return (
      <div className="w-[200px]">
        <TimePicker value={{ hours: 10, minutes: 0 }} disabled />
      </div>
    )
  },
}

// Different sizes
/** Sizes export. */
export const Sizes: Story = {
  render: () => {
    const [time1, setTime1] = React.useState<TimeValue | undefined>()
    const [time2, setTime2] = React.useState<TimeValue | undefined>()
    const [time3, setTime3] = React.useState<TimeValue | undefined>()
    const [time4, setTime4] = React.useState<TimeValue | undefined>()

    return (
      <div className="flex flex-col gap-4 w-[200px]">
        <TimePicker value={time1} onChange={setTime1} size="1" placeholder="Size 1" />
        <TimePicker value={time2} onChange={setTime2} size="2" placeholder="Size 2" />
        <TimePicker value={time3} onChange={setTime3} size="3" placeholder="Size 3" />
        <TimePicker value={time4} onChange={setTime4} size="4" placeholder="Size 4" />
      </div>
    )
  },
}

// With FieldGroup context
/** WithFieldGroup export. */
export const WithFieldGroup: Story = {
  render: () => {
    const [time, setTime] = React.useState<TimeValue | undefined>()
    return (
      <FieldGroup size="3" className="w-[240px]">
        <TimePicker value={time} onChange={setTime} placeholder="Inherits size from FieldGroup" />
      </FieldGroup>
    )
  },
}

// Morning/Afternoon comparison
/** MorningAfternoon export. */
export const MorningAfternoon: Story = {
  render: () => {
    const [morning, setMorning] = React.useState<TimeValue | undefined>({
      hours: 9,
      minutes: 0,
    })
    const [afternoon, setAfternoon] = React.useState<TimeValue | undefined>({
      hours: 14,
      minutes: 30,
    })

    return (
      <div className="flex flex-col gap-4 w-[200px]">
        <div>
          <Label htmlFor="morning-time" className="mb-1 block">
            Morning (24h)
          </Label>
          <TimePicker id="morning-time" value={morning} onChange={setMorning} />
        </div>
        <div>
          <Label htmlFor="afternoon-time" className="mb-1 block">
            Afternoon (12h)
          </Label>
          <TimePicker id="afternoon-time" value={afternoon} onChange={setAfternoon} use12HourFormat />
        </div>
      </div>
    )
  },
}

// Different variants
/** Variants export. */
export const Variants: Story = {
  render: () => {
    const [time1, setTime1] = React.useState<TimeValue | undefined>({ hours: 9, minutes: 0 })
    const [time2, setTime2] = React.useState<TimeValue | undefined>({ hours: 10, minutes: 30 })
    const [time3, setTime3] = React.useState<TimeValue | undefined>({ hours: 12, minutes: 0 })
    const [time4, setTime4] = React.useState<TimeValue | undefined>({ hours: 14, minutes: 15 })
    const [time5, setTime5] = React.useState<TimeValue | undefined>({ hours: 16, minutes: 45 })
    const [time6, setTime6] = React.useState<TimeValue | undefined>({ hours: 18, minutes: 0 })

    return (
      <div className="flex flex-col gap-4 w-[200px]">
        <div>
          <Label className="mb-1 block">Outline (default)</Label>
          <TimePicker value={time1} onChange={setTime1} variant="outline" />
        </div>
        <div>
          <Label className="mb-1 block">Solid</Label>
          <TimePicker value={time2} onChange={setTime2} variant="solid" />
        </div>
        <div>
          <Label className="mb-1 block">Soft</Label>
          <TimePicker value={time3} onChange={setTime3} variant="soft" />
        </div>
        <div>
          <Label className="mb-1 block">Surface</Label>
          <TimePicker value={time4} onChange={setTime4} variant="surface" />
        </div>
        <div>
          <Label className="mb-1 block">Ghost</Label>
          <TimePicker value={time5} onChange={setTime5} variant="ghost" />
        </div>
        <div>
          <Label className="mb-1 block">Classic</Label>
          <TimePicker value={time6} onChange={setTime6} variant="classic" />
        </div>
      </div>
    )
  },
}

// Different colors
/** Colors export. */
export const Colors: Story = {
  render: () => {
    const [time1, setTime1] = React.useState<TimeValue | undefined>({ hours: 9, minutes: 0 })
    const [time2, setTime2] = React.useState<TimeValue | undefined>({ hours: 10, minutes: 0 })
    const [time3, setTime3] = React.useState<TimeValue | undefined>({ hours: 11, minutes: 0 })
    const [time4, setTime4] = React.useState<TimeValue | undefined>({ hours: 12, minutes: 0 })
    const [time5, setTime5] = React.useState<TimeValue | undefined>({ hours: 13, minutes: 0 })

    return (
      <div className="flex flex-col gap-4 w-[200px]">
        <div>
          <Label className="mb-1 block">Primary</Label>
          <TimePicker value={time1} onChange={setTime1} variant="solid" color="primary" />
        </div>
        <div>
          <Label className="mb-1 block">Success</Label>
          <TimePicker value={time2} onChange={setTime2} variant="solid" color="success" />
        </div>
        <div>
          <Label className="mb-1 block">Warning</Label>
          <TimePicker value={time3} onChange={setTime3} variant="solid" color="warning" />
        </div>
        <div>
          <Label className="mb-1 block">Error</Label>
          <TimePicker value={time4} onChange={setTime4} variant="solid" color="error" />
        </div>
        <div>
          <Label className="mb-1 block">Info</Label>
          <TimePicker value={time5} onChange={setTime5} variant="solid" color="info" />
        </div>
      </div>
    )
  },
}

// Soft variant with colors
/** SoftColors export. */
export const SoftColors: Story = {
  render: () => {
    const [time1, setTime1] = React.useState<TimeValue | undefined>({ hours: 9, minutes: 0 })
    const [time2, setTime2] = React.useState<TimeValue | undefined>({ hours: 10, minutes: 0 })
    const [time3, setTime3] = React.useState<TimeValue | undefined>({ hours: 11, minutes: 0 })
    const [time4, setTime4] = React.useState<TimeValue | undefined>({ hours: 12, minutes: 0 })

    return (
      <div className="flex flex-col gap-4 w-[200px]">
        <div>
          <Label className="mb-1 block">Soft Primary</Label>
          <TimePicker value={time1} onChange={setTime1} variant="soft" color="primary" />
        </div>
        <div>
          <Label className="mb-1 block">Soft Success</Label>
          <TimePicker value={time2} onChange={setTime2} variant="soft" color="success" />
        </div>
        <div>
          <Label className="mb-1 block">Soft Warning</Label>
          <TimePicker value={time3} onChange={setTime3} variant="soft" color="warning" />
        </div>
        <div>
          <Label className="mb-1 block">Soft Error</Label>
          <TimePicker value={time4} onChange={setTime4} variant="soft" color="error" />
        </div>
      </div>
    )
  },
}
