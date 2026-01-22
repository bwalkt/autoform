'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Size } from './tokens'

// Size configurations
const datalistSizes = {
  '1': {
    root: 'text-xs gap-2',
    label: 'min-w-[80px]',
    value: '',
  },
  '2': {
    root: 'text-sm gap-3',
    label: 'min-w-[100px]',
    value: '',
  },
  '3': {
    root: 'text-sm gap-4',
    label: 'min-w-[120px]',
    value: '',
  },
  '4': {
    root: 'text-base gap-5',
    label: 'min-w-[140px]',
    value: '',
  },
}

// Orientation styles
type Orientation = 'horizontal' | 'vertical'

// Context for sharing props
interface DataListContextValue {
  size: Size
  orientation: Orientation
}

const DataListContext = React.createContext<DataListContextValue>({
  size: '2',
  orientation: 'horizontal',
})

// ============================================================================
// Root
// ============================================================================

export interface DataListRootProps extends React.HTMLAttributes<HTMLDListElement> {
  /** Size of the data list */
  size?: Size
  /** Orientation of items */
  orientation?: Orientation
}

const DataListRoot = React.forwardRef<HTMLDListElement, DataListRootProps>(
  ({ size = '2', orientation = 'horizontal', className, children, ...props }, ref) => {
    return (
      <DataListContext.Provider value={{ size, orientation }}>
        <dl ref={ref} className={cn('grid', datalistSizes[size].root, className)} {...props}>
          {children}
        </dl>
      </DataListContext.Provider>
    )
  },
)

DataListRoot.displayName = 'DataList.Root'

// ============================================================================
// Item
// ============================================================================

export interface DataListItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const DataListItem = React.forwardRef<HTMLDivElement, DataListItemProps>(({ className, children, ...props }, ref) => {
  const { orientation } = React.useContext(DataListContext)

  return (
    <div
      ref={ref}
      className={cn(
        'grid',
        orientation === 'horizontal' && 'grid-cols-[auto_1fr] items-baseline gap-4',
        orientation === 'vertical' && 'grid-cols-1 gap-1',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})

DataListItem.displayName = 'DataList.Item'

// ============================================================================
// Label
// ============================================================================

export interface DataListLabelProps extends React.HTMLAttributes<HTMLElement> {
  /** Width of the label column */
  width?: string
}

const DataListLabel = React.forwardRef<HTMLElement, DataListLabelProps>(
  ({ width, className, children, ...props }, ref) => {
    const { size } = React.useContext(DataListContext)
    const sizeConfig = datalistSizes[size]

    return (
      <dt
        ref={ref}
        className={cn('text-muted-foreground font-medium', sizeConfig.label, className)}
        style={width ? { minWidth: width } : undefined}
        {...props}
      >
        {children}
      </dt>
    )
  },
)

DataListLabel.displayName = 'DataList.Label'

// ============================================================================
// Value
// ============================================================================

export interface DataListValueProps extends React.HTMLAttributes<HTMLElement> {}

const DataListValue = React.forwardRef<HTMLElement, DataListValueProps>(({ className, children, ...props }, ref) => {
  return (
    <dd ref={ref} className={cn('text-foreground', className)} {...props}>
      {children}
    </dd>
  )
})

DataListValue.displayName = 'DataList.Value'

// ============================================================================
// Export compound component
// ============================================================================

export const DataList = {
  Root: DataListRoot,
  Item: DataListItem,
  Label: DataListLabel,
  Value: DataListValue,
}
