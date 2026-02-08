'use client'

// Copied and adapted from Radix UI website (MIT License, Copyright (c) 2024 WorkOS)
import { Box, ScrollArea } from '@bwalkt/ui'

export const SideNav = ({ children }: { children: React.ReactNode }) => (
  <Box display={{ initial: 'none', md: 'block' }} style={{ width: 150, flexShrink: 0 }}>
    <Box
      position="fixed"
      left="0"
      bottom="0"
      pl="4"
      style={{
        zIndex: 1,
        top: 'var(--header-height)',
        overflowX: 'hidden',
        width: 'inherit',
      }}
    >
      <ScrollArea className="h-full">{children}</ScrollArea>
    </Box>
  </Box>
)
