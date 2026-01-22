'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

// Common aspect ratios
type Ratio = '1/1' | '4/3' | '16/9' | '21/9' | '3/4' | '9/16' | '3/2' | '2/3'

const ratioStyles: Record<Ratio, string> = {
  '1/1': 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '16/9': 'aspect-video',
  '21/9': 'aspect-[21/9]',
  '3/4': 'aspect-[3/4]',
  '9/16': 'aspect-[9/16]',
  '3/2': 'aspect-[3/2]',
  '2/3': 'aspect-[2/3]',
}

export interface AspectRatioProps {
  /** Predefined aspect ratio */
  ratio?: Ratio
  /** Custom aspect ratio as number (width/height) */
  customRatio?: number
  /** Additional class names */
  className?: string
  /** Content to display */
  children?: React.ReactNode
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = '16/9', customRatio, className, children, ...props }, ref) => {
    const style = customRatio ? { aspectRatio: customRatio } : undefined

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden', !customRatio && ratioStyles[ratio], className)}
        style={style}
        {...props}
      >
        {children}
      </div>
    )
  },
)

AspectRatio.displayName = 'AspectRatio'

export { AspectRatio }
