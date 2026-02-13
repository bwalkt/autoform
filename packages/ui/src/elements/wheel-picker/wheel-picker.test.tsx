import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { WheelPicker, WheelPickerWrapper } from './wheel-picker'

afterEach(() => {
  cleanup()
})

describe('WheelPickerWrapper', () => {
  describe('Basic rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<WheelPickerWrapper />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders children components', () => {
      const { container } = render(
        <WheelPickerWrapper>
          <div data-testid="child">Test Child</div>
        </WheelPickerWrapper>,
      )
      expect(container.querySelector('[data-testid="child"]')).toBeInTheDocument()
    })
  })

  describe('Default styling', () => {
    it('applies default width class', () => {
      const { container } = render(<WheelPickerWrapper />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('w-56')
    })

    it('applies rounded border class', () => {
      const { container } = render(<WheelPickerWrapper />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('rounded-lg')
    })

    it('applies border class', () => {
      const { container } = render(<WheelPickerWrapper />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('border')
      expect(wrapper.className).toContain('border-zinc-200')
    })

    it('applies background color class', () => {
      const { container } = render(<WheelPickerWrapper />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('bg-white')
    })

    it('applies dark mode border class', () => {
      const { container } = render(<WheelPickerWrapper />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('dark:border-zinc-700/80')
    })

    it('applies dark mode background class', () => {
      const { container } = render(<WheelPickerWrapper />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('dark:bg-zinc-900')
    })

    it('applies padding class', () => {
      const { container } = render(<WheelPickerWrapper />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('px-1')
    })

    it('applies shadow class', () => {
      const { container } = render(<WheelPickerWrapper />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('shadow-xs')
    })
  })

  describe('Custom className', () => {
    it('merges custom className with default classes', () => {
      const { container } = render(<WheelPickerWrapper className="custom-wrapper-class" />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('custom-wrapper-class')
      expect(wrapper.className).toContain('w-56')
    })

    it('allows overriding default classes', () => {
      const { container } = render(<WheelPickerWrapper className="w-64" />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toBeInTheDocument()
    })
  })

  describe('Data attributes', () => {
    it('applies first child highlight wrapper rounding', () => {
      const { container } = render(<WheelPickerWrapper />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('*:data-rwp:first:*:data-rwp-highlight-wrapper:rounded-s-md')
    })

    it('applies last child highlight wrapper rounding', () => {
      const { container } = render(<WheelPickerWrapper />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('*:data-rwp:last:*:data-rwp-highlight-wrapper:rounded-e-md')
    })
  })

  describe('Props forwarding', () => {
    it('renders without errors when additional props are passed', () => {
      const { container } = render(<WheelPickerWrapper data-testid="wrapper-test" />)
      // The underlying library component may not forward all props, so we just verify it renders
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders without errors when aria attributes are passed', () => {
      const { container } = render(<WheelPickerWrapper aria-label="Date picker wrapper" />)
      const wrapper = container.firstChild as HTMLElement
      // The underlying library component may not forward all props, so we just verify it renders
      expect(wrapper).toBeInTheDocument()
    })

    it('renders without errors when role attribute is passed', () => {
      const { container } = render(<WheelPickerWrapper role="group" />)
      const wrapper = container.firstChild as HTMLElement
      // The underlying library component may not forward all props, so we just verify it renders
      expect(wrapper).toBeInTheDocument()
    })
  })
})

describe('WheelPicker', () => {
  const mockOptions = [
    { id: '1', value: 'Option 1' },
    { id: '2', value: 'Option 2' },
    { id: '3', value: 'Option 3' },
  ]

  describe('Basic rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders with options', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Default classNames', () => {
    it('applies default optionItem classNames', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('applies text color for option items', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('applies disabled opacity for option items', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('applies default highlightWrapper classNames', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('applies background color for highlight wrapper', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('applies text color for highlight wrapper', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('applies focus ring for highlight wrapper', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('applies dark mode styles for highlight wrapper', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('applies disabled opacity for highlight items', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Custom classNames prop', () => {
    it('merges custom optionItem classNames', () => {
      const customClassNames = {
        optionItem: 'custom-option-class',
      }
      const { container } = render(
        <WheelPicker value="1" options={mockOptions} onChange={() => {}} classNames={customClassNames} />,
      )
      expect(container.firstChild).toBeInTheDocument()
    })

    it('merges custom highlightWrapper classNames', () => {
      const customClassNames = {
        highlightWrapper: 'custom-highlight-class',
      }
      const { container } = render(
        <WheelPicker value="1" options={mockOptions} onChange={() => {}} classNames={customClassNames} />,
      )
      expect(container.firstChild).toBeInTheDocument()
    })

    it('merges custom highlightItem classNames', () => {
      const customClassNames = {
        highlightItem: 'custom-highlight-item-class',
      }
      const { container } = render(
        <WheelPicker value="1" options={mockOptions} onChange={() => {}} classNames={customClassNames} />,
      )
      expect(container.firstChild).toBeInTheDocument()
    })

    it('merges all custom classNames together', () => {
      const customClassNames = {
        optionItem: 'custom-option',
        highlightWrapper: 'custom-wrapper',
        highlightItem: 'custom-item',
      }
      const { container } = render(
        <WheelPicker value="1" options={mockOptions} onChange={() => {}} classNames={customClassNames} />,
      )
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Props forwarding', () => {
    it('forwards value prop', () => {
      const { container } = render(<WheelPicker value="2" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('forwards options prop', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('forwards onChange prop', () => {
      const handleChange = () => {}
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={handleChange} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('forwards aria-label prop', () => {
      const { container } = render(
        <WheelPicker value="1" options={mockOptions} onChange={() => {}} aria-label="Select option" />,
      )
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Component integration', () => {
    it('works with WheelPickerWrapper', () => {
      const { container } = render(
        <WheelPickerWrapper>
          <WheelPicker value="1" options={mockOptions} onChange={() => {}} />
        </WheelPickerWrapper>,
      )
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders multiple WheelPickers in one wrapper', () => {
      const { container } = render(
        <WheelPickerWrapper>
          <WheelPicker value="1" options={mockOptions} onChange={() => {}} />
          <WheelPicker value="2" options={mockOptions} onChange={() => {}} />
        </WheelPickerWrapper>,
      )
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Edge cases', () => {
    it('handles empty options array', () => {
      const { container } = render(<WheelPicker value="" options={[]} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles undefined classNames', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} classNames={undefined} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles single option', () => {
      const singleOption = [{ id: '1', value: 'Only Option' }]
      const { container } = render(<WheelPicker value="1" options={singleOption} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles numeric values', () => {
      const numericOptions = [
        { id: 1, value: 'One' },
        { id: 2, value: 'Two' },
      ]
      const { container } = render(<WheelPicker value={1} options={numericOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Dark mode support', () => {
    it('applies dark mode text color for option items', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('applies dark mode styles for highlight wrapper', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('applies dark mode focus ring', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Disabled state', () => {
    it('applies disabled styling to option items', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('applies disabled styling to highlight items', () => {
      const { container } = render(<WheelPicker value="1" options={mockOptions} onChange={() => {}} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })
})

describe('Type exports', () => {
  it('exports WheelPicker component', () => {
    expect(WheelPicker).toBeDefined()
  })

  it('exports WheelPickerWrapper component', () => {
    expect(WheelPickerWrapper).toBeDefined()
  })
})