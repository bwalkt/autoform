import '../styles/globals.css'

import type { Metadata } from 'next'
import { Geist, JetBrains_Mono, Newsreader } from 'next/font/google'
import { ThemeProvider } from '../components/ThemeProvider'

const sans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const serif = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Autoform UI Docs',
  description: 'Design system and component documentation for Autoform UI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${serif.variable} ${mono.variable} font-sans antialiased text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
