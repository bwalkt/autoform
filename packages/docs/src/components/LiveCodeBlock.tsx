'use client'

import { Runner } from '@bwalkt/react-runner'
import { Box, Container, Flex, Grid, Section } from '@bwalkt/ui'
import { javascript } from '@codemirror/lang-javascript'
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
  const fullScope = React.useMemo(
    () => ({
      Grid,
      Box,
      Container: Container ?? Box,
      Flex: Flex ?? Box,
      Section: Section ?? Box,
      DecorativeBox,
      ...scope,
    }),
    [scope],
  )

  return (
    <div className={[styles.CodeBlockRoot, styles.LiveCodeBlockRoot].filter(Boolean).join(' ')}>
      {showPreview && (
        <div className={styles.CodeBlockLivePreview}>
          <ViewportPreview>
            <div className={styles.LiveCodeBlockPreviewInner}>
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
          extensions={[javascript({ jsx: true, typescript: false })]}
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
          className={styles.LiveCodeBlockEditor}
        />

        {error && (
          <Box className={styles.LiveCodeBlockError} role="alert" aria-live="polite">
            {error.message}
          </Box>
        )}
      </div>
    </div>
  )
}
