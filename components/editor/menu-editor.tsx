'use client'

import { useEditor } from '@/lib/editor-context'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { NavItem } from '@/lib/editor-defaults'

export function MenuEditor() {
  const { config, updateConfig } = useEditor()
  const nav = config.nav

  function updateItem(idx: number, field: keyof NavItem, value: string) {
    const items = nav.items.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    )
    updateConfig('nav.items', items)
  }

  function addItem() {
    updateConfig('nav.items', [...nav.items, { label: 'Nuevo enlace', href: '#' }])
  }

  function removeItem(idx: number) {
    updateConfig('nav.items', nav.items.filter((_, i) => i !== idx))
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Elementos del menú</h3>
        <div className="flex flex-col gap-3">
          {nav.items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 p-3 bg-muted/40 rounded-lg">
              <GripVertical className="w-4 h-4 text-muted-foreground mt-2 shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <Input
                  value={item.label}
                  onChange={e => updateItem(idx, 'label', e.target.value)}
                  placeholder="Etiqueta"
                  className="h-8 text-sm"
                />
                <Input
                  value={item.href}
                  onChange={e => updateItem(idx, 'href', e.target.value)}
                  placeholder="#seccion"
                  className="h-8 text-sm font-mono"
                />
              </div>
              <button
                onClick={() => removeItem(idx)}
                className="p-1.5 text-muted-foreground hover:text-destructive transition-colors mt-1"
                aria-label="Eliminar enlace"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={addItem}
          className="mt-3 gap-2 w-full"
        >
          <Plus className="w-4 h-4" />
          Agregar enlace
        </Button>
      </div>

      <div className="border-t border-border pt-5">
        <h3 className="text-sm font-semibold mb-3">Botón de acción (CTA del header)</h3>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Texto del botón</label>
            <Input
              value={nav.ctaLabel}
              onChange={e => updateConfig('nav.ctaLabel', e.target.value)}
              placeholder="Comenzar"
              className="h-9 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Destino (href)</label>
            <Input
              value={nav.ctaHref}
              onChange={e => updateConfig('nav.ctaHref', e.target.value)}
              placeholder="#contacto"
              className="h-9 text-sm font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
