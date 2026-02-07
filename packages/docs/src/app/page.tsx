import { Badge, Button, Card, Heading, Text } from '@bwalkt/ui'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

const quickLinks = [
  {
    title: 'Introduction',
    description: 'What Autoform UI is and the design philosophy behind it.',
    href: '/docs/introduction',
  },
  {
    title: 'Design Tokens',
    description: 'Semantic tokens, scales, and how to extend them.',
    href: '/docs/tokens',
  },
  {
    title: 'Components',
    description: 'Composable building blocks, props, and usage patterns.',
    href: '/docs/components',
  },
  {
    title: 'Theming',
    description: 'Theme primitives, appearance, and how to ship variants.',
    href: '/docs/theming',
  },
]

export default function HomePage() {
  return (
    <main className="docs-grid min-h-screen px-6 pb-20 pt-14">
      <section className="mx-auto w-full max-w-6xl">
        <div className="docs-surface rounded-[28px] px-10 py-12">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Badge size="1" variant="soft">
              Documentation
            </Badge>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Built on Base UI + design tokens
            </div>
          </div>
          <Heading as="h1" size="9" className="docs-hero-title mt-6 text-balance">
            Autoform UI is a token-first component system for expressive product UI.
          </Heading>
          <Text size="4" className="mt-4 max-w-2xl text-muted-foreground">
            Use a cohesive set of primitives, typography, layout, and form controls to build high-density workflows
            without losing visual clarity.
          </Text>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="3" asChild>
              <Link href="/docs/introduction">
                Read the docs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="soft" size="3" asChild>
              <Link href="/docs/components">Browse components</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-6xl">
        <div className="grid gap-4 md:grid-cols-2">
          {quickLinks.map(link => (
            <Card key={link.href} className="p-6">
              <Heading as="h3" size="4">
                {link.title}
              </Heading>
              <Text size="2" className="mt-2 text-muted-foreground">
                {link.description}
              </Text>
              <Link href={link.href} className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                Explore
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
