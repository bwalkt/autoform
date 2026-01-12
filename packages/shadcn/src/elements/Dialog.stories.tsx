import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog, Button, TextField } from "../elements";

const meta: Meta = {
  title: "Elements/Dialog",
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Close />
        <Dialog.Header>
          <Dialog.Title>Edit Profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <TextField placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <TextField type="email" placeholder="Enter your email" />
            </div>
          </div>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Trigger>
            <Button variant="outline">Cancel</Button>
          </Dialog.Trigger>
          <Button>Save changes</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Dialog.Root key={size}>
          <Dialog.Trigger>
            <Button variant="outline">{size.toUpperCase()}</Button>
          </Dialog.Trigger>
          <Dialog.Content maxWidth={size}>
            <Dialog.Close />
            <Dialog.Header>
              <Dialog.Title>Dialog - {size.toUpperCase()}</Dialog.Title>
              <Dialog.Description>
                This dialog has max-width set to {size}.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <p className="text-muted-foreground">
                Content goes here. The dialog will not exceed the {size} width.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Trigger>
                <Button variant="outline">Close</Button>
              </Dialog.Trigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      ))}
    </div>
  ),
};

export const WithForm: StoryObj = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Create Account</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="sm">
        <Dialog.Close />
        <Dialog.Header>
          <Dialog.Title>Create Account</Dialog.Title>
          <Dialog.Description>
            Fill in the details below to create your account.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <TextField placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <TextField placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <TextField type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <TextField type="password" placeholder="Create a password" />
            </div>
          </form>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Trigger>
            <Button variant="outline">Cancel</Button>
          </Dialog.Trigger>
          <Button>Create Account</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  ),
};

export const ScrollableContent: StoryObj = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>View Terms</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="lg">
        <Dialog.Close />
        <Dialog.Header>
          <Dialog.Title>Terms of Service</Dialog.Title>
          <Dialog.Description>
            Please read and accept our terms of service.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Body className="max-h-[60vh] overflow-y-auto">
          <div className="space-y-4 text-sm text-muted-foreground">
            {Array.from({ length: 10 }).map((_, i) => (
              <p key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            ))}
          </div>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Trigger>
            <Button variant="outline">Decline</Button>
          </Dialog.Trigger>
          <Button>Accept</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  ),
};
