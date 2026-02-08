'use client'

import { Box, Heading, ScrollArea, Text } from '@bwalkt/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// Copied and adapted from Radix UI website (MIT License, Copyright (c) 2024 WorkOS)
import * as React from 'react'
import styles from './QuickNav.module.css'

export function QuickNav({ title = 'Quick nav' }: { title?: string }) {
  const [headings, setHeadings] = React.useState<HTMLHeadingElement[]>([])
  const pathname = usePathname()

  React.useEffect(() => {
    const headingElements: HTMLHeadingElement[] = Array.from(document.querySelectorAll('[data-heading]'))
    setHeadings(headingElements)
  }, [pathname])

  const getLevel = (nodeName: string) => Number(nodeName.replace('H', ''))

  return (
    <Box asChild data-algolia-exclude className={styles.QuickNavRoot}>
      <aside>
        <ScrollArea>
          <Box
            asChild
            px="5"
            aria-labelledby="site-quick-nav-heading"
            className={headings.length === 0 ? styles.QuickNavHidden : styles.QuickNavInner}
          >
            <nav>
              <Heading mb="3" size="4" id="site-quick-nav-heading" asChild>
                <h4>{title}</h4>
              </Heading>
              <Box asChild className={styles.QuickNavList}>
                <ul>
                  {headings.map(({ id, nodeName, innerText }) => (
                    <Box asChild key={id} data-level={getLevel(nodeName)} className={styles.LinkWrapper}>
                      <li>
                        <Text asChild size="2" className={styles.Link}>
                          <Link href={`#${id}`} className="text-muted-foreground hover:text-foreground">
                            {innerText}
                          </Link>
                        </Text>
                      </li>
                    </Box>
                  ))}
                </ul>
              </Box>
            </nav>
          </Box>
        </ScrollArea>
      </aside>
    </Box>
  )
}
