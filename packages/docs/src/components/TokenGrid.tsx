import { Heading, Text } from '@bwalkt/ui'

const colorTokens = [
  { name: 'background', value: 'var(--background)' },
  { name: 'foreground', value: 'var(--foreground)' },
  { name: 'primary', value: 'var(--primary)' },
  { name: 'muted', value: 'var(--muted)' },
  { name: 'border', value: 'var(--border)' },
  { name: 'accent', value: 'var(--accent)' },
]

export function TokenGrid() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {colorTokens.map(token => (
        <div key={token.name} className="rounded-xl border border-border/70 bg-background p-4">
          <div className="flex items-center justify-between">
            <Heading as="h4" size="2">
              {token.name}
            </Heading>
            <div className="h-8 w-8 rounded-full border" style={{ backgroundColor: `var(--${token.name})` }} />
          </div>
          <Text size="1" className="mt-2 text-muted-foreground">
            {token.value}
          </Text>
        </div>
      ))}
    </div>
  )
}
