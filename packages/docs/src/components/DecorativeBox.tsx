'use client'

import { Box } from '@bwalkt/ui'
import type { ComponentPropsWithoutRef } from 'react'
// Adapted from Radix UI website (MIT License, Copyright (c) 2024 WorkOS)
import styles from './DecorativeBox.module.css'

export function DecorativeBox(props: ComponentPropsWithoutRef<typeof Box>) {
  const className = [styles.DecorativeBox, props.className].filter(Boolean).join(' ')
  return <Box height="100%" {...props} className={className} />
}
