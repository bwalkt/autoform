'use client'

import * as React from 'react'
import type {
  AlignContent,
  AlignItems,
  AlignSelf,
  Display,
  FlexDirection,
  FlexWrap,
  JustifyContent,
  JustifyItems,
  JustifySelf,
  Overflow,
  Position,
  Responsive,
  Spacing,
} from '@/elements/tokens'
import { cn } from '@/lib/utils'

// Re-export shared types for convenience
export type {
  Responsive,
  Spacing,
  Display,
  Position,
  Overflow,
  FlexDirection,
  FlexWrap,
  AlignItems,
  AlignContent,
  AlignSelf,
  JustifyContent,
  JustifyItems,
  JustifySelf,
}

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

/** spacingScale export. */
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

/** getResponsiveClasses export. */
export function getResponsiveClasses<T extends string>(
  prop: Responsive<T> | undefined,
  prefix: string,
  valueMap?: Record<string, string>,
): string {
  if (prop === undefined) return ''

  const mapValue = (val: T) => (valueMap ? valueMap[val] || val : val)
  const formatValue = (val: T) => {
    const stringValue = String(val)
    const isNegative = stringValue.startsWith('-')
    const absolute = (isNegative ? stringValue.slice(1) : stringValue) as T
    const mapped = mapValue(absolute)
    return isNegative ? `-${prefix}-${mapped}` : `${prefix}-${mapped}`
  }

  if (typeof prop === 'string') {
    return formatValue(prop)
  }

  const classes: string[] = []
  if (prop.initial) classes.push(formatValue(prop.initial))
  if (prop.xs) classes.push(`xs:${formatValue(prop.xs)}`)
  if (prop.sm) classes.push(`sm:${formatValue(prop.sm)}`)
  if (prop.md) classes.push(`md:${formatValue(prop.md)}`)
  if (prop.lg) classes.push(`lg:${formatValue(prop.lg)}`)
  if (prop.xl) classes.push(`xl:${formatValue(prop.xl)}`)

  return classes.join(' ')
}

/** getSpacingClasses export. */
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

/** getDisplayClasses export. */
export const getDisplayClasses = createMappedClassHelper(displayMap)
/** getPositionClasses export. */
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

const alignContentMap: Record<AlignContent, string> = {
  start: 'content-start',
  center: 'content-center',
  end: 'content-end',
  between: 'content-between',
  around: 'content-around',
  evenly: 'content-evenly',
  stretch: 'content-stretch',
}

const justifyContentMap: Record<JustifyContent, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

const alignSelfMap: Record<AlignSelf, string> = {
  auto: 'self-auto',
  start: 'self-start',
  center: 'self-center',
  end: 'self-end',
  baseline: 'self-baseline',
  stretch: 'self-stretch',
}

const justifySelfMap: Record<JustifySelf, string> = {
  auto: 'justify-self-auto',
  start: 'justify-self-start',
  center: 'justify-self-center',
  end: 'justify-self-end',
  stretch: 'justify-self-stretch',
}

const justifyItemsMap: Record<JustifyItems, string> = {
  start: 'justify-items-start',
  center: 'justify-items-center',
  end: 'justify-items-end',
  baseline: 'justify-items-baseline',
  stretch: 'justify-items-stretch',
}

const flexGrowMap: Record<'0' | '1', string> = {
  '0': 'grow-0',
  '1': 'grow',
}

const flexShrinkMap: Record<'0' | '1', string> = {
  '0': 'shrink-0',
  '1': 'shrink',
}

/** getFlexDirectionClasses export. */
export const getFlexDirectionClasses = createMappedClassHelper(flexDirectionMap)
/** getFlexWrapClasses export. */
export const getFlexWrapClasses = createMappedClassHelper(flexWrapMap)
/** getAlignItemsClasses export. */
export const getAlignItemsClasses = createMappedClassHelper(alignItemsMap)
/** getAlignContentClasses export. */
export const getAlignContentClasses = createMappedClassHelper(alignContentMap)
/** getJustifyContentClasses export. */
export const getJustifyContentClasses = createMappedClassHelper(justifyContentMap)
/** getAlignSelfClasses export. */
export const getAlignSelfClasses = createMappedClassHelper(alignSelfMap)
/** getJustifySelfClasses export. */
export const getJustifySelfClasses = createMappedClassHelper(justifySelfMap)
/** getJustifyItemsClasses export. */
export const getJustifyItemsClasses = createMappedClassHelper(justifyItemsMap)
/** getFlexGrowClasses export. */
export const getFlexGrowClasses = createMappedClassHelper(flexGrowMap)
/** getFlexShrinkClasses export. */
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

/** getGridFlowClasses export. */
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

// Grid rows - map to Tailwind grid-rows-{n} classes
const gridRowsMap: Record<string, string> = {
  '1': 'grid-rows-1',
  '2': 'grid-rows-2',
  '3': 'grid-rows-3',
  '4': 'grid-rows-4',
  '5': 'grid-rows-5',
  '6': 'grid-rows-6',
  none: 'grid-rows-none',
}

export type GridColumns = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'none'
export type GridRows = '1' | '2' | '3' | '4' | '5' | '6' | 'none'

