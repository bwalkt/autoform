import { cleanup, render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { AVATAR_SIZE_CLASS, Avatar, avatarSizeStyles } from './Avatar'

afterEach(() => {
  cleanup()
})

describe('Avatar', () => {
  describe('Image loading', () => {
    it('renders an image when src is provided', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User avatar" />)
      const img = screen.getByRole('img', { name: 'User avatar' })
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg')
    })

    it('shows fallback while image is loading', () => {
      render(<Avatar src="https://example.com/avatar.jpg" fallback="John Doe" />)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('hides fallback after image loads', async () => {
      render(<Avatar src="https://example.com/avatar.jpg" fallback="John Doe" />)
      const img = screen.getByRole('img')

      // Initially fallback should be visible
      expect(screen.getByText('JD')).toBeInTheDocument()

      // Trigger onLoad
      img.dispatchEvent(new Event('load', { bubbles: true }))

      await waitFor(() => {
        // After load, image should be visible (not opacity-0)
        expect(img).not.toHaveClass('opacity-0')
      })
    })

    it('shows fallback when image fails to load', async () => {
      render(<Avatar src="https://example.com/broken.jpg" fallback="John Doe" />)
      const img = screen.getByRole('img')

      // Trigger onError
      img.dispatchEvent(new Event('error', { bubbles: true }))

      await waitFor(() => {
        expect(screen.getByText('JD')).toBeInTheDocument()
      })
    })

    it('resets error state when src changes', async () => {
      const { rerender } = render(<Avatar src="https://example.com/broken.jpg" fallback="John Doe" />)
      const img = screen.getByRole('img')

      img.dispatchEvent(new Event('error', { bubbles: true }))

      await waitFor(() => {
        expect(screen.getByText('JD')).toBeInTheDocument()
      })

      rerender(<Avatar src="https://example.com/new.jpg" fallback="John Doe" />)
      const newImg = screen.getByRole('img')
      expect(newImg).toHaveAttribute('src', 'https://example.com/new.jpg')
    })
  })

  describe('Fallback initials', () => {
    it('converts single name to single initial', () => {
      render(<Avatar fallback="John" />)
      expect(screen.getByText('J')).toBeInTheDocument()
    })

    it('converts two names to two initials', () => {
      render(<Avatar fallback="John Doe" />)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('converts three or more names to first two initials', () => {
      render(<Avatar fallback="John Q Public" />)
      expect(screen.getByText('JQ')).toBeInTheDocument()
    })

    it('uppercases initials', () => {
      render(<Avatar fallback="john doe" />)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('shows default icon when no fallback is provided', () => {
      const { container } = render(<Avatar />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    })

    it('uses fallback text as alt when src is provided', () => {
      render(<Avatar src="https://example.com/avatar.jpg" fallback="John Doe" />)
      const img = screen.getByRole('img', { name: 'John Doe' })
      expect(img).toBeInTheDocument()
    })

    it('uses explicit alt text over fallback', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="Custom alt" fallback="John Doe" />)
      const img = screen.getByRole('img', { name: 'Custom alt' })
      expect(img).toBeInTheDocument()
    })

    it('defaults to "Avatar" alt text when no alt or fallback', () => {
      render(<Avatar src="https://example.com/avatar.jpg" />)
      const img = screen.getByRole('img', { name: 'Avatar' })
      expect(img).toBeInTheDocument()
    })
  })

  describe('Size variants', () => {
    it('applies size 1 classes', () => {
      const { container } = render(<Avatar size="1" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass(AVATAR_SIZE_CLASS)
      expect(avatar).toHaveStyle(avatarSizeStyles['1'])
    })

    it('applies size 2 classes (default)', () => {
      const { container } = render(<Avatar fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass(AVATAR_SIZE_CLASS)
      expect(avatar).toHaveStyle(avatarSizeStyles['2'])
    })

    it('applies size 3 classes', () => {
      const { container } = render(<Avatar size="3" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass(AVATAR_SIZE_CLASS)
      expect(avatar).toHaveStyle(avatarSizeStyles['3'])
    })

    it('applies size 4 classes', () => {
      const { container } = render(<Avatar size="4" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass(AVATAR_SIZE_CLASS)
      expect(avatar).toHaveStyle(avatarSizeStyles['4'])
    })

    it('applies size 5 classes', () => {
      const { container } = render(<Avatar size="5" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass(AVATAR_SIZE_CLASS)
      expect(avatar).toHaveStyle(avatarSizeStyles['5'])
    })

    it('applies size 6 classes', () => {
      const { container } = render(<Avatar size="6" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass(AVATAR_SIZE_CLASS)
      expect(avatar).toHaveStyle(avatarSizeStyles['6'])
    })
  })

  describe('Color variants', () => {
    it('applies default soft color (default)', () => {
      const { container } = render(<Avatar fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('bg-muted/50', 'text-muted-foreground')
    })

    it('applies primary soft color', () => {
      const { container } = render(<Avatar color="primary" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('bg-primary/10', 'text-primary')
    })

    it('applies info soft color', () => {
      const { container } = render(<Avatar color="info" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('bg-blue-500/10', 'text-blue-600')
    })

    it('applies success soft color', () => {
      const { container } = render(<Avatar color="success" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('bg-green-500/10', 'text-green-600')
    })

    it('applies warning soft color', () => {
      const { container } = render(<Avatar color="warning" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('bg-amber-500/10', 'text-amber-600')
    })

    it('applies error soft color', () => {
      const { container } = render(<Avatar color="error" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('bg-red-500/10', 'text-red-600')
    })

    it('applies default solid color', () => {
      const { container } = render(<Avatar variant="solid" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('bg-muted', 'text-muted-foreground')
    })

    it('applies primary solid color', () => {
      const { container } = render(<Avatar variant="solid" color="primary" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('bg-primary', 'text-primary-foreground')
    })

    it('applies error solid color', () => {
      const { container } = render(<Avatar variant="solid" color="error" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('bg-red-500', 'text-white')
    })

    it('does not apply color classes when showing image', async () => {
      const { container } = render(<Avatar src="https://example.com/avatar.jpg" color="primary" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      const img = screen.getByRole('img')

      // Trigger load
      img.dispatchEvent(new Event('load', { bubbles: true }))

      await waitFor(() => {
        expect(avatar).not.toHaveClass('bg-primary/10')
      })
    })
  })

  describe('Radius variants', () => {
    it('applies full radius (default)', () => {
      const { container } = render(<Avatar fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('rounded-full')
    })

    it('applies none radius', () => {
      const { container } = render(<Avatar radius="none" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('rounded-none')
    })

    it('applies sm radius', () => {
      const { container } = render(<Avatar radius="sm" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('rounded-sm')
    })

    it('applies md radius', () => {
      const { container } = render(<Avatar radius="md" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('rounded-md')
    })

    it('applies lg radius', () => {
      const { container } = render(<Avatar radius="lg" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('rounded-lg')
    })
  })

  describe('Custom props', () => {
    it('applies custom className', () => {
      const { container } = render(<Avatar className="custom-class" fallback="JD" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('custom-class')
    })

    it('forwards ref', () => {
      const ref = React.createRef<HTMLSpanElement>()
      render(<Avatar ref={ref} fallback="JD" />)
      expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    })

    it('spreads additional props', () => {
      const { container } = render(<Avatar data-testid="avatar" fallback="JD" />)
      const avatar = container.querySelector('[data-testid="avatar"]')
      expect(avatar).toBeInTheDocument()
    })
  })

  describe('Edge cases', () => {
    it('handles empty fallback string', () => {
      const { container } = render(<Avatar fallback="" />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('handles single character fallback', () => {
      render(<Avatar fallback="J" />)
      expect(screen.getByText('J')).toBeInTheDocument()
    })

    it('handles fallback with extra spaces', () => {
      render(<Avatar fallback="  John   Doe  " />)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('handles fallback with special characters', () => {
      render(<Avatar fallback="@John #Doe" />)
      expect(screen.getByText('@#')).toBeInTheDocument()
    })
  })
})
