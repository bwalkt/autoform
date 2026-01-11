import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextField } from "./TextField";
import { Box } from "./Box";
import { Mail, Search, Eye, EyeOff, User, Lock, Phone } from "lucide-react";

const meta: Meta<typeof TextField> = {
  title: "Elements/TextField",
  component: TextField,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "The size of the text field",
    },
    variant: {
      control: "select",
      options: ["solid", "soft", "outline", "ghost"],
      description: "The visual variant",
    },
    color: {
      control: "select",
      options: ["default", "primary", "info", "success", "warning", "error"],
      description: "The accent color",
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      description: "The border radius",
    },
    floatingLabel: {
      control: "radio",
      options: ["filled", "outlined", "standard"],
      description: "Floating label style (requires label prop to be set)",
    },
    label: {
      control: "text",
      description: "Label text (required for floating label)",
    },
    error: {
      control: "boolean",
      description: "Error state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
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
    label: "Email address",
    floatingLabel: "outlined",
  },
};

export const WithPlaceholder: Story = {
  name: "Without Floating Label",
  args: {
    placeholder: "john@example.com",
  },
};

// ============================================================================
// Variants
// ============================================================================

export const VariantOutline: Story = {
  args: {
    variant: "outline",
    placeholder: "Outline variant",
  },
};

export const VariantSoft: Story = {
  args: {
    variant: "soft",
    placeholder: "Soft variant",
  },
};

export const VariantSolid: Story = {
  args: {
    variant: "solid",
    placeholder: "Solid variant",
  },
};

export const VariantGhost: Story = {
  args: {
    variant: "ghost",
    placeholder: "Ghost variant",
  },
};

export const AllVariants: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4 max-w-md">
      <TextField variant="outline" placeholder="Outline" />
      <TextField variant="soft" placeholder="Soft" />
      <TextField variant="solid" placeholder="Solid" />
      <TextField variant="ghost" placeholder="Ghost" />
    </Box>
  ),
};

// ============================================================================
// Sizes
// ============================================================================

export const AllSizes: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4 max-w-md">
      <TextField size="xs" placeholder="Extra Small" />
      <TextField size="sm" placeholder="Small" />
      <TextField size="md" placeholder="Medium (default)" />
      <TextField size="lg" placeholder="Large" />
    </Box>
  ),
};

// ============================================================================
// Floating Label - Filled
// ============================================================================

export const FloatingFilled: Story = {
  args: {
    label: "Email address",
    floatingLabel: "filled",
  },
};

export const FloatingFilledWithValue: Story = {
  args: {
    label: "Email address",
    floatingLabel: "filled",
    defaultValue: "john@example.com",
  },
};

// ============================================================================
// Floating Label - Outlined
// ============================================================================

export const FloatingOutlined: Story = {
  args: {
    label: "Email address",
    floatingLabel: "outlined",
  },
};

export const FloatingOutlinedWithValue: Story = {
  args: {
    label: "Email address",
    floatingLabel: "outlined",
    defaultValue: "john@example.com",
  },
};

// ============================================================================
// Floating Label - Standard
// ============================================================================

export const FloatingStandard: Story = {
  args: {
    label: "Email address",
    floatingLabel: "standard",
  },
};

export const FloatingStandardWithValue: Story = {
  args: {
    label: "Email address",
    floatingLabel: "standard",
    defaultValue: "john@example.com",
  },
};

// ============================================================================
// All Floating Label Variants
// ============================================================================

export const AllFloatingVariants: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-6 max-w-md">
      <TextField label="Filled Label" floatingLabel="filled" />
      <TextField label="Outlined Label" floatingLabel="outlined" />
      <TextField label="Standard Label" floatingLabel="standard" />
    </Box>
  ),
};

// ============================================================================
// Floating Labels with Icons
// ============================================================================

export const FloatingWithIcons: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-6 max-w-md">
      <TextField
        label="Email"
        floatingLabel="filled"
        leftIcon={<Mail />}
      />
      <TextField
        label="Email"
        floatingLabel="outlined"
        leftIcon={<Mail />}
      />
      <TextField
        label="Search"
        floatingLabel="standard"
        leftIcon={<Search />}
      />
    </Box>
  ),
};

// ============================================================================
// Floating Labels with Colors
// ============================================================================

export const FloatingWithColors: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-6 max-w-md">
      <TextField label="Primary" floatingLabel="outlined" color="primary" />
      <TextField label="Info" floatingLabel="outlined" color="info" />
      <TextField label="Success" floatingLabel="outlined" color="success" />
      <TextField label="Warning" floatingLabel="outlined" color="warning" />
      <TextField label="Error" floatingLabel="outlined" error />
    </Box>
  ),
};

// ============================================================================
// With Icons
// ============================================================================

export const WithLeftIcon: Story = {
  args: {
    placeholder: "Search...",
    leftIcon: <Search />,
  },
};

export const WithRightIcon: Story = {
  args: {
    placeholder: "Enter password",
    type: "password",
    rightIcon: <Eye />,
  },
};

export const WithBothIcons: Story = {
  args: {
    placeholder: "Enter password",
    leftIcon: <Lock />,
    rightIcon: <Eye />,
  },
};

// ============================================================================
// States
// ============================================================================

export const ErrorState: Story = {
  args: {
    placeholder: "Invalid email",
    error: true,
    defaultValue: "invalid-email",
  },
};

export const DisabledState: Story = {
  args: {
    placeholder: "Disabled field",
    disabled: true,
  },
};

export const FloatingError: Story = {
  args: {
    label: "Email address",
    floatingLabel: "outlined",
    error: true,
    defaultValue: "invalid@",
  },
};

export const FloatingDisabled: Story = {
  args: {
    label: "Email address",
    floatingLabel: "outlined",
    disabled: true,
    defaultValue: "disabled@example.com",
  },
};

// ============================================================================
// Real-world Examples
// ============================================================================

export const LoginForm: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4 max-w-sm p-6 border rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Sign In</h2>
      <TextField
        label="Email"
        floatingLabel="outlined"
        leftIcon={<Mail />}
        type="email"
      />
      <TextField
        label="Password"
        floatingLabel="outlined"
        leftIcon={<Lock />}
        rightIcon={<Eye />}
        type="password"
      />
    </Box>
  ),
};

export const ContactForm: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4 max-w-sm p-6 border rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
      <TextField
        label="Full Name"
        floatingLabel="filled"
        leftIcon={<User />}
      />
      <TextField
        label="Email"
        floatingLabel="filled"
        leftIcon={<Mail />}
        type="email"
      />
      <TextField
        label="Phone"
        floatingLabel="filled"
        leftIcon={<Phone />}
        type="tel"
      />
    </Box>
  ),
};

export const MinimalForm: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-6 max-w-sm p-6">
      <h2 className="text-xl font-semibold">Minimal Style</h2>
      <TextField label="First Name" floatingLabel="standard" />
      <TextField label="Last Name" floatingLabel="standard" />
      <TextField label="Email" floatingLabel="standard" type="email" />
    </Box>
  ),
};

// ============================================================================
// Size and Floating Label Combinations
// ============================================================================

export const FloatingSizes: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-6 max-w-md">
      <TextField size="sm" label="Small" floatingLabel="outlined" />
      <TextField size="md" label="Medium" floatingLabel="outlined" />
      <TextField size="lg" label="Large" floatingLabel="outlined" />
    </Box>
  ),
};
