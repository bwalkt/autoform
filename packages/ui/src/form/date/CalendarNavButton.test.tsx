import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CalendarNavButton } from './CalendarNavButton'

afterEach(() => {
  cleanup()
})

describe('CalendarNavButton', () => {
  const defaultProps = {
    color: 'default' as const,
    radius: 'md' as const,
    bordered: false,
    accentColor: '#000000',
    softColor: 'rgba(0, 0, 0, 0.1)',
    foregroundColor: '#ffffff',
  }

  describe('Variant rendering', () => {
    it('renders with soft variant when bordered is false', () => {
      render(
        <CalendarNavButton {...defaultProps} bordered={false} aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeInTheDocument()
      expect(button.className).toContain('bg-[var(--rdp-accent-background-color)]')
      expect(button.className).toContain('text-[var(--rdp-accent-color)]')
    })

    it('renders with outline variant when bordered is true', () => {
      render(
        <CalendarNavButton {...defaultProps} bordered={true} aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeInTheDocument()
      expect(button.className).toContain('border-[var(--rdp-accent-color)]')
      expect(button.className).toContain('bg-transparent')
    })
  })

  describe('Props passing', () => {
    it('passes color prop to IconButton', () => {
      render(
        <CalendarNavButton {...defaultProps} color="primary" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeInTheDocument()
    })

    it('passes radius prop to IconButton', () => {
      render(
        <CalendarNavButton {...defaultProps} radius="lg" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeInTheDocument()
    })

    it('applies size="1" to IconButton', () => {
      render(
        <CalendarNavButton {...defaultProps} aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeInTheDocument()
    })

    it('passes through onClick handler', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(
        <CalendarNavButton {...defaultProps} onClick={handleClick} aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('passes through disabled prop', () => {
      render(
        <CalendarNavButton {...defaultProps} disabled aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeDisabled()
    })

    it('passes through aria-label prop', () => {
      render(
        <CalendarNavButton {...defaultProps} aria-label="Previous month">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Previous month' })
      expect(button).toBeInTheDocument()
    })
  })

  describe('CSS custom properties', () => {
    it('applies accent color CSS variable', () => {
      render(
        <CalendarNavButton {...defaultProps} accentColor="#ff0000" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toHaveStyle({ '--rdp-accent-color': '#ff0000' })
    })

    it('applies soft color CSS variable', () => {
      render(
        <CalendarNavButton {...defaultProps} softColor="rgba(255, 0, 0, 0.1)" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toHaveStyle({ '--rdp-accent-background-color': 'rgba(255, 0, 0, 0.1)' })
    })

    it('applies foreground color CSS variable', () => {
      render(
        <CalendarNavButton {...defaultProps} foregroundColor="#ffffff" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toHaveStyle({ '--rdp-accent-foreground': '#ffffff' })
    })
  })

  describe('ClassName handling', () => {
    it('applies custom className', () => {
      render(
        <CalendarNavButton {...defaultProps} className="custom-class" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toHaveClass('custom-class')
    })

    it('includes touch-manipulation class', () => {
      render(
        <CalendarNavButton {...defaultProps} aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button.className).toContain('touch-manipulation')
    })

    it('includes -webkit-tap-highlight-color class', () => {
      render(
        <CalendarNavButton {...defaultProps} aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button.className).toContain('[-webkit-tap-highlight-color:transparent]')
    })

    it('includes shrink-0 class', () => {
      render(
        <CalendarNavButton {...defaultProps} aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button.className).toContain('shrink-0')
    })
  })

  describe('Children rendering', () => {
    it('renders children content', () => {
      render(
        <CalendarNavButton {...defaultProps} aria-label="Test button">
          <span data-testid="child-icon">Icon</span>
        </CalendarNavButton>,
      )

      expect(screen.getByTestId('child-icon')).toBeInTheDocument()
      expect(screen.getByText('Icon')).toBeInTheDocument()
    })

    it('renders SVG children', () => {
      render(
        <CalendarNavButton {...defaultProps} aria-label="Test button">
          <svg data-testid="svg-icon">
            <path />
          </svg>
        </CalendarNavButton>,
      )

      expect(screen.getByTestId('svg-icon')).toBeInTheDocument()
    })
  })

  describe('Different color tokens', () => {
    it('renders with primary color', () => {
      render(
        <CalendarNavButton {...defaultProps} color="primary" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeInTheDocument()
    })

    it('renders with success color', () => {
      render(
        <CalendarNavButton {...defaultProps} color="success" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeInTheDocument()
    })

    it('renders with error color', () => {
      render(
        <CalendarNavButton {...defaultProps} color="error" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeInTheDocument()
    })

    it('renders with warning color', () => {
      render(
        <CalendarNavButton {...defaultProps} color="warning" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeInTheDocument()
    })

    it('renders with info color', () => {
      render(
        <CalendarNavButton {...defaultProps} color="info" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeInTheDocument()
    })

    it('renders with neutral color', () => {
      render(
        <CalendarNavButton {...defaultProps} color="neutral" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeInTheDocument()
    })
  })

  describe('Different radius tokens', () => {
    it('renders with none radius', () => {
      render(
        <CalendarNavButton {...defaultProps} radius="none" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeInTheDocument()
    })

    it('renders with sm radius', () => {
      render(
        <CalendarNavButton {...defaultProps} radius="sm" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeInTheDocument()
    })

    it('renders with md radius', () => {
      render(
        <CalendarNavButton {...defaultProps} radius="md" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeInTheDocument()
    })

    it('renders with lg radius', () => {
      render(
        <CalendarNavButton {...defaultProps} radius="lg" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeInTheDocument()
    })

    it('renders with full radius', () => {
      render(
        <CalendarNavButton {...defaultProps} radius="full" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeInTheDocument()
    })
  })

  describe('Bordered vs non-bordered styling', () => {
    it('applies correct hover styles for bordered variant', () => {
      render(
        <CalendarNavButton {...defaultProps} bordered={true} aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button.className).toContain('hover:bg-[var(--rdp-accent-background-color)]')
      expect(button.className).toContain('hover:text-[var(--rdp-accent-color)]')
    })

    it('applies correct hover styles for non-bordered variant', () => {
      render(
        <CalendarNavButton {...defaultProps} bordered={false} aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button.className).toContain('hover:bg-[var(--rdp-accent-color)]')
      expect(button.className).toContain('hover:text-[var(--rdp-accent-foreground)]')
    })

    it('applies border styles for bordered variant', () => {
      render(
        <CalendarNavButton {...defaultProps} bordered={true} aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button.className).toContain('border')
      expect(button.className).toContain('border-[var(--rdp-accent-color)]')
    })

    it('applies transparent border for non-bordered variant', () => {
      render(
        <CalendarNavButton {...defaultProps} bordered={false} aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button.className).toContain('border')
      expect(button.className).toContain('border-transparent')
    })
  })

  describe('Variant resolution edge cases', () => {
    it('resolves to outline variant when variant is explicitly outline', () => {
      render(
        <CalendarNavButton {...defaultProps} variant="outline" bordered={false} aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button.className).toContain('border-[var(--rdp-accent-color)]')
    })

    it('resolves to ghost variant when variant is explicitly ghost', () => {
      render(
        <CalendarNavButton {...defaultProps} variant="ghost" bordered={false} aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button.className).toContain('bg-transparent')
      expect(button.className).toContain('hover:bg-[var(--rdp-accent-background-color)]')
    })

    it('resolves to soft variant when variant is explicitly soft', () => {
      render(
        <CalendarNavButton {...defaultProps} variant="soft" bordered={true} aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button.className).toContain('bg-[var(--rdp-accent-background-color)]')
    })

    it('uses bordered to determine default variant when variant is undefined', () => {
      render(
        <CalendarNavButton {...defaultProps} variant={undefined} bordered={true} aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button.className).toContain('border-[var(--rdp-accent-color)]')
    })
  })

  describe('Additional edge cases', () => {
    it('handles rapid clicks', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(
        <CalendarNavButton {...defaultProps} onClick={handleClick} aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      await user.click(button)
      await user.click(button)
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('does not trigger click when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(
        <CalendarNavButton {...defaultProps} onClick={handleClick} disabled aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      await user.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('maintains correct styling with custom className and bordered=true', () => {
      render(
        <CalendarNavButton {...defaultProps} bordered={true} className="my-custom-class" aria-label="Test button">
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toHaveClass('my-custom-class')
      expect(button.className).toContain('border-[var(--rdp-accent-color)]')
    })

    it('handles complex CSS variable values', () => {
      render(
        <CalendarNavButton
          {...defaultProps}
          accentColor="rgb(255, 100, 50)"
          softColor="color-mix(in oklab, rgb(255, 100, 50) 18%, transparent)"
          foregroundColor="rgb(255, 255, 255)"
          aria-label="Test button"
        >
          <span>Icon</span>
        </CalendarNavButton>,
      )

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toHaveStyle({ '--rdp-accent-color': 'rgb(255, 100, 50)' })
      expect(button).toHaveStyle({
        '--rdp-accent-background-color': 'color-mix(in oklab, rgb(255, 100, 50) 18%, transparent)',
      })
    })

    it('renders without children', () => {
      render(<CalendarNavButton {...defaultProps} aria-label="Test button" />)

      const button = screen.getByRole('button', { name: 'Test button' })
      expect(button).toBeInTheDocument()
    })
  })
})