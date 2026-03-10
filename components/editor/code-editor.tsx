'use client'

import { useEditor } from '@/lib/editor-context'
import { Textarea } from '@/components/ui/textarea'

interface CodeFieldProps {
  path: string
  label: string
  hint: string
  placeholder: string
}

function CodeField({ path, label, hint, placeholder }: CodeFieldProps) {
  const { config, updateConfig } = useEditor()
  const keys = path.split('.')
  let value: any = config
  for (const k of keys) value = value?.[k]

  return (
    <div className="flex flex-col gap-2">
      <div>
        <label className="text-sm font-semibold block">{label}</label>
        <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>
      </div>
      <Textarea
        value={value || ''}
        onChange={e => updateConfig(path, e.target.value)}
        placeholder={placeholder}
        className="text-xs font-mono resize-none h-32 bg-muted/30"
        spellCheck={false}
      />
    </div>
  )
}

export function CodeEditor() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-xs text-muted-foreground">
        El código personalizado se inyecta directamente en la página. Úsalo con cuidado — HTML, CSS y scripts no válidos pueden romper el diseño.
      </p>

      <CodeField
        path="customCode.headHtml"
        label="HTML en &lt;head&gt;"
        hint="Scripts de analytics, meta tags, fuentes externas, etc."
        placeholder={'<!-- Google Analytics -->\n<script>...</script>'}
      />

      <CodeField
        path="customCode.bodyStartHtml"
        label="HTML al inicio del &lt;body&gt;"
        hint="Chat widgets, banners globales, scripts de inicio."
        placeholder={'<!-- Widget de chat -->\n<div id="my-widget"></div>'}
      />

      <CodeField
        path="customCode.bodyEndHtml"
        label="HTML al final del &lt;body&gt;"
        hint="Scripts que deben cargarse después del contenido."
        placeholder={'<!-- Scripts de fin de body -->\n<script src="..."></script>'}
      />

      <CodeField
        path="customCode.customCss"
        label="CSS personalizado global"
        hint="Estilos adicionales aplicados a toda la página."
        placeholder={'.mi-clase {\n  color: red;\n}'}
      />
    </div>
  )
}
