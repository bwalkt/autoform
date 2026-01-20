// Layout Components
export { Box, type BoxProps, type BoxOwnProps } from "./Box";
export { Flex, type FlexProps, type FlexOwnProps } from "./Flex";
export { Grid, type GridProps, type GridOwnProps } from "./Grid";
export { Container, type ContainerProps, type ContainerOwnProps } from "./Container";
export { Section, type SectionProps, type SectionOwnProps } from "./Section";

// Layout Utilities and Types
export {
  // Types
  type Responsive,
  type Spacing,
  type Display,
  type Position,
  type Overflow,
  type FlexDirection,
  type FlexWrap,
  type AlignItems,
  type JustifyContent,
  type GridFlow,
  type ContainerSize,
  type ContainerAlign,
  type SectionSize,
  type SharedLayoutProps,
  // Utilities
  Slot,
  spacingScale,
  getResponsiveClasses,
  getSpacingClasses,
  getDisplayClasses,
  getFlexDirectionClasses,
  getFlexWrapClasses,
  getAlignItemsClasses,
  getJustifyContentClasses,
  getGridFlowClasses,
  getGridColumnsStyle,
  getGridRowsStyle,
  getSharedLayoutClasses,
  getSharedLayoutStyles,
} from "./layout-utils";

// Import CSS
import "./layouts.css";
