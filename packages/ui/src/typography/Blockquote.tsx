import * as React from 'react'
import { cn } from '@/lib/utils'
import { type TypographyColor, type TypographySize, typographyTokens, type Weight } from './tokens'

export interface BlockquoteProps extends React.HTMLAttributes<HTMLElement> {
  size?: TypographySize
  weight?: Weight
  color?: TypographyColor
  highContrast?: boolean
  truncate?: boolean
  wrap?: 'wrap' | 'nowrap' | 'pretty' | 'balance'
}

/** Blockquote export. */
export const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  (
    {
      size = '3',
      weight = 'regular',
      color = 'default',
      highContrast = false,
      truncate = false,
      wrap = 'wrap',
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const sizeTokens = typographyTokens.size[size]
    const weightToken = typographyTokens.weight[weight]
    const colorToken = typographyTokens.color[color]

    const blockquoteStyles: React.CSSProperties = {
      fontSize: sizeTokens.fontSize,
      lineHeight: sizeTokens.lineHeight,
      letterSpacing: sizeTokens.letterSpacing,
      fontWeight: weightToken,
      color: colorToken.text,
      ...style,
    }

    return (
      <blockquote
        ref={ref}
        className={cn(
          // Base styles
          'font-sans italic',
          'border-l-4 border-gray-300 pl-4 py-2',
          'dark:border-gray-600',

          // Truncation
          truncate && 'truncate',

          // Text wrapping
          wrap === 'nowrap' && 'whitespace-nowrap',
          wrap === 'pretty' && 'text-pretty',
          wrap === 'balance' && 'text-balance',

          // Color variants - border colors
          color === 'primary' && 'border-l-primary',
          color === 'neutral' && 'border-l-gray-400 dark:border-l-gray-500',
          color === 'info' && 'border-l-blue-500 dark:border-l-blue-400',
          color === 'success' && 'border-l-green-500 dark:border-l-green-400',
          color === 'warning' && 'border-l-yellow-500 dark:border-l-yellow-400',
          color === 'error' && 'border-l-red-500 dark:border-l-red-400',

          // High contrast
          highContrast && 'saturate-[1.2]',

          className,
        )}
        style={blockquoteStyles}
        {...props}
      />
    )
  },
)

Blockquote.displayName = 'Blockquote'
