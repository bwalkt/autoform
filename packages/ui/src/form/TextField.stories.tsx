import type { Meta, StoryObj } from '@storybook/react-vite'
import { Eye, Lock, Mail, Phone, Search, User } from 'lucide-react'
import { Box } from '@/layouts/Box'
import { TextField } from './TextField'

const meta: Meta<typeof TextField> = {
  title: 'Form/TextField',
  component: TextField,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    // Set defaults to match component defaults
    size: '2',
    variant: 'outline',
    radius: 'md',
    color: 'default',
    error: false,
    disabled: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['1', '2', '3', '4'],
      description: 'The size of the text field',
      table: { defaultValue: { summary: '2' } },
    },
    variant: {
      control: 'select',
      options: [
        'classic',
        'solid',
        'soft',
        'surface',
        'outline',
        'ghost',
        'floating-filled',
        'floating-standard',
        'floating-outlined',
      ],
      description: 'The visual variant. Use floating-* variants with a label prop for floating labels.',
      table: { defaultValue: { summary: 'outline' } },
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'neutral', 'info', 'success', 'warning', 'error'],
      description: 'The accent color',
      table: { defaultValue: { summary: 'default' } },
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'The border radius',
      table: { defaultValue: { summary: 'md' } },
    },
    label: {
      control: 'text',
      description: 'Label text (required for floating-* variants)',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: 'false' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ============================================================================
// Basic Examples
// ============================================================================

/** Default export. */
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

/** WithFloatingLabel export. */
export const WithFloatingLabel: Story = {
  name: 'With Floating Label',
  args: {
    label: 'Email address',
    variant: 'floating-outlined',
  },
}

// ============================================================================
// Variants
// ============================================================================

/** VariantOutline export. */
export const VariantOutline: Story = {
  args: {
    variant: 'outline',
    placeholder: 'Outline variant',
  },
}

/** VariantSoft export. */
export const VariantSoft: Story = {
  args: {
    variant: 'soft',
    placeholder: 'Soft variant',
  },
}

/** VariantSolid export. */
export const VariantSolid: Story = {
  args: {
    variant: 'solid',
    placeholder: 'Solid variant',
  },
}

/** VariantGhost export. */
export const VariantGhost: Story = {
  args: {
    variant: 'ghost',
    placeholder: 'Ghost variant',
  },
}

/** AllVariants export. */
export const AllVariants: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4 max-w-md">
      <TextField variant="outline" placeholder="Outline" />
      <TextField variant="soft" placeholder="Soft" />
      <TextField variant="solid" placeholder="Solid" />
      <TextField variant="ghost" placeholder="Ghost" />
    </Box>
  ),
}

// ============================================================================
// Sizes
// ============================================================================

/** AllSizes export. */
export const AllSizes: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4 max-w-md">
      <TextField size="1" placeholder="Extra Small" />
      <TextField size="2" placeholder="Small (default)" />
      <TextField size="3" placeholder="Medium" />
      <TextField size="4" placeholder="Large" />
    </Box>
  ),
}

// ============================================================================
// Floating Label - Filled
// ============================================================================

/** FloatingFilled export. */
export const FloatingFilled: Story = {
  args: {
    label: 'Email address',
    variant: 'floating-filled',
  },
}

/** FloatingFilledWithValue export. */
export const FloatingFilledWithValue: Story = {
  args: {
    label: 'Email address',
    variant: 'floating-filled',
    defaultValue: 'john@example.com',
  },
}

// ============================================================================
// Floating Label - Outlined
// ============================================================================

/** FloatingOutlined export. */
export const FloatingOutlined: Story = {
  args: {
    label: 'Email address',
    variant: 'floating-outlined',
  },
}

/** FloatingOutlinedWithValue export. */
export const FloatingOutlinedWithValue: Story = {
  args: {
    label: 'Email address',
    variant: 'floating-outlined',
    defaultValue: 'john@example.com',
  },
}

// ============================================================================
// Floating Label - Standard
// ============================================================================

/** FloatingStandard export. */
export const FloatingStandard: Story = {
  args: {
    label: 'Email address',
    variant: 'floating-standard',
  },
}

/** FloatingStandardWithValue export. */
export const FloatingStandardWithValue: Story = {
  args: {
    label: 'Email address',
    variant: 'floating-standard',
    defaultValue: 'john@example.com',
  },
}

