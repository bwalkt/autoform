import { cleanup, render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Avatar } from './Avatar'

afterEach(() => {
  cleanup()
})

describe('Avatar', () => {
  it('renders with default props', () => {
    const { container } = render(<Avatar />)
    const avatar = container.querySelector('span')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveClass('rt-avatar-size')
  })

  it('displays image when src is provided', async () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User avatar" />)

    const img = screen.getByRole('img', { name: 'User avatar' })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg')
  })

  it('shows fallback while image is loading', () => {
    render(<Avatar src="https://example.com/avatar.jpg" fallback="John Doe" />)

    // Fallback should be visible initially
    expect(screen.getByText('JD')).toBeInTheDocument()

    // Image should be present but with opacity-0 class
    const img = screen.getByRole('img')
    expect(img).toHaveClass('opacity-0')
  })

  it('removes opacity from image after loading', async () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User" />)

    const img = screen.getByRole('img', { name: 'User' })

    // Simulate image load
    img.dispatchEvent(new Event('load'))

    await waitFor(() => {
      expect(img).not.toHaveClass('opacity-0')
    })
  })

  it('displays fallback when image fails to load', async () => {
    render(<Avatar src="https://example.com/invalid.jpg" fallback="Jane Smith" />)

    const img = screen.getByRole('img')

    // Simulate image error
    img.dispatchEvent(new Event('error'))

    await waitFor(() => {
      expect(screen.getByText('JS')).toBeInTheDocument()
    })
  })

  it('generates initials from fallback text correctly', () => {
    render(<Avatar fallback="John Doe" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('generates initials from single word fallback', () => {
    render(<Avatar fallback="John" />)
    expect(screen.getByText('J')).toBeInTheDocument()
  })

  it('generates initials from multi-word fallback (max 2 letters)', () => {
    render(<Avatar fallback="John Michael Doe" />)
    expect(screen.getByText('JM')).toBeInTheDocument()
  })

  it('converts initials to uppercase', () => {
    render(<Avatar fallback="john doe" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('displays user icon when no fallback text is provided', () => {
    const { container } = render(<Avatar />)

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
  })

  it('applies size variant correctly (size="1")', () => {
    const { container } = render(<Avatar size="1" />)
    const avatar = container.querySelector('span')
    const style = avatar?.getAttribute('style')
    expect(style).toContain('--rt-avatar-size')
    expect(style).toContain('--rt-avatar-font-size')
    expect(style).toContain('--rt-avatar-line-height')
  })

  it('applies size variant correctly (size="6")', () => {
    const { container } = render(<Avatar size="6" />)
    const avatar = container.querySelector('span')
    expect(avatar).toHaveStyle({
      '--rt-avatar-size': '5rem',
    })
  })

  it('applies solid variant with primary color', () => {
    const { container } = render(<Avatar variant="solid" color="primary" fallback="JD" />)
    const avatar = container.querySelector('span')
    expect(avatar).toHaveClass('bg-primary', 'text-primary-foreground')
  })

  it('applies soft variant with success color', () => {
    const { container } = render(<Avatar variant="soft" color="success" fallback="JD" />)
    const avatar = container.querySelector('span')
    expect(avatar).toHaveClass('bg-green-500/10', 'text-green-600')
  })

  it('applies solid variant with error color', () => {
    const { container } = render(<Avatar variant="solid" color="error" fallback="JD" />)
    const avatar = container.querySelector('span')
    expect(avatar).toHaveClass('bg-red-500', 'text-white')
  })

  it('applies radius variant (rounded-full)', () => {
    const { container } = render(<Avatar radius="full" />)
    const avatar = container.querySelector('span')
    expect(avatar).toHaveClass('rounded-full')
  })

  it('applies radius variant (rounded-sm)', () => {
    const { container } = render(<Avatar radius="sm" />)
    const avatar = container.querySelector('span')
    expect(avatar).toHaveClass('rounded-sm')
  })

  it('applies radius variant (rounded-none)', () => {
    const { container } = render(<Avatar radius="none" />)
    const avatar = container.querySelector('span')
    expect(avatar).toHaveClass('rounded-none')
  })

  it('accepts custom className', () => {
    const { container } = render(<Avatar className="custom-class" />)
    const avatar = container.querySelector('span')
    expect(avatar).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(<Avatar ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it('uses alt text when provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Custom alt text" />)
    const img = screen.getByRole('img', { name: 'Custom alt text' })
    expect(img).toBeInTheDocument()
  })

  it('uses fallback text as alt when alt is not provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" fallback="John Doe" />)
    const img = screen.getByRole('img', { name: 'John Doe' })
    expect(img).toBeInTheDocument()
  })

  it('uses "Avatar" as default alt text', () => {
    render(<Avatar src="https://example.com/avatar.jpg" />)
    const img = screen.getByRole('img', { name: 'Avatar' })
    expect(img).toBeInTheDocument()
  })

  it('resets loading state when src changes', async () => {
    const { rerender } = render(<Avatar src="https://example.com/avatar1.jpg" fallback="JD" />)

    const img1 = screen.getByRole('img')
    img1.dispatchEvent(new Event('load'))

    await waitFor(() => {
      expect(img1).not.toHaveClass('opacity-0')
    })

    // Change src
    rerender(<Avatar src="https://example.com/avatar2.jpg" fallback="JD" />)

    const img2 = screen.getByRole('img')
    // Should reset to loading state
    expect(img2).toHaveClass('opacity-0')
  })

  it('resets error state when src changes', async () => {
    const { rerender } = render(<Avatar src="https://example.com/invalid1.jpg" fallback="John Doe" />)

    const img1 = screen.getByRole('img')
    img1.dispatchEvent(new Event('error'))

    await waitFor(() => {
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    // Change src should reset error state
    rerender(<Avatar src="https://example.com/avatar2.jpg" fallback="John Doe" />)

    const img2 = screen.getByRole('img')
    expect(img2).toBeInTheDocument()
    expect(img2).toHaveAttribute('src', 'https://example.com/avatar2.jpg')
  })

  it('handles empty string fallback', () => {
    const { container } = render(<Avatar fallback="" />)

    // Should show user icon when fallback is empty
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('applies all color variants in solid mode', () => {
    const colors = ['default', 'primary', 'neutral', 'info', 'success', 'warning', 'error'] as const

    for (const color of colors) {
      const { container } = render(<Avatar variant="solid" color={color} fallback="T" />)
      const avatar = container.querySelector('span')
      expect(avatar).toBeInTheDocument()
      cleanup()
    }
  })

  it('applies all color variants in soft mode', () => {
    const colors = ['default', 'primary', 'neutral', 'info', 'success', 'warning', 'error'] as const

    for (const color of colors) {
      const { container } = render(<Avatar variant="soft" color={color} fallback="T" />)
      const avatar = container.querySelector('span')
      expect(avatar).toBeInTheDocument()
      cleanup()
    }
  })

  it('applies all size variants', () => {
    const sizes = ['1', '2', '3', '4', '5', '6'] as const

    for (const size of sizes) {
      const { container } = render(<Avatar size={size} fallback="T" />)
      const avatar = container.querySelector('span')
      expect(avatar).toHaveClass('rt-avatar-size')
      cleanup()
    }
  })

  it('applies all radius variants', () => {
    const radiusOptions = ['none', 'sm', 'md', 'lg', 'full'] as const

    for (const radius of radiusOptions) {
      const { container } = render(<Avatar radius={radius} fallback="T" />)
      const avatar = container.querySelector('span')
      expect(avatar).toBeInTheDocument()
      cleanup()
    }
  })

  it('does not apply color classes when image is shown', async () => {
    render(<Avatar src="https://example.com/avatar.jpg" variant="solid" color="error" fallback="JD" />)

    const img = screen.getByRole('img')
    img.dispatchEvent(new Event('load'))

    await waitFor(() => {
      expect(img).not.toHaveClass('opacity-0')
    })

    // Color classes should not be applied when image is showing
    expect(screen.queryByText('JD')).not.toBeInTheDocument()
  })
})
