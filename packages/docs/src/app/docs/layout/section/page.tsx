'use client'

import { Heading, Section, Text } from '@bwalkt/ui'

export default function SectionPage() {
  return (
    <div className="docs-prose">
      <Heading as="h1" size="6">
        Section
      </Heading>
      <Text size="2" className="mt-3 text-muted-foreground">
        Vertical spacing wrapper for page sections. Use it to keep stacked content consistent.
      </Text>

      <Section className="mt-8 rounded-2xl border border-border/70 bg-muted/30 p-6">
        <div className="rounded-xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground">
          Section content
        </div>
      </Section>
    </div>
  )
}
