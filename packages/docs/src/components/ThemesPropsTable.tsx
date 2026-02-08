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
    <Box my="5">
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell style={{ width: '37%' }}>Prop</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Default</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item, index) => (
            <Table.Row key={`${item.name}-${index}`} style={{ whiteSpace: 'nowrap' }}>
              <Table.RowHeaderCell>
                <Code size="2">
                  {item.name}
                  {item.required ? '*' : null}
                </Code>
              </Table.RowHeaderCell>
              <Table.Cell>
                <Code size="2" color="gray">
                  {item.typeSimple}
                </Code>
              </Table.Cell>
              <Table.Cell>
                {item.default !== undefined ? (
                  <Code size="2" color="gray">
                    {String(item.default)}
                  </Code>
                ) : (
                  <Text size="2" color="gray">
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
