'use client'

import { useEditor } from '@/lib/editor-context'
import { EditorConfig } from '@/lib/editor-defaults'

/**
 * Returns inline style for a section wrapper based on editor config.
 * bgColor and bgImage override the Tailwind classes; textColor cascades down.
 */
export function useSectionStyle(sectionKey: keyof EditorConfig['sections']) {
  const { config } = useEditor()
  const section = config.sections[sectionKey]

  const style: React.CSSProperties = {}

  if (section.bgColor) {
    style.backgroundColor = section.bgColor
  }

  if (section.bgImage) {
    style.backgroundImage = `url(${section.bgImage})`
    style.backgroundSize = 'cover'
    style.backgroundPosition = 'center'
  }

  if (section.textColor) {
    style.color = section.textColor
  }

  return { style, visible: section.visible, customCss: section.customCss }
}

/**
 * Builds a CSS variable string for colors from editor config.
 * Returns an object of CSS custom properties to apply to :root inline.
 */
export function useColorVars() {
  const { config } = useEditor()
  const c = config.colors

  // Convert hex to a format we can inject — we use inline vars on the root wrapper
  return {
    '--color-primary-override': c.primary,
    '--color-secondary-override': c.secondary,
  } as React.CSSProperties
}
