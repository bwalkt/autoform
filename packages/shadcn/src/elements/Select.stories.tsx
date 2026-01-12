import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Select, SelectItem } from "../elements";

const meta: Meta<typeof Select> = {
  title: "Elements/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["1", "2", "3", "4"],
    },
    variant: {
      control: "select",
      options: ["solid", "outline", "soft", "ghost"],
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
    },
    error: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="w-64">
        <Select {...args} value={value} onValueChange={setValue}>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="elderberry">Elderberry</SelectItem>
        </Select>
      </div>
    );
  },
  args: {
    placeholder: "Select a fruit...",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      {(["1", "2", "3", "4"] as const).map((size) => (
        <Select key={size} size={size} placeholder={`Size ${size}`}>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </Select>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      {(["outline", "solid", "soft", "ghost"] as const).map((variant) => (
        <Select key={variant} variant={variant} placeholder={`${variant} variant`}>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </Select>
      ))}
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      {(["none", "sm", "md", "lg", "full"] as const).map((radius) => (
        <Select key={radius} radius={radius} placeholder={`${radius} radius`}>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </Select>
      ))}
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Select error placeholder="Select an option...">
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </Select>
      <p className="text-sm text-destructive">Please select an option</p>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-64">
      <Select disabled placeholder="Disabled select">
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </Select>
    </div>
  ),
};

export const Countries: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="w-64">
        <Select value={value} onValueChange={setValue} placeholder="Select a country...">
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
          <SelectItem value="au">Australia</SelectItem>
          <SelectItem value="de">Germany</SelectItem>
          <SelectItem value="fr">France</SelectItem>
          <SelectItem value="jp">Japan</SelectItem>
        </Select>
      </div>
    );
  },
};
