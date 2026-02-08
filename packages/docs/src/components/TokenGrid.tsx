import { Heading, Text } from '@bwalkt/ui'

const colorTokens = ['background', 'foreground', 'primary', 'muted', 'border', 'accent']

export function TokenGrid() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {colorTokens.map(name => (
        <div key={name} className="rounded-xl border border-border/70 bg-background p-4">
          <div className="flex items-center justify-between">
            <Heading as="h4" size="2">
              {name}
            </Heading>
            <div className="h-8 w-8 rounded-full border" style={{ backgroundColor: `var(--${name})` }} />
          </div>
          <Text size="1" className="mt-2 text-muted-foreground">
            {`var(--${name})`}
          </Text>
        </div>
      ))}
    </div>
  )
}
