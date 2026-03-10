'use client'

import { Card } from '@/components/ui/card'
import { BarChart3, ShoppingCart, Zap, Database, Layers, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useEditor } from '@/lib/editor-context'

const iconMap = {
  'Sistemas POS': ShoppingCart,
  'System POS': ShoppingCart,
  'ERP Personalizado': Database,
  'Custom ERP': Database,
  'Integraciones': Zap,
  'Integrations': Zap,
  'Analytics & BI': BarChart3,
  'Automatización': Layers,
  'Automation': Layers,
  'Consultoría Técnica': CheckCircle2,
  'Technical Consulting': CheckCircle2,
}

export function Solutions() {
  const { t } = useLanguage()
  const { config } = useEditor()
  const solutionsData = t('solutions.items')
  const sec = config.sections.solutions

  if (!sec.visible) return null

  const sectionStyle: React.CSSProperties = {
    ...(sec.bgColor ? { backgroundColor: sec.bgColor } : {}),
    ...(sec.bgImage ? { backgroundImage: `url(${sec.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}),
    ...(sec.textColor ? { color: sec.textColor } : {}),
  }

  return (
    <section id="soluciones" className="py-20 px-4 bg-muted/30" style={sectionStyle}>
      {sec.customCss && <style dangerouslySetInnerHTML={{ __html: sec.customCss }} />}
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">{sec.title || t('solutions.titulo')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {sec.description || t('solutions.descripcion')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutionsData.map((solution: any, idx: number) => {
            const Icon = iconMap[solution.titulo as keyof typeof iconMap] || CheckCircle2
            return (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow border border-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{solution.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{solution.descripcion}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
