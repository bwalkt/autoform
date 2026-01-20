import type { Meta, StoryObj } from "@storybook/react-vite";
import { Code, Box, Text } from "../elements";

const meta: Meta<typeof Code> = {
  title: "Typography/Code",
  component: Code,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      description: "The size of the code text",
    },
    variant: {
      control: "select",
      options: ["solid", "soft", "outline", "ghost"],
      description: "The visual variant",
    },
    color: {
      control: "select",
      options: ["default", "primary", "neutral", "info", "success", "warning", "error"],
      description: "The accent color",
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
    children: "npm install @bwalkt/shadcn",
    variant: "soft",
  },
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-3">
      <Code variant="soft">Soft variant (default)</Code>
      <Code variant="solid">Solid variant</Code>
      <Code variant="outline">Outline variant</Code>
      <Code variant="ghost">Ghost variant</Code>
    </Box>
  ),
};

// All Colors (Soft Variant)
export const AllColors: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-3">
      <Code color="default">Default color</Code>
      <Code color="info">Info color</Code>
      <Code color="success">Success color</Code>
      <Code color="warning">Warning color</Code>
      <Code color="error">Error color</Code>
    </Box>
  ),
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-3">
      <Code size="1">Size 1 code</Code>
      <Code size="2">Size 2 code</Code>
      <Code size="3">Size 3 code</Code>
      <Code size="4">Size 4 code</Code>
      <Code size="5">Size 5 code</Code>
    </Box>
  ),
};

// Inline Code
export const InlineCode: Story = {
  render: () => (
    <Text size="3">
      Use the <Code>useState</Code> hook to manage state in functional components.
      You can also use <Code>useEffect</Code> for side effects.
    </Text>
  ),
};

// Real World Examples
export const RealWorldExamples: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4">
      <Box>
        <Text size="2" color="neutral" className="mb-1">Installation</Text>
        <Code variant="soft">npm install @bwalkt/shadcn</Code>
      </Box>
      <Box>
        <Text size="2" color="neutral" className="mb-1">Git command</Text>
        <Code variant="outline">git commit -m "feat: add new feature"</Code>
      </Box>
      <Box>
        <Text size="2" color="neutral" className="mb-1">Variable declaration</Text>
        <Code variant="solid">const theme = "dark";</Code>
      </Box>
      <Box>
        <Text size="2" color="neutral" className="mb-1">Success message</Text>
        <Code variant="soft" color="success">Build completed successfully!</Code>
      </Box>
      <Box>
        <Text size="2" color="neutral" className="mb-1">Error message</Text>
        <Code variant="soft" color="error">Error: Module not found</Code>
      </Box>
    </Box>
  ),
};
