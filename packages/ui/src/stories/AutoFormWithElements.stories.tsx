import { AjvProvider } from '@bwalkt/ajv'
import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { AutoForm } from '@bwalkt/shadcn/components/ui/autoform/AutoForm'

const meta: Meta = {
  title: 'AutoForm/With Design Token Elements',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof meta>

const basicSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Full Name',
      minLength: 2,
    },
    email: {
      type: 'string',
      format: 'email',
      title: 'Email Address',
    },
    age: {
      type: 'number',
      title: 'Age',
      minimum: 0,
      maximum: 120,
    },
    role: {
      type: 'string',
      title: 'Role',
      enum: ['developer', 'designer', 'manager', 'other'],
    },
    birthDate: {
      type: 'string',
      format: 'date',
      title: 'Date of Birth',
    },
  },
  required: ['name', 'email'],
} as const

export const BasicForm: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({})
    const [provider] = React.useState(() => new AjvProvider(basicSchema))

    return (
      <div className="max-w-md mx-auto">
        <h3 className="text-lg font-medium mb-4">User Information Form</h3>
        <AutoForm
          schema={provider}
          onSubmit={(data: any) => {
            console.log('Form submitted:', data)
            setFormData(data)
          }}
          withSubmit={true}
        />

        {Object.keys(formData).length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium mb-2">Submitted Data:</h4>
            <pre className="text-sm">{JSON.stringify(formData, null, 2)}</pre>
          </div>
        )}
      </div>
    )
  },
}

const validationSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: 'Username',
      minLength: 3,
      maxLength: 20,
    },
    password: {
      type: 'string',
      title: 'Password',
      minLength: 8,
    },
    confirmPassword: {
      type: 'string',
      title: 'Confirm Password',
      minLength: 8,
    },
    acceptTerms: {
      type: 'boolean',
      title: 'Accept Terms and Conditions',
      const: true,
    },
  },
  required: ['username', 'password', 'confirmPassword', 'acceptTerms'],
} as const

export const ValidationForm: Story = {
  render: () => {
    const [errors, setErrors] = React.useState<any[]>([])
    const [success, setSuccess] = React.useState(false)
    const [provider] = React.useState(() => new AjvProvider(validationSchema))

    return (
      <div className="max-w-md mx-auto">
        <h3 className="text-lg font-medium mb-4">Registration Form (with Validation)</h3>
        <AutoForm
          schema={provider}
          onSubmit={(data: any) => {
            // Simulate password confirmation validation
            if (data.password !== data.confirmPassword) {
              setErrors([{ message: 'Passwords do not match', path: 'confirmPassword' }])
              return
            }

            setErrors([])
            setSuccess(true)
            console.log('Registration successful:', data)
          }}
          onError={(errors: any) => {
            setErrors(errors)
            setSuccess(false)
          }}
        />

        {errors.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <h4 className="font-medium text-red-800 mb-2">Validation Errors:</h4>
            <ul className="list-disc list-inside text-sm text-red-700">
              {errors.map((error) => (
                <li key={error.message}>{error.message}</li>
              ))}
            </ul>
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 font-medium">✅ Registration successful!</p>
          </div>
        )}
      </div>
    )
  },
}

const nestedSchema = {
  type: 'object',
  properties: {
    personalInfo: {
      type: 'object',
      title: 'Personal Information',
      properties: {
        firstName: {
          type: 'string',
          title: 'First Name',
        },
        lastName: {
          type: 'string',
          title: 'Last Name',
        },
        email: {
          type: 'string',
          format: 'email',
          title: 'Email',
        },
      },
      required: ['firstName', 'lastName', 'email'],
    },
    preferences: {
      type: 'object',
      title: 'Preferences',
      properties: {
        newsletter: {
          type: 'boolean',
          title: 'Subscribe to Newsletter',
          default: false,
        },
        theme: {
          type: 'string',
          title: 'Preferred Theme',
          enum: ['light', 'dark', 'auto'],
          default: 'auto',
        },
        notifications: {
          type: 'boolean',
          title: 'Enable Notifications',
          default: true,
        },
      },
    },
  },
  required: ['personalInfo'],
} as const

export const NestedForm: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({})
    const [provider] = React.useState(() => new AjvProvider(nestedSchema))

    return (
      <div className="max-w-lg mx-auto">
        <h3 className="text-lg font-medium mb-4">Nested Object Form</h3>
        <AutoForm
          schema={provider}
          onSubmit={(data: any) => {
            console.log('Nested form submitted:', data)
            setFormData(data)
          }}
        />

        {Object.keys(formData).length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium mb-2">Submitted Data:</h4>
            <pre className="text-xs overflow-auto">{JSON.stringify(formData, null, 2)}</pre>
          </div>
        )}
      </div>
    )
  },
}
