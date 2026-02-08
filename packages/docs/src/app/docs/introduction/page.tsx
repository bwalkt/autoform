'use client'

import { Badge, Button, CalloutRoot, CalloutText, Card, Heading, Text } from '@bwalkt/ui'
import Link from 'next/link'

export default function IntroductionPage() {
  return (
    <div className="docs-prose">
      <Heading as="h1" size="6">
        Introduction
      </Heading>
      <Text size="2" className="mt-3 text-muted-foreground">
        Autoform UI is a composable, token-first component library built on Base UI. It is optimized for product teams
        building dense workflows where clarity matters more than decoration.
      </Text>

      <CalloutRoot variant="surface" color="info" className="mt-4">
        <CalloutText>
          Start with tokens and layout primitives. The rest of the system builds on the same semantic vocabulary.
        </CalloutText>
      </CalloutRoot>

      <Heading as="h2" size="4" className="mt-10">
        What you get
      </Heading>

      <Card.Root className="mt-4 p-6">
        <Heading as="h3" size="3">
          Token-aware components
        </Heading>
        <Text size="2" className="mt-2 text-muted-foreground">
          Every component consumes the design tokens so theming is additive, not a rewrite.
        </Text>
      </Card.Root>

      <Card.Root className="mt-4 p-6">
        <Heading as="h3" size="3">
          Composable building blocks
        </Heading>
        <Text size="2" className="mt-2 text-muted-foreground">
          Mix layout primitives, typography, and form elements without losing consistency.
        </Text>
      </Card.Root>

      <Heading as="h2" size="4" className="mt-10">
        Quick start
      </Heading>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border/70 bg-muted/40 p-4 text-sm">
        <code>{`pnpm add @bwalkt/ui\n`}</code>
      </pre>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border/70 bg-muted/40 p-4 text-sm">
        <code>{`import { Theme, Button } from '@bwalkt/ui'\n\nexport default function Example() {\n  return (\n    <Theme accentColor="sky">\n      <Button size="3">Create</Button>\n    </Theme>\n  )\n}\n`}</code>
      </pre>

      <div className="mt-6 flex items-center gap-3">
        <Badge size="1" variant="soft">
          Next step
        </Badge>
        <Button asChild size="2">
          <Link href="/docs/tokens">Review design tokens</Link>
        </Button>
      </div>
    </div>
  )
}
