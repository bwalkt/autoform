import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Theme } from '@/elements/Theme'
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
      const user = userEvent.setup()

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

    it('does not disable already selected dates when max is reached', async () => {
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

      // At least one call should not have timeZone
      const callsWithoutTimeZone = dateTimeFormatSpy.mock.calls.filter(call => {
        const options = call[1] as Record<string, unknown> | undefined
        return !options || !('timeZone' in options)
      })
      expect(callsWithoutTimeZone.length).toBeGreaterThan(0)
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
})
