"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// Theme Types
// ============================================================================

export type Appearance = "light" | "dark" | "inherit";

export type AccentColor =
  | "gray"
  | "gold"
  | "bronze"
  | "brown"
  | "yellow"
  | "amber"
  | "orange"
  | "tomato"
  | "red"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "lime"
  | "mint"
  | "sky";

export type GrayColor = "auto" | "gray" | "mauve" | "slate" | "sage" | "olive" | "sand";

export type Radius = "none" | "small" | "medium" | "large" | "full";

export type Scaling = "90%" | "95%" | "100%" | "105%" | "110%";

export type PanelBackground = "solid" | "translucent";

// ============================================================================
// Gray Color Matching
// ============================================================================

const accentToGrayMap: Record<AccentColor, GrayColor> = {
  gray: "gray",
  gold: "sand",
  bronze: "sand",
  brown: "sand",
  yellow: "sand",
  amber: "sand",
  orange: "sand",
  tomato: "mauve",
  red: "mauve",
  ruby: "mauve",
  crimson: "mauve",
  pink: "mauve",
  plum: "mauve",
  purple: "mauve",
  violet: "mauve",
  iris: "slate",
  indigo: "slate",
  blue: "slate",
  cyan: "slate",
  teal: "sage",
  jade: "sage",
  green: "sage",
  grass: "sage",
  lime: "olive",
  mint: "sage",
  sky: "slate",
};

function getMatchingGrayColor(accentColor: AccentColor): GrayColor {
  return accentToGrayMap[accentColor] || "gray";
}

// ============================================================================
// Theme Context
// ============================================================================

export interface ThemeContextValue {
  appearance: Appearance;
  accentColor: AccentColor;
  grayColor: GrayColor;
  resolvedGrayColor: GrayColor;
  radius: Radius;
  scaling: Scaling;
  panelBackground: PanelBackground;
  hasBackground: boolean;
  // Change handlers
  onAppearanceChange: (appearance: Appearance) => void;
  onAccentColorChange: (accentColor: AccentColor) => void;
  onGrayColorChange: (grayColor: GrayColor) => void;
  onRadiusChange: (radius: Radius) => void;
  onScalingChange: (scaling: Scaling) => void;
  onPanelBackgroundChange: (panelBackground: PanelBackground) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

export function useThemeContext() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a Theme component");
  }
  return context;
}

// ============================================================================
// Theme Props
// ============================================================================

export interface ThemeProps {
  /** Visual appearance mode */
  appearance?: Appearance;
  /** Accent color for interactive elements */
  accentColor?: AccentColor;
  /** Gray color palette */
  grayColor?: GrayColor;
  /** Border radius scale */
  radius?: Radius;
  /** UI scaling factor */
  scaling?: Scaling;
  /** Panel background style */
  panelBackground?: PanelBackground;
  /** Whether to render a background */
  hasBackground?: boolean;
  /** Callback when appearance changes */
  onAppearanceChange?: (appearance: Appearance) => void;
  /** Callback when accent color changes */
  onAccentColorChange?: (accentColor: AccentColor) => void;
  /** Callback when gray color changes */
  onGrayColorChange?: (grayColor: GrayColor) => void;
  /** Callback when radius changes */
  onRadiusChange?: (radius: Radius) => void;
  /** Callback when scaling changes */
  onScalingChange?: (scaling: Scaling) => void;
  /** Callback when panel background changes */
  onPanelBackgroundChange?: (panelBackground: PanelBackground) => void;
  /** Render as child element */
  asChild?: boolean;
  /** Additional class names */
  className?: string;
  /** Children elements */
  children: React.ReactNode;
}

// ============================================================================
// Theme Component
// ============================================================================

