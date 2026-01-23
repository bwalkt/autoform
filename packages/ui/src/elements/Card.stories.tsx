import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell, CreditCard, Settings, User } from 'lucide-react'
import { Avatar } from './Avatar'
import { Badge } from './Badge'
import { Button } from './Button'
import { Card } from './Card'

const meta: Meta<typeof Card.Root> = {
  title: 'Elements/Card',
  component: Card.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['1', '2', '3', '4'],
      description: 'Padding size',
    },
    variant: {
      control: 'select',
      options: ['surface', 'classic', 'ghost'],
      description: 'Visual variant',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ============================================================================
// Basic Examples
// ============================================================================

export const Default: Story = {
  args: {
    size: '2',
    variant: 'surface',
  },
  render: args => (
    <Card.Root size={args.size} variant={args.variant} className="w-80">
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>Card description goes here.</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-sm">This is the main content area of the card.</p>
      </Card.Content>
      <Card.Footer>
        <Button variant="outline" size="2">
          Cancel
        </Button>
        <Button size="2" className="ml-2">
          Save
        </Button>
      </Card.Footer>
    </Card.Root>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card.Root className="w-80">
      <p className="text-sm">A simple card with just content and default padding.</p>
    </Card.Root>
  ),
}

// ============================================================================
// Sizes
// ============================================================================

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['1', '2', '3', '4'] as const).map(size => (
        <Card.Root key={size} size={size} className="w-80">
          <Card.Header>
            <Card.Title>Size {size}</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-sm">Content with size {size} padding.</p>
          </Card.Content>
        </Card.Root>
      ))}
    </div>
  ),
}

// ============================================================================
// Variants
// ============================================================================

export const VariantSurface: Story = {
  render: () => (
    <Card.Root variant="surface" className="w-80">
      <Card.Header>
        <Card.Title>Surface Variant</Card.Title>
        <Card.Description>Background with subtle shadow</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-sm">Default card appearance with background color and border.</p>
      </Card.Content>
    </Card.Root>
  ),
}

export const VariantClassic: Story = {
  render: () => (
    <Card.Root variant="classic" className="w-80">
      <Card.Header>
        <Card.Title>Classic Variant</Card.Title>
        <Card.Description>More prominent shadow</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-sm">Classic card with deeper shadow for more emphasis.</p>
      </Card.Content>
    </Card.Root>
  ),
}

export const VariantGhost: Story = {
  render: () => (
    <div className="p-6 bg-muted rounded-lg">
      <Card.Root variant="ghost" className="w-80">
        <Card.Header>
          <Card.Title>Ghost Variant</Card.Title>
          <Card.Description>Transparent background</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Ghost card with no background, useful for nested cards.</p>
        </Card.Content>
      </Card.Root>
    </div>
  ),
}

// ============================================================================
// Real-world Examples
// ============================================================================

export const UserProfile: Story = {
  render: () => (
    <Card.Root className="w-80">
      <Card.Header>
        <div className="flex items-center gap-4">
          <Avatar
            size="4"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          />
          <div>
            <Card.Title>John Doe</Card.Title>
            <Card.Description>Software Engineer</Card.Description>
          </div>
        </div>
      </Card.Header>
      <Card.Content>
        <p className="text-sm text-muted-foreground">
          Building great products with React and TypeScript. Passionate about clean code and user experience.
        </p>
      </Card.Content>
      <Card.Footer className="justify-between">
        <Button variant="outline" size="2">
          Message
        </Button>
        <Button size="2">Follow</Button>
      </Card.Footer>
    </Card.Root>
  ),
}

export const PricingCard: Story = {
  render: () => (
    <Card.Root className="w-72" variant="classic">
      <Card.Header>
        <Badge color="primary" className="w-fit mb-2">
          Popular
        </Badge>
        <Card.Title>Pro Plan</Card.Title>
        <Card.Description>Perfect for growing teams</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="mb-4">
          <span className="text-4xl font-bold">$29</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Unlimited projects
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span> 10GB storage
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Priority support
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Advanced analytics
          </li>
        </ul>
      </Card.Content>
      <Card.Footer>
        <Button className="w-full">Get Started</Button>
      </Card.Footer>
    </Card.Root>
  ),
}

export const NotificationCard: Story = {
  render: () => (
    <Card.Root className="w-96">
      <Card.Header>
        <div className="flex items-center justify-between">
          <Card.Title className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </Card.Title>
          <Badge variant="solid" color="error">
            3 new
          </Badge>
        </div>
      </Card.Header>
      <Card.Content className="space-y-3">
        <div className="flex items-start gap-3 p-2 rounded-md hover:bg-muted">
          <Avatar size="2" fallback="JD" color="primary" />
          <div className="flex-1">
            <p className="text-sm font-medium">John commented on your post</p>
            <p className="text-xs text-muted-foreground">2 minutes ago</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-2 rounded-md hover:bg-muted">
          <Avatar size="2" fallback="AS" color="success" />
          <div className="flex-1">
            <p className="text-sm font-medium">Alice started following you</p>
            <p className="text-xs text-muted-foreground">1 hour ago</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-2 rounded-md hover:bg-muted">
          <Avatar size="2" fallback="MK" color="warning" />
          <div className="flex-1">
            <p className="text-sm font-medium">Mike liked your photo</p>
            <p className="text-xs text-muted-foreground">3 hours ago</p>
          </div>
        </div>
      </Card.Content>
      <Card.Footer>
        <Button variant="ghost" className="w-full">
          View all notifications
        </Button>
      </Card.Footer>
    </Card.Root>
  ),
}

export const SettingsCard: Story = {
  render: () => (
    <Card.Root className="w-96">
      <Card.Header>
        <Card.Title className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Account Settings
        </Card.Title>
        <Card.Description>Manage your account preferences</Card.Description>
      </Card.Header>
      <Card.Content className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Profile</span>
          </div>
          <Button variant="ghost" size="1">
            Edit
          </Button>
        </div>
        <div className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center gap-3">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Notifications</span>
          </div>
          <Button variant="ghost" size="1">
            Edit
          </Button>
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Billing</span>
          </div>
          <Button variant="ghost" size="1">
            Edit
          </Button>
        </div>
      </Card.Content>
    </Card.Root>
  ),
}

export const StatsCard: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card.Root className="w-48">
        <Card.Header className="pb-2">
          <Card.Description>Total Revenue</Card.Description>
        </Card.Header>
        <Card.Content className="pt-0">
          <p className="text-2xl font-bold">$45,231</p>
          <p className="text-xs text-green-500">+20.1% from last month</p>
        </Card.Content>
      </Card.Root>

      <Card.Root className="w-48">
        <Card.Header className="pb-2">
          <Card.Description>Active Users</Card.Description>
        </Card.Header>
        <Card.Content className="pt-0">
          <p className="text-2xl font-bold">2,350</p>
          <p className="text-xs text-green-500">+180 new this week</p>
        </Card.Content>
      </Card.Root>

      <Card.Root className="w-48">
        <Card.Header className="pb-2">
          <Card.Description>Pending Orders</Card.Description>
        </Card.Header>
        <Card.Content className="pt-0">
          <p className="text-2xl font-bold">12</p>
          <p className="text-xs text-amber-500">3 require attention</p>
        </Card.Content>
      </Card.Root>
    </div>
  ),
}

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-[700px]">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <Card.Root key={i}>
          <Card.Header>
            <Card.Title>Card {i}</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-sm text-muted-foreground">Card content goes here.</p>
          </Card.Content>
        </Card.Root>
      ))}
    </div>
  ),
}
