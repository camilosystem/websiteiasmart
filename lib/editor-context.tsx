'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { EditorConfig, defaultEditorConfig } from '@/lib/editor-defaults'

interface EditorContextType {
  config: EditorConfig
  updateConfig: (path: string, value: any) => void
  resetConfig: () => void
  saveConfig: () => void
  isDirty: boolean
}

const EditorContext = createContext<EditorContextType | undefined>(undefined)

const STORAGE_KEY = 'iasmart_editor_config'

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

export function EditorProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<EditorConfig>(defaultEditorConfig)
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setConfig({ ...defaultEditorConfig, ...parsed })
      }
    } catch {
      // silently fall back to defaults
    }
  }, [])

  const updateConfig = useCallback((path: string, value: any) => {
    setConfig(prev => setNestedValue(prev, path, value))
    setIsDirty(true)
  }, [])

  const saveConfig = useCallback(() => {
    try {
      setConfig(prev => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prev))
        return prev
      })
      setIsDirty(false)
    } catch {
      // ignore storage errors
    }
  }, [])

  const resetConfig = useCallback(() => {
    setConfig(defaultEditorConfig)
    localStorage.removeItem(STORAGE_KEY)
    setIsDirty(false)
  }, [])

  return (
    <EditorContext.Provider value={{ config, updateConfig, resetConfig, saveConfig, isDirty }}>
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
