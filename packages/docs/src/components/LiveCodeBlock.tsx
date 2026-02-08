'use client'

import { Runner } from '@bwalkt/react-runner'
import { Box, Grid } from '@bwalkt/ui'
import { javascript } from '@codemirror/lang-javascript'
import { indentUnit } from '@codemirror/language'
import { oneDark } from '@codemirror/theme-one-dark'
import CodeMirror from '@uiw/react-codemirror'
import * as React from 'react'
import { useCallback, useState } from 'react'
import styles from './CodeBlock.module.css'
import { DecorativeBox } from './DecorativeBox'
import { ViewportPreview } from './ViewportPreview'

interface LiveCodeBlockProps {
  initialCode: string
  scope?: Record<string, any>
  showPreview?: boolean
}

export function LiveCodeBlock({ initialCode, scope = {}, showPreview = true }: LiveCodeBlockProps) {
  const [code, setCode] = useState(initialCode)
  const [error, setError] = useState<Error | null>(null)

  const handleCodeChange = useCallback((value: string) => {
    setCode(value)
    setError(null)
  }, [])

  const handleRendered = useCallback((error: Error | null) => {
    // Only update if error state actually changed
    setError(prevError => {
      if (prevError?.message === error?.message) {
        return prevError
      }
      return error
    })
  }, [])

  // Default scope with common imports
  const fullScope = {
    Grid,
    Box,
    DecorativeBox,
    ...scope,
  }

  return (
    <div className={styles.CodeBlockRoot} style={{ marginTop: '2rem' }}>
      {showPreview && (
        <div className={styles.CodeBlockLivePreview}>
          <ViewportPreview>
            <div style={{ height: '200px', overflow: 'auto', padding: '1rem' }}>
              <Runner code={code} scope={fullScope} onRendered={handleRendered} />
            </div>
          </ViewportPreview>
        </div>
      )}

      <div className={styles.CodeBlockContent}>
        <CodeMirror
          value={code}
          height="200px"
          theme={oneDark}
          extensions={[javascript({ jsx: true, typescript: false }), indentUnit.of('  ')]}
          onChange={handleCodeChange}
          basicSetup={{
            lineNumbers: true,
            foldGutter: false,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: false,
            highlightSelectionMatches: false,
            searchKeymap: false,
            tabSize: 2,
          }}
          style={{
            fontSize: '14px',
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          }}
        />

        {error && (
          <Box
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#450a0a',
              color: '#fca5a5',
              fontSize: '14px',
              fontFamily: 'monospace',
              borderTop: '1px solid #7f1d1d',
            }}
          >
            {error.message}
          </Box>
        )}
      </div>
    </div>
  )
}
