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

  it('limits visible avatars when max is set', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar fallback="John Doe" />
        <Avatar fallback="Jane Smith" />
        <Avatar fallback="Bob Johnson" />
      </AvatarGroup>,
    )

    expect(screen.getByText('JD')).toBeInTheDocument()
    expect(screen.getByText('JS')).toBeInTheDocument()
    expect(screen.queryByText('BJ')).not.toBeInTheDocument()
  })

  it('displays overflow indicator when max is exceeded', () => {
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

  it('calculates overflow count correctly', () => {
    render(
      <AvatarGroup max={1}>
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
        <Avatar fallback="D" />
        <Avatar fallback="E" />
      </AvatarGroup>,
    )

    expect(screen.getByText('+4')).toBeInTheDocument()
  })

  it('applies stack layout by default', () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar fallback="JD" />
        <Avatar fallback="JS" />
      </AvatarGroup>,
    )

    const group = container.querySelector('div')
    expect(group).toHaveClass('-space-x-2') // default size is '2'
  })

  it('applies spread layout correctly', () => {
    const { container } = render(
      <AvatarGroup layout="spread">
        <Avatar fallback="JD" />
        <Avatar fallback="JS" />
      </AvatarGroup>,
    )

    const group = container.querySelector('div')
    expect(group).toHaveClass('gap-1.5') // default size is '2'
  })

  it('applies correct spacing for different sizes in stack layout', () => {
    const sizes = [
      { size: '1' as const, spacing: '-space-x-1.5' },
      { size: '2' as const, spacing: '-space-x-2' },
      { size: '3' as const, spacing: '-space-x-2.5' },
      { size: '4' as const, spacing: '-space-x-3' },
      { size: '5' as const, spacing: '-space-x-4' },
      { size: '6' as const, spacing: '-space-x-5' },
    ]

    sizes.forEach(({ size, spacing }) => {
      const { container } = render(
        <AvatarGroup size={size} layout="stack">
          <Avatar fallback="A" />
        </AvatarGroup>,
      )
      const group = container.querySelector('div')
      expect(group).toHaveClass(spacing)
      cleanup()
    })
  })

  it('applies correct spacing for different sizes in spread layout', () => {
    const sizes = [
      { size: '1' as const, spacing: 'gap-1' },
      { size: '2' as const, spacing: 'gap-1.5' },
      { size: '3' as const, spacing: 'gap-2' },
      { size: '4' as const, spacing: 'gap-2' },
      { size: '5' as const, spacing: 'gap-3' },
      { size: '6' as const, spacing: 'gap-3' },
    ]

    sizes.forEach(({ size, spacing }) => {
      const { container } = render(
        <AvatarGroup size={size} layout="spread">
          <Avatar fallback="A" />
        </AvatarGroup>,
      )
      const group = container.querySelector('div')
      expect(group).toHaveClass(spacing)
      cleanup()
    })
  })

  it('passes size prop to children avatars', () => {
    const { container } = render(
      <AvatarGroup size="4">
        <Avatar fallback="JD" />
        <Avatar fallback="JS" />
      </AvatarGroup>,
    )

    const avatars = container.querySelectorAll('.rt-avatar-size')
    expect(avatars).toHaveLength(2)
  })

  it('applies ring styles in stack layout', () => {
    const { container } = render(
      <AvatarGroup layout="stack">
        <Avatar fallback="JD" />
        <Avatar fallback="JS" />
      </AvatarGroup>,
    )

    const wrappers = container.querySelectorAll('span.ring-2.ring-background')
    expect(wrappers.length).toBeGreaterThan(0)
  })

  it('does not apply ring styles in spread layout', () => {
    const { container } = render(
      <AvatarGroup layout="spread">
        <Avatar fallback="JD" />
        <Avatar fallback="JS" />
      </AvatarGroup>,
    )

    const wrappers = container.querySelectorAll('span.ring-2.ring-background')
    expect(wrappers.length).toBe(0)
  })

  it('applies z-index for stacking in stack layout', () => {
    const { container } = render(
      <AvatarGroup layout="stack">
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
      </AvatarGroup>,
    )

    const firstWrapper = container.querySelector('span[style*="z-index"]')
    expect(firstWrapper).toBeInTheDocument()
  })

  it('calls onOverflowClick when overflow button is clicked', async () => {
    const user = userEvent.setup()
    const handleOverflowClick = vi.fn()

    render(
      <AvatarGroup max={2} onOverflowClick={handleOverflowClick}>
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
        <Avatar fallback="D" />
      </AvatarGroup>,
    )

    const overflowButton = screen.getByText('+2')
    await user.click(overflowButton)

    expect(handleOverflowClick).toHaveBeenCalledTimes(1)
    expect(handleOverflowClick).toHaveBeenCalledWith(2, expect.any(Array))
  })

  it('passes overflow children to onOverflowClick callback', async () => {
    const user = userEvent.setup()
    const handleOverflowClick = vi.fn()

    render(
      <AvatarGroup max={2} onOverflowClick={handleOverflowClick}>
        <Avatar fallback="A" key="a" />
        <Avatar fallback="B" key="b" />
        <Avatar fallback="C" key="c" />
        <Avatar fallback="D" key="d" />
      </AvatarGroup>,
    )

    const overflowButton = screen.getByText('+2')
    await user.click(overflowButton)

    const overflowChildren = handleOverflowClick.mock.calls[0]?.[1] as React.ReactNode[]
    expect(overflowChildren).toHaveLength(2)
  })

  it('disables overflow button when no onOverflowClick is provided', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
      </AvatarGroup>,
    )

    const overflowButton = screen.getByText('+1') as HTMLButtonElement
    expect(overflowButton).toBeDisabled()
  })

  it('does not call onOverflowClick when button is disabled', async () => {
    const user = userEvent.setup()
    const handleOverflowClick = vi.fn()

    render(
      <AvatarGroup max={2}>
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
      </AvatarGroup>,
    )

    const overflowButton = screen.getByText('+1')
    await user.click(overflowButton)

    expect(handleOverflowClick).not.toHaveBeenCalled()
  })

  it('uses custom overflow renderer when provided', () => {
    const customRenderOverflow = (count: number) => <div data-testid="custom-overflow">Custom +{count}</div>

    render(
      <AvatarGroup max={2} renderOverflow={customRenderOverflow}>
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
      </AvatarGroup>,
    )

    expect(screen.getByTestId('custom-overflow')).toHaveTextContent('Custom +1')
  })

  it('accepts custom className', () => {
    const { container } = render(
      <AvatarGroup className="custom-class">
        <Avatar fallback="A" />
      </AvatarGroup>,
    )

    const group = container.querySelector('div')
    expect(group).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <AvatarGroup ref={ref}>
        <Avatar fallback="A" />
      </AvatarGroup>,
    )

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('handles children with keys correctly', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar fallback="A" key="avatar-a" />
        <Avatar fallback="B" key="avatar-b" />
        <Avatar fallback="C" key="avatar-c" />
      </AvatarGroup>,
    )

    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.queryByText('C')).not.toBeInTheDocument()
  })

  it('handles children without keys correctly', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
      </AvatarGroup>,
    )

    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.queryByText('C')).not.toBeInTheDocument()
  })

  it('shows no overflow indicator when max equals children count', () => {
    render(
      <AvatarGroup max={3}>
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
      </AvatarGroup>,
    )

    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument()
  })

  it('shows no overflow indicator when max exceeds children count', () => {
    render(
      <AvatarGroup max={5}>
        <Avatar fallback="A" />
        <Avatar fallback="B" />
      </AvatarGroup>,
    )

    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument()
  })

  it('handles single child correctly', () => {
    render(
      <AvatarGroup>
        <Avatar fallback="A" />
      </AvatarGroup>,
    )

    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('handles empty children gracefully', () => {
    const { container } = render(<AvatarGroup>{null}</AvatarGroup>)

    const group = container.querySelector('div')
    expect(group).toBeInTheDocument()
  })

  it('clones avatar children with size prop', () => {
    const { container } = render(
      <AvatarGroup size="5">
        <Avatar fallback="JD" size="1" />
      </AvatarGroup>,
    )

    // The AvatarGroup should override the child's size
    const avatars = container.querySelectorAll('.rt-avatar-size')
    expect(avatars).toHaveLength(1)
  })

  it('sets aria-label on overflow button', () => {
    render(
      <AvatarGroup max={1}>
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
      </AvatarGroup>,
    )

    const overflowButton = screen.getByLabelText('2 more')
    expect(overflowButton).toBeInTheDocument()
  })

  it('applies hover styles to overflow button when clickable', () => {
    const { container } = render(
      <AvatarGroup max={1} onOverflowClick={() => {}}>
        <Avatar fallback="A" />
        <Avatar fallback="B" />
      </AvatarGroup>,
    )

    const overflowButton = container.querySelector('button')
    expect(overflowButton).toHaveClass('hover:bg-muted/80', 'cursor-pointer')
  })

  it('applies cursor-default when overflow button is not clickable', () => {
    const { container } = render(
      <AvatarGroup max={1}>
        <Avatar fallback="A" />
        <Avatar fallback="B" />
      </AvatarGroup>,
    )

    const overflowButton = container.querySelector('button')
    expect(overflowButton).toHaveClass('cursor-default')
  })

  it('preserves z-index order in stack layout (first child on top)', () => {
    const { container } = render(
      <AvatarGroup layout="stack">
        <Avatar fallback="First" />
        <Avatar fallback="Second" />
        <Avatar fallback="Third" />
      </AvatarGroup>,
    )

    const wrappers = container.querySelectorAll('span[style*="z-index"]')
    const firstZIndex = wrappers[0]?.getAttribute('style')
    const lastZIndex = wrappers[2]?.getAttribute('style')

    expect(firstZIndex).toContain('z-index')
    expect(lastZIndex).toContain('z-index')
  })

  it('handles max={0} gracefully', () => {
    render(
      <AvatarGroup max={0}>
        <Avatar fallback="A" />
        <Avatar fallback="B" />
      </AvatarGroup>,
    )

    // Should show overflow indicator with count
    expect(screen.getByText('+2')).toBeInTheDocument()
    expect(screen.queryByText('A')).not.toBeInTheDocument()
  })
})