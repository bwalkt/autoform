import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { DateTimePicker } from "./DateTimePicker";
import { FieldGroup, Label } from "@/form";

const meta: Meta<typeof DateTimePicker> = {
  title: "Form/Date/DateTimePicker",
  component: DateTimePicker,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

// Default DateTimePicker
export const Default: Story = {
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date | undefined>();
    return (
      <div className="w-[320px]">
        <DateTimePicker
          value={dateTime}
          onChange={setDateTime}
          placeholder="Select date and time"
        />
      </div>
    );
  },
};

// With preselected date and time
export const WithValue: Story = {
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date | undefined>(new Date());
    return (
      <div className="w-[320px]">
        <DateTimePicker value={dateTime} onChange={setDateTime} />
      </div>
    );
  },
};

// With seconds
export const WithSeconds: Story = {
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date | undefined>(new Date());
    return (
      <div className="w-[320px]">
        <DateTimePicker
          value={dateTime}
          onChange={setDateTime}
          showSeconds
          dateFormat="PPP HH:mm:ss"
        />
      </div>
    );
  },
};

// Custom date format
export const CustomFormat: Story = {
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date | undefined>(new Date());
    return (
      <div className="w-[320px]">
        <DateTimePicker
          value={dateTime}
          onChange={setDateTime}
          dateFormat="dd/MM/yyyy HH:mm"
          placeholder="DD/MM/YYYY HH:mm"
        />
      </div>
    );
  },
};

// With min/max dates
export const WithMinMaxDates: Story = {
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date | undefined>();
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7);

    return (
      <div className="w-[320px]">
        <DateTimePicker
          value={dateTime}
          onChange={setDateTime}
          minDate={today}
          maxDate={maxDate}
          placeholder="Next 7 days only"
        />
      </div>
    );
  },
};

// With minute step
export const WithMinuteStep: Story = {
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date | undefined>();
    return (
      <div className="w-[320px]">
        <DateTimePicker
          value={dateTime}
          onChange={setDateTime}
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
      <div className="w-[320px]">
        <DateTimePicker value={new Date()} disabled />
      </div>
    );
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => {
    const [dt1, setDt1] = React.useState<Date | undefined>();
    const [dt2, setDt2] = React.useState<Date | undefined>();
    const [dt3, setDt3] = React.useState<Date | undefined>();
    const [dt4, setDt4] = React.useState<Date | undefined>();

    return (
      <div className="flex flex-col gap-4 w-[320px]">
        <DateTimePicker value={dt1} onChange={setDt1} size="1" placeholder="Size 1" />
        <DateTimePicker value={dt2} onChange={setDt2} size="2" placeholder="Size 2" />
        <DateTimePicker value={dt3} onChange={setDt3} size="3" placeholder="Size 3" />
        <DateTimePicker value={dt4} onChange={setDt4} size="4" placeholder="Size 4" />
      </div>
    );
  },
};

// With FieldGroup context
export const WithFieldGroup: Story = {
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date | undefined>();
    return (
      <FieldGroup size="3" className="w-[360px]">
        <DateTimePicker
          value={dateTime}
          onChange={setDateTime}
          placeholder="Inherits size from FieldGroup"
        />
      </FieldGroup>
    );
  },
};

// Complete form example
export const InForm: Story = {
  render: () => {
    const [appointmentDate, setAppointmentDate] = React.useState<Date | undefined>();
    const [reminderDate, setReminderDate] = React.useState<Date | undefined>();

    return (
      <FieldGroup size="2" layout="stacked" gap="4" className="w-[360px]">
        <div className="space-y-2">
          <Label htmlFor="appointment-datetime">Appointment Date & Time</Label>
          <DateTimePicker
            id="appointment-datetime"
            value={appointmentDate}
            onChange={setAppointmentDate}
            placeholder="Select appointment"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reminder-datetime">Reminder</Label>
          <DateTimePicker
            id="reminder-datetime"
            value={reminderDate}
            onChange={setReminderDate}
            placeholder="Set reminder"
            minuteStep={15}
          />
        </div>
      </FieldGroup>
    );
  },
};
