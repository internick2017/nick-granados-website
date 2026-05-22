# CV Multi-Version System — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a WordPress Developer version of the CV at `/dev/cv?v=wordpress`, improve the default Full Stack version, and add a UI selector to switch between versions.

**Architecture:** A version registry (`src/data/resumes/index.ts`) maps version slugs to `ResumeData` objects. `CvDocument` reads the active version from URL param and local state, rendering the correct data. Adding future versions requires only a new data file + one line in the registry.

**Tech Stack:** Next.js 15 App Router (static export), TypeScript, Tailwind CSS, `useSearchParams` (Next.js navigation)

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| CREATE | `src/data/resumes/index.ts` | Version registry — maps slug → label + data |
| CREATE | `src/data/resumes/resume-wordpress.ts` | WordPress Developer CV content |
| MODIFY | `src/data/resume.ts` | Improve default Full Stack content |
| MODIFY | `src/components/cv-document.tsx` | Add version selector UI, read version state |
| MODIFY | `src/app/dev/cv/page.tsx` | Wrap in `<Suspense>` for `useSearchParams` |

---

## Task 1: Create version registry

**Files:**
- Create: `src/data/resumes/index.ts`

- [ ] **Step 1: Create the directory and registry file**

```ts
// src/data/resumes/index.ts
import { resume } from '@/data/resume'
import type { ResumeData } from '@/data/resume'
import type { Language } from '@/lib/translations'

export interface ResumeVersionMeta {
  label: Record<Language, string>
  data: ResumeData
}

export type ResumeVersion = 'default' | 'wordpress'

// Registry populated progressively — Task 3 adds 'wordpress' entry
export const resumeVersions: Record<ResumeVersion, ResumeVersionMeta> = {
  default: {
    label: { en: 'Full Stack', es: 'Full Stack', pt: 'Full Stack' },
    data: resume,
  },
  // wordpress entry added in Task 3
  wordpress: {
    label: { en: 'WordPress', es: 'WordPress', pt: 'WordPress' },
    data: resume, // temporary placeholder — replaced in Task 3
  },
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `yarn tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/data/resumes/index.ts
git commit -m "feat: add CV version registry"
```

---

## Task 2: Improve default resume content

**Files:**
- Modify: `src/data/resume.ts`

Changes: rewrite `summary`, update `topSkills`, fix 3 weak bullets (CEICOM bullet 3, Aresmkt bullet 1, Freelancer bullet 2).

- [ ] **Step 1: Replace the `summary` field**

Find and replace the entire `summary` block (lines ~72–76):

```ts
summary: {
  en: "I build full-stack web applications with PHP, WordPress, and React — from custom plugins and REST API integrations to modern front-end interfaces. With 6+ years across agencies, remote teams, and direct clients, I deliver reliable, performance-focused solutions and communicate clearly across time zones.",
  es: 'Construyo aplicaciones web full-stack con PHP, WordPress y React — desde plugins personalizados e integraciones REST API hasta interfaces modernas de front-end. Con más de 6 años trabajando en agencias, equipos remotos y clientes directos, entrego soluciones confiables y orientadas al rendimiento, comunicándome con claridad en diferentes zonas horarias.',
  pt: 'Desenvolvo aplicações web full-stack com PHP, WordPress e React — desde plugins personalizados e integrações REST API até interfaces modernas de front-end. Com mais de 6 anos trabalhando em agências, equipes remotas e clientes diretos, entrego soluções confiáveis e focadas em performance, comunicando-me claramente em diferentes fusos horários.',
},
```

- [ ] **Step 2: Replace `topSkills`**

```ts
topSkills: ['WordPress', 'PHP', 'JavaScript / React', 'REST API', 'Git'],
```

- [ ] **Step 3: Fix CEICOM bullet 3 — replace "Strengthened skills"**

Find:
```ts
{
  en: 'Strengthened skills in PHP, WordPress and Laravel.',
  es: 'Fortalecí mis habilidades en PHP, WordPress y Laravel.',
  pt: 'Fortaleci minhas habilidades em PHP, WordPress e Laravel.',
},
```

Replace with:
```ts
{
  en: 'Delivered and maintained bespoke evaluation and data management systems for regional clients using PHP and WordPress.',
  es: 'Desarrollé y mantuve sistemas de evaluación y gestión de datos a medida para clientes regionales con PHP y WordPress.',
  pt: 'Desenvolvi e mantive sistemas de avaliação e gestão de dados personalizados para clientes regionais usando PHP e WordPress.',
},
```

- [ ] **Step 4: Fix Aresmkt bullet 1 — replace "Established Aresmkt"**

Find:
```ts
{
  en: 'Established Aresmkt focusing on client-centric strategies and innovative solutions.',
  es: 'Fundé Aresmkt enfocándome en estrategias centradas en el cliente y soluciones innovadoras.',
  pt: 'Fundei a Aresmkt com foco em estratégias centradas no cliente e soluções inovadoras.',
},
```

Replace with:
```ts
{
  en: 'Founded a digital marketing agency, acquiring first clients within 3 months and managing web and campaign projects end-to-end.',
  es: 'Fundé una agencia de marketing digital, adquiriendo los primeros clientes en 3 meses y gestionando proyectos web y de campaña de extremo a extremo.',
  pt: 'Fundei uma agência de marketing digital, conquistando os primeiros clientes em 3 meses e gerenciando projetos web e de campanha de ponta a ponta.',
},
```

- [ ] **Step 5: Fix Freelancer bullet 2 — replace "improved client satisfaction"**

Find:
```ts
{
  en: 'Built custom WordPress themes and plugins that improved client satisfaction.',
  es: 'Desarrollé temas y plugins personalizados de WordPress que mejoraron la satisfacción del cliente.',
  pt: 'Desenvolvi temas e plugins personalizados de WordPress que melhoraram a satisfação do cliente.',
},
```

Replace with:
```ts
{
  en: 'Built custom WordPress themes and plugins for clients across retail, services, and education sectors.',
  es: 'Desarrollé temas y plugins personalizados de WordPress para clientes en sectores de retail, servicios y educación.',
  pt: 'Desenvolvi temas e plugins personalizados de WordPress para clientes nos setores de varejo, serviços e educação.',
},
```

- [ ] **Step 6: Verify TypeScript compiles**

Run: `yarn tsc --noEmit`
Expected: no errors

- [ ] **Step 7: Commit**

```bash
git add src/data/resume.ts
git commit -m "feat: improve default CV content — rewrite summary, topSkills and weak bullets"
```

---

## Task 3: Create WordPress resume data

**Files:**
- Create: `src/data/resumes/resume-wordpress.ts`
- Modify: `src/data/resumes/index.ts` (replace placeholder)

- [ ] **Step 1: Create the WordPress resume file**

```ts
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
```

- [ ] **Step 2: Replace placeholder in registry**

In `src/data/resumes/index.ts`, replace the import block and `wordpress` entry:

```ts
// src/data/resumes/index.ts
import { resume } from '@/data/resume'
import { resumeWordpress } from '@/data/resumes/resume-wordpress'
import type { ResumeData } from '@/data/resume'
import type { Language } from '@/lib/translations'

