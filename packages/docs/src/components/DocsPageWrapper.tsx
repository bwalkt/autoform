'use client'

// Copied and adapted from Radix UI website (MIT License, Copyright (c) 2024 WorkOS)
import { Section } from '@bwalkt/ui'
import styles from './DocsPageWrapper.module.css'

export const DocsPageWrapper = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Section>) => (
  <div className={styles.DocsPageWrapper}>
    <Section
      width="100%"
      px={{ initial: '5', xs: '6', sm: '7', md: '9' }}
      size={{ initial: '2', md: '4' }}
      className={[styles.DocsPageContent, className].filter(Boolean).join(' ')}
      {...props}
    />
  </div>
)
