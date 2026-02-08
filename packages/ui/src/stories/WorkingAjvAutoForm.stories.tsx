import { AjvProvider } from '@bwalkt/ajv'
import { AutoForm } from '@bwalkt/react'
import { Button } from '@bwalkt/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

const meta: Meta = {
  title: 'AutoForm/Working AJV Integration',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Simple user profile schema
const userProfileSchema = {
  type: 'object',
  title: 'User Profile',
  properties: {
    personalInfo: {
      type: 'object',
      title: 'Personal Information',
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
        birthDate: {
          type: 'string',
          format: 'date',
          title: 'Date of Birth',
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
          default: false,
          title: 'Newsletter Subscription',
        },
        theme: {
          type: 'string',
          enum: ['light', 'dark', 'auto'],
          default: 'auto',
          title: 'Theme Preference',
        },
      },
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
      default: ['JavaScript'],
    },
  },
  required: ['personalInfo', 'preferences'],
}

export const CompleteUserProfile: Story = {
  render: () => {
    const [submittedData, setSubmittedData] = React.useState<any>(null)
    const [provider, setProvider] = React.useState<AjvProvider | null>(null)

    React.useEffect(() => {
      try {
        const ajvProvider = new AjvProvider(userProfileSchema)
        setProvider(ajvProvider)
      } catch (error) {
        console.error('Failed to create AJV Provider:', error)
      }
    }, [])

    const handleSubmit = (data: any) => {
      console.log('Form submitted with data:', data)
      setSubmittedData(data)
    }

    const resetForm = () => {
      setSubmittedData(null)
    }

    if (submittedData) {
      return (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-medium text-green-800 mb-4">✅ Profile Created Successfully!</h3>
            <div className="space-y-3 text-sm text-green-700">
              {submittedData.personalInfo && (
                <div>
                  <h4 className="font-medium">Personal Information:</h4>
                  <ul className="ml-4 space-y-1">
                    <li>
                      <strong>Name:</strong> {submittedData.personalInfo.firstName}{' '}
                      {submittedData.personalInfo.lastName}
                    </li>
                    <li>
                      <strong>Email:</strong> {submittedData.personalInfo.email}
                    </li>
                    {submittedData.personalInfo.birthDate && (
                      <li>
                        <strong>Birth Date:</strong> {submittedData.personalInfo.birthDate}
                      </li>
                    )}
                  </ul>
                </div>
              )}
              {submittedData.preferences && (
                <div>
                  <h4 className="font-medium">Preferences:</h4>
                  <ul className="ml-4 space-y-1">
                    <li>
                      <strong>Newsletter:</strong> {submittedData.preferences.newsletter ? 'Yes' : 'No'}
                    </li>
                    <li>
                      <strong>Theme:</strong> {submittedData.preferences.theme}
                    </li>
                  </ul>
                </div>
              )}
              {submittedData.skills && submittedData.skills.length > 0 && (
                <div>
                  <h4 className="font-medium">Skills:</h4>
                  <ul className="ml-4">
                    <li>{submittedData.skills.join(', ')}</li>
                  </ul>
                </div>
              )}
            </div>
            <Button type="button" onClick={resetForm} className="mt-4" variant="default">
              Create Another Profile
            </Button>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <h4 className="font-medium mb-2">Raw Form Data (JSON):</h4>
            <pre className="text-xs overflow-auto bg-white p-2 rounded border">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        </div>
      )
    }

    if (!provider) {
      return (
        <div className="max-w-2xl mx-auto p-6">
          <div className="text-center">Loading AJV Provider...</div>
        </div>
      )
    }

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User Profile Form</h2>
          <p className="text-gray-600">
            This form is generated automatically from JSON Schema using AJV validation and our design token elements.
          </p>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <AutoForm schema={provider} onSubmit={handleSubmit} withSubmit={true} />
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">✨ Features Demonstrated</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              • <strong>AJV JSON Schema validation</strong> with format checking
            </li>
            <li>
              • <strong>Design token elements</strong> with semantic colors
            </li>
            <li>
              • <strong>Nested object support</strong> (personalInfo, preferences)
            </li>
            <li>
              • <strong>Array field support</strong> (skills)
            </li>
            <li>
              • <strong>Enum dropdown</strong> (theme selection)
            </li>
            <li>
              • <strong>Boolean checkbox</strong> (newsletter subscription)
            </li>
            <li>
              • <strong>Required field validation</strong>
            </li>
            <li>
              • <strong>Type-specific inputs</strong> (email, date)
            </li>
          </ul>
        </div>
      </div>
    )
  },
}

// Simpler contact form example
const contactSchema = {
  type: 'object',
  title: 'Contact Form',
  properties: {
    name: {
      type: 'string',
      minLength: 2,
      title: 'Full Name',
    },
    email: {
      type: 'string',
      format: 'email',
      title: 'Email Address',
    },
    subject: {
      type: 'string',
      minLength: 5,
      title: 'Subject',
    },
    priority: {
      type: 'string',
      enum: ['low', 'medium', 'high', 'urgent'],
      title: 'Priority Level',
      default: 'medium',
    },
    message: {
      type: 'string',
      minLength: 10,
      title: 'Message',
    },
  },
  required: ['name', 'email', 'subject', 'message'],
}

export const SimpleContactForm: Story = {
  render: () => {
    const [provider] = React.useState(() => new AjvProvider(contactSchema))

    return (
      <div className="max-w-lg mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Us</h2>
          <p className="text-gray-600">Simple contact form with AJV validation</p>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <AutoForm
            schema={provider}
            onSubmit={data => {
              console.log('Contact form submitted:', data)
              alert(`Thank you ${data.name}! Your message has been received.`)
            }}
            withSubmit={true}
          />
        </div>
      </div>
    )
  },
}
