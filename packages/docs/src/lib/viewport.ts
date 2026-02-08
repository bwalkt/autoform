export type ViewportPreset = 'desktop' | 'tablet' | 'phone'

export const viewportWidths = {
  desktop: 1200,
  tablet: 900,
  phone: 375,
} as const satisfies Record<ViewportPreset, number>
