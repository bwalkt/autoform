"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "./Button";
import { TextField } from "./TextField";
import { Tabs } from "./Tabs";
import { SegmentedControl } from "./SegmentedControl";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { ScrollArea } from "./ScrollArea";
import { Code } from "../typography";
import { Flex, Box } from "../layouts";
import { useClipboard } from "../hooks";

// ============================================================================
// Theme Configuration Types
// ============================================================================

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

export interface ThemeTypography {
  fontSans: string;
  fontSerif: string;
  fontMono: string;
  letterSpacing: string;
}

export interface ThemeLayout {
  radius: string;
  spacing: string;
}

export interface ThemeShadow {
  color: string;
  opacity: string;
  blur: string;
  spread: string;
  offsetX: string;
  offsetY: string;
}

export interface ThemeConfig {
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  typography: ThemeTypography;
  layout: ThemeLayout;
  shadow: ThemeShadow;
}

// ============================================================================
// Default Theme Configuration
// ============================================================================

export const defaultThemeConfig: ThemeConfig = {
  colors: {
    light: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      cardForeground: "240 10% 3.9%",
      popover: "0 0% 100%",
      popoverForeground: "240 10% 3.9%",
      primary: "240 5.9% 10%",
      primaryForeground: "0 0% 98%",
      secondary: "240 4.8% 95.9%",
      secondaryForeground: "240 5.9% 10%",
      muted: "240 4.8% 95.9%",
      mutedForeground: "240 3.8% 46.1%",
      accent: "240 4.8% 95.9%",
      accentForeground: "240 5.9% 10%",
      destructive: "0 84.2% 60.2%",
      destructiveForeground: "0 0% 98%",
      border: "240 5.9% 90%",
      input: "240 5.9% 90%",
      ring: "240 5.9% 10%",
    },
    dark: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      card: "240 10% 3.9%",
      cardForeground: "0 0% 98%",
      popover: "240 10% 3.9%",
      popoverForeground: "0 0% 98%",
      primary: "0 0% 98%",
      primaryForeground: "240 5.9% 10%",
      secondary: "240 3.7% 15.9%",
      secondaryForeground: "0 0% 98%",
      muted: "240 3.7% 15.9%",
      mutedForeground: "240 5% 64.9%",
      accent: "240 3.7% 15.9%",
      accentForeground: "0 0% 98%",
      destructive: "0 62.8% 30.6%",
      destructiveForeground: "0 0% 98%",
      border: "240 3.7% 15.9%",
      input: "240 3.7% 15.9%",
      ring: "240 4.9% 83.9%",
    },
  },
  typography: {
    fontSans: "ui-sans-serif, system-ui, sans-serif",
    fontSerif: "ui-serif, Georgia, serif",
    fontMono: "ui-monospace, monospace",
    letterSpacing: "0em",
  },
  layout: {
    radius: "0.5rem",
    spacing: "0.25rem",
  },
  shadow: {
    color: "0 0% 0%",
    opacity: "0.1",
    blur: "10px",
    spread: "0px",
    offsetX: "0px",
    offsetY: "4px",
  },
};

// ============================================================================
// Preset Themes
// ============================================================================

