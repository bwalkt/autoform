import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AppointmentPicker, type AppointmentValue, type TimeSlot } from './AppointmentPicker'

afterEach(() => {
  cleanup()
})

function getCalendarGrid(): HTMLElement {
  return screen.getByRole('grid')
}

function getDayButton(day: number): HTMLElement {
  const cell = within(getCalendarGrid()).getByRole('gridcell', { name: String(day) })
  return within(cell).getByRole('button')
}

describe('AppointmentPicker', () => {
  it('renders title and disables continue until selection is complete', () => {
    render(<AppointmentPicker title="Book your appointment" showConfirmation={false} />)

    expect(screen.getByRole('heading', { name: 'Book your appointment' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled()
  })

  it('calls onChange with appointment value when a slot is selected', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const initialValue: AppointmentValue = { date: new Date(2026, 1, 13), time: '09:00' }

    render(<AppointmentPicker value={initialValue} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: '10:00' }))

    expect(onChange).toHaveBeenCalledWith({
      date: new Date(2026, 1, 13),
      time: '10:00',
    })
    expect(screen.getByRole('button', { name: 'Continue' })).toBeEnabled()
  })

  it('resets time selection when date changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const initialValue: AppointmentValue = { date: new Date(2026, 1, 13), time: '09:00' }

    render(<AppointmentPicker value={initialValue} onChange={onChange} />)

    await user.click(getDayButton(14))

    expect(onChange).toHaveBeenCalledWith(undefined)
    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled()
  })

  it('does not allow selecting unavailable slot', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const slots: TimeSlot[] = [
      { time: '09:00', available: true },
      { time: '09:15', available: false },
    ]

    render(
      <AppointmentPicker
        value={{ date: new Date(2026, 1, 13), time: '09:00' }}
        onChange={onChange}
        defaultTimeSlots={slots}
      />,
    )

    const disabledSlot = screen.getByRole('button', { name: '09:15' })
    expect(disabledSlot).toBeDisabled()

    await user.click(disabledSlot)
    expect(onChange).not.toHaveBeenCalledWith({
      date: new Date(2026, 1, 13),
      time: '09:15',
    })
  })

  it('uses bookingMessage and shows confirmation icon when complete', () => {
    const bookingMessage = vi.fn(() => 'Custom booking copy')

    render(
      <AppointmentPicker
        value={{ date: new Date(2026, 1, 13), time: '10:00' }}
        bookingMessage={bookingMessage}
        meetingDurationMinutes={30}
      />,
    )

    expect(bookingMessage).toHaveBeenCalledWith({ date: new Date(2026, 1, 13), time: '10:00' }, 30)
    expect(screen.getByText('Custom booking copy')).toBeInTheDocument()
    expect(document.querySelector('svg')).toBeInTheDocument()
  })

  it('calls onConfirm with selected appointment', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()

    render(<AppointmentPicker value={{ date: new Date(2026, 1, 13), time: '10:00' }} onConfirm={onConfirm} />)

    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(onConfirm).toHaveBeenCalledWith({
      date: new Date(2026, 1, 13),
      time: '10:00',
    })
  })

  it('keeps month/year picker available in appointment calendar', async () => {
    const user = userEvent.setup()

    render(<AppointmentPicker value={{ date: new Date(2026, 1, 13), time: '10:00' }} />)

    const monthYearTrigger = screen.getByRole('button', { name: /february 2026/i })
    await user.click(monthYearTrigger)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
