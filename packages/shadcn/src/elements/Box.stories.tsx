import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "./Box";

const spacingOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const positioningOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "auto"];

const meta: Meta<typeof Box> = {
  title: "Elements/Box",
  component: Box,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // Polymorphic
    as: {
      control: "select",
      options: ["div", "span"],
      description: "The element to render as",
    },
    asChild: {
      control: "boolean",
      description: "Merge props onto child element instead of rendering a wrapper",
    },

    // Display & Position
    display: {
      control: "select",
      options: ["none", "inline", "inline-block", "block", "flex", "inline-flex", "grid", "inline-grid", "contents"],
      description: "CSS display property",
    },
    position: {
      control: "select",
      options: ["static", "relative", "absolute", "fixed", "sticky"],
      description: "CSS position property",
    },

    // Position offsets
    top: {
      control: "select",
      options: positioningOptions,
      description: "Top offset (for positioned elements)",
    },
    right: {
      control: "select",
      options: positioningOptions,
      description: "Right offset (for positioned elements)",
    },
    bottom: {
      control: "select",
      options: positioningOptions,
      description: "Bottom offset (for positioned elements)",
    },
    left: {
      control: "select",
      options: positioningOptions,
      description: "Left offset (for positioned elements)",
    },
    inset: {
      control: "select",
      options: positioningOptions,
      description: "Inset (shorthand for all offsets)",
    },

    // Padding
    p: {
      control: "select",
      options: spacingOptions,
      description: "Padding (all sides)",
    },
    px: {
      control: "select",
      options: spacingOptions,
      description: "Padding (horizontal)",
    },
    py: {
      control: "select",
      options: spacingOptions,
      description: "Padding (vertical)",
    },
    pt: {
      control: "select",
      options: spacingOptions,
      description: "Padding (top)",
    },
    pr: {
      control: "select",
      options: spacingOptions,
      description: "Padding (right)",
    },
    pb: {
      control: "select",
      options: spacingOptions,
      description: "Padding (bottom)",
    },
    pl: {
      control: "select",
      options: spacingOptions,
      description: "Padding (left)",
    },

    // Margin
    m: {
      control: "select",
      options: spacingOptions,
      description: "Margin (all sides)",
    },
    mx: {
      control: "select",
      options: spacingOptions,
      description: "Margin (horizontal)",
    },
    my: {
      control: "select",
      options: spacingOptions,
      description: "Margin (vertical)",
    },
    mt: {
      control: "select",
      options: spacingOptions,
      description: "Margin (top)",
    },
    mr: {
      control: "select",
      options: spacingOptions,
      description: "Margin (right)",
    },
    mb: {
      control: "select",
      options: spacingOptions,
      description: "Margin (bottom)",
    },
    ml: {
      control: "select",
      options: spacingOptions,
      description: "Margin (left)",
    },

    // Sizing
    width: {
      control: "text",
      description: "Width (CSS value like '100px', '50%', 'auto')",
    },
    height: {
      control: "text",
      description: "Height (CSS value)",
    },
    minWidth: {
      control: "text",
      description: "Minimum width",
    },
    minHeight: {
      control: "text",
      description: "Minimum height",
    },
    maxWidth: {
      control: "text",
      description: "Maximum width",
    },
    maxHeight: {
      control: "text",
      description: "Maximum height",
    },

    // Overflow
    overflow: {
      control: "select",
      options: ["visible", "hidden", "clip", "scroll", "auto"],
      description: "CSS overflow property",
    },
    overflowX: {
      control: "select",
      options: ["visible", "hidden", "clip", "scroll", "auto"],
      description: "CSS overflow-x property",
    },
    overflowY: {
      control: "select",
      options: ["visible", "hidden", "clip", "scroll", "auto"],
      description: "CSS overflow-y property",
    },

    // Flex item props
    flexBasis: {
      control: "text",
      description: "CSS flex-basis property",
    },
    flexShrink: {
      control: "select",
      options: ["0", "1"],
      description: "CSS flex-shrink property",
    },
    flexGrow: {
      control: "select",
      options: ["0", "1"],
      description: "CSS flex-grow property",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Basic Box",
    p: "4",
  },
  render: (args) => (
    <Box {...args} className="bg-muted border border-border rounded-md">
      {args.children}
    </Box>
  ),
};

