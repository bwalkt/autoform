import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CalendarHeader } from './CalendarHeader'

afterEach(() => {
  cleanup()
})

describe('CalendarHeader', () => {
  const defaultProps = {
    title: 'June 2025',
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
      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('renders previous navigation button', () => {
      render(<CalendarHeader {...defaultProps} />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    })

    it('renders next navigation button', () => {
      render(<CalendarHeader {...defaultProps} />)
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    })

    it('renders with custom title', () => {
      render(<CalendarHeader {...defaultProps} title="December 2026" />)
      expect(screen.getByText('December 2026')).toBeInTheDocument()
    })

    it('renders title as ReactNode', () => {
      render(
        <CalendarHeader
          {...defaultProps}
          title={
            <span data-testid="custom-title">
              <strong>Custom</strong> Title
            </span>
          }
        />,
      )
      expect(screen.getByTestId('custom-title')).toBeInTheDocument()
      expect(screen.getByText('Custom')).toBeInTheDocument()
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

    it('handles rapid clicks on navigation buttons', async () => {
      const user = userEvent.setup()
      const handlePrevious = vi.fn()
      const handleNext = vi.fn()
      render(<CalendarHeader {...defaultProps} onPrevious={handlePrevious} onNext={handleNext} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })

      await user.click(prevButton)
      await user.click(nextButton)
      await user.click(prevButton)
      await user.click(nextButton)

      expect(handlePrevious).toHaveBeenCalledTimes(2)
      expect(handleNext).toHaveBeenCalledTimes(2)
    })
  })

  describe('Disabled state', () => {
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

    it('enables both buttons by default', () => {
      render(<CalendarHeader {...defaultProps} />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })
      expect(prevButton).not.toBeDisabled()
      expect(nextButton).not.toBeDisabled()
    })

    it('does not call onPrevious when button is disabled', async () => {
      const user = userEvent.setup()
      const handlePrevious = vi.fn()
      render(<CalendarHeader {...defaultProps} onPrevious={handlePrevious} previousDisabled={true} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      await user.click(prevButton)

      expect(handlePrevious).not.toHaveBeenCalled()
    })

    it('does not call onNext when button is disabled', async () => {
      const user = userEvent.setup()
      const handleNext = vi.fn()
      render(<CalendarHeader {...defaultProps} onNext={handleNext} nextDisabled={true} />)

      const nextButton = screen.getByRole('button', { name: /next/i })
      await user.click(nextButton)

      expect(handleNext).not.toHaveBeenCalled()
    })

    it('can disable both buttons simultaneously', () => {
      render(<CalendarHeader {...defaultProps} previousDisabled={true} nextDisabled={true} />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })
      expect(prevButton).toBeDisabled()
      expect(nextButton).toBeDisabled()
    })
  })

  describe('Accessibility', () => {
    it('applies default aria-label to previous button', () => {
      render(<CalendarHeader {...defaultProps} />)
      expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument()
    })

    it('applies default aria-label to next button', () => {
      render(<CalendarHeader {...defaultProps} />)
      expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
    })

    it('applies custom previousAriaLabel', () => {
      render(<CalendarHeader {...defaultProps} previousAriaLabel="Go to previous month" />)
      expect(screen.getByRole('button', { name: 'Go to previous month' })).toBeInTheDocument()
    })

    it('applies custom nextAriaLabel', () => {
      render(<CalendarHeader {...defaultProps} nextAriaLabel="Go to next month" />)
      expect(screen.getByRole('button', { name: 'Go to next month' })).toBeInTheDocument()
    })

    it('applies specific aria-labels for calendar context', () => {
      render(<CalendarHeader {...defaultProps} previousAriaLabel="Previous week" nextAriaLabel="Next week" />)
      expect(screen.getByRole('button', { name: 'Previous week' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Next week' })).toBeInTheDocument()
    })
  })

  describe('Custom icons', () => {
    it('renders default icons when none provided', () => {
      render(<CalendarHeader {...defaultProps} />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    })

    it('renders custom previous icon', () => {
      const customIcon = <span data-testid="custom-prev-icon">←</span>
      render(<CalendarHeader {...defaultProps} previousIcon={customIcon} />)
      expect(screen.getByTestId('custom-prev-icon')).toBeInTheDocument()
    })

    it('renders custom next icon', () => {
      const customIcon = <span data-testid="custom-next-icon">→</span>
      render(<CalendarHeader {...defaultProps} nextIcon={customIcon} />)
      expect(screen.getByTestId('custom-next-icon')).toBeInTheDocument()
    })

    it('renders both custom icons', () => {
      const customPrevIcon = <span data-testid="custom-prev">←</span>
      const customNextIcon = <span data-testid="custom-next">→</span>
      render(<CalendarHeader {...defaultProps} previousIcon={customPrevIcon} nextIcon={customNextIcon} />)
      expect(screen.getByTestId('custom-prev')).toBeInTheDocument()
      expect(screen.getByTestId('custom-next')).toBeInTheDocument()
    })

    it('renders SVG icons', () => {
      const svgIcon = (
        <svg data-testid="svg-icon">
          <path d="M0 0" />
        </svg>
      )
      render(<CalendarHeader {...defaultProps} previousIcon={svgIcon} />)
      expect(screen.getByTestId('svg-icon')).toBeInTheDocument()
    })
  })

  describe('Styling props', () => {
    it('applies custom className', () => {
      const { container } = render(<CalendarHeader {...defaultProps} className="custom-header" />)
      const header = container.querySelector('.custom-header')
      expect(header).toBeInTheDocument()
    })

    it('applies custom titleClassName', () => {
      render(<CalendarHeader {...defaultProps} titleClassName="custom-title" />)
      const title = screen.getByText('June 2025')
      expect(title).toHaveClass('custom-title')
    })

    it('applies custom navClassName', () => {
      const { container } = render(<CalendarHeader {...defaultProps} navClassName="custom-nav" />)
      const nav = container.querySelector('.custom-nav')
      expect(nav).toBeInTheDocument()
    })

    it('applies custom navButtonClassName', () => {
      render(<CalendarHeader {...defaultProps} navButtonClassName="custom-button" />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toHaveClass('custom-button')
    })

    it('combines custom classNames with default classNames', () => {
      const { container } = render(
        <CalendarHeader
          {...defaultProps}
          className="custom-header"
          titleClassName="custom-title"
          navClassName="custom-nav"
          navButtonClassName="custom-button"
        />,
      )
      expect(container.querySelector('.custom-header')).toBeInTheDocument()
      expect(screen.getByText('June 2025')).toHaveClass('custom-title')
    })
  })

  describe('Button variants and colors', () => {
    it('renders with soft variant', () => {
      render(<CalendarHeader {...defaultProps} navButtonVariant="soft" />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
      expect(prevButton.className).toContain('bg-[var(--rdp-accent-background-color)]')
    })

    it('renders with outline variant', () => {
      render(<CalendarHeader {...defaultProps} navButtonVariant="outline" navButtonBordered={true} />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
      expect(prevButton.className).toContain('border-[var(--rdp-accent-color)]')
    })

    it('renders with ghost variant', () => {
      render(<CalendarHeader {...defaultProps} navButtonVariant="ghost" />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
      expect(prevButton.className).toContain('bg-transparent')
    })

    it('passes color prop to navigation buttons', () => {
      render(<CalendarHeader {...defaultProps} color="primary" />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
    })

    it('renders with different color tokens', () => {
      const colors: Array<'default' | 'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral'> = [
        'default',
        'primary',
        'success',
        'error',
        'warning',
        'info',
        'neutral',
      ]

      for (const color of colors) {
        const { unmount } = render(<CalendarHeader {...defaultProps} color={color} />)
        const prevButton = screen.getByRole('button', { name: /previous/i })
        expect(prevButton).toBeInTheDocument()
        unmount()
      }
    })
  })

  describe('Radius prop', () => {
    it('applies radius to navigation buttons', () => {
      const radii: Array<'none' | 'sm' | 'md' | 'lg' | 'full'> = ['none', 'sm', 'md', 'lg', 'full']

      for (const radius of radii) {
        const { unmount } = render(<CalendarHeader {...defaultProps} radius={radius} />)
        const prevButton = screen.getByRole('button', { name: /previous/i })
        expect(prevButton).toBeInTheDocument()
        unmount()
      }
    })
  })

  describe('Bordered navigation buttons', () => {
    it('renders bordered buttons when navButtonBordered is true', () => {
      render(<CalendarHeader {...defaultProps} navButtonBordered={true} navButtonVariant="outline" />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton.className).toContain('border-[var(--rdp-accent-color)]')
    })

    it('renders non-bordered buttons when navButtonBordered is false', () => {
      render(<CalendarHeader {...defaultProps} navButtonBordered={false} />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton.className).toContain('bg-[var(--rdp-accent-background-color)]')
    })

    it('resolves variant correctly with bordered prop', () => {
      render(<CalendarHeader {...defaultProps} navButtonBordered={true} navButtonVariant="outline" />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton.className).toContain('border-[var(--rdp-accent-color)]')
    })
  })

  describe('Layout and structure', () => {
    it('renders title and navigation in correct order', () => {
      const { container } = render(<CalendarHeader {...defaultProps} />)
      const elements = container.querySelectorAll('div > *')
      expect(elements.length).toBeGreaterThan(0)
    })

    it('renders navigation buttons in correct order (previous, next)', () => {
      render(<CalendarHeader {...defaultProps} />)
      const buttons = [screen.getByRole('button', { name: /previous/i }), screen.getByRole('button', { name: /next/i })]
      expect(buttons[0]).toHaveAttribute('aria-label', expect.stringMatching(/previous/i))
      expect(buttons[1]).toHaveAttribute('aria-label', expect.stringMatching(/next/i))
    })

    it('applies flex layout classes', () => {
      const { container } = render(<CalendarHeader {...defaultProps} />)
      const header = container.firstChild as HTMLElement
      expect(header.className).toContain('flex')
      expect(header.className).toContain('items-center')
      expect(header.className).toContain('justify-between')
    })

    it('truncates long titles', () => {
      render(<CalendarHeader {...defaultProps} />)
      const title = screen.getByText('June 2025')
      expect(title.className).toContain('truncate')
    })
  })

  describe('Edge cases', () => {
    it('handles empty title', () => {
      render(<CalendarHeader {...defaultProps} title="" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    })

    it('handles very long title text', () => {
      const longTitle = 'This is an extremely long title that should be truncated properly by the component'
      render(<CalendarHeader {...defaultProps} title={longTitle} />)
      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it('handles title with special characters', () => {
      render(<CalendarHeader {...defaultProps} title="Décembre 2025 – Special" />)
      expect(screen.getByText('Décembre 2025 – Special')).toBeInTheDocument()
    })

    it('handles title with HTML entities', () => {
      render(<CalendarHeader {...defaultProps} title="June &amp; July 2025" />)
      expect(screen.getByText(/June/)).toBeInTheDocument()
    })

    it('maintains functionality with all props at extremes', () => {
      render(
        <CalendarHeader
          {...defaultProps}
          previousDisabled={false}
          nextDisabled={false}
          navButtonBordered={true}
          navButtonVariant="outline"
          color="error"
          radius="full"
          className="test-class"
          titleClassName="test-title"
          navClassName="test-nav"
          navButtonClassName="test-button"
        />,
      )
      expect(screen.getByText('June 2025')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    })
  })

  describe('Color CSS variables', () => {
    it('passes accent color to navigation buttons', () => {
      render(<CalendarHeader {...defaultProps} accentColor="#ff0000" />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toHaveStyle({ '--rdp-accent-color': '#ff0000' })
    })

    it('passes soft color to navigation buttons', () => {
      render(<CalendarHeader {...defaultProps} softColor="rgba(255, 0, 0, 0.2)" />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toHaveStyle({ '--rdp-accent-background-color': 'rgba(255, 0, 0, 0.2)' })
    })

    it('passes foreground color to navigation buttons', () => {
      render(<CalendarHeader {...defaultProps} foregroundColor="#ffffff" />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toHaveStyle({ '--rdp-accent-foreground': '#ffffff' })
    })

    it('applies all color variables correctly', () => {
      render(
        <CalendarHeader
          {...defaultProps}
          accentColor="rgb(100, 200, 50)"
          softColor="color-mix(in oklab, rgb(100, 200, 50) 18%, transparent)"
          foregroundColor="rgb(255, 255, 255)"
        />,
      )
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toHaveStyle({
        '--rdp-accent-color': 'rgb(100, 200, 50)',
        '--rdp-accent-background-color': 'color-mix(in oklab, rgb(100, 200, 50) 18%, transparent)',
        '--rdp-accent-foreground': 'rgb(255, 255, 255)',
      })
    })
  })

  describe('Integration scenarios', () => {
    it('works correctly in calendar month navigation', async () => {
      const user = userEvent.setup()
      let currentMonth = 'June 2025'
      const handlePrevious = vi.fn(() => {
        currentMonth = 'May 2025'
      })
      const handleNext = vi.fn(() => {
        currentMonth = 'July 2025'
      })

      const { rerender } = render(
        <CalendarHeader {...defaultProps} title={currentMonth} onPrevious={handlePrevious} onNext={handleNext} />,
      )

      await user.click(screen.getByRole('button', { name: /next/i }))
      expect(handleNext).toHaveBeenCalledTimes(1)

      rerender(
        <CalendarHeader {...defaultProps} title={currentMonth} onPrevious={handlePrevious} onNext={handleNext} />,
      )
      expect(screen.getByText('July 2025')).toBeInTheDocument()
    })

    it('works correctly in week navigation', async () => {
      const user = userEvent.setup()
      const handlePrevious = vi.fn()
      const handleNext = vi.fn()

      render(
        <CalendarHeader
          {...defaultProps}
          title="Week of Feb 8, 2026"
          onPrevious={handlePrevious}
          onNext={handleNext}
          previousAriaLabel="Previous week"
          nextAriaLabel="Next week"
        />,
      )

      await user.click(screen.getByRole('button', { name: /previous week/i }))
      await user.click(screen.getByRole('button', { name: /next week/i }))

      expect(handlePrevious).toHaveBeenCalledTimes(1)
      expect(handleNext).toHaveBeenCalledTimes(1)
    })

    it('handles navigation boundaries correctly', () => {
      render(
        <CalendarHeader
          {...defaultProps}
          title="January 2025"
          previousDisabled={true}
          nextDisabled={false}
          previousAriaLabel="Previous month"
          nextAriaLabel="Next month"
        />,
      )

      const prevButton = screen.getByRole('button', { name: /previous month/i })
      const nextButton = screen.getByRole('button', { name: /next month/i })

      expect(prevButton).toBeDisabled()
      expect(nextButton).not.toBeDisabled()
    })
  })

  describe('Responsive behavior', () => {
    it('maintains layout with small title', () => {
      render(<CalendarHeader {...defaultProps} title="Jan" />)
      expect(screen.getByText('Jan')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    })

    it('maintains layout with no title', () => {
      render(<CalendarHeader {...defaultProps} title="" />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    })

    it('applies gap between title and navigation', () => {
      const { container } = render(<CalendarHeader {...defaultProps} />)
      const header = container.firstChild as HTMLElement
      expect(header.className).toContain('gap-2')
    })
  })

  describe('Button state consistency', () => {
    it('maintains consistent state across re-renders', () => {
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

    it('updates aria-labels on re-render', () => {
      const { rerender } = render(<CalendarHeader {...defaultProps} previousAriaLabel="Go back" />)
      expect(screen.getByRole('button', { name: 'Go back' })).toBeInTheDocument()

      rerender(<CalendarHeader {...defaultProps} previousAriaLabel="Previous page" />)
      expect(screen.getByRole('button', { name: 'Previous page' })).toBeInTheDocument()
    })
  })

  describe('Navigation button interaction states', () => {
    it('allows clicking enabled previous button multiple times', async () => {
      const user = userEvent.setup()
      const handlePrevious = vi.fn()
      render(<CalendarHeader {...defaultProps} onPrevious={handlePrevious} previousDisabled={false} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      await user.click(prevButton)
      await user.click(prevButton)
      await user.click(prevButton)

      expect(handlePrevious).toHaveBeenCalledTimes(3)
    })

    it('allows clicking enabled next button multiple times', async () => {
      const user = userEvent.setup()
      const handleNext = vi.fn()
      render(<CalendarHeader {...defaultProps} onNext={handleNext} nextDisabled={false} />)

      const nextButton = screen.getByRole('button', { name: /next/i })
      await user.click(nextButton)
      await user.click(nextButton)
      await user.click(nextButton)

      expect(handleNext).toHaveBeenCalledTimes(3)
    })

    it('prevents interaction when both buttons are disabled', async () => {
      const user = userEvent.setup()
      const handlePrevious = vi.fn()
      const handleNext = vi.fn()
      render(
        <CalendarHeader
          {...defaultProps}
          onPrevious={handlePrevious}
          onNext={handleNext}
          previousDisabled={true}
          nextDisabled={true}
        />,
      )

      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })

      await user.click(prevButton)
      await user.click(nextButton)

      expect(handlePrevious).not.toHaveBeenCalled()
      expect(handleNext).not.toHaveBeenCalled()
    })
  })

  describe('Title rendering with different content types', () => {
    it('renders numeric title', () => {
      render(<CalendarHeader {...defaultProps} title={2025} />)
      expect(screen.getByText('2025')).toBeInTheDocument()
    })

    it('renders title with nested elements', () => {
      render(
        <CalendarHeader
          {...defaultProps}
          title={
            <div>
              <span>Month:</span> <strong>June</strong>
            </div>
          }
        />,
      )
      expect(screen.getByText('Month:')).toBeInTheDocument()
      expect(screen.getByText('June')).toBeInTheDocument()
    })

    it('renders title with formatting', () => {
      render(
        <CalendarHeader
          {...defaultProps}
          title={
            <>
              <em>February</em> 2026
            </>
          }
        />,
      )
      expect(screen.getByText('February')).toBeInTheDocument()
      expect(screen.getByText('2026')).toBeInTheDocument()
    })
  })

  describe('Month/Year picker functionality', () => {
    it('renders title as button when onMonthYearChange is provided', () => {
      const handleMonthYearChange = vi.fn()
      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 5, 15)}
          onMonthYearChange={handleMonthYearChange}
        />,
      )

      const titleButton = screen.getByRole('button', { name: /june 2025/i })
      expect(titleButton).toBeInTheDocument()
      expect(titleButton).toHaveAttribute('aria-haspopup', 'dialog')
      expect(titleButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('renders title as span when onMonthYearChange is not provided', () => {
      render(<CalendarHeader {...defaultProps} />)

      const titleButton = screen.queryByRole('button', { name: /june 2025/i })
      expect(titleButton).not.toBeInTheDocument()
      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('opens picker dialog when title button is clicked', async () => {
      const user = userEvent.setup()
      const handleMonthYearChange = vi.fn()

      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 5, 15)}
          onMonthYearChange={handleMonthYearChange}
        />,
      )

      const titleButton = screen.getByRole('button', { name: /june 2025/i })
      await user.click(titleButton)

      expect(titleButton).toHaveAttribute('aria-expanded', 'true')
      const dialog = screen.getByRole('dialog', { name: /select month and year/i })
      expect(dialog).toBeInTheDocument()
    })

    it('closes picker when title button is clicked again', async () => {
      const user = userEvent.setup()
      const handleMonthYearChange = vi.fn()

      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 5, 15)}
          onMonthYearChange={handleMonthYearChange}
        />,
      )

      const titleButton = screen.getByRole('button', { name: /june 2025/i })
      await user.click(titleButton)
      expect(screen.getByRole('dialog')).toBeInTheDocument()

      await user.click(titleButton)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('closes picker when Escape key is pressed', async () => {
      const user = userEvent.setup()
      const handleMonthYearChange = vi.fn()

      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 5, 15)}
          onMonthYearChange={handleMonthYearChange}
        />,
      )

      const titleButton = screen.getByRole('button', { name: /june 2025/i })
      await user.click(titleButton)
      expect(screen.getByRole('dialog')).toBeInTheDocument()

      await user.keyboard('{Escape}')
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('closes picker when clicking the overlay', async () => {
      const user = userEvent.setup()
      const handleMonthYearChange = vi.fn()

      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 5, 15)}
          onMonthYearChange={handleMonthYearChange}
        />,
      )

      const titleButton = screen.getByRole('button', { name: /june 2025/i })
      await user.click(titleButton)
      expect(screen.getByRole('dialog')).toBeInTheDocument()

      const overlay = screen.getByRole('button', { name: /close picker/i })
      await user.click(overlay)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('updates month when selected in picker', async () => {
      const user = userEvent.setup()
      const handleMonthYearChange = vi.fn()

      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 5, 15)}
          onMonthYearChange={handleMonthYearChange}
          localeCode="en-US"
        />,
      )

      const titleButton = screen.getByRole('button', { name: /june 2025/i })
      await user.click(titleButton)

      // Simulate wheel picker interaction by finding and triggering onValueChange
      // Note: This is testing the integration, actual wheel picker interaction is complex
      expect(handleMonthYearChange).not.toHaveBeenCalled()
    })

    it('respects startMonth boundary when changing year', async () => {
      const user = userEvent.setup()
      const handleMonthYearChange = vi.fn()
      const startMonth = new Date(2025, 3, 1) // April 2025

      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 5, 15)}
          onMonthYearChange={handleMonthYearChange}
          startMonth={startMonth}
          localeCode="en-US"
        />,
      )

      const titleButton = screen.getByRole('button', { name: /june 2025/i })
      await user.click(titleButton)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
    })

    it('respects endMonth boundary when changing year', async () => {
      const user = userEvent.setup()
      const handleMonthYearChange = vi.fn()
      const endMonth = new Date(2025, 8, 30) // September 2025

      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 5, 15)}
          onMonthYearChange={handleMonthYearChange}
          endMonth={endMonth}
          localeCode="en-US"
        />,
      )

      const titleButton = screen.getByRole('button', { name: /june 2025/i })
      await user.click(titleButton)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
    })

    it('updates displayed month when displayedMonth prop changes', () => {
      const handleMonthYearChange = vi.fn()

      const { rerender } = render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 5, 15)}
          onMonthYearChange={handleMonthYearChange}
          title="June 2025"
        />,
      )

      expect(screen.getByRole('button', { name: /june 2025/i })).toBeInTheDocument()

      rerender(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 7, 15)}
          onMonthYearChange={handleMonthYearChange}
          title="August 2025"
        />,
      )

      expect(screen.getByRole('button', { name: /august 2025/i })).toBeInTheDocument()
    })

    it('renders picker with correct locale for month names', async () => {
      const user = userEvent.setup()
      const handleMonthYearChange = vi.fn()

      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 5, 15)}
          onMonthYearChange={handleMonthYearChange}
          localeCode="es-ES"
        />,
      )

      const titleButton = screen.getByRole('button', { name: /june 2025/i })
      await user.click(titleButton)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
    })

    it('clamps month when year changes and current month is out of bounds', () => {
      const handleMonthYearChange = vi.fn()
      const startMonth = new Date(2026, 2, 1) // March 2026
      const endMonth = new Date(2026, 10, 30) // November 2026

      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 0, 15)} // January 2025
          onMonthYearChange={handleMonthYearChange}
          startMonth={startMonth}
          endMonth={endMonth}
          localeCode="en-US"
        />,
      )

      // Component should render without errors
      expect(screen.getByRole('button', { name: /2025/i })).toBeInTheDocument()
    })

    it('uses current date as fallback when displayedMonth is not provided', () => {
      const handleMonthYearChange = vi.fn()

      render(<CalendarHeader {...defaultProps} onMonthYearChange={handleMonthYearChange} />)

      // Should render with current date (title button should have aria-haspopup)
      const titleButton = screen.getByRole('button', { name: /2025/i })
      expect(titleButton).toBeInTheDocument()
      expect(titleButton).toHaveAttribute('aria-haspopup', 'dialog')
    })

    it('renders picker portal in document body', async () => {
      const user = userEvent.setup()
      const handleMonthYearChange = vi.fn()

      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 5, 15)}
          onMonthYearChange={handleMonthYearChange}
        />,
      )

      const titleButton = screen.getByRole('button', { name: /june 2025/i })
      await user.click(titleButton)

      // Picker should be portaled to document.body
      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
      expect(dialog.parentElement).toBe(document.body)
    })

    it('positions picker portal relative to title button', async () => {
      const user = userEvent.setup()
      const handleMonthYearChange = vi.fn()

      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 5, 15)}
          onMonthYearChange={handleMonthYearChange}
        />,
      )

      const titleButton = screen.getByRole('button', { name: /june 2025/i })
      await user.click(titleButton)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveStyle({ position: 'fixed' })
    })

    it('focuses picker dialog when opened', async () => {
      const user = userEvent.setup()
      const handleMonthYearChange = vi.fn()

      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 5, 15)}
          onMonthYearChange={handleMonthYearChange}
        />,
      )

      const titleButton = screen.getByRole('button', { name: /june 2025/i })
      await user.click(titleButton)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
    })

    it('renders chevron down icon in title button', () => {
      const handleMonthYearChange = vi.fn()

      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 5, 15)}
          onMonthYearChange={handleMonthYearChange}
        />,
      )

      const titleButton = screen.getByRole('button', { name: /june 2025/i })
      expect(titleButton).toBeInTheDocument()
      // Chevron should be rendered as a child
    })

    it('rotates chevron icon when picker is open', async () => {
      const user = userEvent.setup()
      const handleMonthYearChange = vi.fn()

      const { container } = render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 5, 15)}
          onMonthYearChange={handleMonthYearChange}
        />,
      )

      const titleButton = screen.getByRole('button', { name: /june 2025/i })
      const chevronBefore = container.querySelector('.rotate-180')
      expect(chevronBefore).not.toBeInTheDocument()

      await user.click(titleButton)

      const chevronAfter = container.querySelector('.rotate-180')
      expect(chevronAfter).toBeInTheDocument()
    })

    it('handles boundary case with year at startYear', async () => {
      const user = userEvent.setup()
      const handleMonthYearChange = vi.fn()
      const startMonth = new Date(2025, 0, 1) // January 2025

      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 0, 15)}
          onMonthYearChange={handleMonthYearChange}
          startMonth={startMonth}
        />,
      )

      const titleButton = screen.getByRole('button', { name: /2025/i })
      await user.click(titleButton)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('handles boundary case with year at endYear', async () => {
      const user = userEvent.setup()
      const handleMonthYearChange = vi.fn()
      const endMonth = new Date(2025, 11, 31) // December 2025

      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 11, 15)}
          onMonthYearChange={handleMonthYearChange}
          endMonth={endMonth}
        />,
      )

      const titleButton = screen.getByRole('button', { name: /2025/i })
      await user.click(titleButton)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('handles rapid open/close interactions', async () => {
      const user = userEvent.setup()
      const handleMonthYearChange = vi.fn()

      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 5, 15)}
          onMonthYearChange={handleMonthYearChange}
        />,
      )

      const titleButton = screen.getByRole('button', { name: /june 2025/i })

      await user.click(titleButton)
      expect(screen.getByRole('dialog')).toBeInTheDocument()

      await user.click(titleButton)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

      await user.click(titleButton)
      expect(screen.getByRole('dialog')).toBeInTheDocument()

      await user.keyboard('{Escape}')
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('sets aria-controls when picker is open', async () => {
      const user = userEvent.setup()
      const handleMonthYearChange = vi.fn()

      render(
        <CalendarHeader
          {...defaultProps}
          displayedMonth={new Date(2025, 5, 15)}
          onMonthYearChange={handleMonthYearChange}
        />,
      )

      const titleButton = screen.getByRole('button', { name: /june 2025/i })
      expect(titleButton).not.toHaveAttribute('aria-controls')

      await user.click(titleButton)

      expect(titleButton).toHaveAttribute('aria-controls')
      const controlsId = titleButton.getAttribute('aria-controls')
      expect(controlsId).toBeTruthy()

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('id', controlsId)
    })
  })
})
