import { DocsHeader } from '../../components/DocsHeader'
import { DocsSidebar } from '../../components/DocsSidebar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <DocsHeader />
      <div className="mx-auto flex w-full max-w-6xl gap-6 px-6 pb-20 pt-10">
        <DocsSidebar />
        <main className="docs-surface min-h-[70vh] flex-1 rounded-2xl p-10">{children}</main>
      </div>
    </div>
  )
}
