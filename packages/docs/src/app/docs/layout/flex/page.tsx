'use client'

import { Flex, Heading, Text } from '@bwalkt/ui'

export default function FlexPage() {
  return (
    <div className="docs-prose">
      <Heading as="h1" size="6">
        Flex
      </Heading>
      <Text size="2" className="mt-3 text-muted-foreground">
        Flexbox primitives for alignment and spacing. Compose rows or columns with shared gap controls.
      </Text>

      <Flex gap="4" className="mt-8">
        <Flex className="h-20 w-20 items-center justify-center rounded-2xl border border-border/70 bg-muted/40 text-xs text-muted-foreground">
          Item 1
        </Flex>
        <Flex className="h-20 w-20 items-center justify-center rounded-2xl border border-border/70 bg-muted/40 text-xs text-muted-foreground">
          Item 2
        </Flex>
        <Flex className="h-20 w-20 items-center justify-center rounded-2xl border border-border/70 bg-muted/40 text-xs text-muted-foreground">
          Item 3
        </Flex>
      </Flex>
    </div>
  )
}
