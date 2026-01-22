import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlertDialog, Button } from '@/elements'

const meta: Meta = {
  title: 'Elements/AlertDialog',
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="solid" color="error">
          Delete Account
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </AlertDialog.Description>
        <div className="flex justify-end gap-3 mt-6">
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action>Yes, delete account</AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex gap-4">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
        <AlertDialog.Root key={size}>
          <AlertDialog.Trigger>
            <Button variant="outline">{size.toUpperCase()}</Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content maxWidth={size}>
            <AlertDialog.Title>Dialog Size: {size.toUpperCase()}</AlertDialog.Title>
            <AlertDialog.Description>This alert dialog has max-width set to {size}.</AlertDialog.Description>
            <div className="flex justify-end gap-3 mt-6">
              <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
              <AlertDialog.Action>Continue</AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>
      ))}
    </div>
  ),
}

export const DeleteConfirmation: StoryObj = {
  render: () => (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="solid" color="error">
          Delete Item
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="sm">
        <AlertDialog.Title>Delete this item?</AlertDialog.Title>
        <AlertDialog.Description>
          This item will be permanently deleted. This action cannot be undone.
        </AlertDialog.Description>
        <div className="flex justify-end gap-3 mt-6">
          <AlertDialog.Cancel>Keep Item</AlertDialog.Cancel>
          <AlertDialog.Action className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}

export const UnsavedChanges: StoryObj = {
  render: () => (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="outline">Leave Page</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="sm">
        <AlertDialog.Title>Unsaved Changes</AlertDialog.Title>
        <AlertDialog.Description>
          You have unsaved changes. Are you sure you want to leave? Your changes will be lost.
        </AlertDialog.Description>
        <div className="flex justify-end gap-3 mt-6">
          <AlertDialog.Cancel>Stay</AlertDialog.Cancel>
          <AlertDialog.Action>Leave Page</AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}

export const LogoutConfirmation: StoryObj = {
  render: () => (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="ghost">Logout</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="xs">
        <AlertDialog.Title>Logout</AlertDialog.Title>
        <AlertDialog.Description>Are you sure you want to logout?</AlertDialog.Description>
        <div className="flex justify-end gap-3 mt-6">
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action>Logout</AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}
