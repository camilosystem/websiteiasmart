'use client'

import { useState } from 'react'
import { useEditor } from '@/lib/editor-context'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUploader } from '@/components/editor/image-uploader'
import { ChevronDown, ChevronRight, Eye, EyeOff } from 'lucide-react'

interface SectionPanelProps {
  title: string
  sectionKey: string
  children?: React.ReactNode
  defaultOpen?: boolean
}

function SectionPanel({ title, sectionKey, children, defaultOpen = false }: SectionPanelProps) {
  const [open, setOpen] = useState(defaultOpen)
  const { config, updateConfig } = useEditor()
  const section = (config.sections as any)[sectionKey]

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-2 flex-1 text-left"
        >
          {open ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          <span className="text-sm font-semibold">{title}</span>
        </button>
        <button
          onClick={() => updateConfig(`sections.${sectionKey}.visible`, !section.visible)}
          className={`p-1 rounded transition-colors ${section.visible ? 'text-primary' : 'text-muted-foreground'}`}
          title={section.visible ? 'Ocultar sección' : 'Mostrar sección'}
        >
          {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>

      {open && (
        <div className="p-4 flex flex-col gap-4">
          {/* Background controls always shown */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Color de fondo</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={section.bgColor || '#ffffff'}
                  onChange={e => updateConfig(`sections.${sectionKey}.bgColor`, e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-border shrink-0"
                />
                <Input
                  value={section.bgColor}
                  onChange={e => updateConfig(`sections.${sectionKey}.bgColor`, e.target.value)}
                  placeholder="Heredado"
                  className="h-8 text-xs font-mono"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Color de texto</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={section.textColor || '#000000'}
                  onChange={e => updateConfig(`sections.${sectionKey}.textColor`, e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-border shrink-0"
                />
                <Input
                  value={section.textColor}
                  onChange={e => updateConfig(`sections.${sectionKey}.textColor`, e.target.value)}
                  placeholder="Heredado"
                  className="h-8 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <ImageUploader
            label="Imagen de fondo"
            value={section.bgImage}
            onChange={v => updateConfig(`sections.${sectionKey}.bgImage`, v)}
            onClear={() => updateConfig(`sections.${sectionKey}.bgImage`, '')}
            hint="Se usará como background-image de la sección."
          />

          {children}

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">CSS personalizado</label>
            <Textarea
              value={section.customCss}
              onChange={e => updateConfig(`sections.${sectionKey}.customCss`, e.target.value)}
              placeholder=".mi-clase { ... }"
              className="text-xs font-mono resize-none h-20"
            />
          </div>
        </div>
      )}
    </div>
  )
}

function TextField({ path, label, placeholder }: { path: string; label: string; placeholder?: string }) {
  const { config, updateConfig } = useEditor()
  const keys = path.split('.')
  let value: any = config
  for (const k of keys) value = value?.[k]

  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
      <Input
        value={value || ''}
        onChange={e => updateConfig(path, e.target.value)}
        placeholder={placeholder}
        className="h-8 text-sm"
      />
    </div>
  )
}

function TextareaField({ path, label, placeholder }: { path: string; label: string; placeholder?: string }) {
  const { config, updateConfig } = useEditor()
  const keys = path.split('.')
  let value: any = config
  for (const k of keys) value = value?.[k]

  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
      <Textarea
        value={value || ''}
        onChange={e => updateConfig(path, e.target.value)}
        placeholder={placeholder}
        className="text-sm resize-none h-20"
      />
    </div>
  )
}

export function SectionsEditor() {
  const { updateConfig } = useEditor()

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-muted-foreground">
        Cada sección puede ocultarse, cambiar fondo, imagen y texto. Los campos de texto vacíos usan las traducciones por defecto.
      </p>

      <SectionPanel title="Hero" sectionKey="hero" defaultOpen>
        <TextField path="sections.hero.badge" label="Texto del badge" placeholder="IA Transformation" />
        <TextField path="sections.hero.title" label="Título (sobreescribe traducción)" placeholder="Transforma tus Ideas..." />
        <TextareaField path="sections.hero.description" label="Descripción" placeholder="Descripción del hero..." />
        <TextField path="sections.hero.ctaLabel" label="Texto del botón CTA" placeholder="Consulta Gratis" />
        <TextField path="sections.hero.ctaSecondaryLabel" label="Texto del botón secundario" placeholder="Ver Capacidades" />
        <ImageUploader
          label="Imagen destacada"
          value={''}
          onChange={v => updateConfig('sections.hero.image', v)}
          onClear={() => updateConfig('sections.hero.image', '')}
          hint="Imagen opcional que aparece en el hero."
        />
      </SectionPanel>

      <SectionPanel title="Soluciones" sectionKey="solutions">
        <TextField path="sections.solutions.title" label="Título de la sección" placeholder="Nuestras Soluciones" />
        <TextField path="sections.solutions.description" label="Subtítulo" placeholder="Tecnología de punta..." />
      </SectionPanel>

      <SectionPanel title="Industrias" sectionKey="industries">
        <TextField path="sections.industries.title" label="Título de la sección" placeholder="Soluciones para tu Tipo de Negocio" />
      </SectionPanel>

      <SectionPanel title="Características" sectionKey="features">
        <TextField path="sections.features.title" label="Título de la sección" placeholder="Por qué Elegirnos" />
      </SectionPanel>

      <SectionPanel title="Precios" sectionKey="pricing">
        <TextField path="sections.pricing.title" label="Título de la sección" placeholder="Precios Insuperables" />
        <TextField path="sections.pricing.subtitle" label="Subtítulo" placeholder="Sin sorpresas, sin costos ocultos" />
      </SectionPanel>

      <SectionPanel title="CTA / Llamada a Acción" sectionKey="cta">
        <TextField path="sections.cta.title" label="Título" placeholder="¿Listo para Transformar tu Negocio?" />
        <TextareaField path="sections.cta.description" label="Descripción" placeholder="Nuestros expertos te asesorarán..." />
        <TextField path="sections.cta.ctaLabel" label="Texto del botón" placeholder="Agendar Consulta Gratis" />
      </SectionPanel>

      <SectionPanel title="Footer" sectionKey="footer">
        <TextField path="sections.footer.tagline" label="Tagline de la empresa" placeholder="Transformando negocios..." />
        <TextField path="sections.footer.email" label="Email de contacto" placeholder="info@iasmart.com" />
        <TextField path="sections.footer.phone" label="Teléfono" placeholder="+57 (XXX) XXX-XXXX" />
        <TextField path="sections.footer.address" label="Dirección / Ciudad" placeholder="Tu Ciudad, País" />
        <TextField path="sections.footer.copyright" label="Texto de copyright" placeholder="© 2024 iasmart..." />
      </SectionPanel>
    </div>
  )
}
