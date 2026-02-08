'use client'

import { Box, ScrollArea } from '@bwalkt/ui'
// Copied and adapted from Radix UI website (MIT License, Copyright (c) 2024 WorkOS)
import type * as React from 'react'
import styles from './SideNav.module.css'

export const SideNav = ({ children }: { children: React.ReactNode }) => (
  <Box display={{ initial: 'none', md: 'block' }} className={styles.SideNavRoot}>
    <Box position="fixed" left="0" bottom="0" pl="4" className={styles.SideNavInner}>
      <ScrollArea className="h-full">{children}</ScrollArea>
    </Box>
  </Box>
)
