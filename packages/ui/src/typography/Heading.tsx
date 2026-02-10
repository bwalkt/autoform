import * as React from 'react'
import { getSpacingClasses, type Responsive, Slot, type Spacing } from '@/layouts/layout-utils'
import { cn } from '@/lib/utils'
import type { TypographyColor } from './tokens'
import { type TypographySize, typographyTokens, type Weight } from './tokens'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
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

/** Heading export. */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as: Tag = 'h1',
      asChild = false,
      size = '6',
      weight = 'bold',
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
    const resolvedSize = typeof size === 'string' ? size : (size?.initial ?? '6')
    const resolvedWeight = highContrast
      ? ({
          light: 'regular',
          regular: 'medium',
          medium: 'bold',
          bold: 'bold',
        }[weight] as Weight)
      : weight
    const weightToken = typographyTokens.weight[resolvedWeight]

    const headingStyles: React.CSSProperties = {
      fontWeight: weightToken,
      textAlign: align,
      textWrap: wrap,
      ...(color && { color: typographyTokens.color[color].text }),
      ...style,
    }

    const Component = asChild ? Slot : Tag

    return (
      <Component
        ref={ref}
        className={cn(
          'rt-Heading',
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
          highContrast && 'saturate-[1.1]',

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
        style={headingStyles}
        {...props}
      >
        {children}
      </Component>
    )
  },
)

Heading.displayName = 'Heading'
