import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DropdownMenu, Button } from "../elements";
import {
  User,
  Settings,
  LogOut,
  Plus,
  CreditCard,
  UserPlus,
  Cloud,
  LifeBuoy,
  Github,
  Keyboard,
} from "lucide-react";

const meta: Meta = {
  title: "Elements/DropdownMenu",
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Profile</DropdownMenu.Item>
        <DropdownMenu.Item>Settings</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Logout</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
};

export const WithShortcuts: StoryObj = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline">File</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item shortcut="Cmd+N">New File</DropdownMenu.Item>
        <DropdownMenu.Item shortcut="Cmd+O">Open</DropdownMenu.Item>
        <DropdownMenu.Item shortcut="Cmd+S">Save</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut="Cmd+P">Print</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
};

export const WithCheckboxItems: StoryObj = {
  render: () => {
    const [showStatus, setShowStatus] = useState(true);
    const [showActivity, setShowActivity] = useState(false);
    const [showPanel, setShowPanel] = useState(false);

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline">View</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>Toggle View</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.CheckboxItem
            checked={showStatus}
            onCheckedChange={setShowStatus}
          >
            Status Bar
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem
            checked={showActivity}
            onCheckedChange={setShowActivity}
          >
            Activity Panel
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            Side Panel
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  },
};

export const WithRadioItems: StoryObj = {
  render: () => {
    const [theme, setTheme] = useState("system");

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline">Theme</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>Appearance</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenu.RadioItem value="light">Light</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="dark">Dark</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="system">System</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  },
};

export const WithSubmenu: StoryObj = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline">Options</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>New Tab</DropdownMenu.Item>
        <DropdownMenu.Item>New Window</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>Share</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Email</DropdownMenu.Item>
            <DropdownMenu.Item>Message</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Copy Link</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Settings</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
};

export const UserMenu: StoryObj = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Label>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Keyboard className="mr-2 h-4 w-4" />
            Shortcuts
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Team
          </DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>
              <Plus className="mr-2 h-4 w-4" />
              New
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>Project</DropdownMenu.Item>
              <DropdownMenu.Item>Team</DropdownMenu.Item>
              <DropdownMenu.Item>Organization</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <LifeBuoy className="mr-2 h-4 w-4" />
          Support
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Cloud className="mr-2 h-4 w-4" />
          API
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item color="error">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex gap-4">
      {(["1", "2"] as const).map((size) => (
        <DropdownMenu.Root key={size}>
          <DropdownMenu.Trigger>
            <Button variant="outline">Size {size}</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content size={size}>
            <DropdownMenu.Item>Profile</DropdownMenu.Item>
            <DropdownMenu.Item>Settings</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Logout</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ))}
    </div>
  ),
};

export const Variants: StoryObj = {
  render: () => (
    <div className="flex gap-4">
      {(["solid", "soft"] as const).map((variant) => (
        <DropdownMenu.Root key={variant}>
          <DropdownMenu.Trigger>
            <Button variant="outline" className="capitalize">{variant}</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant={variant}>
            <DropdownMenu.Item>Profile</DropdownMenu.Item>
            <DropdownMenu.Item>Settings</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Logout</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ))}
    </div>
  ),
};

export const DisabledItems: StoryObj = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline">Actions</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item disabled>Archive (Unavailable)</DropdownMenu.Item>
        <DropdownMenu.Item color="error">Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
};