export const WithPadding: Story = {
  args: {
    p: "6",
    children: "Box with padding",
  },
  render: (args) => (
    <Box {...args} className="bg-primary text-primary-foreground rounded-md">
      {args.children}
    </Box>
  ),
};

export const FlexContainer: Story = {
  args: {
    display: "flex",
    p: "4",
  },
  render: (args) => (
    <Box {...args} className="gap-4 bg-muted rounded-md">
      <Box p="3" className="bg-primary text-primary-foreground rounded">Item 1</Box>
      <Box p="3" className="bg-primary text-primary-foreground rounded">Item 2</Box>
      <Box p="3" className="bg-primary text-primary-foreground rounded">Item 3</Box>
    </Box>
  ),
};

export const GridContainer: Story = {
  args: {
    display: "grid",
    p: "4",
  },
  render: (args) => (
    <Box {...args} className="grid-cols-3 gap-4 bg-muted rounded-md" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      <Box p="3" className="bg-primary text-primary-foreground rounded text-center">1</Box>
      <Box p="3" className="bg-primary text-primary-foreground rounded text-center">2</Box>
      <Box p="3" className="bg-primary text-primary-foreground rounded text-center">3</Box>
      <Box p="3" className="bg-primary text-primary-foreground rounded text-center">4</Box>
      <Box p="3" className="bg-primary text-primary-foreground rounded text-center">5</Box>
      <Box p="3" className="bg-primary text-primary-foreground rounded text-center">6</Box>
    </Box>
  ),
};

export const AsSpan: Story = {
  args: {
    as: "span",
    display: "inline-block",
    px: "2",
    py: "1",
  },
  render: (args) => (
    <p>
      This is text with an{" "}
      <Box {...args} className="bg-accent text-accent-foreground rounded">
        inline box
      </Box>{" "}
      in the middle.
    </p>
  ),
};

export const NestedBoxes: Story = {
  render: () => (
    <Box p="4" className="bg-muted rounded-lg">
      <Box p="4" className="bg-card rounded-md border border-border">
        <Box p="3" className="bg-primary text-primary-foreground rounded">
          Deeply nested content
        </Box>
      </Box>
    </Box>
  ),
};

export const ResponsivePadding: Story = {
  render: () => (
    <Box
      p={{ initial: "2", sm: "4", md: "6", lg: "8" }}
      className="bg-muted border border-border rounded-md"
    >
      <p className="text-sm text-muted-foreground">
        Resize the viewport to see padding change
      </p>
      <p className="font-medium">Responsive padding: p-2 → sm:p-4 → md:p-6 → lg:p-8</p>
    </Box>
  ),
};

export const PositionExample: Story = {
  render: () => (
    <Box position="relative" p="8" className="bg-muted rounded-md h-40">
      <Box
        position="absolute"
        top="2"
        right="2"
        p="2"
        className="bg-primary text-primary-foreground rounded text-sm"
      >
        Top Right
      </Box>
      <Box
        position="absolute"
        bottom="2"
        left="2"
        p="2"
        className="bg-secondary text-secondary-foreground rounded text-sm"
      >
        Bottom Left
      </Box>
    </Box>
  ),
};

export const SizingExample: Story = {
  render: () => (
    <Box display="flex" className="gap-4">
      <Box
        p="4"
        width="150px"
        height="100px"
        className="bg-primary text-primary-foreground rounded flex items-center justify-center"
      >
        150 × 100
      </Box>
      <Box
        p="4"
        width="200px"
        height="100px"
        className="bg-secondary text-secondary-foreground rounded flex items-center justify-center"
      >
        200 × 100
      </Box>
    </Box>
  ),
};

export const OverflowExample: Story = {
  render: () => (
    <Box
      p="4"
      width="200px"
      height="100px"
      overflow="auto"
      className="bg-muted border border-border rounded-md"
    >
      <p>
        This is a long content that will overflow the container.
        Scroll to see more content. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.
      </p>
    </Box>
  ),
};