export interface ResumeVersionMeta {
  label: Record<Language, string>
  data: ResumeData
}

export type ResumeVersion = 'default' | 'wordpress'

export const resumeVersions: Record<ResumeVersion, ResumeVersionMeta> = {
  default: {
    label: { en: 'Full Stack', es: 'Full Stack', pt: 'Full Stack' },
    data: resume,
  },
  wordpress: {
    label: { en: 'WordPress', es: 'WordPress', pt: 'WordPress' },
    data: resumeWordpress,
  },
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `yarn tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/data/resumes/resume-wordpress.ts src/data/resumes/index.ts
git commit -m "feat: add WordPress Developer CV version"
```

---

## Task 4: Add version selector to CvDocument

**Files:**
- Modify: `src/components/cv-document.tsx`

Replace the entire file content:

- [ ] **Step 1: Replace cv-document.tsx**

```tsx
// src/components/cv-document.tsx
'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import type { Language } from '@/lib/translations'
import { cvLabels } from '@/data/resume'
import { resumeVersions, type ResumeVersion } from '@/data/resumes'
import { getAllTechnologies } from '@/data/projects'
import { formatDateRange, formatDuration } from '@/data/date-utils'
import { Mail, Phone, MapPin, Linkedin, Github, Printer } from 'lucide-react'

export default function CvDocument({ buildDate }: { buildDate: string }) {
  const { lang, setLang } = useLanguage()
  const searchParams = useSearchParams()
  const technologies = getAllTechnologies()
  const labels = cvLabels[lang]
  const refDate = new Date(buildDate)

  const paramVersion = searchParams.get('v') as ResumeVersion | null
  const [version, setVersion] = useState<ResumeVersion>(
    paramVersion && paramVersion in resumeVersions ? paramVersion : 'default'
  )

  const resume = resumeVersions[version].data

  const handleVersionChange = (v: ResumeVersion) => {
    setVersion(v)
    const url = new URL(window.location.href)
    if (v === 'default') url.searchParams.delete('v')
    else url.searchParams.set('v', v)
    window.history.pushState({}, '', url.toString())
  }

  return (
    <main className="min-h-screen bg-slate-100 print:bg-white py-10 px-4 print:p-0">
      {/* Controles — ocultos al imprimir */}
      <div className="max-w-3xl mx-auto mb-4 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-3">
          {/* Language selector */}
          <div className="flex items-center space-x-1">
            {(['en', 'es', 'pt'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded text-xs font-semibold uppercase transition-colors ${
                  lang === l
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-300'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          {/* Version selector */}
          <div className="flex items-center space-x-1">
            {(Object.keys(resumeVersions) as ResumeVersion[]).map((v) => (
              <button
                key={v}
                onClick={() => handleVersionChange(v)}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  version === v
                    ? 'bg-[#1e3a8a] text-white'
                    : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-300'
                }`}
              >
                {resumeVersions[v].label[lang]}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          <Printer size={16} aria-hidden="true" />
          {labels.print}
        </button>
      </div>

      {/* Hoja del CV */}
      <article className="max-w-3xl mx-auto bg-white text-slate-800 rounded-lg shadow-sm print:shadow-none p-8 md:p-10 print:px-[2.2cm] print:py-0">
        {/* Header */}
        <header className="border-b border-slate-200 pb-5 mb-6">
          <h1 className="text-3xl font-bold text-slate-900">{resume.name}</h1>
          <p className="text-teal-600 font-medium mt-0.5">{resume.title[lang]}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-slate-600">
            <a href={`mailto:${resume.contact.email}`} className="flex items-center gap-1 hover:text-teal-600">
              <Mail size={14} aria-hidden="true" /> {resume.contact.email}
            </a>
            <a href={`tel:${resume.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-1 hover:text-teal-600">
              <Phone size={14} aria-hidden="true" /> {resume.contact.phone}
            </a>
            <span className="flex items-center gap-1">
              <MapPin size={14} aria-hidden="true" /> {resume.contact.location[lang]}
            </span>
            <a href={resume.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-teal-600">
              <Linkedin size={14} aria-hidden="true" /> LinkedIn
            </a>
            <a href={resume.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-teal-600">
              <Github size={14} aria-hidden="true" /> GitHub
            </a>
          </div>
          <p className="text-xs text-slate-500 mt-2">{resume.contact.availability[lang]}</p>
        </header>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{labels.summary}</h2>
          <p className="text-sm leading-relaxed text-slate-700">{resume.summary[lang]}</p>
        </section>

        {/* Top Skills */}
        <section className="mb-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{labels.topSkills}</h2>
          <p className="text-sm text-slate-700 font-medium">{resume.topSkills.join(' · ')}</p>
        </section>

        {/* Tech Stack (auto desde proyectos) */}
        <section className="mb-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{labels.techStack}</h2>
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-xs rounded-full border border-teal-300 text-teal-700 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{labels.experience}</h2>
          <div className="space-y-5">
            {resume.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <h3 className="font-semibold text-slate-900">{exp.role}</h3>
                  <span className="text-xs text-slate-500">
                    {formatDateRange(exp.startDate, exp.endDate, lang)} · {formatDuration(exp.startDate, exp.endDate, lang, refDate)}
                  </span>
                </div>
                <p className="text-sm text-teal-700">
                  {exp.company} · {exp.employmentType[lang]} · {exp.location[lang]}
                </p>
                <ul className="mt-1.5 list-disc list-inside space-y-0.5 text-sm text-slate-700 marker:text-teal-500">
                  {exp.bullets.map((b, j) => (
                    <li key={j}>{b[lang]}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{labels.education}</h2>
          <div className="space-y-3">
            {resume.education.map((edu, i) => (
              <div key={i} className="flex flex-wrap items-baseline justify-between gap-x-2">
                <div>
                  <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                  <p className="text-sm text-teal-700">
                    {edu.institution}
                    {edu.note ? ` · ${edu.note[lang]}` : ''}
                  </p>
                </div>
                <span className="text-xs text-slate-500">{formatDateRange(edu.startDate, edu.endDate, lang)}</span>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `yarn tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/cv-document.tsx
git commit -m "feat: add version selector to CV — Full Stack / WordPress"
```

---

## Task 5: Add Suspense boundary to CvPage

**Files:**
- Modify: `src/app/dev/cv/page.tsx`

`useSearchParams` in Next.js 15 requires the component to be wrapped in `<Suspense>` to avoid hydration issues on static export.

- [ ] **Step 1: Update page.tsx**

```tsx
// src/app/dev/cv/page.tsx
import { Suspense } from 'react'
import type { Metadata } from 'next'
import CvDocument from '@/components/cv-document'

export const metadata: Metadata = {
  title: 'Nick Granados - CV',
  description: 'Curriculum Vitae of Nick Granados — Full Stack Developer.',
  robots: 'noindex',
}

export default function CvPage() {
  const buildDate = new Date().toISOString()
  return (
    <Suspense fallback={null}>
      <CvDocument buildDate={buildDate} />
    </Suspense>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `yarn tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/dev/cv/page.tsx
git commit -m "fix: wrap CvDocument in Suspense for useSearchParams compatibility"
```

---

## Task 6: Build and visual verification

- [ ] **Step 1: Run full build**

```bash
yarn build
```

Expected: Build completes with no errors. The `out/` directory is generated.

- [ ] **Step 2: Start dev server and verify visually**

```bash
yarn dev
```

Open `http://localhost:3000/dev/cv` and verify:
- Default version shows "Full Stack Developer" title
- Version selector shows `[ Full Stack | WordPress ]` buttons
- Clicking "WordPress" switches title to "WordPress Developer" and updates topSkills to `WordPress · PHP · Gutenberg · Carbon Fields · ACF · WooCommerce · WPML · REST API`
- URL updates to `/dev/cv?v=wordpress` when WordPress is selected
- Language selector still works on both versions
- Print button prints the currently visible version

- [ ] **Step 3: Verify direct URL loads correct version**

Open `http://localhost:3000/dev/cv?v=wordpress` directly.
Expected: WordPress version loads immediately (not default).

- [ ] **Step 4: Commit if any final fixes were needed**

```bash
git add -p
git commit -m "fix: <describe what was fixed>"
```
