import { Badge, Button, CardRoot, Container, Flex, Grid, Heading, Text } from '@bwalkt/ui'
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
    <main className="docs-grid min-h-screen pb-20 pt-14">
      <section>
        <Container size="4" px="6">
          <div className="docs-surface rounded-[28px] px-10 py-12">
            <Flex align="center" gap="3" className="text-sm text-muted-foreground">
              <Badge size="1" variant="soft">
                Documentation
              </Badge>
              <Flex align="center" gap="2">
                <Sparkles className="h-4 w-4 text-primary" />
                Built on Base UI + design tokens
              </Flex>
            </Flex>
            <Heading as="h1" size="9" className="docs-hero-title mt-6 text-balance">
              Autoform UI is a token-first component system for expressive product UI.
            </Heading>
            <Text size="4" className="mt-4 max-w-2xl text-muted-foreground">
              Use a cohesive set of primitives, typography, layout, and form controls to build high-density workflows
              without losing visual clarity.
            </Text>
            <Flex wrap="wrap" gap="4" className="mt-8">
              <Button size="3" asChild>
                <Link href="/docs/introduction">
                  Read the docs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="soft" size="3" asChild>
                <Link href="/docs/components">Browse components</Link>
              </Button>
            </Flex>
          </div>
        </Container>
      </section>

      <section className="mt-14">
        <Container size="4" px="6">
          <Grid columns={{ initial: '1', md: '2' }} gap="4">
            {quickLinks.map(link => (
              <CardRoot key={link.href} className="p-6">
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
              </CardRoot>
            ))}
          </Grid>
        </Container>
      </section>
    </main>
  )
}
