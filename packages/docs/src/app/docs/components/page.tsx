'use client'

import { Button, Card, Heading, Label, SegmentedControl, Select, SelectItem, Text, TextField } from '@bwalkt/ui'
import * as React from 'react'

type ViewportPreset = 'desktop' | 'tablet' | 'phone'

const viewportWidths: Record<ViewportPreset, number> = {
  desktop: 1200,
  tablet: 900,
  phone: 375,
}

export default function ComponentsPage() {
  const [viewport, setViewport] = React.useState<ViewportPreset>('desktop')
  const previewWidth = viewportWidths[viewport]

  return (
    <div className="docs-prose">
      <Heading as="h1" size="6">
        Components
      </Heading>
      <Text size="2" className="mt-3 text-muted-foreground">
        The component layer is designed to be composed. Layout primitives, typography, and form controls share the same
        sizing and spacing decisions.
      </Text>

      <Heading as="h2" size="4" className="mt-10">
        Example stack
      </Heading>

      <div className="mt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Text size="2" className="text-muted-foreground">
            Preview width
          </Text>
          <SegmentedControl.Root value={viewport} onValueChange={value => setViewport(value as ViewportPreset)}>
            <SegmentedControl.Item value="desktop">Desktop</SegmentedControl.Item>
            <SegmentedControl.Item value="tablet">Tablet</SegmentedControl.Item>
            <SegmentedControl.Item value="phone">Phone</SegmentedControl.Item>
          </SegmentedControl.Root>
        </div>

        <div className="mt-4 w-full overflow-hidden rounded-2xl border border-border/70 bg-muted/20 p-4">
          <div className="mx-auto w-full" style={{ maxWidth: previewWidth }}>
            <Card.Root className="space-y-4 p-6">
              <TextField label="Workspace name" placeholder="Acme Operations" />
              <div className="space-y-2">
                <Label>Region</Label>
                <Select placeholder="Select a region">
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="eu">Europe</SelectItem>
                  <SelectItem value="apac">Asia Pacific</SelectItem>
                </Select>
              </div>
              <Button size="3">Create workspace</Button>
            </Card.Root>
          </div>
        </div>
      </div>

      <Heading as="h2" size="4" className="mt-10">
        Patterns
      </Heading>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
        <li>
          Use layout primitives (<code className="text-foreground">Container</code>,{' '}
          <code className="text-foreground">Section</code>, <code className="text-foreground">Grid</code>,{' '}
          <code className="text-foreground">Flex</code>) to control rhythm.
        </li>
        <li>
          Keep input sizing aligned by using shared <code className="text-foreground">size</code> props.
        </li>
        <li>Prefer composition over variants for new workflows.</li>
      </ul>
    </div>
  )
}
