'use client'

import { Heading, Text } from '@bwalkt/ui'

export default function HeadingPage() {
  return (
    <div className="docs-prose">
      <Heading as="h1" size="6">
        Heading
      </Heading>
      <Text size="2" className="mt-3 text-muted-foreground">
        Display and section headings. Pair with Text to build clear typographic hierarchy.
      </Text>

      <div className="mt-8 space-y-4">
        <Heading as="h2" size="8">
          Heading size 8
        </Heading>
        <Heading as="h3" size="6">
          Heading size 6
        </Heading>
        <Heading as="h4" size="4">
          Heading size 4
        </Heading>
      </div>
    </div>
  )
}
