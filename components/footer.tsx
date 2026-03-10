'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useEditor } from '@/lib/editor-context'

export function Footer() {
  const { t } = useLanguage()
  const { config } = useEditor()
  const sec = config.sections.footer
  const logo = config.logo

  if (!sec.visible) return null

  const sectionStyle: React.CSSProperties = {
    ...(sec.bgColor ? { backgroundColor: sec.bgColor } : {}),
    ...(sec.bgImage ? { backgroundImage: `url(${sec.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}),
    ...(sec.textColor ? { color: sec.textColor } : {}),
  }

  return (
    <footer className="bg-muted/50 border-t border-border py-12 px-4" style={sectionStyle}>
      {sec.customCss && <style dangerouslySetInnerHTML={{ __html: sec.customCss }} />}
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              {logo.image ? (
                <img src={logo.image} alt={logo.text} className="h-8 w-auto object-contain" />
              ) : (
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: logo.accentColor }}
                >
                  {logo.text.slice(0, 2).toLowerCase()}
                </div>
              )}
              {logo.showText && (
                <span className="font-bold text-lg">{logo.text}</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {sec.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold">{t('footer.producto')}</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.features')}
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.precios')}
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.seguridad')}
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold">{t('footer.empresa')}</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.sobre')}
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.blog')}
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.carreras')}
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold">{t('footer.legal')}</h4>
            <a href={`mailto:${sec.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-4 h-4" />
              {sec.email}
            </a>
            <a href={`tel:${sec.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="w-4 h-4" />
              {sec.phone}
            </a>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{sec.address}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {sec.copyright}
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.privacidad')}
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.terminos')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
