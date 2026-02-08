'use client'

import { Heading, Text } from '@bwalkt/ui'

export default function TextPage() {
  return (
    <div className="docs-prose">
      <Heading as="h1" size="6">
        Text
      </Heading>
      <Text size="2" className="mt-3 text-muted-foreground">
        Body copy and supporting text. Use size scales to preserve vertical rhythm across layouts.
      </Text>

      <div className="mt-8 space-y-3">
        <Text size="1" className="text-muted-foreground">
          Text size 1 for captions or metadata.
        </Text>
        <Text size="2">Text size 2 for standard body copy.</Text>
        <Text size="3" className="font-medium">
          Text size 3 for emphasized content.
        </Text>
      </div>
    </div>
  )
}
