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

    const button = screen.getByRole('button', { name: 'Thursday, February 12, 2026' })
    await user.click(button)
    expect(onSelect).toHaveBeenCalledWith(expect.any(Date))
    const calledDate = onSelect.mock.calls[0][0] as Date
    expect(calledDate.getDate()).toBe(12)
    expect(calledDate.getMonth()).toBe(1)
    expect(calledDate.getFullYear()).toBe(2026)
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

  it('does not call onSelect for disabled dates', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <DayPickerCore
        month={new Date(2026, 1, 1)}
        showOutsideDays={false}
        disabled={[new Date(2026, 1, 12)]}
        onSelect={onSelect}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Thursday, February 12, 2026' }))
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('allows deselect when required is false', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <DayPickerCore
        month={new Date(2026, 1, 1)}
        showOutsideDays={false}
        selected={new Date(2026, 1, 12)}
        required={false}
        onSelect={onSelect}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Thursday, February 12, 2026' }))
    expect(onSelect).toHaveBeenCalledWith(undefined)
  })
})
