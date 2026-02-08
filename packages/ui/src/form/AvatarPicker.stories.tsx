import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Label } from '@/form'
import { type AvatarItem, AvatarPicker } from './AvatarPicker'

const meta: Meta<typeof AvatarPicker> = {
  title: 'Form/AvatarPicker',
  component: AvatarPicker,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof AvatarPicker>

// Sample items data
const sampleItems: AvatarItem[] = [
  { id: '1', name: 'John Doe', description: 'john@example.com' },
  { id: '2', name: 'Jane Smith', description: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', description: 'bob@example.com' },
  { id: '4', name: 'Alice Williams', description: 'alice@example.com' },
  { id: '5', name: 'Charlie Brown', description: 'charlie@example.com' },
  { id: '6', name: 'Diana Ross', description: 'diana@example.com' },
  { id: '7', name: 'Eve Anderson', description: 'eve@example.com' },
  { id: '8', name: 'Frank Miller', description: 'frank@example.com' },
]

const itemsWithAvatars: AvatarItem[] = [
  { id: '1', name: 'John Doe', description: 'john@example.com', avatar: 'https://i.pravatar.cc/150?u=john' },
  { id: '2', name: 'Jane Smith', description: 'jane@example.com', avatar: 'https://i.pravatar.cc/150?u=jane' },
  { id: '3', name: 'Bob Johnson', description: 'bob@example.com', avatar: 'https://i.pravatar.cc/150?u=bob' },
  { id: '4', name: 'Alice Williams', description: 'alice@example.com', avatar: 'https://i.pravatar.cc/150?u=alice' },
]

/** Default export. */
export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('')

    return (
      <div className="w-72 space-y-2">
        <Label>Assign to</Label>
        <AvatarPicker items={sampleItems} value={value} onValueChange={v => setValue(v as string)} />
      </div>
    )
  },
}

/** Multiple export. */
export const Multiple: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>([])

    return (
      <div className="w-72 space-y-2">
        <Label>Team members</Label>
        <AvatarPicker
          items={sampleItems}
          multiple
          value={value}
          onValueChange={v => setValue(v as string[])}
          placeholder="Select team members..."
        />
      </div>
    )
  },
}

/** WithAvatars export. */
export const WithAvatars: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('')

    return (
      <div className="w-72 space-y-2">
        <Label>Select reviewer</Label>
        <AvatarPicker items={itemsWithAvatars} value={value} onValueChange={v => setValue(v as string)} />
      </div>
    )
  },
}

/** WithDisabledItems export. */
export const WithDisabledItems: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('')

    const itemsWithDisabled: AvatarItem[] = sampleItems.map((item, i) => ({
      ...item,
      disabled: i % 3 === 0,
    }))

    return (
      <div className="w-72 space-y-2">
        <Label>Available items</Label>
        <AvatarPicker
          items={itemsWithDisabled}
          value={value}
          onValueChange={v => setValue(v as string)}
          placeholder="Some items are unavailable..."
        />
      </div>
    )
  },
}

/** HighlightColors export. */
export const HighlightColors: Story = {
  render: () => {
    const [values, setValues] = React.useState<Record<string, string>>({})
    const colors = ['default', 'primary', 'info', 'success', 'warning', 'error'] as const

    return (
      <div className="w-72 space-y-4">
        {colors.map(color => (
          <div key={color} className="space-y-1">
            <Label className="capitalize">{color}</Label>
            <AvatarPicker
              items={sampleItems}
              highlightColor={color}
              value={values[color] || ''}
              onValueChange={v => setValues(prev => ({ ...prev, [color]: v as string }))}
              placeholder={`${color} highlight...`}
            />
          </div>
        ))}
      </div>
    )
  },
}

/** Sizes export. */
export const Sizes: Story = {
  render: () => {
    const [values, setValues] = React.useState<Record<string, string>>({})
    const sizes = ['1', '2', '3', '4'] as const

    return (
      <div className="w-80 space-y-4">
        {sizes.map(size => (
          <div key={size} className="space-y-1">
            <Label>Size {size}</Label>
            <AvatarPicker
              items={sampleItems}
              size={size}
              value={values[size] || ''}
              onValueChange={v => setValues(prev => ({ ...prev, [size]: v as string }))}
            />
          </div>
        ))}
      </div>
    )
  },
}

