import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from '@/elements'

const meta: Meta<typeof Avatar> = {
  title: 'Elements/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['1', '2', '3', '4', '5', '6'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'soft'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'neutral', 'info', 'success', 'warning', 'error'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    alt: 'User avatar',
  },
}

export const WithFallback: Story = {
  args: {
    fallback: 'John Doe',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {(['1', '2', '3', '4', '5', '6'] as const).map(size => (
        <Avatar
          key={size}
          size={size}
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        />
      ))}
    </div>
  ),
}

export const FallbackSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {(['1', '2', '3', '4', '5', '6'] as const).map(size => (
        <Avatar key={size} size={size} fallback="JD" />
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-12 text-sm">Soft:</span>
        {(['default', 'primary', 'neutral', 'info', 'success', 'warning', 'error'] as const).map(color => (
          <Avatar key={color} color={color} variant="soft" fallback="AB" />
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="w-12 text-sm">Solid:</span>
        {(['default', 'primary', 'neutral', 'info', 'success', 'warning', 'error'] as const).map(color => (
          <Avatar key={color} color={color} variant="solid" fallback="AB" />
        ))}
      </div>
    </div>
  ),
}

export const Radius: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map(radius => (
        <Avatar
          key={radius}
          radius={radius}
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          size="4"
        />
      ))}
    </div>
  ),
}

export const BrokenImage: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src="https://broken-link.com/image.jpg" fallback="JD" />
      <Avatar src="https://broken-link.com/image.jpg" fallback="Alice Smith" />
      <Avatar src="https://broken-link.com/image.jpg" />
    </div>
  ),
}

export const UserCard: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 border rounded-lg w-72">
      <Avatar
        size="4"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      />
      <div>
        <p className="font-medium">John Doe</p>
        <p className="text-sm text-muted-foreground">john@example.com</p>
      </div>
    </div>
  ),
}

export const CommentThread: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div className="flex gap-3">
        <Avatar
          size="3"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">John Doe</span>
            <span className="text-xs text-muted-foreground">2 hours ago</span>
          </div>
          <p className="text-sm mt-1">This looks great! I love the new design direction.</p>
        </div>
      </div>
      <div className="flex gap-3 ml-8">
        <Avatar
          size="2"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">Jane Smith</span>
            <span className="text-xs text-muted-foreground">1 hour ago</span>
          </div>
          <p className="text-sm mt-1">Thanks! Let me know if you have any suggestions.</p>
        </div>
      </div>
    </div>
  ),
}
