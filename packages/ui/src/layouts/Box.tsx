'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  type Display,
  getDisplayClasses,
  getSharedLayoutClasses,
  getSharedLayoutStyles,
  type Responsive,
  type SharedLayoutProps,
  Slot,
} from './layout-utils'

// ============================================================================
// Box Props
// ============================================================================

export interface BoxOwnProps extends SharedLayoutProps {
  /** Render as a different element */
  as?: 'div' | 'span'
  /** Merge props onto child element */
  asChild?: boolean
  /** CSS display property */
  display?: Responsive<Display>
}

type BoxDivProps = BoxOwnProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof BoxOwnProps>
type BoxSpanProps = BoxOwnProps & { as: 'span' } & Omit<React.ComponentPropsWithoutRef<'span'>, keyof BoxOwnProps>

export type BoxProps = BoxDivProps | BoxSpanProps

// ============================================================================
// Box Component
// ============================================================================

/** Box export. */
export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      as: Tag = 'div',
      asChild = false,
      className,
      style,
      display,
      // Shared layout props
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      width,
      minWidth,
      maxWidth,
      height,
      minHeight,
      maxHeight,
      position,
      inset,
      top,
      right,
      bottom,
      left,
      overflow,
      overflowX,
      overflowY,
      flexGrow,
      flexShrink,
      flexBasis,
      alignSelf,
      justifySelf,
      gridArea,
      gridColumn,
      gridColumnStart,
      gridColumnEnd,
      gridRow,
      gridRowStart,
      gridRowEnd,
      children,
      ...restProps
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : Tag

    const sharedLayoutProps: SharedLayoutProps = {
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      width,
      minWidth,
      maxWidth,
      height,
      minHeight,
      maxHeight,
      position,
      inset,
      top,
      right,
      bottom,
      left,
      overflow,
      overflowX,
      overflowY,
      flexGrow,
      flexShrink,
      flexBasis,
      alignSelf,
      justifySelf,
      gridArea,
      gridColumn,
      gridColumnStart,
      gridColumnEnd,
      gridRow,
      gridRowStart,
      gridRowEnd,
    }

    const classes = cn(
      'rt-Box',
      'box-border',
      getDisplayClasses(display),
      getSharedLayoutClasses(sharedLayoutProps),
      className,
    )

    const styles: React.CSSProperties = {
      ...getSharedLayoutStyles(sharedLayoutProps),
      ...style,
    }

    return (
      <Comp ref={ref} className={classes} style={Object.keys(styles).length > 0 ? styles : undefined} {...restProps}>
        {children}
      </Comp>
    )
  },
)

Box.displayName = 'Box'
