'use client'

import { Card } from '@/components/ui/card'
import { CheckCircle2, Brain, Zap, Lock, Cloud, Users } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useEditor } from '@/lib/editor-context'

const iconMap = {
  'Potenciado por IA': Brain,
  'Powered by AI': Brain,
  'Velocidad de Implementación': Zap,
  'Implementation Speed': Zap,
  'Seguridad Empresarial': Lock,
  'Enterprise Security': Lock,
  'Infraestructura Cloud': Cloud,
  'Cloud Infrastructure': Cloud,
  'Soporte 24/7': Users,
  '24/7 Support': Users,
  'Resultados Gigantes': CheckCircle2,
  'Giant Results': CheckCircle2,
}

export function Features() {
  const { t } = useLanguage()
  const { config } = useEditor()
  const featuresData = t('features.items')
  const sec = config.sections.features

  if (!sec.visible) return null

  const sectionStyle: React.CSSProperties = {
    ...(sec.bgColor ? { backgroundColor: sec.bgColor } : {}),
    ...(sec.bgImage ? { backgroundImage: `url(${sec.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}),
    ...(sec.textColor ? { color: sec.textColor } : {}),
  }

  return (
    <section id="caracteristicas" className="py-20 px-4 bg-primary/5" style={sectionStyle}>
      {sec.customCss && <style dangerouslySetInnerHTML={{ __html: sec.customCss }} />}
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">{sec.title || t('features.titulo')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Experiencia técnica + Pasión por resultados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map((feature: any, idx: number) => {
            const Icon = iconMap[feature.titulo as keyof typeof iconMap] || CheckCircle2
            return (
              <Card key={idx} className="p-6 border-0 bg-background hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.titulo}</h3>
                <p className="text-sm text-muted-foreground">{feature.descripcion}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
