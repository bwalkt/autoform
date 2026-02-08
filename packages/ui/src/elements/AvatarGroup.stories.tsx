import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarGroup } from '@/elements'

const meta: Meta<typeof AvatarGroup> = {
  title: 'Elements/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['1', '2', '3', '4', '5', '6'],
    },
    layout: {
      control: 'select',
      options: ['stack', 'spread'],
    },
    max: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof AvatarGroup>

/** Stack export. */
export const Stack: Story = {
  render: () => (
    <AvatarGroup layout="stack">
      <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
      <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" />
      <Avatar src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face" />
      <Avatar fallback="JD" />
      <Avatar fallback="AS" color="primary" />
    </AvatarGroup>
  ),
}

/** Spread export. */
export const Spread: Story = {
  render: () => (
    <AvatarGroup layout="spread">
      <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
      <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" />
      <Avatar src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face" />
      <Avatar fallback="JD" />
      <Avatar fallback="AS" color="primary" />
    </AvatarGroup>
  ),
}

/** Layouts export. */
export const Layouts: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Stack (overlapping)</p>
        <AvatarGroup layout="stack" size="3">
          <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
          <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" />
          <Avatar src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face" />
          <Avatar fallback="JD" />
        </AvatarGroup>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Spread (side by side)</p>
        <AvatarGroup layout="spread" size="3">
          <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
          <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" />
          <Avatar src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face" />
          <Avatar fallback="JD" />
        </AvatarGroup>
      </div>
    </div>
  ),
}

/** WithMax export. */
export const WithMax: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium mb-2">Stack with max 3:</p>
        <AvatarGroup max={3} layout="stack">
          <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
          <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" />
          <Avatar src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face" />
          <Avatar fallback="JD" />
          <Avatar fallback="AS" />
          <Avatar fallback="MK" />
        </AvatarGroup>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Spread with max 3:</p>
        <AvatarGroup max={3} layout="spread">
          <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
          <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" />
          <Avatar src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face" />
          <Avatar fallback="JD" />
          <Avatar fallback="AS" />
          <Avatar fallback="MK" />
        </AvatarGroup>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">With overflow click handler:</p>
        <AvatarGroup max={3} layout="stack" onOverflowClick={(count, _items) => alert(`Clicked! ${count} more users`)}>
          <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
          <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" />
          <Avatar src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face" />
          <Avatar fallback="JD" />
          <Avatar fallback="AS" />
          <Avatar fallback="MK" />
          <Avatar fallback="RB" />
          <Avatar fallback="LC" />
        </AvatarGroup>
      </div>
    </div>
  ),
}

/** Sizes export. */
export const Sizes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4">
        <p className="text-sm font-medium">Stack Layout</p>
        {(['1', '2', '3', '4', '5', '6'] as const).map(size => (
          <div key={size} className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground w-12">Size {size}</span>
            <AvatarGroup size={size} layout="stack" max={4}>
              <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
              <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" />
              <Avatar src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face" />
              <Avatar fallback="JD" />
              <Avatar fallback="AS" />
            </AvatarGroup>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <p className="text-sm font-medium">Spread Layout</p>
        {(['1', '2', '3', '4', '5', '6'] as const).map(size => (
          <div key={size} className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground w-12">Size {size}</span>
            <AvatarGroup size={size} layout="spread" max={4}>
              <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
              <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" />
              <Avatar src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face" />
              <Avatar fallback="JD" />
              <Avatar fallback="AS" />
            </AvatarGroup>
          </div>
        ))}
      </div>
    </div>
  ),
}
