import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text, Box } from "@/elements";

const meta: Meta<typeof Text> = {
  title: "Typography/Text",
  component: Text,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      description: "The size of the text",
    },
    weight: {
      control: "select",
      options: ["light", "regular", "medium", "bold"],
      description: "The font weight",
    },
    color: {
      control: "select",
      options: ["default", "primary", "neutral", "info", "success", "warning", "error"],
      description: "The text color",
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
      description: "Text alignment",
    },
    wrap: {
      control: "select",
      options: ["wrap", "nowrap", "pretty", "balance"],
      description: "Text wrapping behavior",
    },
    truncate: {
      control: "boolean",
      description: "Whether to truncate text with ellipsis",
    },
    highContrast: {
      control: "boolean",
      description: "High contrast mode for better accessibility",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
    size: "3",
    weight: "regular",
    color: "default",
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-2">
      <Text size="1">Text size 1</Text>
      <Text size="2">Text size 2</Text>
      <Text size="3">Text size 3</Text>
      <Text size="4">Text size 4</Text>
      <Text size="5">Text size 5</Text>
      <Text size="6">Text size 6</Text>
      <Text size="7">Text size 7</Text>
      <Text size="8">Text size 8</Text>
      <Text size="9">Text size 9</Text>
    </Box>
  ),
};

// All Weights
export const AllWeights: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-2">
      <Text size="4" weight="light">Light weight text</Text>
      <Text size="4" weight="regular">Regular weight text</Text>
      <Text size="4" weight="medium">Medium weight text</Text>
      <Text size="4" weight="bold">Bold weight text</Text>
    </Box>
  ),
};

// All Colors
export const AllColors: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-2">
      <Text size="3" color="default">Default color text</Text>
      <Text size="3" color="primary">Primary color text</Text>
      <Text size="3" color="neutral">Neutral color text</Text>
      <Text size="3" color="info">Info color text</Text>
      <Text size="3" color="success">Success color text</Text>
      <Text size="3" color="warning">Warning color text</Text>
      <Text size="3" color="error">Error color text</Text>
    </Box>
  ),
};

// Alignment
export const Alignment: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4 w-full max-w-md">
      <Text align="left" className="bg-gray-100 p-2">Left aligned text</Text>
      <Text align="center" className="bg-gray-100 p-2">Center aligned text</Text>
      <Text align="right" className="bg-gray-100 p-2">Right aligned text</Text>
    </Box>
  ),
};

// Truncation
export const Truncation: Story = {
  render: () => (
    <Box className="w-48">
      <Text truncate>
        This is a very long text that will be truncated with an ellipsis at the end.
      </Text>
    </Box>
  ),
};

// As different elements
export const AsElement: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-2">
      <Text as="span">As span (default)</Text>
      <Text as="p">As paragraph</Text>
      <Text as="div">As div</Text>
      <Text as="label">As label</Text>
    </Box>
  ),
};
