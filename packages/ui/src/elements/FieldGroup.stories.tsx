import type { Meta, StoryObj } from "@storybook/react-vite";
import { FieldGroup } from "./FieldGroup";
import { TextField } from "./TextField";
import { Textarea } from "./Textarea";
import { Separator } from "./Separator";
import { Box } from "../layouts/Box";
import { withFieldGroup } from "./withFieldGroup";
import { Mail, User, Phone, Lock, MapPin, Building } from "lucide-react";

// HOC-wrapped components for demonstration
const FieldGroupTextarea = withFieldGroup(Textarea);

const meta: Meta<typeof FieldGroup> = {
  title: "Elements/FieldGroup",
  component: FieldGroup,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    gap: "4",
    layout: "stacked",
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
    layout: {
      control: "select",
      options: ["stacked", "inline", "grid", "side-labels", "sectioned"],
      description: "Layout mode for the form fields",
      table: { defaultValue: { summary: "stacked" } },
    },
    columns: {
      control: "select",
      options: ["1", "2", "3", "4", "6", "12"],
      description: "Grid columns (for grid layout)",
      table: { defaultValue: { summary: "2" } },
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "baseline", "stretch"],
      description: "Alignment for inline layout",
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

// ============================================================================
// Layout Examples
// ============================================================================

export const InlineLayout: Story = {
  args: {
    layout: "inline",
    size: "2",
    variant: "outline",
    gap: "4",
  },
  render: (args) => (
    <FieldGroup {...args}>
      <TextField placeholder="First name" className="flex-1" />
      <TextField placeholder="Last name" className="flex-1" />
      <TextField placeholder="Email" type="email" className="flex-1" />
    </FieldGroup>
  ),
};

export const GridLayout: Story = {
  args: {
    layout: "grid",
    columns: "2",
    size: "2",
    variant: "outline",
    gap: "4",
  },
  render: (args) => (
    <FieldGroup {...args} className="max-w-2xl">
      <TextField placeholder="First name" />
      <TextField placeholder="Last name" />
      <TextField placeholder="Email" type="email" className="col-span-full" />
      <TextField placeholder="Phone" type="tel" />
      <TextField placeholder="Company" />
    </FieldGroup>
  ),
};

export const GridLayoutResponsive: Story = {
  args: {
    layout: "grid",
    size: "2",
    variant: "outline",
    gap: "4",
  },
  render: (args) => (
    <FieldGroup
      {...args}
      columns={{ initial: "1", sm: "2", lg: "3" }}
      className="max-w-4xl"
    >
      <TextField placeholder="First name" />
      <TextField placeholder="Last name" />
      <TextField placeholder="Email" type="email" />
      <TextField placeholder="Phone" type="tel" />
      <TextField placeholder="Company" />
      <TextField placeholder="Role" />
    </FieldGroup>
  ),
};

export const SideLabelsLayout: Story = {
  args: {
    layout: "side-labels",
    size: "2",
    variant: "outline",
  },
  render: (args) => (
    <FieldGroup {...args} className="max-w-3xl">
      <FieldGroup.Row label="Personal Info" description="Your basic details">
        <TextField placeholder="Full name" leftIcon={<User />} />
        <TextField placeholder="Email" type="email" leftIcon={<Mail />} />
      </FieldGroup.Row>
      <Separator />
      <FieldGroup.Row label="Contact" description="How we can reach you">
        <TextField placeholder="Phone" type="tel" leftIcon={<Phone />} />
      </FieldGroup.Row>
      <Separator />
      <FieldGroup.Row label="Address">
        <TextField placeholder="Street address" leftIcon={<MapPin />} />
        <TextField placeholder="City" />
      </FieldGroup.Row>
    </FieldGroup>
  ),
};

export const SectionedLayout: Story = {
  args: {
    layout: "sectioned",
    size: "2",
    variant: "floating-outlined",
  },
  render: (args) => (
    <FieldGroup {...args} className="max-w-md">
      <FieldGroup.Section
        title="Account"
        description="Basic account settings"
        separator={false}
      >
        <TextField label="Username" />
        <TextField label="Email" type="email" />
      </FieldGroup.Section>
      <FieldGroup.Section title="Profile" description="Public profile information">
        <TextField label="Display name" />
        <TextField label="Bio" />
      </FieldGroup.Section>
      <FieldGroup.Section title="Security">
        <TextField label="Current password" type="password" />
        <TextField label="New password" type="password" />
      </FieldGroup.Section>
    </FieldGroup>
  ),
};

// ============================================================================
// HOC Examples
// ============================================================================

export const WithFieldGroupHOC: Story = {
  args: {
    size: "3",
    variant: "soft",
    gap: "4",
  },
  render: (args) => (
    <FieldGroup {...args} className="max-w-md">
      <TextField placeholder="Title" />
      <FieldGroupTextarea placeholder="Description (uses HOC)" rows={4} />
    </FieldGroup>
  ),
};

// ============================================================================
// All Layouts Comparison
// ============================================================================

export const AllLayoutsComparison: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-12">
      <Box>
        <h3 className="text-lg font-semibold mb-4">Stacked (Default)</h3>
        <FieldGroup layout="stacked" size="2" variant="outline" className="max-w-md">
          <TextField placeholder="First name" />
          <TextField placeholder="Last name" />
          <TextField placeholder="Email" type="email" />
        </FieldGroup>
      </Box>

      <Box>
        <h3 className="text-lg font-semibold mb-4">Inline</h3>
        <FieldGroup layout="inline" size="2" variant="outline" gap="4">
          <TextField placeholder="First name" className="flex-1" />
          <TextField placeholder="Last name" className="flex-1" />
          <TextField placeholder="Email" type="email" className="flex-1" />
        </FieldGroup>
      </Box>

      <Box>
        <h3 className="text-lg font-semibold mb-4">Grid (2 columns)</h3>
        <FieldGroup
          layout="grid"
          columns="2"
          size="2"
          variant="outline"
          gap="4"
          className="max-w-2xl"
        >
          <TextField placeholder="First name" />
          <TextField placeholder="Last name" />
          <TextField placeholder="Email" type="email" className="col-span-full" />
          <TextField placeholder="Phone" type="tel" />
          <TextField placeholder="Company" />
        </FieldGroup>
      </Box>

      <Box>
        <h3 className="text-lg font-semibold mb-4">Side Labels</h3>
        <FieldGroup layout="side-labels" size="2" variant="outline" className="max-w-3xl">
          <FieldGroup.Row label="Personal" description="Your name details">
            <TextField placeholder="Full name" />
          </FieldGroup.Row>
          <Separator />
          <FieldGroup.Row label="Contact" description="How to reach you">
            <TextField placeholder="Email" type="email" />
            <TextField placeholder="Phone" type="tel" />
          </FieldGroup.Row>
        </FieldGroup>
      </Box>

      <Box>
        <h3 className="text-lg font-semibold mb-4">Sectioned</h3>
        <FieldGroup layout="sectioned" size="2" variant="outline" className="max-w-md">
          <FieldGroup.Section title="Account" separator={false}>
            <TextField placeholder="Username" />
            <TextField placeholder="Email" type="email" />
          </FieldGroup.Section>
          <FieldGroup.Section title="Security">
            <TextField placeholder="Password" type="password" />
          </FieldGroup.Section>
        </FieldGroup>
      </Box>
    </Box>
  ),
};

