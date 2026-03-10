'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'

interface ImageUploaderProps {
  label: string
  value: string
  onChange: (base64: string) => void
  onClear: () => void
  hint?: string
}

export function ImageUploader({ label, value, onChange, onClear, hint }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      const result = ev.target?.result
      if (typeof result === 'string') onChange(result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-foreground uppercase tracking-wide">{label}</label>
      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-border">
          <img src={value} alt={label} className="w-full h-24 object-cover" />
          <button
            onClick={onClear}
            className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Eliminar imagen"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 h-24 border-2 border-dashed border-border rounded-lg hover:border-primary/60 hover:bg-primary/5 transition-colors text-muted-foreground hover:text-primary"
        >
          <Upload className="w-5 h-5" />
          <span className="text-xs">Subir imagen</span>
        </button>
      )}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  )
}
