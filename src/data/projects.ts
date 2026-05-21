// src/data/projects.ts

export type ProjectTranslation = {
  title: string
  description: string
}

export type Project = {
  id: string
  translations: {
    en: ProjectTranslation
    es: ProjectTranslation
    pt: ProjectTranslation
  }
  technologies: string[]
  github: string | null
  demo: string | null
  image: string
}

export const projects: Project[] = [
  {
    id: 'gramtospoon',
    translations: {
      en: {
        title: 'GramToSpoon - Kitchen Conversion Tool',
        description: 'A cooking utility website that converts weight measurements (grams) into volume measurements (cups, tablespoons, and teaspoons) for 47 common kitchen ingredients across 9 categories. Features an interactive calculator and over 400 pre-built conversion pages optimized for SEO.',
      },
      es: {
        title: 'GramToSpoon - Herramienta de Conversión de Cocina',
        description: 'Un sitio web utilitario de cocina que convierte medidas de peso (gramos) a medidas de volumen (tazas, cucharadas y cucharaditas) para 47 ingredientes comunes en 9 categorías. Incluye calculadora interactiva y más de 400 páginas optimizadas para SEO.',
      },
      pt: {
        title: 'GramToSpoon - Ferramenta de Conversão Culinária',
        description: 'Um site utilitário de culinária que converte medidas de peso (gramas) em medidas de volume (xícaras, colheres de sopa e colheres de chá) para 47 ingredientes em 9 categorias. Possui calculadora interativa e mais de 400 páginas otimizadas para SEO.',
      },
    },
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'SEO Optimization', 'Schema.org', 'JSON-LD', 'Static Site Generation', 'Responsive Design'],
    github: 'https://github.com/internick2017',
    demo: 'https://gramtospoon.nickgranados.com/',
    image: '/images/project-gramtospoon.png',
  },
  {
    id: 'repairshop',
    translations: {
      en: {
        title: 'Repair Shop Management System',
        description: 'Full-stack web application for managing a computer repair business. Features customer management, work order tracking, and technician assignments with role-based authentication via Kinde and a serverless Neon PostgreSQL database.',
      },
      es: {
        title: 'Sistema de Gestión de Taller de Reparación',
        description: 'Aplicación web full-stack para administrar un negocio de reparación de computadoras. Incluye gestión de clientes, seguimiento de órdenes de trabajo y autenticación por roles con base de datos PostgreSQL serverless.',
      },
      pt: {
        title: 'Sistema de Gestão de Oficina de Reparos',
        description: 'Aplicação web full-stack para gerenciar um negócio de reparo de computadores. Inclui gestão de clientes, rastreamento de ordens de serviço e autenticação por função com banco de dados PostgreSQL serverless.',
      },
    },
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Neon Database', 'Kinde Auth', 'shadcn/ui', 'Sentry', 'React Hook Form'],
    github: null,
    demo: 'https://repairshop-puce.vercel.app/',
    image: '/images/project-repairshop.png',
  },
  {
    id: 'jjj-investments',
    translations: {
      en: {
        title: 'J.J.J Investments — Family Portfolio Platform',
        description: 'Professional family investment management platform with real-time portfolio tracking, transaction history, performance analytics, and sector distribution charts. Built with enterprise-grade security and role-based access control.',
      },
      es: {
        title: 'J.J.J Investments — Plataforma de Portafolio Familiar',
        description: 'Plataforma profesional de gestión de inversiones familiares con seguimiento de portafolio en tiempo real, historial de transacciones, análisis de rendimiento y gráficos de distribución por sector.',
      },
      pt: {
        title: 'J.J.J Investments — Plataforma de Portfólio Familiar',
        description: 'Plataforma profissional de gestão de investimentos familiares com acompanhamento de portfólio em tempo real, histórico de transações, análise de desempenho e gráficos de distribuição setorial.',
      },
    },
    technologies: ['Next.js 14', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS', 'NextAuth.js', 'Recharts', 'shadcn/ui'],
    github: null,
    demo: 'https://family-investments.netlify.app/',
    image: '/images/project-jjj.png',
  },
  {
    id: 'shadcn-nextjs',
    translations: {
      en: {
        title: 'shadcn/ui Component Showcase',
        description: 'Next.js application demonstrating a complete design system built with shadcn/ui and Radix UI primitives. Features a full component library including forms, data tables, dialogs, navigation menus, and accessible UI patterns.',
      },
      es: {
        title: 'Showcase de Componentes shadcn/ui',
        description: 'Aplicación Next.js que demuestra un sistema de diseño completo con shadcn/ui y primitivos Radix UI. Incluye biblioteca de componentes con formularios, tablas, diálogos, menús de navegación y patrones de UI accesibles.',
      },
      pt: {
        title: 'Showcase de Componentes shadcn/ui',
        description: 'Aplicação Next.js demonstrando um sistema de design completo com shadcn/ui e primitivos Radix UI. Inclui biblioteca de componentes com formulários, tabelas, diálogos, menus de navegação e padrões de UI acessíveis.',
      },
    },
    technologies: ['Next.js', 'TypeScript', 'shadcn/ui', 'Radix UI', 'Tailwind CSS', 'React Hook Form'],
    github: null,
    demo: 'https://shadcn-nextjs-app-ten.vercel.app/',
    image: '/images/project-shadcn.png',
  },
]

export function getAllTechnologies(): string[] {
  const all = projects.flatMap((p) => p.technologies)
  return [...new Set(all)].sort()
}
