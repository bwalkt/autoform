'use client'

import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

interface SyntaxHighlighterProps {
  code: string
  language?: string
}

export function SyntaxHighlighter({ code, language = 'jsx' }: SyntaxHighlighterProps) {
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    async function highlight() {
      const result = await codeToHtml(code, {
        lang: language,
        theme: 'github-dark',
      })
      setHtml(result)
    }
    highlight()
  }, [code, language])

  if (!html) {
    // Show raw code while loading
    return (
      <pre
        style={{
          padding: '1rem',
          whiteSpace: 'pre',
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: '1.5',
        }}
      >
        <code>{code}</code>
      </pre>
    )
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
