'use client'

import { CalloutRoot, CalloutText, Heading, Text } from '@bwalkt/ui'

export default function ThemingPage() {
  return (
    <div className="docs-prose">
      <Heading as="h1" size="6">
        Theming
      </Heading>
      <Text size="2" className="mt-3 text-muted-foreground">
        Themes are configured through a small set of controls: <code className="text-foreground">accentColor</code>,{' '}
        <code className="text-foreground">grayColor</code>, <code className="text-foreground">radius</code>,{' '}
        <code className="text-foreground">scaling</code>, and <code className="text-foreground">panelBackground</code>.
      </Text>

      <CalloutRoot variant="surface" color="warning" className="mt-4">
        <CalloutText>
          Use themes sparingly. Favor tokens for semantic control, then provide component-level overrides only when
          absolutely necessary.
        </CalloutText>
      </CalloutRoot>

      <Heading as="h2" size="4" className="mt-10">
        Theme wrapper
      </Heading>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border/70 bg-muted/40 p-4 text-sm">
        <code>{`import { Theme } from '@bwalkt/ui'\n\nexport default function Themed() {\n  return (\n    <Theme accentColor="teal" grayColor="sage" radius="lg" scaling="105%">\n      {/* UI */}\n    </Theme>\n  )\n}\n`}</code>
      </pre>

      <Heading as="h2" size="4" className="mt-10">
        Strategy
      </Heading>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
        <li>Define one primary theme and one dense theme.</li>
        <li>Keep radius and scaling aligned with product density targets.</li>
        <li>Store overrides in CSS variables for auditability.</li>
      </ul>
    </div>
  )
}
