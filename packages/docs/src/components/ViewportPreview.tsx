'use client'

import { SegmentedControl } from '@bwalkt/ui'
import * as React from 'react'

type Preset = 'desktop' | 'tablet' | 'phone'

const presetWidths: Record<Preset, number> = {
  desktop: 1200,
  tablet: 900,
  phone: 375,
}

export function ViewportPreview({ children }: { children: React.ReactNode }) {
  const [preset, setPreset] = React.useState<Preset>('desktop')

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">Preview width</div>
        <SegmentedControl.Root value={preset} onValueChange={value => setPreset(value as Preset)}>
          <SegmentedControl.Item value="desktop">Desktop</SegmentedControl.Item>
          <SegmentedControl.Item value="tablet">Tablet</SegmentedControl.Item>
          <SegmentedControl.Item value="phone">Phone</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>
      <div className="viewport-preview mx-auto" data-viewport={preset} style={{ maxWidth: presetWidths[preset] }}>
        {children}
      </div>
    </div>
  )
}
