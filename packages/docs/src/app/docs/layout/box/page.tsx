'use client'

import { Box, Heading, Text } from '@bwalkt/ui'

export default function BoxPage() {
  return (
    <div className="docs-prose">
      <Heading as="h1" size="6">
        Box
      </Heading>
      <Text size="2" className="mt-3 text-muted-foreground">
        Fundamental layout building block. Use it to apply spacing, display, and sizing props without leaving the
        component API.
      </Text>

      <Box className="mt-8 rounded-2xl border border-border/70 bg-muted/30 p-6">
        <Box className="rounded-xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground">
          Box content
        </Box>
      </Box>
    </div>
  )
}
