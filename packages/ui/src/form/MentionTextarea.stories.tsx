import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Label } from '@/form'
import { type MentionItem, MentionTextarea } from './MentionTextarea'

const meta: Meta<typeof MentionTextarea> = {
  title: 'Form/MentionTextarea',
  component: MentionTextarea,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof MentionTextarea>

// Sample data
const users: MentionItem[] = [
  { id: '1', label: 'John Doe', value: 'john' },
  { id: '2', label: 'Jane Smith', value: 'jane' },
  { id: '3', label: 'Bob Johnson', value: 'bob' },
  { id: '4', label: 'Alice Williams', value: 'alice' },
  { id: '5', label: 'Charlie Brown', value: 'charlie' },
  { id: '6', label: 'Diana Ross', value: 'diana' },
  { id: '7', label: 'Eve Anderson', value: 'eve' },
  { id: '8', label: 'Frank Miller', value: 'frank' },
]

const channels: MentionItem[] = [
  { id: '1', label: 'general', value: 'general' },
  { id: '2', label: 'random', value: 'random' },
  { id: '3', label: 'announcements', value: 'announcements' },
  { id: '4', label: 'help', value: 'help' },
  { id: '5', label: 'feedback', value: 'feedback' },
]

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('')

    return (
      <div className="w-96 space-y-2">
        <Label>Message</Label>
        <MentionTextarea
          mentions={users}
          value={value}
          onValueChange={setValue}
          placeholder="Type @ to mention someone..."
          rows={4}
        />
        <p className="text-xs text-muted-foreground">Try typing @jo to mention John</p>
      </div>
    )
  },
}

export const WithCallback: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    const [lastMention, setLastMention] = React.useState<string | null>(null)

    return (
      <div className="w-96 space-y-2">
        <Label>Message</Label>
        <MentionTextarea
          mentions={users}
          value={value}
          onValueChange={setValue}
          onMentionSelect={item => setLastMention(item.label)}
          placeholder="Type @ to mention someone..."
          rows={4}
        />
        {lastMention && <p className="text-sm text-green-600">Last mentioned: {lastMention}</p>}
      </div>
    )
  },
}

export const CustomTrigger: Story = {
  render: () => {
    const [value, setValue] = React.useState('')

    return (
      <div className="w-96 space-y-2">
        <Label>Channel reference</Label>
        <MentionTextarea
          mentions={channels}
          trigger="#"
          value={value}
          onValueChange={setValue}
          placeholder="Type # to reference a channel..."
          rows={4}
        />
        <p className="text-xs text-muted-foreground">Use # instead of @ to reference channels</p>
      </div>
    )
  },
}

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = React.useState('')

    const usersWithAvatars: MentionItem[] = users.map(user => ({
      ...user,
      icon: (
        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">
          {user.label.charAt(0)}
        </div>
      ),
    }))

    return (
      <div className="w-96 space-y-2">
        <Label>Team message</Label>
        <MentionTextarea
          mentions={usersWithAvatars}
          value={value}
          onValueChange={setValue}
          placeholder="Type @ to mention a team member..."
          rows={4}
        />
      </div>
    )
  },
}

export const WithAutoSize: Story = {
  render: () => {
    const [value, setValue] = React.useState('')

    return (
      <div className="w-96 space-y-2">
        <Label>Auto-sizing message</Label>
        <MentionTextarea
          mentions={users}
          value={value}
          onValueChange={setValue}
          placeholder="Type @ to mention someone..."
          autoSize
          minRows={2}
          maxRows={6}
        />
        <p className="text-xs text-muted-foreground">Textarea grows as you type</p>
      </div>
    )
  },
}

export const WithFloatingLabel: Story = {
  render: () => {
    const [value, setValue] = React.useState('')

    return (
      <div className="w-96 space-y-4">
        <MentionTextarea
          mentions={users}
          value={value}
          onValueChange={setValue}
          variant="floating-outlined"
          label="Your message"
        />
      </div>
    )
  },
}

export const DisabledItems: Story = {
  render: () => {
    const [value, setValue] = React.useState('')

    const usersWithDisabled: MentionItem[] = users.map((user, i) => ({
      ...user,
      disabled: i % 3 === 0, // Every 3rd item disabled
    }))

    return (
      <div className="w-96 space-y-2">
        <Label>Message (some users unavailable)</Label>
        <MentionTextarea
          mentions={usersWithDisabled}
          value={value}
          onValueChange={setValue}
          placeholder="Type @ to mention someone..."
          rows={4}
        />
        <p className="text-xs text-muted-foreground">Some users are disabled and cannot be selected</p>
      </div>
    )
  },
}

export const CustomRenderer: Story = {
  render: () => {
    const [value, setValue] = React.useState('')

    const usersWithStatus: (MentionItem & { status: 'online' | 'offline' | 'away' })[] = [
      { id: '1', label: 'John Doe', value: 'john', status: 'online' },
      { id: '2', label: 'Jane Smith', value: 'jane', status: 'away' },
      { id: '3', label: 'Bob Johnson', value: 'bob', status: 'offline' },
      { id: '4', label: 'Alice Williams', value: 'alice', status: 'online' },
    ]

    const statusColors = {
      online: 'bg-green-500',
      away: 'bg-yellow-500',
      offline: 'bg-gray-400',
    }

    return (
      <div className="w-96 space-y-2">
        <Label>Message with status</Label>
        <MentionTextarea
          mentions={usersWithStatus}
          value={value}
          onValueChange={setValue}
          placeholder="Type @ to mention someone..."
          rows={4}
          renderItem={(item, isHighlighted) => {
            const user = item as (typeof usersWithStatus)[0]
            return (
              <div className={`flex items-center gap-2 px-3 py-2 cursor-pointer ${isHighlighted ? 'bg-accent' : ''}`}>
                <span className={`w-2 h-2 rounded-full ${statusColors[user.status]}`} />
                <span>{user.label}</span>
                <span className="ml-auto text-xs text-muted-foreground capitalize">{user.status}</span>
              </div>
            )
          }}
        />
      </div>
    )
  },
}

