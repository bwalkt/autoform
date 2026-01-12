import type { Meta, StoryObj } from "@storybook/react-vite";
import { FieldGroup } from "./FieldGroup";
import { TextField } from "./TextField";
import { Box } from "../layouts/Box";
import { Mail, User, Phone, Lock } from "lucide-react";

const meta: Meta<typeof FieldGroup> = {
  title: "Elements/FieldGroup",
  component: FieldGroup,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    gap: "4",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["1", "2", "3", "4"],
      description: "Size applied to all child form fields",
    },
    variant: {
      control: "select",
      options: [
        "classic",
        "solid",
        "soft",
        "surface",
        "outline",
        "ghost",
        "floating-filled",
        "floating-standard",
        "floating-outlined",
      ],
      description: "Variant applied to all child form fields",
    },
    gap: {
      control: "select",
      options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      description: "Gap between child elements",
      table: { defaultValue: { summary: "4" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Basic Examples
// ============================================================================

export const Default: Story = {
  args: {
    size: "2",
    variant: "outline",
  },
  render: (args) => (
    <FieldGroup {...args} className="max-w-md">
      <TextField placeholder="First name" />
      <TextField placeholder="Last name" />
      <TextField placeholder="Email" type="email" />
    </FieldGroup>
  ),
};

export const WithFloatingLabels: Story = {
  args: {
    size: "2",
    variant: "floating-outlined",
  },
  render: (args) => (
    <FieldGroup {...args} className="max-w-md">
      <TextField label="First name" />
      <TextField label="Last name" />
      <TextField label="Email" type="email" />
    </FieldGroup>
  ),
};

// ============================================================================
// Size Variations
// ============================================================================

export const SmallSize: Story = {
  args: {
    size: "1",
    variant: "outline",
  },
  render: (args) => (
    <FieldGroup {...args} className="max-w-md">
      <TextField placeholder="Username" />
      <TextField placeholder="Password" type="password" />
    </FieldGroup>
  ),
};

export const LargeSize: Story = {
  args: {
    size: "4",
    variant: "outline",
  },
  render: (args) => (
    <FieldGroup {...args} className="max-w-md">
      <TextField placeholder="Username" />
      <TextField placeholder="Password" type="password" />
    </FieldGroup>
  ),
};

// ============================================================================
// Variant Variations
// ============================================================================

export const SolidVariant: Story = {
  args: {
    size: "2",
    variant: "solid",
  },
  render: (args) => (
    <FieldGroup {...args} className="max-w-md">
      <TextField placeholder="First name" />
      <TextField placeholder="Last name" />
      <TextField placeholder="Email" type="email" />
    </FieldGroup>
  ),
};

export const SoftVariant: Story = {
  args: {
    size: "2",
    variant: "soft",
  },
  render: (args) => (
    <FieldGroup {...args} className="max-w-md">
      <TextField placeholder="First name" />
      <TextField placeholder="Last name" />
      <TextField placeholder="Email" type="email" />
    </FieldGroup>
  ),
};

export const FloatingFilledVariant: Story = {
  args: {
    size: "2",
    variant: "floating-filled",
  },
  render: (args) => (
    <FieldGroup {...args} className="max-w-md">
      <TextField label="First name" />
      <TextField label="Last name" />
      <TextField label="Email" type="email" />
    </FieldGroup>
  ),
};

export const FloatingStandardVariant: Story = {
  args: {
    size: "2",
    variant: "floating-standard",
  },
  render: (args) => (
    <FieldGroup {...args} className="max-w-md">
      <TextField label="First name" />
      <TextField label="Last name" />
      <TextField label="Email" type="email" />
    </FieldGroup>
  ),
};

// ============================================================================
// Gap Variations
// ============================================================================

export const TightGap: Story = {
  args: {
    size: "2",
    variant: "outline",
    gap: "2",
  },
  render: (args) => (
    <FieldGroup {...args} className="max-w-md">
      <TextField placeholder="Field 1" />
      <TextField placeholder="Field 2" />
      <TextField placeholder="Field 3" />
    </FieldGroup>
  ),
};

export const LooseGap: Story = {
  args: {
    size: "2",
    variant: "outline",
    gap: "6",
  },
  render: (args) => (
    <FieldGroup {...args} className="max-w-md">
      <TextField placeholder="Field 1" />
      <TextField placeholder="Field 2" />
      <TextField placeholder="Field 3" />
    </FieldGroup>
  ),
};

// ============================================================================
// With Icons
// ============================================================================

export const WithIcons: Story = {
  args: {
    size: "2",
    variant: "outline",
  },
  render: (args) => (
    <FieldGroup {...args} className="max-w-md">
      <TextField placeholder="Full name" leftIcon={<User />} />
      <TextField placeholder="Email" leftIcon={<Mail />} type="email" />
      <TextField placeholder="Phone" leftIcon={<Phone />} type="tel" />
    </FieldGroup>
  ),
};

export const FloatingWithIcons: Story = {
  args: {
    size: "2",
    variant: "floating-outlined",
  },
  render: (args) => (
    <FieldGroup {...args} className="max-w-md">
      <TextField label="Full name" leftIcon={<User />} />
      <TextField label="Email" leftIcon={<Mail />} type="email" />
      <TextField label="Phone" leftIcon={<Phone />} type="tel" />
    </FieldGroup>
  ),
};

// ============================================================================
// Individual Field Overrides
// ============================================================================

export const IndividualOverrides: Story = {
  args: {
    size: "2",
    variant: "outline",
  },
  render: (args) => (
    <FieldGroup {...args} className="max-w-md">
      <TextField placeholder="Uses group size and variant" />
      <TextField placeholder="Override size to 3" size="3" />
      <TextField placeholder="Override variant to soft" variant="soft" />
      <TextField placeholder="Override color to success" color="success" />
    </FieldGroup>
  ),
};

// ============================================================================
// Real-world Examples
// ============================================================================

export const LoginForm: Story = {
  args: {
    size: "3",
    variant: "floating-outlined",
    gap: "5",
  },
  render: (args) => (
    <Box className="max-w-sm p-6 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Sign In</h2>
      <FieldGroup {...args}>
        <TextField label="Email" leftIcon={<Mail />} type="email" />
        <TextField label="Password" leftIcon={<Lock />} type="password" />
      </FieldGroup>
    </Box>
  ),
};

export const ContactForm: Story = {
  args: {
    size: "2",
    variant: "floating-filled",
    gap: "4",
  },
  render: (args) => (
    <Box className="max-w-sm p-6 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
      <FieldGroup {...args}>
        <TextField label="Full Name" leftIcon={<User />} />
        <TextField label="Email" leftIcon={<Mail />} type="email" />
        <TextField label="Phone" leftIcon={<Phone />} type="tel" />
      </FieldGroup>
    </Box>
  ),
};

export const MinimalForm: Story = {
  args: {
    size: "2",
    variant: "floating-standard",
    gap: "6",
  },
  render: (args) => (
    <Box className="max-w-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Minimal Style</h2>
      <FieldGroup {...args}>
        <TextField label="First Name" />
        <TextField label="Last Name" />
        <TextField label="Email" type="email" />
      </FieldGroup>
    </Box>
  ),
};

// ============================================================================
// All Sizes Comparison
// ============================================================================

export const AllSizesComparison: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-8">
      <Box>
        <h3 className="text-sm font-medium mb-2">Size 1</h3>
        <FieldGroup size="1" variant="outline" className="max-w-md">
          <TextField placeholder="First name" />
          <TextField placeholder="Last name" />
        </FieldGroup>
      </Box>
      <Box>
        <h3 className="text-sm font-medium mb-2">Size 2</h3>
        <FieldGroup size="2" variant="outline" className="max-w-md">
          <TextField placeholder="First name" />
          <TextField placeholder="Last name" />
        </FieldGroup>
      </Box>
      <Box>
        <h3 className="text-sm font-medium mb-2">Size 3</h3>
        <FieldGroup size="3" variant="outline" className="max-w-md">
          <TextField placeholder="First name" />
          <TextField placeholder="Last name" />
        </FieldGroup>
      </Box>
      <Box>
        <h3 className="text-sm font-medium mb-2">Size 4</h3>
        <FieldGroup size="4" variant="outline" className="max-w-md">
          <TextField placeholder="First name" />
          <TextField placeholder="Last name" />
        </FieldGroup>
      </Box>
    </Box>
  ),
};

// ============================================================================
// All Variants Comparison
// ============================================================================

export const AllVariantsComparison: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-8">
      <Box>
        <h3 className="text-sm font-medium mb-2">Outline</h3>
        <FieldGroup size="2" variant="outline" className="max-w-md">
          <TextField placeholder="First name" />
          <TextField placeholder="Last name" />
        </FieldGroup>
      </Box>
      <Box>
        <h3 className="text-sm font-medium mb-2">Solid</h3>
        <FieldGroup size="2" variant="solid" className="max-w-md">
          <TextField placeholder="First name" />
          <TextField placeholder="Last name" />
        </FieldGroup>
      </Box>
      <Box>
        <h3 className="text-sm font-medium mb-2">Soft</h3>
        <FieldGroup size="2" variant="soft" className="max-w-md">
          <TextField placeholder="First name" />
          <TextField placeholder="Last name" />
        </FieldGroup>
      </Box>
      <Box>
        <h3 className="text-sm font-medium mb-2">Floating Outlined</h3>
        <FieldGroup size="2" variant="floating-outlined" className="max-w-md">
          <TextField label="First name" />
          <TextField label="Last name" />
        </FieldGroup>
      </Box>
      <Box>
        <h3 className="text-sm font-medium mb-2">Floating Filled</h3>
        <FieldGroup size="2" variant="floating-filled" className="max-w-md">
          <TextField label="First name" />
          <TextField label="Last name" />
        </FieldGroup>
      </Box>
      <Box>
        <h3 className="text-sm font-medium mb-2">Floating Standard</h3>
        <FieldGroup size="2" variant="floating-standard" className="max-w-md">
          <TextField label="First name" />
          <TextField label="Last name" />
        </FieldGroup>
      </Box>
    </Box>
  ),
};
