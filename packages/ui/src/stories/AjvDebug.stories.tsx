import { AutoForm } from '@bwalkt/shadcn/components/ui/autoform'
import { Button } from '@bwalkt/shadcn/components/ui/button'
import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

const meta: Meta = {
  title: 'Debug/AJV Provider Debug',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const AjvProviderTest: Story = {
  render: () => {
    const [result, setResult] = React.useState<string>('Loading...')
    const [provider, setProvider] = React.useState<any>(null)

    React.useEffect(() => {
      async function testAjvProvider() {
        try {
          console.log('Starting AJV Provider test...')

          // Dynamic import to test
          const ajvModule = await import('@bwalkt/ajv')
          console.log('AJV Module imported:', ajvModule)

          const { AjvProvider } = ajvModule
          console.log('AjvProvider class:', AjvProvider)

          const schema = {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                title: 'Name',
              },
              email: {
                type: 'string',
                format: 'email',
                title: 'Email',
              },
            },
            required: ['name', 'email'],
          }

          console.log('Creating AjvProvider with schema:', schema)
          const ajvProvider = new AjvProvider(schema)
          console.log('AjvProvider instance:', ajvProvider)
          console.log('AjvProvider methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(ajvProvider)))

          // Test parseSchema method
          console.log('Testing parseSchema...')
          const parsed = ajvProvider.parseSchema()
          console.log('Parsed schema:', parsed)

          setProvider(ajvProvider)
          setResult(
            `✅ Success! AjvProvider created and parseSchema works. Found ${Object.keys(parsed.fields).length} field(s)`,
          )
        } catch (error) {
          console.error('Error testing AJV Provider:', error)
          setResult(`❌ Error: ${error instanceof Error ? error.message : String(error)}`)
        }
      }

      testAjvProvider()
    }, [])

    return (
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-medium mb-4">AJV Provider Debug Test</h3>

        <div className="p-4 bg-gray-100 rounded">
          <h4 className="font-medium mb-2">Test Result:</h4>
          <pre className="text-sm">{result}</pre>
        </div>

        {provider && (
          <div className="space-y-4">
            <h4 className="font-medium">Method Tests:</h4>
            <div className="border p-4 rounded space-y-2">
              <Button
                type="button"
                onClick={() => {
                  try {
                    console.log('Testing parseSchema method...')
                    const result = provider.parseSchema()
                    console.log('parseSchema result:', result)
                    alert(
                      `parseSchema success! Found ${Object.keys(result.fields || {}).length} fields. Check console for details.`,
                    )
                  } catch (error) {
                    console.error('parseSchema error:', error)
                    alert(`parseSchema error: ${error instanceof Error ? error.message : String(error)}`)
                  }
                }}
                className="bg-blue-500 text-white"
                size="sm"
              >
                Test parseSchema()
              </Button>

              <Button
                type="button"
                onClick={() => {
                  try {
                    console.log('Testing validateSchema method...')
                    const testData = {
                      name: 'test',
                      email: 'test@example.com',
                    }
                    const result = provider.validateSchema(testData)
                    console.log('validateSchema result:', result)
                    alert(`validateSchema success! Result: ${result.success}. Check console for details.`)
                  } catch (error) {
                    console.error('validateSchema error:', error)
                    alert(`validateSchema error: ${error instanceof Error ? error.message : String(error)}`)
                  }
                }}
                className="bg-green-500 text-white"
                size="sm"
              >
                Test validateSchema()
              </Button>

              <Button
                type="button"
                onClick={() => {
                  try {
                    console.log('Testing getDefaultValues method...')
                    const result = provider.getDefaultValues()
                    console.log('getDefaultValues result:', result)
                    alert(`getDefaultValues success! Check console for details.`)
                  } catch (error) {
                    console.error('getDefaultValues error:', error)
                    alert(`getDefaultValues error: ${error instanceof Error ? error.message : String(error)}`)
                  }
                }}
                className="bg-yellow-500 text-white"
                size="sm"
              >
                Test getDefaultValues()
              </Button>
            </div>

            <h4 className="font-medium">AutoForm Test:</h4>
            <div className="border p-4 rounded">
              <AutoForm
                schema={provider}
                onSubmit={data => {
                  console.log('Form submitted:', data)
                  alert('Form submitted successfully! Check console for data.')
                }}
              />
            </div>
          </div>
        )}
      </div>
    )
  },
}
