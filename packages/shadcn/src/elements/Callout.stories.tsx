import type { Meta, StoryObj } from "@storybook/react-vite";
import { Callout, CalloutRoot } from "./Callout";
import { Box } from "../layouts/Box";
import {
  Info,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Lightbulb,
  Rocket,
  Bell,
  Shield,
} from "lucide-react";

const meta: Meta<typeof CalloutRoot> = {
  title: "Elements/Callout",
  component: CalloutRoot,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["1", "2", "3", "4"],
      description: "The size of the callout",
    },
    variant: {
      control: "select",
      options: ["soft", "surface", "outline"],
      description: "The visual variant of the callout",
    },
    color: {
      control: "select",
      options: ["default", "primary", "neutral", "info", "success", "warning", "error"],
      description: "The accent color of the callout",
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
  render: (args) => (
    <Callout.Root {...args}>
      <Callout.Icon>
        <Info />
      </Callout.Icon>
      <Callout.Text>
        This is a callout with some important information for you.
      </Callout.Text>
    </Callout.Root>
  ),
  args: {
    size: "2",
    variant: "soft",
    color: "default",
  },
};

// Variants
export const Soft: Story = {
  render: () => (
    <Callout.Root variant="soft" color="info">
      <Callout.Icon>
        <Info />
      </Callout.Icon>
      <Callout.Text>
        This is a soft callout with a subtle background.
      </Callout.Text>
    </Callout.Root>
  ),
};

export const Surface: Story = {
  render: () => (
    <Callout.Root variant="surface" color="info">
      <Callout.Icon>
        <Info />
      </Callout.Icon>
      <Callout.Text>
        This is a surface callout with a border and light background.
      </Callout.Text>
    </Callout.Root>
  ),
};

export const Outline: Story = {
  render: () => (
    <Callout.Root variant="outline" color="info">
      <Callout.Icon>
        <Info />
      </Callout.Icon>
      <Callout.Text>
        This is an outline callout with just a border.
      </Callout.Text>
    </Callout.Root>
  ),
};

// Sizes
export const ExtraSmall: Story = {
  render: () => (
    <Callout.Root size="1" color="info">
      <Callout.Icon>
        <Info />
      </Callout.Icon>
      <Callout.Text>Extra small callout</Callout.Text>
    </Callout.Root>
  ),
};

export const Small: Story = {
  render: () => (
    <Callout.Root size="2" color="info">
      <Callout.Icon>
        <Info />
      </Callout.Icon>
      <Callout.Text>Small callout</Callout.Text>
    </Callout.Root>
  ),
};

export const Medium: Story = {
  render: () => (
    <Callout.Root size="2" color="info">
      <Callout.Icon>
        <Info />
      </Callout.Icon>
      <Callout.Text>Medium callout (default)</Callout.Text>
    </Callout.Root>
  ),
};

export const Large: Story = {
  render: () => (
    <Callout.Root size="3" color="info">
      <Callout.Icon>
        <Info />
      </Callout.Icon>
      <Callout.Text>Large callout</Callout.Text>
    </Callout.Root>
  ),
};

// Colors
export const ColorDefault: Story = {
  render: () => (
    <Callout.Root color="default">
      <Callout.Icon>
        <Bell />
      </Callout.Icon>
      <Callout.Text>Default neutral callout</Callout.Text>
    </Callout.Root>
  ),
};

export const ColorPrimary: Story = {
  render: () => (
    <Callout.Root color="primary">
      <Callout.Icon>
        <Rocket />
      </Callout.Icon>
      <Callout.Text>Primary branded callout</Callout.Text>
    </Callout.Root>
  ),
};

export const ColorInfo: Story = {
  render: () => (
    <Callout.Root color="info">
      <Callout.Icon>
        <Info />
      </Callout.Icon>
      <Callout.Text>
        Informational callout for helpful tips and details.
      </Callout.Text>
    </Callout.Root>
  ),
};

export const ColorSuccess: Story = {
  render: () => (
    <Callout.Root color="success">
      <Callout.Icon>
        <CheckCircle />
      </Callout.Icon>
      <Callout.Text>
        Success! Your action was completed successfully.
      </Callout.Text>
    </Callout.Root>
  ),
};

