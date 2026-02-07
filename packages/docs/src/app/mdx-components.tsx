import { Badge, Callout, Code, Heading, Text } from '@bwalkt/ui'

;('use client')

import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: props => <Heading as="h1" size="6" {...props} />,
    h2: props => <Heading as="h2" size="4" className="mt-10" {...props} />,
    h3: props => <Heading as="h3" size="3" className="mt-6" {...props} />,
    p: props => <Text size="2" className="mt-3 text-muted-foreground" {...props} />,
    a: props => <Link {...props} className="text-primary hover:underline" />,
    code: props => <Code {...props} />,
    pre: props => (
      <pre {...props} className="mt-4 overflow-x-auto rounded-xl border border-border/70 bg-muted/40 p-4 text-sm" />
    ),
    Callout,
    Badge,
    ...components,
  }
}