export const Theme = React.forwardRef<HTMLDivElement, ThemeProps>(
  (
    {
      appearance: appearanceProp = "inherit",
      accentColor: accentColorProp = "indigo",
      grayColor: grayColorProp = "auto",
      radius: radiusProp = "medium",
      scaling: scalingProp = "100%",
      panelBackground: panelBackgroundProp = "translucent",
      hasBackground: hasBackgroundProp = true,
      onAppearanceChange: onAppearanceChangeProp,
      onAccentColorChange: onAccentColorChangeProp,
      onGrayColorChange: onGrayColorChangeProp,
      onRadiusChange: onRadiusChangeProp,
      onScalingChange: onScalingChangeProp,
      onPanelBackgroundChange: onPanelBackgroundChangeProp,
      asChild = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // State for controlled/uncontrolled mode
    const [appearance, setAppearance] = React.useState<Appearance>(appearanceProp);
    const [accentColor, setAccentColor] = React.useState<AccentColor>(accentColorProp);
    const [grayColor, setGrayColor] = React.useState<GrayColor>(grayColorProp);
    const [radius, setRadius] = React.useState<Radius>(radiusProp);
    const [scaling, setScaling] = React.useState<Scaling>(scalingProp);
    const [panelBackground, setPanelBackground] = React.useState<PanelBackground>(panelBackgroundProp);

    // Sync with props
    React.useEffect(() => setAppearance(appearanceProp), [appearanceProp]);
    React.useEffect(() => setAccentColor(accentColorProp), [accentColorProp]);
    React.useEffect(() => setGrayColor(grayColorProp), [grayColorProp]);
    React.useEffect(() => setRadius(radiusProp), [radiusProp]);
    React.useEffect(() => setScaling(scalingProp), [scalingProp]);
    React.useEffect(() => setPanelBackground(panelBackgroundProp), [panelBackgroundProp]);

    // Resolve gray color
    const resolvedGrayColor = grayColor === "auto" ? getMatchingGrayColor(accentColor) : grayColor;

    // Change handlers
    const handleAppearanceChange = React.useCallback(
      (value: Appearance) => {
        setAppearance(value);
        onAppearanceChangeProp?.(value);
      },
      [onAppearanceChangeProp],
    );

    const handleAccentColorChange = React.useCallback(
      (value: AccentColor) => {
        setAccentColor(value);
        onAccentColorChangeProp?.(value);
      },
      [onAccentColorChangeProp],
    );

    const handleGrayColorChange = React.useCallback(
      (value: GrayColor) => {
        setGrayColor(value);
        onGrayColorChangeProp?.(value);
      },
      [onGrayColorChangeProp],
    );

    const handleRadiusChange = React.useCallback(
      (value: Radius) => {
        setRadius(value);
        onRadiusChangeProp?.(value);
      },
      [onRadiusChangeProp],
    );

    const handleScalingChange = React.useCallback(
      (value: Scaling) => {
        setScaling(value);
        onScalingChangeProp?.(value);
      },
      [onScalingChangeProp],
    );

    const handlePanelBackgroundChange = React.useCallback(
      (value: PanelBackground) => {
        setPanelBackground(value);
        onPanelBackgroundChangeProp?.(value);
      },
      [onPanelBackgroundChangeProp],
    );

    // Context value
    const contextValue: ThemeContextValue = {
      appearance,
      accentColor,
      grayColor,
      resolvedGrayColor,
      radius,
      scaling,
      panelBackground,
      hasBackground: hasBackgroundProp,
      onAppearanceChange: handleAppearanceChange,
      onAccentColorChange: handleAccentColorChange,
      onGrayColorChange: handleGrayColorChange,
      onRadiusChange: handleRadiusChange,
      onScalingChange: handleScalingChange,
      onPanelBackgroundChange: handlePanelBackgroundChange,
    };

    // CSS custom properties for theming
    const themeStyles: React.CSSProperties = {
      "--theme-accent-color": accentColor,
      "--theme-gray-color": resolvedGrayColor,
      "--theme-radius": getRadiusValue(radius),
      "--theme-scaling": scaling,
    } as React.CSSProperties;

    const themeClassName = cn(
      "radix-themes",
      appearance === "light" && "light",
      appearance === "dark" && "dark",
      hasBackgroundProp && "bg-background text-foreground",
      className,
    );

    const themeDataAttributes = {
      "data-accent-color": accentColor,
      "data-gray-color": resolvedGrayColor,
      "data-radius": radius,
      "data-scaling": scaling,
      "data-panel-background": panelBackground,
      "data-has-background": hasBackgroundProp,
    };

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<{
        className?: string;
        style?: React.CSSProperties;
        ref?: React.Ref<HTMLElement>;
      }>;

      return (
        <ThemeContext.Provider value={contextValue}>
          {React.cloneElement(child, {
            ref,
            className: cn(child.props.className, themeClassName),
            style: { ...themeStyles, ...child.props.style },
            ...themeDataAttributes,
            ...props,
          })}
        </ThemeContext.Provider>
      );
    }

    return (
      <ThemeContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={themeClassName}
          style={themeStyles}
          {...themeDataAttributes}
          {...props}
        >
          {children}
        </div>
      </ThemeContext.Provider>
    );
  },
);

Theme.displayName = "Theme";

// ============================================================================
// Helper Functions
// ============================================================================

