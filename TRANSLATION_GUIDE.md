# Sistema de Traducción - iasmart Landing Page

## Descripción General

La landing page de iasmart cuenta con un sistema de internacionalización completo que permite cambiar entre español (ES) e inglés (EN) de forma dinámica sin necesidad de recargar la página.

## Componentes principales

### 1. **Archivo de Traducciones** (`lib/translations.ts`)
Contiene todos los textos en español e inglés organizados por secciones:
- `header`: Navegación y botones del encabezado
- `hero`: Sección principal con estadísticas
- `solutions`: Soluciones de producto
- `industries`: Industrias/tipos de negocio
- `features`: Características clave
- `pricing`: Planes y precios
- `cta`: Call-to-action
- `footer`: Pie de página

### 2. **Contexto de Lenguaje** (`lib/language-context.tsx`)
Proveedor de React que gestiona el estado del idioma actual y proporciona:
- `language`: Idioma actual ('es' | 'en')
- `setLanguage()`: Función para cambiar el idioma
- `t()`: Función para acceder a las traducciones usando rutas de punto (ej: 'header.soluciones')

### 3. **Header actualizado** (`components/header.tsx`)
Incluye botones ES/EN para cambiar el idioma:
- Indica visualmente el idioma activo
- Cambia toda la página instantáneamente

## Cómo agregar nuevas traducciones

1. Abre `lib/translations.ts`
2. Agrega el texto en ambos idiomas bajo la sección correspondiente:

```typescript
export const translations = {
  es: {
    miSeccion: {
      miTexto: 'Texto en español',
    },
  },
  en: {
    miSeccion: {
      miTexto: 'Text in English',
    },
  },
}
```

3. En tu componente, usa el hook `useLanguage()`:

```tsx
'use client'

import { useLanguage } from '@/lib/language-context'

export function MiComponente() {
  const { t } = useLanguage()
  
  return <h1>{t('miSeccion.miTexto')}</h1>
}
```

## Cómo usar en componentes

Todos los componentes que muestran texto deben:

1. Ser marcados con `'use client'`
2. Importar el hook: `import { useLanguage } from '@/lib/language-context'`
3. Usar el hook: `const { t } = useLanguage()`
4. Reemplazar texto hardcodeado con `t('ruta.del.texto')`

Ejemplo completo:

```tsx
'use client'

import { useLanguage } from '@/lib/language-context'

export function MiComponente() {
  const { t } = useLanguage()
  
  return (
    <div>
      <h1>{t('header.titulo')}</h1>
      <p>{t('header.descripcion')}</p>
    </div>
  )
}
```

## Cambiar idioma por defecto

Para cambiar el idioma por defecto de la aplicación, edita `lib/language-context.tsx`:

```typescript
const [language, setLanguage] = useState<Language>('es') // Cambiar a 'en'
```

## Notas importantes

- El cambio de idioma es instantáneo sin recarga de página
- El contexto se proporciona en `app/layout.tsx`, envolviendo toda la aplicación
- La página `app/page.tsx` debe ser un componente cliente para acceder al contexto
- Las traducciones se actualizan en tiempo real cuando cambias el idioma
