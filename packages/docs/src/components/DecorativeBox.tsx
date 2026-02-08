'use client'

// Adapted from Radix UI website (MIT License, Copyright (c) 2024 WorkOS)
import { Box } from '@bwalkt/ui'

export function DecorativeBox(props: React.ComponentPropsWithoutRef<typeof Box>) {
  return (
    <Box
      height="100%"
      {...props}
      style={{
        backgroundColor: 'var(--gray-a3, rgba(0,0,0,0.04))',
        backgroundClip: 'padding-box',
        border: '1px solid var(--gray-a5, rgba(0,0,0,0.08))',
        borderRadius: 'var(--radius-1, 6px)',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E\")",
        ...props.style,
      }}
    />
  )
}
