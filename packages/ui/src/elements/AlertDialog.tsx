'use client'

import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'
import * as React from 'react'
import { cn } from '@/lib/utils'

// ============================================================================
// Root
// ============================================================================

export interface AlertDialogRootProps {
  /** Whether the dialog is open */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Default open state */
  defaultOpen?: boolean
  /** Children elements */
  children: React.ReactNode
}

const AlertDialogRoot: React.FC<AlertDialogRootProps> = ({ open, onOpenChange, defaultOpen, children }) => {
  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
      {children}
    </AlertDialogPrimitive.Root>
  )
}

AlertDialogRoot.displayName = 'AlertDialog.Root'

// ============================================================================
// Trigger
// ============================================================================

export interface AlertDialogTriggerProps {
  /** Trigger content */
  children: React.ReactNode
  /** Additional class names */
  className?: string
}

const AlertDialogTrigger = React.forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Trigger ref={ref} className={cn('outline-none', className)} {...props}>
        {children}
      </AlertDialogPrimitive.Trigger>
    )
  },
)

AlertDialogTrigger.displayName = 'AlertDialog.Trigger'

// ============================================================================
// Content
// ============================================================================

type MaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const maxWidthStyles: Record<MaxWidth, string> = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}

export interface AlertDialogContentProps {
  /** Maximum width of the dialog */
  maxWidth?: MaxWidth
  /** Additional class names */
  className?: string
  /** Dialog content */
  children: React.ReactNode
}

const AlertDialogContent = React.forwardRef<HTMLDivElement, AlertDialogContentProps>(
  ({ maxWidth = 'md', className, children, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Backdrop
          className={cn(
            'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          )}
        />
        <AlertDialogPrimitive.Popup
          ref={ref}
          className={cn(
            'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
            'w-full rounded-lg border bg-background p-6 shadow-lg',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            maxWidthStyles[maxWidth],
            className,
          )}
          {...props}
        >
          {children}
        </AlertDialogPrimitive.Popup>
      </AlertDialogPrimitive.Portal>
    )
  },
)

AlertDialogContent.displayName = 'AlertDialog.Content'

// ============================================================================
// Title
// ============================================================================

export interface AlertDialogTitleProps {
  /** Additional class names */
  className?: string
  /** Title content */
  children: React.ReactNode
}

const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Title
        ref={ref}
        className={cn('text-lg font-semibold text-foreground', className)}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Title>
    )
  },
)

AlertDialogTitle.displayName = 'AlertDialog.Title'

// ============================================================================
// Description
// ============================================================================

export interface AlertDialogDescriptionProps {
  /** Additional class names */
  className?: string
  /** Description content */
  children: React.ReactNode
}

const AlertDialogDescription = React.forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Description
        ref={ref}
        className={cn('mt-2 text-sm text-muted-foreground', className)}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Description>
    )
  },
)

AlertDialogDescription.displayName = 'AlertDialog.Description'

// ============================================================================
// Action (Confirm button)
// ============================================================================

export interface AlertDialogActionProps {
  /** Additional class names */
  className?: string
  /** Action button content */
  children: React.ReactNode
}

const AlertDialogAction = React.forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Close
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium',
          'bg-primary text-primary-foreground hover:bg-primary/90',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'transition-colors',
          className,
        )}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Close>
    )
  },
)

AlertDialogAction.displayName = 'AlertDialog.Action'

// ============================================================================
// Cancel
// ============================================================================

export interface AlertDialogCancelProps {
  /** Additional class names */
  className?: string
  /** Cancel button content */
  children: React.ReactNode
}

const AlertDialogCancel = React.forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Close
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'transition-colors',
          className,
        )}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Close>
    )
  },
)

AlertDialogCancel.displayName = 'AlertDialog.Cancel'

// ============================================================================
// Export compound component
// ============================================================================

export const AlertDialog = {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
}
