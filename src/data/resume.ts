import type { Language } from '@/lib/translations'

type LocalizedText = Record<Language, string>

export interface ResumeExperience {
  role: string // no se traduce (estándar de industria en inglés)
  company: string
  employmentType: LocalizedText
  location: LocalizedText
  startDate: string // "YYYY-MM"
  endDate: string | null // "YYYY-MM" o null si es el rol actual
  bullets: LocalizedText[]
}

export interface ResumeEducation {
  degree: string // nombre oficial, no se traduce
  institution: string
  startDate: string // "YYYY-MM"
  endDate: string // "YYYY-MM"
  note: LocalizedText | null
}

export interface ResumeData {
  name: string
  title: LocalizedText
  contact: {
    email: string
    phone: string
    location: LocalizedText
    availability: LocalizedText
    linkedin: string
    github: string
  }
  summary: LocalizedText
  topSkills: string[] // tecnologías, no se traduce
  experience: ResumeExperience[]
  education: ResumeEducation[]
}

export interface CvLabels {
  summary: string
  topSkills: string
  techStack: string
  experience: string
  education: string
  print: string
}

export const resume: ResumeData = {
  name: 'Nick Granados',
  title: {
    en: 'Full Stack Developer',
    es: 'Desarrollador Full Stack',
    pt: 'Desenvolvedor Full Stack',
  },
  contact: {
    email: 'internickbr@gmail.com',
    phone: '+55 46 99109-6679',
    location: {
      en: 'Paraná, Brazil',
      es: 'Paraná, Brasil',
      pt: 'Paraná, Brasil',
    },
    availability: {
      en: 'Available for remote / freelance (part-time)',
      es: 'Disponible para remoto / freelance (medio tiempo)',
      pt: 'Disponível para remoto / freelance (meio período)',
    },
    linkedin: 'https://www.linkedin.com/in/nick-granados',
    github: 'https://github.com/internick2017',
  },
  summary: {
    en: "I am a current BYU-Pathway Worldwide student working toward a certificate in Web and Computer Programming. With over 6 years of experience in backend and full-stack development, I specialize in PHP, WordPress, and JavaScript frameworks like React. I enjoy building performance-focused applications and working with remote teams. I'm seeking remote opportunities where I can contribute to scalable web platforms and continue to grow as a developer.",
    es: 'Soy estudiante de BYU-Pathway Worldwide, cursando un certificado en Programación Web y de Computadoras. Con más de 6 años de experiencia en desarrollo backend y full-stack, me especializo en PHP, WordPress y frameworks de JavaScript como React. Disfruto construir aplicaciones enfocadas en el rendimiento y trabajar con equipos remotos. Busco oportunidades remotas donde pueda contribuir a plataformas web escalables y seguir creciendo como desarrollador.',
    pt: 'Sou estudante da BYU-Pathway Worldwide, cursando um certificado em Programação Web e de Computadores. Com mais de 6 anos de experiência em desenvolvimento backend e full-stack, sou especializado em PHP, WordPress e frameworks JavaScript como React. Gosto de construir aplicações focadas em desempenho e trabalhar com equipes remotas. Busco oportunidades remotas onde eu possa contribuir para plataformas web escaláveis e continuar crescendo como desenvolvedor.',
  },
  topSkills: ['Databases', 'WordPress', 'JavaScript', 'Back-End Web Development', 'Git'],
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
          en: 'Developed API integrations that streamlined data management, reducing processing time by 25%.',
          es: 'Desarrollé integraciones de API que optimizaron la gestión de datos, reduciendo el tiempo de procesamiento en un 25%.',
          pt: 'Desenvolvi integrações de API que otimizaram a gestão de dados, reduzindo o tempo de processamento em 25%.',
        },
        {
          en: 'Maintained a multilingual multisite environment, enhancing accessibility for global audiences.',
          es: 'Mantuve un entorno multisitio multilingüe, mejorando la accesibilidad para audiencias globales.',
          pt: 'Mantive um ambiente multisite multilíngue, melhorando a acessibilidade para públicos globais.',
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
          en: 'Built a robust evaluation system that enhanced data management capabilities.',
          es: 'Construí un sistema de evaluación robusto que mejoró las capacidades de gestión de datos.',
          pt: 'Construí um sistema de avaliação robusto que aprimorou as capacidades de gestão de dados.',
        },
        {
          en: 'Strengthened skills in PHP, WordPress and Laravel.',
          es: 'Fortalecí mis habilidades en PHP, WordPress y Laravel.',
          pt: 'Fortaleci minhas habilidades em PHP, WordPress e Laravel.',
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
          en: 'Completed over 20 projects with a 100% on-time delivery rate.',
          es: 'Completé más de 20 proyectos con una tasa de entrega a tiempo del 100%.',
          pt: 'Concluí mais de 20 projetos com uma taxa de entrega no prazo de 100%.',
        },
        {
          en: 'Built custom WordPress themes and plugins that improved client satisfaction.',
          es: 'Desarrollé temas y plugins personalizados de WordPress que mejoraron la satisfacción del cliente.',
          pt: 'Desenvolvi temas e plugins personalizados de WordPress que melhoraram a satisfação do cliente.',
        },
        {
          en: 'Developed expertise in project management, web development, and client communication.',
          es: 'Desarrollé experiencia en gestión de proyectos, desarrollo web y comunicación con clientes.',
          pt: 'Desenvolvi experiência em gestão de projetos, desenvolvimento web e comunicação com clientes.',
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
          en: 'Established Aresmkt focusing on client-centric strategies and innovative solutions.',
          es: 'Fundé Aresmkt enfocándome en estrategias centradas en el cliente y soluciones innovadoras.',
          pt: 'Fundei a Aresmkt com foco em estratégias centradas no cliente e soluções inovadoras.',
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

export const cvLabels: Record<Language, CvLabels> = {
  en: {
    summary: 'Summary',
    topSkills: 'Top Skills',
    techStack: 'Tech Stack',
    experience: 'Experience',
    education: 'Education',
    print: 'Print / Save as PDF',
  },
  es: {
    summary: 'Resumen',
    topSkills: 'Habilidades Principales',
    techStack: 'Stack Técnico',
    experience: 'Experiencia',
    education: 'Educación',
    print: 'Imprimir / Guardar PDF',
  },
  pt: {
    summary: 'Resumo',
    topSkills: 'Principais Habilidades',
    techStack: 'Stack Técnico',
    experience: 'Experiência',
    education: 'Educação',
    print: 'Imprimir / Salvar PDF',
  },
}
