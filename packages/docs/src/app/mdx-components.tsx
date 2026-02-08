'use client'

import { Badge, Callout, Code, Heading, Text } from '@bwalkt/ui'
import Link from 'next/link'
import type * as React from 'react'

function mergeClassName(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base
}

type MDXComponents = Record<string, React.ComponentType<any>>

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: props => <Heading as="h1" size="6" {...props} />,
    h2: props => <Heading as="h2" size="4" className="mt-10" {...props} />,
    h3: props => <Heading as="h3" size="3" className="mt-6" {...props} />,
    p: props => <Text size="2" className="mt-3 text-muted-foreground" {...props} />,
    a: props => <Link {...props} className={mergeClassName('text-primary hover:underline', props.className)} />,
    code: props => <Code {...props} />,
    pre: props => (
      <pre
        {...props}
        className={mergeClassName(
          'mt-4 overflow-x-auto rounded-xl border border-border/70 bg-muted/40 p-4 text-sm',
          props.className,
        )}
      />
    ),
    Callout: Callout.Root,
    Badge,
    ...components,
  }
}
