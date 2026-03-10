'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { EditorConfig, defaultEditorConfig } from '@/lib/editor-defaults'
import {
  getEditorConfig,
  saveEditorConfig,
  resetEditorConfig,
} from '@/app/actions/editor-actions'

interface EditorContextType {
  config: EditorConfig
  updateConfig: (path: string, value: any) => void
  resetConfig: () => void
  saveConfig: () => void
  isDirty: boolean
  isSaving: boolean
}

const EditorContext = createContext<EditorContextType | undefined>(undefined)

function setNestedValue(obj: any, path: string, value: any): any {
  const keys = path.split('.')
  const result = { ...obj }
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...current[keys[i]] }
    current = current[keys[i]]
  }

  current[keys[keys.length - 1]] = value
  return result
}

export function EditorProvider({
  children,
  initialConfig,
}: {
  children: ReactNode
  initialConfig?: EditorConfig
}) {
  const [config, setConfig] = useState<EditorConfig>(
    initialConfig ?? defaultEditorConfig
  )
  const [isDirty, setIsDirty] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // If no SSR initial config was provided, hydrate from KV on mount
  useEffect(() => {
    if (initialConfig) return
    getEditorConfig().then((remote) => {
      setConfig({ ...defaultEditorConfig, ...remote })
    })
  }, [initialConfig])

  const updateConfig = useCallback((path: string, value: any) => {
    setConfig((prev) => setNestedValue(prev, path, value))
    setIsDirty(true)
  }, [])

  const saveConfig = useCallback(async () => {
    setIsSaving(true)
    try {
      // Read current config from functional updater so we always have the latest
      await new Promise<void>((resolve) => {
        setConfig((prev) => {
          saveEditorConfig(prev).then(resolve)
          return prev
        })
      })
      setIsDirty(false)
    } finally {
      setIsSaving(false)
    }
  }, [])

  const resetConfig = useCallback(async () => {
    setIsSaving(true)
    try {
      await resetEditorConfig()
      setConfig(defaultEditorConfig)
      setIsDirty(false)
    } finally {
      setIsSaving(false)
    }
  }, [])

  return (
    <EditorContext.Provider
      value={{ config, updateConfig, resetConfig, saveConfig, isDirty, isSaving }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export function useEditor() {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditor must be used within EditorProvider')
  }
  return context
}
