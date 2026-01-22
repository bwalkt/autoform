import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell, Calendar, Settings } from 'lucide-react'
import { useState } from 'react'
import { Button, Popover } from '@/elements'
import { Label, TextField } from '@/form'

const meta: Meta = {
  title: 'Elements/Popover',
  component: Popover.Root,
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="outline">Open Popover</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Close />
        <div className="space-y-2">
          <h4 className="font-medium">Popover Title</h4>
          <p className="text-sm text-muted-foreground">This is the popover content. You can put any content here.</p>
        </div>
      </Popover.Content>
    </Popover.Root>
  ),
}

export const Positions: StoryObj = {
  render: () => (
    <div className="flex gap-4">
      {(['top', 'right', 'bottom', 'left'] as const).map(side => (
        <Popover.Root key={side}>
          <Popover.Trigger>
            <Button variant="outline" className="capitalize">
              {side}
            </Button>
          </Popover.Trigger>
          <Popover.Content side={side}>
            <p className="text-sm">Popover on {side}</p>
          </Popover.Content>
        </Popover.Root>
      ))}
    </div>
  ),
}

export const Alignments: StoryObj = {
  render: () => (
    <div className="flex gap-4">
      {(['start', 'center', 'end'] as const).map(align => (
        <Popover.Root key={align}>
          <Popover.Trigger>
            <Button variant="outline" className="capitalize">
              {align}
            </Button>
          </Popover.Trigger>
          <Popover.Content align={align}>
            <p className="text-sm">Aligned to {align}</p>
          </Popover.Content>
        </Popover.Root>
      ))}
    </div>
  ),
}

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex gap-4">
      {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
        <Popover.Root key={size}>
          <Popover.Trigger>
            <Button variant="outline">{size.toUpperCase()}</Button>
          </Popover.Trigger>
          <Popover.Content maxWidth={size}>
            <p className="text-sm">This popover has max-width set to {size}. Lorem ipsum dolor sit amet.</p>
          </Popover.Content>
        </Popover.Root>
      ))}
    </div>
  ),
}

export const WithForm: StoryObj = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger>
        <Button>Edit Dimensions</Button>
      </Popover.Trigger>
      <Popover.Content maxWidth="sm">
        <div className="space-y-4">
          <h4 className="font-medium">Dimensions</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width-input">Width</Label>
              <TextField id="width-input" placeholder="100%" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height-input">Height</Label>
              <TextField id="height-input" placeholder="auto" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="2">Apply</Button>
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  ),
}

export const NotificationSettings: StoryObj = {
  render: () => {
    const [settings, setSettings] = useState({
      email: true,
      push: false,
      sms: false,
    })

    return (
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="ghost" size="2" className="p-2">
            <Bell className="h-5 w-5" />
          </Button>
        </Popover.Trigger>
        <Popover.Content align="end" maxWidth="xs">
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Notifications</h4>
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={`notification-${key}`} className="capitalize">
                  {key}
                </Label>
                <input
                  id={`notification-${key}`}
                  type="checkbox"
                  checked={value}
                  onChange={e => setSettings(s => ({ ...s, [key]: e.target.checked }))}
                />
              </div>
            ))}
          </div>
        </Popover.Content>
      </Popover.Root>
    )
  },
}

export const DatePicker: StoryObj = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="outline" className="w-56 justify-start">
          <Calendar className="mr-2 h-4 w-4" />
          Pick a date
        </Button>
      </Popover.Trigger>
      <Popover.Content align="start" maxWidth="sm">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <button className="p-1 hover:bg-muted rounded" aria-label="Previous month">
              &lt;
            </button>
            <span className="font-medium text-sm">January 2026</span>
            <button className="p-1 hover:bg-muted rounded" aria-label="Next month">
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="p-1 text-muted-foreground font-medium">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
              <button key={day} className="p-1 hover:bg-muted rounded text-sm">
                {day}
              </button>
            ))}
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  ),
}

export const SettingsPopover: StoryObj = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="ghost" size="2" className="p-2">
          <Settings className="h-5 w-5" />
        </Button>
      </Popover.Trigger>
      <Popover.Content align="end" maxWidth="xs">
        <Popover.Close />
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Quick Settings</h4>
          <div className="space-y-1">
            <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-muted rounded">Account</button>
            <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-muted rounded">Preferences</button>
            <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-muted rounded">Help & Support</button>
            <hr className="my-1" />
            <button className="w-full text-left px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded">
              Sign Out
            </button>
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  ),
}
