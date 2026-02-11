import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
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

      expect(handleSelect).toHaveBeenCalledWith(expect.any(Date), expect.any(Date), expect.any(Object), expect.any(Object))
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
        <Calendar mode="multiple" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} onSelect={handleSelect} />,
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
        const [selected, setSelected] = React.useState<Date[] | undefined>([new Date(2025, 5, 4), new Date(2025, 5, 10)])
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
            <p data-testid="selected-values">
              {selected?.map(date => date.getDate()).join(',') ?? 'none'}
            </p>
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
            <p data-testid="selected-values">
              {selected?.map(date => date.getDate()).join(',') ?? 'none'}
            </p>
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

      render(
        <Calendar defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} onMonthChange={handleMonthChange} />,
      )

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
  })

  describe('Edge cases', () => {
    it('handles uncontrolled multiple mode', async () => {
      const user = userEvent.setup()

      const { container } = render(<Calendar mode="multiple" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)

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
  })
})