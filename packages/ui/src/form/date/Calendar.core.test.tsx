import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Calendar } from './Calendar'

afterEach(() => {
  cleanup()
})

describe('Calendar experimentalCorePicker', () => {
  it('renders DayPickerCore path and selects a date', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    render(
      <Calendar
        mode="single"
        experimentalCorePicker={true}
        defaultMonth={new Date(2026, 1, 1)}
        selected={new Date(2026, 1, 11)}
        onSelect={onSelect}
      />,
    )

    expect(screen.getByRole('heading', { name: 'February 2026' })).toBeInTheDocument()
    await user.click(screen.getAllByRole('button', { name: '12' })[0] as HTMLElement)
    expect(onSelect).toHaveBeenCalled()
  })
})
