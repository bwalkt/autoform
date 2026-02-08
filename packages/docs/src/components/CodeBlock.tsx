'use client'

import { Box } from '@bwalkt/ui'
// Adapted from Radix UI website (MIT License, Copyright (c) 2024 WorkOS)
import * as React from 'react'
import styles from './CodeBlock.module.css'

type RootProps = React.ComponentPropsWithoutRef<typeof Box>
const Root = React.forwardRef<HTMLDivElement, RootProps>(({ className, ...props }, ref) => (
  <Box ref={ref} className={[styles.CodeBlockRoot, className].filter(Boolean).join(' ')} {...props} />
))
Root.displayName = 'CodeBlock.Root'

type LivePreviewProps = React.ComponentPropsWithoutRef<typeof Box> & { scroll?: boolean }
const LivePreview = React.forwardRef<HTMLDivElement, LivePreviewProps>(
  ({ className, scroll = false, children, ...props }, ref) => (
    <Box ref={ref} className={[styles.CodeBlockLivePreview, className].filter(Boolean).join(' ')} {...props}>
      <div data-scroll={scroll} className={styles.CodeBlockLivePreviewInner}>
        {children}
      </div>
    </Box>
  ),
)
LivePreview.displayName = 'CodeBlock.LivePreview'

type HeaderProps = React.ComponentPropsWithoutRef<typeof Box>
const Header = React.forwardRef<HTMLDivElement, HeaderProps>(({ className, ...props }, ref) => (
  <Box ref={ref} className={[styles.CodeBlockHeader, className].filter(Boolean).join(' ')} {...props} />
))
Header.displayName = 'CodeBlock.Header'

type ContentProps = React.ComponentPropsWithoutRef<typeof Box>
const Content = React.forwardRef<HTMLDivElement, ContentProps>(({ className, ...props }, ref) => (
  <Box ref={ref} className={[styles.CodeBlockContent, className].filter(Boolean).join(' ')} {...props} />
))
Content.displayName = 'CodeBlock.Content'

type PreProps = React.ComponentPropsWithoutRef<'pre'>
const Pre = React.forwardRef<HTMLPreElement, PreProps>(({ className, children, ...props }, ref) => (
  <pre ref={ref} className={[styles.CodeBlockPre, className].filter(Boolean).join(' ')} {...props}>
    {children}
  </pre>
))
Pre.displayName = 'CodeBlock.Pre'

type CodeProps = React.ComponentPropsWithoutRef<'code'>
const Code = React.forwardRef<HTMLElement, CodeProps>(({ className, ...props }, ref) => (
  <code ref={ref} className={[styles.CodeBlockCode, className].filter(Boolean).join(' ')} {...props} />
))
Code.displayName = 'CodeBlock.Code'

export const CodeBlock = {
  Root,
  LivePreview,
  Header,
  Content,
  Pre,
  Code,
}
