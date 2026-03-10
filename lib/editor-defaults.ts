export interface SectionConfig {
  visible: boolean
  bgColor: string
  bgImage: string
  textColor: string
  customCss: string
}

export interface NavItem {
  label: string
  href: string
}

export interface EditorConfig {
  logo: {
    text: string
    image: string
    showText: boolean
    accentColor: string
    size: number   // px — applies to both the icon block and the uploaded image height
  }
  colors: {
    primary: string
    secondary: string
    background: string
    foreground: string
    muted: string
    accent: string
  }
  nav: {
    items: NavItem[]
    ctaLabel: string
    ctaHref: string
  }
  sections: {
    hero: SectionConfig & {
      badge: string
      title: string
      description: string
      ctaLabel: string
      ctaSecondaryLabel: string
      image: string
    }
    solutions: SectionConfig & { title: string; description: string }
    industries: SectionConfig & { title: string }
    features: SectionConfig & { title: string }
    pricing: SectionConfig & { title: string; subtitle: string }
    cta: SectionConfig & { title: string; description: string; ctaLabel: string }
    footer: SectionConfig & {
      tagline: string
      email: string
      phone: string
      address: string
      copyright: string
    }
  }
  customCode: {
    headHtml: string
    bodyStartHtml: string
    bodyEndHtml: string
    customCss: string
  }
}

export const defaultEditorConfig: EditorConfig = {
  logo: {
    text: 'iasmart',
    image: '',
    showText: true,
    accentColor: '#7c3aed',
    size: 32,
  },
  colors: {
    primary: '#7c3aed',
    secondary: '#0d9488',
    background: '#fafaf9',
    foreground: '#1a1a2e',
    muted: '#f0f0f4',
    accent: '#7c3aed',
  },
  nav: {
    items: [
      { label: 'Soluciones', href: '#soluciones' },
      { label: 'Características', href: '#caracteristicas' },
      { label: 'Clientes', href: '#clientes' },
      { label: 'Contacto', href: '#contacto' },
    ],
    ctaLabel: 'Comenzar',
    ctaHref: '#contacto',
  },
  sections: {
    hero: {
      visible: true,
      bgColor: '',
      bgImage: '',
      textColor: '',
      customCss: '',
      badge: 'IA Transformation',
      title: '',
      description: '',
      ctaLabel: '',
      ctaSecondaryLabel: 'Ver Capacidades',
      image: '',
    },
    solutions: {
      visible: true,
      bgColor: '',
      bgImage: '',
      textColor: '',
      customCss: '',
      title: '',
      description: '',
    },
    industries: {
      visible: true,
      bgColor: '',
      bgImage: '',
      textColor: '',
      customCss: '',
      title: '',
    },
    features: {
      visible: true,
      bgColor: '',
      bgImage: '',
      textColor: '',
      customCss: '',
      title: '',
    },
    pricing: {
      visible: true,
      bgColor: '',
      bgImage: '',
      textColor: '',
      customCss: '',
      title: '',
      subtitle: '',
    },
    cta: {
      visible: true,
      bgColor: '',
      bgImage: '',
      textColor: '',
      customCss: '',
      title: '',
      description: '',
      ctaLabel: '',
    },
    footer: {
      visible: true,
      bgColor: '',
      bgImage: '',
      textColor: '',
      customCss: '',
      tagline: 'Transformando negocios con soluciones SaaS inteligentes.',
      email: 'info@iasmart.com',
      phone: '+57 (XXX) XXX-XXXX',
      address: 'Tu Ciudad, País',
      copyright: '© 2024 iasmart. Todos los derechos reservados.',
    },
  },
  customCode: {
    headHtml: '',
    bodyStartHtml: '',
    bodyEndHtml: '',
    customCss: '',
  },
}
