import * as React from 'react'
import { getSpacingClasses, type Responsive, Slot, type Spacing } from '@/layouts/layout-utils'
import { cn } from '@/lib/utils'
import type { TypographyColor } from './tokens'
import { type TypographySize, typographyTokens, type Weight } from './tokens'

export interface TextOwnProps {
  as?: 'span' | 'div' | 'label' | 'p'
  asChild?: boolean
  size?: TypographySize
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

export type TextProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'> & TextOwnProps & { htmlFor?: string }

/** Text export. */
export const Text = React.forwardRef<HTMLElement, TextProps>(
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
    const resolvedSize = size
    const weightToken = typographyTokens.weight[weight]

    const textStyles: React.CSSProperties = {
      fontWeight: weightToken,
      textAlign: align,
      textWrap: wrap,
      ...(color && { color: typographyTokens.color[color].text }),
      ...style,
    }

    const sharedProps = {
      className: cn(
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
      ),
      'data-trim': trim,
      style: textStyles,
    }

    if (asChild) {
      return (
        <Slot ref={ref as React.Ref<HTMLElement>} {...sharedProps} {...props}>
          {children}
        </Slot>
      )
    }

    if (Tag === 'div') {
      return (
        <div ref={ref as React.Ref<HTMLDivElement>} {...sharedProps} {...props}>
          {children}
        </div>
      )
    }
    if (Tag === 'label') {
      return (
        <label ref={ref as React.Ref<HTMLLabelElement>} {...sharedProps} {...props}>
          {children}
        </label>
      )
    }
    if (Tag === 'p') {
      return (
        <p ref={ref as React.Ref<HTMLParagraphElement>} {...sharedProps} {...props}>
          {children}
        </p>
      )
    }
    return (
      <span ref={ref as React.Ref<HTMLSpanElement>} {...sharedProps} {...props}>
        {children}
      </span>
    )
  },
)

Text.displayName = 'Text'