// ============================================================================
// All Floating Label Variants
// ============================================================================

/** AllFloatingVariants export. */
export const AllFloatingVariants: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-6 max-w-md">
      <TextField label="Filled Label" variant="floating-filled" />
      <TextField label="Outlined Label" variant="floating-outlined" />
      <TextField label="Standard Label" variant="floating-standard" />
    </Box>
  ),
}

// ============================================================================
// Floating Labels with Icons
// ============================================================================

/** FloatingWithIcons export. */
export const FloatingWithIcons: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-6 max-w-md">
      <TextField label="Email" variant="floating-filled" leftIcon={<Mail />} />
      <TextField label="Email" variant="floating-outlined" leftIcon={<Mail />} />
      <TextField label="Search" variant="floating-standard" leftIcon={<Search />} />
    </Box>
  ),
}

// ============================================================================
// Floating Labels with Colors
// ============================================================================

/** FloatingWithColors export. */
export const FloatingWithColors: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-6 max-w-md">
      <TextField label="Primary" variant="floating-outlined" color="primary" />
      <TextField label="Info" variant="floating-outlined" color="info" />
      <TextField label="Success" variant="floating-outlined" color="success" />
      <TextField label="Warning" variant="floating-outlined" color="warning" />
      <TextField label="Error" variant="floating-outlined" error />
    </Box>
  ),
}

// ============================================================================
// With Icons
// ============================================================================

/** WithLeftIcon export. */
export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Search...',
    leftIcon: <Search />,
  },
}

/** WithRightIcon export. */
export const WithRightIcon: Story = {
  args: {
    placeholder: 'Enter password',
    type: 'password',
    rightIcon: <Eye />,
  },
}

/** WithBothIcons export. */
export const WithBothIcons: Story = {
  args: {
    placeholder: 'Enter password',
    leftIcon: <Lock />,
    rightIcon: <Eye />,
  },
}

// ============================================================================
// States
// ============================================================================

/** ErrorState export. */
export const ErrorState: Story = {
  args: {
    placeholder: 'Invalid email',
    error: true,
    defaultValue: 'invalid-email',
  },
}

/** DisabledState export. */
export const DisabledState: Story = {
  args: {
    placeholder: 'Disabled field',
    disabled: true,
  },
}

/** FloatingError export. */
export const FloatingError: Story = {
  args: {
    label: 'Email address',
    variant: 'floating-outlined',
    error: true,
    defaultValue: 'invalid@',
  },
}

/** FloatingDisabled export. */
export const FloatingDisabled: Story = {
  args: {
    label: 'Email address',
    variant: 'floating-outlined',
    disabled: true,
    defaultValue: 'disabled@example.com',
  },
}

// ============================================================================
// Real-world Examples
// ============================================================================

/** LoginForm export. */
export const LoginForm: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4 max-w-sm p-6 border rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Sign In</h2>
      <TextField label="Email" variant="floating-outlined" leftIcon={<Mail />} type="email" />
      <TextField label="Password" variant="floating-outlined" leftIcon={<Lock />} rightIcon={<Eye />} type="password" />
    </Box>
  ),
}

/** ContactForm export. */
export const ContactForm: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-4 max-w-sm p-6 border rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
      <TextField label="Full Name" variant="floating-filled" leftIcon={<User />} />
      <TextField label="Email" variant="floating-filled" leftIcon={<Mail />} type="email" />
      <TextField label="Phone" variant="floating-filled" leftIcon={<Phone />} type="tel" />
    </Box>
  ),
}

/** MinimalForm export. */
export const MinimalForm: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-6 max-w-sm p-6">
      <h2 className="text-xl font-semibold">Minimal Style</h2>
      <TextField label="First Name" variant="floating-standard" />
      <TextField label="Last Name" variant="floating-standard" />
      <TextField label="Email" variant="floating-standard" type="email" />
    </Box>
  ),
}

// ============================================================================
// Size and Floating Label Combinations
// ============================================================================

/** FloatingSizes export. */
export const FloatingSizes: Story = {
  render: () => (
    <Box display="flex" className="flex-col gap-6 max-w-md">
      <TextField size="1" label="Extra Small" variant="floating-outlined" />
      <TextField size="2" label="Small" variant="floating-outlined" />
      <TextField size="3" label="Medium" variant="floating-outlined" />
      <TextField size="4" label="Large" variant="floating-outlined" />
    </Box>
  ),
}
