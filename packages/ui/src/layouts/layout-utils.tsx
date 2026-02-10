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
  Radius,
  Responsive,
  Spacing,
} from '@/elements/tokens'
import { designTokens } from '@/elements/tokens'
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
  Radius,
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

export const spacingToPixels: Record<Spacing, string> = {
  '0': '0px',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '24px',
  '6': '32px',
  // `7` intentionally matches `6` in the current design token scale.
  '7': '32px',
  '8': '40px',
  '9': '48px',
}

function getSpacingPixelValue(prop: Responsive<Spacing> | undefined): string | undefined {
  if (!prop || typeof prop !== 'string') return undefined
  return spacingToPixels[prop]
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

// Grid columns - map to layout classes
const gridColumnsMap: Record<string, string> = {
  '1': 'rt-grid-cols-1',
  '2': 'rt-grid-cols-2',
  '3': 'rt-grid-cols-3',
  '4': 'rt-grid-cols-4',
  '5': 'rt-grid-cols-5',
  '6': 'rt-grid-cols-6',
  '7': 'rt-grid-cols-7',
  '8': 'rt-grid-cols-8',
  '9': 'rt-grid-cols-9',
  '10': 'rt-grid-cols-10',
  '11': 'rt-grid-cols-11',
  '12': 'rt-grid-cols-12',
  none: 'rt-grid-cols-none',
}

// Grid rows - map to layout classes
const gridRowsMap: Record<string, string> = {
  '1': 'rt-grid-rows-1',
  '2': 'rt-grid-rows-2',
  '3': 'rt-grid-rows-3',
  '4': 'rt-grid-rows-4',
  '5': 'rt-grid-rows-5',
  '6': 'rt-grid-rows-6',
  none: 'rt-grid-rows-none',
}

export type GridColumns = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'none'
export type GridRows = '1' | '2' | '3' | '4' | '5' | '6' | 'none'

/** getGridColumnsClasses export. */
function getGridClasses<T extends string>(
  prop: Responsive<T> | undefined,
  classMap: Record<string, string>,
  prefix: string,
): string {
  if (prop === undefined) return ''

  if (typeof prop === 'string') {
    return classMap[prop] || ''
  }

  const classes: string[] = []
  if (prop.initial) {
    const initialClass = classMap[prop.initial]
    if (initialClass) classes.push(initialClass)
  }

  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'] as const
  for (const bp of breakpoints) {
    const value = prop[bp]
    if (value && classMap[value]) {
      const baseClass = classMap[value].replace(`${prefix}-`, '')
      classes.push(`${prefix}-${bp}-${baseClass}`)
    }
  }

  return classes.join(' ')
}

/** isGridColumnsValue export. */
export function isGridColumnsValue(value: string): value is GridColumns {
  return value in gridColumnsMap
}

/** isGridRowsValue export. */
export function isGridRowsValue(value: string): value is GridRows {
  return value in gridRowsMap
}

/** getGridColumnsClasses export. */
export function getGridColumnsClasses(prop: Responsive<GridColumns> | undefined): string {
  return getGridClasses(prop, gridColumnsMap, 'rt-grid-cols')
}

/** getGridRowsClasses export. */
export function getGridRowsClasses(prop: Responsive<GridRows> | undefined): string {
  return getGridClasses(prop, gridRowsMap, 'rt-grid-rows')
}

// ============================================================================
// Slot Component
// ============================================================================

/** Slot export. */
function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (!ref) continue
      if (typeof ref === 'function') {
        ref(node)
      } else {
        ;(ref as React.MutableRefObject<T | null>).current = node
      }
    }
  }
}

/** Slot export. */
export const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ children, ...props }, ref) => {
  if (React.isValidElement<React.HTMLAttributes<HTMLElement>>(children)) {
    const childRef = (children as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref

    return React.cloneElement(
      children as React.ReactElement,
      {
        ...props,
        ...children.props,
        ref: ref ? composeRefs(childRef, ref) : childRef,
        className: cn(props.className, children.props.className),
      } as Record<string, unknown>,
    )
  }
  return <>{children}</>
})

Slot.displayName = 'Slot'

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
  radius?: Radius

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
    flexBasis,
    gridArea,
    gridColumn,
    gridColumnStart,
    gridColumnEnd,
    gridRow,
    gridRowStart,
    gridRowEnd,
    inset,
    top,
    right,
    bottom,
    left,
  } = props

  return {
    ...(getSpacingPixelValue(p) && { padding: getSpacingPixelValue(p) }),
    ...(getSpacingPixelValue(px) && { paddingLeft: getSpacingPixelValue(px), paddingRight: getSpacingPixelValue(px) }),
    ...(getSpacingPixelValue(py) && { paddingTop: getSpacingPixelValue(py), paddingBottom: getSpacingPixelValue(py) }),
    ...(getSpacingPixelValue(pt) && { paddingTop: getSpacingPixelValue(pt) }),
    ...(getSpacingPixelValue(pr) && { paddingRight: getSpacingPixelValue(pr) }),
    ...(getSpacingPixelValue(pb) && { paddingBottom: getSpacingPixelValue(pb) }),
    ...(getSpacingPixelValue(pl) && { paddingLeft: getSpacingPixelValue(pl) }),
    ...(getSpacingPixelValue(m) && { margin: getSpacingPixelValue(m) }),
    ...(getSpacingPixelValue(mx) && { marginLeft: getSpacingPixelValue(mx), marginRight: getSpacingPixelValue(mx) }),
    ...(getSpacingPixelValue(my) && { marginTop: getSpacingPixelValue(my), marginBottom: getSpacingPixelValue(my) }),
    ...(getSpacingPixelValue(mt) && { marginTop: getSpacingPixelValue(mt) }),
    ...(getSpacingPixelValue(mr) && { marginRight: getSpacingPixelValue(mr) }),
    ...(getSpacingPixelValue(mb) && { marginBottom: getSpacingPixelValue(mb) }),
    ...(getSpacingPixelValue(ml) && { marginLeft: getSpacingPixelValue(ml) }),
    ...(width && { width }),
    ...(minWidth && { minWidth }),
    ...(maxWidth && { maxWidth }),
    ...(height && { height }),
    ...(minHeight && { minHeight }),
    ...(maxHeight && { maxHeight }),
    ...(radius && { borderRadius: designTokens.radius[radius] }),
    ...(flexBasis && { flexBasis }),
    ...(gridArea && { gridArea }),
    ...(gridColumn && { gridColumn }),
    ...(gridColumnStart && { gridColumnStart }),
    ...(gridColumnEnd && { gridColumnEnd }),
    ...(gridRow && { gridRow }),
    ...(gridRowStart && { gridRowStart }),
    ...(gridRowEnd && { gridRowEnd }),
    ...(getSpacingPixelValue(inset) && { inset: getSpacingPixelValue(inset) }),
    ...(getSpacingPixelValue(top) && { top: getSpacingPixelValue(top) }),
    ...(getSpacingPixelValue(right) && { right: getSpacingPixelValue(right) }),
    ...(getSpacingPixelValue(bottom) && { bottom: getSpacingPixelValue(bottom) }),
    ...(getSpacingPixelValue(left) && { left: getSpacingPixelValue(left) }),
  }
}