/** WithoutSearch export. */
export const WithoutSearch: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('')

    return (
      <div className="w-72 space-y-2">
        <Label>Quick select</Label>
        <AvatarPicker
          items={sampleItems.slice(0, 4)}
          searchable={false}
          value={value}
          onValueChange={v => setValue(v as string)}
        />
      </div>
    )
  },
}

/** Disabled export. */
export const Disabled: Story = {
  render: () => {
    return (
      <div className="w-72 space-y-2">
        <Label>Assigned (read-only)</Label>
        <AvatarPicker items={sampleItems} value="1" disabled placeholder="Cannot change..." />
      </div>
    )
  },
}

/** CustomRenderer export. */
export const CustomRenderer: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('')

    const itemsWithRoles: (AvatarItem & { role: string })[] = [
      { id: '1', name: 'John Doe', description: 'john@example.com', role: 'Admin' },
      { id: '2', name: 'Jane Smith', description: 'jane@example.com', role: 'Editor' },
      { id: '3', name: 'Bob Johnson', description: 'bob@example.com', role: 'Viewer' },
      { id: '4', name: 'Alice Williams', description: 'alice@example.com', role: 'Editor' },
    ]

    return (
      <div className="w-80 space-y-2">
        <Label>Select user with role</Label>
        <AvatarPicker
          items={itemsWithRoles}
          value={value}
          onValueChange={v => setValue(v as string)}
          renderItem={(item, isSelected, isHighlighted) => {
            const itemWithRole = item as (typeof itemsWithRoles)[0]
            return (
              <div className={`flex items-center gap-2 px-3 py-2 cursor-pointer ${isHighlighted ? 'bg-accent' : ''}`}>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                  {item.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{itemWithRole.role}</div>
                </div>
                {isSelected && <span className="text-primary">&#10003;</span>}
              </div>
            )
          }}
        />
      </div>
    )
  },
}

/** MultipleWithHighlight export. */
export const MultipleWithHighlight: Story = {
  render: () => {
    const [values, setValues] = React.useState<Record<string, string[]>>({})
    const colors = ['primary', 'success', 'warning'] as const

    return (
      <div className="w-72 space-y-4">
        {colors.map(color => (
          <div key={color} className="space-y-1">
            <Label className="capitalize">{color} team</Label>
            <AvatarPicker
              items={sampleItems}
              multiple
              highlightColor={color}
              value={values[color] || []}
              onValueChange={v => setValues(prev => ({ ...prev, [color]: v as string[] }))}
              placeholder={`Select ${color} team...`}
            />
          </div>
        ))}
      </div>
    )
  },
}

/** FormExample export. */
export const FormExample: Story = {
  render: () => {
    const [assignee, setAssignee] = React.useState<string>('')
    const [reviewers, setReviewers] = React.useState<string[]>([])

    return (
      <div className="w-80 p-4 border rounded-lg space-y-4">
        <h3 className="font-semibold">Create Task</h3>

        <div className="space-y-1">
          <Label>Title</Label>
          <input type="text" placeholder="Task title..." className="w-full px-3 py-2 border rounded-md text-sm" />
        </div>

        <div className="space-y-1">
          <Label>Assignee</Label>
          <AvatarPicker
            items={itemsWithAvatars}
            value={assignee}
            onValueChange={v => setAssignee(v as string)}
            placeholder="Assign to..."
          />
        </div>

        <div className="space-y-1">
          <Label>Reviewers</Label>
          <AvatarPicker
            items={itemsWithAvatars}
            multiple
            highlightColor="primary"
            value={reviewers}
            onValueChange={v => setReviewers(v as string[])}
            placeholder="Add reviewers..."
          />
        </div>

        <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
          Create Task
        </button>
      </div>
    )
  },
}
