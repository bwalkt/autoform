import type { Meta, StoryObj } from '@storybook/react-vite'
import { Copy, Search, Settings, Trash2 } from 'lucide-react'
import { Box } from '@/layouts/Box'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'Elements/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['1', '2', '3', '4'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline', 'ghost'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'neutral', 'info', 'success', 'warning', 'error'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    highContrast: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    'aria-label': 'Search',
    variant: 'soft',
    size: '2',
    children: <Search className="h-4 w-4" />,
  },
}

export const Variants: Story = {
  render: () => (
    <Box display="flex" className="gap-3">
      <IconButton aria-label="Solid" variant="solid">
        <Search className="h-4 w-4" />
      </IconButton>
      <IconButton aria-label="Soft" variant="soft">
        <Copy className="h-4 w-4" />
      </IconButton>
      <IconButton aria-label="Outline" variant="outline">
        <Settings className="h-4 w-4" />
      </IconButton>
      <IconButton aria-label="Ghost" variant="ghost">
        <Trash2 className="h-4 w-4" />
      </IconButton>
    </Box>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Box display="flex" className="items-center gap-3">
      <IconButton aria-label="Size 1" size="1">
        <Search className="h-3 w-3" />
      </IconButton>
      <IconButton aria-label="Size 2" size="2">
        <Search className="h-4 w-4" />
      </IconButton>
      <IconButton aria-label="Size 3" size="3">
        <Search className="h-5 w-5" />
      </IconButton>
      <IconButton aria-label="Size 4" size="4">
        <Search className="h-6 w-6" />
      </IconButton>
    </Box>
  ),
}

export const Radius: Story = {
  render: () => (
    <Box display="flex" className="items-center gap-3">
      <IconButton aria-label="none" radius="none" variant="soft">
        <Search className="h-4 w-4" />
      </IconButton>
      <IconButton aria-label="sm" radius="sm" variant="soft">
        <Search className="h-4 w-4" />
      </IconButton>
      <IconButton aria-label="md" radius="md" variant="soft">
        <Search className="h-4 w-4" />
      </IconButton>
      <IconButton aria-label="lg" radius="lg" variant="soft">
        <Search className="h-4 w-4" />
      </IconButton>
      <IconButton aria-label="full" radius="full" variant="soft">
        <Search className="h-4 w-4" />
      </IconButton>
    </Box>
  ),
}
