import { DocsHeader } from '../../components/DocsHeader'
import { DocsNav } from '../../components/DocsNav'
import { DocsPageWrapper } from '../../components/DocsPageWrapper'
import { QuickNav } from '../../components/QuickNav'
import { SideNav } from '../../components/SideNav'
import { docsRoutes } from '../../lib/docs'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <DocsHeader />
      <div className="flex">
        <SideNav>
          <DocsNav routes={docsRoutes} />
        </SideNav>
        <DocsPageWrapper>
          <main className="docs-surface min-h-[70vh] w-full rounded-2xl p-8">{children}</main>
        </DocsPageWrapper>
        <QuickNav />
      </div>
    </div>
  )
}
