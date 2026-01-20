"use client";

import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { DateRangePicker, type DateRange } from "./DateRangePicker";
import { FieldGroup } from "./FieldGroup";

const meta: Meta<typeof DateRangePicker> = {
  title: "Form/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

// Default DateRangePicker
export const Default: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>();
    return (
      <div className="w-[320px]">
        <DateRangePicker
          value={range}
          onChange={setRange}
          placeholder="Select date range"
        />
      </div>
    );
  },
};

// With preselected range
export const WithValue: Story = {
  render: () => {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 7);

    const [range, setRange] = React.useState<DateRange | undefined>({
      from: today,
      to: endDate,
    });
    return (
      <div className="w-[320px]">
        <DateRangePicker value={range} onChange={setRange} />
      </div>
    );
  },
};

// Single month view
export const SingleMonth: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>();
    return (
      <div className="w-[320px]">
        <DateRangePicker
          value={range}
          onChange={setRange}
          numberOfMonths={1}
          placeholder="Select range (1 month view)"
        />
      </div>
    );
  },
};

// Custom date format
export const CustomFormat: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>();
    return (
      <div className="w-[320px]">
        <DateRangePicker
          value={range}
          onChange={setRange}
          dateFormat="dd MMM yyyy"
          placeholder="DD MMM YYYY format"
        />
      </div>
    );
  },
};

// With min/max dates
export const WithMinMaxDates: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>();
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + 3);

    return (
      <div className="w-[320px]">
        <DateRangePicker
          value={range}
          onChange={setRange}
          minDate={today}
          maxDate={maxDate}
          placeholder="Next 3 months only"
        />
      </div>
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 7);

    return (
      <div className="w-[320px]">
        <DateRangePicker
          value={{ from: today, to: endDate }}
          disabled
        />
      </div>
    );
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => {
    const [range1, setRange1] = React.useState<DateRange | undefined>();
    const [range2, setRange2] = React.useState<DateRange | undefined>();
    const [range3, setRange3] = React.useState<DateRange | undefined>();
    const [range4, setRange4] = React.useState<DateRange | undefined>();

    return (
      <div className="flex flex-col gap-4 w-[320px]">
        <DateRangePicker value={range1} onChange={setRange1} size="1" placeholder="Size 1" />
        <DateRangePicker value={range2} onChange={setRange2} size="2" placeholder="Size 2" />
        <DateRangePicker value={range3} onChange={setRange3} size="3" placeholder="Size 3" />
        <DateRangePicker value={range4} onChange={setRange4} size="4" placeholder="Size 4" />
      </div>
    );
  },
};

// With FieldGroup context
export const WithFieldGroup: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>();
    return (
      <FieldGroup size="3" className="w-[360px]">
        <DateRangePicker
          value={range}
          onChange={setRange}
          placeholder="Inherits size from FieldGroup"
        />
      </FieldGroup>
    );
  },
};

// Different variants
export const Variants: Story = {
  render: () => {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 7);
    const range = { from: today, to: endDate };

    const [range1, setRange1] = React.useState<DateRange | undefined>(range);
    const [range2, setRange2] = React.useState<DateRange | undefined>(range);
    const [range3, setRange3] = React.useState<DateRange | undefined>(range);
    const [range4, setRange4] = React.useState<DateRange | undefined>(range);
    const [range5, setRange5] = React.useState<DateRange | undefined>(range);
    const [range6, setRange6] = React.useState<DateRange | undefined>(range);

    return (
      <div className="flex flex-col gap-4 w-[320px]">
        <div>
          <label className="text-sm font-medium mb-1 block">Outline (default)</label>
          <DateRangePicker value={range1} onChange={setRange1} variant="outline" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Solid</label>
          <DateRangePicker value={range2} onChange={setRange2} variant="solid" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Soft</label>
          <DateRangePicker value={range3} onChange={setRange3} variant="soft" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Surface</label>
          <DateRangePicker value={range4} onChange={setRange4} variant="surface" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Ghost</label>
          <DateRangePicker value={range5} onChange={setRange5} variant="ghost" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Classic</label>
          <DateRangePicker value={range6} onChange={setRange6} variant="classic" />
        </div>
      </div>
    );
  },
};

// Different colors with solid variant
export const Colors: Story = {
  render: () => {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 7);
    const range = { from: today, to: endDate };

    const [range1, setRange1] = React.useState<DateRange | undefined>(range);
    const [range2, setRange2] = React.useState<DateRange | undefined>(range);
    const [range3, setRange3] = React.useState<DateRange | undefined>(range);
    const [range4, setRange4] = React.useState<DateRange | undefined>(range);
    const [range5, setRange5] = React.useState<DateRange | undefined>(range);

    return (
      <div className="flex flex-col gap-4 w-[320px]">
        <div>
          <label className="text-sm font-medium mb-1 block">Primary</label>
          <DateRangePicker value={range1} onChange={setRange1} variant="solid" color="primary" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Success</label>
          <DateRangePicker value={range2} onChange={setRange2} variant="solid" color="success" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Warning</label>
          <DateRangePicker value={range3} onChange={setRange3} variant="solid" color="warning" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Error</label>
          <DateRangePicker value={range4} onChange={setRange4} variant="solid" color="error" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Info</label>
          <DateRangePicker value={range5} onChange={setRange5} variant="solid" color="info" />
        </div>
      </div>
    );
  },
};
