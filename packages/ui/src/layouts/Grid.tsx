'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  type AlignItems,
  canUseGridColumnsClasses,
  type Display,
  type GridFlow,
  getAlignItemsClasses,
  getDisplayClasses,
  getGridColumnsClasses,
  getGridColumnsStyle,
  getGridFlowClasses,
  getGridRowsStyle,
  getJustifyContentClasses,
  getSharedLayoutClasses,
  getSharedLayoutStyles,
  getSpacingClasses,
  type JustifyContent,
  type Responsive,
  type SharedLayoutProps,
  Slot,
  type Spacing,
} from './layout-utils'

// ============================================================================
// Grid Props
// ============================================================================

type GridDisplay = 'none' | 'grid' | 'inline-grid'

export interface GridOwnProps extends SharedLayoutProps {
  /** Render as a different element */
  as?: 'div' | 'span'
  /** Merge props onto child element */
  asChild?: boolean
  /** CSS display property */
  display?: Responsive<GridDisplay>
  /** Grid template areas */
  areas?: Responsive<string>
  /** Number of columns or explicit column template */
  columns?: Responsive<string>
  /** Number of rows or explicit row template */
  rows?: Responsive<string>
  /** Grid auto-flow direction */
  flow?: Responsive<GridFlow>
  /** Align items along the cross axis */
  align?: Responsive<AlignItems>
  /** Justify content along the main axis */
  justify?: Responsive<JustifyContent>
  /** Gap between items */
  gap?: Responsive<Spacing>
  /** Horizontal gap between items */
  gapX?: Responsive<Spacing>
  /** Vertical gap between items */
  gapY?: Responsive<Spacing>
}

type GridDivProps = GridOwnProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof GridOwnProps>
type GridSpanProps = GridOwnProps & { as: 'span' } & Omit<React.ComponentPropsWithoutRef<'span'>, keyof GridOwnProps>

export type GridProps = GridDivProps | GridSpanProps

// ============================================================================
// Grid Component
// ============================================================================

/** Grid export. */
export const Grid = React.forwardRef<HTMLElement, GridProps>(
  (
    {
      as: Tag = 'div',
      asChild = false,
      className,
      style,
      // Grid-specific props
      display,
      areas,
      columns,
      rows,
      flow,
      align,
      justify,
      gap,
      gapX,
      gapY,
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
      gridArea,
      gridColumn,
      gridColumnStart,
      gridColumnEnd,
      gridRow,
      gridRowStart,
      gridRowEnd,
    }

    // Default to grid display if not specified
    const resolvedDisplay = display || 'grid'

    // Use classes for standard column counts, fall back to styles for custom values
    const useColumnsClasses = canUseGridColumnsClasses(columns)

    const classes = cn(
      'rt-Grid',
      'box-border',
      getDisplayClasses(resolvedDisplay as Responsive<Display>),
      getGridFlowClasses(flow),
      getAlignItemsClasses(align),
      getJustifyContentClasses(justify),
      getSpacingClasses(gap, 'gap'),
      getSpacingClasses(gapX, 'gap-x'),
      getSpacingClasses(gapY, 'gap-y'),
      useColumnsClasses && getGridColumnsClasses(columns),
      getSharedLayoutClasses(sharedLayoutProps),
      className,
    )

    // Build grid-specific styles (only use style for columns if not using classes)
    const gridStyles: React.CSSProperties = {
      ...(!useColumnsClasses ? getGridColumnsStyle(columns) : {}),
      ...getGridRowsStyle(rows),
      ...(areas && typeof areas === 'string' && { gridTemplateAreas: areas }),
    }

    const styles: React.CSSProperties = {
      ...gridStyles,
      ...getSharedLayoutStyles(sharedLayoutProps),
      ...style,
    }

    return (
      <Comp
        ref={ref as React.Ref<HTMLDivElement>}
        className={classes}
        style={Object.keys(styles).length > 0 ? styles : undefined}
        {...restProps}
      >
        {children}
      </Comp>
    )
  },
)

Grid.displayName = 'Grid'
