import { cleanup, render, screen, within } from '@testing-library/react'
import * as React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import type { WheelPickerOption } from './wheel-picker'
import { WheelPicker, WheelPickerWrapper } from './wheel-picker'

afterEach(() => {
  cleanup()
})

describe('WheelPickerWrapper', () => {
  describe('Basic rendering', () => {
    it('renders with default props', () => {
      const { container } = render(
        <WheelPickerWrapper>
          <div>Content</div>
        </WheelPickerWrapper>,
      )
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders children content', () => {
      render(
        <WheelPickerWrapper>
          <div data-testid="test-content">Test Content</div>
        </WheelPickerWrapper>,
      )
      expect(screen.getByTestId('test-content')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('applies default styling classes', () => {
      const { container } = render(
        <WheelPickerWrapper>
          <div>Content</div>
        </WheelPickerWrapper>,
      )
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('w-56')
      expect(wrapper.className).toContain('rounded-lg')
      expect(wrapper.className).toContain('border')
      expect(wrapper.className).toContain('border-zinc-200')
      expect(wrapper.className).toContain('bg-white')
      expect(wrapper.className).toContain('px-1')
      expect(wrapper.className).toContain('shadow-xs')
    })

    it('applies dark mode styling classes', () => {
      const { container } = render(
        <WheelPickerWrapper>
          <div>Content</div>
        </WheelPickerWrapper>,
      )
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('dark:border-zinc-700/80')
      expect(wrapper.className).toContain('dark:bg-zinc-900')
    })

    it('applies custom className', () => {
      const { container } = render(
        <WheelPickerWrapper className="custom-wrapper-class">
          <div>Content</div>
        </WheelPickerWrapper>,
      )
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toHaveClass('custom-wrapper-class')
    })

    it('merges custom className with default classes', () => {
      const { container } = render(
        <WheelPickerWrapper className="custom-class">
          <div>Content</div>
        </WheelPickerWrapper>,
      )
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toHaveClass('custom-class')
      expect(wrapper.className).toContain('w-56')
      expect(wrapper.className).toContain('rounded-lg')
    })

    it('renders wrapper with data-rwp-wrapper attribute', () => {
      const { container } = render(
        <WheelPickerWrapper>
          <div>Content</div>
        </WheelPickerWrapper>,
      )
      const wrapper = container.querySelector('[data-rwp-wrapper="true"]')
      expect(wrapper).toBeInTheDocument()
    })
  })

  describe('Highlight wrapper styling', () => {
    it('applies highlight wrapper border radius classes', () => {
      const { container } = render(
        <WheelPickerWrapper>
          <div>Content</div>
        </WheelPickerWrapper>,
      )
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('*:data-rwp:first:*:data-rwp-highlight-wrapper:rounded-s-md')
      expect(wrapper.className).toContain('*:data-rwp:last:*:data-rwp-highlight-wrapper:rounded-e-md')
    })
  })

  describe('Multiple children', () => {
    it('renders multiple children', () => {
      render(
        <WheelPickerWrapper>
          <div data-testid="child1">Child 1</div>
          <div data-testid="child2">Child 2</div>
          <div data-testid="child3">Child 3</div>
        </WheelPickerWrapper>,
      )
      expect(screen.getByTestId('child1')).toBeInTheDocument()
      expect(screen.getByTestId('child2')).toBeInTheDocument()
      expect(screen.getByTestId('child3')).toBeInTheDocument()
    })
  })

  describe('Edge cases', () => {
    it('handles no children', () => {
      const { container } = render(<WheelPickerWrapper />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles undefined className', () => {
      const { container } = render(
        <WheelPickerWrapper className={undefined}>
          <div>Content</div>
        </WheelPickerWrapper>,
      )
      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles empty string className', () => {
      const { container } = render(
        <WheelPickerWrapper className="">
          <div>Content</div>
        </WheelPickerWrapper>,
      )
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('w-56')
    })
  })
})

describe('WheelPicker', () => {
  const defaultOptions: WheelPickerOption<string>[] = [
    { id: '1', value: 'Option 1' },
    { id: '2', value: 'Option 2' },
    { id: '3', value: 'Option 3' },
  ]

  describe('Basic rendering', () => {
    it('renders with required props', () => {
      const { container } = render(<WheelPicker options={defaultOptions} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders wheel picker structure with data attributes', () => {
      const { container } = render(<WheelPicker options={defaultOptions} />)
      const picker = container.querySelector('[data-rwp="true"]')
      expect(picker).toBeInTheDocument()
    })

    it('renders options list with correct number of options', () => {
      const { container } = render(<WheelPicker options={defaultOptions} />)
      const options = container.querySelectorAll('[data-rwp-option="true"]')
      expect(options.length).toBeGreaterThanOrEqual(3)
    })

    it('applies default option item styling class', () => {
      const { container } = render(<WheelPicker options={defaultOptions} />)
      const optionElements = container.querySelectorAll('[data-rwp-option="true"]')
      expect(optionElements[0]?.className).toContain('text-zinc-400')
    })

    it('applies disabled opacity styling class', () => {
      const { container } = render(<WheelPicker options={defaultOptions} />)
      const optionElements = container.querySelectorAll('[data-rwp-option="true"]')
      expect(optionElements[0]?.className).toContain('data-disabled:opacity-40')
    })

    it('applies dark mode option item styling class', () => {
      const { container } = render(<WheelPicker options={defaultOptions} />)
      const optionElements = container.querySelectorAll('[data-rwp-option="true"]')
      expect(optionElements[0]?.className).toContain('dark:text-zinc-500')
    })
  })

  describe('Highlight wrapper', () => {
    it('renders highlight wrapper element', () => {
      const { container } = render(<WheelPicker options={defaultOptions} />)
      const highlightWrapper = container.querySelector('[data-rwp-highlight-wrapper="true"]')
      expect(highlightWrapper).toBeInTheDocument()
    })

    it('applies highlight wrapper background styling', () => {
      const { container } = render(<WheelPicker options={defaultOptions} />)
      const highlightWrapper = container.querySelector('[data-rwp-highlight-wrapper="true"]')
      expect(highlightWrapper?.className).toContain('bg-zinc-100')
      expect(highlightWrapper?.className).toContain('text-zinc-950')
    })

    it('applies dark mode highlight wrapper styling', () => {
      const { container } = render(<WheelPicker options={defaultOptions} />)
      const highlightWrapper = container.querySelector('[data-rwp-highlight-wrapper="true"]')
      expect(highlightWrapper?.className).toContain('dark:bg-zinc-800')
      expect(highlightWrapper?.className).toContain('dark:text-zinc-50')
    })

    it('applies focus ring styling to highlight wrapper', () => {
      const { container } = render(<WheelPicker options={defaultOptions} />)
      const highlightWrapper = container.querySelector('[data-rwp-highlight-wrapper="true"]')
      expect(highlightWrapper?.className).toContain('data-rwp-focused:ring-2')
      expect(highlightWrapper?.className).toContain('data-rwp-focused:ring-zinc-300')
    })

    it('renders highlight items', () => {
      const { container } = render(<WheelPicker options={defaultOptions} />)
      const highlightItems = container.querySelectorAll('[data-rwp-highlight-item="true"]')
      expect(highlightItems.length).toBeGreaterThan(0)
    })

    it('applies disabled styling to highlight items', () => {
      const { container } = render(<WheelPicker options={defaultOptions} />)
      const highlightItems = container.querySelectorAll('[data-rwp-highlight-item="true"]')
      expect(highlightItems[0]?.className).toContain('data-disabled:opacity-40')
    })
  })

  describe('Custom classNames', () => {
    it('merges custom optionItem className', () => {
      const customClassNames = {
        optionItem: 'custom-option-class',
      }

      const { container } = render(<WheelPicker options={defaultOptions} classNames={customClassNames} />)
      const optionElements = container.querySelectorAll('[data-rwp-option="true"]')
      expect(optionElements[0]?.className).toContain('custom-option-class')
      expect(optionElements[0]?.className).toContain('text-zinc-400')
    })

    it('merges custom highlightWrapper className', () => {
      const customClassNames = {
        highlightWrapper: 'custom-highlight-class',
      }

      const { container } = render(<WheelPicker options={defaultOptions} classNames={customClassNames} />)
      const highlightWrapper = container.querySelector('[data-rwp-highlight-wrapper="true"]')
      expect(highlightWrapper?.className).toContain('custom-highlight-class')
      expect(highlightWrapper?.className).toContain('bg-zinc-100')
    })

    it('merges custom highlightItem className', () => {
      const customClassNames = {
        highlightItem: 'custom-item-class',
      }

      const { container } = render(<WheelPicker options={defaultOptions} classNames={customClassNames} />)
      const highlightItems = container.querySelectorAll('[data-rwp-highlight-item="true"]')
      expect(highlightItems[0]?.className).toContain('custom-item-class')
    })

    it('merges all custom classNames', () => {
      const customClassNames = {
        optionItem: 'custom-option',
        highlightWrapper: 'custom-wrapper',
        highlightItem: 'custom-item',
      }

      const { container } = render(<WheelPicker options={defaultOptions} classNames={customClassNames} />)
      const optionElements = container.querySelectorAll('[data-rwp-option="true"]')
      const highlightWrapper = container.querySelector('[data-rwp-highlight-wrapper="true"]')
      const highlightItems = container.querySelectorAll('[data-rwp-highlight-item="true"]')

      expect(optionElements[0]?.className).toContain('custom-option')
      expect(highlightWrapper?.className).toContain('custom-wrapper')
      expect(highlightItems[0]?.className).toContain('custom-item')
    })
  })

  describe('Disabled options', () => {
    it('renders picker with disabled options', () => {
      const optionsWithDisabled: WheelPickerOption<string>[] = [
        { id: '1', value: 'Option 1' },
        { id: '2', value: 'Option 2', disabled: true },
        { id: '3', value: 'Option 3' },
      ]

      const { container } = render(<WheelPicker options={optionsWithDisabled} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Options with different value types', () => {
    it('handles string values', () => {
      const stringOptions: WheelPickerOption<string>[] = [
        { id: '1', value: 'One' },
        { id: '2', value: 'Two' },
      ]

      const { container } = render(<WheelPicker options={stringOptions} />)
      const options = container.querySelectorAll('[data-rwp-option="true"]')
      expect(options.length).toBeGreaterThanOrEqual(2)
    })

    it('handles number values', () => {
      const numberOptions: WheelPickerOption<number>[] = [
        { id: '1', value: 1 },
        { id: '2', value: 2 },
        { id: '3', value: 3 },
      ]

      const { container } = render(<WheelPicker options={numberOptions} />)
      const options = container.querySelectorAll('[data-rwp-option="true"]')
      expect(options.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe('Edge cases', () => {
    it('handles empty options array', () => {
      const { container } = render(<WheelPicker options={[]} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles single option', () => {
      const singleOption: WheelPickerOption<string>[] = [{ id: '1', value: 'Only One' }]

      const { container } = render(<WheelPicker options={singleOption} />)
      const options = container.querySelectorAll('[data-rwp-option="true"]')
      expect(options.length).toBeGreaterThanOrEqual(1)
    })

    it('handles options with long text', () => {
      const longTextOptions: WheelPickerOption<string>[] = [
        { id: '1', value: 'This is a very long option text that should be handled properly' },
      ]

      const { container } = render(<WheelPicker options={longTextOptions} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles undefined classNames prop', () => {
      const { container } = render(<WheelPicker options={defaultOptions} classNames={undefined} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles partial classNames object', () => {
      const partialClassNames = {
        optionItem: 'custom-option',
      }

      const { container } = render(<WheelPicker options={defaultOptions} classNames={partialClassNames} />)
      const optionElements = container.querySelectorAll('[data-rwp-option="true"]')
      expect(optionElements[0]?.className).toContain('custom-option')
    })
  })

  describe('Integration with WheelPickerWrapper', () => {
    it('renders inside WheelPickerWrapper', () => {
      const { container } = render(
        <WheelPickerWrapper>
          <WheelPicker options={defaultOptions} />
        </WheelPickerWrapper>,
      )

      const wrapper = container.querySelector('.w-56')
      const picker = container.querySelector('[data-rwp="true"]')
      expect(wrapper).toBeInTheDocument()
      expect(picker).toBeInTheDocument()
    })

    it('renders multiple WheelPickers in same wrapper', () => {
      const options1 = [
        { id: '1', value: 'A1' },
        { id: '2', value: 'A2' },
      ]
      const options2 = [
        { id: '1', value: 'B1' },
        { id: '2', value: 'B2' },
      ]

      const { container } = render(
        <WheelPickerWrapper>
          <WheelPicker options={options1} />
          <WheelPicker options={options2} />
        </WheelPickerWrapper>,
      )

      const pickers = container.querySelectorAll('[data-rwp="true"]')
      expect(pickers.length).toBe(2)
    })
  })

  describe('Dynamic updates', () => {
    it('handles dynamic options updates', () => {
      const { rerender, container } = render(<WheelPicker options={defaultOptions} />)

      const initialOptions = container.querySelectorAll('[data-rwp-option="true"]')
      expect(initialOptions.length).toBeGreaterThanOrEqual(3)

      const newOptions: WheelPickerOption<string>[] = [
        { id: '4', value: 'New Option 1' },
        { id: '5', value: 'New Option 2' },
      ]

      rerender(<WheelPicker options={newOptions} />)

      const updatedOptions = container.querySelectorAll('[data-rwp-option="true"]')
      expect(updatedOptions.length).toBeGreaterThanOrEqual(2)
    })

    it('maintains structure across re-renders', () => {
      function StatefulComponent() {
        const [count, setCount] = React.useState(0)
        return (
          <div>
            <WheelPicker options={defaultOptions} />
            <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
          </div>
        )
      }

      const { container } = render(<StatefulComponent />)
      const picker = container.querySelector('[data-rwp="true"]')
      expect(picker).toBeInTheDocument()
    })
  })

  describe('Performance considerations', () => {
    it('handles large options list', () => {
      const largeOptionsList: WheelPickerOption<string>[] = Array.from({ length: 100 }, (_, i) => ({
        id: `${i}`,
        value: `Option ${i}`,
      }))

      const { container } = render(<WheelPicker options={largeOptionsList} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Type exports', () => {
    it('accepts WheelPickerOption type for options', () => {
      const options: WheelPickerOption<string>[] = [{ id: '1', value: 'Test' }]
      const { container } = render(<WheelPicker options={options} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('works with generic value types', () => {
      type CustomValue = { label: string; data: number }
      const options: WheelPickerOption<CustomValue>[] = [{ id: '1', value: { label: 'Test', data: 123 } }]
      const { container } = render(<WheelPicker options={options} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Wrapper styling validation', () => {
    it('verifies wrapper has correct border and background', () => {
      const { container } = render(
        <WheelPickerWrapper>
          <WheelPicker options={defaultOptions} />
        </WheelPickerWrapper>,
      )

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('border-zinc-200')
      expect(wrapper.className).toContain('bg-white')
    })

    it('verifies wrapper has correct rounded corners', () => {
      const { container } = render(
        <WheelPickerWrapper>
          <WheelPicker options={defaultOptions} />
        </WheelPickerWrapper>,
      )

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('rounded-lg')
    })
  })

  describe('Additional edge cases for robustness', () => {
    it('handles options with special characters in id', () => {
      const specialOptions: WheelPickerOption<string>[] = [
        { id: 'special-id-1', value: 'Special 1' },
        { id: 'special_id_2', value: 'Special 2' },
      ]

      const { container } = render(<WheelPicker options={specialOptions} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders picker with both disabled and enabled options', () => {
      const mixedOptions: WheelPickerOption<string>[] = [
        { id: '1', value: 'Enabled 1' },
        { id: '2', value: 'Disabled', disabled: true },
        { id: '3', value: 'Enabled 2' },
      ]

      const { container } = render(<WheelPicker options={mixedOptions} />)
      const options = container.querySelectorAll('[data-rwp-option="true"]')
      expect(options.length).toBeGreaterThanOrEqual(3)
    })

    it('maintains picker structure when options change', () => {
      const { rerender, container } = render(<WheelPicker options={defaultOptions} />)

      const initialPicker = container.querySelector('[data-rwp="true"]')
      expect(initialPicker).toBeInTheDocument()

      rerender(<WheelPicker options={[{ id: '1', value: 'New' }]} />)

      const updatedPicker = container.querySelector('[data-rwp="true"]')
      expect(updatedPicker).toBeInTheDocument()
    })

    it('renders correctly with minimal options', () => {
      const minimalOption: WheelPickerOption<string>[] = [{ id: 'a', value: 'A' }]

      const { container } = render(<WheelPicker options={minimalOption} />)
      const picker = container.querySelector('[data-rwp="true"]')
      expect(picker).toBeInTheDocument()
    })
  })

  describe('Regression and boundary tests', () => {
    it('handles rapid re-renders without errors', () => {
      const { rerender } = render(<WheelPicker options={defaultOptions} />)

      for (let i = 0; i < 10; i++) {
        rerender(<WheelPicker options={defaultOptions} />)
      }

      // Should complete without throwing errors
      expect(true).toBe(true)
    })

    it('handles switching between empty and populated options', () => {
      const { rerender, container } = render(<WheelPicker options={[]} />)

      rerender(<WheelPicker options={defaultOptions} />)
      const options = container.querySelectorAll('[data-rwp-option="true"]')
      expect(options.length).toBeGreaterThanOrEqual(3)

      rerender(<WheelPicker options={[]} />)
      const emptyOptions = container.querySelectorAll('[data-rwp-option="true"]')
      expect(emptyOptions.length).toBe(0)
    })

    it('maintains styling consistency across different option counts', () => {
      const twoOptions: WheelPickerOption<string>[] = [
        { id: '1', value: 'One' },
        { id: '2', value: 'Two' },
      ]

      const { container: container2, unmount: unmount2 } = render(<WheelPicker options={twoOptions} />)
      const highlightWrapper2 = container2.querySelector('[data-rwp-highlight-wrapper="true"]')
      expect(highlightWrapper2?.className).toContain('bg-zinc-100')
      unmount2()

      const tenOptions: WheelPickerOption<string>[] = Array.from({ length: 10 }, (_, i) => ({
        id: `${i}`,
        value: `Option ${i}`,
      }))

      const { container: container10 } = render(<WheelPicker options={tenOptions} />)
      const highlightWrapper10 = container10.querySelector('[data-rwp-highlight-wrapper="true"]')
      expect(highlightWrapper10?.className).toContain('bg-zinc-100')
    })

    it('handles options with duplicate values gracefully', () => {
      const duplicateOptions: WheelPickerOption<string>[] = [
        { id: '1', value: 'Same' },
        { id: '2', value: 'Same' },
        { id: '3', value: 'Same' },
      ]

      const { container } = render(<WheelPicker options={duplicateOptions} />)
      const options = container.querySelectorAll('[data-rwp-option="true"]')
      expect(options.length).toBeGreaterThanOrEqual(3)
    })

    it('handles options with empty string values', () => {
      const emptyStringOptions: WheelPickerOption<string>[] = [
        { id: '1', value: '' },
        { id: '2', value: 'Valid' },
      ]

      const { container } = render(<WheelPicker options={emptyStringOptions} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('verifies all classNames are properly applied in default configuration', () => {
      const { container } = render(<WheelPicker options={defaultOptions} />)

      const optionElements = container.querySelectorAll('[data-rwp-option="true"]')
      const highlightWrapper = container.querySelector('[data-rwp-highlight-wrapper="true"]')
      const highlightItems = container.querySelectorAll('[data-rwp-highlight-item="true"]')

      expect(optionElements[0]?.className).toContain('text-zinc-400')
      expect(optionElements[0]?.className).toContain('data-disabled:opacity-40')
      expect(optionElements[0]?.className).toContain('dark:text-zinc-500')

      expect(highlightWrapper?.className).toContain('bg-zinc-100')
      expect(highlightWrapper?.className).toContain('text-zinc-950')
      expect(highlightWrapper?.className).toContain('dark:bg-zinc-800')
      expect(highlightWrapper?.className).toContain('dark:text-zinc-50')
      expect(highlightWrapper?.className).toContain('data-rwp-focused:ring-2')

      expect(highlightItems[0]?.className).toContain('data-disabled:opacity-40')
    })

    it('handles nested WheelPickerWrappers', () => {
      const { container } = render(
        <WheelPickerWrapper>
          <WheelPickerWrapper>
            <WheelPicker options={defaultOptions} />
          </WheelPickerWrapper>
        </WheelPickerWrapper>,
      )

      const wrappers = container.querySelectorAll('[data-rwp-wrapper="true"]')
      expect(wrappers.length).toBe(2)
    })

    it('handles zero as a valid option value', () => {
      const zeroValueOptions: WheelPickerOption<number>[] = [
        { id: '1', value: 0 },
        { id: '2', value: 1 },
      ]

      const { container } = render(<WheelPicker options={zeroValueOptions} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles negative numbers as option values', () => {
      const negativeOptions: WheelPickerOption<number>[] = [
        { id: '1', value: -10 },
        { id: '2', value: -5 },
        { id: '3', value: 0 },
        { id: '4', value: 5 },
      ]

      const { container } = render(<WheelPicker options={negativeOptions} />)
      const options = container.querySelectorAll('[data-rwp-option="true"]')
      expect(options.length).toBeGreaterThanOrEqual(4)
    })
  })
})
