'use client'

// Layout Components
export { Box, type BoxProps } from './Box'
export { Container, type ContainerProps } from './Container'
export { Flex, type FlexProps } from './Flex'
export { Grid, type GridProps } from './Grid'
// Layout Utilities and Types
export {
  type AlignItems,
  type ContainerAlign,
  type ContainerSize,
  type Display,
  type FlexDirection,
  type FlexWrap,
  type GridFlow,
  getAlignItemsClasses,
  getDisplayClasses,
  getFlexDirectionClasses,
  getFlexWrapClasses,
  getGridColumnsStyle,
  getGridFlowClasses,
  getGridRowsStyle,
  getJustifyContentClasses,
  getResponsiveClasses,
  getSharedLayoutClasses,
  getSharedLayoutStyles,
  getSpacingClasses,
  type JustifyContent,
  type Overflow,
  type Position,
  // Types
  type Responsive,
  type SectionSize,
  type SharedLayoutProps,
  // Utilities
  Slot,
  type Spacing,
  spacingScale,
} from './layout-utils'
export { Section, type SectionProps } from './Section'

// Import CSS
import './layouts.css'
