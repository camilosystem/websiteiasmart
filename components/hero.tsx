'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useEditor } from '@/lib/editor-context'
import { HeroNetworkBg } from '@/components/hero-network-bg'

export function Hero() {
  const { t } = useLanguage()
  const { config } = useEditor()
  const stats = t('hero.stats')
  const sec = config.sections.hero

  if (!sec.visible) return null

  const sectionStyle: React.CSSProperties = {
    ...(sec.bgColor ? { backgroundColor: sec.bgColor } : {}),
    ...(sec.bgImage ? { backgroundImage: `url(${sec.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}),
    ...(sec.textColor ? { color: sec.textColor } : {}),
  }

  const title = sec.title || t('hero.titulo')
  const description = sec.description || t('hero.descripcion')
  const ctaLabel = sec.ctaLabel || t('hero.cta')
  const ctaSecondary = sec.ctaSecondaryLabel || 'Ver Capacidades'

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-20 px-4 overflow-hidden" style={sectionStyle}>
      {sec.customCss && <style dangerouslySetInnerHTML={{ __html: sec.customCss }} />}

      {/* Animated network background — hidden when a custom bg image is set */}
      {!sec.bgImage && <HeroNetworkBg />}

      {/* Radial vignette so content stays legible */}
      {!sec.bgImage && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, hsl(var(--background) / 0.85) 100%), linear-gradient(to bottom, hsl(var(--background) / 0.1) 0%, hsl(var(--background) / 0.95) 100%)',
          }}
        />
      )}
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="flex flex-col items-center text-center gap-6 md:gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{sec.badge || 'IA Transformation'}</span>
          </div>

          {sec.image && (
            <img src={sec.image} alt="Hero" className="w-full max-w-xl rounded-xl shadow-lg object-cover" />
          )}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-muted">
              {ctaSecondary}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12 w-full max-w-2xl">
            {stats.map((stat: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="text-3xl font-bold text-primary">{stat.numero}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