export const ChatExample: Story = {
  render: () => {
    const [messages, setMessages] = React.useState<string[]>(['Hey everyone!', '@john mentioned you in a comment'])
    const [value, setValue] = React.useState('')

    const handleSend = () => {
      if (value.trim()) {
        setMessages(prev => [...prev, value])
        setValue('')
      }
    }

    return (
      <div className="w-[400px] border rounded-lg overflow-hidden">
        {/* Chat header */}
        <div className="px-4 py-3 border-b bg-muted/50">
          <h3 className="font-semibold">#general</h3>
        </div>

        {/* Messages */}
        <div className="h-48 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, i) => (
            <div key={i} className="text-sm">
              {msg}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t">
          <div className="flex gap-2 items-end">
            <MentionTextarea
              mentions={users}
              value={value}
              onValueChange={setValue}
              placeholder="Type a message..."
              autoSize
              minRows={1}
              maxRows={4}
              className="flex-1"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium shrink-0"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    )
  },
}

export const MultiTrigger: Story = {
  render: () => {
    const [userValue, setUserValue] = React.useState('')
    const [channelValue, setChannelValue] = React.useState('')

    return (
      <div className="w-96 space-y-6">
        <div className="space-y-2">
          <Label>Mention users (@)</Label>
          <MentionTextarea
            mentions={users}
            trigger="@"
            value={userValue}
            onValueChange={setUserValue}
            placeholder="Type @ to mention users..."
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label>Reference channels (#)</Label>
          <MentionTextarea
            mentions={channels}
            trigger="#"
            value={channelValue}
            onValueChange={setChannelValue}
            placeholder="Type # to reference channels..."
            rows={3}
          />
        </div>
      </div>
    )
  },
}

export const HighlightColors: Story = {
  render: () => {
    const [values, setValues] = React.useState<Record<string, string>>({})
    const colors = ['default', 'primary', 'info', 'success', 'warning', 'error'] as const

    return (
      <div className="w-96 space-y-4">
        {colors.map(color => (
          <div key={color} className="space-y-1">
            <Label className="capitalize">{color}</Label>
            <MentionTextarea
              mentions={users}
              highlightColor={color}
              value={values[color] || ''}
              onValueChange={v => setValues(prev => ({ ...prev, [color]: v }))}
              placeholder={`Type @ (${color} highlight)...`}
              rows={2}
            />
          </div>
        ))}
      </div>
    )
  },
}

export const MultipleTriggersSameTextarea: Story = {
  render: () => {
    const [value, setValue] = React.useState('')

    return (
      <div className="w-96 space-y-2">
        <Label>Message with @users and #channels</Label>
        <MentionTextarea
          triggers={[
            { trigger: '@', items: users, highlightColor: 'primary' },
            { trigger: '#', items: channels, highlightColor: 'info' },
          ]}
          value={value}
          onValueChange={setValue}
          onMentionSelect={(item, trigger) => console.log(`Selected ${trigger}${item.label}`)}
          placeholder="Type @ to mention users or # to reference channels..."
          rows={4}
        />
        <p className="text-xs text-muted-foreground">
          Try typing @jo for users (primary highlight) or #gen for channels (info highlight)
        </p>
      </div>
    )
  },
}

export const SlackStyleInput: Story = {
  render: () => {
    const [value, setValue] = React.useState('')

    const emojis: typeof users = [
      { id: 'smile', label: 'smile 😊', value: '😊' },
      { id: 'laugh', label: 'laugh 😂', value: '😂' },
      { id: 'heart', label: 'heart ❤️', value: '❤️' },
      { id: 'thumbsup', label: 'thumbsup 👍', value: '👍' },
      { id: 'fire', label: 'fire 🔥', value: '🔥' },
      { id: 'rocket', label: 'rocket 🚀', value: '🚀' },
    ]

    return (
      <div className="w-[450px] border rounded-lg">
        <div className="px-4 py-3 border-b bg-muted/50">
          <h3 className="font-semibold">#general</h3>
        </div>
        <div className="p-4">
          <MentionTextarea
            triggers={[
              { trigger: '@', items: users, highlightColor: 'primary' },
              { trigger: '#', items: channels, highlightColor: 'info' },
              { trigger: ':', items: emojis, highlightColor: 'warning' },
            ]}
            value={value}
            onValueChange={setValue}
            placeholder="Message #general - use @ # or :"
            autoSize
            minRows={1}
            maxRows={6}
          />
        </div>
        <div className="px-4 py-2 border-t text-xs text-muted-foreground">
          <span className="font-medium">@</span> mention user •<span className="font-medium ml-2">#</span> link channel
          •<span className="font-medium ml-2">:</span> add emoji
        </div>
      </div>
    )
  },
}
