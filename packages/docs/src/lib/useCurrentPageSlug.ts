'use client'

// Copied and adapted from Radix UI website (MIT License, Copyright (c) 2024 WorkOS)
import { usePathname } from 'next/navigation'

export function useCurrentPageSlug() {
  const pathname = usePathname() || ''
  return pathname.replace(/^\//, '')
}
