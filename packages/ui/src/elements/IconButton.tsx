'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { type Color, designTokens, type Radius, type Size } from './tokens'
import { getRadiusStyles, getSizeStyles } from './utils'

// Variant styles
type IconButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost'

function getColorStyleVars(color: Color, variant: IconButtonVariant): React.CSSProperties {
  const token = designTokens.color[color]

  if (variant === 'solid') {
    return {
      '--icon-btn-bg': token.primary,
      '--icon-btn-bg-hover': token.border,
      '--icon-btn-bg-active': token.borderSubtle,
      '--icon-btn-fg': 'white',
      '--icon-btn-border': token.primary,
    } as React.CSSProperties
  }

  if (variant === 'outline') {
    return {
      '--icon-btn-bg': 'transparent',
      '--icon-btn-bg-hover': token.softBackground,
      '--icon-btn-bg-active': token.softBackgroundHover,
      '--icon-btn-fg': token.text,
      '--icon-btn-border': token.border,
    } as React.CSSProperties
  }

  if (variant === 'ghost') {
    return {
      '--icon-btn-bg': 'transparent',
      '--icon-btn-bg-hover': token.softBackground,
      '--icon-btn-bg-active': token.softBackgroundHover,
      '--icon-btn-fg': token.text,
      '--icon-btn-border': 'transparent',
    } as React.CSSProperties
  }

  return {
    '--icon-btn-bg': token.softBackground,
    '--icon-btn-bg-hover': token.softBackgroundHover,
    '--icon-btn-bg-active': token.primaryAlpha,
    '--icon-btn-fg': token.text,
    '--icon-btn-border': 'transparent',
  } as React.CSSProperties
}

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Size of the button */
  size?: Size
  /** Visual variant */
  variant?: IconButtonVariant
  /** Color scheme */
  color?: Color
  /** Border radius */
  radius?: Radius
  /** Whether the button is in a loading state */
  loading?: boolean
  /** High contrast mode */
  highContrast?: boolean
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      size = '2',
      variant = 'soft',
      color = 'default',
      radius = 'md',
      loading = false,
      highContrast = false,
      disabled,
      className,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const sizeStyles = getSizeStyles(size)
    const radiusStyles = getRadiusStyles(radius)
    const colorStyleVars = getColorStyleVars(color, variant)
    const combinedStyles = {
      ...sizeStyles,
      ...radiusStyles,
      ...colorStyleVars,
      ...style,
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || loading}
        className={cn(
          // Base reset + layout
          'inline-flex items-center justify-center shrink-0 select-none appearance-none cursor-pointer',
          'border-0 bg-transparent p-0 m-0 leading-none',
          'h-[var(--element-height)] w-[var(--element-height)]',
          'text-[var(--element-font-size)]',
          'rounded-[var(--element-border-radius)]',
          'bg-[var(--icon-btn-bg)] text-[var(--icon-btn-fg)]',
          'hover:bg-[var(--icon-btn-bg-hover)] active:bg-[var(--icon-btn-bg-active)]',
          'border-[var(--icon-btn-border)]',
          '[&_svg]:size-[var(--element-icon-size)] [&_svg]:shrink-0',
          'transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variant === 'outline' && 'border',

          // High contrast
          highContrast && variant === 'solid' && 'shadow-md',

          className,
        )}
        style={combinedStyles}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-[1em] w-[1em]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          children
        )}
      </button>
    )
  },
)

IconButton.displayName = 'IconButton'

export { IconButton }
