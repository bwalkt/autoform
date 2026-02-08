'use client'

import { Badge, Box, Flex, Heading, Text } from '@bwalkt/ui'
import Link from 'next/link'
// Copied and adapted from Radix UI website (MIT License, Copyright (c) 2024 WorkOS)
import * as React from 'react'
import { classNames } from '../lib/classNames'
import { useCurrentPageSlug } from '../lib/useCurrentPageSlug'
import styles from './DocsNav.module.css'

interface DocsNavProps {
  routes: {
    label?: string
    pages: {
      title: string
      slug: string
      icon?: React.ReactNode
      preview?: boolean
      deprecated?: boolean
    }[]
  }[]
}

export const DocsNav = ({ routes }: DocsNavProps) => {
  const currentPageSlug = useCurrentPageSlug()

  return (
    <Box>
      {routes.map((section, i) => (
        <Box key={section.label ?? i} mb="4">
          {section.label && (
            <Box py="2" px="3">
              <Heading as="h4" size={{ initial: '3', md: '2' }}>
                {section.label}
              </Heading>
            </Box>
          )}

          {section.pages.map(page => (
            <DocsNavItem key={page.slug} href={page.slug} active={currentPageSlug === page.slug}>
              <Flex gap="2" align="center">
                {page.icon}
                <Text size={{ initial: '3', md: '2' }}>{page.title}</Text>
              </Flex>

              {page.preview && (
                <Box ml="2">
                  <Badge color="neutral" radius="full" variant="surface">
                    Preview
                  </Badge>
                </Box>
              )}

              {page.deprecated && (
                <Box ml="2">
                  <Badge color="neutral" radius="full" variant="surface">
                    Deprecated
                  </Badge>
                </Box>
              )}
            </DocsNavItem>
          ))}
        </Box>
      ))}
    </Box>
  )
}

interface DocsNavItemProps {
  children: React.ReactNode
  active?: boolean
  disabled?: boolean
  href: string
  className?: string
}

const DocsNavItem = ({ active, disabled, href, className, ...props }: DocsNavItemProps) => {
  const mergedClassName = classNames(styles.DocsNavItem, active && styles.active, className)
  const isExternal = href.startsWith('http')
  const ref = React.useRef<HTMLAnchorElement>(null)

  React.useEffect(() => {
    if (ref.current && active) {
      const container = document.querySelector('[data-radix-scroll-area-viewport]')
      if (!container) return

      // Keep the active link visible inside the scroll area.
      const rect = ref.current.getBoundingClientRect()
      const containerRect = (container as HTMLElement).getBoundingClientRect()
      if (rect.top < containerRect.top || rect.bottom > containerRect.bottom) {
        ref.current.scrollIntoView({ block: 'center' })
      }
    }
  }, [active])

  if (disabled) {
    return <span ref={ref} className={mergedClassName} {...props} />
  }

  if (isExternal) {
    return <a ref={ref} className={mergedClassName} href={href} target="_blank" rel="noopener" {...props} />
  }

  return <Link href={`/${href}`} ref={ref} className={mergedClassName} {...props} />
}
