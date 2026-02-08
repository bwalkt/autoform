'use client'

import * as React from 'react'
import { Slot } from '@/layouts/layout-utils'
import { cn } from '@/lib/utils'
import type { Responsive } from './tokens'

// Size configurations for padding
// TODO: Consolidate component-specific size tokens with global design token types.
type CardSize = '1' | '2' | '3' | '4' | '5'

const cardSizes: Record<CardSize, string> = {
  '1': 'p-2',
  '2': 'p-3',
  '3': 'p-4',
  '4': 'p-6',
  '5': 'p-8',
}

// Variant styles
type CardVariant = 'surface' | 'classic' | 'ghost'

export interface CardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size (padding) */
  size?: Responsive<CardSize>
  /** Visual variant */
  variant?: CardVariant
  /** As child element */
  asChild?: boolean
}

/** CardRoot export. */
export const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(
  ({ size = '1', variant = 'surface', asChild = false, className, children, ...props }, ref) => {
    const resolvedSize = typeof size === 'string' ? size : size.initial || '1'
    const Comp = asChild ? Slot : 'div'

    return (
      <Comp
        ref={ref}
        className={cn(
          'rounded-lg',
          cardSizes[resolvedSize],

          // Variant styles
          variant === 'surface' && 'bg-card border shadow-sm',
          variant === 'classic' && 'bg-card border shadow-md',
          variant === 'ghost' && 'bg-transparent',

          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)

CardRoot.displayName = 'Card.Root'

// ============================================================================
// Card Header
// ============================================================================

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/** CardHeader export. */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col space-y-1.5', className)} {...props}>
        {children}
      </div>
    )
  },
)

CardHeader.displayName = 'Card.Header'

// ============================================================================
// Card Title
// ============================================================================

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** As child element */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/** CardTitle export. */
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Comp = 'h3', className, children, ...props }, ref) => {
    return (
      <Comp ref={ref} className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props}>
        {children}
      </Comp>
    )
  },
)

CardTitle.displayName = 'Card.Title'

// ============================================================================
// Card Description
// ============================================================================

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/** CardDescription export. */
export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props}>
        {children}
      </p>
    )
  },
)

CardDescription.displayName = 'Card.Description'

// ============================================================================
// Card Content
// ============================================================================

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** CardContent export. */
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('pt-4', className)} {...props}>
        {children}
      </div>
    )
  },
)

CardContent.displayName = 'Card.Content'

// ============================================================================
// Card Footer
// ============================================================================

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** CardFooter export. */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-center pt-4', className)} {...props}>
        {children}
      </div>
    )
  },
)

CardFooter.displayName = 'Card.Footer'

// ============================================================================
// Export compound component
// ============================================================================

/** Card export. */
export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
}

export namespace CardProps {
  export type Root = CardRootProps
  export type Header = CardHeaderProps
  export type Title = CardTitleProps
  export type Description = CardDescriptionProps
  export type Content = CardContentProps
  export type Footer = CardFooterProps
}
