import { Badge, Button, Heading } from '@bwalkt/ui'
import Link from 'next/link'

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <span className="text-sm font-semibold">AF</span>
          </div>
          <div>
            <Heading as="span" size="3" className="block">
              Autoform UI
            </Heading>
            <span className="text-xs text-muted-foreground">Docs</span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Badge size="1" variant="soft">
            Base UI
          </Badge>
          <Button size="2" variant="soft" asChild>
            <Link href="/docs/introduction">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
