'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { docSections } from '../lib/docs'

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="docs-surface hidden h-[calc(100vh-64px)] w-72 flex-shrink-0 rounded-2xl p-6 lg:block">
      <div className="space-y-8">
        {docSections.map(section => (
          <div key={section.title}>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {section.title}
            </div>
            <ul className="mt-3 space-y-1">
              {section.items.map(item => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`block rounded-lg px-3 py-2 text-sm transition ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}
