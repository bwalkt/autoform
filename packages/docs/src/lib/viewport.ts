export type ViewportPreset = 'desktop' | 'tablet' | 'phone'

export const viewportWidths: Record<ViewportPreset, number> = {
  desktop: 1200,
  tablet: 900,
  phone: 375,
}
