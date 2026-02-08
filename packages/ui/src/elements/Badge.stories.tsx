import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@/elements'

const meta: Meta<typeof Badge> = {
  title: 'Elements/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['1', '2', '3', '4'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline', 'surface'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'neutral', 'info', 'success', 'warning', 'error'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    highContrast: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(['1', '2', '3', '4'] as const).map(size => (
        <Badge key={size} size={size}>
          Size {size}
        </Badge>
      ))}
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(['solid', 'soft', 'outline', 'surface'] as const).map(variant => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['solid', 'soft', 'outline', 'surface'] as const).map(variant => (
        <div key={variant} className="flex items-center gap-2">
          <span className="w-16 text-sm capitalize">{variant}:</span>
          {(['default', 'primary', 'neutral', 'info', 'success', 'warning', 'error'] as const).map(color => (
            <Badge key={color} variant={variant} color={color}>
              {color}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map(radius => (
        <Badge key={radius} radius={radius}>
          {radius}
        </Badge>
      ))}
    </div>
  ),
}

export const HighContrast: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge variant="soft">Normal</Badge>
      <Badge variant="soft" highContrast>
        High Contrast
      </Badge>
    </div>
  ),
}

export const StatusBadges: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge color="success" variant="soft">
        Active
      </Badge>
      <Badge color="warning" variant="soft">
        Pending
      </Badge>
      <Badge color="error" variant="soft">
        Inactive
      </Badge>
      <Badge color="info" variant="soft">
        Processing
      </Badge>
    </div>
  ),
}

export const WithDot: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge color="success" variant="soft" className="gap-1.5">
        <span className="h-2 w-2 rounded-full bg-current" />
        Online
      </Badge>
      <Badge color="warning" variant="soft" className="gap-1.5">
        <span className="h-2 w-2 rounded-full bg-current" />
        Away
      </Badge>
      <Badge color="neutral" variant="soft" className="gap-1.5">
        <span className="h-2 w-2 rounded-full bg-current" />
        Offline
      </Badge>
    </div>
  ),
}

export const InContext: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold">Project Status</h3>
        <Badge color="success" variant="soft" size="1">
          Active
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Version</span>
        <Badge variant="outline" size="1">
          v2.0.0
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Environment</span>
        <Badge color="info" variant="surface" size="1">
          Production
        </Badge>
      </div>
      <div className="p-4 border rounded-lg">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium">New Feature Request</h4>
            <p className="text-sm text-muted-foreground">Submitted 2 hours ago</p>
          </div>
          <div className="flex gap-2">
            <Badge color="primary" variant="soft" size="1">
              Feature
            </Badge>
            <Badge color="warning" variant="soft" size="1">
              High Priority
            </Badge>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const NotificationCount: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="relative">
        <button className="p-2 rounded-md hover:bg-muted" aria-label="Notifications">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
        <Badge
          color="error"
          variant="solid"
          size="1"
          radius="full"
          className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center"
        >
          3
        </Badge>
      </div>
      <div className="relative">
        <button className="p-2 rounded-md hover:bg-muted" aria-label="Messages">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </button>
        <Badge
          color="primary"
          variant="solid"
          size="1"
          radius="full"
          className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center"
        >
          12
        </Badge>
      </div>
    </div>
  ),
}
