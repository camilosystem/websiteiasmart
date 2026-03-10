'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useEditor } from '@/lib/editor-context'

export function Pricing() {
  const { t } = useLanguage()
  const { config } = useEditor()
  const plans = t('pricing.plans')
  const sec = config.sections.pricing

  if (!sec.visible) return null

  const sectionStyle: React.CSSProperties = {
    ...(sec.bgColor ? { backgroundColor: sec.bgColor } : {}),
    ...(sec.bgImage ? { backgroundImage: `url(${sec.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}),
    ...(sec.textColor ? { color: sec.textColor } : {}),
  }

  return (
    <section className="py-20 px-4 bg-muted/30" style={sectionStyle}>
      {sec.customCss && <style dangerouslySetInnerHTML={{ __html: sec.customCss }} />}
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">{sec.title || t('pricing.titulo')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {sec.subtitle || t('pricing.subtitulo')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan: any, idx: number) => (
            <Card
              key={idx}
              className={`p-8 flex flex-col ${
                plan.destacado
                  ? 'border-primary border-2 shadow-xl scale-105 md:scale-100'
                  : 'border border-border'
              }`}
            >
              {plan.destacado && (
                <div className="mb-4 inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium w-fit">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.nombre}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.descripcion}</p>
              <div className="text-3xl font-bold mb-6">
                {plan.precio}
                {plan.periodo && <span className="text-lg font-normal">{plan.periodo}</span>}
              </div>

              <div className="space-y-3 flex-1 mb-6">
                {plan.features.map((feature: string, fidx: number) => (
                  <div key={fidx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full ${
                  plan.destacado
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    : 'border border-border hover:bg-muted'
                }`}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
