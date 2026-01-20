import type { Meta, StoryObj } from "@storybook/react-vite";
import { Blockquote, Box } from "@/elements";

const meta: Meta<typeof Blockquote> = {
  title: "Typography/Blockquote",
  component: Blockquote,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      description: "The size of the blockquote text",
    },
    weight: {
      control: "select",
      options: ["light", "regular", "medium", "bold"],
      description: "The font weight",
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
    wrap: {
      control: "select",
      options: ["wrap", "nowrap", "pretty", "balance"],
      description: "Text wrapping behavior",
    },
    truncate: {
      control: "boolean",
      description: "Whether to truncate text with ellipsis",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    children: "Typography is the craft of endowing human language with a durable visual form, and thus with an independent existence.",
    size: "3",
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4 max-w-xl">
      <Blockquote size="1">Size 1 blockquote - The quick brown fox jumps over the lazy dog.</Blockquote>
      <Blockquote size="2">Size 2 blockquote - The quick brown fox jumps over the lazy dog.</Blockquote>
      <Blockquote size="3">Size 3 blockquote - The quick brown fox jumps over the lazy dog.</Blockquote>
      <Blockquote size="4">Size 4 blockquote - The quick brown fox jumps over the lazy dog.</Blockquote>
      <Blockquote size="5">Size 5 blockquote - The quick brown fox jumps over the lazy dog.</Blockquote>
    </Box>
  ),
};

// All Colors
export const AllColors: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4 max-w-xl">
      <Blockquote color="default">Default color - Good design is as little design as possible.</Blockquote>
      <Blockquote color="primary">Primary color - Good design is as little design as possible.</Blockquote>
      <Blockquote color="neutral">Neutral color - Good design is as little design as possible.</Blockquote>
      <Blockquote color="info">Info color - Good design is as little design as possible.</Blockquote>
      <Blockquote color="success">Success color - Good design is as little design as possible.</Blockquote>
      <Blockquote color="warning">Warning color - Good design is as little design as possible.</Blockquote>
      <Blockquote color="error">Error color - Good design is as little design as possible.</Blockquote>
    </Box>
  ),
};

// All Weights
export const AllWeights: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4 max-w-xl">
      <Blockquote weight="light">Light weight - The quick brown fox jumps over the lazy dog.</Blockquote>
      <Blockquote weight="regular">Regular weight - The quick brown fox jumps over the lazy dog.</Blockquote>
      <Blockquote weight="medium">Medium weight - The quick brown fox jumps over the lazy dog.</Blockquote>
      <Blockquote weight="bold">Bold weight - The quick brown fox jumps over the lazy dog.</Blockquote>
    </Box>
  ),
};

// Real World Examples
export const RealWorldExamples: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-6 max-w-xl">
      <Blockquote size="4">
        "Design is not just what it looks like and feels like. Design is how it works."
      </Blockquote>

      <Blockquote size="3" color="info">
        "Simplicity is the ultimate sophistication."
        <cite className="block mt-2 text-sm not-italic opacity-70">— Leonardo da Vinci</cite>
      </Blockquote>

      <Blockquote size="3" color="success">
        "The best way to predict the future is to invent it."
        <cite className="block mt-2 text-sm not-italic opacity-70">— Alan Kay</cite>
      </Blockquote>

      <Blockquote size="2" color="warning">
        Note: This feature is experimental and may change in future releases.
      </Blockquote>
    </Box>
  ),
};

// Long Blockquote
export const LongBlockquote: Story = {
  render: () => (
    <Box className="max-w-xl">
      <Blockquote size="3">
        Typography is the art and technique of arranging type to make written language legible,
        readable and appealing when displayed. The arrangement of type involves selecting typefaces,
        point sizes, line lengths, line-spacing, and letter-spacing, and adjusting the space between
        pairs of letters. The term typography is also applied to the style, arrangement, and appearance
        of the letters, numbers, and symbols created by the process.
      </Blockquote>
    </Box>
  ),
};
