'use client'

import { Box, Code, Table, Text } from '@bwalkt/ui'
import type { PropDef } from '../lib/props'
import { gridPropDefs, layoutPropDefs } from '../lib/props'

const definitions: Record<string, PropDef[]> = {
  gridPropDefs,
  layoutPropDefs,
}

export function ThemesPropsTable({ defs }: { defs: keyof typeof definitions }) {
  const data = definitions[defs] ?? []

  return (
    <Box my="5" className="docs-props-table">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Prop</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Default</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(item => (
            <Table.Row key={item.name} className="docs-props-row">
              <Table.RowHeaderCell>
                <Code size="2" className="docs-props-chip docs-props-chip-prop">
                  {item.name}
                  {item.required ? '*' : null}
                </Code>
              </Table.RowHeaderCell>
              <Table.Cell>
                <Code size="2" className="docs-props-chip docs-props-chip-type">
                  {item.typeSimple}
                </Code>
              </Table.Cell>
              <Table.Cell>
                {item.default !== undefined ? (
                  <Code size="2" className="docs-props-chip docs-props-chip-default">
                    {String(item.default)}
                  </Code>
                ) : (
                  <Text size="2" className="docs-props-empty">
                    —
                  </Text>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
