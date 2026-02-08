'use client'

import { Callout, Heading, Text } from '@bwalkt/ui'
import { TokenGrid } from '../../../components/TokenGrid'

export default function TokensPage() {
  return (
    <div className="docs-prose">
      <Heading as="h1" size="6">
        Tokens
      </Heading>
      <Text size="2" className="mt-3 text-muted-foreground">
        Tokens are semantic values that describe the intent of a surface or control rather than the raw color or spacing
        value. The system exposes a compact set of tokens so theme changes are easy to reason about.
      </Text>

      <Callout.Root variant="surface" color="info" className="mt-4">
        <Callout.Text>
          Tokens are mapped to CSS variables. You can override them per page or per component tree.
        </Callout.Text>
      </Callout.Root>

      <Heading as="h2" size="4" className="mt-10">
        Core color tokens
      </Heading>
      <TokenGrid />

      <Heading as="h2" size="4" className="mt-10">
        Usage
      </Heading>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border/70 bg-muted/40 p-4 text-sm">
        <code>{`import { designTokens } from '@bwalkt/ui'\n\nconst accent = designTokens.color.accent\n`}</code>
      </pre>
    </div>
  )
}
