"use client";

import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Calendar } from "./Calendar";
import type { DateRange } from "react-day-picker";

const meta: Meta<typeof Calendar> = {
  title: "Form/Date/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// Single date selection
export const Single: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    );
  },
};

// Multiple date selection
export const Multiple: Story = {
  render: () => {
    const [dates, setDates] = React.useState<Date[] | undefined>([]);
    return (
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        className="rounded-md border"
      />
    );
  },
};

// Date range selection
export const Range: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(),
      to: undefined,
    });
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        className="rounded-md border"
      />
    );
  },
};

// With min/max dates
export const WithMinMaxDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={[{ before: today }, { after: maxDate }]}
        className="rounded-md border"
      />
    );
  },
};

// Hide outside days
export const HideOutsideDays: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={false}
        className="rounded-md border"
      />
    );
  },
};
