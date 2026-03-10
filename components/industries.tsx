'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UtensilsCrossed, Truck, Waves, Package, ShoppingBag, Building2 } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useEditor } from '@/lib/editor-context'

const iconMap = {
  'Restaurantes': UtensilsCrossed,
  'Restaurants': UtensilsCrossed,
  'Lavanderías': Waves,
  'Laundries': Waves,
  'Distribuidoras': Truck,
  'Distributors': Truck,
  'Minimercados': Package,
  'Minimarts': Package,
  'Grocery': ShoppingBag,
  'PYMES': Building2,
  'SMEs': Building2,
}

export function Industries() {
  const { t } = useLanguage()
  const { config } = useEditor()
  const industriesData = t('industries.items')
  const sec = config.sections.industries

  if (!sec.visible) return null

  const sectionStyle: React.CSSProperties = {
    ...(sec.bgColor ? { backgroundColor: sec.bgColor } : {}),
    ...(sec.bgImage ? { backgroundImage: `url(${sec.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}),
    ...(sec.textColor ? { color: sec.textColor } : {}),
  }

  return (
    <section id="clientes" className="py-20 px-4" style={sectionStyle}>
      {sec.customCss && <style dangerouslySetInnerHTML={{ __html: sec.customCss }} />}
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">{sec.title || t('industries.titulo')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Soluciones adaptadas a los desafíos específicos de tu industria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industriesData.map((industry: any, idx: number) => {
            const Icon = iconMap[industry.nombre as keyof typeof iconMap] || Building2
            return (
              <Card key={idx} className="p-6 border border-border hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-bold text-xl">{industry.nombre}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {industry.features.map((feature: string, fidx: number) => (
                    <Badge key={fidx} variant="outline" className="text-xs border-primary/30 text-primary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
