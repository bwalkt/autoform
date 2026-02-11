import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Avatar } from './Avatar'
import { AvatarGroup } from './AvatarGroup'

afterEach(() => {
  cleanup()
})

describe('AvatarGroup', () => {
  describe('Basic rendering', () => {
    it('renders all children when no max is set', () => {
      render(
        <AvatarGroup>
          <Avatar fallback="John Doe" />
          <Avatar fallback="Jane Smith" />
          <Avatar fallback="Bob Johnson" />
        </AvatarGroup>,
      )

      expect(screen.getByText('JD')).toBeInTheDocument()
      expect(screen.getByText('JS')).toBeInTheDocument()
      expect(screen.getByText('BJ')).toBeInTheDocument()
    })

    it('renders with single child', () => {
      render(
        <AvatarGroup>
          <Avatar fallback="John Doe" />
        </AvatarGroup>,
      )

      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('forwards ref to container div', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <AvatarGroup ref={ref}>
          <Avatar fallback="John Doe" />
        </AvatarGroup>,
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Max prop and overflow', () => {
    it('limits visible avatars to max value', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar fallback="John Doe" />
          <Avatar fallback="Jane Smith" />
          <Avatar fallback="Bob Johnson" />
          <Avatar fallback="Alice Brown" />
        </AvatarGroup>,
      )

      expect(screen.getByText('JD')).toBeInTheDocument()
      expect(screen.getByText('JS')).toBeInTheDocument()
      expect(screen.queryByText('BJ')).not.toBeInTheDocument()
      expect(screen.queryByText('AB')).not.toBeInTheDocument()
    })

    it('shows overflow indicator with correct count', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar fallback="John Doe" />
          <Avatar fallback="Jane Smith" />
          <Avatar fallback="Bob Johnson" />
          <Avatar fallback="Alice Brown" />
        </AvatarGroup>,
      )

      expect(screen.getByText('+2')).toBeInTheDocument()
    })

    it('does not show overflow indicator when count equals max', () => {
      render(
        <AvatarGroup max={3}>
          <Avatar fallback="John Doe" />
          <Avatar fallback="Jane Smith" />
          <Avatar fallback="Bob Johnson" />
        </AvatarGroup>,
      )

      expect(screen.queryByText(/^\+/)).not.toBeInTheDocument()
    })

    it('does not show overflow indicator when count is less than max', () => {
      render(
        <AvatarGroup max={5}>
          <Avatar fallback="John Doe" />
          <Avatar fallback="Jane Smith" />
        </AvatarGroup>,
      )

      expect(screen.queryByText(/^\+/)).not.toBeInTheDocument()
    })

    it('shows overflow indicator with aria-label', () => {
      render(
        <AvatarGroup max={1}>
          <Avatar fallback="John Doe" />
          <Avatar fallback="Jane Smith" />
          <Avatar fallback="Bob Johnson" />
        </AvatarGroup>,
      )

      const button = screen.getByLabelText('2 more')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Overflow click handling', () => {
    it('calls onOverflowClick with count and remaining children when clicked', async () => {
      const user = userEvent.setup()
      const handleOverflowClick = vi.fn()

      render(
        <AvatarGroup max={2} onOverflowClick={handleOverflowClick}>
          <Avatar fallback="John Doe" />
          <Avatar fallback="Jane Smith" />
          <Avatar fallback="Bob Johnson" />
          <Avatar fallback="Alice Brown" />
        </AvatarGroup>,
      )

      const overflowButton = screen.getByText('+2')
      await user.click(overflowButton)

      expect(handleOverflowClick).toHaveBeenCalledTimes(1)
      expect(handleOverflowClick).toHaveBeenCalledWith(2, expect.any(Array))

      const [count, remainingChildren] = handleOverflowClick.mock.calls[0] as [number, React.ReactNode[]]
      expect(count).toBe(2)
      expect(remainingChildren).toHaveLength(2)
    })

    it('does not call onOverflowClick when no overflow exists', () => {
      const handleOverflowClick = vi.fn()

      render(
        <AvatarGroup max={5} onOverflowClick={handleOverflowClick}>
          <Avatar fallback="John Doe" />
          <Avatar fallback="Jane Smith" />
        </AvatarGroup>,
      )

      expect(handleOverflowClick).not.toHaveBeenCalled()
    })

    it('disables overflow button when no onOverflowClick provided', () => {
      render(
        <AvatarGroup max={1}>
          <Avatar fallback="John Doe" />
          <Avatar fallback="Jane Smith" />
        </AvatarGroup>,
      )

      const button = screen.getByText('+1')
      expect(button).toBeDisabled()
    })

    it('enables overflow button when onOverflowClick is provided', () => {
      const handleOverflowClick = vi.fn()

      render(
        <AvatarGroup max={1} onOverflowClick={handleOverflowClick}>
          <Avatar fallback="John Doe" />
          <Avatar fallback="Jane Smith" />
        </AvatarGroup>,
      )

      const button = screen.getByText('+1')
      expect(button).not.toBeDisabled()
    })
  })

  describe('Custom renderOverflow', () => {
    it('uses custom renderOverflow when provided', () => {
      const customRender = (count: number) => <div data-testid="custom-overflow">Custom +{count}</div>

      render(
        <AvatarGroup max={2} renderOverflow={customRender}>
          <Avatar fallback="John Doe" />
          <Avatar fallback="Jane Smith" />
          <Avatar fallback="Bob Johnson" />
        </AvatarGroup>,
      )

      expect(screen.getByTestId('custom-overflow')).toHaveTextContent('Custom +1')
    })

    it('does not render default overflow when custom renderOverflow is provided', () => {
      const customRender = (count: number) => <div>Custom +{count}</div>

      render(
        <AvatarGroup max={1} renderOverflow={customRender}>
          <Avatar fallback="John Doe" />
          <Avatar fallback="Jane Smith" />
        </AvatarGroup>,
      )

      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })

  describe('Layout variants', () => {
    it('applies stack layout classes by default', () => {
      const { container } = render(
        <AvatarGroup>
          <Avatar fallback="John Doe" />
          <Avatar fallback="Jane Smith" />
        </AvatarGroup>,
      )

      const group = container.firstChild as HTMLElement
      expect(group).toHaveClass('-space-x-2')
    })

    it('applies spread layout classes when layout is spread', () => {
      const { container } = render(
        <AvatarGroup layout="spread">
          <Avatar fallback="John Doe" />
          <Avatar fallback="Jane Smith" />
        </AvatarGroup>,
      )

      const group = container.firstChild as HTMLElement
      expect(group).toHaveClass('gap-1.5')
    })

    it('applies ring styles in stack layout', () => {
      const { container } = render(
        <AvatarGroup layout="stack">
          <Avatar fallback="John Doe" />
        </AvatarGroup>,
      )

      const wrapper = container.querySelector('span')
      expect(wrapper).toHaveClass('ring-2', 'ring-background', 'rounded-full')
    })

    it('does not apply ring styles in spread layout', () => {
      const { container } = render(
        <AvatarGroup layout="spread">
          <Avatar fallback="John Doe" />
        </AvatarGroup>,
      )

      const wrapper = container.querySelector('span')
      expect(wrapper).not.toHaveClass('ring-2')
    })
  })

  describe('Size propagation', () => {
    it('propagates size to avatar children', () => {
      const { container } = render(
        <AvatarGroup size="4">
          <Avatar fallback="John Doe" />
        </AvatarGroup>,
      )

      const avatar = container.querySelector('span > span')
      expect(avatar).toHaveClass('h-12', 'w-12')
    })

    it('uses default size 2 when not specified', () => {
      const { container } = render(
        <AvatarGroup>
          <Avatar fallback="John Doe" />
        </AvatarGroup>,
      )

      const avatar = container.querySelector('span > span')
      expect(avatar).toHaveClass('h-8', 'w-8')
    })

    it('applies correct spacing for size 1', () => {
      const { container } = render(
        <AvatarGroup size="1" layout="stack">
          <Avatar fallback="John Doe" />
        </AvatarGroup>,
      )

      expect(container.firstChild).toHaveClass('-space-x-1.5')
    })

    it('applies correct spacing for size 3 spread layout', () => {
      const { container } = render(
        <AvatarGroup size="3" layout="spread">
          <Avatar fallback="John Doe" />
        </AvatarGroup>,
      )

      expect(container.firstChild).toHaveClass('gap-2')
    })

    it('applies correct spacing for size 6 stack layout', () => {
      const { container } = render(
        <AvatarGroup size="6" layout="stack">
          <Avatar fallback="John Doe" />
        </AvatarGroup>,
      )

      expect(container.firstChild).toHaveClass('-space-x-5')
    })
  })

  describe('Z-index stacking', () => {
    it('applies z-index to stack layout children in reverse order', () => {
      const { container } = render(
        <AvatarGroup layout="stack">
          <Avatar fallback="First" />
          <Avatar fallback="Second" />
          <Avatar fallback="Third" />
        </AvatarGroup>,
      )

      const wrappers = container.querySelectorAll('div > span')
      expect(wrappers[0]).toHaveStyle({ zIndex: 3 })
      expect(wrappers[1]).toHaveStyle({ zIndex: 2 })
      expect(wrappers[2]).toHaveStyle({ zIndex: 1 })
    })

    it('does not apply z-index to spread layout', () => {
      const { container } = render(
        <AvatarGroup layout="spread">
          <Avatar fallback="First" />
          <Avatar fallback="Second" />
        </AvatarGroup>,
      )

      const avatars = container.querySelectorAll('span > span')
      expect(avatars[0]).not.toHaveStyle({ zIndex: expect.anything() })
    })
  })

  describe('Child key handling', () => {
    it('preserves React keys from children', () => {
      render(
        <AvatarGroup>
          <Avatar key="user-1" fallback="John Doe" />
          <Avatar key="user-2" fallback="Jane Smith" />
        </AvatarGroup>,
      )

      expect(screen.getByText('JD')).toBeInTheDocument()
      expect(screen.getByText('JS')).toBeInTheDocument()
    })

    it('uses index as fallback key when child has no key', () => {
      render(
        <AvatarGroup>
          <Avatar fallback="John Doe" />
          <Avatar fallback="Jane Smith" />
        </AvatarGroup>,
      )

      expect(screen.getByText('JD')).toBeInTheDocument()
      expect(screen.getByText('JS')).toBeInTheDocument()
    })
  })

  describe('Custom props', () => {
    it('applies custom className to container', () => {
      const { container } = render(
        <AvatarGroup className="custom-group">
          <Avatar fallback="John Doe" />
        </AvatarGroup>,
      )

      expect(container.firstChild).toHaveClass('custom-group')
    })

    it('spreads additional props to container', () => {
      const { container } = render(
        <AvatarGroup data-testid="avatar-group">
          <Avatar fallback="John Doe" />
        </AvatarGroup>,
      )

      const group = container.querySelector('[data-testid="avatar-group"]')
      expect(group).toBeInTheDocument()
    })
  })

  describe('Edge cases', () => {
    it('handles max of 0', () => {
      render(
        <AvatarGroup max={0}>
          <Avatar fallback="John Doe" />
          <Avatar fallback="Jane Smith" />
        </AvatarGroup>,
      )

      expect(screen.queryByText('JD')).not.toBeInTheDocument()
      expect(screen.getByText('+2')).toBeInTheDocument()
    })

    it('handles negative overflow count gracefully', () => {
      render(
        <AvatarGroup max={10}>
          <Avatar fallback="John Doe" />
        </AvatarGroup>,
      )

      expect(screen.queryByText(/^\+/)).not.toBeInTheDocument()
    })

    it('handles non-Avatar children', () => {
      render(
        <AvatarGroup>
          <div>Custom child</div>
          <Avatar fallback="John Doe" />
        </AvatarGroup>,
      )

      expect(screen.getByText('Custom child')).toBeInTheDocument()
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('clones children correctly with size override', () => {
      const { container } = render(
        <AvatarGroup size="5">
          <Avatar size="1" fallback="John Doe" />
        </AvatarGroup>,
      )

      const avatar = container.querySelector('span > span')
      // Size from AvatarGroup should override
      expect(avatar).toHaveClass('h-16', 'w-16')
    })
  })
})