export const ColorWarning: Story = {
  render: () => (
    <Callout.Root color="warning">
      <Callout.Icon>
        <AlertTriangle />
      </Callout.Icon>
      <Callout.Text>
        Warning: Please review this before proceeding.
      </Callout.Text>
    </Callout.Root>
  ),
};

export const ColorError: Story = {
  render: () => (
    <Callout.Root color="error">
      <Callout.Icon>
        <XCircle />
      </Callout.Icon>
      <Callout.Text>
        Error: Something went wrong. Please try again.
      </Callout.Text>
    </Callout.Root>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4">
      <Callout.Root variant="soft" color="info">
        <Callout.Icon>
          <Info />
        </Callout.Icon>
        <Callout.Text>Soft variant</Callout.Text>
      </Callout.Root>
      <Callout.Root variant="surface" color="info">
        <Callout.Icon>
          <Info />
        </Callout.Icon>
        <Callout.Text>Surface variant</Callout.Text>
      </Callout.Root>
      <Callout.Root variant="outline" color="info">
        <Callout.Icon>
          <Info />
        </Callout.Icon>
        <Callout.Text>Outline variant</Callout.Text>
      </Callout.Root>
    </Box>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4">
      <Callout.Root size="1" color="info">
        <Callout.Icon>
          <Info />
        </Callout.Icon>
        <Callout.Text>Extra small (1)</Callout.Text>
      </Callout.Root>
      <Callout.Root size="2" color="info">
        <Callout.Icon>
          <Info />
        </Callout.Icon>
        <Callout.Text>Small (2)</Callout.Text>
      </Callout.Root>
      <Callout.Root size="2" color="info">
        <Callout.Icon>
          <Info />
        </Callout.Icon>
        <Callout.Text>Medium (2)</Callout.Text>
      </Callout.Root>
      <Callout.Root size="3" color="info">
        <Callout.Icon>
          <Info />
        </Callout.Icon>
        <Callout.Text>Large (3)</Callout.Text>
      </Callout.Root>
    </Box>
  ),
};

// All colors with soft variant
export const AllColorsSoft: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4">
      <Callout.Root color="default">
        <Callout.Icon>
          <Bell />
        </Callout.Icon>
        <Callout.Text>Default</Callout.Text>
      </Callout.Root>
      <Callout.Root color="primary">
        <Callout.Icon>
          <Rocket />
        </Callout.Icon>
        <Callout.Text>Primary</Callout.Text>
      </Callout.Root>
      <Callout.Root color="info">
        <Callout.Icon>
          <Info />
        </Callout.Icon>
        <Callout.Text>Info</Callout.Text>
      </Callout.Root>
      <Callout.Root color="success">
        <Callout.Icon>
          <CheckCircle />
        </Callout.Icon>
        <Callout.Text>Success</Callout.Text>
      </Callout.Root>
      <Callout.Root color="warning">
        <Callout.Icon>
          <AlertTriangle />
        </Callout.Icon>
        <Callout.Text>Warning</Callout.Text>
      </Callout.Root>
      <Callout.Root color="error">
        <Callout.Icon>
          <XCircle />
        </Callout.Icon>
        <Callout.Text>Error</Callout.Text>
      </Callout.Root>
    </Box>
  ),
};

// All colors with surface variant
export const AllColorsSurface: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4">
      <Callout.Root variant="surface" color="default">
        <Callout.Icon>
          <Bell />
        </Callout.Icon>
        <Callout.Text>Default</Callout.Text>
      </Callout.Root>
      <Callout.Root variant="surface" color="primary">
        <Callout.Icon>
          <Rocket />
        </Callout.Icon>
        <Callout.Text>Primary</Callout.Text>
      </Callout.Root>
      <Callout.Root variant="surface" color="info">
        <Callout.Icon>
          <Info />
        </Callout.Icon>
        <Callout.Text>Info</Callout.Text>
      </Callout.Root>
      <Callout.Root variant="surface" color="success">
        <Callout.Icon>
          <CheckCircle />
        </Callout.Icon>
        <Callout.Text>Success</Callout.Text>
      </Callout.Root>
      <Callout.Root variant="surface" color="warning">
        <Callout.Icon>
          <AlertTriangle />
        </Callout.Icon>
        <Callout.Text>Warning</Callout.Text>
      </Callout.Root>
      <Callout.Root variant="surface" color="error">
        <Callout.Icon>
          <XCircle />
        </Callout.Icon>
        <Callout.Text>Error</Callout.Text>
      </Callout.Root>
    </Box>
  ),
};

