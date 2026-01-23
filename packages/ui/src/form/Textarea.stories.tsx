import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from '@/form'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Form/Textarea',
  component: Textarea,
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
      options: [
        'classic',
        'solid',
        'soft',
        'surface',
        'outline',
        'ghost',
        'floating-filled',
        'floating-standard',
        'floating-outlined',
      ],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: args => (
    <div className="w-80">
      <Textarea {...args} placeholder="Enter your message..." />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      {(['1', '2', '3', '4'] as const).map(size => (
        <div key={size}>
          <p className="text-sm text-muted-foreground mb-2">Size {size}</p>
          <Textarea size={size} placeholder={`Size ${size} textarea`} />
        </div>
      ))}
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      {(['classic', 'solid', 'soft', 'surface', 'outline', 'ghost'] as const).map(variant => (
        <div key={variant}>
          <p className="text-sm text-muted-foreground mb-2 capitalize">{variant}</p>
          <Textarea variant={variant} placeholder={`${variant} variant`} />
        </div>
      ))}
    </div>
  ),
}

export const Resize: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      {(['none', 'vertical', 'horizontal', 'both'] as const).map(resize => (
        <div key={resize}>
          <p className="text-sm text-muted-foreground mb-2 capitalize">Resize: {resize}</p>
          <Textarea resize={resize} placeholder={`Resize ${resize}`} />
        </div>
      ))}
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Textarea error placeholder="Enter description..." />
      <p className="text-sm text-destructive">Description is required</p>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Textarea disabled placeholder="This textarea is disabled" />
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="description">Description</Label>
      <Textarea id="description" placeholder="Enter a detailed description..." rows={4} />
      <p className="text-xs text-muted-foreground">Provide a detailed description of your issue.</p>
    </div>
  ),
}

export const CharacterCount: Story = {
  render: () => {
    const maxLength = 200
    return (
      <div className="w-80 space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" placeholder="Tell us about yourself..." maxLength={maxLength} rows={3} />
        <div className="flex justify-end">
          <span className="text-xs text-muted-foreground">0 / {maxLength}</span>
        </div>
      </div>
    )
  },
}

export const ContactForm: Story = {
  render: () => (
    <div className="w-96 space-y-4 p-4 border rounded-lg">
      <h3 className="font-semibold">Contact Us</h3>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <input
          id="subject"
          type="text"
          placeholder="What's this about?"
          className="w-full px-3 py-2 text-sm border rounded-md"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="How can we help you?" rows={5} resize="none" />
      </div>
      <button className="w-full py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md">
        Send Message
      </button>
    </div>
  ),
}

export const CodeInput: Story = {
  render: () => (
    <div className="w-96 space-y-2">
      <Label htmlFor="json-config">JSON Configuration</Label>
      <Textarea id="json-config" className="font-mono" placeholder='{"key": "value"}' rows={8} resize="vertical" />
    </div>
  ),
}

// ============================================================================
// Floating Variants
// ============================================================================

export const FloatingFilled: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Textarea variant="floating-filled" label="Message" />
      <Textarea variant="floating-filled" label="Description" rows={4} />
      <Textarea variant="floating-filled" placeholder="Uses placeholder as label" />
    </div>
  ),
}

export const FloatingStandard: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Textarea variant="floating-standard" label="Message" />
      <Textarea variant="floating-standard" label="Description" rows={4} />
      <Textarea variant="floating-standard" placeholder="Uses placeholder as label" />
    </div>
  ),
}

export const FloatingOutlined: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Textarea variant="floating-outlined" label="Message" />
      <Textarea variant="floating-outlined" label="Description" rows={4} />
      <Textarea variant="floating-outlined" placeholder="Uses placeholder as label" />
    </div>
  ),
}

export const FloatingVariantsComparison: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Floating Filled</p>
        <Textarea variant="floating-filled" label="Your message" rows={3} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Floating Standard</p>
        <Textarea variant="floating-standard" label="Your message" rows={3} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Floating Outlined</p>
        <Textarea variant="floating-outlined" label="Your message" rows={3} />
      </div>
    </div>
  ),
}

export const FloatingWithError: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <Textarea variant="floating-filled" label="Description" error />
        <p className="text-sm text-red-500 mt-1">Description is required</p>
      </div>
      <div>
        <Textarea variant="floating-outlined" label="Bio" error />
        <p className="text-sm text-red-500 mt-1">Bio must be at least 50 characters</p>
      </div>
    </div>
  ),
}

export const FloatingDisabled: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Textarea variant="floating-filled" label="Disabled filled" disabled />
      <Textarea variant="floating-standard" label="Disabled standard" disabled />
      <Textarea variant="floating-outlined" label="Disabled outlined" disabled />
    </div>
  ),
}

export const FloatingSizes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      {(['1', '2', '3', '4'] as const).map(size => (
        <div key={size}>
          <p className="text-sm text-muted-foreground mb-2">Size {size}</p>
          <Textarea variant="floating-outlined" size={size} label={`Size ${size} textarea`} />
        </div>
      ))}
    </div>
  ),
}

export const FloatingFeedbackForm: Story = {
  render: () => (
    <div className="w-96 space-y-4 p-6 border rounded-lg">
      <h3 className="text-lg font-semibold">Send Feedback</h3>
      <Textarea variant="floating-outlined" label="Subject" rows={1} />
      <Textarea variant="floating-outlined" label="Your feedback" rows={5} />
      <button className="w-full py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md">
        Submit Feedback
      </button>
    </div>
  ),
}
