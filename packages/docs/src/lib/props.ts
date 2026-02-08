export type PropDef = {
  name: string
  typeSimple: string
  type?: string
  required?: boolean
  default?: string | boolean
  description?: string
}

export const gridPropDefs: PropDef[] = [
  { name: 'as', typeSimple: '"div" | "span"', default: 'div' },
  { name: 'asChild', typeSimple: 'boolean' },
  { name: 'display', typeSimple: '"none" | "inline-grid" | "grid"', default: 'grid' },
  { name: 'areas', typeSimple: 'string' },
  { name: 'columns', typeSimple: 'Responsive<GridColumns>' },
  { name: 'rows', typeSimple: 'Responsive<GridColumns>' },
  { name: 'flow', typeSimple: '"row" | "column" | "dense" | "row-dense" | "column-dense"' },
  { name: 'align', typeSimple: '"start" | "center" | "end" | "baseline" | "stretch"' },
  {
    name: 'alignContent',
    typeSimple: '"start" | "center" | "end" | "baseline" | "between" | "around" | "evenly" | "stretch"',
  },
  { name: 'justify', typeSimple: '"start" | "center" | "end" | "between"' },
  { name: 'justifyItems', typeSimple: '"start" | "center" | "end" | "stretch"' },
  { name: 'gap', typeSimple: 'Responsive<Spacing>' },
  { name: 'gapX', typeSimple: 'Responsive<Spacing>' },
  { name: 'gapY', typeSimple: 'Responsive<Spacing>' },
]

export const layoutPropDefs: PropDef[] = [
  { name: 'p', typeSimple: 'Responsive<Spacing>' },
  { name: 'px', typeSimple: 'Responsive<Spacing>' },
  { name: 'py', typeSimple: 'Responsive<Spacing>' },
  { name: 'pt', typeSimple: 'Responsive<Spacing>' },
  { name: 'pr', typeSimple: 'Responsive<Spacing>' },
  { name: 'pb', typeSimple: 'Responsive<Spacing>' },
  { name: 'pl', typeSimple: 'Responsive<Spacing>' },
  { name: 'm', typeSimple: 'Responsive<Spacing>' },
  { name: 'mx', typeSimple: 'Responsive<Spacing>' },
  { name: 'my', typeSimple: 'Responsive<Spacing>' },
  { name: 'mt', typeSimple: 'Responsive<Spacing>' },
  { name: 'mr', typeSimple: 'Responsive<Spacing>' },
  { name: 'mb', typeSimple: 'Responsive<Spacing>' },
  { name: 'ml', typeSimple: 'Responsive<Spacing>' },
  { name: 'width', typeSimple: 'string' },
  { name: 'minWidth', typeSimple: 'string' },
  { name: 'maxWidth', typeSimple: 'string' },
  { name: 'height', typeSimple: 'string' },
  { name: 'minHeight', typeSimple: 'string' },
  { name: 'maxHeight', typeSimple: 'string' },
  { name: 'position', typeSimple: '"static" | "relative" | "absolute" | "fixed" | "sticky"' },
  { name: 'inset', typeSimple: 'Responsive<Spacing>' },
  { name: 'top', typeSimple: 'Responsive<Spacing>' },
  { name: 'right', typeSimple: 'Responsive<Spacing>' },
  { name: 'bottom', typeSimple: 'Responsive<Spacing>' },
  { name: 'left', typeSimple: 'Responsive<Spacing>' },
  { name: 'overflow', typeSimple: '"visible" | "hidden" | "clip" | "scroll" | "auto"' },
  { name: 'overflowX', typeSimple: '"visible" | "hidden" | "clip" | "scroll" | "auto"' },
  { name: 'overflowY', typeSimple: '"visible" | "hidden" | "clip" | "scroll" | "auto"' },
  { name: 'flexBasis', typeSimple: 'string' },
  { name: 'flexGrow', typeSimple: '"0" | "1"' },
  { name: 'flexShrink', typeSimple: '"0" | "1"' },
  { name: 'gridArea', typeSimple: 'string' },
  { name: 'gridColumn', typeSimple: 'string' },
  { name: 'gridColumnStart', typeSimple: 'string' },
  { name: 'gridColumnEnd', typeSimple: 'string' },
  { name: 'gridRow', typeSimple: 'string' },
  { name: 'gridRowStart', typeSimple: 'string' },
  { name: 'gridRowEnd', typeSimple: 'string' },
  { name: 'alignSelf', typeSimple: '"auto" | "start" | "center" | "end" | "baseline" | "stretch"' },
  { name: 'justifySelf', typeSimple: '"auto" | "start" | "center" | "end" | "stretch"' },
]
