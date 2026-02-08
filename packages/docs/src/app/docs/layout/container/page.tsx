'use client'

import { Container, Heading, Text } from '@bwalkt/ui'

export default function ContainerPage() {
  return (
    <div className="docs-prose">
      <Heading as="h1" size="6">
        Container
      </Heading>
      <Text size="2" className="mt-3 text-muted-foreground">
        Centered content width with responsive padding. Useful for page-level shells and consistent gutters.
      </Text>

      <Container className="mt-8 rounded-2xl border border-dashed border-border/70 bg-muted/30 p-6 text-sm text-muted-foreground">
        Container content
      </Container>
    </div>
  )
}
