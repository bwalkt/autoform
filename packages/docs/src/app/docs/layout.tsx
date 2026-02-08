import { Container, Flex } from '@bwalkt/ui'
import { DocsHeader } from '../../components/DocsHeader'
import { DocsSidebar } from '../../components/DocsSidebar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <DocsHeader />
      <Container size="4" px="6" className="pb-20 pt-10">
        <Flex gap="6">
          <DocsSidebar />
          <main className="docs-surface min-h-[70vh] flex-1 rounded-2xl p-10">{children}</main>
        </Flex>
      </Container>
    </div>
  )
}
