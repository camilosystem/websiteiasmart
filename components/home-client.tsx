'use client'

import { EditorConfig } from '@/lib/editor-defaults'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Solutions } from '@/components/solutions'
import { Industries } from '@/components/industries'
import { Features } from '@/components/features'
import { Pricing } from '@/components/pricing'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'
import { EditorFab } from '@/components/editor-fab'

interface HomeClientProps {
  config: EditorConfig
}

export function HomeClient({ config }: HomeClientProps) {
  const c = config.colors
  const cc = config.customCode

  const colorVars = {
    '--color-primary': c.primary,
    '--color-secondary': c.secondary,
    '--color-background': c.background,
    '--color-foreground': c.foreground,
    '--color-muted': c.muted,
    '--color-accent': c.accent,
    '--background': c.background,
    '--foreground': c.foreground,
    '--primary': c.primary,
    '--secondary': c.secondary,
    '--muted': c.muted,
    '--accent': c.accent,
  } as React.CSSProperties

  return (
    <div className="w-full" style={colorVars}>
      {cc.customCss && (
        <style dangerouslySetInnerHTML={{ __html: cc.customCss }} />
      )}
      {cc.bodyStartHtml && (
        <div dangerouslySetInnerHTML={{ __html: cc.bodyStartHtml }} />
      )}
      <Header />
      <Hero />
      <Solutions />
      <Industries />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
      {cc.bodyEndHtml && (
        <div dangerouslySetInnerHTML={{ __html: cc.bodyEndHtml }} />
      )}
      <EditorFab />
    </div>
  )
}
