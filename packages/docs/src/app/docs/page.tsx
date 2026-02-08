import { Grid, Heading, Text } from '@bwalkt/ui'
import Link from 'next/link'
import { docSections } from '../../lib/docs'

export default function DocsIndexPage() {
  return (
    <div className="docs-prose">
      <Heading as="h1" size="6">
        Documentation
      </Heading>
      <Text size="3" className="mt-2 text-muted-foreground">
        Start with the design principles, then dive into tokens and components.
      </Text>

      <Grid gap="8" className="mt-10">
        {docSections.map(section => (
          <section key={section.title}>
            <Heading as="h2" size="4">
              {section.title}
            </Heading>
            <Grid columns={{ initial: '1', md: '2' }} gap="4" className="mt-4">
              {section.items.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-border/70 p-4 transition hover:border-primary/50 hover:shadow-sm"
                >
                  <Heading as="h3" size="3">
                    {item.title}
                  </Heading>
                  {item.description ? (
                    <Text size="2" className="mt-2 text-muted-foreground">
                      {item.description}
                    </Text>
                  ) : null}
                </Link>
              ))}
            </Grid>
          </section>
        ))}
      </Grid>
    </div>
  )
}
