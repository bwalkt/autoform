'use client'

import * as React from 'react'
import type {
  AlignItems,
  Display,
  FlexDirection,
  FlexWrap,
  JustifyContent,
  Overflow,
  Position,
  Responsive,
  Spacing,
} from '@/elements/tokens'
import { cn } from '@/lib/utils'

// Re-export shared types for convenience
export type { Responsive, Spacing, Display, Position, Overflow, FlexDirection, FlexWrap, AlignItems, JustifyContent }

// ============================================================================
// Layout-specific Types
// ============================================================================

// Grid types
export type GridFlow = 'row' | 'column' | 'dense' | 'row-dense' | 'column-dense'

// Container types
export type ContainerSize = '1' | '2' | '3' | '4'
export type ContainerAlign = 'left' | 'center' | 'right'

// Section types
export type SectionSize = '1' | '2' | '3' | '4'

// ============================================================================
// Spacing Scale Mapping
// ============================================================================

export const spacingScale: Record<Spacing, string> = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '8',
  '8': '10',
  '9': '12',
}

// ============================================================================
// Responsive Class Helpers
// ============================================================================

export function getResponsiveClasses<T extends string>(
  prop: Responsive<T> | undefined,
  prefix: string,
  valueMap?: Record<string, string>,
): string {
  if (prop === undefined) return ''

  const mapValue = (val: T) => (valueMap ? valueMap[val] || val : val)

  if (typeof prop === 'string') {
    return `${prefix}-${mapValue(prop)}`
  }

  const classes: string[] = []
  if (prop.initial) classes.push(`${prefix}-${mapValue(prop.initial)}`)
  if (prop.xs) classes.push(`xs:${prefix}-${mapValue(prop.xs)}`)
  if (prop.sm) classes.push(`sm:${prefix}-${mapValue(prop.sm)}`)
  if (prop.md) classes.push(`md:${prefix}-${mapValue(prop.md)}`)
  if (prop.lg) classes.push(`lg:${prefix}-${mapValue(prop.lg)}`)
  if (prop.xl) classes.push(`xl:${prefix}-${mapValue(prop.xl)}`)

  return classes.join(' ')
}

export function getSpacingClasses(prop: Responsive<Spacing> | undefined, prefix: string): string {
  return getResponsiveClasses(prop, prefix, spacingScale)
}

// ============================================================================
// Generic Factory for Mapped Class Helpers
// ============================================================================

/**
 * Creates a responsive class helper function from a value-to-class mapping.
 * This reduces repetition for functions like getDisplayClasses, getPositionClasses, etc.
 */
function createMappedClassHelper<T extends string>(
  map: Record<T, string>,
): (prop: Responsive<T> | undefined) => string {
  return prop => {
    if (prop === undefined) return ''
    if (typeof prop === 'string') return map[prop] || ''

    const classes: string[] = []
    if (prop.initial) classes.push(map[prop.initial])
    if (prop.xs) classes.push(`xs:${map[prop.xs]}`)
    if (prop.sm) classes.push(`sm:${map[prop.sm]}`)
    if (prop.md) classes.push(`md:${map[prop.md]}`)
    if (prop.lg) classes.push(`lg:${map[prop.lg]}`)
    if (prop.xl) classes.push(`xl:${map[prop.xl]}`)
    return classes.join(' ')
  }
}

// ============================================================================
// Display & Position Class Helpers
// ============================================================================

const displayMap: Record<Display, string> = {
  none: 'hidden',
  inline: 'inline',
  'inline-block': 'inline-block',
  block: 'block',
  flex: 'flex',
  'inline-flex': 'inline-flex',
  grid: 'grid',
  'inline-grid': 'inline-grid',
  contents: 'contents',
}

const positionMap: Record<Position, string> = {
  static: 'static',
  relative: 'relative',
  absolute: 'absolute',
  fixed: 'fixed',
  sticky: 'sticky',
}

export const getDisplayClasses = createMappedClassHelper(displayMap)
export const getPositionClasses = createMappedClassHelper(positionMap)

// ============================================================================
// Flex Class Helpers
// ============================================================================

const flexDirectionMap: Record<FlexDirection, string> = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  column: 'flex-col',
  'column-reverse': 'flex-col-reverse',
}

const flexWrapMap: Record<FlexWrap, string> = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
}

const alignItemsMap: Record<AlignItems, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
}

const justifyContentMap: Record<JustifyContent, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

const flexGrowMap: Record<'0' | '1', string> = {
  '0': 'grow-0',
  '1': 'grow',
}

