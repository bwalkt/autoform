'use client'

import { SegmentedControl } from '@bwalkt/ui'
import * as React from 'react'
import type { ViewportPreset } from '../lib/viewport'

const isViewportPreset = (value: string): value is ViewportPreset =>
  value === 'desktop' || value === 'tablet' || value === 'phone'

export function ViewportPreview({ children }: { children: React.ReactNode }) {
  const [preset, setPreset] = React.useState<ViewportPreset>('desktop')

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">Preview width</div>
        <SegmentedControl.Root
          value={preset}
          onValueChange={value => {
            if (isViewportPreset(value)) setPreset(value)
          }}
        >
          <SegmentedControl.Item value="desktop">Desktop</SegmentedControl.Item>
          <SegmentedControl.Item value="tablet">Tablet</SegmentedControl.Item>
          <SegmentedControl.Item value="phone">Phone</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>
      <div className="viewport-preview mx-auto" data-viewport={preset}>
        {children}
      </div>
    </div>
  )
}
