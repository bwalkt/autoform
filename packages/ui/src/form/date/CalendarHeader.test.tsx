import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import * as React from 'react'
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
    it('renders title text', () => {
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

    it('applies custom className', () => {
      const { container } = render(<CalendarHeader {...defaultProps} className="custom-header" />)
      const header = container.querySelector('.custom-header')
      expect(header).toBeInTheDocument()
    })

    it('renders with React.ReactNode title', () => {
      render(
        <CalendarHeader
          {...defaultProps}
          title={
            <div>
              <span>Custom</span> <strong>Title</strong>
            </div>
          }
        />,
      )
      expect(screen.getByText('Custom')).toBeInTheDocument()
      expect(screen.getByText('Title')).toBeInTheDocument()
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

    it('handles rapid navigation clicks', async () => {
      const user = userEvent.setup()
      const handlePrevious = vi.fn()
      const handleNext = vi.fn()

      render(<CalendarHeader {...defaultProps} onPrevious={handlePrevious} onNext={handleNext} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })

      await user.click(prevButton)
      await user.click(nextButton)
      await user.click(prevButton)

      expect(handlePrevious).toHaveBeenCalledTimes(2)
      expect(handleNext).toHaveBeenCalledTimes(1)
    })
  })

  describe('Disabled states', () => {
    it('disables previous button when previousDisabled is true', () => {
      render(<CalendarHeader {...defaultProps} previousDisabled={true} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeDisabled()
    })

    it('disables next button when nextDisabled is true', () => {
      render(<CalendarHeader {...defaultProps} nextDisabled={true} />)

      const nextButton = screen.getByRole('button', { name: /next/i })
      expect(nextButton).toBeDisabled()
    })

    it('enables buttons when disabled props are false', () => {
      render(<CalendarHeader {...defaultProps} previousDisabled={false} nextDisabled={false} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })

      expect(prevButton).not.toBeDisabled()
      expect(nextButton).not.toBeDisabled()
    })

    it('does not call onPrevious when previous button is disabled', async () => {
      const user = userEvent.setup()
      const handlePrevious = vi.fn()

      render(<CalendarHeader {...defaultProps} onPrevious={handlePrevious} previousDisabled={true} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      await user.click(prevButton)

      expect(handlePrevious).not.toHaveBeenCalled()
    })

    it('does not call onNext when next button is disabled', async () => {
      const user = userEvent.setup()
      const handleNext = vi.fn()

      render(<CalendarHeader {...defaultProps} onNext={handleNext} nextDisabled={true} />)

      const nextButton = screen.getByRole('button', { name: /next/i })
      await user.click(nextButton)

      expect(handleNext).not.toHaveBeenCalled()
    })

    it('disables both buttons simultaneously', () => {
      render(<CalendarHeader {...defaultProps} previousDisabled={true} nextDisabled={true} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })

      expect(prevButton).toBeDisabled()
      expect(nextButton).toBeDisabled()
    })
  })

  describe('Custom aria labels', () => {
    it('uses custom previousAriaLabel', () => {
      render(<CalendarHeader {...defaultProps} previousAriaLabel="Go to previous month" />)

      expect(screen.getByRole('button', { name: 'Go to previous month' })).toBeInTheDocument()
    })

    it('uses custom nextAriaLabel', () => {
      render(<CalendarHeader {...defaultProps} nextAriaLabel="Go to next month" />)

      expect(screen.getByRole('button', { name: 'Go to next month' })).toBeInTheDocument()
    })

    it('uses default aria labels when not provided', () => {
      render(<CalendarHeader {...defaultProps} />)

      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    })
  })

  describe('Custom icons', () => {
    it('renders custom previous icon', () => {
      const CustomPrevIcon = <div data-testid="custom-prev-icon">Prev</div>

      render(<CalendarHeader {...defaultProps} previousIcon={CustomPrevIcon} />)

      expect(screen.getByTestId('custom-prev-icon')).toBeInTheDocument()
    })

    it('renders custom next icon', () => {
      const CustomNextIcon = <div data-testid="custom-next-icon">Next</div>

      render(<CalendarHeader {...defaultProps} nextIcon={CustomNextIcon} />)

      expect(screen.getByTestId('custom-next-icon')).toBeInTheDocument()
    })

    it('renders fallback icons when custom icons are not provided', () => {
      render(<CalendarHeader {...defaultProps} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })

      expect(prevButton).toBeInTheDocument()
      expect(nextButton).toBeInTheDocument()
    })

    it('renders both custom icons', () => {
      const CustomPrevIcon = <span data-testid="custom-prev">←</span>
      const CustomNextIcon = <span data-testid="custom-next">→</span>

      render(<CalendarHeader {...defaultProps} previousIcon={CustomPrevIcon} nextIcon={CustomNextIcon} />)

      expect(screen.getByTestId('custom-prev')).toBeInTheDocument()
      expect(screen.getByTestId('custom-next')).toBeInTheDocument()
    })

    it('handles SVG custom icons', () => {
      const CustomIcon = (
        <svg data-testid="custom-svg">
          <path d="M0 0" />
        </svg>
      )

      render(<CalendarHeader {...defaultProps} previousIcon={CustomIcon} />)

      expect(screen.getByTestId('custom-svg')).toBeInTheDocument()
    })
  })

  describe('Styling customization', () => {
    it('applies custom titleClassName', () => {
      render(<CalendarHeader {...defaultProps} titleClassName="custom-title-class" />)

      const title = screen.getByText('January 2026')
      expect(title).toHaveClass('custom-title-class')
    })

    it('applies custom navClassName', () => {
      const { container } = render(<CalendarHeader {...defaultProps} navClassName="custom-nav-class" />)

      const navContainer = container.querySelector('.custom-nav-class')
      expect(navContainer).toBeInTheDocument()
    })

    it('applies custom navButtonClassName', () => {
      render(<CalendarHeader {...defaultProps} navButtonClassName="custom-button-class" />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })

      expect(prevButton).toHaveClass('custom-button-class')
      expect(nextButton).toHaveClass('custom-button-class')
    })

    it('applies all custom classNames simultaneously', () => {
      const { container } = render(
        <CalendarHeader
          {...defaultProps}
          className="custom-header"
          titleClassName="custom-title"
          navClassName="custom-nav"
          navButtonClassName="custom-button"
        />,
      )

      const header = container.querySelector('.custom-header')
      const title = screen.getByText('January 2026')
      const navContainer = container.querySelector('.custom-nav')
      const prevButton = screen.getByRole('button', { name: /previous/i })

      expect(header).toBeInTheDocument()
      expect(title).toHaveClass('custom-title')
      expect(navContainer).toBeInTheDocument()
      expect(prevButton).toHaveClass('custom-button')
    })
  })

  describe('Color variations', () => {
    it('renders with default color', () => {
      render(<CalendarHeader {...defaultProps} color="default" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

    it('renders with primary color', () => {
      render(<CalendarHeader {...defaultProps} color="primary" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

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
  })

  describe('Radius variations', () => {
    it('renders with none radius', () => {
      render(<CalendarHeader {...defaultProps} radius="none" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

    it('renders with sm radius', () => {
      render(<CalendarHeader {...defaultProps} radius="sm" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

    it('renders with md radius', () => {
      render(<CalendarHeader {...defaultProps} radius="md" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

    it('renders with lg radius', () => {
      render(<CalendarHeader {...defaultProps} radius="lg" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

    it('renders with full radius', () => {
      render(<CalendarHeader {...defaultProps} radius="full" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })
  })

  describe('Navigation button variants', () => {
    it('renders with soft variant', () => {
      render(<CalendarHeader {...defaultProps} navButtonVariant="soft" />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
    })

    it('renders with outline variant', () => {
      render(<CalendarHeader {...defaultProps} navButtonVariant="outline" />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
    })

    it('renders with ghost variant', () => {
      render(<CalendarHeader {...defaultProps} navButtonVariant="ghost" />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
    })

    it('renders with bordered styling when navButtonBordered is true', () => {
      render(<CalendarHeader {...defaultProps} navButtonBordered={true} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton.className).toContain('border-[var(--rdp-accent-color)]')
    })

    it('renders with non-bordered styling when navButtonBordered is false', () => {
      render(<CalendarHeader {...defaultProps} navButtonBordered={false} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
    })
  })

  describe('Color customization props', () => {
    it('passes accentColor to nav buttons', () => {
      render(<CalendarHeader {...defaultProps} accentColor="#ff0000" />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toHaveStyle({ '--rdp-accent-color': '#ff0000' })
    })

    it('passes softColor to nav buttons', () => {
      render(<CalendarHeader {...defaultProps} softColor="rgba(255, 0, 0, 0.1)" />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toHaveStyle({ '--rdp-accent-background-color': 'rgba(255, 0, 0, 0.1)' })
    })

    it('passes foregroundColor to nav buttons', () => {
      render(<CalendarHeader {...defaultProps} foregroundColor="#ffffff" />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toHaveStyle({ '--rdp-accent-foreground': '#ffffff' })
    })

    it('applies all color customizations together', () => {
      render(
        <CalendarHeader
          {...defaultProps}
          accentColor="#0000ff"
          softColor="rgba(0, 0, 255, 0.2)"
          foregroundColor="#ffff00"
        />,
      )

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toHaveStyle({
        '--rdp-accent-color': '#0000ff',
        '--rdp-accent-background-color': 'rgba(0, 0, 255, 0.2)',
        '--rdp-accent-foreground': '#ffff00',
      })
    })
  })

  describe('Title variations', () => {
    it('handles empty string title', () => {
      render(<CalendarHeader {...defaultProps} title="" />)

      const { container } = render(<CalendarHeader {...defaultProps} title="" />)
      const titleElement = container.querySelector('.truncate')
      expect(titleElement).toBeInTheDocument()
    })

    it('handles long title text with truncation', () => {
      const longTitle = 'This is a very long title that should be truncated when it exceeds the container width'

      render(<CalendarHeader {...defaultProps} title={longTitle} />)

      const title = screen.getByText(longTitle)
      expect(title.className).toContain('truncate')
    })

    it('handles title with special characters', () => {
      render(<CalendarHeader {...defaultProps} title="January 2026 — Special Edition" />)

      expect(screen.getByText('January 2026 — Special Edition')).toBeInTheDocument()
    })

    it('handles title as a number', () => {
      render(<CalendarHeader {...defaultProps} title={2026} />)

      expect(screen.getByText('2026')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has accessible button roles', () => {
      render(<CalendarHeader {...defaultProps} />)

      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    })

    it('maintains keyboard navigation', async () => {
      const user = userEvent.setup()
      const handlePrevious = vi.fn()
      const handleNext = vi.fn()

      render(<CalendarHeader {...defaultProps} onPrevious={handlePrevious} onNext={handleNext} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })

      prevButton.focus()
      await user.keyboard('{Enter}')
      expect(handlePrevious).toHaveBeenCalled()

      const nextButton = screen.getByRole('button', { name: /next/i })
      nextButton.focus()
      await user.keyboard(' ')
      expect(handleNext).toHaveBeenCalled()
    })

    it('provides proper disabled state feedback', () => {
      render(<CalendarHeader {...defaultProps} previousDisabled={true} nextDisabled={true} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })

      expect(prevButton).toHaveAttribute('disabled')
      expect(nextButton).toHaveAttribute('disabled')
    })
  })

  describe('Edge cases', () => {
    it('handles undefined optional props', () => {
      render(
        <CalendarHeader
          title="Test"
          color="default"
          radius="md"
          navButtonVariant="soft"
          navButtonBordered={false}
          accentColor="#000"
          softColor="#fff"
          foregroundColor="#000"
          onPrevious={() => {}}
          onNext={() => {}}
        />,
      )

      expect(screen.getByText('Test')).toBeInTheDocument()
    })

    it('handles rapid enable/disable state changes', () => {
      const { rerender } = render(<CalendarHeader {...defaultProps} previousDisabled={false} />)

      let prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).not.toBeDisabled()

      rerender(<CalendarHeader {...defaultProps} previousDisabled={true} />)
      prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeDisabled()

      rerender(<CalendarHeader {...defaultProps} previousDisabled={false} />)
      prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).not.toBeDisabled()
    })

    it('handles title updates', () => {
      const { rerender } = render(<CalendarHeader {...defaultProps} title="January 2026" />)

      expect(screen.getByText('January 2026')).toBeInTheDocument()

      rerender(<CalendarHeader {...defaultProps} title="February 2026" />)

      expect(screen.getByText('February 2026')).toBeInTheDocument()
      expect(screen.queryByText('January 2026')).not.toBeInTheDocument()
    })

    it('handles callback function changes', async () => {
      const user = userEvent.setup()
      const handlePrevious1 = vi.fn()
      const handlePrevious2 = vi.fn()

      const { rerender } = render(<CalendarHeader {...defaultProps} onPrevious={handlePrevious1} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      await user.click(prevButton)
      expect(handlePrevious1).toHaveBeenCalledTimes(1)

      rerender(<CalendarHeader {...defaultProps} onPrevious={handlePrevious2} />)
      await user.click(prevButton)
      expect(handlePrevious2).toHaveBeenCalledTimes(1)
      expect(handlePrevious1).toHaveBeenCalledTimes(1)
    })

    it('maintains stable rendering across re-renders with same props', () => {
      const { rerender, container } = render(<CalendarHeader {...defaultProps} />)

      const initialHTML = container.innerHTML

      rerender(<CalendarHeader {...defaultProps} />)

      expect(container.innerHTML).toBe(initialHTML)
    })
  })

  describe('Complex icon scenarios', () => {
    it('handles icons with complex className attributes', () => {
      const ComplexIcon = <ChevronLeftIcon className="!text-current !opacity-100" width={14} height={14} />

      render(<CalendarHeader {...defaultProps} previousIcon={ComplexIcon} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
    })

    it('handles fallback ChevronLeftIcon for previous', () => {
      render(<CalendarHeader {...defaultProps} previousIcon={undefined} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
    })

    it('handles fallback ChevronRightIcon for next', () => {
      render(<CalendarHeader {...defaultProps} nextIcon={undefined} />)

      const nextButton = screen.getByRole('button', { name: /next/i })
      expect(nextButton).toBeInTheDocument()
    })
  })

  describe('Integration scenarios', () => {
    it('works with all props simultaneously', async () => {
      const user = userEvent.setup()
      const handlePrevious = vi.fn()
      const handleNext = vi.fn()

      render(
        <CalendarHeader
          title="December 2025"
          color="success"
          radius="lg"
          navButtonVariant="outline"
          navButtonBordered={true}
          accentColor="#00ff00"
          softColor="rgba(0, 255, 0, 0.2)"
          foregroundColor="#ffffff"
          onPrevious={handlePrevious}
          onNext={handleNext}
          previousDisabled={false}
          nextDisabled={false}
          previousAriaLabel="Previous month"
          nextAriaLabel="Next month"
          previousIcon={<span data-testid="prev-icon">←</span>}
          nextIcon={<span data-testid="next-icon">→</span>}
          className="test-header"
          titleClassName="test-title"
          navClassName="test-nav"
          navButtonClassName="test-button"
        />,
      )

      expect(screen.getByText('December 2025')).toBeInTheDocument()
      expect(screen.getByTestId('prev-icon')).toBeInTheDocument()
      expect(screen.getByTestId('next-icon')).toBeInTheDocument()

      const prevButton = screen.getByRole('button', { name: 'Previous month' })
      const nextButton = screen.getByRole('button', { name: 'Next month' })

      await user.click(prevButton)
      await user.click(nextButton)

      expect(handlePrevious).toHaveBeenCalledTimes(1)
      expect(handleNext).toHaveBeenCalledTimes(1)
    })

    it('handles boundary condition with both disabled', () => {
      render(<CalendarHeader {...defaultProps} previousDisabled={true} nextDisabled={true} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })

      expect(prevButton).toBeDisabled()
      expect(nextButton).toBeDisabled()
    })

    it('handles mix of disabled and enabled buttons', async () => {
      const user = userEvent.setup()
      const handlePrevious = vi.fn()
      const handleNext = vi.fn()

      render(
        <CalendarHeader
          {...defaultProps}
          onPrevious={handlePrevious}
          onNext={handleNext}
          previousDisabled={true}
          nextDisabled={false}
        />,
      )

      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })

      await user.click(prevButton)
      await user.click(nextButton)

      expect(handlePrevious).not.toHaveBeenCalled()
      expect(handleNext).toHaveBeenCalledTimes(1)
    })
  })
})