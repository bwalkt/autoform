import Link from 'next/link'

const items = [{ label: 'API Reference', href: '#api-reference' }]

export function DocsQuickNav() {
  return (
    <aside className="hidden w-32 flex-shrink-0 lg:block">
      <div className="text-sm font-semibold text-foreground">Quick nav</div>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map(item => (
          <li key={item.href}>
            <Link href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