export const presetThemes: Record<string, Partial<ThemeConfig>> = {
  default: defaultThemeConfig,
  zinc: {
    colors: {
      light: {
        ...defaultThemeConfig.colors.light,
        primary: "240 5.9% 10%",
        primaryForeground: "0 0% 98%",
      },
      dark: {
        ...defaultThemeConfig.colors.dark,
        primary: "0 0% 98%",
        primaryForeground: "240 5.9% 10%",
      },
    },
  },
  slate: {
    colors: {
      light: {
        ...defaultThemeConfig.colors.light,
        primary: "215.4 16.3% 46.9%",
        primaryForeground: "210 40% 98%",
      },
      dark: {
        ...defaultThemeConfig.colors.dark,
        primary: "210 40% 98%",
        primaryForeground: "222.2 47.4% 11.2%",
      },
    },
  },
  rose: {
    colors: {
      light: {
        ...defaultThemeConfig.colors.light,
        primary: "346.8 77.2% 49.8%",
        primaryForeground: "355.7 100% 97.3%",
      },
      dark: {
        ...defaultThemeConfig.colors.dark,
        primary: "346.8 77.2% 49.8%",
        primaryForeground: "355.7 100% 97.3%",
      },
    },
  },
  blue: {
    colors: {
      light: {
        ...defaultThemeConfig.colors.light,
        primary: "221.2 83.2% 53.3%",
        primaryForeground: "210 40% 98%",
      },
      dark: {
        ...defaultThemeConfig.colors.dark,
        primary: "217.2 91.2% 59.8%",
        primaryForeground: "222.2 47.4% 11.2%",
      },
    },
  },
  green: {
    colors: {
      light: {
        ...defaultThemeConfig.colors.light,
        primary: "142.1 76.2% 36.3%",
        primaryForeground: "355.7 100% 97.3%",
      },
      dark: {
        ...defaultThemeConfig.colors.dark,
        primary: "142.1 70.6% 45.3%",
        primaryForeground: "144.9 80.4% 10%",
      },
    },
  },
  orange: {
    colors: {
      light: {
        ...defaultThemeConfig.colors.light,
        primary: "24.6 95% 53.1%",
        primaryForeground: "60 9.1% 97.8%",
      },
      dark: {
        ...defaultThemeConfig.colors.dark,
        primary: "20.5 90.2% 48.2%",
        primaryForeground: "60 9.1% 97.8%",
      },
    },
  },
  violet: {
    colors: {
      light: {
        ...defaultThemeConfig.colors.light,
        primary: "262.1 83.3% 57.8%",
        primaryForeground: "210 40% 98%",
      },
      dark: {
        ...defaultThemeConfig.colors.dark,
        primary: "263.4 70% 50.4%",
        primaryForeground: "210 40% 98%",
      },
    },
  },
};

// ============================================================================
// Theme Editor Context
// ============================================================================

interface ThemeEditorContextValue {
  config: ThemeConfig;
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
  updateColors: (mode: "light" | "dark", colors: Partial<ThemeColors>) => void;
  updateTypography: (typography: Partial<ThemeTypography>) => void;
  updateLayout: (layout: Partial<ThemeLayout>) => void;
  updateShadow: (shadow: Partial<ThemeShadow>) => void;
  applyPreset: (presetName: string) => void;
  resetToDefault: () => void;
  exportCSS: () => string;
  exportJSON: () => string;
}

const ThemeEditorContext = React.createContext<ThemeEditorContextValue | null>(null);

export function useThemeEditor() {
  const context = React.useContext(ThemeEditorContext);
  if (!context) {
    throw new Error("useThemeEditor must be used within ThemeEditorProvider");
  }
  return context;
}

// ============================================================================
// Theme Editor Provider
// ============================================================================

export interface ThemeEditorProviderProps {
  children: React.ReactNode;
  defaultConfig?: ThemeConfig;
}

