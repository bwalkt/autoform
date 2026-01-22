import { Select, SelectItem, Textarea, TextField } from '@bwalkt/ui/elements'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Mail, Search, User } from 'lucide-react'
import * as React from 'react'

const meta: Meta = {
  title: 'Design System/Form Elements',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">TextField Sizes</h3>
        <div className="space-y-4">
          <TextField size="1" placeholder="Size xs - Extra Small" />
          <TextField size="2" placeholder="Size sm - Small" />
          <TextField size="2" placeholder="Size md - Medium (default)" />
          <TextField size="3" placeholder="Size lg - Large" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Select Sizes</h3>
        <div className="space-y-4">
          <Select size="1" placeholder="Size xs">
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </Select>
          <Select size="2" placeholder="Size sm">
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </Select>
          <Select size="2" placeholder="Size md (default)">
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </Select>
          <Select size="3" placeholder="Size lg">
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </Select>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Textarea Sizes</h3>
        <div className="space-y-4">
          <Textarea size="1" placeholder="Size xs" rows={3} />
          <Textarea size="2" placeholder="Size sm" rows={3} />
          <Textarea size="2" placeholder="Size md (default)" rows={3} />
          <Textarea size="3" placeholder="Size lg" rows={3} />
        </div>
      </div>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">TextField Variants</h3>
        <div className="space-y-4">
          <TextField variant="outline" placeholder="Outline variant (default)" />
          <TextField variant="soft" placeholder="Soft variant" />
          <TextField variant="solid" placeholder="Solid variant" />
          <TextField variant="ghost" placeholder="Ghost variant" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Select Variants</h3>
        <div className="space-y-4">
          <Select variant="outline" placeholder="Outline variant (default)">
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </Select>
          <Select variant="soft" placeholder="Soft variant">
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </Select>
          <Select variant="solid" placeholder="Solid variant">
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </Select>
          <Select variant="ghost" placeholder="Ghost variant">
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </Select>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Textarea Variants</h3>
        <div className="space-y-4">
          <Textarea variant="outline" placeholder="Outline variant (default)" rows={3} />
          <Textarea variant="soft" placeholder="Soft variant" rows={3} />
          <Textarea variant="solid" placeholder="Solid variant" rows={3} />
          <Textarea variant="ghost" placeholder="Ghost variant" rows={3} />
        </div>
      </div>
    </div>
  ),
}

export const AllColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">TextField Colors</h3>
        <div className="space-y-4">
          <TextField color="default" placeholder="Default" />
          <TextField color="primary" placeholder="Primary" />
          <TextField color="info" placeholder="Info (blue)" />
          <TextField color="success" placeholder="Success (green)" />
          <TextField color="warning" placeholder="Warning (orange)" />
          <TextField color="error" placeholder="Error (red)" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Select Colors</h3>
        <div className="space-y-4">
          <Select color="default" placeholder="Default">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
          <Select color="primary" placeholder="Primary">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
          <Select color="info" placeholder="Info (blue)">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
          <Select color="success" placeholder="Success (green)">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
          <Select color="warning" placeholder="Warning (orange)">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
          <Select color="error" placeholder="Error (red)">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
        </div>
      </div>
    </div>
  ),
}

