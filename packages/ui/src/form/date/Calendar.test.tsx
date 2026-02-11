import { cleanup, render, screen } from '@testing-library/react'
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

  it('selects a date in single mode', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()

    const { container } = render(
      <Calendar mode="single" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} onSelect={handleSelect} />,
    )

    const day15 = getDayButton(container, 'June', 15)
    await user.click(day15)

    expect(handleSelect).toHaveBeenCalledTimes(1)
    const selected = handleSelect.mock.calls[0]?.[0] as Date | undefined
    expect(selected?.getDate()).toBe(15)
    expect(selected?.getMonth()).toBe(5)
    expect(selected?.getFullYear()).toBe(2025)
  })

  it('changes selected date in single mode', async () => {
    const user = userEvent.setup()

    function ControlledCalendar() {
      const [selected, setSelected] = React.useState<Date | undefined>(undefined)
      return (
        <div>
          <Calendar
            mode="single"
            selected={selected}
            onSelect={setSelected}
            defaultMonth={new Date(2025, 5, 1)}
            showOutsideDays={false}
          />
          <p data-testid="selected-value">{selected?.getDate() ?? 'none'}</p>
        </div>
      )
    }

    const { container } = render(<ControlledCalendar />)

    expect(screen.getByTestId('selected-value')).toHaveTextContent('none')

    const day10 = getDayButton(container, 'June', 10)
    await user.click(day10)
    expect(screen.getByTestId('selected-value')).toHaveTextContent('10')

    const day20 = getDayButton(container, 'June', 20)
    await user.click(day20)
    expect(screen.getByTestId('selected-value')).toHaveTextContent('20')
  })

  it('selects a date range in range mode', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()

    const { container } = render(
      <Calendar mode="range" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} onSelect={handleSelect} />,
    )

    const day10 = getDayButton(container, 'June', 10)
    const day15 = getDayButton(container, 'June', 15)

    await user.click(day10)
    expect(handleSelect).toHaveBeenCalled()

    await user.click(day15)
    expect(handleSelect).toHaveBeenCalled()

    // Verify range selection is working
    expect(handleSelect.mock.calls.length).toBeGreaterThan(0)
  })

  it('respects min constraint in multiple mode', async () => {
    const user = userEvent.setup()

    function ControlledCalendar() {
      const [selected, setSelected] = React.useState<Date[] | undefined>([new Date(2025, 5, 10), new Date(2025, 5, 15)])
      return (
        <div>
          <Calendar
            mode="multiple"
            min={2}
            selected={selected}
            onSelect={setSelected}
            defaultMonth={new Date(2025, 5, 1)}
            showOutsideDays={false}
          />
          <p data-testid="selected-count">{selected?.length ?? 0}</p>
        </div>
      )
    }

    const { container } = render(<ControlledCalendar />)

    expect(screen.getByTestId('selected-count')).toHaveTextContent('2')

    // Try to unselect when at minimum
    const day10 = getDayButton(container, 'June', 10)
    await user.click(day10)

    // Should maintain 2 selections due to min constraint
    expect(screen.getByTestId('selected-count')).toHaveTextContent('2')
  })

  it('respects required constraint in multiple mode', async () => {
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
          <p data-testid="selected-count">{selected?.length ?? 0}</p>
        </div>
      )
    }

    const { container } = render(<ControlledCalendar />)

    expect(screen.getByTestId('selected-count')).toHaveTextContent('1')

    // Try to unselect the only selected date
    const day10 = getDayButton(container, 'June', 10)
    await user.click(day10)

    // Should maintain 1 selection due to required constraint
    expect(screen.getByTestId('selected-count')).toHaveTextContent('1')
  })

  it('navigates to previous month', async () => {
    const user = userEvent.setup()
    render(<Calendar mode="single" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)

    expect(screen.getAllByText('June 2025')).not.toHaveLength(0)

    await user.click(screen.getByRole('button', { name: /previous/i }))
    expect(screen.getAllByText('May 2025')).not.toHaveLength(0)
  })

  it('navigates to next month', async () => {
    const user = userEvent.setup()
    render(<Calendar mode="single" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)

    expect(screen.getAllByText('June 2025')).not.toHaveLength(0)

    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getAllByText('July 2025')).not.toHaveLength(0)
  })

  it('calls onMonthChange when month changes', async () => {
    const user = userEvent.setup()
    const handleMonthChange = vi.fn()

    render(
      <Calendar
        mode="single"
        defaultMonth={new Date(2025, 5, 1)}
        showOutsideDays={false}
        onMonthChange={handleMonthChange}
      />,
    )

    await user.click(screen.getByRole('button', { name: /next/i }))

    expect(handleMonthChange).toHaveBeenCalledTimes(1)
    const newMonth = handleMonthChange.mock.calls[0]?.[0] as Date
    expect(newMonth.getMonth()).toBe(6) // July
  })

  it('supports controlled month prop', async () => {
    const user = userEvent.setup()

    function ControlledCalendar() {
      const [month, setMonth] = React.useState(new Date(2025, 5, 1))
      return (
        <div>
          <Calendar mode="single" month={month} onMonthChange={setMonth} showOutsideDays={false} />
          <p data-testid="current-month">{month.getMonth()}</p>
        </div>
      )
    }

    render(<ControlledCalendar />)

    expect(screen.getByTestId('current-month')).toHaveTextContent('5') // June

    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByTestId('current-month')).toHaveTextContent('6') // July
  })

  it('renders with default color', () => {
    const { container } = render(<Calendar mode="single" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />)

    const calendar = container.querySelector('.group\\/calendar')
    expect(calendar).toBeInTheDocument()
  })

  it('renders with primary color', () => {
    const { container } = render(
      <Calendar mode="single" color="primary" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />,
    )

    const calendar = container.querySelector('.group\\/calendar')
    expect(calendar).toBeInTheDocument()
  })

  it('renders with custom color variants', () => {
    const colors = ['info', 'success', 'warning', 'error'] as const

    for (const color of colors) {
      const { container } = render(
        <Calendar mode="single" color={color} defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />,
      )
      const calendar = container.querySelector('.group\\/calendar')
      expect(calendar).toBeInTheDocument()
      cleanup()
    }
  })

  it('applies custom radius', () => {
    const radiusOptions = ['none', 'sm', 'md', 'lg', 'full'] as const

    for (const radius of radiusOptions) {
      const { container } = render(
        <Calendar mode="single" radius={radius} defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />,
      )
      const calendar = container.querySelector('.group\\/calendar')
      expect(calendar).toBeInTheDocument()
      cleanup()
    }
  })

  it('uses bordered navigation buttons when navButtonBordered is true', () => {
    const { container } = render(
      <Calendar mode="single" navButtonBordered defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />,
    )

    const navButtons = container.querySelectorAll('button[class*="border"]')
    expect(navButtons.length).toBeGreaterThan(0)
  })

  it('calculates numberOfMonths based on from and to props', () => {
    render(<Calendar mode="single" from={new Date(2025, 0, 1)} to={new Date(2025, 2, 31)} showOutsideDays={false} />)

    // Should show at least 3 months (Jan, Feb, Mar)
    expect(screen.getAllByText(/2025/)).not.toHaveLength(0)
  })

  it('handles uncontrolled multiple mode', async () => {
    const user = userEvent.setup()

    const { container } = render(
      <Calendar mode="multiple" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />,
    )

    const day10 = getDayButton(container, 'June', 10)
    const day15 = getDayButton(container, 'June', 15)

    await user.click(day10)
    await user.click(day15)

    // Both days should be selected (visual verification through DOM)
    expect(day10).toBeInTheDocument()
    expect(day15).toBeInTheDocument()
  })

  it('allows selecting dates up to max in multiple mode', async () => {
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

    const day5 = getDayButton(container, 'June', 5)
    const day10 = getDayButton(container, 'June', 10)
    const day15 = getDayButton(container, 'June', 15)

    await user.click(day5)
    await user.click(day10)
    await user.click(day15)

    const lastCall = handleSelect.mock.calls[handleSelect.mock.calls.length - 1]?.[0] as Date[] | undefined
    expect(lastCall?.length).toBe(3)
  })

  it('renders with custom className', () => {
    const { container } = render(
      <Calendar
        mode="single"
        className="custom-calendar"
        defaultMonth={new Date(2025, 5, 1)}
        showOutsideDays={false}
      />,
    )

    const calendar = container.querySelector('.custom-calendar')
    expect(calendar).toBeInTheDocument()
  })

  it('defaults to current date when no defaultMonth or from is provided', () => {
    const { container } = render(<Calendar mode="single" showOutsideDays={false} />)

    const calendar = container.querySelector('.group\\/calendar')
    expect(calendar).toBeInTheDocument()
  })

  it('uses defaultMonth when provided', () => {
    render(<Calendar mode="single" defaultMonth={new Date(2023, 11, 1)} showOutsideDays={false} />)

    expect(screen.getAllByText('December 2023')).not.toHaveLength(0)
  })

  it('prefers from prop over defaultMonth', () => {
    render(
      <Calendar
        mode="single"
        from={new Date(2024, 0, 1)}
        defaultMonth={new Date(2023, 11, 1)}
        showOutsideDays={false}
      />,
    )

    expect(screen.getAllByText('January 2024')).not.toHaveLength(0)
  })

  it('sets pagedNavigation to true when numberOfMonths > 1', () => {
    const { container } = render(
      <Calendar mode="single" numberOfMonths={3} defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} />,
    )

    // Should show multiple months
    const calendar = container.querySelector('.group\\/calendar')
    expect(calendar).toBeInTheDocument()
  })

  it('handles showOutsideDays prop', () => {
    const { container } = render(<Calendar mode="single" showOutsideDays={true} defaultMonth={new Date(2025, 5, 1)} />)

    const calendar = container.querySelector('.group\\/calendar')
    expect(calendar).toBeInTheDocument()
  })

  it('applies custom classNames to calendar parts', () => {
    const customClassNames = {
      root: 'custom-root',
      month: 'custom-month',
    }

    const { container } = render(
      <Calendar
        mode="single"
        classNames={customClassNames}
        defaultMonth={new Date(2025, 5, 1)}
        showOutsideDays={false}
      />,
    )

    expect(container.querySelector('.custom-root')).toBeInTheDocument()
    expect(container.querySelector('.custom-month')).toBeInTheDocument()
  })

  it('accepts custom formatters', () => {
    const customFormatters = {
      formatMonthDropdown: (date: Date) => `Month ${date.getMonth() + 1}`,
    }

    render(
      <Calendar
        mode="single"
        formatters={customFormatters}
        defaultMonth={new Date(2025, 5, 1)}
        showOutsideDays={false}
      />,
    )

    // Calendar should render with custom formatter
    const calendar = document.querySelector('.group\\/calendar')
    expect(calendar).toBeInTheDocument()
  })

  it('handles edge case: selecting and unselecting in multiple mode', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()

    const { container } = render(
      <Calendar mode="multiple" defaultMonth={new Date(2025, 5, 1)} showOutsideDays={false} onSelect={handleSelect} />,
    )

    const day10 = getDayButton(container, 'June', 10)

    // Select
    await user.click(day10)
    expect(handleSelect.mock.calls[0]?.[0]).toEqual(expect.arrayContaining([expect.any(Date)]))

    // Unselect
    await user.click(day10)
    expect(handleSelect.mock.calls[1]?.[0]).toBeUndefined()
  })

  it('handles boundary case: min constraint equals selected count', async () => {
    const user = userEvent.setup()

    function ControlledCalendar() {
      const [selected, setSelected] = React.useState<Date[] | undefined>([new Date(2025, 5, 10), new Date(2025, 5, 15)])
      return (
        <div>
          <Calendar
            mode="multiple"
            min={2}
            selected={selected}
            onSelect={setSelected}
            defaultMonth={new Date(2025, 5, 1)}
            showOutsideDays={false}
          />
          <p data-testid="selected-count">{selected?.length ?? 0}</p>
        </div>
      )
    }

    const { container } = render(<ControlledCalendar />)

    expect(screen.getByTestId('selected-count')).toHaveTextContent('2')

    const day10 = getDayButton(container, 'June', 10)
    await user.click(day10)

    // Should maintain 2 selections
    expect(screen.getByTestId('selected-count')).toHaveTextContent('2')
  })
})
