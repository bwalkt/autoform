import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CalendarHeader } from './CalendarHeader'

afterEach(() => {
  cleanup()
})

describe('CalendarHeader', () => {
  const defaultProps = {
    title: 'January 2026',
    color: 'default' as const,
    radius: 'md' as const,
    navButtonVariant: 'soft' as const,
    navButtonBordered: false,
    accentColor: '#000000',
    softColor: 'rgba(0, 0, 0, 0.1)',
    foregroundColor: '#ffffff',
    onPrevious: vi.fn(),
    onNext: vi.fn(),
  }

  describe('Basic rendering', () => {
    it('renders the title', () => {
      render(<CalendarHeader {...defaultProps} />)
      expect(screen.getByText('January 2026')).toBeInTheDocument()
    })

    it('renders previous navigation button', () => {
      render(<CalendarHeader {...defaultProps} />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

    it('renders next navigation button', () => {
      render(<CalendarHeader {...defaultProps} />)
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    })

    it('renders with React node as title', () => {
      render(<CalendarHeader {...defaultProps} title={<span data-testid="custom-title">Custom Title</span>} />)
      expect(screen.getByTestId('custom-title')).toBeInTheDocument()
      expect(screen.getByText('Custom Title')).toBeInTheDocument()
    })
  })

  describe('Navigation callbacks', () => {
    it('calls onPrevious when previous button is clicked', async () => {
      const user = userEvent.setup()
      const handlePrevious = vi.fn()

      render(<CalendarHeader {...defaultProps} onPrevious={handlePrevious} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      await user.click(prevButton)

      expect(handlePrevious).toHaveBeenCalledTimes(1)
    })

    it('calls onNext when next button is clicked', async () => {
      const user = userEvent.setup()
      const handleNext = vi.fn()

      render(<CalendarHeader {...defaultProps} onNext={handleNext} />)

      const nextButton = screen.getByRole('button', { name: /next/i })
      await user.click(nextButton)

      expect(handleNext).toHaveBeenCalledTimes(1)
    })

    it('handles multiple rapid clicks', async () => {
      const user = userEvent.setup()
      const handleNext = vi.fn()

      render(<CalendarHeader {...defaultProps} onNext={handleNext} />)

      const nextButton = screen.getByRole('button', { name: /next/i })
      await user.click(nextButton)
      await user.click(nextButton)
      await user.click(nextButton)

      expect(handleNext).toHaveBeenCalledTimes(3)
    })
  })

  describe('Disabled state', () => {
    it('disables previous button when previousDisabled is true', () => {
      render(<CalendarHeader {...defaultProps} previousDisabled />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeDisabled()
    })

    it('disables next button when nextDisabled is true', () => {
      render(<CalendarHeader {...defaultProps} nextDisabled />)

      const nextButton = screen.getByRole('button', { name: /next/i })
      expect(nextButton).toBeDisabled()
    })

    it('does not call onPrevious when previous button is disabled', async () => {
      const user = userEvent.setup()
      const handlePrevious = vi.fn()

      render(<CalendarHeader {...defaultProps} onPrevious={handlePrevious} previousDisabled />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      await user.click(prevButton)

      expect(handlePrevious).not.toHaveBeenCalled()
    })

    it('does not call onNext when next button is disabled', async () => {
      const user = userEvent.setup()
      const handleNext = vi.fn()

      render(<CalendarHeader {...defaultProps} onNext={handleNext} nextDisabled />)

      const nextButton = screen.getByRole('button', { name: /next/i })
      await user.click(nextButton)

      expect(handleNext).not.toHaveBeenCalled()
    })

    it('allows both buttons to be disabled simultaneously', () => {
      render(<CalendarHeader {...defaultProps} previousDisabled nextDisabled />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })

      expect(prevButton).toBeDisabled()
      expect(nextButton).toBeDisabled()
    })
  })

  describe('Aria labels', () => {
    it('uses default aria-label for previous button', () => {
      render(<CalendarHeader {...defaultProps} />)
      expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument()
    })

    it('uses default aria-label for next button', () => {
      render(<CalendarHeader {...defaultProps} />)
      expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
    })

    it('uses custom previousAriaLabel', () => {
      render(<CalendarHeader {...defaultProps} previousAriaLabel="Go to previous month" />)
      expect(screen.getByRole('button', { name: 'Go to previous month' })).toBeInTheDocument()
    })

    it('uses custom nextAriaLabel', () => {
      render(<CalendarHeader {...defaultProps} nextAriaLabel="Go to next month" />)
      expect(screen.getByRole('button', { name: 'Go to next month' })).toBeInTheDocument()
    })
  })

  describe('Custom icons', () => {
    it('renders fallback icons when custom icons are not provided', () => {
      const { container } = render(<CalendarHeader {...defaultProps} />)
      const svgs = container.querySelectorAll('svg')
      expect(svgs.length).toBeGreaterThanOrEqual(2)
    })

    it('renders custom previousIcon', () => {
      render(<CalendarHeader {...defaultProps} previousIcon={<span data-testid="custom-prev">←</span>} />)
      expect(screen.getByTestId('custom-prev')).toBeInTheDocument()
      expect(screen.getByText('←')).toBeInTheDocument()
    })

    it('renders custom nextIcon', () => {
      render(<CalendarHeader {...defaultProps} nextIcon={<span data-testid="custom-next">→</span>} />)
      expect(screen.getByTestId('custom-next')).toBeInTheDocument()
      expect(screen.getByText('→')).toBeInTheDocument()
    })

    it('renders both custom icons together', () => {
      render(
        <CalendarHeader
          {...defaultProps}
          previousIcon={<span data-testid="custom-prev">←</span>}
          nextIcon={<span data-testid="custom-next">→</span>}
        />,
      )
      expect(screen.getByTestId('custom-prev')).toBeInTheDocument()
      expect(screen.getByTestId('custom-next')).toBeInTheDocument()
    })

    it('renders custom SVG icons', () => {
      render(
        <CalendarHeader
          {...defaultProps}
          previousIcon={
            <svg data-testid="custom-svg-prev">
              <path />
            </svg>
          }
          nextIcon={
            <svg data-testid="custom-svg-next">
              <path />
            </svg>
          }
        />,
      )
      expect(screen.getByTestId('custom-svg-prev')).toBeInTheDocument()
      expect(screen.getByTestId('custom-svg-next')).toBeInTheDocument()
    })
  })

  describe('Color props', () => {
    it('passes color prop to navigation buttons', () => {
      render(<CalendarHeader {...defaultProps} color="primary" />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
    })

    it('passes accentColor to navigation buttons', () => {
      render(<CalendarHeader {...defaultProps} accentColor="#ff0000" />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toHaveStyle({ '--rdp-accent-color': '#ff0000' })
    })

    it('passes softColor to navigation buttons', () => {
      render(<CalendarHeader {...defaultProps} softColor="rgba(255, 0, 0, 0.2)" />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toHaveStyle({ '--rdp-accent-background-color': 'rgba(255, 0, 0, 0.2)' })
    })

    it('passes foregroundColor to navigation buttons', () => {
      render(<CalendarHeader {...defaultProps} foregroundColor="#000000" />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toHaveStyle({ '--rdp-accent-foreground': '#000000' })
    })
  })

  describe('Radius prop', () => {
    it('passes radius prop to navigation buttons', () => {
      render(<CalendarHeader {...defaultProps} radius="lg" />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
    })

    it('works with none radius', () => {
      render(<CalendarHeader {...defaultProps} radius="none" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

    it('works with sm radius', () => {
      render(<CalendarHeader {...defaultProps} radius="sm" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

    it('works with md radius', () => {
      render(<CalendarHeader {...defaultProps} radius="md" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

    it('works with lg radius', () => {
      render(<CalendarHeader {...defaultProps} radius="lg" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

    it('works with full radius', () => {
      render(<CalendarHeader {...defaultProps} radius="full" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })
  })

  describe('NavButton variant and bordered', () => {
    it('passes navButtonVariant to navigation buttons', () => {
      render(<CalendarHeader {...defaultProps} navButtonVariant="outline" />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
    })

    it('passes navButtonBordered=true to navigation buttons', () => {
      render(<CalendarHeader {...defaultProps} navButtonBordered={true} navButtonVariant="outline" />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton.className).toContain('border-[var(--rdp-accent-color)]')
    })

    it('passes navButtonBordered=false to navigation buttons', () => {
      render(<CalendarHeader {...defaultProps} navButtonBordered={false} />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton.className).toContain('bg-[var(--rdp-accent-background-color)]')
    })

    it('works with ghost variant', () => {
      render(<CalendarHeader {...defaultProps} navButtonVariant="ghost" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })
  })

  describe('ClassName customization', () => {
    it('applies custom className to root element', () => {
      const { container } = render(<CalendarHeader {...defaultProps} className="custom-header-class" />)
      const header = container.firstChild as HTMLElement
      expect(header).toHaveClass('custom-header-class')
    })

    it('applies custom titleClassName', () => {
      render(<CalendarHeader {...defaultProps} titleClassName="custom-title-class" />)
      const title = screen.getByText('January 2026')
      expect(title).toHaveClass('custom-title-class')
    })

    it('applies custom navClassName', () => {
      const { container } = render(<CalendarHeader {...defaultProps} navClassName="custom-nav-class" />)
      const nav = container.querySelector('.custom-nav-class')
      expect(nav).toBeInTheDocument()
    })

    it('applies custom navButtonClassName to both buttons', () => {
      render(<CalendarHeader {...defaultProps} navButtonClassName="custom-button-class" />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })
      expect(prevButton).toHaveClass('custom-button-class')
      expect(nextButton).toHaveClass('custom-button-class')
    })

    it('applies multiple custom classNames together', () => {
      const { container } = render(
        <CalendarHeader
          {...defaultProps}
          className="root-class"
          titleClassName="title-class"
          navClassName="nav-class"
          navButtonClassName="btn-class"
        />,
      )

      const header = container.firstChild as HTMLElement
      expect(header).toHaveClass('root-class')

      const title = screen.getByText('January 2026')
      expect(title).toHaveClass('title-class')

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toHaveClass('btn-class')
    })
  })

  describe('Layout and structure', () => {
    it('renders title before navigation buttons', () => {
      const { container } = render(<CalendarHeader {...defaultProps} />)
      const header = container.firstChild as HTMLElement
      const children = Array.from(header.children)

      expect(children.length).toBeGreaterThanOrEqual(2)
      const titleElement = children[0] as HTMLElement
      expect(titleElement.textContent).toContain('January 2026')
    })

    it('renders navigation buttons in a container', () => {
      const { container } = render(<CalendarHeader {...defaultProps} />)
      const nav = container.querySelector('.flex.items-center.gap-1')
      expect(nav).toBeInTheDocument()
    })

    it('renders previous button before next button', () => {
      render(<CalendarHeader {...defaultProps} />)
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
      expect(buttons[0]).toHaveAttribute('aria-label', 'Previous')
      expect(buttons[1]).toHaveAttribute('aria-label', 'Next')
    })
  })

  describe('Color combinations', () => {
    it('renders with success color', () => {
      render(<CalendarHeader {...defaultProps} color="success" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

    it('renders with error color', () => {
      render(<CalendarHeader {...defaultProps} color="error" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

    it('renders with warning color', () => {
      render(<CalendarHeader {...defaultProps} color="warning" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

    it('renders with info color', () => {
      render(<CalendarHeader {...defaultProps} color="info" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

    it('renders with neutral color', () => {
      render(<CalendarHeader {...defaultProps} color="neutral" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

    it('renders with primary color', () => {
      render(<CalendarHeader {...defaultProps} color="primary" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })
  })

  describe('Edge cases', () => {
    it('handles empty title string', () => {
      render(<CalendarHeader {...defaultProps} title="" />)
      const title = screen.queryByText('January 2026')
      expect(title).not.toBeInTheDocument()
    })

    it('handles very long title', () => {
      const longTitle = 'January 2026 - This is a very long title that might cause layout issues'
      render(<CalendarHeader {...defaultProps} title={longTitle} />)
      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it('handles title with special characters', () => {
      render(<CalendarHeader {...defaultProps} title="January 2026 • Special © Title" />)
      expect(screen.getByText(/January 2026 • Special © Title/)).toBeInTheDocument()
    })

    it('handles null custom icons gracefully', () => {
      render(<CalendarHeader {...defaultProps} previousIcon={null} nextIcon={null} />)
      // Should render fallback icons
      const { container } = render(<CalendarHeader {...defaultProps} previousIcon={null} nextIcon={null} />)
      const svgs = container.querySelectorAll('svg')
      expect(svgs.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Accessibility', () => {
    it('renders buttons with proper role', () => {
      render(<CalendarHeader {...defaultProps} />)
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
    })

    it('provides aria-label for both navigation buttons', () => {
      render(<CalendarHeader {...defaultProps} />)
      expect(screen.getByRole('button', { name: /previous/i })).toHaveAccessibleName()
      expect(screen.getByRole('button', { name: /next/i })).toHaveAccessibleName()
    })

    it('maintains focus order (previous, then next)', async () => {
      const user = userEvent.setup()
      render(<CalendarHeader {...defaultProps} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })

      await user.tab()
      expect(prevButton).toHaveFocus()

      await user.tab()
      expect(nextButton).toHaveFocus()
    })

    it('announces disabled state for previous button', () => {
      render(<CalendarHeader {...defaultProps} previousDisabled />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toHaveAttribute('disabled')
    })

    it('announces disabled state for next button', () => {
      render(<CalendarHeader {...defaultProps} nextDisabled />)
      const nextButton = screen.getByRole('button', { name: /next/i })
      expect(nextButton).toHaveAttribute('disabled')
    })
  })

  describe('Props combinations', () => {
    it('handles all props simultaneously', () => {
      render(
        <CalendarHeader
          title="Custom Month"
          color="primary"
          radius="lg"
          navButtonVariant="outline"
          navButtonBordered={true}
          accentColor="#ff0000"
          softColor="rgba(255, 0, 0, 0.1)"
          foregroundColor="#ffffff"
          onPrevious={vi.fn()}
          onNext={vi.fn()}
          previousDisabled={false}
          nextDisabled={false}
          previousAriaLabel="Previous month"
          nextAriaLabel="Next month"
          previousIcon={<span>←</span>}
          nextIcon={<span>→</span>}
          className="root-class"
          titleClassName="title-class"
          navClassName="nav-class"
          navButtonClassName="btn-class"
        />,
      )

      expect(screen.getByText('Custom Month')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Previous month' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Next month' })).toBeInTheDocument()
    })

    it('handles minimal required props', () => {
      render(
        <CalendarHeader
          title="Test"
          color="default"
          radius="md"
          navButtonVariant="soft"
          navButtonBordered={false}
          accentColor="#000"
          softColor="#eee"
          foregroundColor="#fff"
          onPrevious={vi.fn()}
          onNext={vi.fn()}
        />,
      )

      expect(screen.getByText('Test')).toBeInTheDocument()
    })
  })

  describe('Title truncation', () => {
    it('applies truncate class to title', () => {
      render(<CalendarHeader {...defaultProps} />)
      const title = screen.getByText('January 2026')
      expect(title.className).toContain('truncate')
    })
  })

  describe('Regression tests', () => {
    it('does not break when rapidly toggling disabled state', () => {
      const { rerender } = render(<CalendarHeader {...defaultProps} previousDisabled />)
      rerender(<CalendarHeader {...defaultProps} previousDisabled={false} />)
      rerender(<CalendarHeader {...defaultProps} previousDisabled />)
      rerender(<CalendarHeader {...defaultProps} previousDisabled={false} />)

      expect(screen.getByRole('button', { name: /previous/i })).not.toBeDisabled()
    })

    it('handles theme changes without errors', () => {
      const { rerender } = render(<CalendarHeader {...defaultProps} color="default" />)
      rerender(<CalendarHeader {...defaultProps} color="primary" />)
      rerender(<CalendarHeader {...defaultProps} color="success" />)

      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

    it('maintains callbacks across re-renders', async () => {
      const user = userEvent.setup()
      const handleNext = vi.fn()
      const { rerender } = render(<CalendarHeader {...defaultProps} onNext={handleNext} />)

      const nextButton = screen.getByRole('button', { name: /next/i })
      await user.click(nextButton)
      expect(handleNext).toHaveBeenCalledTimes(1)

      rerender(<CalendarHeader {...defaultProps} onNext={handleNext} title="February 2026" />)
      await user.click(nextButton)
      expect(handleNext).toHaveBeenCalledTimes(2)
    })
  })
})