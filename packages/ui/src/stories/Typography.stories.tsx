import { Blockquote, Code, Em, Heading, Quote, Strong, Text } from '@bwalkt/ui/elements'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Typography/Overview',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

export const Showcase: Story = {
  name: 'Showcase',
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div>
        <Heading mb="2" size="6">
          Typography Showcase
        </Heading>
        <Text size="3" color="default">
          A demonstration of the typography components based on Radix UI Themes.
        </Text>
      </div>

      <div>
        <Heading mb="2" size="4">
          Headings
        </Heading>
        <div className="space-y-2">
          <Heading size="9">Size 9 Heading</Heading>
          <Heading size="8">Size 8 Heading</Heading>
          <Heading size="7">Size 7 Heading</Heading>
          <Heading size="6">Size 6 Heading</Heading>
          <Heading size="5">Size 5 Heading</Heading>
          <Heading size="4">Size 4 Heading</Heading>
          <Heading size="3">Size 3 Heading</Heading>
          <Heading size="2">Size 2 Heading</Heading>
          <Heading size="1">Size 1 Heading</Heading>
        </div>
      </div>

      <div>
        <Heading mb="2" size="4">
          Text Sizes
        </Heading>
        <div className="space-y-2">
          <Text size="9">Text size 9</Text>
          <Text size="8">Text size 8</Text>
          <Text size="7">Text size 7</Text>
          <Text size="6">Text size 6</Text>
          <Text size="5">Text size 5</Text>
          <Text size="4">Text size 4</Text>
          <Text size="3">Text size 3</Text>
          <Text size="2">Text size 2</Text>
          <Text size="1">Text size 1</Text>
        </div>
      </div>

      <div>
        <Heading mb="2" size="4">
          Weights
        </Heading>
        <div className="space-y-1">
          <Text size="3" weight="light">
            Light weight text
          </Text>
          <Text size="3" weight="regular">
            Regular weight text
          </Text>
          <Text size="3" weight="medium">
            Medium weight text
          </Text>
          <Text size="3" weight="bold">
            Bold weight text
          </Text>
        </div>
      </div>

      <div>
        <Heading mb="2" size="4">
          Colors
        </Heading>
        <div className="space-y-1">
          <Text size="3" color="default">
            Default color text
          </Text>
          <Text size="3" color="info">
            Info color text
          </Text>
          <Text size="3" color="success">
            Success color text
          </Text>
          <Text size="3" color="warning">
            Warning color text
          </Text>
          <Text size="3" color="error">
            Error color text
          </Text>
        </div>
      </div>

      <div>
        <Heading mb="2" size="4">
          Inline Elements
        </Heading>
        <Text size="3">
          The <Em>most</Em> important thing to remember is <Strong>stay positive</Strong>. Use <Code>inline code</Code>{' '}
          when needed.
        </Text>
      </div>

      <div>
        <Heading mb="2" size="4">
          Code Examples
        </Heading>
        <div className="space-y-2">
          <Code variant="soft">npm install @bwalkt/ui</Code>
          <Code variant="solid">const value = "example";</Code>
          <Code variant="outline">git commit -m "feat: add typography"</Code>
          <Code variant="ghost">console.log("Hello World")</Code>
        </div>
      </div>

      <div>
        <Heading mb="2" size="4">
          Inline Quotes
        </Heading>
        <Text size="3">
          As Massimo Vignelli said, <Quote>Styles come and go. Good design is a language, not a style</Quote>, which
          elegantly sums up his philosophy.
        </Text>
      </div>

      <div>
        <Heading mb="2" size="4">
          Blockquotes
        </Heading>
        <Blockquote size="3">
          Typography is the craft of endowing human language with a durable visual form, and thus with an independent
          existence.
        </Blockquote>
        <Blockquote size="2" color="info" className="mt-4">
          Good typography is invisible. Bad typography is everywhere.
        </Blockquote>
      </div>

      <div>
        <Heading mb="2" size="4">
          Typographic Principles
        </Heading>
        <Text size="3">
          The <Em>most</Em> important thing to remember is <Strong>stay positive</Strong>. Typography should enhance
          readability and create visual hierarchy. Use consistent spacing and alignment to create a cohesive design.
        </Text>
      </div>
    </div>
  ),
}