/** getGridColumnsClasses export. */
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

  if (prop.xs && gridColumnsMap[prop.xs]) {
    const baseClass = gridColumnsMap[prop.xs].replace('grid-cols-', '')
    classes.push(`xs:grid-cols-${baseClass}`)
  }

  if (prop.sm && gridColumnsMap[prop.sm]) {
    const baseClass = gridColumnsMap[prop.sm].replace('grid-cols-', '')
    classes.push(`sm:grid-cols-${baseClass}`)
  }

  if (prop.md && gridColumnsMap[prop.md]) {
    const baseClass = gridColumnsMap[prop.md].replace('grid-cols-', '')
    classes.push(`md:grid-cols-${baseClass}`)
  }

  if (prop.lg && gridColumnsMap[prop.lg]) {
    const baseClass = gridColumnsMap[prop.lg].replace('grid-cols-', '')
    classes.push(`lg:grid-cols-${baseClass}`)
  }

  if (prop.xl && gridColumnsMap[prop.xl]) {
    const baseClass = gridColumnsMap[prop.xl].replace('grid-cols-', '')
    classes.push(`xl:grid-cols-${baseClass}`)
  }

  return classes.join(' ')
}

// Check if columns value can be handled by classes (is numeric preset)
/** canUseGridColumnsClasses export. */
export function canUseGridColumnsClasses(prop: Responsive<string> | undefined): boolean {
  if (prop === undefined) return false

  if (typeof prop === 'string') {
    return !!gridColumnsMap[prop]
  }

  // For responsive objects, check if all values are known
  return Object.values(prop).every(val => !val || gridColumnsMap[val])
}

/** getGridRowsClasses export. */
export function getGridRowsClasses(prop: Responsive<GridRows | string> | undefined): string {
  if (prop === undefined) return ''

  if (typeof prop === 'string') {
    // If it's a known row count, use the class
    if (gridRowsMap[prop]) {
      return gridRowsMap[prop]
    }
    // Otherwise return empty (will fall back to style)
    return ''
  }

  const classes: string[] = []
  const initialClass = prop.initial ? gridRowsMap[prop.initial] : undefined
  if (initialClass) classes.push(initialClass)

  if (prop.xs && gridRowsMap[prop.xs]) {
    const baseClass = gridRowsMap[prop.xs].replace('grid-rows-', '')
    classes.push(`xs:grid-rows-${baseClass}`)
  }

  if (prop.sm && gridRowsMap[prop.sm]) {
    const baseClass = gridRowsMap[prop.sm].replace('grid-rows-', '')
    classes.push(`sm:grid-rows-${baseClass}`)
  }

  if (prop.md && gridRowsMap[prop.md]) {
    const baseClass = gridRowsMap[prop.md].replace('grid-rows-', '')
    classes.push(`md:grid-rows-${baseClass}`)
  }

  if (prop.lg && gridRowsMap[prop.lg]) {
    const baseClass = gridRowsMap[prop.lg].replace('grid-rows-', '')
    classes.push(`lg:grid-rows-${baseClass}`)
  }

  if (prop.xl && gridRowsMap[prop.xl]) {
    const baseClass = gridRowsMap[prop.xl].replace('grid-rows-', '')
    classes.push(`xl:grid-rows-${baseClass}`)
  }

  return classes.join(' ')
}

// Check if rows value can be handled by classes (is numeric preset)
/** canUseGridRowsClasses export. */
export function canUseGridRowsClasses(prop: Responsive<string> | undefined): boolean {
  if (prop === undefined) return false

  if (typeof prop === 'string') {
    return !!gridRowsMap[prop]
  }

  // For responsive objects, check if all values are known
  return Object.values(prop).every(val => !val || gridRowsMap[val])
}

// Grid columns/rows - returns style object for custom values
function resolveGridTemplate(value: string): string {
  if (/^\d+$/.test(value)) {
    const num = Number(value)
    return `repeat(${num}, minmax(0, 1fr))`
  }
  return value
}

/** getGridColumnsStyle export. */
export function getGridColumnsStyle(columns: Responsive<string> | undefined): React.CSSProperties {
  if (columns === undefined) return {}

  if (typeof columns === 'string') {
    return {
      gridTemplateColumns: resolveGridTemplate(columns),
    }
  }

  // For responsive values, we need to use CSS variables and media queries
  // But since we can't inject media queries directly in inline styles,
  // we'll just use the initial value for now
  const styles: React.CSSProperties = {}
  if (columns.initial) {
    styles.gridTemplateColumns = resolveGridTemplate(columns.initial)
  }

  // Note: For true responsive behavior, we need to use CSS classes or CSS-in-JS
  return styles
}

/** getGridRowsStyle export. */
export function getGridRowsStyle(rows: Responsive<string> | undefined): React.CSSProperties {
  if (rows === undefined) return {}

  if (typeof rows === 'string') {
    return {
      gridTemplateRows: resolveGridTemplate(rows),
    }
  }

  // For responsive values, use initial value
  const styles: React.CSSProperties = {}
  if (rows.initial) {
    styles.gridTemplateRows = resolveGridTemplate(rows.initial)
  }

  return styles
}

// ============================================================================
// Slot Component
// ============================================================================

/** Slot export. */
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

  // Self alignment
  alignSelf?: Responsive<AlignSelf>
  justifySelf?: Responsive<JustifySelf>

  // Grid item props
  gridArea?: string
  gridColumn?: string
  gridColumnStart?: string
  gridColumnEnd?: string
  gridRow?: string
  gridRowStart?: string
  gridRowEnd?: string
}

/** getSharedLayoutClasses export. */
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
    alignSelf,
    justifySelf,
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
    // Self alignment
    getAlignSelfClasses(alignSelf),
    getJustifySelfClasses(justifySelf),
  )
}

/** getSharedLayoutStyles export. */
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
