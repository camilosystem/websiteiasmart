'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useEditor } from '@/lib/editor-context'

export function CTA() {
  const { t } = useLanguage()
  const { config } = useEditor()
  const sec = config.sections.cta

  if (!sec.visible) return null

  const sectionStyle: React.CSSProperties = {
    ...(sec.bgColor ? { backgroundColor: sec.bgColor } : {}),
    ...(sec.bgImage ? { backgroundImage: `url(${sec.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}),
    ...(sec.textColor ? { color: sec.textColor } : {}),
  }

  const title = sec.title || t('cta.titulo')
  const description = sec.description || t('cta.descripcion')
  const ctaLabel = sec.ctaLabel || t('cta.cta')

  return (
    <section id="contacto" className="py-20 px-4 bg-primary text-primary-foreground" style={sectionStyle}>
      {sec.customCss && <style dangerouslySetInnerHTML={{ __html: sec.customCss }} />}
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center gap-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            {title}
          </h2>
          <p className="text-lg opacity-90 max-w-2xl">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2">
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              Ver Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
