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
})
