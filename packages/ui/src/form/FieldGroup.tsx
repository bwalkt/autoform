'use client'

import * as React from 'react'
import { Separator } from '@/elements/Separator'
import type {
  AlignItems,
  FieldGroupLayout,
  GridColumns,
  Responsive,
  Size,
  Spacing,
  TextFieldVariant,
} from '@/elements/tokens'
import { Flex } from '@/layouts/Flex'
import { Grid } from '@/layouts/Grid'
import { cn } from '@/lib/utils'
import { FieldGroupProvider } from './FieldGroupContext'

// ============================================================================
// FieldGroup Root Component
// ============================================================================

export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size to apply to all child form fields */
  size?: Size
  /** Variant to apply to all child form fields */
  variant?: TextFieldVariant
  /** Gap between child elements */
  gap?: Spacing
  /** Layout mode */
  layout?: FieldGroupLayout
  /** Grid columns (for grid layout) */
  columns?: Responsive<GridColumns>
  /** Alignment for inline layout */
  align?: AlignItems
  /** Children elements */
  children: React.ReactNode
}

const FieldGroupRoot = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  ({ size, variant, gap = '4', layout = 'stacked', columns = '2', align, className, children, ...props }, ref) => {
    // Stacked layout - vertical flex column (default)
    if (layout === 'stacked') {
      return (
        <FieldGroupProvider value={{ size, variant, layout }}>
          <Flex ref={ref} direction="column" gap={gap} className={className} {...props}>
            {children}
          </Flex>
        </FieldGroupProvider>
      )
    }

    // Inline layout - horizontal flex row
    if (layout === 'inline') {
      return (
        <FieldGroupProvider value={{ size, variant, layout }}>
          <Flex ref={ref} direction="row" wrap="wrap" align={align || 'end'} gap={gap} className={className} {...props}>
            {children}
          </Flex>
        </FieldGroupProvider>
      )
    }

    // Grid layout
    if (layout === 'grid') {
      return (
        <FieldGroupProvider value={{ size, variant, layout }}>
          <Grid ref={ref} columns={columns} gap={gap} className={className} {...props}>
            {children}
          </Grid>
        </FieldGroupProvider>
      )
    }

    // Side-labels layout - vertical stack of self-contained rows
    if (layout === 'side-labels') {
      return (
        <FieldGroupProvider value={{ size, variant, layout }}>
          <Flex ref={ref} direction="column" gap={gap} className={className} {...props}>
            {children}
          </Flex>
        </FieldGroupProvider>
      )
    }

    // Sectioned layout - vertical flex with sections
    if (layout === 'sectioned') {
      return (
        <FieldGroupProvider value={{ size, variant, layout }}>
          <Flex ref={ref} direction="column" className={className} {...props}>
            {children}
          </Flex>
        </FieldGroupProvider>
      )
    }

    // Fallback to stacked
    return (
      <FieldGroupProvider value={{ size, variant, layout }}>
        <Flex ref={ref} direction="column" gap={gap} className={className} {...props}>
          {children}
        </Flex>
      </FieldGroupProvider>
    )
  },
)

FieldGroupRoot.displayName = 'FieldGroup'

// ============================================================================
// FieldGroup.Section - For sectioned layout
// ============================================================================

export interface FieldGroupSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title?: string
  /** Section description */
  description?: string
  /** Whether to show a separator above (default: true). Pass false for the first section. */
  separator?: boolean
  /** Gap between fields in the section */
  gap?: Spacing
}

const FieldGroupSection = React.forwardRef<HTMLDivElement, FieldGroupSectionProps>(
  ({ title, description, separator = true, gap = '4', className, children, ...props }, ref) => (
    <Flex ref={ref} direction="column" className={className} {...props}>
      {separator && <Separator className="my-6" />}
      {(title || description) && (
        <Flex direction="column" className="mb-4">
          {title && <span className="text-base font-medium text-foreground">{title}</span>}
          {description && <span className="text-sm text-muted-foreground mt-1">{description}</span>}
        </Flex>
      )}
      <Flex direction="column" gap={gap}>
        {children}
      </Flex>
    </Flex>
  ),
)

FieldGroupSection.displayName = 'FieldGroup.Section'

// ============================================================================
// FieldGroup.Row - For side-labels layout
// ============================================================================

export interface FieldGroupRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Row label */
  label?: string
  /** Row description */
  description?: string
  /** Gap between fields in the row */
  gap?: Spacing
}

// Gap mapping for row content
const rowGapClasses: Record<Spacing, string> = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '7': 'gap-7',
  '8': 'gap-8',
  '9': 'gap-9',
}

const FieldGroupRow = React.forwardRef<HTMLDivElement, FieldGroupRowProps>(
  ({ label, description, gap = '4', className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-x-8 items-start', className)}
      {...props}
    >
      {/* Label column */}
      <div className="flex flex-col">
        {label && <span className="text-sm font-medium text-foreground">{label}</span>}
        {description && <span className="text-sm text-muted-foreground mt-1">{description}</span>}
      </div>
      {/* Content column */}
      <div className={cn('flex flex-col', rowGapClasses[gap])}>{children}</div>
    </div>
  ),
)

FieldGroupRow.displayName = 'FieldGroup.Row'

// ============================================================================
// Compound Export
// ============================================================================

/** FieldGroup export. */
export const FieldGroup = Object.assign(FieldGroupRoot, {
  Section: FieldGroupSection,
  Row: FieldGroupRow,
})
