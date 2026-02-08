'use client'

import { Box } from '@bwalkt/ui'
import type { ComponentPropsWithoutRef } from 'react'
// Adapted from Radix UI website (MIT License, Copyright (c) 2024 WorkOS)
import styles from './DecorativeBox.module.css'

export function DecorativeBox({ className, height, ...props }: ComponentPropsWithoutRef<typeof Box>) {
  const composedClassName = [styles.DecorativeBox, className].filter(Boolean).join(' ')
  return <Box {...props} height={height} className={composedClassName} />
}
