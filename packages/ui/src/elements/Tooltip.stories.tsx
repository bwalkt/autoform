import type { Meta, StoryObj } from '@storybook/react-vite'
import { Copy, HelpCircle, Info, Settings, Trash2 } from 'lucide-react'
import { Button, IconButton, SimpleTooltip, Tooltip } from '@/elements'
import { Label } from '@/form'

const meta: Meta = {
  title: 'Elements/Tooltip',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <Tooltip.Provider>
        <Story />
      </Tooltip.Provider>
    ),
  ],
}

export default meta

/** Default export. */
export const Default: StoryObj = {
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button variant="outline">Hover me</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>This is a tooltip</Tooltip.Content>
    </Tooltip.Root>
  ),
}

/** Simple export. */
export const Simple: StoryObj = {
  render: () => (
    <SimpleTooltip content="This is a simple tooltip">
      <Button variant="outline">Hover me</Button>
    </SimpleTooltip>
  ),
}

/** Positions export. */
export const Positions: StoryObj = {
  render: () => (
    <div className="flex gap-4">
      {(['top', 'right', 'bottom', 'left'] as const).map(side => (
        <Tooltip.Root key={side}>
          <Tooltip.Trigger>
            <Button variant="outline" className="capitalize">
              {side}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content side={side}>Tooltip on {side}</Tooltip.Content>
        </Tooltip.Root>
      ))}
    </div>
  ),
}

/** MaxWidths export. */
export const MaxWidths: StoryObj = {
  render: () => (
    <div className="flex gap-4">
      {(['xs', 'sm', 'md'] as const).map(maxWidth => (
        <Tooltip.Root key={maxWidth}>
          <Tooltip.Trigger>
            <Button variant="outline">{maxWidth.toUpperCase()}</Button>
          </Tooltip.Trigger>
          <Tooltip.Content maxWidth={maxWidth}>
            This is a longer tooltip text that demonstrates the different max-width options available.
          </Tooltip.Content>
        </Tooltip.Root>
      ))}
    </div>
  ),
}

/** WithIcons export. */
export const WithIcons: StoryObj = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button variant="ghost" size="1" className="p-2" aria-label="More information">
            <Info className="h-4 w-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>More information</Tooltip.Content>
      </Tooltip.Root>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button variant="ghost" size="1" className="p-2" aria-label="Help">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Help</Tooltip.Content>
      </Tooltip.Root>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button variant="ghost" size="1" className="p-2" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Settings</Tooltip.Content>
      </Tooltip.Root>
    </div>
  ),
}

/** IconButtonsToolbar export. */
export const IconButtonsToolbar: StoryObj = {
  render: () => (
    <div className="flex items-center gap-1 p-2 border rounded-lg bg-muted/30">
      <SimpleTooltip content="Copy">
        <IconButton variant="ghost" size="2" aria-label="Copy">
          <Copy className="h-4 w-4" />
        </IconButton>
      </SimpleTooltip>
      <SimpleTooltip content="Delete">
        <IconButton variant="ghost" size="2" aria-label="Delete">
          <Trash2 className="h-4 w-4" />
        </IconButton>
      </SimpleTooltip>
      <SimpleTooltip content="Settings">
        <IconButton variant="ghost" size="2" aria-label="Settings">
          <Settings className="h-4 w-4" />
        </IconButton>
      </SimpleTooltip>
    </div>
  ),
}

/** RichContent export. */
export const RichContent: StoryObj = {
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button variant="outline">Rich tooltip</Button>
      </Tooltip.Trigger>
      <Tooltip.Content maxWidth="md" className="p-3">
        <div className="space-y-1">
          <p className="font-medium">Keyboard Shortcut</p>
          <p className="text-primary-foreground/70">
            Press <kbd className="px-1 py-0.5 bg-primary-foreground/20 rounded text-[10px]">Ctrl</kbd> +{' '}
            <kbd className="px-1 py-0.5 bg-primary-foreground/20 rounded text-[10px]">S</kbd> to save
          </p>
        </div>
      </Tooltip.Content>
    </Tooltip.Root>
  ),
}

/** FormFieldHelp export. */
export const FormFieldHelp: StoryObj = {
  render: () => (
    <div className="w-72 space-y-2">
      <div className="flex items-center gap-2">
        <Label>API Key</Label>
        <Tooltip.Root>
          <Tooltip.Trigger>
            <button
              type="button"
              aria-label="Help"
              className="inline-flex items-center justify-center text-muted-foreground"
            >
              <HelpCircle className="h-3.5 w-3.5" />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content side="right" maxWidth="md">
            Your API key can be found in the dashboard under Settings &gt; API Keys.
          </Tooltip.Content>
        </Tooltip.Root>
      </div>
      <input type="text" placeholder="Enter your API key" className="w-full px-3 py-2 text-sm border rounded-md" />
    </div>
  ),
}
