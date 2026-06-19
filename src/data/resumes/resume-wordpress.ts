// src/data/resumes/resume-wordpress.ts
import type { ResumeData } from '@/data/resume'

export const resumeWordpress: ResumeData = {
  name: 'Nick Granados',
  title: {
    en: 'WordPress Developer',
    es: 'Desarrollador WordPress',
    pt: 'Desenvolvedor WordPress',
  },
  contact: {
    email: 'nickgranados01@gmail.com',
    phone: '+55 46 99109-6679',
    location: {
      en: 'Paraná, Brazil',
      es: 'Paraná, Brasil',
      pt: 'Paraná, Brasil',
    },
    availability: {
      en: 'Open to full-time remote and freelance',
      es: 'Abierto a full-time remoto y freelance',
      pt: 'Aberto a full-time remoto e freelance',
    },
    linkedin: 'https://www.linkedin.com/in/nick-granados',
    github: 'https://github.com/internick2017',
  },
  summary: {
    en: "I build and scale WordPress platforms — custom plugins, Gutenberg blocks, Carbon Fields and ACF-driven content structures, and REST API integrations. 6+ years of WordPress development including agency work at Apiki and 20+ freelance projects, collaborating with marketing and design teams to ship SEO-friendly, performant sites.",
    es: 'Construyo y escalo plataformas WordPress — plugins personalizados, bloques Gutenberg, estructuras de contenido con Carbon Fields y ACF, e integraciones REST API. Más de 6 años de desarrollo WordPress, incluyendo trabajo de agencia en Apiki y más de 20 proyectos freelance, colaborando con equipos de marketing y diseño para entregar sitios con buen rendimiento y SEO.',
    pt: 'Desenvolvo e escalo plataformas WordPress — plugins personalizados, blocos Gutenberg, estruturas de conteúdo com Carbon Fields e ACF, e integrações REST API. Mais de 6 anos de desenvolvimento WordPress, incluindo trabalho em agência na Apiki e mais de 20 projetos freelance, colaborando com equipes de marketing e design para entregar sites com boa performance e SEO.',
  },
  topSkills: ['WordPress', 'PHP', 'Gutenberg', 'Carbon Fields', 'ACF', 'WooCommerce', 'WPML', 'REST API'],
  experience: [
    {
      role: 'WordPress Back-End Developer',
      company: 'Apiki WordPress',
      employmentType: { en: 'Contract', es: 'Contrato', pt: 'Contrato' },
      location: {
        en: 'Brazil · Remote',
        es: 'Brasil · Remoto',
        pt: 'Brasil · Remoto',
      },
      startDate: '2022-08',
      endDate: null,
      bullets: [
        {
          en: 'Created and customized plugins that increased user engagement by 30% across multiple platforms.',
          es: 'Creé y personalicé plugins que aumentaron la participación de usuarios en un 30% en múltiples plataformas.',
          pt: 'Criei e personalizei plugins que aumentaram o engajamento dos usuários em 30% em várias plataformas.',
        },
        {
          en: 'Built custom Gutenberg blocks and Carbon Fields content structures, enabling editors to manage complex page layouts independently.',
          es: 'Construí bloques Gutenberg personalizados y estructuras de contenido con Carbon Fields, permitiendo a los editores gestionar layouts complejos de forma independiente.',
          pt: 'Construí blocos Gutenberg personalizados e estruturas de conteúdo com Carbon Fields, permitindo que editores gerenciem layouts complexos de forma independente.',
        },
        {
          en: 'Developed custom REST API endpoints and WooCommerce integrations that reduced data processing time by 25%.',
          es: 'Desarrollé endpoints REST API personalizados e integraciones WooCommerce que redujeron el tiempo de procesamiento de datos en un 25%.',
          pt: 'Desenvolvi endpoints REST API personalizados e integrações WooCommerce que reduziram o tempo de processamento de dados em 25%.',
        },
        {
          en: 'Maintained WPML-powered multilingual multisite environment with WP-CLI automation for deployments and database management.',
          es: 'Mantuve un entorno multisitio multilingüe con WPML, automatizando despliegues y gestión de bases de datos con WP-CLI.',
          pt: 'Mantive um ambiente multisite multilíngue com WPML, automatizando deploys e gerenciamento de banco de dados com WP-CLI.',
        },
      ],
    },
    {
      role: 'PHP Developer',
      company: 'CEICOM Marketing e Tecnologia Digital',
      employmentType: {
        en: 'Indirect Contract',
        es: 'Contrato Indirecto',
        pt: 'Contrato Indireto',
      },
      location: {
        en: 'Francisco Beltrão, Paraná, Brazil',
        es: 'Francisco Beltrão, Paraná, Brasil',
        pt: 'Francisco Beltrão, Paraná, Brasil',
      },
      startDate: '2021-04',
      endDate: '2023-06',
      bullets: [
        {
          en: 'Spearheaded requirements gathering and solution architecture, aligning project outcomes with client expectations.',
          es: 'Lideré el relevamiento de requisitos y la arquitectura de soluciones, alineando los resultados del proyecto con las expectativas del cliente.',
          pt: 'Liderei o levantamento de requisitos e a arquitetura de soluções, alinhando os resultados do projeto às expectativas do cliente.',
        },
        {
          en: 'Built custom PHP/WordPress solutions using ACF for dynamic content modeling, covering full project lifecycle from client briefing to production deployment.',
          es: 'Desarrollé soluciones PHP/WordPress personalizadas con ACF para modelado dinámico de contenido, cubriendo el ciclo completo del proyecto desde el briefing hasta el despliegue en producción.',
          pt: 'Desenvolvi soluções PHP/WordPress personalizadas com ACF para modelagem dinâmica de conteúdo, cobrindo o ciclo completo do projeto desde o briefing até o deploy em produção.',
        },
        {
          en: 'Delivered and maintained bespoke evaluation and data management systems for regional clients using PHP and WordPress.',
          es: 'Desarrollé y mantuve sistemas de evaluación y gestión de datos a medida para clientes regionales con PHP y WordPress.',
          pt: 'Desenvolvi e mantive sistemas de avaliação e gestão de dados personalizados para clientes regionais usando PHP e WordPress.',
        },
      ],
    },
    {
      role: 'Freelancer',
      company: 'Self-employed',
      employmentType: { en: 'Freelance', es: 'Freelance', pt: 'Freelance' },
      location: {
        en: 'Francisco Beltrão, Paraná, Brazil',
        es: 'Francisco Beltrão, Paraná, Brasil',
        pt: 'Francisco Beltrão, Paraná, Brasil',
      },
      startDate: '2021-01',
      endDate: null,
      bullets: [
        {
          en: 'Completed over 20 WordPress projects with a 100% on-time delivery rate.',
          es: 'Completé más de 20 proyectos WordPress con una tasa de entrega a tiempo del 100%.',
          pt: 'Concluí mais de 20 projetos WordPress com uma taxa de entrega no prazo de 100%.',
        },
        {
          en: 'Built custom WordPress themes and plugins with ACF integration for clients across retail, services, and education sectors.',
          es: 'Desarrollé temas y plugins personalizados de WordPress con integración de ACF para clientes en sectores de retail, servicios y educación.',
          pt: 'Desenvolvi temas e plugins personalizados de WordPress com integração de ACF para clientes nos setores de varejo, serviços e educação.',
        },
        {
          en: 'Developed expertise in project management, WordPress development, and direct client communication.',
          es: 'Desarrollé experiencia en gestión de proyectos, desarrollo WordPress y comunicación directa con clientes.',
          pt: 'Desenvolvi experiência em gestão de projetos, desenvolvimento WordPress e comunicação direta com clientes.',
        },
      ],
    },
    {
      role: 'Founder & CEO',
      company: 'Aresmkt Marketing',
      employmentType: { en: 'Self-employed', es: 'Autónomo', pt: 'Autônomo' },
      location: {
        en: 'Francisco Beltrão, Paraná, Brazil',
        es: 'Francisco Beltrão, Paraná, Brasil',
        pt: 'Francisco Beltrão, Paraná, Brasil',
      },
      startDate: '2019-11',
      endDate: '2020-05',
      bullets: [
        {
          en: 'Founded a digital marketing agency, acquiring first clients within 3 months and managing web and campaign projects end-to-end.',
          es: 'Fundé una agencia de marketing digital, adquiriendo los primeros clientes en 3 meses y gestionando proyectos web y de campaña de extremo a extremo.',
          pt: 'Fundei uma agência de marketing digital, conquistando os primeiros clientes em 3 meses e gerenciando projetos web e de campanha de ponta a ponta.',
        },
      ],
    },
    {
      role: 'Web Designer',
      company: 'Inkaweb',
      employmentType: { en: 'Full-time', es: 'Tiempo completo', pt: 'Tempo integral' },
      location: { en: 'Peru', es: 'Perú', pt: 'Peru' },
      startDate: '2018-11',
      endDate: '2021-01',
      bullets: [
        {
          en: 'Designed and developed multiple blogs and e-commerce sites using WordPress site builders.',
          es: 'Diseñé y desarrollé múltiples blogs y sitios de e-commerce usando constructores de sitios WordPress.',
          pt: 'Projetei e desenvolvi múltiplos blogs e sites de e-commerce usando construtores de sites WordPress.',
        },
        {
          en: 'Managed and optimized marketing campaigns on Google Ads and Facebook.',
          es: 'Gestioné y optimicé campañas de marketing en Google Ads y Facebook.',
          pt: 'Gerenciei e otimizei campanhas de marketing no Google Ads e Facebook.',
        },
        {
          en: 'Implemented SEO strategies that increased organic traffic by 30%.',
          es: 'Implementé estrategias de SEO que aumentaron el tráfico orgánico en un 30%.',
          pt: 'Implementei estratégias de SEO que aumentaram o tráfego orgânico em 30%.',
        },
      ],
    },
  ],
  education: [
    {
      degree: 'Certificate, Web and Computer Programming',
      institution: 'Brigham Young University–Idaho',
      startDate: '2025-01',
      endDate: '2025-06',
      note: null,
    },
    {
      degree: 'PathwayConnect, Certificate',
      institution: 'BYU-Pathway Worldwide',
      startDate: '2019-01',
      endDate: '2024-12',
      note: { en: 'Grade: A', es: 'Nota: A', pt: 'Nota: A' },
    },
  ],
}