const flexShrinkMap: Record<'0' | '1', string> = {
  '0': 'shrink-0',
  '1': 'shrink',
}

export const getFlexDirectionClasses = createMappedClassHelper(flexDirectionMap)
export const getFlexWrapClasses = createMappedClassHelper(flexWrapMap)
export const getAlignItemsClasses = createMappedClassHelper(alignItemsMap)
export const getJustifyContentClasses = createMappedClassHelper(justifyContentMap)
export const getFlexGrowClasses = createMappedClassHelper(flexGrowMap)
export const getFlexShrinkClasses = createMappedClassHelper(flexShrinkMap)

// ============================================================================
// Grid Class Helpers
// ============================================================================

const gridFlowMap: Record<GridFlow, string> = {
  row: 'grid-flow-row',
  column: 'grid-flow-col',
  dense: 'grid-flow-dense',
  'row-dense': 'grid-flow-row-dense',
  'column-dense': 'grid-flow-col-dense',
}

export const getGridFlowClasses = createMappedClassHelper(gridFlowMap)

// Grid columns - map to Tailwind grid-cols-{n} classes
const gridColumnsMap: Record<string, string> = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-2',
  '3': 'grid-cols-3',
  '4': 'grid-cols-4',
  '5': 'grid-cols-5',
  '6': 'grid-cols-6',
  '7': 'grid-cols-7',
  '8': 'grid-cols-8',
  '9': 'grid-cols-9',
  '10': 'grid-cols-10',
  '11': 'grid-cols-11',
  '12': 'grid-cols-12',
  none: 'grid-cols-none',
}

export type GridColumns = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'none'

export function getGridColumnsClasses(prop: Responsive<GridColumns | string> | undefined): string {
  if (prop === undefined) return ''

  if (typeof prop === 'string') {
    // If it's a known column count, use the class
    if (gridColumnsMap[prop]) {
      return gridColumnsMap[prop]
    }
    // Otherwise return empty (will fall back to style)
    return ''
  }

  const classes: string[] = []
  const initialClass = prop.initial ? gridColumnsMap[prop.initial] : undefined
  if (initialClass) classes.push(initialClass)

  const xsClass = prop.xs ? gridColumnsMap[prop.xs] : undefined
  if (xsClass) classes.push(`xs:${xsClass}`)

  const smClass = prop.sm ? gridColumnsMap[prop.sm] : undefined
  if (smClass) classes.push(`sm:${smClass}`)

  const mdClass = prop.md ? gridColumnsMap[prop.md] : undefined
  if (mdClass) classes.push(`md:${mdClass}`)

  const lgClass = prop.lg ? gridColumnsMap[prop.lg] : undefined
  if (lgClass) classes.push(`lg:${lgClass}`)

  const xlClass = prop.xl ? gridColumnsMap[prop.xl] : undefined
  if (xlClass) classes.push(`xl:${xlClass}`)

  return classes.join(' ')
}

// Check if columns value can be handled by classes (is numeric preset)
export function canUseGridColumnsClasses(prop: Responsive<string> | undefined): boolean {
  if (prop === undefined) return false

  if (typeof prop === 'string') {
    return !!gridColumnsMap[prop]
  }

  // For responsive objects, check if all values are known
  return Object.values(prop).every(val => !val || gridColumnsMap[val])
}

// Grid columns/rows - returns style object for custom values
export function getGridColumnsStyle(columns: Responsive<string> | undefined): React.CSSProperties {
  if (columns === undefined) return {}

  if (typeof columns === 'string') {
    // Check if it's a pure number (strict check to avoid parsing "200px 1fr" as 200)
    if (/^\d+$/.test(columns)) {
      const num = Number(columns)
      return { gridTemplateColumns: `repeat(${num}, minmax(0, 1fr))` }
    }
    return { gridTemplateColumns: columns }
  }

  // For responsive, we'll use CSS variables approach
  // This is simplified - in production you'd use CSS custom properties with media queries
  const initial = columns.initial
  if (initial) {
    if (/^\d+$/.test(initial)) {
      const num = Number(initial)
      return { gridTemplateColumns: `repeat(${num}, minmax(0, 1fr))` }
    }
    return { gridTemplateColumns: initial }
  }

  return {}
}

export function getGridRowsStyle(rows: Responsive<string> | undefined): React.CSSProperties {
  if (rows === undefined) return {}

  if (typeof rows === 'string') {
    // Check if it's a pure number (strict check to avoid parsing "200px 1fr" as 200)
    if (/^\d+$/.test(rows)) {
      const num = Number(rows)
      return { gridTemplateRows: `repeat(${num}, minmax(0, 1fr))` }
    }
    return { gridTemplateRows: rows }
  }

  const initial = rows.initial
  if (initial) {
    if (/^\d+$/.test(initial)) {
      const num = Number(initial)
      return { gridTemplateRows: `repeat(${num}, minmax(0, 1fr))` }
    }
    return { gridTemplateRows: initial }
  }

  return {}
}

