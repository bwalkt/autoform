// Copied and adapted from Radix UI website (MIT License, Copyright (c) 2024 WorkOS)
export function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ')
}
