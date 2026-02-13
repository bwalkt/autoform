import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Theme } from '@/elements/Theme'
import { MiniCalendar } from './MiniCalendar'

function getDateButton(container: HTMLElement, dayNumber: number): HTMLButtonElement {
  // Get all date buttons (those with aria-pressed attribute)
  const dateButtons = within(container).queryAllByRole('button')
  const button = dateButtons.find(btn => {
    const ariaLabel = btn.getAttribute('aria-label')
    // Match "Month Day, Year" pattern where Day matches our dayNumber
    return ariaLabel && new RegExp(`\\b${dayNumber},\\s+\\d{4}$`, 'i').test(ariaLabel)
  })

  if (!button || !(button instanceof HTMLButtonElement)) {
    throw new Error(`Could not find date button for day ${dayNumber}`)
  }
  return button
}

afterEach(() => {
  cleanup()
})

describe('MiniCalendar', () => {
  describe('Basic rendering', () => {
    it('renders with default props', () => {
      const { container } = render(<MiniCalendar />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('displays current month and year by default', () => {
      const now = new Date()
      render(<MiniCalendar />)
      const monthYear = screen.getByText(
        new RegExp(`${now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`, 'i'),
      )
      expect(monthYear).toBeInTheDocument()
    })

    it('renders week days in correct order (Sunday first by default)', () => {
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} />)
      const labels = container.querySelectorAll('.text-muted-foreground')
      const weekDayLabels = Array.from(labels).slice(0, 7)
      expect(weekDayLabels).toHaveLength(7)
    })

    it('renders 7 day buttons for the current week', () => {
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} />)
      const dayButtons = container.querySelectorAll('button[aria-pressed]')
      expect(dayButtons).toHaveLength(7)
    })

    it('applies custom className', () => {
      const { container } = render(<MiniCalendar className="custom-calendar-class" />)
      const calendar = container.querySelector('.custom-calendar-class')
      expect(calendar).toBeInTheDocument()
    })
  })

  describe('Controlled vs Uncontrolled', () => {
    it('works in uncontrolled mode', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      const { container } = render(<MiniCalendar onChange={handleChange} />)

      // Click a date button to trigger onChange
      const dateButtons = container.querySelectorAll('button[aria-pressed]')
      expect(dateButtons.length).toBeGreaterThan(0)
      const firstDateButton = dateButtons[0] as HTMLButtonElement
      await user.click(firstDateButton)

      expect(handleChange).toHaveBeenCalled()
    })

    it('works in controlled mode', async () => {
      const user = userEvent.setup()

      function ControlledCalendar() {
        const [date, setDate] = React.useState(new Date(2026, 1, 11))
        return (
          <div>
            <MiniCalendar value={date} onChange={setDate} />
            <p data-testid="selected-date">{date.toLocaleDateString()}</p>
          </div>
        )
      }

      const { container } = render(<ControlledCalendar />)
      const initialDate = screen.getByTestId('selected-date').textContent

      // Click a different date to change selection
      const button12 = getDateButton(container, 12)
      await user.click(button12)

      const newDate = screen.getByTestId('selected-date').textContent
      expect(newDate).not.toBe(initialDate)
    })

    it('syncs internal state when controlled value changes', () => {
      const { rerender } = render(<MiniCalendar value={new Date(2026, 1, 11)} />)

      rerender(<MiniCalendar value={new Date(2026, 2, 15)} />)

      expect(screen.getByText(/March 2026/i)).toBeInTheDocument()
    })
  })

  describe('Date selection', () => {
    it('calls onChange when date is clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} onChange={handleChange} />)

      const dateButton = getDateButton(container, 12)
      await user.click(dateButton)

      expect(handleChange).toHaveBeenCalledTimes(1)
      const selectedDate = handleChange.mock.calls[0]?.[0] as Date
      expect(selectedDate.getDate()).toBe(12)
    })

    it('highlights the selected date', () => {
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} />)

      const selectedButton = getDateButton(container, 11)
      expect(selectedButton).toHaveAttribute('aria-pressed', 'true')
      expect(selectedButton.className).toContain('bg-[var(--mini-cal-accent)]')
    })

    it('highlights today with special styling', () => {
      const today = new Date()
      // Use today as the value so it's guaranteed to be in the visible week
      const { container } = render(<MiniCalendar value={today} />)

      const todayButton = getDateButton(container, today.getDate())
      expect(todayButton).toHaveAttribute('aria-current', 'date')
      // Today should have the soft background styling if not selected
      // If today is selected (value = today), it will have accent styling instead
      const hasAccentStyling = todayButton.className.includes('bg-[var(--mini-cal-accent)]')
      const hasSoftStyling = todayButton.className.includes('bg-[var(--mini-cal-soft)]')
      expect(hasAccentStyling || hasSoftStyling).toBe(true)
    })

    it('updates current week when date outside current week is selected', async () => {
      const user = userEvent.setup()

      function TestCalendar() {
        const [date, setDate] = React.useState(new Date(2026, 1, 11))
        return <MiniCalendar value={date} onChange={setDate} />
      }

      const { container } = render(<TestCalendar />)

      const nextWeekButton = screen.getByRole('button', { name: /next week/i })
      await user.click(nextWeekButton)

      const newDateButton = getDateButton(container, 18)
      expect(newDateButton).toBeInTheDocument()
    })
  })

  describe('Week navigation', () => {
    it('renders previous and next week buttons', () => {
      render(<MiniCalendar value={new Date(2026, 1, 11)} />)

      expect(screen.getByRole('button', { name: /previous week/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /next week/i })).toBeInTheDocument()
    })

    it('navigates to previous week when previous button clicked', async () => {
      const user = userEvent.setup()
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} />)

      const prevButton = screen.getByRole('button', { name: /previous week/i })
      await user.click(prevButton)

      const button4 = getDateButton(container, 4)
      expect(button4).toBeInTheDocument()
    })

    it('navigates to next week when next button clicked', async () => {
      const user = userEvent.setup()
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} />)

      const nextButton = screen.getByRole('button', { name: /next week/i })
      await user.click(nextButton)

      const button18 = getDateButton(container, 18)
      expect(button18).toBeInTheDocument()
    })

    it('crosses month boundaries when navigating', async () => {
      const user = userEvent.setup()
      render(<MiniCalendar value={new Date(2026, 1, 1)} />)

      expect(screen.getByText(/February 2026/i)).toBeInTheDocument()

      const prevButton = screen.getByRole('button', { name: /previous week/i })
      await user.click(prevButton)

      expect(screen.getByText(/January 2026/i)).toBeInTheDocument()
    })

    it('crosses year boundaries when navigating', async () => {
      const user = userEvent.setup()
      render(<MiniCalendar value={new Date(2026, 0, 1)} />)

      expect(screen.getByText(/January 2026/i)).toBeInTheDocument()

      const prevButton = screen.getByRole('button', { name: /previous week/i })
      await user.click(prevButton)

      expect(screen.getByText(/December 2025/i)).toBeInTheDocument()
    })
  })

  describe('Min/Max date constraints', () => {
    it('disables dates before minDate', () => {
      const minDate = new Date(2026, 1, 10)
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} minDate={minDate} />)

      const button9 = getDateButton(container, 9)
      expect(button9).toBeDisabled()
    })

    it('disables dates after maxDate', () => {
      const maxDate = new Date(2026, 1, 12)
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} maxDate={maxDate} />)

      const button13 = getDateButton(container, 13)
      expect(button13).toBeDisabled()
    })

    it('allows dates within min and max range', () => {
      const minDate = new Date(2026, 1, 10)
      const maxDate = new Date(2026, 1, 14)
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} minDate={minDate} maxDate={maxDate} />)

      const button11 = getDateButton(container, 11)
      const button12 = getDateButton(container, 12)
      expect(button11).not.toBeDisabled()
      expect(button12).not.toBeDisabled()
    })

    it('prevents selecting disabled dates', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      const minDate = new Date(2026, 1, 10)
      const { container } = render(
        <MiniCalendar value={new Date(2026, 1, 11)} minDate={minDate} onChange={handleChange} />,
      )

      const button9 = getDateButton(container, 9)
      await user.click(button9)

      expect(handleChange).not.toHaveBeenCalled()
    })

    it('handles minDate and maxDate on same day', () => {
      const date = new Date(2026, 1, 11)
      const { container } = render(<MiniCalendar value={date} minDate={date} maxDate={date} />)

      const button11 = getDateButton(container, 11)
      expect(button11).not.toBeDisabled()

      const button10 = getDateButton(container, 10)
      const button12 = getDateButton(container, 12)
      expect(button10).toBeDisabled()
      expect(button12).toBeDisabled()
    })
  })

  describe('Disabled state', () => {
    it('disables all interactions when disabled prop is true', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} disabled onChange={handleChange} />)

      const prevButton = screen.getByRole('button', { name: /previous week/i })
      const nextButton = screen.getByRole('button', { name: /next week/i })
      const dateButton = getDateButton(container, 11)

      expect(prevButton).toBeDisabled()
      expect(nextButton).toBeDisabled()

      await user.click(dateButton)
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('applies opacity when disabled', () => {
      const { container } = render(<MiniCalendar disabled />)
      const calendar = container.firstChild as HTMLElement
      expect(calendar.className).toContain('opacity-50')
    })

    it('applies pointer-events-none when disabled', () => {
      const { container } = render(<MiniCalendar disabled />)
      const calendar = container.firstChild as HTMLElement
      expect(calendar.className).toContain('pointer-events-none')
    })
  })

  describe('Compact mode', () => {
    it('applies smaller sizing in compact mode', () => {
      render(<MiniCalendar compact />)
      const title = screen.getByText(/2026/i)
      expect(title.className).toContain('text-sm')
    })

    it('applies standard sizing in normal mode', () => {
      render(<MiniCalendar />)
      const title = screen.getByText(/2026/i)
      expect(title.className).toContain('text-[1.125rem]')
    })

    it('uses different button sizes for compact mode', () => {
      const { container } = render(<MiniCalendar compact value={new Date(2026, 1, 11)} />)
      const calendar = container.firstChild as HTMLElement
      const style = calendar.getAttribute('style')
      expect(style).toContain('--mini-cal-cell-size: 2.25rem')
    })

    it('uses different button sizes for normal mode', () => {
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} />)
      const calendar = container.firstChild as HTMLElement
      const style = calendar.getAttribute('style')
      expect(style).toContain('--mini-cal-cell-size: 2.75rem')
    })
  })

  describe('Show/hide header', () => {
    it('shows header by default', () => {
      render(<MiniCalendar />)
      expect(screen.getByRole('button', { name: /previous week/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /next week/i })).toBeInTheDocument()
    })

    it('hides header when showHeader is false', () => {
      render(<MiniCalendar showHeader={false} />)
      expect(screen.queryByRole('button', { name: /previous week/i })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /next week/i })).not.toBeInTheDocument()
    })

    it('still shows week days when header is hidden', () => {
      const { container } = render(<MiniCalendar showHeader={false} value={new Date(2026, 1, 11)} />)
      const labels = container.querySelectorAll('.text-muted-foreground')
      expect(labels.length).toBeGreaterThan(0)
    })
  })

  describe('Week starts on', () => {
    it('starts week on Sunday by default (weekStartsOn=0)', () => {
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} weekStartsOn={0} />)
      const button8 = getDateButton(container, 8)
      expect(button8).toBeInTheDocument()
    })

    it('starts week on Monday when weekStartsOn=1', () => {
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} weekStartsOn={1} />)
      const button9 = getDateButton(container, 9)
      expect(button9).toBeInTheDocument()
    })

    it('starts week on Saturday when weekStartsOn=6', () => {
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} weekStartsOn={6} />)
      const button7 = getDateButton(container, 7)
      expect(button7).toBeInTheDocument()
    })
  })

  describe('Theme integration', () => {
    it('uses theme calendar radius when radius prop not provided', () => {
      const { container } = render(
        <Theme calendar={{ radius: 'full' }}>
          <MiniCalendar value={new Date(2026, 1, 11)} />
        </Theme>,
      )

      const calendar = container.querySelector('[style*="--mini-cal-radius"]') as HTMLElement
      expect(calendar).toBeInTheDocument()
    })

    it('uses theme radius when neither radius prop nor calendar radius provided', () => {
      const { container } = render(
        <Theme radius="lg">
          <MiniCalendar value={new Date(2026, 1, 11)} />
        </Theme>,
      )

      const calendar = container.querySelector('[style*="--mini-cal-radius"]') as HTMLElement
      expect(calendar).toBeInTheDocument()
    })

    it('uses theme calendar navButtonBordered when prop not provided', () => {
      render(
        <Theme calendar={{ navButtonBordered: true }}>
          <MiniCalendar value={new Date(2026, 1, 11)} />
        </Theme>,
      )

      const prevButton = screen.getByRole('button', { name: /previous week/i })
      expect(prevButton.className).toContain('border-[var(--rdp-accent-color)]')
    })

    it('overrides theme with explicit radius prop', () => {
      const { container } = render(
        <Theme calendar={{ radius: 'sm' }}>
          <MiniCalendar radius="full" value={new Date(2026, 1, 11)} />
        </Theme>,
      )

      const calendar = container.querySelector('[style*="--mini-cal-radius"]') as HTMLElement
      expect(calendar).toBeInTheDocument()
    })

    it('overrides theme with explicit navButtonBordered prop', () => {
      render(
        <Theme calendar={{ navButtonBordered: true }}>
          <MiniCalendar navButtonBordered={false} value={new Date(2026, 1, 11)} />
        </Theme>,
      )

      const prevButton = screen.getByRole('button', { name: /previous week/i })
      expect(prevButton.className).toContain('bg-[var(--rdp-accent-background-color)]')
    })
  })

  describe('Color resolution', () => {
    it('applies default color scheme', () => {
      const { container } = render(<MiniCalendar color="default" />)
      const calendar = container.firstChild as HTMLElement
      const style = calendar.getAttribute('style')
      expect(style).toContain('--mini-cal-accent')
    })

    it('applies primary color scheme', () => {
      const { container } = render(<MiniCalendar color="primary" />)
      const calendar = container.firstChild as HTMLElement
      const style = calendar.getAttribute('style')
      expect(style).toContain('--mini-cal-accent')
    })

    it('applies success color scheme', () => {
      const { container } = render(<MiniCalendar color="success" />)
      const calendar = container.firstChild as HTMLElement
      const style = calendar.getAttribute('style')
      expect(style).toContain('--mini-cal-accent')
    })

    it('applies error color scheme', () => {
      const { container } = render(<MiniCalendar color="error" />)
      const calendar = container.firstChild as HTMLElement
      const style = calendar.getAttribute('style')
      expect(style).toContain('--mini-cal-accent')
    })

    it('applies warning color scheme', () => {
      const { container } = render(<MiniCalendar color="warning" />)
      const calendar = container.firstChild as HTMLElement
      const style = calendar.getAttribute('style')
      expect(style).toContain('--mini-cal-accent')
    })

    it('applies info color scheme', () => {
      const { container } = render(<MiniCalendar color="info" />)
      const calendar = container.firstChild as HTMLElement
      const style = calendar.getAttribute('style')
      expect(style).toContain('--mini-cal-accent')
    })

    it('applies neutral color scheme', () => {
      const { container } = render(<MiniCalendar color="neutral" />)
      const calendar = container.firstChild as HTMLElement
      const style = calendar.getAttribute('style')
      expect(style).toContain('--mini-cal-accent')
    })
  })

  describe('CSS custom properties', () => {
    it('sets all required CSS variables', () => {
      const { container } = render(<MiniCalendar />)
      const calendar = container.firstChild as HTMLElement
      const style = calendar.getAttribute('style')

      expect(style).toContain('--mini-cal-radius')
      expect(style).toContain('--mini-cal-accent')
      expect(style).toContain('--mini-cal-soft')
      expect(style).toContain('--mini-cal-fg')
      expect(style).toContain('--mini-cal-cell-size')
    })
  })

  describe('Accessibility', () => {
    it('renders date buttons with aria-pressed attribute', () => {
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} />)
      const dayButtons = container.querySelectorAll('button[aria-pressed]')
      expect(dayButtons).toHaveLength(7)
    })

    it('marks selected date with aria-pressed="true"', () => {
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} />)
      const selectedButton = getDateButton(container, 11)
      expect(selectedButton).toHaveAttribute('aria-pressed', 'true')
    })

    it('marks today with aria-current="date"', () => {
      const today = new Date()
      const { container } = render(<MiniCalendar value={today} />)
      const todayButton = getDateButton(container, today.getDate())
      expect(todayButton).toHaveAttribute('aria-current', 'date')
    })

    it('provides descriptive aria-labels for date buttons', () => {
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} />)
      const button11 = getDateButton(container, 11)
      expect(button11).toHaveAttribute('aria-label')
      expect(button11.getAttribute('aria-label')).toMatch(/Wednesday, February 11, 2026/i)
    })

    it('provides aria-labels for navigation buttons', () => {
      render(<MiniCalendar />)
      expect(screen.getByRole('button', { name: /previous week/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /next week/i })).toBeInTheDocument()
    })
  })

  describe('Radius options', () => {
    it('applies none radius', () => {
      const { container } = render(<MiniCalendar radius="none" />)
      const calendar = container.firstChild as HTMLElement
      expect(calendar).toBeInTheDocument()
    })

    it('applies sm radius', () => {
      const { container } = render(<MiniCalendar radius="sm" />)
      const calendar = container.firstChild as HTMLElement
      expect(calendar).toBeInTheDocument()
    })

    it('applies md radius', () => {
      const { container } = render(<MiniCalendar radius="md" />)
      const calendar = container.firstChild as HTMLElement
      expect(calendar).toBeInTheDocument()
    })

    it('applies lg radius', () => {
      const { container } = render(<MiniCalendar radius="lg" />)
      const calendar = container.firstChild as HTMLElement
      expect(calendar).toBeInTheDocument()
    })

    it('applies full radius', () => {
      const { container } = render(<MiniCalendar radius="full" />)
      const calendar = container.firstChild as HTMLElement
      expect(calendar).toBeInTheDocument()
    })
  })

  describe('Edge cases', () => {
    it('handles leap year dates', () => {
      const { container } = render(<MiniCalendar value={new Date(2024, 1, 29)} />)
      const button29 = getDateButton(container, 29)
      expect(button29).toBeInTheDocument()
    })

    it('handles end of month transitions', async () => {
      const user = userEvent.setup()
      render(<MiniCalendar value={new Date(2026, 0, 31)} />)

      expect(screen.getByText(/January 2026/i)).toBeInTheDocument()

      const nextButton = screen.getByRole('button', { name: /next week/i })
      await user.click(nextButton)

      expect(screen.getByText(/February 2026/i)).toBeInTheDocument()
    })

    it('handles selecting dates in different weeks', async () => {
      const user = userEvent.setup()

      function TestCalendar() {
        const [date, setDate] = React.useState(new Date(2026, 1, 11))
        return (
          <div>
            <MiniCalendar value={date} onChange={setDate} />
            <p data-testid="date">{date.getDate()}</p>
          </div>
        )
      }

      const { container } = render(<TestCalendar />)

      expect(screen.getByTestId('date')).toHaveTextContent('11')

      const nextButton = screen.getByRole('button', { name: /next week/i })
      await user.click(nextButton)

      const button18 = getDateButton(container, 18)
      await user.click(button18)

      expect(screen.getByTestId('date')).toHaveTextContent('18')
    })

    it('handles uncontrolled mode with no initial value', async () => {
      const user = userEvent.setup()
      render(<MiniCalendar />)

      const nextButton = screen.getByRole('button', { name: /next week/i })
      await user.click(nextButton)

      expect(nextButton).toBeInTheDocument()
    })

    it('handles onChange being undefined', async () => {
      const user = userEvent.setup()
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} />)

      const button12 = getDateButton(container, 12)
      await user.click(button12)

      expect(button12).toBeInTheDocument()
    })

    it('handles minDate being undefined', () => {
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} />)
      const button10 = getDateButton(container, 10)
      expect(button10).not.toBeDisabled()
    })

    it('handles maxDate being undefined', () => {
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} />)
      const button12 = getDateButton(container, 12)
      expect(button12).not.toBeDisabled()
    })

    it('normalizes time differences in date comparisons', () => {
      const dateWithTime = new Date(2026, 1, 11, 15, 30, 45)
      const minDateWithTime = new Date(2026, 1, 10, 8, 15, 20)
      const { container } = render(<MiniCalendar value={dateWithTime} minDate={minDateWithTime} />)

      const button9 = getDateButton(container, 9)
      expect(button9).toBeDisabled()

      const button10 = getDateButton(container, 10)
      expect(button10).not.toBeDisabled()
    })

    it('maintains selection when navigating weeks', async () => {
      const user = userEvent.setup()

      function TestCalendar() {
        const [date, setDate] = React.useState(new Date(2026, 1, 11))
        return (
          <div>
            <MiniCalendar value={date} onChange={setDate} />
            <p data-testid="selected">{date.getDate()}</p>
          </div>
        )
      }

      render(<TestCalendar />)

      expect(screen.getByTestId('selected')).toHaveTextContent('11')

      const nextButton = screen.getByRole('button', { name: /next week/i })
      await user.click(nextButton)
      await user.click(nextButton)

      expect(screen.getByTestId('selected')).toHaveTextContent('11')
    })
  })

  describe('Component display name', () => {
    it('has correct displayName', () => {
      expect(MiniCalendar.displayName).toBe('MiniCalendar')
    })
  })

  describe('Ref forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<MiniCalendar ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Navigation button styling', () => {
    it('applies correct styling to navigation buttons with bordered=false', () => {
      render(<MiniCalendar navButtonBordered={false} value={new Date(2026, 1, 11)} />)
      const prevButton = screen.getByRole('button', { name: /previous week/i })
      expect(prevButton.className).toContain('bg-[var(--rdp-accent-background-color)]')
    })

    it('applies correct styling to navigation buttons with bordered=true', () => {
      render(<MiniCalendar navButtonBordered={true} value={new Date(2026, 1, 11)} />)
      const prevButton = screen.getByRole('button', { name: /previous week/i })
      expect(prevButton.className).toContain('border-[var(--rdp-accent-color)]')
    })
  })

  describe('Multiple rapid interactions', () => {
    it('handles rapid navigation clicks', async () => {
      const user = userEvent.setup()
      render(<MiniCalendar value={new Date(2026, 1, 11)} />)

      const nextButton = screen.getByRole('button', { name: /next week/i })
      await user.click(nextButton)
      await user.click(nextButton)
      await user.click(nextButton)

      expect(screen.getByText(/March 2026/i)).toBeInTheDocument()
    })

    it('handles rapid date selections', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} onChange={handleChange} />)

      const button11 = getDateButton(container, 11)
      const button12 = getDateButton(container, 12)
      const button13 = getDateButton(container, 13)

      await user.click(button11)
      await user.click(button12)
      await user.click(button13)

      expect(handleChange).toHaveBeenCalledTimes(3)
    })
  })

  describe('Date formatting', () => {
    it('formats month and year correctly', () => {
      render(<MiniCalendar value={new Date(2026, 1, 11)} />)
      expect(screen.getByText(/February 2026/i)).toBeInTheDocument()
    })

    it('formats week day labels correctly', () => {
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} />)
      const labels = container.querySelectorAll('.text-muted-foreground')
      expect(labels.length).toBeGreaterThan(0)
    })
  })

  describe('Additional comprehensive and regression tests', () => {
    it('handles selecting dates at month boundaries correctly', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      const { container } = render(<MiniCalendar value={new Date(2026, 0, 31)} onChange={handleChange} />)

      const button31 = getDateButton(container, 31)
      await user.click(button31)

      expect(handleChange).toHaveBeenCalled()
      const selectedDate = handleChange.mock.calls[0]?.[0] as Date
      expect(selectedDate.getDate()).toBe(31)
      expect(selectedDate.getMonth()).toBe(0)
    })

    it('handles year transitions correctly with week navigation', async () => {
      const user = userEvent.setup()
      render(<MiniCalendar value={new Date(2025, 11, 31)} />)

      expect(screen.getByText(/December 2025/i)).toBeInTheDocument()

      const nextButton = screen.getByRole('button', { name: /next week/i })
      await user.click(nextButton)

      expect(screen.getByText(/January 2026/i)).toBeInTheDocument()
    })

    it('handles navigating backward across year boundary', async () => {
      const user = userEvent.setup()
      render(<MiniCalendar value={new Date(2026, 0, 3)} />)

      expect(screen.getByText(/January 2026/i)).toBeInTheDocument()

      const prevButton = screen.getByRole('button', { name: /previous week/i })
      await user.click(prevButton)

      expect(screen.getByText(/December 2025/i)).toBeInTheDocument()
    })

    it('resolves calendar colors for all color tokens correctly', () => {
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
        const { container, unmount } = render(<MiniCalendar color={color} value={new Date(2026, 1, 11)} />)
        const calendar = container.firstChild as HTMLElement
        const style = calendar.getAttribute('style')
        expect(style).toContain('--mini-cal-accent')
        expect(style).toContain('--mini-cal-soft')
        expect(style).toContain('--mini-cal-fg')
        unmount()
      }
    })

    it('handles all weekStartsOn values correctly', () => {
      const weekStarts: Array<0 | 1 | 2 | 3 | 4 | 5 | 6> = [0, 1, 2, 3, 4, 5, 6]

      for (const weekStartsOn of weekStarts) {
        const { container, unmount } = render(<MiniCalendar value={new Date(2026, 1, 11)} weekStartsOn={weekStartsOn} />)
        const dayButtons = container.querySelectorAll('button[aria-pressed]')
        expect(dayButtons).toHaveLength(7)
        unmount()
      }
    })

    it('handles disabled dates at week boundaries', () => {
      const { container } = render(
        <MiniCalendar
          value={new Date(2026, 1, 11)}
          minDate={new Date(2026, 1, 9)}
          maxDate={new Date(2026, 1, 13)}
        />,
      )

      const button8 = getDateButton(container, 8)
      const button14 = getDateButton(container, 14)

      expect(button8).toBeDisabled()
      expect(button14).toBeDisabled()
    })

    it('maintains correct week display when value changes externally', () => {
      const { rerender } = render(<MiniCalendar value={new Date(2026, 1, 11)} />)

      expect(screen.getByText(/February 2026/i)).toBeInTheDocument()

      rerender(<MiniCalendar value={new Date(2026, 2, 20)} />)

      expect(screen.getByText(/March 2026/i)).toBeInTheDocument()
    })

    it('handles selecting today with isToday styling', () => {
      const today = new Date()
      const { container } = render(<MiniCalendar value={today} />)

      const todayButton = getDateButton(container, today.getDate())
      expect(todayButton).toHaveAttribute('aria-current', 'date')
      expect(todayButton).toHaveAttribute('aria-pressed', 'true')
    })

    it('formats aria-label correctly for all dates in week', () => {
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} />)
      const dayButtons = container.querySelectorAll('button[aria-pressed]')

      dayButtons.forEach(button => {
        const ariaLabel = button.getAttribute('aria-label')
        expect(ariaLabel).toMatch(/\w+, \w+ \d+, \d{4}/)
      })
    })

    it('handles uncontrolled mode with onChange updating internal state', async () => {
      const user = userEvent.setup()
      let selectedDate: Date | undefined

      function TestComponent() {
        return (
          <MiniCalendar
            onChange={date => {
              selectedDate = date
            }}
          />
        )
      }

      const { container } = render(<TestComponent />)
      const firstButton = container.querySelectorAll('button[aria-pressed]')[0] as HTMLButtonElement
      await user.click(firstButton)

      expect(selectedDate).toBeDefined()
    })

    it('applies custom nav button size in compact mode correctly', () => {
      const { container } = render(<MiniCalendar compact value={new Date(2026, 1, 11)} />)
      const prevButton = screen.getByRole('button', { name: /previous week/i })
      expect(prevButton.className).toContain('!h-8')
      expect(prevButton.className).toContain('!w-8')
    })

    it('applies custom nav button size in normal mode correctly', () => {
      const { container } = render(<MiniCalendar compact={false} value={new Date(2026, 1, 11)} />)
      const prevButton = screen.getByRole('button', { name: /previous week/i })
      expect(prevButton.className).toContain('!h-9')
      expect(prevButton.className).toContain('!w-9')
    })

    it('handles selecting the same date twice', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} onChange={handleChange} />)

      const button11 = getDateButton(container, 11)
      await user.click(button11)
      await user.click(button11)

      expect(handleChange).toHaveBeenCalledTimes(2)
    })

    it('correctly displays week when value is undefined initially', () => {
      const { container } = render(<MiniCalendar />)
      const dayButtons = container.querySelectorAll('button[aria-pressed]')
      expect(dayButtons).toHaveLength(7)
    })

    it('handles minDate and maxDate with time components correctly', () => {
      const minDate = new Date(2026, 1, 10, 14, 30, 0)
      const maxDate = new Date(2026, 1, 12, 18, 45, 0)
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} minDate={minDate} maxDate={maxDate} />)

      const button9 = getDateButton(container, 9)
      const button11 = getDateButton(container, 11)
      const button13 = getDateButton(container, 13)

      expect(button9).toBeDisabled()
      expect(button11).not.toBeDisabled()
      expect(button13).toBeDisabled()
    })

    it('handles navigation with all theme precedence levels', () => {
      const { container } = render(
        <Theme calendar={{ radius: 'lg', navButtonBordered: true }}>
          <MiniCalendar value={new Date(2026, 1, 11)} />
        </Theme>,
      )

      const prevButton = screen.getByRole('button', { name: /previous week/i })
      expect(prevButton.className).toContain('border-[var(--rdp-accent-color)]')
    })

    it('handles rapid week navigation without errors', async () => {
      const user = userEvent.setup()
      render(<MiniCalendar value={new Date(2026, 1, 11)} />)

      const nextButton = screen.getByRole('button', { name: /next week/i })
      const prevButton = screen.getByRole('button', { name: /previous week/i })

      await user.click(nextButton)
      await user.click(prevButton)
      await user.click(nextButton)
      await user.click(nextButton)
      await user.click(prevButton)

      expect(nextButton).toBeInTheDocument()
      expect(prevButton).toBeInTheDocument()
    })

    it('displays correct month title format', () => {
      render(<MiniCalendar value={new Date(2026, 1, 11)} />)
      const title = screen.getByText(/February 2026/i)
      expect(title.className).toContain('font-medium')
      expect(title.className).toContain('text-foreground')
    })

    it('handles selecting date when disabled=true has no effect', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      const { container } = render(<MiniCalendar value={new Date(2026, 1, 11)} disabled onChange={handleChange} />)

      const button11 = getDateButton(container, 11)
      await user.click(button11)

      expect(handleChange).not.toHaveBeenCalled()
    })

    it('verifies all CSS custom properties are set with correct values', () => {
      const { container } = render(
        <MiniCalendar value={new Date(2026, 1, 11)} color="success" radius="lg" compact={false} />,
      )
      const calendar = container.firstChild as HTMLElement
      const style = calendar.getAttribute('style')

      expect(style).toContain('--mini-cal-radius')
      expect(style).toContain('--mini-cal-accent')
      expect(style).toContain('--mini-cal-soft')
      expect(style).toContain('--mini-cal-fg')
      expect(style).toContain('--mini-cal-cell-size: 2.75rem')
    })

    it('handles edge case with February 29 in non-leap year navigation', async () => {
      const user = userEvent.setup()
      render(<MiniCalendar value={new Date(2025, 1, 28)} />)

      const nextButton = screen.getByRole('button', { name: /next week/i })
      await user.click(nextButton)

      expect(screen.getByText(/March 2025/i)).toBeInTheDocument()
    })
  })
})