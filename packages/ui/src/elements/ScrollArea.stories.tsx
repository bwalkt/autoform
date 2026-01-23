import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScrollArea } from './ScrollArea'

const meta: Meta<typeof ScrollArea> = {
  title: 'Elements/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['auto', 'always', 'hover'],
      description: 'Scrollbar visibility type',
    },
    scrollbars: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
      description: 'Scrollbar direction',
    },
    size: {
      control: 'select',
      options: ['none', '1', '2', '3'],
      description: 'Scrollbar size',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample content for demos
const sampleParagraphs = Array.from({ length: 10 }, (_, i) => (
  <p key={i} className="mb-4 text-sm">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
  </p>
))

// ============================================================================
// Basic Examples
// ============================================================================

export const Default: Story = {
  args: {
    type: 'hover',
    scrollbars: 'vertical',
    size: '2',
  },
  render: args => (
    <ScrollArea
      type={args.type}
      scrollbars={args.scrollbars}
      size={args.size}
      className="h-64 w-80 border rounded-lg p-4"
    >
      {sampleParagraphs}
    </ScrollArea>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ScrollArea scrollbars="vertical" className="h-64 w-80 border rounded-lg p-4">
      {sampleParagraphs}
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea scrollbars="horizontal" className="h-32 w-80 border rounded-lg">
      <div className="flex gap-4 p-4" style={{ width: '800px' }}>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="shrink-0 w-32 h-20 bg-muted rounded-md flex items-center justify-center">
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Both: Story = {
  render: () => (
    <ScrollArea scrollbars="both" className="h-64 w-80 border rounded-lg">
      <div className="p-4" style={{ width: '600px' }}>
        {sampleParagraphs}
      </div>
    </ScrollArea>
  ),
}

// ============================================================================
// Types (Visibility)
// ============================================================================

export const TypeAuto: Story = {
  render: () => (
    <div className="space-y-2">
      <p className="text-sm font-medium">Auto - Shows when content overflows</p>
      <ScrollArea type="auto" className="h-48 w-80 border rounded-lg p-4">
        {sampleParagraphs}
      </ScrollArea>
    </div>
  ),
}

export const TypeAlways: Story = {
  render: () => (
    <div className="space-y-2">
      <p className="text-sm font-medium">Always - Scrollbar always visible</p>
      <ScrollArea type="always" className="h-48 w-80 border rounded-lg p-4">
        {sampleParagraphs}
      </ScrollArea>
    </div>
  ),
}

export const TypeHover: Story = {
  render: () => (
    <div className="space-y-2">
      <p className="text-sm font-medium">Hover - Shows on hover (default)</p>
      <ScrollArea type="hover" className="h-48 w-80 border rounded-lg p-4">
        {sampleParagraphs}
      </ScrollArea>
    </div>
  ),
}

// ============================================================================
// Sizes
// ============================================================================

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-6">
      {(['none', '1', '2', '3'] as const).map(size => (
        <div key={size} className="space-y-2">
          <p className="text-sm font-medium">Size: {size}</p>
          <ScrollArea type="always" size={size} className="h-48 w-56 border rounded-lg p-4">
            {sampleParagraphs}
          </ScrollArea>
        </div>
      ))}
    </div>
  ),
}

// ============================================================================
// Real-world Examples
// ============================================================================

export const MessageList: Story = {
  render: () => (
    <div className="w-80 border rounded-lg">
      <div className="p-3 border-b font-medium">Messages</div>
      <ScrollArea className="h-64">
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} className="flex items-start gap-3 p-3 border-b last:border-b-0 hover:bg-muted cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
              {String.fromCharCode(65 + (i % 26))}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">User {i + 1}</p>
              <p className="text-sm text-muted-foreground truncate">Hey, how are you doing today?</p>
            </div>
            <span className="text-xs text-muted-foreground">2m</span>
          </div>
        ))}
      </ScrollArea>
    </div>
  ),
}

export const CodeBlock: Story = {
  render: () => (
    <ScrollArea scrollbars="both" className="h-64 w-96 border rounded-lg bg-zinc-950 text-zinc-100">
      <pre className="p-4 text-sm font-mono" style={{ width: '600px' }}>
        {`import React from 'react';
import { ScrollArea } from '@/elements';

function App() {
  const items = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    name: \`Item \${i + 1}\`,
    description: 'Lorem ipsum dolor sit amet',
  }));

  return (
    <ScrollArea className="h-96 w-full">
      {items.map((item) => (
        <div key={item.id} className="p-4 border-b">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </ScrollArea>
  );
}

export default App;`}
      </pre>
    </ScrollArea>
  ),
}

export const TableWithScroll: Story = {
  render: () => (
    <div className="w-96 border rounded-lg">
      <div className="p-3 border-b font-medium">Users Table</div>
      <ScrollArea className="h-64">
        <table className="w-full">
          <thead className="sticky top-0 bg-background border-b">
            <tr>
              <th className="text-left p-3 text-sm font-medium">Name</th>
              <th className="text-left p-3 text-sm font-medium">Email</th>
              <th className="text-left p-3 text-sm font-medium">Role</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 20 }, (_, i) => (
              <tr key={i} className="border-b last:border-b-0 hover:bg-muted">
                <td className="p-3 text-sm">User {i + 1}</td>
                <td className="p-3 text-sm text-muted-foreground">user{i + 1}@example.com</td>
                <td className="p-3 text-sm">{i % 3 === 0 ? 'Admin' : 'Member'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  ),
}

export const ImageGallery: Story = {
  render: () => (
    <div className="w-96 border rounded-lg">
      <div className="p-3 border-b font-medium">Photo Gallery</div>
      <ScrollArea scrollbars="horizontal" className="p-4">
        <div className="flex gap-3" style={{ width: 'max-content' }}>
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="shrink-0 w-40 h-40 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
            >
              <span className="text-4xl opacity-50">🖼️</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
}

export const NestedScrollAreas: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="w-64 border rounded-lg">
        <div className="p-3 border-b font-medium">Sidebar</div>
        <ScrollArea className="h-80 p-2">
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="py-2 px-3 rounded-md hover:bg-muted cursor-pointer">
              Menu Item {i + 1}
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="w-80 border rounded-lg">
        <div className="p-3 border-b font-medium">Content</div>
        <ScrollArea className="h-80 p-4">{sampleParagraphs}</ScrollArea>
      </div>
    </div>
  ),
}

export const SelectDropdown: Story = {
  render: () => (
    <div className="w-64 border rounded-lg shadow-lg">
      <ScrollArea className="max-h-48">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="py-2 px-3 hover:bg-primary hover:text-primary-foreground cursor-pointer text-sm">
            Option {i + 1}
          </div>
        ))}
      </ScrollArea>
    </div>
  ),
}