// ============================================================================
// Real-world Form Examples
// ============================================================================

export const RegistrationFormGrid: Story = {
  render: () => (
    <Box className="max-w-2xl p-6 border rounded-lg">
      <h2 className="text-xl font-semibold mb-6">Create Account</h2>
      <FieldGroup layout="grid" columns="2" size="2" variant="outline" gap="4">
        <TextField placeholder="First name" leftIcon={<User />} />
        <TextField placeholder="Last name" />
        <TextField
          placeholder="Email"
          type="email"
          leftIcon={<Mail />}
          className="col-span-full"
        />
        <TextField placeholder="Password" type="password" leftIcon={<Lock />} />
        <TextField placeholder="Confirm password" type="password" leftIcon={<Lock />} />
        <TextField
          placeholder="Company (optional)"
          leftIcon={<Building />}
          className="col-span-full"
        />
      </FieldGroup>
    </Box>
  ),
};

export const SettingsFormSideLabels: Story = {
  render: () => (
    <Box className="max-w-3xl p-6 border rounded-lg">
      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
      <FieldGroup layout="side-labels" size="2" variant="outline">
        <FieldGroup.Row
          label="Profile"
          description="This information will be displayed publicly"
        >
          <TextField placeholder="Display name" />
          <TextField placeholder="Username" />
        </FieldGroup.Row>
        <Separator />
        <FieldGroup.Row label="Email" description="Manage your email preferences">
          <TextField placeholder="Primary email" type="email" />
        </FieldGroup.Row>
        <Separator />
        <FieldGroup.Row label="Password" description="Change your password">
          <TextField placeholder="Current password" type="password" />
          <TextField placeholder="New password" type="password" />
          <TextField placeholder="Confirm new password" type="password" />
        </FieldGroup.Row>
      </FieldGroup>
    </Box>
  ),
};

export const CheckoutFormSectioned: Story = {
  render: () => (
    <Box className="max-w-lg p-6 border rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Checkout</h2>
      <FieldGroup layout="sectioned" size="2" variant="floating-outlined">
        <FieldGroup.Section
          title="Contact"
          description="We'll use this to send your receipt"
          separator={false}
        >
          <TextField label="Email" type="email" />
          <TextField label="Phone" type="tel" />
        </FieldGroup.Section>
        <FieldGroup.Section title="Shipping" description="Where should we ship your order?">
          <TextField label="Full name" />
          <TextField label="Address" />
          <FieldGroup layout="grid" columns="2" gap="4">
            <TextField label="City" />
            <TextField label="ZIP code" />
          </FieldGroup>
        </FieldGroup.Section>
        <FieldGroup.Section title="Payment">
          <TextField label="Card number" />
          <FieldGroup layout="grid" columns="2" gap="4">
            <TextField label="Expiry (MM/YY)" />
            <TextField label="CVC" />
          </FieldGroup>
        </FieldGroup.Section>
      </FieldGroup>
    </Box>
  ),
};