export const ThemeEditorProvider: React.FC<ThemeEditorProviderProps> = ({
  children,
  defaultConfig = defaultThemeConfig,
}) => {
  const [config, setConfig] = React.useState<ThemeConfig>(defaultConfig);
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const updateColors = React.useCallback(
    (targetMode: "light" | "dark", colors: Partial<ThemeColors>) => {
      setConfig((prev) => ({
        ...prev,
        colors: {
          ...prev.colors,
          [targetMode]: { ...prev.colors[targetMode], ...colors },
        },
      }));
    },
    [],
  );

  const updateTypography = React.useCallback(
    (typography: Partial<ThemeTypography>) => {
      setConfig((prev) => ({
        ...prev,
        typography: { ...prev.typography, ...typography },
      }));
    },
    [],
  );

  const updateLayout = React.useCallback((layout: Partial<ThemeLayout>) => {
    setConfig((prev) => ({
      ...prev,
      layout: { ...prev.layout, ...layout },
    }));
  }, []);

  const updateShadow = React.useCallback((shadow: Partial<ThemeShadow>) => {
    setConfig((prev) => ({
      ...prev,
      shadow: { ...prev.shadow, ...shadow },
    }));
  }, []);

  const applyPreset = React.useCallback((presetName: string) => {
    const preset = presetThemes[presetName];
    if (preset) {
      setConfig((prev) => ({
        ...prev,
        ...preset,
        colors: {
          light: { ...prev.colors.light, ...preset.colors?.light },
          dark: { ...prev.colors.dark, ...preset.colors?.dark },
        },
      }));
    }
  }, []);

  const resetToDefault = React.useCallback(() => {
    setConfig(defaultThemeConfig);
  }, []);

  const exportCSS = React.useCallback(() => {
    return generateCSS(config);
  }, [config]);

  const exportJSON = React.useCallback(() => {
    return JSON.stringify(config, null, 2);
  }, [config]);

  const contextValue = React.useMemo<ThemeEditorContextValue>(
    () => ({
      config,
      mode,
      setMode,
      updateColors,
      updateTypography,
      updateLayout,
      updateShadow,
      applyPreset,
      resetToDefault,
      exportCSS,
      exportJSON,
    }),
    [
      config,
      mode,
      updateColors,
      updateTypography,
      updateLayout,
      updateShadow,
      applyPreset,
      resetToDefault,
      exportCSS,
      exportJSON,
    ],
  );

  // Apply CSS variables to document
  React.useEffect(() => {
    const root = document.documentElement;
    const colors = config.colors[mode];
    const setVars: string[] = [];

    // Colors
    for (const [key, value] of Object.entries(colors)) {
      const cssVar = `--${camelToKebab(key)}`;
      root.style.setProperty(cssVar, value);
      setVars.push(cssVar);
    }

    // Typography
    root.style.setProperty("--font-sans", config.typography.fontSans);
    root.style.setProperty("--font-serif", config.typography.fontSerif);
    root.style.setProperty("--font-mono", config.typography.fontMono);
    root.style.setProperty("--letter-spacing", config.typography.letterSpacing);
    setVars.push("--font-sans", "--font-serif", "--font-mono", "--letter-spacing");

    // Layout
    root.style.setProperty("--radius", config.layout.radius);
    root.style.setProperty("--spacing", config.layout.spacing);
    setVars.push("--radius", "--spacing");

    // Shadow
    root.style.setProperty("--shadow-color", config.shadow.color);
    root.style.setProperty("--shadow-opacity", config.shadow.opacity);
    setVars.push("--shadow-color", "--shadow-opacity");

    return () => {
      for (const v of setVars) {
        root.style.removeProperty(v);
      }
    };
  }, [config, mode]);

  return (
    <ThemeEditorContext.Provider value={contextValue}>
      {children}
    </ThemeEditorContext.Provider>
  );
};

// ============================================================================
// Helper Functions
// ============================================================================

function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function generateCSS(config: ThemeConfig): string {
  const generateColorVars = (colors: ThemeColors) => {
    return Object.entries(colors)
      .map(([key, value]) => `    --${camelToKebab(key)}: ${value};`)
      .join("\n");
  };

  return `@layer base {
  :root {
${generateColorVars(config.colors.light)}
    --radius: ${config.layout.radius};
    --spacing: ${config.layout.spacing};
    --font-sans: ${config.typography.fontSans};
    --font-serif: ${config.typography.fontSerif};
    --font-mono: ${config.typography.fontMono};
    --letter-spacing: ${config.typography.letterSpacing};
    --shadow-color: ${config.shadow.color};
    --shadow-opacity: ${config.shadow.opacity};
  }

  .dark {
${generateColorVars(config.colors.dark)}
  }
}`;
}

