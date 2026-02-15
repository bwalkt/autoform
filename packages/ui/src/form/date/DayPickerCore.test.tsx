import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { DayPickerCore } from './DayPickerCore'
import { buildMonthCells, isCoreDateDisabled } from './day-picker-core'

afterEach(() => {
  cleanup()
})

describe('DayPickerCore foundation', () => {
  it('builds a full month grid in week rows', () => {
    const cells = buildMonthCells(new Date(2026, 1, 1), 0)
    expect(cells.length % 7).toBe(0)
    expect(cells.length).toBeGreaterThanOrEqual(28)
  })

  it('renders title and weekday headers', () => {
    render(<DayPickerCore month={new Date(2026, 1, 1)} />)

    expect(screen.getByText('February 2026')).toBeInTheDocument()
    expect(screen.getByText('Sun')).toBeInTheDocument()
    expect(screen.getByText('Sat')).toBeInTheDocument()
  })

  it('calls onSelect when a day button is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<DayPickerCore month={new Date(2026, 1, 1)} showOutsideDays={false} onSelect={onSelect} />)

    const buttons = screen.getAllByRole('button', { name: '12' })
    await user.click(buttons[0] as HTMLElement)
    expect(onSelect).toHaveBeenCalled()
  })

  it('applies min/max and disabled matcher checks', () => {
    const date = new Date(2026, 1, 10)
    expect(
      isCoreDateDisabled(date, {
        min: new Date(2026, 1, 11),
      }),
    ).toBe(true)
    expect(
      isCoreDateDisabled(date, {
        disabled: [{ from: new Date(2026, 1, 9), to: new Date(2026, 1, 11) }],
      }),
    ).toBe(true)
  })
})
