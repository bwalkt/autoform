'use client'

import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { AppointmentPicker, type AppointmentValue, type TimeSlot } from './AppointmentPicker'

const meta: Meta<typeof AppointmentPicker> = {
  title: 'Form/Date/AppointmentPicker',
  component: AppointmentPicker,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof AppointmentPicker>

// Default AppointmentPicker
export const Default: Story = {
  render: () => {
    const [appointment, setAppointment] = React.useState<AppointmentValue | undefined>()
    return (
      <div className="w-[540px]">
        <AppointmentPicker
          value={appointment}
          onChange={setAppointment}
          onConfirm={value => alert(`Booked: ${value.date.toLocaleDateString()} at ${value.time}`)}
        />
      </div>
    )
  },
}

// With preselected value
export const WithValue: Story = {
  render: () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const [appointment, setAppointment] = React.useState<AppointmentValue | undefined>({
      date: tomorrow,
      time: '10:00',
    })
    return (
      <div className="w-[540px]">
        <AppointmentPicker
          value={appointment}
          onChange={setAppointment}
          onConfirm={value => alert(`Booked: ${value.date.toLocaleDateString()} at ${value.time}`)}
        />
      </div>
    )
  },
}

// Custom title
export const CustomTitle: Story = {
  render: () => {
    const [appointment, setAppointment] = React.useState<AppointmentValue | undefined>()
    return (
      <div className="w-[540px]">
        <AppointmentPicker
          value={appointment}
          onChange={setAppointment}
          title="Schedule a consultation"
          confirmText="Book Now"
          onConfirm={value => alert(`Booked: ${value.date.toLocaleDateString()} at ${value.time}`)}
        />
      </div>
    )
  },
}

// Custom time slots (30-minute intervals)
export const CustomTimeSlots: Story = {
  render: () => {
    const [appointment, setAppointment] = React.useState<AppointmentValue | undefined>()

    const customSlots: TimeSlot[] = [
      { time: '09:00', label: '9:00 AM', available: true },
      { time: '09:30', label: '9:30 AM', available: true },
      { time: '10:00', label: '10:00 AM', available: false },
      { time: '10:30', label: '10:30 AM', available: true },
      { time: '11:00', label: '11:00 AM', available: true },
      { time: '11:30', label: '11:30 AM', available: false },
      { time: '12:00', label: '12:00 PM', available: true },
      { time: '14:00', label: '2:00 PM', available: true },
      { time: '14:30', label: '2:30 PM', available: true },
      { time: '15:00', label: '3:00 PM', available: true },
      { time: '15:30', label: '3:30 PM', available: false },
      { time: '16:00', label: '4:00 PM', available: true },
    ]

    return (
      <div className="w-[540px]">
        <AppointmentPicker
          value={appointment}
          onChange={setAppointment}
          defaultTimeSlots={customSlots}
          title="Select available time"
          onConfirm={value => alert(`Booked: ${value.date.toLocaleDateString()} at ${value.time}`)}
        />
      </div>
    )
  },
}

// Dynamic slots based on date
export const DynamicSlots: Story = {
  render: () => {
    const [appointment, setAppointment] = React.useState<AppointmentValue | undefined>()

    const getAvailableTimeSlots = (date: Date): TimeSlot[] => {
      const dayOfWeek = date.getDay()

      // Weekend - limited hours
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        return [
          { time: '10:00', label: '10:00 AM', available: true },
          { time: '11:00', label: '11:00 AM', available: true },
          { time: '12:00', label: '12:00 PM', available: true },
        ]
      }

      // Weekday - full hours
      return [
        { time: '09:00', label: '9:00 AM', available: true },
        { time: '10:00', label: '10:00 AM', available: true },
        { time: '11:00', label: '11:00 AM', available: true },
        { time: '12:00', label: '12:00 PM', available: true },
        { time: '14:00', label: '2:00 PM', available: true },
        { time: '15:00', label: '3:00 PM', available: true },
        { time: '16:00', label: '4:00 PM', available: true },
        { time: '17:00', label: '5:00 PM', available: true },
      ]
    }

    return (
      <div className="w-[540px]">
        <AppointmentPicker
          value={appointment}
          onChange={setAppointment}
          getAvailableTimeSlots={getAvailableTimeSlots}
          title="Book appointment (different hours on weekends)"
          onConfirm={value => alert(`Booked: ${value.date.toLocaleDateString()} at ${value.time}`)}
        />
      </div>
    )
  },
}

// Without confirmation button
export const WithoutConfirmButton: Story = {
  render: () => {
    const [appointment, setAppointment] = React.useState<AppointmentValue | undefined>()
    return (
      <div className="w-[540px]">
        <AppointmentPicker value={appointment} onChange={setAppointment} showConfirmButton={false} />
        {appointment && (
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Selected: {appointment.date.toLocaleDateString()} at {appointment.time}
          </p>
        )}
      </div>
    )
  },
}

// Without confirmation message
export const WithoutConfirmation: Story = {
  render: () => {
    const [appointment, setAppointment] = React.useState<AppointmentValue | undefined>()
    return (
      <div className="w-[540px]">
        <AppointmentPicker
          value={appointment}
          onChange={setAppointment}
          showConfirmation={false}
          onConfirm={value => alert(`Booked: ${value.date.toLocaleDateString()} at ${value.time}`)}
        />
      </div>
    )
  },
}

// Custom confirmation format
export const CustomConfirmationFormat: Story = {
  render: () => {
    const [appointment, setAppointment] = React.useState<AppointmentValue | undefined>()
    return (
      <div className="w-[540px]">
        <AppointmentPicker
          value={appointment}
          onChange={setAppointment}
          title="Schedule your demo"
          confirmText="Confirm Booking"
          bookingMessage={(value, durationMinutes) =>
            `Demo scheduled: ${value.date.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })} @ ${value.time} (${durationMinutes} min)`
          }
          onConfirm={value => alert(`Booked: ${value.date.toLocaleDateString()} at ${value.time}`)}
        />
      </div>
    )
  },
}

// With min date (future only)
export const FutureOnly: Story = {
  render: () => {
    const [appointment, setAppointment] = React.useState<AppointmentValue | undefined>()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return (
      <div className="w-[540px]">
        <AppointmentPicker
          value={appointment}
          onChange={setAppointment}
          minDate={today}
          title="Book a future appointment"
          onConfirm={value => alert(`Booked: ${value.date.toLocaleDateString()} at ${value.time}`)}
        />
      </div>
    )
  },
}

// Disabled state
export const Disabled: Story = {
  render: () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    return (
      <div className="w-[540px]">
        <AppointmentPicker value={{ date: tomorrow, time: '10:00' }} disabled />
      </div>
    )
  },
}

// Compact time slot height
export const CompactSlots: Story = {
  render: () => {
    const [appointment, setAppointment] = React.useState<AppointmentValue | undefined>()

    const shortSlots: TimeSlot[] = [
      { time: '09:00', available: true },
      { time: '10:00', available: true },
      { time: '11:00', available: true },
      { time: '14:00', available: true },
      { time: '15:00', available: true },
    ]

    return (
      <div className="w-[540px]">
        <AppointmentPicker
          value={appointment}
          onChange={setAppointment}
          defaultTimeSlots={shortSlots}
          timeSlotWidth="10rem"
          title="Quick booking"
          onConfirm={value => alert(`Booked: ${value.date.toLocaleDateString()} at ${value.time}`)}
        />
      </div>
    )
  },
}
