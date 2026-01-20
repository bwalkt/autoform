"use client";

import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TimePicker, type TimeValue } from "./TimePicker";
import { FieldGroup } from "./FieldGroup";

const meta: Meta<typeof TimePicker> = {
  title: "Form/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

// Default TimePicker
export const Default: Story = {
  render: () => {
    const [time, setTime] = React.useState<TimeValue | undefined>();
    return (
      <div className="w-[200px]">
        <TimePicker
          value={time}
          onChange={setTime}
          placeholder="Select time"
        />
      </div>
    );
  },
};

// With preselected time
export const WithValue: Story = {
  render: () => {
    const [time, setTime] = React.useState<TimeValue | undefined>({
      hours: 14,
      minutes: 30,
    });
    return (
      <div className="w-[200px]">
        <TimePicker value={time} onChange={setTime} />
      </div>
    );
  },
};

// With seconds
export const WithSeconds: Story = {
  render: () => {
    const [time, setTime] = React.useState<TimeValue | undefined>({
      hours: 9,
      minutes: 15,
      seconds: 45,
    });
    return (
      <div className="w-[200px]">
        <TimePicker value={time} onChange={setTime} showSeconds />
      </div>
    );
  },
};

// 12-hour format with AM/PM
export const TwelveHourFormat: Story = {
  render: () => {
    const [time, setTime] = React.useState<TimeValue | undefined>({
      hours: 14,
      minutes: 30,
    });
    return (
      <div className="w-[200px]">
        <TimePicker
          value={time}
          onChange={setTime}
          use12HourFormat
          placeholder="Select time (12h)"
        />
      </div>
    );
  },
};

// 12-hour format with seconds
export const TwelveHourWithSeconds: Story = {
  render: () => {
    const [time, setTime] = React.useState<TimeValue | undefined>({
      hours: 9,
      minutes: 15,
      seconds: 30,
    });
    return (
      <div className="w-[240px]">
        <TimePicker
          value={time}
          onChange={setTime}
          use12HourFormat
          showSeconds
        />
      </div>
    );
  },
};

// With minute step
export const WithMinuteStep: Story = {
  render: () => {
    const [time, setTime] = React.useState<TimeValue | undefined>();
    return (
      <div className="w-[200px]">
        <TimePicker
          value={time}
          onChange={setTime}
          minuteStep={15}
          placeholder="15-minute intervals"
        />
      </div>
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => {
    return (
      <div className="w-[200px]">
        <TimePicker
          value={{ hours: 10, minutes: 0 }}
          disabled
        />
      </div>
    );
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => {
    const [time1, setTime1] = React.useState<TimeValue | undefined>();
    const [time2, setTime2] = React.useState<TimeValue | undefined>();
    const [time3, setTime3] = React.useState<TimeValue | undefined>();
    const [time4, setTime4] = React.useState<TimeValue | undefined>();

    return (
      <div className="flex flex-col gap-4 w-[200px]">
        <TimePicker value={time1} onChange={setTime1} size="1" placeholder="Size 1" />
        <TimePicker value={time2} onChange={setTime2} size="2" placeholder="Size 2" />
        <TimePicker value={time3} onChange={setTime3} size="3" placeholder="Size 3" />
        <TimePicker value={time4} onChange={setTime4} size="4" placeholder="Size 4" />
      </div>
    );
  },
};

// With FieldGroup context
export const WithFieldGroup: Story = {
  render: () => {
    const [time, setTime] = React.useState<TimeValue | undefined>();
    return (
      <FieldGroup size="3" className="w-[240px]">
        <TimePicker value={time} onChange={setTime} placeholder="Inherits size from FieldGroup" />
      </FieldGroup>
    );
  },
};

// Morning/Afternoon comparison
export const MorningAfternoon: Story = {
  render: () => {
    const [morning, setMorning] = React.useState<TimeValue | undefined>({
      hours: 9,
      minutes: 0,
    });
    const [afternoon, setAfternoon] = React.useState<TimeValue | undefined>({
      hours: 14,
      minutes: 30,
    });

    return (
      <div className="flex flex-col gap-4 w-[200px]">
        <div>
          <label className="text-sm font-medium mb-1 block">Morning (24h)</label>
          <TimePicker value={morning} onChange={setMorning} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Afternoon (12h)</label>
          <TimePicker value={afternoon} onChange={setAfternoon} use12HourFormat />
        </div>
      </div>
    );
  },
};

// Different variants
export const Variants: Story = {
  render: () => {
    const [time1, setTime1] = React.useState<TimeValue | undefined>({ hours: 9, minutes: 0 });
    const [time2, setTime2] = React.useState<TimeValue | undefined>({ hours: 10, minutes: 30 });
    const [time3, setTime3] = React.useState<TimeValue | undefined>({ hours: 12, minutes: 0 });
    const [time4, setTime4] = React.useState<TimeValue | undefined>({ hours: 14, minutes: 15 });
    const [time5, setTime5] = React.useState<TimeValue | undefined>({ hours: 16, minutes: 45 });
    const [time6, setTime6] = React.useState<TimeValue | undefined>({ hours: 18, minutes: 0 });

    return (
      <div className="flex flex-col gap-4 w-[200px]">
        <div>
          <label className="text-sm font-medium mb-1 block">Outline (default)</label>
          <TimePicker value={time1} onChange={setTime1} variant="outline" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Solid</label>
          <TimePicker value={time2} onChange={setTime2} variant="solid" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Soft</label>
          <TimePicker value={time3} onChange={setTime3} variant="soft" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Surface</label>
          <TimePicker value={time4} onChange={setTime4} variant="surface" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Ghost</label>
          <TimePicker value={time5} onChange={setTime5} variant="ghost" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Classic</label>
          <TimePicker value={time6} onChange={setTime6} variant="classic" />
        </div>
      </div>
    );
  },
};

// Different colors
export const Colors: Story = {
  render: () => {
    const [time1, setTime1] = React.useState<TimeValue | undefined>({ hours: 9, minutes: 0 });
    const [time2, setTime2] = React.useState<TimeValue | undefined>({ hours: 10, minutes: 0 });
    const [time3, setTime3] = React.useState<TimeValue | undefined>({ hours: 11, minutes: 0 });
    const [time4, setTime4] = React.useState<TimeValue | undefined>({ hours: 12, minutes: 0 });
    const [time5, setTime5] = React.useState<TimeValue | undefined>({ hours: 13, minutes: 0 });

    return (
      <div className="flex flex-col gap-4 w-[200px]">
        <div>
          <label className="text-sm font-medium mb-1 block">Primary</label>
          <TimePicker value={time1} onChange={setTime1} variant="solid" color="primary" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Success</label>
          <TimePicker value={time2} onChange={setTime2} variant="solid" color="success" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Warning</label>
          <TimePicker value={time3} onChange={setTime3} variant="solid" color="warning" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Error</label>
          <TimePicker value={time4} onChange={setTime4} variant="solid" color="error" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Info</label>
          <TimePicker value={time5} onChange={setTime5} variant="solid" color="info" />
        </div>
      </div>
    );
  },
};

// Soft variant with colors
export const SoftColors: Story = {
  render: () => {
    const [time1, setTime1] = React.useState<TimeValue | undefined>({ hours: 9, minutes: 0 });
    const [time2, setTime2] = React.useState<TimeValue | undefined>({ hours: 10, minutes: 0 });
    const [time3, setTime3] = React.useState<TimeValue | undefined>({ hours: 11, minutes: 0 });
    const [time4, setTime4] = React.useState<TimeValue | undefined>({ hours: 12, minutes: 0 });

    return (
      <div className="flex flex-col gap-4 w-[200px]">
        <div>
          <label className="text-sm font-medium mb-1 block">Soft Primary</label>
          <TimePicker value={time1} onChange={setTime1} variant="soft" color="primary" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Soft Success</label>
          <TimePicker value={time2} onChange={setTime2} variant="soft" color="success" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Soft Warning</label>
          <TimePicker value={time3} onChange={setTime3} variant="soft" color="warning" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Soft Error</label>
          <TimePicker value={time4} onChange={setTime4} variant="soft" color="error" />
        </div>
      </div>
    );
  },
};
