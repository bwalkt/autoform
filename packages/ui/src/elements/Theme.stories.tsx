import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";
import { Theme, ThemePanel, useThemeContext } from "./Theme";
import { Button } from "./Button";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Switch } from "./Switch";
import { Slider } from "./Slider";
import { Progress } from "./Progress";
import { Box } from "../layouts/Box";

const meta: Meta<typeof Theme> = {
  title: "Elements/Theme",
  component: Theme,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    appearance: {
      control: "select",
      options: ["light", "dark", "inherit"],
    },
    accentColor: {
      control: "select",
      options: [
        "gray", "gold", "bronze", "brown", "yellow", "amber", "orange",
        "tomato", "red", "ruby", "crimson", "pink", "plum", "purple",
        "violet", "iris", "indigo", "blue", "cyan", "teal", "jade",
        "green", "grass", "lime", "mint", "sky",
      ],
    },
    radius: {
      control: "select",
      options: ["none", "small", "medium", "large", "full"],
    },
    scaling: {
      control: "select",
      options: ["90%", "95%", "100%", "105%", "110%"],
    },
    panelBackground: {
      control: "select",
      options: ["solid", "translucent"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Basic Example
// ============================================================================

export const Default: Story = {
  render: () => (
    <Theme className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Theme Demo</h1>
        <p className="text-muted-foreground">
          The Theme component provides context for styling all child components.
        </p>

        <div className="flex gap-4 flex-wrap">
          <Button>Primary Button</Button>
          <Button variant="soft">Soft Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge>Default</Badge>
          <Badge color="primary">Primary</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="error">Error</Badge>
        </div>

        <Card.Root>
          <Card.Header>
            <Card.Title>Card Title</Card.Title>
            <Card.Description>Card description goes here</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm w-20">Switch:</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm w-20">Slider:</span>
                <Slider defaultValue={[50]} className="flex-1" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm w-20">Progress:</span>
                <Progress value={65} className="flex-1" />
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    </Theme>
  ),
};

// ============================================================================
// With Theme Panel
// ============================================================================

export const WithThemePanel: Story = {
  render: () => (
    <Theme className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Theme with Panel</h1>
        <p className="text-muted-foreground">
          Click the settings button in the bottom right to customize the theme.
        </p>

        <div className="flex gap-4 flex-wrap">
          <Button>Primary</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="outline">Outline</Button>
        </div>

        <Card.Root>
          <Card.Header>
            <Card.Title>Interactive Card</Card.Title>
          </Card.Header>
          <Card.Content>
            <p>Change the accent color using the theme panel to see this card update.</p>
          </Card.Content>
        </Card.Root>
      </div>

      <ThemePanel defaultOpen />
    </Theme>
  ),
};

// ============================================================================
// Accent Colors
// ============================================================================

export const AccentColors: Story = {
  render: () => {
    const colors = [
      "tomato", "red", "crimson", "pink", "plum", "purple", "violet",
      "indigo", "blue", "cyan", "teal", "green", "grass", "orange", "amber",
    ] as const;

    return (
      <Box display="flex" className="flex-wrap gap-4 p-8">
        {colors.map((color) => (
          <Theme key={color} accentColor={color} className="p-4 rounded-lg border">
            <div className="space-y-2 text-center">
              <p className="text-sm font-medium capitalize">{color}</p>
              <Button size="2">Button</Button>
            </div>
          </Theme>
        ))}
      </Box>
    );
  },
};

// ============================================================================
// Radius Options
// ============================================================================

export const RadiusOptions: Story = {
  render: () => {
    const radii = ["none", "small", "medium", "large", "full"] as const;

    return (
      <Box display="flex" className="flex-wrap gap-4 p-8">
        {radii.map((radius) => (
          <Theme key={radius} radius={radius} className="p-4 rounded-lg border">
            <div className="space-y-2 text-center">
              <p className="text-sm font-medium capitalize">{radius}</p>
              <Button size="2">Button</Button>
            </div>
          </Theme>
        ))}
      </Box>
    );
  },
};

// ============================================================================
// Light and Dark
// ============================================================================

export const LightAndDark: Story = {
  render: () => (
    <div className="flex">
      <Theme appearance="light" className="flex-1 p-8 min-h-[400px]">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Light Mode</h2>
          <Button>Primary Button</Button>
          <Card.Root>
            <Card.Header>
              <Card.Title>Light Card</Card.Title>
            </Card.Header>
            <Card.Content>
              <p>Content in light mode</p>
            </Card.Content>
          </Card.Root>
        </div>
      </Theme>

      <Theme appearance="dark" className="flex-1 p-8 min-h-[400px]">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Dark Mode</h2>
          <Button>Primary Button</Button>
          <Card.Root>
            <Card.Header>
              <Card.Title>Dark Card</Card.Title>
            </Card.Header>
            <Card.Content>
              <p>Content in dark mode</p>
            </Card.Content>
          </Card.Root>
        </div>
      </Theme>
    </div>
  ),
};

// ============================================================================
// Using Theme Context
// ============================================================================

const ThemeInfo: React.FC = () => {
  const theme = useThemeContext();

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Current Theme Settings</Card.Title>
      </Card.Header>
      <Card.Content>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <dt className="text-muted-foreground">Appearance:</dt>
          <dd className="font-medium">{theme.appearance}</dd>
          <dt className="text-muted-foreground">Accent Color:</dt>
          <dd className="font-medium">{theme.accentColor}</dd>
          <dt className="text-muted-foreground">Gray Color:</dt>
          <dd className="font-medium">{theme.resolvedGrayColor}</dd>
          <dt className="text-muted-foreground">Radius:</dt>
          <dd className="font-medium">{theme.radius}</dd>
          <dt className="text-muted-foreground">Scaling:</dt>
          <dd className="font-medium">{theme.scaling}</dd>
          <dt className="text-muted-foreground">Panel Background:</dt>
          <dd className="font-medium">{theme.panelBackground}</dd>
        </dl>
      </Card.Content>
    </Card.Root>
  );
};

export const UsingContext: Story = {
  render: () => (
    <Theme accentColor="violet" radius="large" className="min-h-screen p-8">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Theme Context</h1>
        <p className="text-muted-foreground">
          Use the useThemeContext hook to access theme settings.
        </p>
        <ThemeInfo />
      </div>
    </Theme>
  ),
};

// ============================================================================
// Nested Themes
// ============================================================================

export const NestedThemes: Story = {
  render: () => (
    <Theme accentColor="blue" className="p-8">
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Outer Theme (Blue)</h2>
        <Button>Blue Button</Button>

        <Theme accentColor="green" className="p-4 border rounded-lg mt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Nested Theme (Green)</h3>
            <Button>Green Button</Button>

            <Theme accentColor="purple" className="p-4 border rounded-lg">
              <div className="space-y-4">
                <h4 className="font-bold">Deep Nested Theme (Purple)</h4>
                <Button>Purple Button</Button>
              </div>
            </Theme>
          </div>
        </Theme>
      </div>
    </Theme>
  ),
};
