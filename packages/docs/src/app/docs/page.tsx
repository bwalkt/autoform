import { Heading, Text } from '@bwalkt/ui'
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

      <div className="mt-10 grid gap-8">
        {docSections.map(section => (
          <section key={section.title}>
            <Heading as="h2" size="4">
              {section.title}
            </Heading>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
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
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
