'use client'

import Link from 'next/link'
import { Settings2 } from 'lucide-react'

export function EditorFab() {
  return (
    <Link
      href="/editor"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-foreground text-background rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-sm font-medium"
      aria-label="Abrir editor visual"
    >
      <Settings2 className="w-4 h-4" />
      <span className="hidden sm:inline">Editar página</span>
    </Link>
  )
}
