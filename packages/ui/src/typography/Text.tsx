import * as React from 'react'
import { getSpacingClasses, type Responsive, Slot, type Spacing } from '@/layouts/layout-utils'
import { cn } from '@/lib/utils'
import type { TypographyColor } from './tokens'
import { type TypographySize, typographyTokens, type Weight } from './tokens'

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'div' | 'label' | 'p'
  asChild?: boolean
  size?: Responsive<TypographySize>
  weight?: Weight
  color?: TypographyColor
  align?: 'left' | 'center' | 'right'
  trim?: 'normal' | 'start' | 'end' | 'both'
  truncate?: boolean
  wrap?: 'wrap' | 'nowrap' | 'pretty' | 'balance'
  highContrast?: boolean
  m?: Responsive<Spacing>
  mx?: Responsive<Spacing>
  my?: Responsive<Spacing>
  mt?: Responsive<Spacing>
  mr?: Responsive<Spacing>
  mb?: Responsive<Spacing>
  ml?: Responsive<Spacing>
}

/** Text export. */
export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  (
    {
      as: Tag = 'span',
      asChild = false,
      size = '3',
      weight = 'regular',
      color,
      align,
      trim,
      truncate = false,
      wrap = 'wrap',
      highContrast = false,
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const resolvedSize = typeof size === 'string' ? size : (size?.initial ?? '3')
    const weightToken = typographyTokens.weight[weight]

    const textStyles: React.CSSProperties = {
      fontWeight: weightToken,
      textAlign: align,
      textWrap: wrap,
      ...(color && { color: typographyTokens.color[color].text }),
      ...style,
    }

    const Component = asChild ? Slot : Tag

    return (
      <Component
        ref={ref as any}
        className={cn(
          'rt-Text',
          `rt-r-size-${resolvedSize}`,

          // Text alignment
          align === 'left' && 'text-left',
          align === 'center' && 'text-center',
          align === 'right' && 'text-right',

          // Truncation
          truncate && 'truncate',

          // Text wrapping
          wrap === 'nowrap' && 'whitespace-nowrap',
          wrap === 'pretty' && 'text-pretty',
          wrap === 'balance' && 'text-balance',

          // High contrast
          highContrast && 'font-medium',

          // Margin
          getSpacingClasses(m, 'm'),
          getSpacingClasses(mx, 'mx'),
          getSpacingClasses(my, 'my'),
          getSpacingClasses(mt, 'mt'),
          getSpacingClasses(mr, 'mr'),
          getSpacingClasses(mb, 'mb'),
          getSpacingClasses(ml, 'ml'),

          className,
        )}
        data-trim={trim}
        style={textStyles}
        {...props}
      >
        {children}
      </Component>
    )
  },
)

Text.displayName = 'Text'
