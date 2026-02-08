import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button, Spinner } from '@/elements'

const meta: Meta<typeof Spinner> = {
  title: 'Elements/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['1', '2', '3', '4'],
    },
    loading: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** Default export. */
export const Default: Story = {
  args: {
    loading: true,
  },
}

/** Sizes export. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(['1', '2', '3', '4'] as const).map(size => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Spinner size={size} />
          <span className="text-xs text-muted-foreground">Size {size}</span>
        </div>
      ))}
    </div>
  ),
}

/** Colors export. */
export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="text-primary" />
      <Spinner className="text-blue-500" />
      <Spinner className="text-green-500" />
      <Spinner className="text-amber-500" />
      <Spinner className="text-red-500" />
      <Spinner className="text-muted-foreground" />
    </div>
  ),
}

/** WithText export. */
export const WithText: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Spinner size="2" />
        <span className="text-sm">Loading...</span>
      </div>
      <div className="flex items-center gap-2">
        <Spinner size="2" className="text-primary" />
        <span className="text-sm text-primary">Processing your request...</span>
      </div>
    </div>
  ),
}

/** ButtonLoading export. */
export const ButtonLoading: Story = {
  render: () => {
    const [loading, setLoading] = useState(false)

    const handleClick = () => {
      setLoading(true)
      setTimeout(() => setLoading(false), 2000)
    }

    return (
      <div className="flex gap-4">
        <Button onClick={handleClick} disabled={loading}>
          {loading && <Spinner size="1" className="mr-2" />}
          {loading ? 'Loading...' : 'Click me'}
        </Button>
        <Button variant="outline" onClick={handleClick} disabled={loading}>
          {loading && <Spinner size="1" className="mr-2" />}
          Submit
        </Button>
      </div>
    )
  },
}

/** LoadingOverlay export. */
export const LoadingOverlay: Story = {
  render: () => (
    <div className="relative w-64 h-32 border rounded-lg">
      <div className="p-4">
        <h4 className="font-medium">Card Content</h4>
        <p className="text-sm text-muted-foreground">This content is loading...</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
        <Spinner size="3" />
      </div>
    </div>
  ),
}

/** FullPageLoading export. */
export const FullPageLoading: Story = {
  render: () => (
    <div className="w-80 h-48 border rounded-lg flex flex-col items-center justify-center gap-3">
      <Spinner size="4" className="text-primary" />
      <div className="text-center">
        <p className="font-medium">Loading your dashboard</p>
        <p className="text-sm text-muted-foreground">Please wait a moment...</p>
      </div>
    </div>
  ),
}

/** InlineLoading export. */
export const InlineLoading: Story = {
  render: () => (
    <div className="w-72 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-sm">Checking availability</span>
        <Spinner size="1" />
      </div>
    </div>
  ),
}

/** LoadingList export. */
export const LoadingList: Story = {
  render: () => (
    <div className="w-72 border rounded-lg divide-y">
      {[1, 2, 3].map(i => (
        <div key={i} className="p-3 flex items-center gap-3">
          <Spinner size="2" className="text-muted-foreground" />
          <div className="flex-1">
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-muted rounded animate-pulse mt-1" />
          </div>
        </div>
      ))}
    </div>
  ),
}

/** ConditionalLoading export. */
export const ConditionalLoading: Story = {
  render: () => {
    const [loading, setLoading] = useState(true)

    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => setLoading(!loading)}>
          Toggle Loading
        </Button>
        <Spinner loading={loading}>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium">Content Loaded</h4>
            <p className="text-sm text-muted-foreground">This content is now visible.</p>
          </div>
        </Spinner>
      </div>
    )
  },
}
