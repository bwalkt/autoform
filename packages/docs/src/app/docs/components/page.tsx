'use client'

import { Button, Card, Heading, Select, SelectItem, Text, TextField } from '@bwalkt/ui'

export default function ComponentsPage() {
  return (
    <div className="docs-prose">
      <Heading as="h1" size="6">
        Components
      </Heading>
      <Text size="2" className="mt-3 text-muted-foreground">
        The component layer is designed to be composed. Layout primitives, typography, and form controls share the same
        sizing and spacing decisions.
      </Text>

      <Heading as="h2" size="4" className="mt-10">
        Example stack
      </Heading>

      <Card.Root className="mt-4 space-y-4 p-6">
        <TextField label="Workspace name" placeholder="Acme Operations" />
        <Select label="Region" placeholder="Select a region">
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="eu">Europe</SelectItem>
          <SelectItem value="apac">Asia Pacific</SelectItem>
        </Select>
        <Button size="3">Create workspace</Button>
      </Card.Root>

      <Heading as="h2" size="4" className="mt-10">
        Patterns
      </Heading>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
        <li>Use layout primitives (`Container`, `Section`, `Grid`, `Flex`) to control rhythm.</li>
        <li>Keep input sizing aligned by using shared `size` props.</li>
        <li>Prefer composition over variants for new workflows.</li>
      </ul>
    </div>
  )
}
