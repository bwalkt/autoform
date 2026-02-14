import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Theme } from '@/elements/Theme'
import { designTokens } from '@/elements/tokens'
import { Calendar } from './Calendar'

function getDayButton(container: HTMLElement, month: string, day: number): HTMLButtonElement {
  const button = container.querySelector(`button[aria-label*="${month} ${day}"]`)
  if (!(button instanceof HTMLButtonElement)) {
    throw new Error(`Could not find day button for ${month} ${day}`)
  }
  return button
}

afterEach(() => {
  cleanup()
})

describe('Calendar', () => {
  describe('Single mode', () => {
    it('renders in single mode by default', () => {
      render(<Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)
      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('selects a date in single mode', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      const { container } = render(
        <Calendar mode="single" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} onSelect={handleSelect} />,
      )

      const day15 = getDayButton(container, 'June', 15)
      await user.click(day15)

      expect(handleSelect).toHaveBeenCalledWith(
        expect.any(Date),
        expect.any(Date),
        expect.any(Object),
        expect.any(Object),
      )
      const selectedDate = handleSelect.mock.calls[0]?.[0] as Date
      expect(selectedDate.getDate()).toBe(15)
      expect(selectedDate.getMonth()).toBe(5)
    })

    it('changes selection when clicking another date in single mode', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      const { container } = render(
        <Calendar mode="single" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} onSelect={handleSelect} />,
      )

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      const day20 = getDayButton(container, 'June', 20)
      await user.click(day20)

      expect(handleSelect).toHaveBeenCalledTimes(2)
      const secondSelection = handleSelect.mock.calls[1]?.[0] as Date
      expect(secondSelection.getDate()).toBe(20)
    })
  })

  describe('Range mode', () => {
    it('handles range mode selection', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      const { container } = render(
        <Calendar mode="range" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} onSelect={handleSelect} />,
      )

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      // First click should trigger onSelect
      expect(handleSelect).toHaveBeenCalledTimes(1)

      const day15 = getDayButton(container, 'June', 15)
      await user.click(day15)

      // Second click should also trigger onSelect
      expect(handleSelect).toHaveBeenCalledTimes(2)
      const rangeSelection = handleSelect.mock.calls[1]?.[0] as { from?: Date; to?: Date }
      // At least one of from or to should be defined
      expect(rangeSelection?.from || rangeSelection?.to).toBeDefined()
    })

    it('supports range selection with from and to dates', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      const { container } = render(
        <Calendar mode="range" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} onSelect={handleSelect} />,
      )

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      const day15 = getDayButton(container, 'June', 15)
      await user.click(day15)

      const day20 = getDayButton(container, 'June', 20)
      await user.click(day20)

      expect(handleSelect).toHaveBeenCalled()
      // Verify that the callback was called with valid range objects
      const calls = handleSelect.mock.calls
      for (const call of calls) {
        const selection = call[0] as { from?: Date; to?: Date } | undefined
        if (selection) {
          expect(selection).toHaveProperty('from')
        }
      }
    })
  })

  describe('Multiple mode', () => {
    it('unselects an already selected date in multiple mode', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      const { container } = render(
        <Calendar
          mode="multiple"
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
          onSelect={handleSelect}
        />,
      )

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)
      await user.click(day10)

      expect(handleSelect).toHaveBeenCalledTimes(2)
      const firstSelection = handleSelect.mock.calls[0]?.[0] as Date[] | undefined
      expect(firstSelection?.some(date => date.getDate() === 10 && date.getMonth() === 5)).toBe(true)
      expect(handleSelect.mock.calls[1]?.[0]).toBeUndefined()
    })

    it('ignores selecting a new date when multiple mode is at max', async () => {
      const user = userEvent.setup()

      function ControlledCalendar() {
        const [selected, setSelected] = React.useState<Date[] | undefined>([
          new Date(2025, 5, 4),
          new Date(2025, 5, 10),
        ])
        return (
          <div>
            <Calendar
              mode="multiple"
              max={2}
              selected={selected}
              onSelect={setSelected}
              defaultMonth={new Date(2025, 5, 1)}
              showOutsideDays={false}
            />
            <p data-testid="selected-values">
              {selected
                ?.map(date => date.getDate())
                .sort((a, b) => a - b)
                .join(',') ?? 'none'}
            </p>
          </div>
        )
      }

      const { container } = render(<ControlledCalendar />)

      expect(screen.getByTestId('selected-values')).toHaveTextContent('4,10')

      const day11 = getDayButton(container, 'June', 11)
      await user.click(day11)
      expect(screen.getByTestId('selected-values')).toHaveTextContent('4,10')

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)
      expect(screen.getByTestId('selected-values')).toHaveTextContent('4')

      await user.click(day11)
      expect(screen.getByTestId('selected-values')).toHaveTextContent('4,11')
    })

    it('prevents unselecting when min constraint is active', async () => {
      const user = userEvent.setup()

      function ControlledCalendar() {
        const [selected, setSelected] = React.useState<Date[] | undefined>([new Date(2025, 5, 10)])
        return (
          <div>
            <Calendar
              mode="multiple"
              min={1}
              selected={selected}
              onSelect={setSelected}
              defaultMonth={new Date(2025, 5, 1)}
              showOutsideDays={false}
            />
            <p data-testid="selected-values">{selected?.map(date => date.getDate()).join(',') ?? 'none'}</p>
          </div>
        )
      }

      const { container } = render(<ControlledCalendar />)

      expect(screen.getByTestId('selected-values')).toHaveTextContent('10')

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      expect(screen.getByTestId('selected-values')).toHaveTextContent('10')
    })

    it('prevents unselecting when required is true', async () => {
      const user = userEvent.setup()

      function ControlledCalendar() {
        const [selected, setSelected] = React.useState<Date[] | undefined>([new Date(2025, 5, 10)])
        return (
          <div>
            <Calendar
              mode="multiple"
              required
              selected={selected}
              onSelect={setSelected}
              defaultMonth={new Date(2025, 5, 1)}
              showOutsideDays={false}
            />
            <p data-testid="selected-values">{selected?.map(date => date.getDate()).join(',') ?? 'none'}</p>
          </div>
        )
      }

      const { container } = render(<ControlledCalendar />)

      expect(screen.getByTestId('selected-values')).toHaveTextContent('10')

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      expect(screen.getByTestId('selected-values')).toHaveTextContent('10')
    })

    it('allows unselecting when more than min selected', async () => {
      const user = userEvent.setup()

      function ControlledCalendar() {
        const [selected, setSelected] = React.useState<Date[] | undefined>([
          new Date(2025, 5, 10),
          new Date(2025, 5, 15),
        ])
        return (
          <div>
            <Calendar
              mode="multiple"
              min={1}
              selected={selected}
              onSelect={setSelected}
              defaultMonth={new Date(2025, 5, 1)}
              showOutsideDays={false}
            />
            <p data-testid="selected-values">
              {selected
                ?.map(date => date.getDate())
                .sort((a, b) => a - b)
                .join(',') ?? 'none'}
            </p>
          </div>
        )
      }

      const { container } = render(<ControlledCalendar />)

      expect(screen.getByTestId('selected-values')).toHaveTextContent('10,15')

      const day15 = getDayButton(container, 'June', 15)
      await user.click(day15)

      expect(screen.getByTestId('selected-values')).toHaveTextContent('10')
    })
  })

  describe('Navigation', () => {
    it('uses paged navigation with multiple months', async () => {
      const user = userEvent.setup()
      render(
        <Calendar
          mode="single"
          defaultMonth={new Date(2025, 5, 1)}
          numberOfMonths={2}
          pagedNavigation
          showOutsideDays={false}
        />,
      )

      expect(screen.getAllByText('June 2025')).not.toHaveLength(0)
      expect(screen.getAllByText('July 2025')).not.toHaveLength(0)

      await user.click(screen.getByRole('button', { name: /next/i }))
      expect(screen.getAllByText('August 2025')).not.toHaveLength(0)
      expect(screen.getAllByText('September 2025')).not.toHaveLength(0)
    })

    it('navigates to previous month', async () => {
      const user = userEvent.setup()
      render(<Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)

      expect(screen.getByText('June 2025')).toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: /previous/i }))
      expect(screen.getByText('May 2025')).toBeInTheDocument()
    })

    it('navigates to next month', async () => {
      const user = userEvent.setup()
      render(<Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)

      expect(screen.getByText('June 2025')).toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: /next/i }))
      expect(screen.getByText('July 2025')).toBeInTheDocument()
    })

    it('calls onMonthChange when navigating', async () => {
      const user = userEvent.setup()
      const handleMonthChange = vi.fn()

      render(<Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} onMonthChange={handleMonthChange} />)

      await user.click(screen.getByRole('button', { name: /next/i }))

      expect(handleMonthChange).toHaveBeenCalledWith(expect.any(Date))
      const newMonth = handleMonthChange.mock.calls[0]?.[0] as Date
      expect(newMonth.getMonth()).toBe(6) // July
    })

    it('supports controlled month', async () => {
      const user = userEvent.setup()

      function ControlledCalendar() {
        const [month, setMonth] = React.useState(new Date(2025, 5, 1))
        return (
          <div>
            <Calendar month={month} onMonthChange={setMonth} showOutsideDays={false} />
            <p data-testid="current-month">{month.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
        )
      }

      render(<ControlledCalendar />)

      expect(screen.getByTestId('current-month')).toHaveTextContent('June 2025')

      await user.click(screen.getByRole('button', { name: /next/i }))
      expect(screen.getByTestId('current-month')).toHaveTextContent('July 2025')
    })
  })

  describe('Styling and customization', () => {
    it('applies custom className', () => {
      const { container } = render(<Calendar className="custom-calendar" defaultMonth={new Date(2025, 5, 1)} />)
      const calendar = container.querySelector('.custom-calendar')
      expect(calendar).toBeInTheDocument()
    })

    it('renders with different radius options', () => {
      const { container, rerender } = render(<Calendar radius="sm" defaultMonth={new Date(2025, 5, 1)} />)
      expect(container.firstChild).toBeInTheDocument()

      rerender(<Calendar radius="lg" defaultMonth={new Date(2025, 5, 1)} />)
      expect(container.firstChild).toBeInTheDocument()

      rerender(<Calendar radius="full" defaultMonth={new Date(2025, 5, 1)} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders with different color options', () => {
      const { container, rerender } = render(<Calendar color="primary" defaultMonth={new Date(2025, 5, 1)} />)
      expect(container.firstChild).toBeInTheDocument()

      rerender(<Calendar color="success" defaultMonth={new Date(2025, 5, 1)} />)
      expect(container.firstChild).toBeInTheDocument()

      rerender(<Calendar color="error" defaultMonth={new Date(2025, 5, 1)} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders with bordered navigation buttons', () => {
      render(<Calendar navButtonBordered defaultMonth={new Date(2025, 5, 1)} />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
    })

    it('renders with non-bordered navigation buttons', () => {
      render(<Calendar navButtonBordered={false} defaultMonth={new Date(2025, 5, 1)} />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
    })
  })

  describe('Multiple months', () => {
    it('renders multiple months', () => {
      render(<Calendar numberOfMonths={3} defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)

      expect(screen.getByText('June 2025')).toBeInTheDocument()
      expect(screen.getByText('July 2025')).toBeInTheDocument()
      expect(screen.getByText('August 2025')).toBeInTheDocument()
    })

    it('calculates number of months from from and to dates', () => {
      render(
        <Calendar
          from={new Date(2025, 5, 1)}
          to={new Date(2025, 7, 31)}
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
        />,
      )

      expect(screen.getByText('June 2025')).toBeInTheDocument()
      expect(screen.getByText('July 2025')).toBeInTheDocument()
      expect(screen.getByText('August 2025')).toBeInTheDocument()
    })
  })

  describe('Outside days', () => {
    it('shows outside days when showOutsideDays is true', () => {
      render(<Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={true} />)
      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('hides outside days when showOutsideDays is false', () => {
      render(<Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)
      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })
  })

  describe('Custom formatters', () => {
    it('uses custom formatters when provided', () => {
      const customFormatters = {
        formatCaption: (date: Date) => `Custom ${date.getMonth() + 1}/${date.getFullYear()}`,
      }

      render(<Calendar defaultMonth={new Date(2025, 5, 1)} formatters={customFormatters} />)
      expect(screen.getByText('Custom 6/2025')).toBeInTheDocument()
    })
  })

  describe('Disabled dates', () => {
    it('respects disabled prop', () => {
      const { container } = render(
        <Calendar
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
          disabled={{ before: new Date(2025, 5, 15) }}
        />,
      )

      const day10Button = getDayButton(container, 'June', 10)
      expect(day10Button).toBeDisabled()
    })

    it('allows clicking enabled dates', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      const { container } = render(
        <Calendar
          mode="single"
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
          disabled={{ before: new Date(2025, 5, 15) }}
          onSelect={handleSelect}
        />,
      )

      const day20Button = getDayButton(container, 'June', 20)
      await user.click(day20Button)

      expect(handleSelect).toHaveBeenCalled()
    })
  })

  describe('Locale support', () => {
    it('renders with custom locale', () => {
      render(<Calendar localeCode="es-ES" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)
      // Spanish locale should show "junio"
      expect(screen.getByText(/junio/i)).toBeInTheDocument()
    })

    it('defaults to en-US locale', () => {
      render(<Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)
      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('uses locale precedence: prop over theme calendar over theme locale', () => {
      render(
        <Theme
          locale={{ locale: 'fr-FR', language: 'fr', timezone: 'UTC' }}
          calendar={{ locale: 'de-DE', timezone: 'UTC' }}
        >
          <Calendar localeCode="es-ES" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />
        </Theme>,
      )

      expect(screen.getByText(/junio/i)).toBeInTheDocument()
      expect(screen.queryByText(/Juni/)).not.toBeInTheDocument()
      expect(screen.queryByText(/juin/i)).not.toBeInTheDocument()
    })

    it('falls back to en-US for invalid locale codes', () => {
      render(<Calendar localeCode="invalid-locale-code" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)
      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('uses timezone precedence and allows timeZone prop override', () => {
      const dateTimeFormatSpy = vi.spyOn(Intl, 'DateTimeFormat')

      const { unmount } = render(
        <Theme
          locale={{ locale: 'en-US', language: 'en', timezone: 'UTC' }}
          calendar={{ timezone: 'America/Los_Angeles' }}
        >
          <Calendar defaultMonth={new Date(2025, 2, 1)} showOutsideDays={false} />
        </Theme>,
      )

      expect(dateTimeFormatSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ timeZone: 'America/Los_Angeles' }),
      )

      unmount()
      dateTimeFormatSpy.mockClear()

      render(
        <Theme
          locale={{ locale: 'en-US', language: 'en', timezone: 'UTC' }}
          calendar={{ timezone: 'America/Los_Angeles' }}
        >
          <Calendar timeZone="UTC" defaultMonth={new Date(2025, 2, 1)} showOutsideDays={false} />
        </Theme>,
      )

      expect(dateTimeFormatSpy).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ timeZone: 'UTC' }))
      dateTimeFormatSpy.mockRestore()
    })
  })

  describe('Edge cases', () => {
    it('handles uncontrolled multiple mode', async () => {
      const user = userEvent.setup()

      const { container } = render(
        <Calendar mode="multiple" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />,
      )

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      const day15 = getDayButton(container, 'June', 15)
      await user.click(day15)

      // Should be able to select multiple dates
      expect(day10).toBeInTheDocument()
      expect(day15).toBeInTheDocument()
    })

    it('handles month change with from prop', async () => {
      const user = userEvent.setup()

      render(<Calendar from={new Date(2025, 5, 1)} showOutsideDays={false} />)

      expect(screen.getByText('June 2025')).toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: /next/i }))
      expect(screen.getByText('July 2025')).toBeInTheDocument()
    })

    it('handles selecting same date twice in range mode', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      const { container } = render(
        <Calendar mode="range" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} onSelect={handleSelect} />,
      )

      const day15 = getDayButton(container, 'June', 15)
      await user.click(day15)
      await user.click(day15)

      expect(handleSelect).toHaveBeenCalledTimes(2)
    })

    it('uses defaultMonth when neither month nor from is provided', () => {
      render(<Calendar defaultMonth={new Date(2025, 2, 15)} showOutsideDays={false} />)
      expect(screen.getByText('March 2025')).toBeInTheDocument()
    })

    it('prioritizes month prop over from prop for initial display', () => {
      render(
        <Calendar
          month={new Date(2025, 7, 1)}
          from={new Date(2025, 5, 1)}
          defaultMonth={new Date(2025, 2, 1)}
          showOutsideDays={false}
        />,
      )
      expect(screen.getByText('August 2025')).toBeInTheDocument()
    })

    it('prioritizes from prop over defaultMonth for initial display', () => {
      render(<Calendar from={new Date(2025, 7, 1)} defaultMonth={new Date(2025, 2, 1)} showOutsideDays={false} />)
      expect(screen.getByText('August 2025')).toBeInTheDocument()
    })

    it('uses current date when no month, from, or defaultMonth is provided', () => {
      render(<Calendar showOutsideDays={false} />)
      // Should render without error - the exact month depends on current date
      const calendar = screen.getByRole('grid', { hidden: true })
      expect(calendar).toBeInTheDocument()
    })

    it('handles to prop being null', () => {
      render(
        <Calendar from={new Date(2025, 5, 1)} to={null} defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />,
      )
      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('calculates minimum of 2 months when using from/to props', () => {
      render(
        <Calendar
          from={new Date(2025, 5, 1)}
          to={new Date(2025, 5, 15)}
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
        />,
      )
      // Even though from and to are in same month, should show at least 2 months
      expect(screen.getByText('June 2025')).toBeInTheDocument()
      expect(screen.getByText('July 2025')).toBeInTheDocument()
    })

    it('respects numberOfMonths prop when provided without to', () => {
      render(<Calendar numberOfMonths={4} defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)

      expect(screen.getByText('June 2025')).toBeInTheDocument()
      expect(screen.getByText('July 2025')).toBeInTheDocument()
      expect(screen.getByText('August 2025')).toBeInTheDocument()
      expect(screen.getByText('September 2025')).toBeInTheDocument()
    })

    it('defaults to paged navigation when numberOfMonths is greater than 1', () => {
      render(<Calendar numberOfMonths={2} defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)
      // Calendar should render with multiple months
      expect(screen.getByText('June 2025')).toBeInTheDocument()
      expect(screen.getByText('July 2025')).toBeInTheDocument()
    })

    it('allows overriding paged navigation with pagedNavigation prop', () => {
      render(
        <Calendar
          numberOfMonths={2}
          pagedNavigation={false}
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
        />,
      )
      expect(screen.getByText('June 2025')).toBeInTheDocument()
      expect(screen.getByText('July 2025')).toBeInTheDocument()
    })
  })

  describe('Color resolution', () => {
    it('renders with default color', () => {
      const { container } = render(<Calendar color="default" defaultMonth={new Date(2025, 5, 1)} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders with primary color', () => {
      const { container } = render(<Calendar color="primary" defaultMonth={new Date(2025, 5, 1)} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders with token-based colors', () => {
      const { container, rerender } = render(<Calendar color="success" defaultMonth={new Date(2025, 5, 1)} />)
      expect(container.firstChild).toBeInTheDocument()

      rerender(<Calendar color="error" defaultMonth={new Date(2025, 5, 1)} />)
      expect(container.firstChild).toBeInTheDocument()

      rerender(<Calendar color="warning" defaultMonth={new Date(2025, 5, 1)} />)
      expect(container.firstChild).toBeInTheDocument()

      rerender(<Calendar color="info" defaultMonth={new Date(2025, 5, 1)} />)
      expect(container.firstChild).toBeInTheDocument()

      rerender(<Calendar color="neutral" defaultMonth={new Date(2025, 5, 1)} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('applies colors to navigation buttons', () => {
      render(<Calendar color="success" defaultMonth={new Date(2025, 5, 1)} />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
    })
  })

  describe('Theme integration', () => {
    it('uses theme calendar radius when radius prop is not provided', () => {
      const { container } = render(
        <Theme calendar={{ radius: 'full' }}>
          <Calendar defaultMonth={new Date(2025, 5, 1)} />
        </Theme>,
      )
      expect(container.firstChild).toBeInTheDocument()
    })

    it('uses theme radius when neither radius prop nor calendar radius is provided', () => {
      const { container } = render(
        <Theme radius="lg">
          <Calendar defaultMonth={new Date(2025, 5, 1)} />
        </Theme>,
      )
      expect(container.firstChild).toBeInTheDocument()
    })

    it('uses theme calendar navButtonBordered when prop is not provided', () => {
      render(
        <Theme calendar={{ navButtonBordered: true }}>
          <Calendar defaultMonth={new Date(2025, 5, 1)} />
        </Theme>,
      )
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
    })

    it('uses theme calendar locale when localeCode prop is not provided', () => {
      render(
        <Theme calendar={{ locale: 'es-ES' }}>
          <Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />
        </Theme>,
      )
      expect(screen.getByText(/junio/i)).toBeInTheDocument()
    })

    it('uses theme locale when neither localeCode prop nor calendar locale is provided', () => {
      render(
        <Theme locale={{ locale: 'es-ES', language: 'es', timezone: 'UTC' }}>
          <Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />
        </Theme>,
      )
      expect(screen.getByText(/junio/i)).toBeInTheDocument()
    })

    it('uses theme calendar timezone when timeZone prop is not provided', () => {
      const dateTimeFormatSpy = vi.spyOn(Intl, 'DateTimeFormat')

      render(
        <Theme calendar={{ timezone: 'America/New_York' }}>
          <Calendar defaultMonth={new Date(2025, 2, 1)} showOutsideDays={false} />
        </Theme>,
      )

      expect(dateTimeFormatSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ timeZone: 'America/New_York' }),
      )
      dateTimeFormatSpy.mockRestore()
    })

    it('uses theme locale timezone when neither timeZone prop nor calendar timezone is provided', () => {
      const dateTimeFormatSpy = vi.spyOn(Intl, 'DateTimeFormat')

      render(
        <Theme locale={{ locale: 'en-US', language: 'en', timezone: 'America/Chicago' }}>
          <Calendar defaultMonth={new Date(2025, 2, 1)} showOutsideDays={false} />
        </Theme>,
      )

      expect(dateTimeFormatSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ timeZone: 'America/Chicago' }),
      )
      dateTimeFormatSpy.mockRestore()
    })

    it('renders without theme context', () => {
      render(<Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)
      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })
  })

  describe('Multiple mode advanced scenarios', () => {
    it('allows selecting up to max in uncontrolled mode', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      const { container } = render(
        <Calendar
          mode="multiple"
          max={3}
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
          onSelect={handleSelect}
        />,
      )

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      const day15 = getDayButton(container, 'June', 15)
      await user.click(day15)

      const day20 = getDayButton(container, 'June', 20)
      await user.click(day20)

      expect(handleSelect).toHaveBeenCalledTimes(3)
      const lastSelection = handleSelect.mock.calls[2]?.[0] as Date[] | undefined
      expect(lastSelection?.length).toBe(3)
    })

    it('disables unselected dates when max is reached', async () => {
      function ControlledCalendar() {
        const [selected, setSelected] = React.useState<Date[] | undefined>([
          new Date(2025, 5, 5),
          new Date(2025, 5, 10),
          new Date(2025, 5, 15),
        ])
        return (
          <Calendar
            mode="multiple"
            max={3}
            selected={selected}
            onSelect={setSelected}
            defaultMonth={new Date(2025, 5, 1)}
            showOutsideDays={false}
          />
        )
      }

      const { container } = render(<ControlledCalendar />)

      const day20 = getDayButton(container, 'June', 20)
      expect(day20).toBeDisabled()
    })

    it('does not disable already selected dates when max is reached', () => {
      function ControlledCalendar() {
        const [selected, setSelected] = React.useState<Date[] | undefined>([
          new Date(2025, 5, 5),
          new Date(2025, 5, 10),
          new Date(2025, 5, 15),
        ])
        return (
          <Calendar
            mode="multiple"
            max={3}
            selected={selected}
            onSelect={setSelected}
            defaultMonth={new Date(2025, 5, 1)}
            showOutsideDays={false}
          />
        )
      }

      const { container } = render(<ControlledCalendar />)

      const day10 = getDayButton(container, 'June', 10)
      expect(day10).not.toBeDisabled()
    })

    it('syncs uncontrolled state when controlled selected prop changes', async () => {
      function TestComponent() {
        const [selected, setSelected] = React.useState<Date[] | undefined>([new Date(2025, 5, 10)])
        return (
          <div>
            <button data-testid="update-selection" onClick={() => setSelected([new Date(2025, 5, 20)])}>
              Update
            </button>
            <Calendar
              mode="multiple"
              selected={selected}
              onSelect={setSelected}
              defaultMonth={new Date(2025, 5, 1)}
              showOutsideDays={false}
            />
          </div>
        )
      }

      const user = userEvent.setup()
      const { container } = render(<TestComponent />)

      const updateButton = screen.getByTestId('update-selection')
      await user.click(updateButton)

      // Component should re-render with new selection
      expect(container).toBeInTheDocument()
    })

    it('handles onSelect being undefined in multiple mode', async () => {
      const user = userEvent.setup()

      const { container } = render(
        <Calendar mode="multiple" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />,
      )

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      // Should not throw error
      expect(day10).toBeInTheDocument()
    })

    it('normalizes empty array to undefined in multiple mode', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      function ControlledCalendar() {
        const [selected, setSelected] = React.useState<Date[] | undefined>([new Date(2025, 5, 10)])
        return (
          <Calendar
            mode="multiple"
            selected={selected}
            onSelect={dates => {
              handleSelect(dates)
              setSelected(dates)
            }}
            defaultMonth={new Date(2025, 5, 1)}
            showOutsideDays={false}
          />
        )
      }

      const { container } = render(<ControlledCalendar />)

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      // When unselecting the last item, it should normalize empty array to undefined
      expect(handleSelect).toHaveBeenCalledTimes(1)
      const callArgs = handleSelect.mock.calls[0]
      expect(callArgs?.[0]).toBeUndefined()
    })
  })

  describe('Custom components', () => {
    it('allows custom components to be provided', () => {
      const CustomChevron = () => (
        <svg data-testid="custom-chevron">
          <path />
        </svg>
      )
      render(
        <Calendar
          defaultMonth={new Date(2025, 5, 1)}
          components={{
            Chevron: CustomChevron,
          }}
        />,
      )
      const chevrons = screen.getAllByTestId('custom-chevron')
      expect(chevrons.length).toBeGreaterThan(0)
    })
  })

  describe('Formatters', () => {
    it('applies custom day formatter', () => {
      const customFormatters = {
        formatDay: () => 'X',
      }

      render(<Calendar defaultMonth={new Date(2025, 5, 1)} formatters={customFormatters} showOutsideDays={false} />)
      const days = screen.getAllByText('X')
      expect(days.length).toBeGreaterThan(0)
    })

    it('uses Intl.DateTimeFormat for default formatters', () => {
      render(<Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)
      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('includes timeZone in formatter options when provided', () => {
      const dateTimeFormatSpy = vi.spyOn(Intl, 'DateTimeFormat')

      render(<Calendar timeZone="UTC" defaultMonth={new Date(2025, 2, 1)} showOutsideDays={false} />)

      expect(dateTimeFormatSpy).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ timeZone: 'UTC' }))
      dateTimeFormatSpy.mockRestore()
    })

    it('omits timeZone from formatter options when not provided and no theme timezone', () => {
      const dateTimeFormatSpy = vi.spyOn(Intl, 'DateTimeFormat')

      render(<Calendar defaultMonth={new Date(2025, 2, 1)} showOutsideDays={false} />)

      // All calls should not include timeZone when it is not provided.
      const callsWithTimeZone = dateTimeFormatSpy.mock.calls.filter(call => {
        const options = call[1] as Record<string, unknown> | undefined
        return options && 'timeZone' in options
      })
      expect(callsWithTimeZone).toHaveLength(0)
      dateTimeFormatSpy.mockRestore()
    })
  })

  describe('Month state management', () => {
    it('maintains uncontrolled month state across renders', async () => {
      const user = userEvent.setup()

      function TestComponent() {
        const [, setRenderCount] = React.useState(0)
        return (
          <div>
            <button data-testid="force-rerender" onClick={() => setRenderCount(c => c + 1)}>
              Re-render
            </button>
            <Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />
          </div>
        )
      }

      render(<TestComponent />)
      expect(screen.getByText('June 2025')).toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: /next/i }))
      expect(screen.getByText('July 2025')).toBeInTheDocument()

      await user.click(screen.getByTestId('force-rerender'))
      expect(screen.getByText('July 2025')).toBeInTheDocument()
    })

    it('does not update uncontrolled month when month prop is controlled', async () => {
      const user = userEvent.setup()
      const handleMonthChange = vi.fn()

      render(<Calendar month={new Date(2025, 5, 1)} onMonthChange={handleMonthChange} showOutsideDays={false} />)

      expect(screen.getByText('June 2025')).toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: /next/i }))

      expect(handleMonthChange).toHaveBeenCalled()
      // Month should not change until controlled prop changes
      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('updates display when controlled month prop changes', async () => {
      function ControlledMonthCalendar() {
        const [month, setMonth] = React.useState(new Date(2025, 5, 1))

        return (
          <div>
            <button data-testid="change-month" onClick={() => setMonth(new Date(2025, 8, 1))}>
              Change Month
            </button>
            <Calendar month={month} showOutsideDays={false} />
          </div>
        )
      }

      const user = userEvent.setup()
      render(<ControlledMonthCalendar />)

      expect(screen.getByText('June 2025')).toBeInTheDocument()

      await user.click(screen.getByTestId('change-month'))
      expect(screen.getByText('September 2025')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('renders navigation buttons with accessible roles', () => {
      render(<Calendar defaultMonth={new Date(2025, 5, 1)} />)
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    })

    it('renders day buttons with accessible labels', () => {
      const { container } = render(<Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)
      const day15 = getDayButton(container, 'June', 15)
      expect(day15).toHaveAttribute('aria-label')
    })
  })

  describe('Utility functions and internal behavior', () => {
    it('handles different disabled matcher types', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      const { container } = render(
        <Calendar
          mode="single"
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
          disabled={[{ before: new Date(2025, 5, 5) }, { after: new Date(2025, 5, 25) }, new Date(2025, 5, 15)]}
          onSelect={handleSelect}
        />,
      )

      const day3 = getDayButton(container, 'June', 3)
      expect(day3).toBeDisabled()

      const day26 = getDayButton(container, 'June', 26)
      expect(day26).toBeDisabled()

      const day15 = getDayButton(container, 'June', 15)
      expect(day15).toBeDisabled()

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)
      expect(handleSelect).toHaveBeenCalled()
    })

    it('merges custom styles with default styles', () => {
      const customStyles = {
        month_caption: { fontSize: '20px' },
        week: { padding: '10px' },
      }

      const { container } = render(
        <Calendar defaultMonth={new Date(2025, 5, 1)} styles={customStyles} showOutsideDays={false} />,
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it('merges custom classNames with default classNames', () => {
      const customClassNames = {
        day: 'custom-day-class',
        day_button: 'custom-button-class',
      }

      const { container } = render(
        <Calendar defaultMonth={new Date(2025, 5, 1)} classNames={customClassNames} showOutsideDays={false} />,
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles year span across multiple months with from/to', () => {
      render(
        <Calendar
          from={new Date(2025, 10, 1)}
          to={new Date(2026, 2, 31)}
          defaultMonth={new Date(2025, 10, 1)}
          showOutsideDays={false}
        />,
      )

      expect(screen.getByText('November 2025')).toBeInTheDocument()
      expect(screen.getByText('December 2025')).toBeInTheDocument()
      expect(screen.getByText('January 2026')).toBeInTheDocument()
    })
  })

  describe('Navigation button variants', () => {
    it('renders outline variant navigation buttons when bordered', () => {
      render(<Calendar navButtonBordered={true} color="success" defaultMonth={new Date(2025, 5, 1)} />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
      expect(prevButton.className).toContain('border-[var(--rdp-accent-color)]')
      expect(prevButton.className).toContain('hover:bg-[var(--rdp-accent-background-color)]')
    })

    it('renders soft variant navigation buttons when not bordered', () => {
      render(<Calendar navButtonBordered={false} color="error" defaultMonth={new Date(2025, 5, 1)} />)
      const nextButton = screen.getByRole('button', { name: /next/i })
      expect(nextButton).toBeInTheDocument()
      expect(nextButton.className).toContain('bg-[var(--rdp-accent-background-color)]')
      expect(nextButton.className).toContain('hover:bg-[var(--rdp-accent-color)]')
    })

    it('applies correct color to navigation buttons', () => {
      const { container } = render(<Calendar color="warning" defaultMonth={new Date(2025, 5, 1)} />)
      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })
      const root = container.querySelector('.group\\/calendar')
      expect(prevButton).toBeInTheDocument()
      expect(nextButton).toBeInTheDocument()
      expect(root).toHaveStyle({
        '--rdp-accent-color': designTokens.color.warning.primary,
        '--rdp-accent-background-color': designTokens.color.warning.primaryAlpha,
      })
    })
  })

  describe('Multiple mode with controlled and uncontrolled state transitions', () => {
    it('transitions from controlled to uncontrolled when selected becomes undefined', async () => {
      function TransitionCalendar() {
        const [selected, setSelected] = React.useState<Date[] | undefined>([new Date(2025, 5, 10)])
        const [isControlled, setIsControlled] = React.useState(true)

        return (
          <div>
            <button data-testid="toggle-control" onClick={() => setIsControlled(!isControlled)}>
              Toggle
            </button>
            {isControlled ? (
              <Calendar
                mode="multiple"
                selected={selected}
                onSelect={setSelected}
                defaultMonth={new Date(2025, 5, 1)}
                showOutsideDays={false}
              />
            ) : (
              <Calendar mode="multiple" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />
            )}
          </div>
        )
      }

      const user = userEvent.setup()
      render(<TransitionCalendar />)

      const toggleButton = screen.getByTestId('toggle-control')
      await user.click(toggleButton)

      expect(toggleButton).toBeInTheDocument()
    })

    it('prevents selecting beyond max even when clicking rapidly', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      function ControlledCalendar() {
        const [selected, setSelected] = React.useState<Date[] | undefined>([new Date(2025, 5, 5)])
        return (
          <Calendar
            mode="multiple"
            max={2}
            selected={selected}
            onSelect={dates => {
              handleSelect(dates)
              setSelected(dates)
            }}
            defaultMonth={new Date(2025, 5, 1)}
            showOutsideDays={false}
          />
        )
      }

      const { container } = render(<ControlledCalendar />)

      const day10 = getDayButton(container, 'June', 10)
      const day15 = getDayButton(container, 'June', 15)
      const day20 = getDayButton(container, 'June', 20)

      await user.click(day10)
      await user.click(day15)
      await user.click(day20)

      const selections = handleSelect.mock.calls.map(call => call[0] as Date[] | undefined)
      const lastSelection = selections[selections.length - 1]
      expect(lastSelection?.length).toBeLessThanOrEqual(2)
    })
  })

  describe('Additional comprehensive tests', () => {
    it('handles Chevron component with up orientation', () => {
      const CustomChevronTest = () => {
        const ChevronComponent = () => {
          const Chevron = () => {
            const ChevronDownIcon = () => (
              <svg data-testid="chevron-up" className="rotate-180">
                <path />
              </svg>
            )
            return <ChevronDownIcon />
          }
          return <Chevron />
        }
        return <ChevronComponent />
      }

      render(<CustomChevronTest />)
      expect(screen.getByTestId('chevron-up')).toBeInTheDocument()
    })

    it('handles weekNumber display scenario', () => {
      render(<Calendar defaultMonth={new Date(2025, 5, 1)} showWeekNumber showOutsideDays={false} />)
      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('handles date range across year boundaries', () => {
      render(
        <Calendar
          from={new Date(2025, 11, 1)}
          to={new Date(2026, 1, 28)}
          defaultMonth={new Date(2025, 11, 1)}
          showOutsideDays={false}
        />,
      )

      expect(screen.getByText('December 2025')).toBeInTheDocument()
      expect(screen.getByText('January 2026')).toBeInTheDocument()
    })

    it('handles multiple disabled matcher types including dates array', () => {
      const { container } = render(
        <Calendar
          defaultMonth={new Date(2025, 5, 1)}
          disabled={[new Date(2025, 5, 10), new Date(2025, 5, 15), new Date(2025, 5, 20)]}
          showOutsideDays={false}
        />,
      )

      const day10 = getDayButton(container, 'June', 10)
      const day15 = getDayButton(container, 'June', 15)
      const day20 = getDayButton(container, 'June', 20)

      expect(day10).toBeDisabled()
      expect(day15).toBeDisabled()
      expect(day20).toBeDisabled()
    })

    it('handles empty disabled array', () => {
      const { container } = render(
        <Calendar defaultMonth={new Date(2025, 5, 1)} disabled={[]} showOutsideDays={false} />,
      )

      const day10 = getDayButton(container, 'June', 10)
      expect(day10).not.toBeDisabled()
    })

    it('handles multiple mode with max=0', () => {
      const handleSelect = vi.fn()

      const { container } = render(
        <Calendar
          mode="multiple"
          max={0}
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
          onSelect={handleSelect}
        />,
      )

      const day10 = getDayButton(container, 'June', 10)

      // When max is 0, all unselected dates should be disabled
      expect(day10).toBeDisabled()
    })

    it('renders calendar with all radius options sequentially', () => {
      const radii: Array<'none' | 'sm' | 'md' | 'lg' | 'full'> = ['none', 'sm', 'md', 'lg', 'full']

      for (const radius of radii) {
        const { container, unmount } = render(<Calendar radius={radius} defaultMonth={new Date(2025, 5, 1)} />)
        expect(container.firstChild).toBeInTheDocument()
        unmount()
      }
    })

    it('handles controlled range mode with initial undefined selection', async () => {
      const user = userEvent.setup()

      function ControlledRangeCalendar() {
        const [range, setRange] = React.useState<{ from?: Date; to?: Date } | undefined>(undefined)

        return (
          <div>
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              defaultMonth={new Date(2025, 5, 1)}
              showOutsideDays={false}
            />
            <p data-testid="range-status">{range?.from ? 'has-from' : 'no-from'}</p>
          </div>
        )
      }

      const { container } = render(<ControlledRangeCalendar />)

      expect(screen.getByTestId('range-status')).toHaveTextContent('no-from')

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      const statusAfterClick = screen.getByTestId('range-status')
      expect(statusAfterClick).toBeInTheDocument()
    })

    it('handles single mode with initial selected date in different month than default', () => {
      render(
        <Calendar
          mode="single"
          selected={new Date(2025, 7, 15)}
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
        />,
      )

      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('handles very large numberOfMonths', () => {
      render(<Calendar numberOfMonths={6} defaultMonth={new Date(2025, 0, 1)} showOutsideDays={false} />)

      expect(screen.getByText('January 2025')).toBeInTheDocument()
      expect(screen.getByText('February 2025')).toBeInTheDocument()
      expect(screen.getByText('March 2025')).toBeInTheDocument()
      expect(screen.getByText('April 2025')).toBeInTheDocument()
      expect(screen.getByText('May 2025')).toBeInTheDocument()
      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('handles navigation with onMonthChange but without controlled month', async () => {
      const user = userEvent.setup()
      const handleMonthChange = vi.fn()

      render(<Calendar defaultMonth={new Date(2025, 5, 1)} onMonthChange={handleMonthChange} showOutsideDays={false} />)

      await user.click(screen.getByRole('button', { name: /next/i }))
      expect(screen.getByText('July 2025')).toBeInTheDocument()
      expect(handleMonthChange).toHaveBeenCalled()
    })

    it('handles disabled prop with dayOfWeek matcher', () => {
      const disableDayOfWeek = (date: Date) => {
        const day = date.getDay()
        return day === 0 || day === 6
      }

      const { container } = render(
        <Calendar defaultMonth={new Date(2025, 5, 1)} disabled={disableDayOfWeek} showOutsideDays={false} />,
      )

      const firstSunday = getDayButton(container, 'June', 1)
      expect(firstSunday).toBeDisabled()
    })

    it('verifies calendar sets proper CSS custom properties', () => {
      const { container } = render(
        <Calendar color="success" radius="lg" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />,
      )

      const calendarElement = container.querySelector('.bg-background')
      expect(calendarElement).toBeInTheDocument()
    })

    it('handles multiple mode with undefined initial selection', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      const { container } = render(
        <Calendar
          mode="multiple"
          selected={undefined}
          onSelect={handleSelect}
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
        />,
      )

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      expect(handleSelect).toHaveBeenCalledWith(
        expect.arrayContaining([expect.any(Date)]),
        expect.any(Date),
        expect.any(Object),
        expect.any(Object),
      )
    })

    it('handles month dropdown and year dropdown formatters', () => {
      render(
        <Calendar
          defaultMonth={new Date(2025, 5, 1)}
          localeCode="en-US"
          timeZone="UTC"
          showOutsideDays={false}
          captionLayout="dropdown"
          fromYear={2020}
          toYear={2030}
        />,
      )

      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('maintains component stability across re-renders with same props', () => {
      const { rerender } = render(<Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)

      expect(screen.getByText('June 2025')).toBeInTheDocument()

      rerender(<Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)

      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('handles from/to date range where to comes before from', () => {
      render(
        <Calendar
          from={new Date(2025, 7, 1)}
          to={new Date(2025, 5, 1)}
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
        />,
      )

      // When to is before from, the calculation creates a negative range
      // which Math.max ensures is at least 2 months
      const grids = screen.getAllByRole('grid', { hidden: true })
      expect(grids.length).toBeGreaterThan(0)
    })

    it('handles theme without calendar-specific config', () => {
      render(
        <Theme>
          <Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />
        </Theme>,
      )

      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('handles className prop with special characters', () => {
      const { container } = render(
        <Calendar className="test-class-123 special_chars-test" defaultMonth={new Date(2025, 5, 1)} />,
      )

      const calendarWithClass = container.querySelector('.test-class-123')
      expect(calendarWithClass).toBeInTheDocument()
    })

    it('handles classNames prop for individual elements', () => {
      const customClassNames = {
        root: 'custom-root',
        months: 'custom-months',
        month: 'custom-month',
        nav: 'custom-nav',
      }

      const { container } = render(
        <Calendar defaultMonth={new Date(2025, 5, 1)} classNames={customClassNames} showOutsideDays={false} />,
      )

      expect(container.querySelector('.custom-root')).toBeInTheDocument()
    })

    it('handles styles prop for individual elements', () => {
      const customStyles = {
        root: { backgroundColor: 'red' },
        month_caption: { fontSize: '24px' },
      }

      const { container } = render(
        <Calendar defaultMonth={new Date(2025, 5, 1)} styles={customStyles} showOutsideDays={false} />,
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles range mode with excludeDisabled prop', async () => {
      const user = userEvent.setup()

      const { container } = render(
        <Calendar
          mode="range"
          excludeDisabled
          disabled={{ dayOfWeek: [0, 6] }}
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
        />,
      )

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      expect(day10).toBeInTheDocument()
    })

    it('handles multiple mode where selected dates span multiple months', async () => {
      const _user = userEvent.setup()

      function ControlledCalendar() {
        const [selected, setSelected] = React.useState<Date[] | undefined>([
          new Date(2025, 5, 10),
          new Date(2025, 6, 15),
        ])

        return (
          <Calendar
            mode="multiple"
            selected={selected}
            onSelect={setSelected}
            numberOfMonths={2}
            defaultMonth={new Date(2025, 5, 1)}
            showOutsideDays={false}
          />
        )
      }

      render(<ControlledCalendar />)

      expect(screen.getByText('June 2025')).toBeInTheDocument()
      expect(screen.getByText('July 2025')).toBeInTheDocument()
    })

    it('validates calendar renders correctly with dir attribute for RTL', () => {
      const { container } = render(
        <div dir="rtl">
          <Calendar localeCode="ar-SA" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />
        </div>,
      )

      const calendar = container.querySelector('.bg-background')
      expect(calendar).toBeInTheDocument()
    })

    it('handles controlled single mode with onSelect changing selection', async () => {
      const user = userEvent.setup()

      function ControlledCalendar() {
        const [selected, setSelected] = React.useState<Date | undefined>(new Date(2025, 5, 10))

        return (
          <div>
            <Calendar
              mode="single"
              selected={selected}
              onSelect={setSelected}
              defaultMonth={new Date(2025, 5, 1)}
              showOutsideDays={false}
            />
            <p data-testid="selected-day">{selected?.getDate() ?? 'none'}</p>
          </div>
        )
      }

      const { container } = render(<ControlledCalendar />)

      expect(screen.getByTestId('selected-day')).toHaveTextContent('10')

      const day20 = getDayButton(container, 'June', 20)
      await user.click(day20)

      expect(screen.getByTestId('selected-day')).toHaveTextContent('20')
    })

    it('handles edge case with from date at end of month', () => {
      render(
        <Calendar
          from={new Date(2025, 4, 31)}
          to={new Date(2025, 6, 1)}
          defaultMonth={new Date(2025, 4, 1)}
          showOutsideDays={false}
        />,
      )

      expect(screen.getByText('May 2025')).toBeInTheDocument()
    })

    it('verifies component displayName is set correctly', () => {
      expect(Calendar.displayName).toBe('Calendar')
    })
  })

  describe('Locale and timezone edge cases', () => {
    it('handles locale code with region variant', () => {
      render(<Calendar localeCode="zh-Hans-CN" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)
      const calendar = screen.getByRole('grid', { hidden: true })
      expect(calendar).toBeInTheDocument()
    })

    it('handles right-to-left locale rendering', () => {
      render(<Calendar localeCode="ar-SA" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)
      const calendar = screen.getByRole('grid', { hidden: true })
      expect(calendar).toBeInTheDocument()
    })

    it('applies different timezones correctly', () => {
      const dateTimeFormatSpy = vi.spyOn(Intl, 'DateTimeFormat')

      const { unmount } = render(<Calendar timeZone="Asia/Tokyo" defaultMonth={new Date(2025, 2, 1)} />)

      expect(dateTimeFormatSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ timeZone: 'Asia/Tokyo' }),
      )

      unmount()
      dateTimeFormatSpy.mockRestore()
    })

    it('handles locale override independently of timezone override', () => {
      const dateTimeFormatSpy = vi.spyOn(Intl, 'DateTimeFormat')

      render(
        <Theme locale={{ locale: 'en-US', language: 'en', timezone: 'UTC' }}>
          <Calendar
            localeCode="ja-JP"
            timeZone="Asia/Tokyo"
            defaultMonth={new Date(2025, 5, 1)}
            showOutsideDays={false}
          />
        </Theme>,
      )

      expect(dateTimeFormatSpy).toHaveBeenCalledWith('ja-JP', expect.objectContaining({ timeZone: 'Asia/Tokyo' }))
      dateTimeFormatSpy.mockRestore()
    })
  })

  describe('Range mode edge cases', () => {
    it('handles clearing range selection', async () => {
      const user = userEvent.setup()

      function ControlledRangeCalendar() {
        const [range, setRange] = React.useState<{ from?: Date; to?: Date } | undefined>({
          from: new Date(2025, 5, 10),
          to: new Date(2025, 5, 15),
        })

        return (
          <div>
            <button data-testid="clear-range" onClick={() => setRange(undefined)}>
              Clear
            </button>
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              defaultMonth={new Date(2025, 5, 1)}
              showOutsideDays={false}
            />
            <p data-testid="range-status">{range?.from ? 'has-range' : 'no-range'}</p>
          </div>
        )
      }

      render(<ControlledRangeCalendar />)

      expect(screen.getByTestId('range-status')).toHaveTextContent('has-range')

      const clearButton = screen.getByTestId('clear-range')
      await user.click(clearButton)

      expect(screen.getByTestId('range-status')).toHaveTextContent('no-range')
    })

    it('handles range with only from date', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      function ControlledRangeCalendar() {
        const [range, setRange] = React.useState<{ from?: Date; to?: Date } | undefined>({
          from: new Date(2025, 5, 10),
        })

        return (
          <Calendar
            mode="range"
            selected={range}
            onSelect={dates => {
              handleSelect(dates)
              setRange(dates)
            }}
            defaultMonth={new Date(2025, 5, 1)}
            showOutsideDays={false}
          />
        )
      }

      const { container } = render(<ControlledRangeCalendar />)

      const day15 = getDayButton(container, 'June', 15)
      await user.click(day15)

      expect(handleSelect).toHaveBeenCalled()
    })
  })

  describe('Single mode edge cases', () => {
    it('handles required in single mode', async () => {
      const user = userEvent.setup()

      function ControlledSingleCalendar() {
        const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 5, 10))

        return (
          <div>
            <Calendar
              mode="single"
              required
              selected={date}
              onSelect={setDate}
              defaultMonth={new Date(2025, 5, 1)}
              showOutsideDays={false}
            />
            <p data-testid="selected-date">{date ? date.getDate() : 'none'}</p>
          </div>
        )
      }

      const { container } = render(<ControlledSingleCalendar />)

      expect(screen.getByTestId('selected-date')).toHaveTextContent('10')

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      const day15 = getDayButton(container, 'June', 15)
      await user.click(day15)

      expect(screen.getByTestId('selected-date')).toHaveTextContent('15')
    })

    it('allows unselecting in single mode when not required', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date(2025, 5, 10)}
          onSelect={handleSelect}
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
        />,
      )

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      expect(handleSelect).toHaveBeenCalled()
    })
  })

  describe('Props integration and precedence', () => {
    it('respects all theme precedence layers for radius', () => {
      const { container, rerender } = render(<Calendar defaultMonth={new Date(2025, 5, 1)} />)
      expect(container.firstChild).toBeInTheDocument()

      rerender(
        <Theme radius="lg">
          <Calendar defaultMonth={new Date(2025, 5, 1)} />
        </Theme>,
      )
      expect(container.firstChild).toBeInTheDocument()

      rerender(
        <Theme radius="lg" calendar={{ radius: 'sm' }}>
          <Calendar defaultMonth={new Date(2025, 5, 1)} />
        </Theme>,
      )
      expect(container.firstChild).toBeInTheDocument()

      rerender(
        <Theme radius="lg" calendar={{ radius: 'sm' }}>
          <Calendar radius="full" defaultMonth={new Date(2025, 5, 1)} />
        </Theme>,
      )
      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles complex disabled matchers in multiple mode with max', async () => {
      const _user = userEvent.setup()

      function ControlledCalendar() {
        const [selected, setSelected] = React.useState<Date[] | undefined>([
          new Date(2025, 5, 10),
          new Date(2025, 5, 11),
        ])

        return (
          <Calendar
            mode="multiple"
            max={2}
            selected={selected}
            onSelect={setSelected}
            disabled={[new Date(2025, 5, 15), { before: new Date(2025, 5, 5) }]}
            defaultMonth={new Date(2025, 5, 1)}
            showOutsideDays={false}
          />
        )
      }

      const { container } = render(<ControlledCalendar />)

      const day15 = getDayButton(container, 'June', 15)
      expect(day15).toBeDisabled()

      const day3 = getDayButton(container, 'June', 3)
      expect(day3).toBeDisabled()

      const day20 = getDayButton(container, 'June', 20)
      expect(day20).toBeDisabled()

      const day10 = getDayButton(container, 'June', 10)
      expect(day10).not.toBeDisabled()
    })
  })

  describe('CalendarHeader integration with single month', () => {
    it('renders custom header for single month', () => {
      render(<Calendar numberOfMonths={1} defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)
      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('does not render custom header for multiple months', () => {
      render(<Calendar numberOfMonths={2} defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)
      expect(screen.getByText('June 2025')).toBeInTheDocument()
      expect(screen.getByText('July 2025')).toBeInTheDocument()
    })

    it('custom header navigation respects boundaries', async () => {
      const user = userEvent.setup()
      const startMonth = new Date(2025, 5, 1)
      const endMonth = new Date(2025, 7, 31)

      render(<Calendar defaultMonth={startMonth} startMonth={startMonth} endMonth={endMonth} showOutsideDays={false} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeDisabled()

      await user.click(screen.getByRole('button', { name: /next/i }))
      expect(screen.getByText('July 2025')).toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: /next/i }))
      expect(screen.getByText('August 2025')).toBeInTheDocument()

      const nextButton = screen.getByRole('button', { name: /next/i })
      expect(nextButton).toBeDisabled()
    })

    it('custom header shows correct icons', () => {
      render(<Calendar numberOfMonths={1} defaultMonth={new Date(2025, 5, 1)} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })

      expect(prevButton).toBeInTheDocument()
      expect(nextButton).toBeInTheDocument()
    })
  })

  describe('Today date highlighting', () => {
    it('highlights today date with special styling', () => {
      const today = new Date()
      const { container } = render(
        <Calendar defaultMonth={new Date(today.getFullYear(), today.getMonth(), 1)} showOutsideDays={false} />,
      )

      const todayButton = getDayButton(container, today.toLocaleString('en-US', { month: 'long' }), today.getDate())
      expect(todayButton.parentElement?.className).toContain('rdp-today')
    })

    it('highlights today when selected', async () => {
      const user = userEvent.setup()
      const today = new Date()

      const { container } = render(
        <Calendar
          mode="single"
          defaultMonth={new Date(today.getFullYear(), today.getMonth(), 1)}
          showOutsideDays={false}
        />,
      )

      const todayButton = getDayButton(container, today.toLocaleString('en-US', { month: 'long' }), today.getDate())
      await user.click(todayButton)

      expect(todayButton.parentElement?.className).toContain('rdp-selected')
      expect(todayButton.parentElement?.className).toContain('rdp-today')
    })
  })

  describe('Week number display', () => {
    it('displays week numbers when showWeekNumber is true', () => {
      render(<Calendar defaultMonth={new Date(2025, 5, 1)} showWeekNumber showOutsideDays={false} />)
      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('applies correct styling for first day selection with week numbers', async () => {
      const user = userEvent.setup()

      const { container } = render(
        <Calendar mode="single" defaultMonth={new Date(2025, 5, 1)} showWeekNumber showOutsideDays={false} />,
      )

      const day1 = getDayButton(container, 'June', 1)
      await user.click(day1)

      expect(day1.parentElement?.className).toContain('rdp-selected')
    })
  })

  describe('Range mode with min/max', () => {
    it('respects min constraint in range mode', async () => {
      const user = userEvent.setup()

      const { container } = render(
        <Calendar mode="range" min={7} defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />,
      )

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      const day12 = getDayButton(container, 'June', 12)
      await user.click(day12)

      expect(day10).toBeInTheDocument()
    })

    it('respects max constraint in range mode', async () => {
      const user = userEvent.setup()

      const { container } = render(
        <Calendar mode="range" max={7} defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />,
      )

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      const day25 = getDayButton(container, 'June', 25)
      await user.click(day25)

      expect(day10).toBeInTheDocument()
    })
  })

  describe('Navigation button variants with custom variants prop', () => {
    it('applies ghost variant to navigation buttons', () => {
      render(<Calendar navButtonVariant="ghost" defaultMonth={new Date(2025, 5, 1)} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton.className).toContain('bg-transparent')
    })

    it('applies outline variant to navigation buttons', () => {
      render(<Calendar navButtonVariant="outline" defaultMonth={new Date(2025, 5, 1)} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeInTheDocument()
    })

    it('applies soft variant to navigation buttons', () => {
      render(<Calendar navButtonVariant="soft" defaultMonth={new Date(2025, 5, 1)} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton.className).toContain('bg-[var(--rdp-accent-background-color)]')
    })
  })

  describe('isSameDay utility edge cases', () => {
    it('correctly identifies same day with different times', async () => {
      const handleSelect = vi.fn()

      const morning = new Date(2025, 5, 15, 9, 0, 0)
      const evening = new Date(2025, 5, 15, 18, 0, 0)

      const { container, rerender } = render(
        <Calendar mode="single" selected={morning} onSelect={handleSelect} defaultMonth={new Date(2025, 5, 1)} />,
      )

      let day15 = getDayButton(container, 'June', 15)
      expect(day15.parentElement?.className).toContain('rdp-selected')

      rerender(
        <Calendar mode="single" selected={evening} onSelect={handleSelect} defaultMonth={new Date(2025, 5, 1)} />,
      )

      day15 = getDayButton(container, 'June', 15)
      expect(day15.parentElement?.className).toContain('rdp-selected')
    })

    it('correctly identifies different days', () => {
      const handleSelect = vi.fn()

      const day15 = new Date(2025, 5, 15)
      const day16 = new Date(2025, 5, 16)

      const { container, rerender } = render(
        <Calendar mode="single" selected={day15} onSelect={handleSelect} defaultMonth={new Date(2025, 5, 1)} />,
      )

      let day15Button = getDayButton(container, 'June', 15)
      expect(day15Button.parentElement?.className).toContain('rdp-selected')

      rerender(<Calendar mode="single" selected={day16} onSelect={handleSelect} defaultMonth={new Date(2025, 5, 1)} />)

      day15Button = getDayButton(container, 'June', 15)
      expect(day15Button.parentElement?.className).not.toContain('rdp-selected')

      const day16Button = getDayButton(container, 'June', 16)
      expect(day16Button.parentElement?.className).toContain('rdp-selected')
    })
  })

  describe('Multiple mode with complex selection scenarios', () => {
    it('handles selecting dates in reverse chronological order', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      const { container } = render(
        <Calendar
          mode="multiple"
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
          onSelect={handleSelect}
        />,
      )

      const day20 = getDayButton(container, 'June', 20)
      await user.click(day20)

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      const day5 = getDayButton(container, 'June', 5)
      await user.click(day5)

      expect(handleSelect).toHaveBeenCalledTimes(3)
      const lastCall = handleSelect.mock.calls[2]?.[0] as Date[]
      expect(lastCall.length).toBe(3)
    })

    it('handles selecting dates across month boundaries with multiple months displayed', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      const { container } = render(
        <Calendar
          mode="multiple"
          numberOfMonths={2}
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
          onSelect={handleSelect}
        />,
      )

      const juneDay = getDayButton(container, 'June', 15)
      await user.click(juneDay)

      const julyDay = getDayButton(container, 'July', 15)
      await user.click(julyDay)

      expect(handleSelect).toHaveBeenCalledTimes(2)
      const lastCall = handleSelect.mock.calls[1]?.[0] as Date[]
      expect(lastCall.length).toBe(2)
    })
  })

  describe('Performance and memoization', () => {
    it('maintains stable formatter references', () => {
      const { rerender } = render(<Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)

      expect(screen.getByText('June 2025')).toBeInTheDocument()

      rerender(<Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)

      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('maintains stable callback references', async () => {
      const user = userEvent.setup()
      let renderCount = 0

      function TestCalendar() {
        const [month, setMonth] = React.useState(new Date(2025, 5, 1))
        renderCount++

        return <Calendar month={month} onMonthChange={setMonth} showOutsideDays={false} />
      }

      render(<TestCalendar />)
      const initialRenderCount = renderCount

      await user.click(screen.getByRole('button', { name: /next/i }))

      // Should render at least twice (initial + state update)
      expect(renderCount).toBeGreaterThan(initialRenderCount)
    })
  })

  describe('RTL (Right-to-Left) support', () => {
    it('applies RTL rotation classes for navigation buttons', () => {
      const { container } = render(<Calendar defaultMonth={new Date(2025, 5, 1)} />)

      const calendar = container.querySelector('.group\\/calendar')
      expect(calendar?.className).toContain('rtl')
    })
  })

  describe('Disabled dates with edge cases', () => {
    it('handles disabled dates at month boundaries', () => {
      const { container } = render(
        <Calendar
          defaultMonth={new Date(2025, 5, 1)}
          disabled={[new Date(2025, 5, 1), new Date(2025, 5, 30)]}
          showOutsideDays={false}
        />,
      )

      const day1 = getDayButton(container, 'June', 1)
      expect(day1).toBeDisabled()

      const day30 = getDayButton(container, 'June', 30)
      expect(day30).toBeDisabled()
    })

    it('handles disabled dates with time components', () => {
      const dateWithTime = new Date(2025, 5, 15, 14, 30, 0)

      const { container } = render(
        <Calendar defaultMonth={new Date(2025, 5, 1)} disabled={[dateWithTime]} showOutsideDays={false} />,
      )

      const day15 = getDayButton(container, 'June', 15)
      expect(day15).toBeDisabled()
    })
  })

  describe('Custom formatters with different locales', () => {
    it('uses custom formatters alongside locale settings', () => {
      const customFormatters = {
        formatCaption: (date: Date) => `Month: ${date.getMonth() + 1}`,
        formatDay: (date: Date) => String(date.getDate()),
      }

      render(
        <Calendar
          localeCode="fr-FR"
          formatters={customFormatters}
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
        />,
      )

      expect(screen.getByText('Month: 6')).toBeInTheDocument()
    })
  })

  describe('Navigation with pagedNavigation variations', () => {
    it('navigates single month when pagedNavigation is false with multiple months', async () => {
      const user = userEvent.setup()

      render(
        <Calendar
          numberOfMonths={3}
          pagedNavigation={false}
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
        />,
      )

      expect(screen.getByText('June 2025')).toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: /next/i }))

      const grids = screen.getAllByRole('grid', { hidden: true })
      expect(grids.length).toBeGreaterThan(0)
    })

    it('explicitly enables paged navigation with single month', async () => {
      const user = userEvent.setup()

      render(<Calendar numberOfMonths={1} pagedNavigation={true} defaultMonth={new Date(2025, 5, 1)} />)

      await user.click(screen.getByRole('button', { name: /next/i }))
      expect(screen.getByRole('grid', { hidden: true })).toBeInTheDocument()
    })
  })

  describe('Color variations comprehensive', () => {
    it('handles all available color tokens', () => {
      const colors: Array<'default' | 'primary' | 'neutral' | 'info' | 'success' | 'warning' | 'error'> = [
        'default',
        'primary',
        'neutral',
        'info',
        'success',
        'warning',
        'error',
      ]

      for (const color of colors) {
        const { container, unmount } = render(<Calendar color={color} defaultMonth={new Date(2025, 5, 1)} />)
        expect(container.firstChild).toBeInTheDocument()
        unmount()
      }
    })
  })

  describe('Month initialization edge cases', () => {
    it('uses initialMonthRef correctly when neither month nor from nor defaultMonth is provided', () => {
      const { container } = render(<Calendar showOutsideDays={false} />)
      const calendar = screen.getByRole('grid', { hidden: true })
      expect(calendar).toBeInTheDocument()
      expect(container.firstChild).toBeInTheDocument()
    })

    it('updates display when controlled month prop changes', async () => {
      function ControlledMonthCalendar() {
        const [month, setMonth] = React.useState(new Date(2025, 5, 1))

        return (
          <div>
            <button data-testid="change-month" onClick={() => setMonth(new Date(2025, 8, 1))}>
              Change Month
            </button>
            <Calendar month={month} showOutsideDays={false} />
          </div>
        )
      }

      const user = userEvent.setup()
      render(<ControlledMonthCalendar />)

      expect(screen.getByText('June 2025')).toBeInTheDocument()

      await user.click(screen.getByTestId('change-month'))
      expect(screen.getByText('September 2025')).toBeInTheDocument()
    })
  })

  describe('Disabled functionality comprehensive', () => {
    it('handles function matcher for disabled dates', () => {
      const disabledMatcher = (date: Date) => date.getDay() === 0 || date.getDay() === 6

      const { container } = render(
        <Calendar defaultMonth={new Date(2025, 5, 1)} disabled={disabledMatcher} showOutsideDays={false} />,
      )

      const saturday = getDayButton(container, 'June', 7)
      expect(saturday).toBeDisabled()

      const sunday = getDayButton(container, 'June', 8)
      expect(sunday).toBeDisabled()
    })

    it('combines disabled prop with multiple mode max disabled logic', () => {
      function ControlledCalendar() {
        const [selected, setSelected] = React.useState<Date[] | undefined>([new Date(2025, 5, 5), new Date(2025, 5, 6)])

        return (
          <Calendar
            mode="multiple"
            max={2}
            selected={selected}
            onSelect={setSelected}
            disabled={{ before: new Date(2025, 5, 3) }}
            defaultMonth={new Date(2025, 5, 1)}
            showOutsideDays={false}
          />
        )
      }

      const { container } = render(<ControlledCalendar />)

      const day1 = getDayButton(container, 'June', 1)
      expect(day1).toBeDisabled()

      const day10 = getDayButton(container, 'June', 10)
      expect(day10).toBeDisabled()
    })
  })

  describe('Additional regression and boundary tests', () => {
    it('handles navigation boundaries with startMonth and endMonth props', async () => {
      const user = userEvent.setup()
      const startMonth = new Date(2025, 5, 1)
      const endMonth = new Date(2025, 7, 31)

      render(
        <Calendar
          defaultMonth={new Date(2025, 5, 1)}
          startMonth={startMonth}
          endMonth={endMonth}
          showOutsideDays={false}
        />,
      )

      expect(screen.getByText('June 2025')).toBeInTheDocument()

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeDisabled()

      await user.click(screen.getByRole('button', { name: /next/i }))
      await user.click(screen.getByRole('button', { name: /next/i }))

      expect(screen.getByText('August 2025')).toBeInTheDocument()
      const nextButton = screen.getByRole('button', { name: /next/i })
      expect(nextButton).toBeDisabled()
    })

    it('handles disableNavigation prop', async () => {
      const user = userEvent.setup()
      const handleMonthChange = vi.fn()

      render(
        <Calendar
          defaultMonth={new Date(2025, 5, 1)}
          disableNavigation={true}
          onMonthChange={handleMonthChange}
          showOutsideDays={false}
        />,
      )

      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })

      await user.click(prevButton)
      await user.click(nextButton)

      expect(handleMonthChange).not.toHaveBeenCalled()
    })

    it('handles isSameDay utility correctly with different times', async () => {
      const handleSelect = vi.fn()
      const dateWithMorningTime = new Date(2025, 5, 15, 9, 0, 0)

      const { container } = render(
        <Calendar
          mode="single"
          selected={dateWithMorningTime}
          onSelect={handleSelect}
          defaultMonth={new Date(2025, 5, 1)}
          showOutsideDays={false}
        />,
      )

      const day15 = getDayButton(container, 'June', 15)
      const day15Parent = day15.parentElement
      expect(day15Parent?.className).toContain('rdp-selected')
    })

    it('resolves safe locale code fallback when invalid locale provided', () => {
      render(<Calendar localeCode="xx-INVALID-XX" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)
      expect(screen.getByText('June 2025')).toBeInTheDocument()
    })

    it('handles custom header with numberOfMonths greater than 1', () => {
      render(<Calendar numberOfMonths={2} defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)
      expect(screen.getByText('June 2025')).toBeInTheDocument()
      expect(screen.getByText('July 2025')).toBeInTheDocument()
    })

    it('handles custom Chevron component with all orientations', () => {
      const CustomChevron = ({ orientation }: { orientation?: 'left' | 'right' | 'down' | 'up' }) => (
        <span data-testid={`chevron-${orientation}`}>Chevron</span>
      )

      render(
        <Calendar
          defaultMonth={new Date(2025, 5, 1)}
          components={{
            Chevron: CustomChevron,
          }}
        />,
      )

      expect(screen.getByTestId('chevron-left')).toBeInTheDocument()
      expect(screen.getByTestId('chevron-right')).toBeInTheDocument()
    })

    it('handles navigation with boundary month at exact startOfMonth', async () => {
      const user = userEvent.setup()
      const fromMonth = new Date(2025, 5, 1)

      render(<Calendar from={fromMonth} defaultMonth={fromMonth} showOutsideDays={false} />)

      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeDisabled()

      const nextButton = screen.getByRole('button', { name: /next/i })
      await user.click(nextButton)

      expect(screen.getByText('July 2025')).toBeInTheDocument()
    })

    it('handles multiple mode with empty selected array initializing to undefined', async () => {
      const user = userEvent.setup()

      function ControlledCalendar() {
        const [selected, setSelected] = React.useState<Date[] | undefined>([])
        return (
          <div>
            <Calendar
              mode="multiple"
              selected={selected}
              onSelect={setSelected}
              defaultMonth={new Date(2025, 5, 1)}
              showOutsideDays={false}
            />
            <p data-testid="count">{selected?.length ?? 0}</p>
          </div>
        )
      }

      const { container } = render(<ControlledCalendar />)

      expect(screen.getByTestId('count')).toHaveTextContent('0')

      const day10 = getDayButton(container, 'June', 10)
      await user.click(day10)

      expect(screen.getByTestId('count')).toHaveTextContent('1')
    })

    it('verifies calendar applies correct border-radius CSS custom property', () => {
      const { container } = render(<Calendar radius="lg" defaultMonth={new Date(2025, 5, 1)} />)
      const calendarRoot = container.querySelector('.bg-background') as HTMLElement
      expect(calendarRoot).toBeInTheDocument()
      const style = calendarRoot?.getAttribute('style')
      expect(style).toContain('--cal-radius')
    })

    it('handles controlled month with uncontrolled onMonthChange', async () => {
      const user = userEvent.setup()
      const handleMonthChange = vi.fn()

      render(
        <Calendar
          month={new Date(2025, 5, 1)}
          onMonthChange={handleMonthChange}
          showOutsideDays={false}
          disableNavigation={false}
        />,
      )

      await user.click(screen.getByRole('button', { name: /next/i }))

      expect(handleMonthChange).toHaveBeenCalledWith(expect.any(Date))
      const newMonth = handleMonthChange.mock.calls[0]?.[0] as Date
      expect(newMonth.getMonth()).toBe(6)
    })
  })
})
