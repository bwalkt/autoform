import type { Meta, StoryObj } from "@storybook/react-vite";
import { Em, Strong, Text, Box } from "@/elements";

const meta: Meta = {
  title: "Typography/Inline Elements",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

// Em (Emphasis/Italic)
export const Emphasis: Story = {
  name: "Em (Emphasis)",
  render: () => (
    <Box display="flex" className="flex-col gap-4">
      <Text size="3">
        The <Em>most important</Em> thing to remember is consistency.
      </Text>
      <Text size="4">
        <Em>Emphasis</Em> is used to stress a word or phrase.
      </Text>
      <Text size="3">
        Use emphasis for <Em>technical terms</Em>, <Em>foreign words</Em>, or <Em>titles of works</Em>.
      </Text>
    </Box>
  ),
};

// Strong (Bold)
export const Bold: Story = {
  name: "Strong (Bold)",
  render: () => (
    <Box display="flex" className="flex-col gap-4">
      <Text size="3">
        <Strong>Warning:</Strong> This action cannot be undone.
      </Text>
      <Text size="4">
        The <Strong>key takeaway</Strong> from this article is simplicity.
      </Text>
      <Text size="3">
        Use strong for <Strong>important information</Strong> that needs to stand out.
      </Text>
    </Box>
  ),
};

// Combined Usage
export const CombinedUsage: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4 max-w-lg">
      <Text size="3">
        The <Em>most</Em> <Strong>important</Strong> thing to remember is that
        <Strong> good typography</Strong> makes content <Em>readable</Em> and{" "}
        <Em>accessible</Em>.
      </Text>

      <Text size="3">
        <Strong>Note:</Strong> You can combine <Em>emphasis</Em> and{" "}
        <Strong>strong</Strong> elements, and even nest them:{" "}
        <Strong><Em>important and emphasized</Em></Strong>.
      </Text>

      <Text size="3">
        When writing documentation, use <Strong>bold</Strong> for{" "}
        <Strong>warnings</Strong> and <Strong>key terms</Strong>, and use{" "}
        <Em>italics</Em> for <Em>emphasis</Em> and <Em>technical terms</Em>.
      </Text>
    </Box>
  ),
};

// In Different Text Sizes
export const InDifferentSizes: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-3">
      <Text size="1">Small text with <Strong>bold</Strong> and <Em>italic</Em></Text>
      <Text size="2">Text size 2 with <Strong>bold</Strong> and <Em>italic</Em></Text>
      <Text size="3">Text size 3 with <Strong>bold</Strong> and <Em>italic</Em></Text>
      <Text size="4">Text size 4 with <Strong>bold</Strong> and <Em>italic</Em></Text>
      <Text size="5">Text size 5 with <Strong>bold</Strong> and <Em>italic</Em></Text>
    </Box>
  ),
};
