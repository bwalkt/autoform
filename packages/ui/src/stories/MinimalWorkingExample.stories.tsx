import { AjvProvider } from '@bwalkt/ajv'
import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { AutoForm } from '@bwalkt/shadcn/components/ui/autoform'

const meta: Meta = {
  title: 'AJV/Working Example',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const BasicTest: Story = {
  render: () => {
    const [isReady, setIsReady] = React.useState(false)
    const [provider, setProvider] = React.useState<AjvProvider | null>(null)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
      try {
        console.log('Creating simple AJV provider...')

        const simpleSchema = {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              title: 'Your Name',
            },
          },
          required: ['name'],
        }

        const ajvProvider = new AjvProvider(simpleSchema)

        // Test that it works
        const parsed = ajvProvider.parseSchema()
        console.log('Schema parsed successfully:', parsed)

        setProvider(ajvProvider)
        setIsReady(true)
      } catch (err) {
        console.error('Error creating provider:', err)
        setError(err.message)
      }
    }, [])

    if (error) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="font-medium text-red-800">Error</h3>
          <p className="text-red-700">{error}</p>
        </div>
      )
    }

    if (!isReady || !provider) {
      return (
        <div className="p-4">
          <p>Loading...</p>
        </div>
      )
    }

    return (
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-medium">Minimal AJV AutoForm Test</h3>

        <div className="border rounded-lg p-4 bg-white">
          <AutoForm
            schema={provider}
            onSubmit={data => {
              console.log('Form submitted:', data)
              alert(`Hello ${data.name}!`)
            }}
            withSubmit={true}
          />
        </div>
      </div>
    )
  },
}
