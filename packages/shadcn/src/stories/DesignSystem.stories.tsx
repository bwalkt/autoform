import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { TextField, Select, SelectItem, Textarea } from '../elements';
import { Mail, Search, User } from 'lucide-react';

const meta: Meta = {
  title: 'Design System/Form Elements',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">TextField Sizes</h3>
        <div className="space-y-4">
          <TextField size="1" placeholder="Size 1 - Small" />
          <TextField size="2" placeholder="Size 2 - Default" />
          <TextField size="3" placeholder="Size 3 - Large" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Select Sizes</h3>
        <div className="space-y-4">
          <Select size="1" placeholder="Size 1 - Small">
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </Select>
          <Select size="2" placeholder="Size 2 - Default">
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </Select>
          <Select size="3" placeholder="Size 3 - Large">
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </Select>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Textarea Sizes</h3>
        <div className="space-y-4">
          <Textarea size="1" placeholder="Size 1 - Small" rows={3} />
          <Textarea size="2" placeholder="Size 2 - Default" rows={3} />
          <Textarea size="3" placeholder="Size 3 - Large" rows={3} />
        </div>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">TextField Variants</h3>
        <div className="space-y-4">
          <TextField variant="classic" placeholder="Classic variant" />
          <TextField variant="surface" placeholder="Surface variant (default)" />
          <TextField variant="soft" placeholder="Soft variant" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Select Variants</h3>
        <div className="space-y-4">
          <Select variant="classic" placeholder="Classic variant">
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </Select>
          <Select variant="surface" placeholder="Surface variant (default)">
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </Select>
          <Select variant="soft" placeholder="Soft variant">
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </Select>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Textarea Variants</h3>
        <div className="space-y-4">
          <Textarea variant="classic" placeholder="Classic variant" rows={3} />
          <Textarea variant="surface" placeholder="Surface variant (default)" rows={3} />
          <Textarea variant="soft" placeholder="Soft variant" rows={3} />
        </div>
      </div>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">TextField Colors</h3>
        <div className="space-y-4">
          <TextField color="default" placeholder="Default (gray)" />
          <TextField color="info" placeholder="Info (blue)" />
          <TextField color="success" placeholder="Success (green)" />
          <TextField color="warning" placeholder="Warning (orange)" />
          <TextField color="error" placeholder="Error (red)" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Select Colors</h3>
        <div className="space-y-4">
          <Select color="default" placeholder="Default (gray)">
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
};

export const AllRadius: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">TextField Radius</h3>
        <div className="space-y-4">
          <TextField radius="none" placeholder="No radius" />
          <TextField radius="small" placeholder="Small radius" />
          <TextField radius="medium" placeholder="Medium radius (default)" />
          <TextField radius="large" placeholder="Large radius" />
          <TextField radius="full" placeholder="Full radius" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Select Radius</h3>
        <div className="space-y-4">
          <Select radius="none" placeholder="No radius">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
          <Select radius="small" placeholder="Small radius">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
          <Select radius="medium" placeholder="Medium radius (default)">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
          <Select radius="large" placeholder="Large radius">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
          <Select radius="full" placeholder="Full radius">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
        </div>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">TextField with Icons - Size 1</h3>
        <div className="space-y-4">
          <TextField size="1" leftIcon={<Mail />} placeholder="Email address" />
          <TextField size="1" leftIcon={<Search />} placeholder="Search..." />
          <TextField size="1" leftIcon={<User />} rightIcon={<Search />} placeholder="Search users" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">TextField with Icons - Size 2 (Default)</h3>
        <div className="space-y-4">
          <TextField size="2" leftIcon={<Mail />} placeholder="Email address" />
          <TextField size="2" leftIcon={<Search />} placeholder="Search..." />
          <TextField size="2" leftIcon={<User />} rightIcon={<Search />} placeholder="Search users" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">TextField with Icons - Size 3</h3>
        <div className="space-y-4">
          <TextField size="3" leftIcon={<Mail />} placeholder="Email address" />
          <TextField size="3" leftIcon={<Search />} placeholder="Search..." />
          <TextField size="3" leftIcon={<User />} rightIcon={<Search />} placeholder="Search users" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">All Variants with Icons</h3>
        <div className="space-y-4">
          <TextField variant="classic" leftIcon={<Mail />} placeholder="Classic with icon" />
          <TextField variant="surface" leftIcon={<Mail />} placeholder="Surface with icon" />
          <TextField variant="soft" leftIcon={<Mail />} placeholder="Soft with icon" />
        </div>
      </div>
    </div>
  ),
};

export const ErrorStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Error States</h3>
        <div className="space-y-4">
          <TextField error placeholder="TextField with error" />
          <Select error placeholder="Select with error">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
          <Textarea error placeholder="Textarea with error" rows={3} />
        </div>
      </div>
    </div>
  ),
};

export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Disabled States</h3>
        <div className="space-y-4">
          <TextField disabled placeholder="Disabled TextField" />
          <Select disabled placeholder="Disabled Select">
            <SelectItem value="option1">Option 1</SelectItem>
          </Select>
          <Textarea disabled placeholder="Disabled Textarea" rows={3} />
        </div>
      </div>
    </div>
  ),
};

export const SemanticUsage: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Semantic Color Usage</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username (Default)</label>
            <TextField color="default" placeholder="Enter username" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email (Info)</label>
            <TextField color="info" placeholder="Enter email address" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-green-700">Verified Field (Success)</label>
            <TextField color="success" placeholder="This field is verified" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-orange-700">Review Required (Warning)</label>
            <TextField color="warning" placeholder="Please review this field" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-red-700">Invalid Input (Error)</label>
            <TextField color="error" placeholder="This field has an error" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      role: '',
      bio: '',
    });

    return (
      <div className="max-w-md mx-auto space-y-4">
        <h3 className="text-lg font-medium mb-4">Contact Form</h3>
        
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <TextField
            size="2"
            variant="surface"
            color="default"
            leftIcon={<User />}
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <TextField
            size="2"
            variant="surface"
            color="info"
            leftIcon={<Mail />}
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Role</label>
          <Select
            size="2"
            variant="surface"
            color="default"
            placeholder="Select your role"
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
          >
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="designer">Designer</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <Textarea
            size="2"
            variant="surface"
            color="default"
            placeholder="Tell us about yourself"
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </div>
    );
  },
};