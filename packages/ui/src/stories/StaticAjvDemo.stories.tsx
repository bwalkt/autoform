import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@bwalkt/shadcn/components/ui/button'
import { Label } from '@bwalkt/shadcn/components/ui/label'

// Completely static demo without any React state or hooks
const StaticSchemaDemo = () => {
  // Complex JSON Schema definition
  const userProfileSchema = {
    type: 'object',
    title: 'User Profile',
    properties: {
      personalInfo: {
        type: 'object',
        title: 'Personal Information',
        description: 'Basic information about yourself',
        properties: {
          firstName: {
            type: 'string',
            minLength: 2,
            maxLength: 50,
            title: 'First Name',
          },
          lastName: {
            type: 'string',
            minLength: 2,
            maxLength: 50,
            title: 'Last Name',
          },
          email: {
            type: 'string',
            format: 'email',
            title: 'Email Address',
          },
          phone: {
            type: 'string',
            pattern: '^[\\+]?[1-9][\\d]{0,15}$',
            title: 'Phone Number',
          },
          birthDate: {
            type: 'string',
            format: 'date',
            title: 'Date of Birth',
          },
        },
        required: ['firstName', 'lastName', 'email', 'birthDate'],
      },
      address: {
        type: 'object',
        title: 'Address',
        properties: {
          street: {
            type: 'string',
            minLength: 5,
            title: 'Street Address',
          },
          city: {
            type: 'string',
            minLength: 2,
            title: 'City',
          },
          zipCode: {
            type: 'string',
            pattern: '^[\\d]{5}(-[\\d]{4})?$',
            title: 'ZIP Code',
          },
          country: {
            type: 'string',
            enum: ['US', 'CA', 'UK', 'DE', 'FR'],
            default: 'US',
            title: 'Country',
          },
        },
        required: ['street', 'city', 'zipCode', 'country'],
      },
      preferences: {
        type: 'object',
        title: 'Preferences',
        properties: {
          newsletter: {
            type: 'boolean',
            default: false,
            title: 'Newsletter Subscription',
          },
          theme: {
            type: 'string',
            enum: ['light', 'dark', 'auto'],
            default: 'auto',
            title: 'Theme',
          },
        },
        required: ['newsletter', 'theme'],
      },
      skills: {
        type: 'array',
        title: 'Skills',
        items: {
          type: 'string',
          minLength: 2,
        },
        minItems: 1,
        maxItems: 10,
        default: [],
      },
    },
    required: ['personalInfo', 'address', 'preferences', 'skills'],
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AJV AutoForm Schema Demo</h1>
        <p className="text-gray-600 mb-6">
          This demonstrates the JSON Schema structure that would be used with the AJV provider for AutoForm.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Schema Display */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Complete JSON Schema</h3>
              <pre className="text-xs text-gray-600 overflow-auto max-h-96 bg-white p-3 rounded border">
                {JSON.stringify(userProfileSchema, null, 2)}
              </pre>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">✨ Form Features</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>
                  <strong>🔍 Nested Objects:</strong> personalInfo, address, preferences
                </li>
                <li>
                  <strong>📝 String Validation:</strong> minLength, maxLength, pattern
                </li>
                <li>
                  <strong>📧 Format Validation:</strong> email, date, phone patterns
                </li>
                <li>
                  <strong>🔢 Array Management:</strong> skills with min/max items
                </li>
                <li>
                  <strong>📋 Enums:</strong> country, theme dropdowns
                </li>
                <li>
                  <strong>✅ Boolean Toggles:</strong> newsletter subscription
                </li>
                <li>
                  <strong>🔒 Required Fields:</strong> automatic validation
                </li>
                <li>
                  <strong>🎯 Default Values:</strong> pre-populated fields
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">🚀 AJV Integration</h3>
              <div className="text-sm text-green-800 space-y-2">
                <p>
                  <strong>Provider Setup:</strong>
                </p>
                <code className="block bg-white p-2 rounded text-xs">
                  const provider = new AjvProvider(userProfileSchema);
                </code>

                <p>
                  <strong>AutoForm Usage:</strong>
                </p>
                <code className="block bg-white p-2 rounded text-xs">
                  &lt;AutoForm provider={`{provider}`} onSubmit=
                  {`{handleSubmit}`} /&gt;
                </code>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-3">🎨 Generated Form Fields</h3>
              <ul className="space-y-1 text-sm text-purple-800">
                <li>• Text inputs with validation</li>
                <li>• Email input with format checking</li>
                <li>• Date picker for birthDate</li>
                <li>• Phone input with pattern validation</li>
                <li>• Country dropdown from enum</li>
                <li>• Theme selector (light/dark/auto)</li>
                <li>• Skills array with add/remove</li>
                <li>• Checkbox for newsletter</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mock Form Preview */}
        <div className="mt-8 p-6 bg-yellow-50 border-2 border-yellow-200 border-dashed rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-3">🎯 AutoForm Would Render Here</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="border border-gray-300 rounded p-2 bg-white">
                <Label htmlFor="firstName">First Name *</Label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  className="w-full mt-1 p-1 text-sm"
                  disabled
                />
              </div>
              <div className="border border-gray-300 rounded p-2 bg-white">
                <Label htmlFor="emailField">Email *</Label>
                <input
                  id="emailField"
                  type="email"
                  placeholder="user@example.com"
                  className="w-full mt-1 p-1 text-sm"
                  disabled
                />
              </div>
              <div className="border border-gray-300 rounded p-2 bg-white">
                <Label htmlFor="country">Country *</Label>
                <select id="country" className="w-full mt-1 p-1 text-sm" disabled>
                  <option>US</option>
                </select>
              </div>
            </div>
            <div className="space-y-3">
              <div className="border border-gray-300 rounded p-2 bg-white">
                <Label htmlFor="lastName">Last Name *</Label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  className="w-full mt-1 p-1 text-sm"
                  disabled
                />
              </div>
              <div className="border border-gray-300 rounded p-2 bg-white">
                <Label htmlFor="birthDate">Birth Date *</Label>
                <input id="birthDate" type="date" className="w-full mt-1 p-1 text-sm" disabled />
              </div>
              <div className="border border-gray-300 rounded p-2 bg-white">
                <Label htmlFor="newsletter" className="flex items-center">
                  <input id="newsletter" type="checkbox" className="mr-2" disabled />
                  Subscribe to newsletter
                </Label>
              </div>
            </div>
          </div>
          <p className="text-yellow-700 text-sm mt-4 italic">
            This is a mock preview. The actual AutoForm component would generate all these fields automatically from the
            JSON schema above.
          </p>
        </div>

        {/* Usage Example */}
        <div className="mt-8 p-6 bg-gray-800 text-green-400 rounded-lg">
          <h3 className="font-semibold mb-3">💻 Code Example</h3>
          <pre className="text-sm overflow-auto">
            {`import { AutoForm } from "@bwalkt/react";
import { AjvProvider } from "@bwalkt/ajv";

const provider = new AjvProvider(userProfileSchema);

function MyForm() {
  return (
    <AutoForm 
      provider={provider}
      onSubmit={(data) => console.log(data)}
      withSubmit={true}
    />
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof StaticSchemaDemo> = {
  title: 'AJV/Static Schema Demo',
  component: StaticSchemaDemo,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const CompleteSchema: Story = {}

export const SimpleExample: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Simple AJV Schema Example</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">JSON Schema</h3>
            <pre className="text-xs bg-gray-50 p-3 rounded border overflow-auto">
              {`{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 2,
      "title": "Full Name"
    },
    "email": {
      "type": "string",
      "format": "email",
      "title": "Email"
    },
    "age": {
      "type": "number",
      "minimum": 18,
      "maximum": 120
    }
  },
  "required": ["name", "email", "age"]
}`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Generated Form</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="fullname">Full Name *</Label>
                <input
                  id="fullname"
                  type="text"
                  className="w-full border rounded p-2 text-sm"
                  disabled
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <input
                  id="email"
                  type="email"
                  className="w-full border rounded p-2 text-sm"
                  disabled
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <Label htmlFor="age">Age *</Label>
                <input id="age" type="number" className="w-full border rounded p-2 text-sm" disabled placeholder="25" />
              </div>
              <Button type="button" className="w-full" disabled>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}
