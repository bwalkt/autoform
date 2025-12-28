import * as React from 'react';
import { cn } from '../lib/utils';
import { getElementStyles } from './utils';
import { type Size, type Variant, type Color, type Radius, type ResponsiveSize } from './tokens';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: ResponsiveSize;
  variant?: Variant;
  color?: Color;
  radius?: Radius;
  error?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    size = '2',
    variant = 'surface',
    color,
    radius = 'medium',
    error = false,
    resize = 'vertical',
    className,
    style,
    disabled,
    ...props
  }, ref) => {
    const resolvedSize = typeof size === 'string' ? size : size.initial || '2';
    const elementStyles = getElementStyles(resolvedSize, variant, color, radius);

    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full outline-none transition-all duration-150 ease-in-out',
          'min-h-[calc(var(--element-height)*2)]',
          'px-[var(--element-padding-x)] py-[var(--element-padding-y)]',
          'text-[var(--element-font-size)] leading-[var(--element-line-height)]',
          'rounded-[var(--element-border-radius)]',
          'text-[var(--color-text)]',
          
          // Resize behavior
          resize === 'none' && 'resize-none',
          resize === 'vertical' && 'resize-y',
          resize === 'horizontal' && 'resize-x',
          resize === 'both' && 'resize',
          
          // Variant-specific styles
          variant === 'classic' && [
            'border border-[var(--color-border)]',
            'bg-[var(--color-background)]',
            'focus:border-[var(--color-primary)]',
            'focus:ring-2 focus:ring-[var(--color-primary-alpha)]',
          ],
          variant === 'surface' && [
            'border border-[var(--color-border-subtle)]',
            'bg-[var(--color-surface)]',
            'focus:border-[var(--color-primary)]',
            'focus:ring-2 focus:ring-[var(--color-primary-alpha)]',
          ],
          variant === 'soft' && [
            'border-0',
            'bg-[var(--color-soft-background)]',
            'hover:bg-[var(--color-soft-background-hover)]',
            'focus:bg-[var(--color-soft-background-hover)]',
          ],
          
          // Error state
          error && [
            'border-red-500 focus:border-red-500',
            variant === 'soft' && 'bg-red-50',
          ],
          
          // Disabled state
          disabled && [
            'opacity-50 cursor-not-allowed',
            'hover:bg-[var(--color-background)]',
          ],
          
          className
        )}
        style={{ ...elementStyles, ...style }}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';