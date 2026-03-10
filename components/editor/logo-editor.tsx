'use client'

import { useEditor } from '@/lib/editor-context'
import { ImageUploader } from '@/components/editor/image-uploader'
import { Input } from '@/components/ui/input'

export function LogoEditor() {
  const { config, updateConfig } = useEditor()
  const logo = config.logo

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-1">Texto del logo</h3>
        <p className="text-xs text-muted-foreground mb-3">
          Nombre que aparece junto al ícono en el header y footer.
        </p>
        <Input
          value={logo.text}
          onChange={e => updateConfig('logo.text', e.target.value)}
          placeholder="iasmart"
          className="h-9 text-sm"
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-1">Mostrar texto</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={logo.showText}
            onChange={e => updateConfig('logo.showText', e.target.checked)}
            className="w-4 h-4 accent-primary"
          />
          <span className="text-sm text-muted-foreground">Mostrar nombre junto al logo</span>
        </label>
      </div>

      <ImageUploader
        label="Imagen del logo"
        value={logo.image}
        onChange={v => updateConfig('logo.image', v)}
        onClear={() => updateConfig('logo.image', '')}
        hint="Si no subes imagen se usará el bloque de texto con las iniciales."
      />

      <div>
        <h3 className="text-sm font-semibold mb-1">Tamaño del logo</h3>
        <p className="text-xs text-muted-foreground mb-3">
          Arrastra para ajustar la altura del logo en píxeles.
        </p>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={20}
            max={80}
            step={2}
            value={logo.size ?? 32}
            onChange={e => updateConfig('logo.size', Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="text-sm font-mono w-12 text-right">{logo.size ?? 32}px</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-1">Color del bloque de acento</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Color del cuadrado detrás de las iniciales cuando no hay imagen.
        </p>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={logo.accentColor}
            onChange={e => updateConfig('logo.accentColor', e.target.value)}
            className="w-10 h-10 rounded cursor-pointer border border-border"
          />
          <Input
            value={logo.accentColor}
            onChange={e => updateConfig('logo.accentColor', e.target.value)}
            placeholder="#7c3aed"
            className="h-9 text-sm font-mono"
          />
        </div>
      </div>
    </div>
  )
}
