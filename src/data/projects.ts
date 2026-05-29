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
    id: 'lanny-herrera',
    translations: {
      en: {
        title: 'Lanny Herrera — Language Teacher Website',
        description: 'Multilingual one-page website for an online language teacher. Built on WordPress with a custom Astra child theme, Polylang (PT/ES/EN), custom testimonials CPT, Contact Form 7, Yoast SEO with per-language meta, and CI/CD auto-deploy via GitHub Actions + SFTP.',
      },
      es: {
        title: 'Lanny Herrera — Sitio Web para Profesora de Idiomas',
        description: 'Sitio web one-page multilingüe para una profesora de idiomas online. Construido en WordPress con tema hijo personalizado de Astra, Polylang (PT/ES/EN), CPT de testimonios, Contact Form 7, Yoast SEO con meta por idioma y deploy automático via GitHub Actions + SFTP.',
      },
      pt: {
        title: 'Lanny Herrera — Site para Professora de Idiomas',
        description: 'Site one-page multilíngue para professora de idiomas online. Construído em WordPress com tema filho Astra customizado, Polylang (PT/ES/EN), CPT de depoimentos, Contact Form 7, Yoast SEO com meta por idioma e deploy automático via GitHub Actions + SFTP.',
      },
    },
    technologies: ['WordPress', 'PHP', 'Astra', 'Polylang', 'Contact Form 7', 'Yoast SEO', 'GitHub Actions', 'CSS3'],
    github: null,
    demo: 'https://lanny.nickgranados.com',
    image: '/images/project-lanny.png',
  },
  {
    id: 'dose-time',
    translations: {
      en: {
        title: 'DoseTime — Medication Reminder App',
        description: 'Android app that generates automatic push notifications from doctor-prescribed medication schedules. Features a daily dose timeline, medication management, history with adherence tracking, and local SQLite storage — no backend or account needed.',
      },
      es: {
        title: 'DoseTime — App de Recordatorio de Medicamentos',
        description: 'App Android que genera notificaciones push automáticas a partir de horarios médicos. Incluye línea de tiempo diaria de dosis, gestión de medicamentos, historial con porcentaje de adherencia y almacenamiento local SQLite — sin backend ni cuenta requerida.',
      },
      pt: {
        title: 'DoseTime — App de Lembretes de Medicamentos',
        description: 'App Android que gera notificações push automáticas a partir de horários médicos. Inclui linha do tempo diária de doses, gestão de medicamentos, histórico com aderência e armazenamento local SQLite — sem backend ou conta necessária.',
      },
    },
    technologies: ['React Native', 'Expo SDK 52', 'TypeScript', 'SQLite', 'Zustand', 'expo-notifications', 'React Navigation', 'EAS Build'],
    github: null,
    demo: 'https://expo.dev/accounts/internick/projects/dose-time/builds/7087ee49-0135-4e69-aa96-95b0a9068a57',
    image: '/images/project-dosetime.png',
  },
  {
    id: 'event-planner-api',
    translations: {
      en: {
        title: 'Event Planner API',
        description: 'RESTful API for managing events, venues, and RSVPs. Built as BYU CSE341 final project with OAuth2 Google authentication, full CRUD operations, Swagger/OpenAPI interactive docs, and a Jest test suite. Deployed on Render.',
      },
      es: {
        title: 'API de Planificación de Eventos',
        description: 'API RESTful para gestionar eventos, venues y RSVPs. Proyecto final BYU CSE341 con autenticación OAuth2 Google, operaciones CRUD completas, documentación interactiva Swagger/OpenAPI y suite de pruebas Jest. Desplegada en Render.',
      },
      pt: {
        title: 'API de Planejamento de Eventos',
        description: 'API RESTful para gerenciar eventos, venues e RSVPs. Projeto final BYU CSE341 com autenticação OAuth2 Google, operações CRUD completas, documentação interativa Swagger/OpenAPI e suite de testes Jest. Implantada no Render.',
      },
    },
    technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'OAuth2', 'Passport.js', 'Swagger', 'Jest'],
    github: 'https://github.com/internick2017/event-planner-api',
    demo: 'https://event-planner-api-oihl.onrender.com/api-docs',
    image: '/images/project-event-planner-api.png',
  },
  {
    id: 'clear-path',
    translations: {
      en: {
        title: 'Clear Path — Personal Finance Dashboard',
        description: 'Full-stack personal finance app built with Laravel 12, Vue 3, and Inertia.js. Track expenses, set budgets, and monitor financial goals with an interactive dashboard.',
      },
      es: {
        title: 'Clear Path — Panel de Finanzas Personales',
        description: 'App de finanzas personales full-stack con Laravel 12, Vue 3 e Inertia.js. Registrá gastos, creá presupuestos y seguí tus metas financieras desde un dashboard interactivo.',
      },
      pt: {
        title: 'Clear Path — Painel de Finanças Pessoais',
        description: 'App de finanças pessoais full-stack com Laravel 12, Vue 3 e Inertia.js. Registre gastos, crie orçamentos e acompanhe suas metas financeiras em um dashboard interativo.',
      },
    },
    technologies: ['Laravel', 'Vue 3', 'Inertia.js', 'Tailwind CSS', 'SQLite', 'PHP'],
    github: 'https://github.com/internick2017/clear-path',
    demo: 'https://clear-path-9008.onrender.com',
    image: '/images/project-clear-path.png',
  },
  {
    id: 'sleepouside',
    translations: {
      en: {
        title: 'SleepOutside — Outdoor E-commerce',
        description: 'Vanilla JavaScript e-commerce SPA for outdoor gear. Features product listings with live API data, shopping cart with localStorage, checkout flow, and product detail pages. Built for BYU WDD330.',
      },
      es: {
        title: 'SleepOutside — E-commerce de Camping',
        description: 'SPA de e-commerce en Vanilla JS para equipos de camping. Incluye listado de productos con API en vivo, carrito con localStorage, flujo de checkout y páginas de detalle. Proyecto final BYU WDD330.',
      },
      pt: {
        title: 'SleepOutside — E-commerce de Camping',
        description: 'SPA de e-commerce em Vanilla JS para equipamentos de camping. Inclui listagem de produtos com API ao vivo, carrinho com localStorage, fluxo de checkout e páginas de detalhe. Projeto final BYU WDD330.',
      },
    },
    technologies: ['JavaScript', 'Vite', 'HTML5', 'CSS3', 'REST API', 'localStorage'],
    github: 'https://github.com/internick2017/wdd330-sleepouside',
    demo: 'https://internick2017.github.io/wdd330-sleepouside/',
    image: '/images/project-sleepouside.png',
  },
  {
    id: 'drf-course-api',
    translations: {
      en: {
        title: 'DRF Course API — E-commerce REST API',
        description: 'Django REST Framework e-commerce API with JWT authentication, product/order management, filtering, pagination, and interactive Swagger docs. Built as a learning project covering DRF\'s core patterns.',
      },
      es: {
        title: 'DRF Course API — REST API de E-commerce',
        description: 'API de e-commerce con Django REST Framework, autenticación JWT, gestión de productos y órdenes, filtrado, paginación y docs Swagger interactivos.',
      },
      pt: {
        title: 'DRF Course API — REST API de E-commerce',
        description: 'API de e-commerce com Django REST Framework, autenticação JWT, gestão de produtos e pedidos, filtragem, paginação e docs Swagger interativos.',
      },
    },
    technologies: ['Python', 'Django', 'Django REST Framework', 'JWT', 'PostgreSQL', 'Swagger/OpenAPI', 'django-filter'],
    github: 'https://github.com/internick2017/drf-course-api',
    demo: 'https://drf-course-api-o6rf.onrender.com/api/docs/',
    image: '/images/project-drf-course-api.png',
  },
  {
    id: 'laravel-image-api',
    translations: {
      en: {
        title: 'Laravel Image Manipulation API',
        description: 'RESTful API for image resizing and album management, built with Laravel 8 and Sanctum. Features token authentication, album grouping, and interactive Swagger/OpenAPI documentation.',
      },
      es: {
        title: 'API de Manipulación de Imágenes con Laravel',
        description: 'API REST para redimensionado de imágenes y gestión de álbumes, construida con Laravel 8 y Sanctum. Autenticación por token, agrupación en álbumes y documentación Swagger interactiva.',
      },
      pt: {
        title: 'API de Manipulação de Imagens com Laravel',
        description: 'API REST para redimensionamento de imagens e gestão de álbuns, construída com Laravel 8 e Sanctum. Autenticação por token, agrupamento em álbuns e documentação Swagger interativa.',
      },
    },
    technologies: ['PHP', 'Laravel', 'Laravel Sanctum', 'MySQL', 'Swagger/OpenAPI', 'Intervention Image'],
    github: 'https://github.com/internick2017/laravel-image-manipulation',
    demo: 'https://image-api.nickgranados.com/api/documentation',
    image: '/images/project-laravel-image-api.png',
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
