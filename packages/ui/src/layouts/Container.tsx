'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  type ContainerAlign,
  type ContainerSize,
  getSharedLayoutClasses,
  getSharedLayoutStyles,
  type Responsive,
  type SharedLayoutProps,
  Slot,
} from './layout-utils'

// ============================================================================
// Container Props
// ============================================================================

type ContainerDisplay = 'none' | 'initial'

export interface ContainerOwnProps extends SharedLayoutProps {
  /** Merge props onto child element */
  asChild?: boolean
  /** CSS display property */
  display?: Responsive<ContainerDisplay>
  /** Maximum width of container */
  size?: ContainerSize
  /** Horizontal alignment */
  align?: Responsive<ContainerAlign>
}

export type ContainerProps = ContainerOwnProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof ContainerOwnProps>

// ============================================================================
// Container Size Values
// ============================================================================

const containerSizeValues: Record<ContainerSize, string> = {
  '1': '28rem', // 448px
  '2': '43rem', // 688px
  '3': '55rem', // 880px
  '4': '71rem', // 1136px
}

// ============================================================================
// Container Component
// ============================================================================

/** Container export. */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      asChild = false,
      className,
      style,
      // Container-specific props
      display,
      size = '4',
      align = 'center',
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
      radius,
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
    const Comp = asChild ? Slot : 'div'

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
      radius,
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

    // Get resolved size value
    const resolvedSize = size || '4'
    const maxWidthValue = containerSizeValues[resolvedSize]

    // Get alignment classes
    const getAlignmentClasses = (alignment: Responsive<ContainerAlign> | undefined) => {
      if (!alignment) return 'items-center'

      const alignValue = typeof alignment === 'string' ? alignment : alignment.initial
      switch (alignValue) {
        case 'left':
          return 'items-start'
        case 'right':
          return 'items-end'
        default:
          return 'items-center'
      }
    }

    // Get display classes
    const getDisplayClass = (displayProp: Responsive<ContainerDisplay> | undefined) => {
      if (!displayProp) return 'flex'
      const displayValue = typeof displayProp === 'string' ? displayProp : displayProp.initial
      return displayValue === 'none' ? 'hidden' : 'flex'
    }

    const classes = cn(
      'rt-Container',
      'box-border w-full flex-col',
      getDisplayClass(display),
      getAlignmentClasses(align),
      getSharedLayoutClasses(sharedLayoutProps),
      className,
    )

    const styles: React.CSSProperties = {
      ...getSharedLayoutStyles(sharedLayoutProps),
      ...style,
    }

    const innerStyles: React.CSSProperties = {
      maxWidth: maxWidthValue,
      ...(width && { width }),
      ...(minWidth && { minWidth }),
      ...(maxWidth && { maxWidth }),
      ...(height && { height }),
      ...(minHeight && { minHeight }),
      ...(maxHeight && { maxHeight }),
    }

    return (
      <Comp ref={ref} className={classes} style={styles} {...restProps}>
        <div className="rt-ContainerInner w-full" style={innerStyles}>
          {children}
        </div>
      </Comp>
    )
  },
)

Container.displayName = 'Container'
