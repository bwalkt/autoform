import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading, Box } from "../elements";

const meta: Meta<typeof Heading> = {
  title: "Typography/Heading",
  component: Heading,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "The HTML heading element to render",
    },
    size: {
      control: "select",
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      description: "The size of the heading",
    },
    weight: {
      control: "select",
      options: ["light", "regular", "medium", "bold"],
      description: "The font weight",
    },
    color: {
      control: "select",
      options: ["default", "primary", "neutral", "info", "success", "warning", "error"],
      description: "The heading color",
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
    children: "The quick brown fox",
    size: "6",
    weight: "bold",
    as: "h1",
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4">
      <Heading size="9">Size 9 Heading</Heading>
      <Heading size="8">Size 8 Heading</Heading>
      <Heading size="7">Size 7 Heading</Heading>
      <Heading size="6">Size 6 Heading</Heading>
      <Heading size="5">Size 5 Heading</Heading>
      <Heading size="4">Size 4 Heading</Heading>
      <Heading size="3">Size 3 Heading</Heading>
      <Heading size="2">Size 2 Heading</Heading>
      <Heading size="1">Size 1 Heading</Heading>
    </Box>
  ),
};

// All Weights
export const AllWeights: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-2">
      <Heading size="5" weight="light">Light weight heading</Heading>
      <Heading size="5" weight="regular">Regular weight heading</Heading>
      <Heading size="5" weight="medium">Medium weight heading</Heading>
      <Heading size="5" weight="bold">Bold weight heading</Heading>
    </Box>
  ),
};

// All Colors
export const AllColors: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-2">
      <Heading size="4" color="default">Default color heading</Heading>
      <Heading size="4" color="primary">Primary color heading</Heading>
      <Heading size="4" color="neutral">Neutral color heading</Heading>
      <Heading size="4" color="info">Info color heading</Heading>
      <Heading size="4" color="success">Success color heading</Heading>
      <Heading size="4" color="warning">Warning color heading</Heading>
      <Heading size="4" color="error">Error color heading</Heading>
    </Box>
  ),
};

// Semantic HTML Elements
export const SemanticElements: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-2">
      <Heading as="h1" size="7">H1 Element</Heading>
      <Heading as="h2" size="6">H2 Element</Heading>
      <Heading as="h3" size="5">H3 Element</Heading>
      <Heading as="h4" size="4">H4 Element</Heading>
      <Heading as="h5" size="3">H5 Element</Heading>
      <Heading as="h6" size="2">H6 Element</Heading>
    </Box>
  ),
};

// With Margin
export const WithMargin: Story = {
  render: () => (
    <Box className="bg-gray-100 p-4">
      <Heading size="5" mb="1rem">Heading with margin bottom</Heading>
      <Heading size="5" mt="2rem">Heading with margin top</Heading>
    </Box>
  ),
};

// Alignment
export const Alignment: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4 w-full">
      <Heading size="4" align="left">Left aligned heading</Heading>
      <Heading size="4" align="center">Center aligned heading</Heading>
      <Heading size="4" align="right">Right aligned heading</Heading>
    </Box>
  ),
};
