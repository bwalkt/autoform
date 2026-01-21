import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { DatePicker } from "./DatePicker";
import { FieldGroup, Label } from "@/form";

const meta: Meta<typeof DatePicker> = {
  title: "Form/Date/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Default DatePicker
export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <div className="w-[280px]">
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Select a date"
        />
      </div>
    );
  },
};

// With preselected date
export const WithValue: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <div className="w-[280px]">
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
};

// Custom date format
export const CustomFormat: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <div className="w-[280px]">
        <DatePicker
          value={date}
          onChange={setDate}
          dateFormat="dd/MM/yyyy"
          placeholder="DD/MM/YYYY"
        />
      </div>
    );
  },
};

// With min/max dates
export const WithMinMaxDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 14);

    return (
      <div className="w-[280px]">
        <DatePicker
          value={date}
          onChange={setDate}
          minDate={today}
          maxDate={maxDate}
          placeholder="Select (next 2 weeks only)"
        />
      </div>
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <div className="w-[280px]">
        <DatePicker value={date} onChange={setDate} disabled />
      </div>
    );
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => {
    const [date1, setDate1] = React.useState<Date | undefined>();
    const [date2, setDate2] = React.useState<Date | undefined>();
    const [date3, setDate3] = React.useState<Date | undefined>();
    const [date4, setDate4] = React.useState<Date | undefined>();

    return (
      <div className="flex flex-col gap-4 w-[280px]">
        <DatePicker value={date1} onChange={setDate1} size="1" placeholder="Size 1" />
        <DatePicker value={date2} onChange={setDate2} size="2" placeholder="Size 2" />
        <DatePicker value={date3} onChange={setDate3} size="3" placeholder="Size 3" />
        <DatePicker value={date4} onChange={setDate4} size="4" placeholder="Size 4" />
      </div>
    );
  },
};

// With FieldGroup context
export const WithFieldGroup: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <FieldGroup size="3" className="w-[320px]">
        <DatePicker value={date} onChange={setDate} placeholder="Inherits size from FieldGroup" />
      </FieldGroup>
    );
  },
};

// Specific disabled dates
export const WithDisabledDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    const today = new Date();
    const disabledDates = [
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
    ];

    return (
      <div className="w-[280px]">
        <DatePicker
          value={date}
          onChange={setDate}
          disabledDates={disabledDates}
          placeholder="Some dates disabled"
        />
      </div>
    );
  },
};

// Different variants
export const Variants: Story = {
  render: () => {
    const [date1, setDate1] = React.useState<Date | undefined>(new Date());
    const [date2, setDate2] = React.useState<Date | undefined>(new Date());
    const [date3, setDate3] = React.useState<Date | undefined>(new Date());
    const [date4, setDate4] = React.useState<Date | undefined>(new Date());
    const [date5, setDate5] = React.useState<Date | undefined>(new Date());
    const [date6, setDate6] = React.useState<Date | undefined>(new Date());

    return (
      <div className="flex flex-col gap-4 w-[280px]">
        <div>
          <Label className="mb-1 block">Outline (default)</Label>
          <DatePicker value={date1} onChange={setDate1} variant="outline" />
        </div>
        <div>
          <Label className="mb-1 block">Solid</Label>
          <DatePicker value={date2} onChange={setDate2} variant="solid" />
        </div>
        <div>
          <Label className="mb-1 block">Soft</Label>
          <DatePicker value={date3} onChange={setDate3} variant="soft" />
        </div>
        <div>
          <Label className="mb-1 block">Surface</Label>
          <DatePicker value={date4} onChange={setDate4} variant="surface" />
        </div>
        <div>
          <Label className="mb-1 block">Ghost</Label>
          <DatePicker value={date5} onChange={setDate5} variant="ghost" />
        </div>
        <div>
          <Label className="mb-1 block">Classic</Label>
          <DatePicker value={date6} onChange={setDate6} variant="classic" />
        </div>
      </div>
    );
  },
};

// Natural language input
export const NaturalLanguage: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <div className="w-[280px] space-y-2">
        <DatePicker
          value={date}
          onChange={setDate}
          enableNaturalLanguage
          placeholder="Tomorrow or next week"
        />
        {date && (
          <p className="text-sm text-muted-foreground px-1">
            Selected: <span className="font-medium">{date.toLocaleDateString()}</span>
          </p>
        )}
      </div>
    );
  },
};

// Natural language with preselected value
export const NaturalLanguageWithValue: Story = {
  render: () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [date, setDate] = React.useState<Date | undefined>(tomorrow);
    return (
      <div className="w-[280px] space-y-2">
        <DatePicker
          value={date}
          onChange={setDate}
          enableNaturalLanguage
          placeholder="Type a date..."
        />
        {date && (
          <p className="text-sm text-muted-foreground px-1">
            Selected: <span className="font-medium">{date.toLocaleDateString()}</span>
          </p>
        )}
      </div>
    );
  },
};

// Natural language different sizes
export const NaturalLanguageSizes: Story = {
  render: () => {
    const [date1, setDate1] = React.useState<Date | undefined>();
    const [date2, setDate2] = React.useState<Date | undefined>();
    const [date3, setDate3] = React.useState<Date | undefined>();
    const [date4, setDate4] = React.useState<Date | undefined>();

    return (
      <div className="flex flex-col gap-4 w-[280px]">
        <DatePicker value={date1} onChange={setDate1} enableNaturalLanguage size="1" placeholder="Size 1" />
        <DatePicker value={date2} onChange={setDate2} enableNaturalLanguage size="2" placeholder="Size 2" />
        <DatePicker value={date3} onChange={setDate3} enableNaturalLanguage size="3" placeholder="Size 3" />
        <DatePicker value={date4} onChange={setDate4} enableNaturalLanguage size="4" placeholder="Size 4" />
      </div>
    );
  },
};

// Different colors with solid variant
export const Colors: Story = {
  render: () => {
    const [date1, setDate1] = React.useState<Date | undefined>(new Date());
    const [date2, setDate2] = React.useState<Date | undefined>(new Date());
    const [date3, setDate3] = React.useState<Date | undefined>(new Date());
    const [date4, setDate4] = React.useState<Date | undefined>(new Date());
    const [date5, setDate5] = React.useState<Date | undefined>(new Date());

    return (
      <div className="flex flex-col gap-4 w-[280px]">
        <div>
          <Label className="mb-1 block">Primary</Label>
          <DatePicker value={date1} onChange={setDate1} variant="solid" color="primary" />
        </div>
        <div>
          <Label className="mb-1 block">Success</Label>
          <DatePicker value={date2} onChange={setDate2} variant="solid" color="success" />
        </div>
        <div>
          <Label className="mb-1 block">Warning</Label>
          <DatePicker value={date3} onChange={setDate3} variant="solid" color="warning" />
        </div>
        <div>
          <Label className="mb-1 block">Error</Label>
          <DatePicker value={date4} onChange={setDate4} variant="solid" color="error" />
        </div>
        <div>
          <Label className="mb-1 block">Info</Label>
          <DatePicker value={date5} onChange={setDate5} variant="solid" color="info" />
        </div>
      </div>
    );
  },
};
