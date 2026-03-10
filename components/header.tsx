'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { useEditor } from '@/lib/editor-context'

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const { config } = useEditor()
  const { logo, nav } = config

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          {logo.image ? (
            <img
              src={logo.image}
              alt={logo.text}
              className="w-auto object-contain"
              style={{ height: `${logo.size ?? 32}px` }}
            />
          ) : (
            <div
              className="rounded-lg flex items-center justify-center text-white font-bold"
              style={{
                width: `${logo.size ?? 32}px`,
                height: `${logo.size ?? 32}px`,
                backgroundColor: logo.accentColor,
                fontSize: `${Math.round((logo.size ?? 32) * 0.375)}px`,
              }}
            >
              {logo.text.slice(0, 2).toLowerCase()}
            </div>
          )}
          {logo.showText && (
            <span
              className="text-foreground"
              style={{ fontSize: `${Math.round((logo.size ?? 32) * 0.625)}px` }}
            >
              {logo.text}
            </span>
          )}
        </Link>

        {/* Nav items */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.items.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage('es')}
            className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
              language === 'es'
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-muted'
            }`}
          >
            ES
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
              language === 'en'
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-muted'
            }`}
          >
            EN
          </button>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href={nav.ctaHref}>{nav.ctaLabel || t('header.comenzar')}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
