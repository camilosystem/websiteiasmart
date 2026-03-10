'use client'

import { useEditor } from '@/lib/editor-context'
import { Input } from '@/components/ui/input'

const colorFields = [
  { key: 'primary', label: 'Color primario', hint: 'Botones, íconos y acentos principales' },
  { key: 'secondary', label: 'Color secundario', hint: 'Íconos de industrias, badges' },
  { key: 'background', label: 'Fondo general', hint: 'Color de fondo de toda la página' },
  { key: 'foreground', label: 'Texto principal', hint: 'Color del texto en toda la página' },
  { key: 'muted', label: 'Fondo suave', hint: 'Fondos de secciones alternadas' },
  { key: 'accent', label: 'Acento', hint: 'Resaltados, hovers y estados activos' },
] as const

export function ColorsEditor() {
  const { config, updateConfig } = useEditor()
  const colors = config.colors

  return (
    <div className="flex flex-col gap-5">
      <p className="text-xs text-muted-foreground">
        Los cambios de color se aplican en tiempo real a toda la landing page.
      </p>

      {colorFields.map(field => (
        <div key={field.key}>
          <label className="text-sm font-semibold block mb-1">{field.label}</label>
          <p className="text-xs text-muted-foreground mb-2">{field.hint}</p>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={colors[field.key]}
              onChange={e => updateConfig(`colors.${field.key}`, e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border border-border shrink-0"
            />
            <Input
              value={colors[field.key]}
              onChange={e => updateConfig(`colors.${field.key}`, e.target.value)}
              placeholder="#7c3aed"
              className="h-9 text-sm font-mono"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