// All colors with outline variant
export const AllColorsOutline: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4">
      <Callout.Root variant="outline" color="default">
        <Callout.Icon>
          <Bell />
        </Callout.Icon>
        <Callout.Text>Default</Callout.Text>
      </Callout.Root>
      <Callout.Root variant="outline" color="primary">
        <Callout.Icon>
          <Rocket />
        </Callout.Icon>
        <Callout.Text>Primary</Callout.Text>
      </Callout.Root>
      <Callout.Root variant="outline" color="info">
        <Callout.Icon>
          <Info />
        </Callout.Icon>
        <Callout.Text>Info</Callout.Text>
      </Callout.Root>
      <Callout.Root variant="outline" color="success">
        <Callout.Icon>
          <CheckCircle />
        </Callout.Icon>
        <Callout.Text>Success</Callout.Text>
      </Callout.Root>
      <Callout.Root variant="outline" color="warning">
        <Callout.Icon>
          <AlertTriangle />
        </Callout.Icon>
        <Callout.Text>Warning</Callout.Text>
      </Callout.Root>
      <Callout.Root variant="outline" color="error">
        <Callout.Icon>
          <XCircle />
        </Callout.Icon>
        <Callout.Text>Error</Callout.Text>
      </Callout.Root>
    </Box>
  ),
};

// High contrast mode
export const HighContrast: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4">
      <Callout.Root color="info" highContrast>
        <Callout.Icon>
          <Info />
        </Callout.Icon>
        <Callout.Text>High contrast soft (default variant)</Callout.Text>
      </Callout.Root>
      <Callout.Root variant="surface" color="success" highContrast>
        <Callout.Icon>
          <CheckCircle />
        </Callout.Icon>
        <Callout.Text>High contrast surface variant</Callout.Text>
      </Callout.Root>
      <Callout.Root variant="outline" color="warning" highContrast>
        <Callout.Icon>
          <AlertTriangle />
        </Callout.Icon>
        <Callout.Text>High contrast outline variant</Callout.Text>
      </Callout.Root>
    </Box>
  ),
};

// Without icon
export const WithoutIcon: Story = {
  render: () => (
    <Callout.Root color="info">
      <Callout.Text className="col-span-2">
        This callout has no icon and the text spans the full width.
      </Callout.Text>
    </Callout.Root>
  ),
};

// Long content
export const LongContent: Story = {
  render: () => (
    <Callout.Root color="info" className="max-w-lg">
      <Callout.Icon>
        <Lightbulb />
      </Callout.Icon>
      <Callout.Text>
        This is a callout with longer content. It demonstrates how the component
        handles multi-line text. The icon stays aligned to the top while the text
        wraps naturally. This is useful for displaying detailed information,
        tips, or warnings that require more explanation.
      </Callout.Text>
    </Callout.Root>
  ),
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-6 max-w-lg">
      {/* Tip */}
      <Callout.Root color="info" variant="soft">
        <Callout.Icon>
          <Lightbulb />
        </Callout.Icon>
        <Callout.Text>
          <strong>Tip:</strong> You can use keyboard shortcuts to navigate faster.
          Press <code className="px-1 py-0.5 bg-blue-200/50 rounded text-xs">?</code> to see all available shortcuts.
        </Callout.Text>
      </Callout.Root>

      {/* Security notice */}
      <Callout.Root color="warning" variant="surface">
        <Callout.Icon>
          <Shield />
        </Callout.Icon>
        <Callout.Text>
          <strong>Security Notice:</strong> Your session will expire in 5 minutes.
          Please save your work to avoid losing any changes.
        </Callout.Text>
      </Callout.Root>

      {/* Success message */}
      <Callout.Root color="success" variant="soft">
        <Callout.Icon>
          <CheckCircle />
        </Callout.Icon>
        <Callout.Text>
          Your changes have been saved successfully. The new settings will take
          effect immediately.
        </Callout.Text>
      </Callout.Root>

      {/* Error message */}
      <Callout.Root color="error" variant="surface">
        <Callout.Icon>
          <AlertCircle />
        </Callout.Icon>
        <Callout.Text>
          <strong>Connection Error:</strong> Unable to reach the server. Please
          check your internet connection and try again.
        </Callout.Text>
      </Callout.Root>
    </Box>
  ),
};
