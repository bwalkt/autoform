export type DocItem = {
  title: string
  href: string
  description?: string
  preview?: boolean
  deprecated?: boolean
}

export type DocSection = {
  title: string
  items: DocItem[]
}

export type DocsRoute = {
  label?: string
  pages: {
    title: string
    slug: string
    preview?: boolean
    deprecated?: boolean
  }[]
}

export const docSections: DocSection[] = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction',
        href: '/docs/introduction',
        description: 'What Autoform UI is and how it is structured.',
      },
      {
        title: 'Tokens',
        href: '/docs/tokens',
        description: 'Color, spacing, and typography scales.',
      },
    ],
  },
  {
    title: 'Layout',
    items: [
      {
        title: 'Box',
        href: '/docs/layout/box',
        description: 'Fundamental layout building block.',
      },
      {
        title: 'Flex',
        href: '/docs/layout/flex',
        description: 'Flexbox primitives for alignment and spacing.',
      },
      {
        title: 'Grid',
        href: '/docs/layout/grid',
        description: 'Grid primitives for structured layouts.',
      },
      {
        title: 'Container',
        href: '/docs/layout/container',
        description: 'Centered content width with responsive padding.',
      },
      {
        title: 'Section',
        href: '/docs/layout/section',
        description: 'Vertical spacing wrapper for page sections.',
      },
    ],
  },
  {
    title: 'Typography',
    items: [
      {
        title: 'Text',
        href: '/docs/typography/text',
        description: 'Body copy and supporting text.',
      },
      {
        title: 'Heading',
        href: '/docs/typography/heading',
        description: 'Display and section headings.',
      },
    ],
  },
  {
    title: 'Components',
    items: [
      {
        title: 'Components',
        href: '/docs/components',
        description: 'Building blocks, primitives, and patterns.',
      },
      {
        title: 'Theming',
        href: '/docs/theming',
        description: 'Theme composition and system controls.',
      },
    ],
  },
]

export const docsRoutes: DocsRoute[] = docSections.map(section => ({
  label: section.title,
  pages: section.items.map(item => ({
    title: item.title,
    slug: item.href.replace(/^\//, ''),
    ...(item.preview ? { preview: item.preview } : {}),
    ...(item.deprecated ? { deprecated: item.deprecated } : {}),
  })),
}))
