import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box } from './Box'
import { Container } from './Container'

const meta: Meta<typeof Container> = {
  title: 'Layouts/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['1', '2', '3', '4'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ============================================================================
// Basic Examples
// ============================================================================

export const Default: Story = {
  render: () => (
    <div className="bg-muted/30 py-8">
      <Container p="4" className="bg-background border rounded-lg">
        <p>Default container (size="4", max-width: 1136px)</p>
        <p className="text-sm text-muted-foreground mt-2">
          The container is centered by default and provides a maximum width for content.
        </p>
      </Container>
    </div>
  ),
}

// ============================================================================
// Size Variants
// ============================================================================

export const SizeVariants: Story = {
  render: () => (
    <div className="bg-muted/30 py-8 space-y-8">
      {(['1', '2', '3', '4'] as const).map(size => (
        <Container key={size} size={size} p="4" className="bg-background border rounded-lg">
          <p className="font-medium">size="{size}"</p>
          <p className="text-sm text-muted-foreground">
            {size === '1' && 'Max-width: 448px'}
            {size === '2' && 'Max-width: 688px'}
            {size === '3' && 'Max-width: 880px'}
            {size === '4' && 'Max-width: 1136px'}
          </p>
        </Container>
      ))}
    </div>
  ),
}

// ============================================================================
// Alignment
// ============================================================================

export const Alignment: Story = {
  render: () => (
    <div className="bg-muted/30 py-8 space-y-8">
      {(['left', 'center', 'right'] as const).map(alignment => (
        <Container key={alignment} size="2" align={alignment} p="4" className="bg-background border rounded-lg">
          <p className="font-medium">align="{alignment}"</p>
          <p className="text-sm text-muted-foreground">Container aligned to the {alignment}</p>
        </Container>
      ))}
    </div>
  ),
}

// ============================================================================
// Responsive Size
// ============================================================================

export const ResponsiveSize: Story = {
  render: () => (
    <div className="bg-muted/30 py-8">
      <Container size="4" p="4" className="bg-background border rounded-lg">
        <p className="font-medium">Responsive Container</p>
        <p className="text-sm text-muted-foreground mt-2">
          Container sizes are tokenized. Use a specific size per layout.
        </p>
      </Container>
    </div>
  ),
}

// ============================================================================
// With Content
// ============================================================================

export const ArticleLayout: Story = {
  render: () => (
    <div className="bg-muted/30 py-8">
      <Container size="2" p="6" className="bg-background">
        <article className="prose prose-sm max-w-none">
          <h1 className="text-2xl font-bold mb-4">Article Title</h1>
          <p className="text-muted-foreground mb-4">Published on January 1, 2024 • 5 min read</p>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-3">Section Heading</h2>
          <p className="mb-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
          <Box p="4" className="bg-muted rounded-lg my-6">
            <p className="text-sm font-mono">Code example or callout box</p>
          </Box>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam.
          </p>
        </article>
      </Container>
    </div>
  ),
}

export const PageLayout: Story = {
  render: () => (
    <div className="min-h-screen bg-muted/30">
      {/* Header - full width with contained content */}
      <header className="bg-primary text-primary-foreground py-4">
        <Container size="4" px="4">
          <div className="flex justify-between items-center">
            <span className="font-bold">Logo</span>
            <nav className="flex gap-4 text-sm">
              <a href="#" className="hover:underline">
                Home
              </a>
              <a href="#" className="hover:underline">
                About
              </a>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </nav>
          </div>
        </Container>
      </header>

      {/* Main content */}
      <main className="py-8">
        <Container size="4" px="4">
          <h1 className="text-3xl font-bold mb-6">Page Title</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <Box key={i} p="4" className="bg-background border rounded-lg">
                <div className="h-32 bg-muted rounded mb-3" />
                <h3 className="font-medium">Card {i + 1}</h3>
                <p className="text-sm text-muted-foreground">Card description</p>
              </Box>
            ))}
          </div>
        </Container>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t py-6">
        <Container size="4" px="4">
          <p className="text-sm text-muted-foreground text-center">© 2024 Your Company. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  ),
}

// ============================================================================
// Nested Containers
// ============================================================================

export const NestedContainers: Story = {
  render: () => (
    <div className="bg-muted/30 py-8">
      <Container size="4" p="4" className="bg-background border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Outer Container (size="4")</h2>
        <p className="text-muted-foreground mb-6">This container provides the maximum width for the page content.</p>

        <Container size="2" p="4" className="bg-muted/50 border rounded-lg">
          <h3 className="text-lg font-medium mb-2">Inner Container (size="2")</h3>
          <p className="text-sm text-muted-foreground">
            A narrower container for focused content like forms or articles.
          </p>
        </Container>
      </Container>
    </div>
  ),
}
