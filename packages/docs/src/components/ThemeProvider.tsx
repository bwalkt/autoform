'use client'

import { Theme } from '@bwalkt/ui'
import type * as React from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Theme accentColor="sky" grayColor="slate" radius="lg" scaling="100%" panelBackground="translucent">
      {children}
    </Theme>
  )
}
