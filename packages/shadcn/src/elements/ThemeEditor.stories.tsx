import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
  ThemeEditorProvider,
  ThemeEditor,
  ThemePreview,
  useThemeEditor,
  presetThemes,
} from "./ThemeEditor";
import { Button } from "./Button";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Switch } from "./Switch";
import { Slider } from "./Slider";
import { Progress } from "./Progress";

const meta: Meta<typeof ThemeEditor> = {
  title: "Elements/ThemeEditor",
  component: ThemeEditor,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  // ThemeEditorProvider is now provided globally in preview.tsx
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Basic Editor
// ============================================================================

export const Default: Story = {
  render: () => (
    <div className="flex h-screen">
      <div className="w-80 border-r bg-background overflow-hidden">
        <ThemeEditor />
      </div>
      <div className="flex-1 overflow-auto bg-background">
        <ThemePreview />
      </div>
    </div>
  ),
};

// ============================================================================
// Editor Only
// ============================================================================

export const EditorOnly: Story = {
  render: () => (
    <div className="w-96 h-[600px] border rounded-lg overflow-hidden">
      <ThemeEditor />
    </div>
  ),
};

// ============================================================================
// Preview Only
// ============================================================================

export const PreviewOnly: Story = {
  render: () => (
    <div className="p-8 bg-background">
      <ThemePreview className="max-w-2xl mx-auto border rounded-lg" />
    </div>
  ),
};

// ============================================================================
// With Custom Components
// ============================================================================

const ComponentShowcase: React.FC = () => {
  const editor = useThemeEditor();

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Component Showcase</h2>
        <p className="text-muted-foreground">
          Current mode: <span className="font-medium">{editor.mode}</span>
        </p>
      </div>

      {/* Buttons */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Buttons</h3>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Cards</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card.Root>
            <Card.Header>
              <Card.Title>Card Title</Card.Title>
              <Card.Description>Card description goes here</Card.Description>
            </Card.Header>
            <Card.Content>
              <p>Card content with your customized theme.</p>
            </Card.Content>
          </Card.Root>
          <Card.Root>
            <Card.Header>
              <Card.Title>Another Card</Card.Title>
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
      </section>

      {/* Badges */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge color="primary">Primary</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="error">Error</Badge>
        </div>
      </section>
    </div>
  );
};

export const WithCustomComponents: Story = {
  render: () => (
    <div className="flex h-screen">
      <div className="w-80 border-r bg-background overflow-hidden">
        <ThemeEditor />
      </div>
      <div className="flex-1 overflow-auto bg-background">
        <ComponentShowcase />
      </div>
    </div>
  ),
};

// ============================================================================
// Preset Gallery
// ============================================================================

const PresetCard: React.FC<{ name: string }> = ({ name }) => {
  return (
    <ThemeEditorProvider>
      <PresetApplier preset={name} />
    </ThemeEditorProvider>
  );
};

const PresetApplier: React.FC<{ preset: string }> = ({ preset }) => {
  const editor = useThemeEditor();

  React.useEffect(() => {
    editor.applyPreset(preset);
  }, [preset, editor]);

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h4 className="font-medium capitalize">{preset}</h4>
      <div className="flex gap-2">
        <button className="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground">
          Primary
        </button>
        <button className="rounded-md bg-secondary px-3 py-1.5 text-xs text-secondary-foreground">
          Secondary
        </button>
      </div>
      <div className="flex gap-2">
        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">
          Badge
        </span>
        <span className="rounded border px-2 py-0.5 text-[10px]">
          Outline
        </span>
      </div>
    </div>
  );
};

export const PresetGallery: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Preset Themes</h2>
      <div className="grid grid-cols-4 gap-4">
        {Object.keys(presetThemes).map((preset) => (
          <PresetCard key={preset} name={preset} />
        ))}
      </div>
    </div>
  ),
};

// ============================================================================
// Export Demo
// ============================================================================

const ExportDemo: React.FC = () => {
  const editor = useThemeEditor();
  const [showJSON, setShowJSON] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    const content = showJSON ? editor.exportJSON() : editor.exportCSS();
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Export Configuration</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowJSON(false)}
            className={`px-3 py-1.5 rounded-md text-sm ${!showJSON ? "bg-primary text-primary-foreground" : "border"}`}
          >
            CSS
          </button>
          <button
            onClick={() => setShowJSON(true)}
            className={`px-3 py-1.5 rounded-md text-sm ${showJSON ? "bg-primary text-primary-foreground" : "border"}`}
          >
            JSON
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-md text-sm border hover:bg-accent"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <pre className="rounded-lg border bg-muted p-4 text-sm overflow-auto max-h-[500px]">
        {showJSON ? editor.exportJSON() : editor.exportCSS()}
      </pre>
    </div>
  );
};

export const ExportConfiguration: Story = {
  render: () => (
    <div className="flex h-screen">
      <div className="w-80 border-r bg-background overflow-hidden">
        <ThemeEditor />
      </div>
      <div className="flex-1 overflow-auto bg-background">
        <ExportDemo />
      </div>
    </div>
  ),
};

// ============================================================================
// Dark Mode
// ============================================================================

const DarkModeDemo: React.FC = () => {
  const editor = useThemeEditor();

  return (
    <div className={editor.mode === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Dark Mode Demo</h1>
            <div className="flex gap-2">
              <button
                onClick={() => editor.setMode("light")}
                className={`px-4 py-2 rounded-md text-sm ${editor.mode === "light" ? "bg-primary text-primary-foreground" : "border"}`}
              >
                Light
              </button>
              <button
                onClick={() => editor.setMode("dark")}
                className={`px-4 py-2 rounded-md text-sm ${editor.mode === "dark" ? "bg-primary text-primary-foreground" : "border"}`}
              >
                Dark
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card.Root>
              <Card.Header>
                <Card.Title>Theme-aware Card</Card.Title>
                <Card.Description>This card adapts to the current theme mode</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <Button className="w-full">Primary Action</Button>
                  <Button variant="outline" className="w-full">Secondary Action</Button>
                </div>
              </Card.Content>
            </Card.Root>

            <Card.Root>
              <Card.Header>
                <Card.Title>Color Tokens</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Background:</span>
                    <code className="bg-muted px-2 py-0.5 rounded">{editor.config.colors[editor.mode].background}</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Primary:</span>
                    <code className="bg-muted px-2 py-0.5 rounded">{editor.config.colors[editor.mode].primary}</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Muted:</span>
                    <code className="bg-muted px-2 py-0.5 rounded">{editor.config.colors[editor.mode].muted}</code>
                  </div>
                </div>
              </Card.Content>
            </Card.Root>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DarkMode: Story = {
  render: () => (
    <div className="flex h-screen">
      <div className="w-80 border-r bg-background overflow-hidden">
        <ThemeEditor />
      </div>
      <div className="flex-1 overflow-auto">
        <DarkModeDemo />
      </div>
    </div>
  ),
};
