import type { Meta, StoryObj } from '@storybook/react-vite'

// Simple Button component for testing
interface ButtonProps {
  primary?: boolean
  size?: 'small' | 'medium' | 'large'
  label: string
  onClick?: () => void
}

const Button = ({ primary = false, size = 'medium', label, ...props }: ButtonProps) => {
  const mode = primary ? 'bg-blue-600 text-white border-blue-600' : 'bg-transparent text-gray-700 border-gray-300'

  const sizeClass = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  }[size]

  return (
    <button type="button" className={`border-2 rounded cursor-pointer ${mode} ${sizeClass}`} {...props}>
      {label}
    </button>
  )
}

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
}
