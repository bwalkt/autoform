'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  type AlignContent,
  type AlignItems,
  type Display,
  type GridColumns,
  type GridFlow,
  getAlignContentClasses,
  getAlignItemsClasses,
  getDisplayClasses,
  getGridColumnsClasses,
  getGridFlowClasses,
  getGridRowsClasses,
  getJustifyContentClasses,
  getJustifyItemsClasses,
  getSharedLayoutClasses,
  getSharedLayoutStyles,
  getSpacingClasses,
  type JustifyItems,
  type Responsive,
  type SharedLayoutProps,
  Slot,
  type Spacing,
} from './layout-utils'

// ============================================================================
// Grid Props
// ============================================================================

type GridDisplay = 'none' | 'grid' | 'inline-grid'
type GridJustify = 'start' | 'center' | 'end' | 'between'

export interface GridOwnProps extends SharedLayoutProps {
  /** Render as a different element */
  as?: 'div' | 'span'
  /** Merge props onto child element */
  asChild?: boolean
  /** CSS display property */
  display?: Responsive<GridDisplay>
  /** Grid template areas */
  areas?: Responsive<string>
  /** Number of columns */
  columns?: Responsive<GridColumns>
  /** Number of rows */
  rows?: Responsive<GridColumns>
  /** Grid auto-flow direction */
  flow?: Responsive<GridFlow>
  /** Align items along the cross axis */
  align?: Responsive<AlignItems>
  /** Align content along the cross axis */
  alignContent?: Responsive<AlignContent>
  /** Justify content along the main axis */
  justify?: Responsive<GridJustify>
  /** Justify items along the inline axis */
  justifyItems?: Responsive<JustifyItems>
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
      alignContent,
      justify,
      justifyItems,
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

    // Default to grid display if not specified
    const resolvedDisplay = display || 'grid'

    const classes = cn(
      'rt-Grid',
      'box-border',
      getDisplayClasses(resolvedDisplay as Responsive<Display>),
      getGridFlowClasses(flow),
      getAlignItemsClasses(align),
      getAlignContentClasses(alignContent),
      getJustifyContentClasses(justify),
      getJustifyItemsClasses(justifyItems),
      getSpacingClasses(gap, 'gap'),
      getSpacingClasses(gapX, 'gap-x'),
      getSpacingClasses(gapY, 'gap-y'),
      columns ? getGridColumnsClasses(columns) : 'rt-grid-cols-1',
      rows ? getGridRowsClasses(rows) : '',
      getSharedLayoutClasses(sharedLayoutProps),
      className,
    )

    // Build grid-specific styles - for areas and custom grid values
    const gridStyles: React.CSSProperties = {
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
