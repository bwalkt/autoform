export type DocItem = {
  title: string
  href: string
  description?: string
}

export type DocSection = {
  title: string
  items: DocItem[]
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
    title: 'Foundations',
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