// ============================================================================
// Slot Component
// ============================================================================

export function Slot({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>) {
  if (React.isValidElement<React.HTMLAttributes<HTMLElement>>(children)) {
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      className: cn(props.className, children.props.className),
    })
  }
  return <>{children}</>
}

// ============================================================================
// Shared Layout Props
// ============================================================================

export interface SharedLayoutProps {
  // Padding
  p?: Responsive<Spacing>
  px?: Responsive<Spacing>
  py?: Responsive<Spacing>
  pt?: Responsive<Spacing>
  pr?: Responsive<Spacing>
  pb?: Responsive<Spacing>
  pl?: Responsive<Spacing>

  // Margin
  m?: Responsive<Spacing>
  mx?: Responsive<Spacing>
  my?: Responsive<Spacing>
  mt?: Responsive<Spacing>
  mr?: Responsive<Spacing>
  mb?: Responsive<Spacing>
  ml?: Responsive<Spacing>

  // Sizing
  width?: string
  minWidth?: string
  maxWidth?: string
  height?: string
  minHeight?: string
  maxHeight?: string

  // Position
  position?: Responsive<Position>
  inset?: Responsive<Spacing>
  top?: Responsive<Spacing>
  right?: Responsive<Spacing>
  bottom?: Responsive<Spacing>
  left?: Responsive<Spacing>

  // Overflow
  overflow?: Responsive<Overflow>
  overflowX?: Responsive<Overflow>
  overflowY?: Responsive<Overflow>

  // Flex item props
  flexGrow?: Responsive<'0' | '1'>
  flexShrink?: Responsive<'0' | '1'>
  flexBasis?: string

  // Grid item props
  gridArea?: string
  gridColumn?: string
  gridColumnStart?: string
  gridColumnEnd?: string
  gridRow?: string
  gridRowStart?: string
  gridRowEnd?: string
}

export function getSharedLayoutClasses(props: SharedLayoutProps): string {
  const {
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
  } = props

  return cn(
    // Padding
    getSpacingClasses(p, 'p'),
    getSpacingClasses(px, 'px'),
    getSpacingClasses(py, 'py'),
    getSpacingClasses(pt, 'pt'),
    getSpacingClasses(pr, 'pr'),
    getSpacingClasses(pb, 'pb'),
    getSpacingClasses(pl, 'pl'),
    // Margin
    getSpacingClasses(m, 'm'),
    getSpacingClasses(mx, 'mx'),
    getSpacingClasses(my, 'my'),
    getSpacingClasses(mt, 'mt'),
    getSpacingClasses(mr, 'mr'),
    getSpacingClasses(mb, 'mb'),
    getSpacingClasses(ml, 'ml'),
    // Position
    getPositionClasses(position),
    getSpacingClasses(inset, 'inset'),
    getSpacingClasses(top, 'top'),
    getSpacingClasses(right, 'right'),
    getSpacingClasses(bottom, 'bottom'),
    getSpacingClasses(left, 'left'),
    // Overflow
    getResponsiveClasses(overflow, 'overflow'),
    getResponsiveClasses(overflowX, 'overflow-x'),
    getResponsiveClasses(overflowY, 'overflow-y'),
    // Flex
    getFlexGrowClasses(flexGrow),
    getFlexShrinkClasses(flexShrink),
  )
}

export function getSharedLayoutStyles(props: SharedLayoutProps): React.CSSProperties {
  const {
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    flexBasis,
    gridArea,
    gridColumn,
    gridColumnStart,
    gridColumnEnd,
    gridRow,
    gridRowStart,
    gridRowEnd,
  } = props

  return {
    ...(width && { width }),
    ...(minWidth && { minWidth }),
    ...(maxWidth && { maxWidth }),
    ...(height && { height }),
    ...(minHeight && { minHeight }),
    ...(maxHeight && { maxHeight }),
    ...(flexBasis && { flexBasis }),
    ...(gridArea && { gridArea }),
    ...(gridColumn && { gridColumn }),
    ...(gridColumnStart && { gridColumnStart }),
    ...(gridColumnEnd && { gridColumnEnd }),
    ...(gridRow && { gridRow }),
    ...(gridRowStart && { gridRowStart }),
    ...(gridRowEnd && { gridRowEnd }),
  }
}
