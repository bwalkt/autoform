import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { WheelPicker, WheelPickerWrapper } from './wheel-picker'

// Mock the external library
vi.mock('@ncdai/react-wheel-picker', () => ({
  WheelPickerWrapper: ({ children, className, ...props }: React.ComponentProps<'div'>) => (
    <div data-testid="wheel-picker-wrapper" className={className} {...props}>
      {children}
    </div>
  ),
  WheelPicker: ({
    classNames,
    options,
    value,
    onChange,
    ...props
  }: {
    classNames?: { optionItem?: string; highlightWrapper?: string; highlightItem?: string }
    options?: Array<{ value: string | number; label: string }>
    value?: string | number
    onChange?: (value: string | number) => void
    [key: string]: unknown
  }) => (
    <div data-testid="wheel-picker" {...props}>
      <div data-testid="option-item-class" className={classNames?.optionItem}>
        Options
      </div>
      <div data-testid="highlight-wrapper-class" className={classNames?.highlightWrapper}>
        Highlight
      </div>
      <div data-testid="highlight-item-class" className={classNames?.highlightItem}>
        Item
      </div>
      {options?.map(opt => (
        <button
          key={opt.value}
          data-testid={`option-${opt.value}`}
          onClick={() => onChange?.(opt.value)}
          aria-selected={value === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  ),
}))

afterEach(() => {
  cleanup()
})

describe('WheelPickerWrapper', () => {
  describe('Rendering', () => {
    it('renders wrapper component', () => {
      render(<WheelPickerWrapper>Content</WheelPickerWrapper>)
      expect(screen.getByTestId('wheel-picker-wrapper')).toBeInTheDocument()
    })

    it('renders children', () => {
      render(
        <WheelPickerWrapper>
          <div>Child content</div>
        </WheelPickerWrapper>,
      )
      expect(screen.getByText('Child content')).toBeInTheDocument()
    })

    it('renders multiple children', () => {
      render(
        <WheelPickerWrapper>
          <div>First child</div>
          <div>Second child</div>
        </WheelPickerWrapper>,
      )
      expect(screen.getByText('First child')).toBeInTheDocument()
      expect(screen.getByText('Second child')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('applies default styling classes', () => {
      render(<WheelPickerWrapper>Content</WheelPickerWrapper>)
      const wrapper = screen.getByTestId('wheel-picker-wrapper')

      expect(wrapper.className).toContain('w-56')
      expect(wrapper.className).toContain('rounded-lg')
      expect(wrapper.className).toContain('border')
      expect(wrapper.className).toContain('border-zinc-200')
      expect(wrapper.className).toContain('bg-white')
      expect(wrapper.className).toContain('px-1')
      expect(wrapper.className).toContain('shadow-xs')
    })

    it('applies dark mode classes', () => {
      render(<WheelPickerWrapper>Content</WheelPickerWrapper>)
      const wrapper = screen.getByTestId('wheel-picker-wrapper')

      expect(wrapper.className).toContain('dark:border-zinc-700/80')
      expect(wrapper.className).toContain('dark:bg-zinc-900')
    })

    it('applies data-rwp specific classes', () => {
      render(<WheelPickerWrapper>Content</WheelPickerWrapper>)
      const wrapper = screen.getByTestId('wheel-picker-wrapper')

      expect(wrapper.className).toContain('*:data-rwp:first:*:data-rwp-highlight-wrapper:rounded-s-md')
      expect(wrapper.className).toContain('*:data-rwp:last:*:data-rwp-highlight-wrapper:rounded-e-md')
    })

    it('applies custom className', () => {
      render(<WheelPickerWrapper className="custom-class">Content</WheelPickerWrapper>)
      const wrapper = screen.getByTestId('wheel-picker-wrapper')
      expect(wrapper.className).toContain('custom-class')
    })

    it('merges custom className with default classes', () => {
      render(<WheelPickerWrapper className="custom-override">Content</WheelPickerWrapper>)
      const wrapper = screen.getByTestId('wheel-picker-wrapper')

      expect(wrapper.className).toContain('custom-override')
      expect(wrapper.className).toContain('w-56')
      expect(wrapper.className).toContain('rounded-lg')
    })
  })

  describe('Props forwarding', () => {
    it('forwards data attributes', () => {
      render(<WheelPickerWrapper data-testid="custom-wrapper">Content</WheelPickerWrapper>)
      expect(screen.getByTestId('custom-wrapper')).toBeInTheDocument()
    })

    it('forwards aria attributes', () => {
      render(<WheelPickerWrapper aria-label="Picker wrapper">Content</WheelPickerWrapper>)
      const wrapper = screen.getByTestId('wheel-picker-wrapper')
      expect(wrapper).toHaveAttribute('aria-label', 'Picker wrapper')
    })

    it('forwards role attribute', () => {
      render(<WheelPickerWrapper role="group">Content</WheelPickerWrapper>)
      const wrapper = screen.getByTestId('wheel-picker-wrapper')
      expect(wrapper).toHaveAttribute('role', 'group')
    })

    it('forwards id attribute', () => {
      render(<WheelPickerWrapper id="unique-id">Content</WheelPickerWrapper>)
      const wrapper = screen.getByTestId('wheel-picker-wrapper')
      expect(wrapper).toHaveAttribute('id', 'unique-id')
    })
  })
})

describe('WheelPicker', () => {
  const defaultOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ]

  describe('Rendering', () => {
    it('renders picker component', () => {
      render(<WheelPicker options={defaultOptions} />)
      expect(screen.getByTestId('wheel-picker')).toBeInTheDocument()
    })

    it('renders with options', () => {
      render(<WheelPicker options={defaultOptions} />)
      expect(screen.getByTestId('option-1')).toBeInTheDocument()
      expect(screen.getByTestId('option-2')).toBeInTheDocument()
      expect(screen.getByTestId('option-3')).toBeInTheDocument()
    })

    it('renders with numeric options', () => {
      const numericOptions = [
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
      ]
      render(<WheelPicker options={numericOptions} />)
      expect(screen.getByTestId('option-1')).toBeInTheDocument()
      expect(screen.getByTestId('option-2')).toBeInTheDocument()
    })

    it('renders without options', () => {
      render(<WheelPicker />)
      expect(screen.getByTestId('wheel-picker')).toBeInTheDocument()
    })
  })

  describe('classNames styling', () => {
    it('applies optionItem default classes', () => {
      render(<WheelPicker options={defaultOptions} />)
      const optionItem = screen.getByTestId('option-item-class')

      expect(optionItem.className).toContain('text-zinc-400')
      expect(optionItem.className).toContain('data-disabled:opacity-40')
      expect(optionItem.className).toContain('dark:text-zinc-500')
    })

    it('applies highlightWrapper default classes', () => {
      render(<WheelPicker options={defaultOptions} />)
      const highlightWrapper = screen.getByTestId('highlight-wrapper-class')

      expect(highlightWrapper.className).toContain('bg-zinc-100')
      expect(highlightWrapper.className).toContain('text-zinc-950')
      expect(highlightWrapper.className).toContain('dark:bg-zinc-800')
      expect(highlightWrapper.className).toContain('dark:text-zinc-50')
    })

    it('applies highlightWrapper focus ring classes', () => {
      render(<WheelPicker options={defaultOptions} />)
      const highlightWrapper = screen.getByTestId('highlight-wrapper-class')

      expect(highlightWrapper.className).toContain('data-rwp-focused:ring-2')
      expect(highlightWrapper.className).toContain('data-rwp-focused:ring-zinc-300')
      expect(highlightWrapper.className).toContain('data-rwp-focused:ring-inset')
      expect(highlightWrapper.className).toContain('dark:data-rwp-focused:ring-zinc-600')
    })

    it('applies highlightItem default classes', () => {
      render(<WheelPicker options={defaultOptions} />)
      const highlightItem = screen.getByTestId('highlight-item-class')

      expect(highlightItem.className).toContain('data-disabled:opacity-40')
    })

    it('merges custom optionItem className', () => {
      render(<WheelPicker options={defaultOptions} classNames={{ optionItem: 'custom-option' }} />)
      const optionItem = screen.getByTestId('option-item-class')

      expect(optionItem.className).toContain('custom-option')
      expect(optionItem.className).toContain('text-zinc-400')
    })

    it('merges custom highlightWrapper className', () => {
      render(<WheelPicker options={defaultOptions} classNames={{ highlightWrapper: 'custom-highlight' }} />)
      const highlightWrapper = screen.getByTestId('highlight-wrapper-class')

      expect(highlightWrapper.className).toContain('custom-highlight')
      expect(highlightWrapper.className).toContain('bg-zinc-100')
    })

    it('merges custom highlightItem className', () => {
      render(<WheelPicker options={defaultOptions} classNames={{ highlightItem: 'custom-item' }} />)
      const highlightItem = screen.getByTestId('highlight-item-class')

      expect(highlightItem.className).toContain('custom-item')
      expect(highlightItem.className).toContain('data-disabled:opacity-40')
    })

    it('handles all custom classNames together', () => {
      const customClassNames = {
        optionItem: 'custom-option-class',
        highlightWrapper: 'custom-wrapper-class',
        highlightItem: 'custom-item-class',
      }

      render(<WheelPicker options={defaultOptions} classNames={customClassNames} />)

      expect(screen.getByTestId('option-item-class').className).toContain('custom-option-class')
      expect(screen.getByTestId('highlight-wrapper-class').className).toContain('custom-wrapper-class')
      expect(screen.getByTestId('highlight-item-class').className).toContain('custom-item-class')
    })
  })

  describe('Value and onChange', () => {
    it('handles value selection', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<WheelPicker options={defaultOptions} value="1" onChange={handleChange} />)

      const option2 = screen.getByTestId('option-2')
      await user.click(option2)

      expect(handleChange).toHaveBeenCalledWith('2')
    })

    it('highlights selected value', () => {
      render(<WheelPicker options={defaultOptions} value="2" />)
      const option2 = screen.getByTestId('option-2')
      expect(option2).toHaveAttribute('aria-selected', 'true')
    })

    it('handles onChange with numeric values', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      const numericOptions = [
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
      ]

      render(<WheelPicker options={numericOptions} onChange={handleChange} />)

      const option1 = screen.getByTestId('option-1')
      await user.click(option1)

      expect(handleChange).toHaveBeenCalledWith(1)
    })

    it('works without onChange handler', async () => {
      const user = userEvent.setup()

      render(<WheelPicker options={defaultOptions} />)

      const option1 = screen.getByTestId('option-1')
      await user.click(option1)

      expect(option1).toBeInTheDocument()
    })
  })

  describe('Props forwarding', () => {
    it('forwards data attributes', () => {
      render(<WheelPicker data-custom="value" options={defaultOptions} />)
      const picker = screen.getByTestId('wheel-picker')
      expect(picker).toHaveAttribute('data-custom', 'value')
    })

    it('forwards aria-label', () => {
      render(<WheelPicker aria-label="Select option" options={defaultOptions} />)
      const picker = screen.getByTestId('wheel-picker')
      expect(picker).toHaveAttribute('aria-label', 'Select option')
    })

    it('forwards id', () => {
      render(<WheelPicker id="picker-id" options={defaultOptions} />)
      const picker = screen.getByTestId('wheel-picker')
      expect(picker).toHaveAttribute('id', 'picker-id')
    })

    it('forwards disabled state', () => {
      render(<WheelPicker disabled options={defaultOptions} />)
      const picker = screen.getByTestId('wheel-picker')
      expect(picker).toHaveAttribute('disabled')
    })
  })

  describe('Edge cases', () => {
    it('handles empty options array', () => {
      render(<WheelPicker options={[]} />)
      expect(screen.getByTestId('wheel-picker')).toBeInTheDocument()
    })

    it('handles undefined value', () => {
      render(<WheelPicker options={defaultOptions} value={undefined} />)
      expect(screen.getByTestId('wheel-picker')).toBeInTheDocument()
    })

    it('handles value not in options', () => {
      render(<WheelPicker options={defaultOptions} value="999" />)
      expect(screen.getByTestId('wheel-picker')).toBeInTheDocument()
    })

    it('handles options with special characters', () => {
      const specialOptions = [
        { value: 'opt-1', label: 'Option #1' },
        { value: 'opt@2', label: 'Option @2' },
      ]
      render(<WheelPicker options={specialOptions} />)
      expect(screen.getByText('Option #1')).toBeInTheDocument()
      expect(screen.getByText('Option @2')).toBeInTheDocument()
    })

    it('handles very long option labels', () => {
      const longOptions = [{ value: '1', label: 'This is a very long option label that might wrap or overflow' }]
      render(<WheelPicker options={longOptions} />)
      expect(screen.getByText('This is a very long option label that might wrap or overflow')).toBeInTheDocument()
    })

    it('handles rapid value changes', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<WheelPicker options={defaultOptions} onChange={handleChange} />)

      await user.click(screen.getByTestId('option-1'))
      await user.click(screen.getByTestId('option-2'))
      await user.click(screen.getByTestId('option-3'))

      expect(handleChange).toHaveBeenCalledTimes(3)
      expect(handleChange).toHaveBeenNthCalledWith(1, '1')
      expect(handleChange).toHaveBeenNthCalledWith(2, '2')
      expect(handleChange).toHaveBeenNthCalledWith(3, '3')
    })

    it('handles mixed string and number values', () => {
      const mixedOptions = [
        { value: 1, label: 'One' },
        { value: '2', label: 'Two' },
        { value: 3, label: 'Three' },
      ]
      render(<WheelPicker options={mixedOptions} />)
      expect(screen.getByTestId('option-1')).toBeInTheDocument()
      expect(screen.getByTestId('option-2')).toBeInTheDocument()
      expect(screen.getByTestId('option-3')).toBeInTheDocument()
    })
  })

  describe('Integration tests', () => {
    it('works within WheelPickerWrapper', () => {
      render(
        <WheelPickerWrapper>
          <WheelPicker options={defaultOptions} />
        </WheelPickerWrapper>,
      )

      expect(screen.getByTestId('wheel-picker-wrapper')).toBeInTheDocument()
      expect(screen.getByTestId('wheel-picker')).toBeInTheDocument()
    })

    it('works with multiple pickers in one wrapper', () => {
      render(
        <WheelPickerWrapper>
          <WheelPicker options={defaultOptions} />
          <WheelPicker options={[{ value: 'a', label: 'A' }]} />
        </WheelPickerWrapper>,
      )

      const pickers = screen.getAllByTestId('wheel-picker')
      expect(pickers).toHaveLength(2)
    })

    it('handles controlled value updates', async () => {
      function ControlledPicker() {
        const [value, setValue] = React.useState('1')

        return (
          <div>
            <WheelPicker options={defaultOptions} value={value} onChange={v => setValue(String(v))} />
            <button onClick={() => setValue('3')}>Set to 3</button>
            <p data-testid="current-value">{value}</p>
          </div>
        )
      }

      const user = userEvent.setup()
      render(<ControlledPicker />)

      expect(screen.getByTestId('current-value')).toHaveTextContent('1')

      await user.click(screen.getByText('Set to 3'))

      expect(screen.getByTestId('option-3')).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('Type safety tests', () => {
    it('accepts string value type', () => {
      const stringOptions = [{ value: 'a', label: 'A' }]
      render(<WheelPicker<string> options={stringOptions} value="a" />)
      expect(screen.getByTestId('wheel-picker')).toBeInTheDocument()
    })

    it('accepts number value type', () => {
      const numberOptions = [{ value: 1, label: 'One' }]
      render(<WheelPicker<number> options={numberOptions} value={1} />)
      expect(screen.getByTestId('wheel-picker')).toBeInTheDocument()
    })
  })

  describe('Additional comprehensive tests', () => {
    it('maintains selection state across re-renders', () => {
      const { rerender } = render(<WheelPicker options={defaultOptions} value="2" />)

      expect(screen.getByTestId('option-2')).toHaveAttribute('aria-selected', 'true')

      rerender(<WheelPicker options={defaultOptions} value="2" />)

      expect(screen.getByTestId('option-2')).toHaveAttribute('aria-selected', 'true')
    })

    it('updates when options array changes', () => {
      const { rerender } = render(<WheelPicker options={defaultOptions} />)

      expect(screen.getByTestId('option-1')).toBeInTheDocument()

      const newOptions = [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
      ]
      rerender(<WheelPicker options={newOptions} />)

      expect(screen.getByText('Option A')).toBeInTheDocument()
    })

    it('handles zero as a value', () => {
      const zeroOptions = [
        { value: 0, label: 'Zero' },
        { value: 1, label: 'One' },
      ]
      render(<WheelPicker options={zeroOptions} value={0} />)
      expect(screen.getByTestId('option-0')).toHaveAttribute('aria-selected', 'true')
    })

    it('handles empty string as a value', () => {
      const emptyStringOptions = [
        { value: '', label: 'Empty' },
        { value: 'a', label: 'A' },
      ]
      render(<WheelPicker options={emptyStringOptions} value="" />)
      expect(screen.getByTestId('option-')).toHaveAttribute('aria-selected', 'true')
    })

    it('preserves classNames object reference stability', () => {
      const classNames = {
        optionItem: 'stable-class',
        highlightWrapper: 'stable-wrapper',
        highlightItem: 'stable-item',
      }

      const { rerender } = render(<WheelPicker options={defaultOptions} classNames={classNames} />)

      expect(screen.getByTestId('option-item-class').className).toContain('stable-class')

      rerender(<WheelPicker options={defaultOptions} classNames={classNames} />)

      expect(screen.getByTestId('option-item-class').className).toContain('stable-class')
    })
  })
})