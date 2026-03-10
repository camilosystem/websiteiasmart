import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import { EditorProvider } from '@/lib/editor-context'
import { getEditorConfig } from '@/app/actions/editor-actions'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'iasmart - Soluciones SaaS con IA para tu Negocio',
  description: 'Transformamos tus necesidades e ideas de negocio en realidades. Soluciones personalizadas con IA, ERP, POS e integraciones. Precio insuperable, resultados gigantes.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Fetch config on the server so every visitor gets the latest
  // saved configuration without any client-side flash or delay.
  const initialConfig = await getEditorConfig()

  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <EditorProvider initialConfig={initialConfig}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </EditorProvider>
        <Analytics />
      </body>
    </html>
  )
}