function getRadiusValue(radius: Radius): string {
  switch (radius) {
    case "none":
      return "0";
    case "small":
      return "0.25rem";
    case "medium":
      return "0.5rem";
    case "large":
      return "0.75rem";
    case "full":
      return "9999px";
    default:
      return "0.5rem";
  }
}

// ============================================================================
// Theme Panel (for theme customization UI)
// ============================================================================

export interface ThemePanelProps {
  /** Default open state */
  defaultOpen?: boolean;
  /** Additional class names */
  className?: string;
}

export const ThemePanel: React.FC<ThemePanelProps> = ({
  defaultOpen = false,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const theme = useThemeContext();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 z-50 rounded-full bg-primary p-3 text-primary-foreground shadow-lg",
          "hover:bg-primary/90 transition-colors",
          className,
        )}
        aria-label="Open theme panel"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 w-80 rounded-lg border bg-popover p-4 shadow-lg",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Theme</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded p-1 hover:bg-accent"
          aria-label="Close theme panel"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {/* Appearance */}
        <div>
          <label className="text-sm font-medium mb-2 block">Appearance</label>
          <div className="flex gap-2">
            {(["light", "dark", "inherit"] as const).map((value) => (
              <button
                key={value}
                onClick={() => theme.onAppearanceChange(value)}
                className={cn(
                  "flex-1 rounded-md px-3 py-2 text-sm capitalize",
                  theme.appearance === value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80",
                )}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Accent Color */}
        <div>
          <label className="text-sm font-medium mb-2 block">Accent color</label>
          <div className="grid grid-cols-8 gap-1">
            {(
              [
                "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet",
                "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass",
                "orange", "amber", "yellow", "lime", "mint", "sky", "gray", "gold",
              ] as AccentColor[]
            ).map((color) => (
              <button
                key={color}
                onClick={() => theme.onAccentColorChange(color)}
                className={cn(
                  "h-6 w-6 rounded-full border-2 transition-transform",
                  theme.accentColor === color
                    ? "border-foreground scale-110"
                    : "border-transparent hover:scale-105",
                )}
                style={{ backgroundColor: `var(--${color}-9, ${getColorFallback(color)})` }}
                title={color}
                aria-label={color}
              />
            ))}
          </div>
        </div>

        {/* Radius */}
        <div>
          <label className="text-sm font-medium mb-2 block">Radius</label>
          <div className="flex gap-2">
            {(["none", "small", "medium", "large", "full"] as const).map((value) => (
              <button
                key={value}
                onClick={() => theme.onRadiusChange(value)}
                className={cn(
                  "flex-1 rounded-md px-2 py-2 text-xs capitalize",
                  theme.radius === value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80",
                )}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Scaling */}
        <div>
          <label className="text-sm font-medium mb-2 block">Scaling</label>
          <div className="flex gap-2">
            {(["90%", "95%", "100%", "105%", "110%"] as const).map((value) => (
              <button
                key={value}
                onClick={() => theme.onScalingChange(value)}
                className={cn(
                  "flex-1 rounded-md px-2 py-2 text-xs",
                  theme.scaling === value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80",
                )}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Panel Background */}
        <div>
          <label className="text-sm font-medium mb-2 block">Panel background</label>
          <div className="flex gap-2">
            {(["solid", "translucent"] as const).map((value) => (
              <button
                key={value}
                onClick={() => theme.onPanelBackgroundChange(value)}
                className={cn(
                  "flex-1 rounded-md px-3 py-2 text-sm capitalize",
                  theme.panelBackground === value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80",
                )}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ThemePanel.displayName = "ThemePanel";

// Color fallbacks for the theme panel
function getColorFallback(color: AccentColor): string {
  const fallbacks: Record<AccentColor, string> = {
    gray: "#8b8b8b",
    gold: "#b5a33c",
    bronze: "#a18072",
    brown: "#ad7f58",
    yellow: "#ffe629",
    amber: "#ffc53d",
    orange: "#f76b15",
    tomato: "#e54d2e",
    red: "#e5484d",
    ruby: "#e54666",
    crimson: "#e93d82",
    pink: "#d6409f",
    plum: "#ab4aba",
    purple: "#8e4ec6",
    violet: "#6e56cf",
    iris: "#5b5bd6",
    indigo: "#3e63dd",
    blue: "#0090ff",
    cyan: "#00a2c7",
    teal: "#12a594",
    jade: "#29a383",
    green: "#30a46c",
    grass: "#46a758",
    lime: "#bdee63",
    mint: "#86ead4",
    sky: "#7ce2fe",
  };
  return fallbacks[color] || "#3e63dd";
}
