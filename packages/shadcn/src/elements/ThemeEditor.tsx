"use client";

import * as React from "react";
import { cn } from "../lib/utils";

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

  const contextValue: ThemeEditorContextValue = {
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
  };

  // Apply CSS variables to document
  React.useEffect(() => {
    const root = document.documentElement;
    const colors = config.colors[mode];

    // Colors
    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = `--${camelToKebab(key)}`;
      root.style.setProperty(cssVar, value);
    });

    // Typography
    root.style.setProperty("--font-sans", config.typography.fontSans);
    root.style.setProperty("--font-serif", config.typography.fontSerif);
    root.style.setProperty("--font-mono", config.typography.fontMono);
    root.style.setProperty("--letter-spacing", config.typography.letterSpacing);

    // Layout
    root.style.setProperty("--radius", config.layout.radius);
    root.style.setProperty("--spacing", config.layout.spacing);

    // Shadow
    root.style.setProperty("--shadow-color", config.shadow.color);
    root.style.setProperty("--shadow-opacity", config.shadow.opacity);
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
    --font-sans: ${config.typography.fontSans};
    --font-serif: ${config.typography.fontSerif};
    --font-mono: ${config.typography.fontMono};
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

  React.useEffect(() => {
    setHsl(parseHSL(value));
  }, [value]);

  const handleChange = (component: "h" | "s" | "l", newValue: number) => {
    const updated = { ...hsl, [component]: newValue };
    setHsl(updated);
    onChange(`${updated.h} ${updated.s}% ${updated.l}%`);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground">{label}</label>
        <div
          className="h-5 w-10 rounded border"
          style={{ backgroundColor: `hsl(${value})` }}
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-[10px] text-muted-foreground">H</label>
          <input
            type="number"
            min="0"
            max="360"
            value={Math.round(hsl.h)}
            onChange={(e) => handleChange("h", Number(e.target.value))}
            className="w-full rounded border bg-background px-2 py-1 text-xs"
          />
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground">S</label>
          <input
            type="number"
            min="0"
            max="100"
            value={Math.round(hsl.s)}
            onChange={(e) => handleChange("s", Number(e.target.value))}
            className="w-full rounded border bg-background px-2 py-1 text-xs"
          />
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground">L</label>
          <input
            type="number"
            min="0"
            max="100"
            value={Math.round(hsl.l)}
            onChange={(e) => handleChange("l", Number(e.target.value))}
            className="w-full rounded border bg-background px-2 py-1 text-xs"
          />
        </div>
      </div>
    </div>
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
  const [copied, setCopied] = React.useState(false);

  const colors = editor.config.colors[editor.mode];

  // Helper to convert HSL string to CSS hsl() format
  const hsl = (value: string) => `hsl(${value})`;

  // Current primary color for visual feedback
  const primaryColor = hsl(colors.primary);
  const primaryFgColor = hsl(colors.primaryForeground);

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

  const handleCopyCSS = async () => {
    await navigator.clipboard.writeText(editor.exportCSS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Header */}
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Theme Editor</h2>
        <p className="text-sm text-muted-foreground">Customize your theme colors and styles</p>
      </div>

      {/* Presets */}
      <div className="border-b p-4">
        <label className="text-sm font-medium mb-2 block">Presets</label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(presetThemes).map((preset) => {
            const presetColors = presetThemes[preset]?.colors?.[editor.mode];
            const presetPrimary = presetColors?.primary || defaultThemeConfig.colors[editor.mode].primary;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => editor.applyPreset(preset)}
                className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm capitalize hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <span
                  className="w-3 h-3 rounded-full border border-gray-400"
                  style={{ backgroundColor: `hsl(${presetPrimary})` }}
                />
                {preset}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Color Preview */}
      <div className="border-b p-4">
        <label className="text-sm font-medium mb-2 block">Current Primary</label>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-lg border border-gray-300"
            style={{ backgroundColor: primaryColor }}
          />
          <div className="text-sm">
            <div className="font-mono text-gray-600">{colors.primary}</div>
            <div className="text-gray-500">HSL values</div>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="border-b p-4">
        <label className="text-sm font-medium mb-2 block">Mode</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => editor.setMode("light")}
            style={editor.mode === "light" ? { backgroundColor: primaryColor, color: primaryFgColor } : undefined}
            className={cn(
              "flex-1 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors",
              editor.mode === "light"
                ? ""
                : "border border-gray-300 hover:bg-gray-100",
            )}
          >
            Light
          </button>
          <button
            type="button"
            onClick={() => editor.setMode("dark")}
            style={editor.mode === "dark" ? { backgroundColor: primaryColor, color: primaryFgColor } : undefined}
            className={cn(
              "flex-1 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors",
              editor.mode === "dark"
                ? ""
                : "border border-gray-300 hover:bg-gray-100",
            )}
          >
            Dark
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex">
          {(["colors", "typography", "layout", "export"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={activeTab === tab ? { borderBottomColor: primaryColor } : undefined}
              className={cn(
                "flex-1 py-2 text-sm font-medium capitalize border-b-2 transition-colors cursor-pointer",
                activeTab === tab
                  ? "text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-900",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === "colors" && (
          <div className="space-y-6">
            {colorGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-medium mb-3">{group.title}</h3>
                <div className="space-y-4">
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
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "typography" && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Font Sans</label>
              <input
                type="text"
                value={editor.config.typography.fontSans}
                onChange={(e) => editor.updateTypography({ fontSans: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Font Serif</label>
              <input
                type="text"
                value={editor.config.typography.fontSerif}
                onChange={(e) => editor.updateTypography({ fontSerif: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Font Mono</label>
              <input
                type="text"
                value={editor.config.typography.fontMono}
                onChange={(e) => editor.updateTypography({ fontMono: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Letter Spacing</label>
              <input
                type="text"
                value={editor.config.typography.letterSpacing}
                onChange={(e) => editor.updateTypography({ letterSpacing: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="e.g., 0em, 0.05em"
              />
            </div>
          </div>
        )}

        {activeTab === "layout" && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Border Radius</label>
              <input
                type="text"
                value={editor.config.layout.radius}
                onChange={(e) => editor.updateLayout({ radius: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="e.g., 0.5rem"
              />
              <div className="flex gap-2 mt-2">
                {["0", "0.25rem", "0.5rem", "0.75rem", "1rem"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => editor.updateLayout({ radius: r })}
                    style={editor.config.layout.radius === r ? { backgroundColor: primaryColor, color: primaryFgColor } : undefined}
                    className={cn(
                      "px-2 py-1 text-xs rounded border border-gray-300 cursor-pointer transition-colors",
                      editor.config.layout.radius !== r && "hover:bg-gray-100",
                    )}
                  >
                    {r || "0"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Base Spacing</label>
              <input
                type="text"
                value={editor.config.layout.spacing}
                onChange={(e) => editor.updateLayout({ spacing: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="e.g., 0.25rem"
              />
            </div>
          </div>
        )}

        {activeTab === "export" && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopyCSS}
                style={{ backgroundColor: primaryColor, color: primaryFgColor }}
                className="flex-1 rounded-md px-4 py-2 text-sm cursor-pointer transition-opacity hover:opacity-90"
              >
                {copied ? "Copied!" : "Copy CSS"}
              </button>
              <button
                type="button"
                onClick={editor.resetToDefault}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                Reset
              </button>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">CSS Output</label>
              <pre className="rounded-md border border-gray-200 bg-gray-50 p-4 text-xs overflow-auto max-h-96 font-mono">
                {editor.exportCSS()}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ThemeEditor.displayName = "ThemeEditor";

// ============================================================================
// Component Preview
// ============================================================================

export const ThemePreview: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("space-y-6 p-6", className)}>
      {/* Buttons */}
      <div>
        <h3 className="text-sm font-medium mb-3">Buttons</h3>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
            Primary
          </button>
          <button className="rounded-md bg-secondary px-4 py-2 text-sm text-secondary-foreground">
            Secondary
          </button>
          <button className="rounded-md bg-destructive px-4 py-2 text-sm text-destructive-foreground">
            Destructive
          </button>
          <button className="rounded-md border px-4 py-2 text-sm hover:bg-accent">
            Outline
          </button>
        </div>
      </div>

      {/* Cards */}
      <div>
        <h3 className="text-sm font-medium mb-3">Card</h3>
        <div className="rounded-lg border bg-card p-4 text-card-foreground">
          <h4 className="font-semibold">Card Title</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Card description with muted text.
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div>
        <h3 className="text-sm font-medium mb-3">Inputs</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Text input..."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-input"
            />
            <label className="text-sm">Checkbox label</label>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="text-sm font-medium mb-3">Badges</h3>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs text-primary-foreground">
            Primary
          </span>
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
            Secondary
          </span>
          <span className="rounded-full bg-destructive px-2.5 py-0.5 text-xs text-destructive-foreground">
            Destructive
          </span>
          <span className="rounded-full border px-2.5 py-0.5 text-xs">
            Outline
          </span>
        </div>
      </div>

      {/* Alert */}
      <div>
        <h3 className="text-sm font-medium mb-3">Alert</h3>
        <div className="rounded-lg border bg-muted p-4">
          <p className="text-sm font-medium">Heads up!</p>
          <p className="text-sm text-muted-foreground mt-1">
            You can customize this theme using the editor panel.
          </p>
        </div>
      </div>
    </div>
  );
};

ThemePreview.displayName = "ThemePreview";
