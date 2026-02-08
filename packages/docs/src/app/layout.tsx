import '../styles/globals.css'

import type { Metadata } from 'next'
import { JetBrains_Mono, Manrope } from 'next/font/google'
import { ThemeProvider } from '../components/ThemeProvider'

const sans = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
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
        className={`${sans.variable} ${mono.variable} font-sans antialiased text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