// ============================================================================
// Color Input Component
// ============================================================================

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => {
  const [hsl, setHsl] = React.useState(() => parseHSL(value));
  const inputId = label.toLowerCase().replace(/\s+/g, "-");

  React.useEffect(() => {
    setHsl(parseHSL(value));
  }, [value]);

  const handleChange = (component: "h" | "s" | "l", newValue: number) => {
    const updated = { ...hsl, [component]: newValue };
    setHsl(updated);
    onChange(`${updated.h} ${updated.s}% ${updated.l}%`);
  };

  return (
    <Flex direction="column" gap="2">
      <Flex justify="between" align="center">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <Box
          className="h-5 w-10 rounded border"
          style={{ backgroundColor: `hsl(${value})` }}
        />
      </Flex>
      <Flex gap="2">
        <Box className="flex-1">
          <label htmlFor={`${inputId}-h`} className="text-[10px] text-muted-foreground block mb-1">H</label>
          <TextField
            id={`${inputId}-h`}
            type="number"
            size="1"
            value={String(Math.round(hsl.h))}
            onChange={(e) => handleChange("h", Number(e.target.value))}
          />
        </Box>
        <Box className="flex-1">
          <label htmlFor={`${inputId}-s`} className="text-[10px] text-muted-foreground block mb-1">S</label>
          <TextField
            id={`${inputId}-s`}
            type="number"
            size="1"
            value={String(Math.round(hsl.s))}
            onChange={(e) => handleChange("s", Number(e.target.value))}
          />
        </Box>
        <Box className="flex-1">
          <label htmlFor={`${inputId}-l`} className="text-[10px] text-muted-foreground block mb-1">L</label>
          <TextField
            id={`${inputId}-l`}
            type="number"
            size="1"
            value={String(Math.round(hsl.l))}
            onChange={(e) => handleChange("l", Number(e.target.value))}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

function parseHSL(value: string): { h: number; s: number; l: number } {
  const parts = value.split(" ").map((p) => parseFloat(p.replace("%", "")));
  return { h: parts[0] || 0, s: parts[1] || 0, l: parts[2] || 0 };
}

// ============================================================================
// Theme Editor UI Component
// ============================================================================

export interface ThemeEditorProps {
  className?: string;
}

export const ThemeEditor: React.FC<ThemeEditorProps> = ({ className }) => {
  const editor = useThemeEditor();
  const [activeTab, setActiveTab] = React.useState<"colors" | "typography" | "layout" | "export">("colors");
  const clipboard = useClipboard();

  const colors = editor.config.colors[editor.mode];

  // Helper to convert HSL string to CSS hsl() format
  const hsl = (value: string) => `hsl(${value})`;

  // Current primary color for visual feedback
  const primaryColor = hsl(colors.primary);

  const colorGroups = [
    {
      title: "Base",
      colors: [
        { key: "background", label: "Background" },
        { key: "foreground", label: "Foreground" },
      ],
    },
    {
      title: "Primary",
      colors: [
        { key: "primary", label: "Primary" },
        { key: "primaryForeground", label: "Primary Foreground" },
      ],
    },
    {
      title: "Secondary",
      colors: [
        { key: "secondary", label: "Secondary" },
        { key: "secondaryForeground", label: "Secondary Foreground" },
      ],
    },
    {
      title: "Muted",
      colors: [
        { key: "muted", label: "Muted" },
        { key: "mutedForeground", label: "Muted Foreground" },
      ],
    },
    {
      title: "Accent",
      colors: [
        { key: "accent", label: "Accent" },
        { key: "accentForeground", label: "Accent Foreground" },
      ],
    },
    {
      title: "Card",
      colors: [
        { key: "card", label: "Card" },
        { key: "cardForeground", label: "Card Foreground" },
      ],
    },
    {
      title: "Popover",
      colors: [
        { key: "popover", label: "Popover" },
        { key: "popoverForeground", label: "Popover Foreground" },
      ],
    },
    {
      title: "Destructive",
      colors: [
        { key: "destructive", label: "Destructive" },
        { key: "destructiveForeground", label: "Destructive Foreground" },
      ],
    },
    {
      title: "Border & Input",
      colors: [
        { key: "border", label: "Border" },
        { key: "input", label: "Input" },
        { key: "ring", label: "Ring" },
      ],
    },
  ];

  const handleCopyCSS = () => {
    clipboard.copy(editor.exportCSS());
  };

  return (
    <Flex direction="column" className={cn("h-full", className)}>
      {/* Header */}
      <Box className="border-b p-4">
        <h2 className="text-lg font-semibold">Theme Editor</h2>
        <p className="text-sm text-muted-foreground">Customize your theme colors and styles</p>
      </Box>

      {/* Presets */}
      <Box className="border-b p-4">
        <label className="text-sm font-medium mb-2 block">Presets</label>
        <Flex wrap="wrap" gap="2">
          {Object.keys(presetThemes).map((preset) => {
            const presetColors = presetThemes[preset]?.colors?.[editor.mode];
            const presetPrimary = presetColors?.primary || defaultThemeConfig.colors[editor.mode].primary;
            return (
              <Button
                key={preset}
                variant="outline"
                size="1"
                onClick={() => editor.applyPreset(preset)}
                className="capitalize"
              >
                <span
                  className="w-3 h-3 rounded-full border"
                  style={{ backgroundColor: `hsl(${presetPrimary})` }}
                />
                {preset}
              </Button>
            );
          })}
        </Flex>
      </Box>

      {/* Current Color Preview */}
      <Box className="border-b p-4">
        <label className="text-sm font-medium mb-2 block">Current Primary</label>
        <Flex align="center" gap="3">
          <Box
            className="w-12 h-12 rounded-lg border"
            style={{ backgroundColor: primaryColor }}
          />
          <Box className="text-sm">
            <Code size="2">{colors.primary}</Code>
            <p className="text-muted-foreground text-xs mt-1">HSL values</p>
          </Box>
        </Flex>
      </Box>

      {/* Mode Toggle */}
      <Box className="border-b p-4">
        <label className="text-sm font-medium mb-2 block">Mode</label>
        <SegmentedControl.Root
          value={editor.mode}
          onValueChange={(value) => editor.setMode(value as "light" | "dark")}
        >
          <SegmentedControl.Item value="light">Light</SegmentedControl.Item>
          <SegmentedControl.Item value="dark">Dark</SegmentedControl.Item>
        </SegmentedControl.Root>
      </Box>

      {/* Tabs */}
      <Tabs.Root value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="flex-1 flex flex-col min-h-0">
        <Tabs.List>
          <Tabs.Trigger value="colors">Colors</Tabs.Trigger>
          <Tabs.Trigger value="typography">Typography</Tabs.Trigger>
          <Tabs.Trigger value="layout">Layout</Tabs.Trigger>
          <Tabs.Trigger value="export">Export</Tabs.Trigger>
        </Tabs.List>

        <ScrollArea className="flex-1">
          <Tabs.Content value="colors" className="p-4">
            <Flex direction="column" gap="6">
              {colorGroups.map((group) => (
                <Box key={group.title}>
                  <h3 className="text-sm font-medium mb-3">{group.title}</h3>
                  <Flex direction="column" gap="4">
                    {group.colors.map(({ key, label }) => (
                      <ColorInput
                        key={key}
                        label={label}
                        value={colors[key as keyof ThemeColors]}
                        onChange={(value) =>
                          editor.updateColors(editor.mode, { [key]: value })
                        }
                      />
                    ))}
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Tabs.Content>

          <Tabs.Content value="typography" className="p-4">
            <Flex direction="column" gap="4">
              <Box>
                <label htmlFor="font-sans" className="text-sm font-medium mb-2 block">Font Sans</label>
                <TextField
                  id="font-sans"
                  value={editor.config.typography.fontSans}
                  onChange={(e) => editor.updateTypography({ fontSans: e.target.value })}
                />
              </Box>
              <Box>
                <label htmlFor="font-serif" className="text-sm font-medium mb-2 block">Font Serif</label>
                <TextField
                  id="font-serif"
                  value={editor.config.typography.fontSerif}
                  onChange={(e) => editor.updateTypography({ fontSerif: e.target.value })}
                />
              </Box>
              <Box>
                <label htmlFor="font-mono" className="text-sm font-medium mb-2 block">Font Mono</label>
                <TextField
                  id="font-mono"
                  value={editor.config.typography.fontMono}
                  onChange={(e) => editor.updateTypography({ fontMono: e.target.value })}
                />
              </Box>
              <Box>
                <label htmlFor="letter-spacing" className="text-sm font-medium mb-2 block">Letter Spacing</label>
                <TextField
                  id="letter-spacing"
                  value={editor.config.typography.letterSpacing}
                  onChange={(e) => editor.updateTypography({ letterSpacing: e.target.value })}
                  placeholder="e.g., 0em, 0.05em"
                />
              </Box>
            </Flex>
          </Tabs.Content>

          <Tabs.Content value="layout" className="p-4">
            <Flex direction="column" gap="4">
              <Box>
                <label htmlFor="border-radius" className="text-sm font-medium mb-2 block">Border Radius</label>
                <TextField
                  id="border-radius"
                  value={editor.config.layout.radius}
                  onChange={(e) => editor.updateLayout({ radius: e.target.value })}
                  placeholder="e.g., 0.5rem"
                />
                <Flex gap="2" className="mt-2">
                  {["0", "0.25rem", "0.5rem", "0.75rem", "1rem"].map((r) => (
                    <Button
                      key={r}
                      size="1"
                      variant={editor.config.layout.radius === r ? "solid" : "outline"}
                      onClick={() => editor.updateLayout({ radius: r })}
                    >
                      {r || "0"}
                    </Button>
                  ))}
                </Flex>
              </Box>
              <Box>
                <label htmlFor="base-spacing" className="text-sm font-medium mb-2 block">Base Spacing</label>
                <TextField
                  id="base-spacing"
                  value={editor.config.layout.spacing}
                  onChange={(e) => editor.updateLayout({ spacing: e.target.value })}
                  placeholder="e.g., 0.25rem"
                />
              </Box>
            </Flex>
          </Tabs.Content>

          <Tabs.Content value="export" className="p-4">
            <Flex direction="column" gap="4">
              <Flex gap="2">
                <Button onClick={handleCopyCSS} className="flex-1">
                  {clipboard.copied ? "Copied!" : "Copy CSS"}
                </Button>
                <Button variant="outline" onClick={editor.resetToDefault}>
                  Reset
                </Button>
              </Flex>
              <Box>
                <label className="text-sm font-medium mb-2 block">CSS Output</label>
                <Card.Root className="p-0">
                  <ScrollArea className="max-h-96">
                    <pre className="p-4 text-xs font-mono whitespace-pre-wrap">
                      {editor.exportCSS()}
                    </pre>
                  </ScrollArea>
                </Card.Root>
              </Box>
            </Flex>
          </Tabs.Content>
        </ScrollArea>
      </Tabs.Root>
    </Flex>
  );
};

ThemeEditor.displayName = "ThemeEditor";

// ============================================================================
// Component Preview
// ============================================================================

export const ThemePreview: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Flex direction="column" gap="6" p="6" className={className}>
      {/* Buttons */}
      <Box>
        <h3 className="text-sm font-medium mb-3">Buttons</h3>
        <Flex wrap="wrap" gap="2">
          <Button>Primary</Button>
          <Button variant="soft">Soft</Button>
          <Button color="error">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </Flex>
      </Box>

      {/* Cards */}
      <Box>
        <h3 className="text-sm font-medium mb-3">Card</h3>
        <Card.Root className="p-4">
          <h4 className="font-semibold">Card Title</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Card description with muted text.
          </p>
        </Card.Root>
      </Box>

      {/* Inputs */}
      <Box>
        <h3 className="text-sm font-medium mb-3">Inputs</h3>
        <Flex direction="column" gap="3">
          <TextField placeholder="Text input..." />
          <Flex align="center" gap="2">
            <input
              type="checkbox"
              id="preview-checkbox"
              className="h-4 w-4 rounded border-input accent-primary"
            />
            <label htmlFor="preview-checkbox" className="text-sm">Checkbox label</label>
          </Flex>
        </Flex>
      </Box>

      {/* Badges */}
      <Box>
        <h3 className="text-sm font-medium mb-3">Badges</h3>
        <Flex wrap="wrap" gap="2">
          <Badge>Primary</Badge>
          <Badge color="neutral">Neutral</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="error">Error</Badge>
          <Badge variant="outline">Outline</Badge>
        </Flex>
      </Box>

      {/* Alert */}
      <Box>
        <h3 className="text-sm font-medium mb-3">Callout</h3>
        <Card.Root className="p-4 bg-muted">
          <p className="text-sm font-medium">Heads up!</p>
          <p className="text-sm text-muted-foreground mt-1">
            You can customize this theme using the editor panel.
          </p>
        </Card.Root>
      </Box>

      {/* Segmented Control */}
      <Box>
        <h3 className="text-sm font-medium mb-3">Segmented Control</h3>
        <SegmentedControl.Root defaultValue="option1">
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
        </SegmentedControl.Root>
      </Box>
    </Flex>
  );
};

ThemePreview.displayName = "ThemePreview";