export const AllRadius: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">TextField Radius</h3>
        <div className="space-y-4">
          <TextField radius="none" placeholder="No radius" />
          <TextField radius="sm" placeholder="Small radius" />
          <TextField radius="md" placeholder="Medium radius (default)" />
          <TextField radius="lg" placeholder="Large radius" />
          <TextField radius="full" placeholder="Full radius" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Select Radius</h3>
        <div className="space-y-4">
          <Select radius="none" placeholder="No radius">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
          <Select radius="sm" placeholder="Small radius">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
          <Select radius="md" placeholder="Medium radius (default)">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
          <Select radius="lg" placeholder="Large radius">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
          <Select radius="full" placeholder="Full radius">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
        </div>
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">TextField with Icons - Size sm</h3>
        <div className="space-y-4">
          <TextField size="2" leftIcon={<Mail />} placeholder="Email address" />
          <TextField size="2" leftIcon={<Search />} placeholder="Search..." />
          <TextField size="2" leftIcon={<User />} rightIcon={<Search />} placeholder="Search users" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">TextField with Icons - Size md (Default)</h3>
        <div className="space-y-4">
          <TextField size="2" leftIcon={<Mail />} placeholder="Email address" />
          <TextField size="2" leftIcon={<Search />} placeholder="Search..." />
          <TextField size="2" leftIcon={<User />} rightIcon={<Search />} placeholder="Search users" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">TextField with Icons - Size lg</h3>
        <div className="space-y-4">
          <TextField size="3" leftIcon={<Mail />} placeholder="Email address" />
          <TextField size="3" leftIcon={<Search />} placeholder="Search..." />
          <TextField size="3" leftIcon={<User />} rightIcon={<Search />} placeholder="Search users" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">All Variants with Icons</h3>
        <div className="space-y-4">
          <TextField variant="outline" leftIcon={<Mail />} placeholder="Outline with icon" />
          <TextField variant="soft" leftIcon={<Mail />} placeholder="Soft with icon" />
          <TextField variant="solid" leftIcon={<Mail />} placeholder="Solid with icon" />
          <TextField variant="ghost" leftIcon={<Mail />} placeholder="Ghost with icon" />
        </div>
      </div>
    </div>
  ),
}

export const FloatingLabels: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Floating Label Variants</h3>
        <div className="space-y-6">
          <TextField label="Filled Style" floatingLabel="filled" />
          <TextField label="Outlined Style" floatingLabel="outlined" />
          <TextField label="Standard Style" floatingLabel="standard" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Floating Labels with Icons</h3>
        <div className="space-y-6">
          <TextField label="Email" floatingLabel="outlined" leftIcon={<Mail />} />
          <TextField label="Search" floatingLabel="filled" leftIcon={<Search />} />
          <TextField label="Username" floatingLabel="standard" leftIcon={<User />} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Floating Labels with Colors</h3>
        <div className="space-y-6">
          <TextField label="Primary" floatingLabel="outlined" color="primary" />
          <TextField label="Success" floatingLabel="outlined" color="success" />
          <TextField label="Error" floatingLabel="outlined" error />
        </div>
      </div>
    </div>
  ),
}

export const ErrorStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Error States</h3>
        <div className="space-y-4">
          <TextField error placeholder="TextField with error" />
          <TextField label="Email" floatingLabel="outlined" error defaultValue="invalid@" />
          <Select error placeholder="Select with error">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
          <Textarea error placeholder="Textarea with error" rows={3} />
        </div>
      </div>
    </div>
  ),
}

export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Disabled States</h3>
        <div className="space-y-4">
          <TextField disabled placeholder="Disabled TextField" />
          <TextField label="Disabled Floating" floatingLabel="outlined" disabled defaultValue="Can't edit" />
          <Select disabled placeholder="Disabled Select">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
          <Textarea disabled placeholder="Disabled Textarea" rows={3} />
        </div>
      </div>
    </div>
  ),
}

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      role: '',
      bio: '',
    })

    return (
      <div className="max-w-md mx-auto space-y-6">
        <h3 className="text-lg font-medium mb-4">Contact Form with Floating Labels</h3>

        <TextField
          label="Full Name"
          floatingLabel="outlined"
          leftIcon={<User />}
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />

        <TextField
          label="Email Address"
          floatingLabel="outlined"
          leftIcon={<Mail />}
          type="email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />

        <Select
          size="2"
          variant="outline"
          placeholder="Select your role"
          value={formData.role}
          onValueChange={value => setFormData({ ...formData, role: value })}
        >
          <SelectItem value="developer">Developer</SelectItem>
          <SelectItem value="designer">Designer</SelectItem>
          <SelectItem value="manager">Manager</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </Select>

        <Textarea
          size="2"
          variant="outline"
          placeholder="Tell us about yourself"
          rows={4}
          value={formData.bio}
          onChange={e => setFormData({ ...formData, bio: e.target.value })}
        />

        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Submit
        </button>
      </div>
    )
  },
}
