import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { Box } from "../layouts/Box";
import { Mail, ChevronRight, Plus, Trash2, Download, Heart, Send } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Elements/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["1", "2", "3", "4"],
      description: "The size of the button",
    },
    variant: {
      control: "select",
      options: ["classic", "solid", "soft", "surface", "outline", "ghost"],
      description: "The visual variant of the button",
    },
    color: {
      control: "select",
      options: ["default", "primary", "neutral", "info", "success", "warning", "error"],
      description: "The accent color of the button",
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      description: "The border radius of the button",
    },
    loading: {
      control: "boolean",
      description: "Whether the button is in a loading state",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
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
    children: "Button",
  },
};

// Variants
export const Solid: Story = {
  args: {
    variant: "solid",
    children: "Solid Button",
  },
};

export const Soft: Story = {
  args: {
    variant: "soft",
    children: "Soft Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

// Sizes
export const Size1: Story = {
  name: "Size 1 (Extra Small)",
  args: {
    size: "1",
    children: "Size 1",
  },
};

export const Size2: Story = {
  name: "Size 2 (Small, default)",
  args: {
    size: "2",
    children: "Size 2",
  },
};

export const Size3: Story = {
  name: "Size 3 (Medium)",
  args: {
    size: "3",
    children: "Size 3",
  },
};

export const Size4: Story = {
  name: "Size 4 (Large)",
  args: {
    size: "4",
    children: "Size 4",
  },
};

// Colors
export const ColorPrimary: Story = {
  args: {
    color: "primary",
    children: "Primary",
  },
};

export const ColorInfo: Story = {
  args: {
    color: "info",
    children: "Info",
  },
};

export const ColorSuccess: Story = {
  args: {
    color: "success",
    children: "Success",
  },
};

export const ColorWarning: Story = {
  args: {
    color: "warning",
    children: "Warning",
  },
};

export const ColorError: Story = {
  args: {
    color: "error",
    children: "Error",
  },
};

// Radius
export const RadiusNone: Story = {
  args: {
    radius: "none",
    children: "No Radius",
  },
};

export const RadiusFull: Story = {
  args: {
    radius: "full",
    children: "Pill Button",
  },
};

// With icons
export const WithIconLeft: Story = {
  args: {
    children: (
      <>
        <Mail />
        Send Email
      </>
    ),
  },
};

export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Continue
        <ChevronRight />
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    children: <Plus />,
    "aria-label": "Add",
  },
};

// States
export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <Box display="flex" className="gap-4 flex-wrap">
      <Button variant="solid">Solid</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </Box>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <Box display="flex" className="gap-4 items-center">
      <Button size="1">Size 1</Button>
      <Button size="2">Size 2 (default)</Button>
      <Button size="3">Size 3</Button>
      <Button size="4">Size 4</Button>
    </Box>
  ),
};

// All colors with solid variant
export const AllColorsSolid: Story = {
  render: () => (
    <Box display="flex" className="gap-4 flex-wrap">
      <Button color="default">Default</Button>
      <Button color="primary">Primary</Button>
      <Button color="info">Info</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="error">Error</Button>
    </Box>
  ),
};

// All colors with soft variant
export const AllColorsSoft: Story = {
  render: () => (
    <Box display="flex" className="gap-4 flex-wrap">
      <Button variant="soft" color="default">Default</Button>
      <Button variant="soft" color="primary">Primary</Button>
      <Button variant="soft" color="info">Info</Button>
      <Button variant="soft" color="success">Success</Button>
      <Button variant="soft" color="warning">Warning</Button>
      <Button variant="soft" color="error">Error</Button>
    </Box>
  ),
};

// All colors with outline variant
export const AllColorsOutline: Story = {
  render: () => (
    <Box display="flex" className="gap-4 flex-wrap">
      <Button variant="outline" color="default">Default</Button>
      <Button variant="outline" color="primary">Primary</Button>
      <Button variant="outline" color="info">Info</Button>
      <Button variant="outline" color="success">Success</Button>
      <Button variant="outline" color="warning">Warning</Button>
      <Button variant="outline" color="error">Error</Button>
    </Box>
  ),
};

// All colors with ghost variant
export const AllColorsGhost: Story = {
  render: () => (
    <Box display="flex" className="gap-4 flex-wrap">
      <Button variant="ghost" color="default">Default</Button>
      <Button variant="ghost" color="primary">Primary</Button>
      <Button variant="ghost" color="info">Info</Button>
      <Button variant="ghost" color="success">Success</Button>
      <Button variant="ghost" color="warning">Warning</Button>
      <Button variant="ghost" color="error">Error</Button>
    </Box>
  ),
};

// Size and variant matrix
export const SizeVariantMatrix: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4">
      {(["1", "2", "3", "4"] as const).map((size) => (
        <Box key={size} display="flex" className="gap-4 items-center">
          <span className="w-12 text-sm text-muted-foreground">{size}</span>
          <Button size={size} variant="solid">Solid</Button>
          <Button size={size} variant="soft">Soft</Button>
          <Button size={size} variant="outline">Outline</Button>
          <Button size={size} variant="ghost">Ghost</Button>
        </Box>
      ))}
    </Box>
  ),
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-6">
      {/* Primary action */}
      <Box display="flex" className="gap-3">
        <Button color="primary">
          <Send />
          Submit
        </Button>
        <Button variant="outline">Cancel</Button>
      </Box>

      {/* Destructive action */}
      <Box display="flex" className="gap-3">
        <Button color="error">
          <Trash2 />
          Delete
        </Button>
        <Button variant="ghost">Cancel</Button>
      </Box>

      {/* Download action */}
      <Box display="flex" className="gap-3">
        <Button variant="soft" color="info">
          <Download />
          Download
        </Button>
      </Box>

      {/* Social actions */}
      <Box display="flex" className="gap-3">
        <Button variant="ghost" color="error">
          <Heart />
        </Button>
        <Button variant="soft" radius="full">
          <Plus />
          Follow
        </Button>
      </Box>
    </Box>
  ),
};

// Loading states
export const LoadingStates: Story = {
  render: () => (
    <Box display="flex" className="gap-4 flex-wrap">
      <Button loading>Loading</Button>
      <Button loading variant="soft">Loading</Button>
      <Button loading variant="outline">Loading</Button>
      <Button loading color="success">Saving</Button>
    </Box>
  ),
};

// Radius examples
export const AllRadii: Story = {
  render: () => (
    <Box display="flex" className="gap-4 items-center">
      <Button radius="none">None</Button>
      <Button radius="sm">Small</Button>
      <Button radius="md">Medium</Button>
      <Button radius="lg">Large</Button>
      <Button radius="full">Full</Button>
    </Box>
  ),
};
