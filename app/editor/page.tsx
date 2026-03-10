'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEditor } from '@/lib/editor-context'
import { LogoEditor } from '@/components/editor/logo-editor'
import { ColorsEditor } from '@/components/editor/colors-editor'
import { MenuEditor } from '@/components/editor/menu-editor'
import { SectionsEditor } from '@/components/editor/sections-editor'
import { CodeEditor } from '@/components/editor/code-editor'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Solutions } from '@/components/solutions'
import { Industries } from '@/components/industries'
import { Features } from '@/components/features'
import { Pricing } from '@/components/pricing'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'
import {
  Image as ImageIcon,
  Palette,
  Menu,
  LayoutTemplate,
  Code2,
  Save,
  RotateCcw,
  ExternalLink,
  LogOut,
  Monitor,
  Smartphone,
} from 'lucide-react'
import { logoutAction } from '@/app/actions/auth-actions'

type Tab = 'logo' | 'colors' | 'menu' | 'sections' | 'code'

const tabs: { key: Tab; label: string; Icon: any }[] = [
  { key: 'logo', label: 'Logo', Icon: ImageIcon },
  { key: 'colors', label: 'Colores', Icon: Palette },
  { key: 'menu', label: 'Menú', Icon: Menu },
  { key: 'sections', label: 'Secciones', Icon: LayoutTemplate },
  { key: 'code', label: 'Código', Icon: Code2 },
]

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState<Tab>('logo')
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')
  const { saveConfig, resetConfig, isDirty, isSaving } = useEditor()

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left panel */}
      <aside className="w-80 shrink-0 flex flex-col border-r border-border bg-card overflow-hidden">
        {/* Panel header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30 shrink-0">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
              style={{ background: '#7c3aed' }}
            >
              ia
            </div>
            <span className="text-sm font-bold">Editor</span>
          </div>
          <div className="flex items-center gap-2">
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="w-3 h-3" />
                Salir
              </button>
            </form>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border shrink-0">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex flex-col items-center gap-1 flex-1 py-2.5 text-xs transition-colors ${
                activeTab === tab.key
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <tab.Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'logo' && <LogoEditor />}
          {activeTab === 'colors' && <ColorsEditor />}
          {activeTab === 'menu' && <MenuEditor />}
          {activeTab === 'sections' && <SectionsEditor />}
          {activeTab === 'code' && <CodeEditor />}
        </div>

        {/* Panel footer actions */}
        <div className="border-t border-border p-4 flex flex-col gap-2 shrink-0 bg-card">
          <Button
            onClick={saveConfig}
            className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!isDirty || isSaving}
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Guardando...' : isDirty ? 'Guardar cambios' : 'Sin cambios pendientes'}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              if (confirm('¿Restablecer todos los valores por defecto?')) resetConfig()
            }}
            className="w-full gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Restablecer defaults
          </Button>
        </div>
      </aside>

      {/* Right preview panel */}
      <main className="flex-1 flex flex-col overflow-hidden bg-muted/20">
        {/* Preview toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card shrink-0">
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                previewMode === 'desktop'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Escritorio
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                previewMode === 'mobile'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Móvil
            </button>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Ver página
          </Link>
        </div>

        {/* iframe preview */}
        <div className="flex-1 overflow-auto p-4 flex items-start justify-center">
          <div
            className={`bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
              previewMode === 'mobile' ? 'w-[390px]' : 'w-full'
            }`}
            style={{ minHeight: '100%' }}
          >
            <LivePreview />
          </div>
        </div>
      </main>
    </div>
  )
}

function LivePreview() {
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <Solutions />
      <Industries />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  )
}
