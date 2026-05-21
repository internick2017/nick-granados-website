# CV imprimible multiidioma en `/dev/cv` — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Crear una página `/dev/cv` que muestre el CV de Nick en HTML, optimizada para imprimir/guardar como PDF, en inglés/español/portugués, con la antigüedad de los trabajos calculada automáticamente.

**Architecture:** El contenido del CV vive en `src/data/resume.ts` (datos estructurados con traducciones `{en,es,pt}`); el tech stack se auto-genera desde `src/data/projects.ts`. Las fechas se formatean con helpers puros en `src/data/date-utils.ts`. La página `src/app/dev/cv/page.tsx` es Server Component (exporta metadata + calcula `buildDate`) y renderiza `src/components/cv-document.tsx` (Client Component) que usa el `LanguageContext` global ya existente para el toggle de idioma y el botón de imprimir.

**Tech Stack:** Next.js 15 (App Router, static export), React 18, Tailwind CSS 3, lucide-react, TypeScript. Sin framework de tests (se valida la lógica de fechas con un script Node descartable + `yarn build` + verificación visual).

**Refinamientos sobre el spec (documentados):**
1. El toggle de idioma reutiliza el `LanguageContext` global (`@/context/LanguageContext`) en vez de `useState` local — es el patrón ya establecido en el sitio y reusa el tipo `Language`.
2. La fecha de referencia para "current" se inyecta como prop `buildDate` (ISO) desde el Server Component, evitando hydration mismatch y manteniendo la semántica build-time (se refresca en cada `/deploy`).

---

## File Structure

- **Create** `src/data/date-utils.ts` — helpers puros de fecha (`formatMonthYear`, `formatDateRange`, `formatDuration`), localizados.
- **Create** `src/data/resume.ts` — tipos + datos del CV (contacto, summary, top skills, experiencia, educación) con traducciones, y diccionario `cvLabels`.
- **Create** `src/components/cv-document.tsx` — Client Component: toggle idioma + botón print + render del CV (tema claro).
- **Create** `src/app/dev/cv/page.tsx` — Server Component: metadata + `buildDate` + `<CvDocument />`.
- **Modify** `src/app/dev/page.tsx:53-59` — botón "Download CV" → enlace a `/dev/cv/` con label "View / Print CV".
- **Modify** `src/app/globals.css` (final del archivo) — bloque `@media print` para fondo blanco y márgenes.
- **Temp** `verify-dates.mjs` (raíz) — script descartable para validar la aritmética de fechas; se borra en la última tarea.

---

## Task 1: Helpers de fecha + validación de la aritmética

**Files:**
- Temp: `verify-dates.mjs`
- Create: `src/data/date-utils.ts`

- [ ] **Step 1: Escribir el script de validación descartable**

Crear `verify-dates.mjs` en la raíz del proyecto. Contiene una copia en JS plano del algoritmo y lo verifica contra los valores reales del LinkedIn de Nick (deterministas con `refDate` fija):

```js
const MONTHS = {
  en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  es: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'],
  pt: ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'],
}
const UNITS = {
  en: { year: ['yr','yrs'], month: ['mo','mos'] },
  es: { year: ['año','años'], month: ['mes','meses'] },
  pt: { year: ['ano','anos'], month: ['mês','meses'] },
}
const parseYM = (ym) => { const [y,m] = ym.split('-').map(Number); return { year: y, month: m } }
const formatMonthYear = (ym, lang) => { const { year, month } = parseYM(ym); return `${MONTHS[lang][month-1]} ${year}` }
const formatDuration = (startYM, endYM, lang, refDate) => {
  const start = parseYM(startYM)
  const end = endYM ? parseYM(endYM) : { year: refDate.getFullYear(), month: refDate.getMonth() + 1 }
  const totalMonths = (end.year - start.year) * 12 + (end.month - start.month) + 1
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const u = UNITS[lang]
  const parts = []
  if (years > 0) parts.push(`${years} ${years === 1 ? u.year[0] : u.year[1]}`)
  if (months > 0) parts.push(`${months} ${months === 1 ? u.month[0] : u.month[1]}`)
  if (parts.length === 0) parts.push(`0 ${u.month[1]}`)
  return parts.join(' ')
}

const ref = new Date('2026-05-15')
const cases = [
  [formatDuration('2021-04','2023-06','en',ref), '2 yrs 3 mos'],   // CEICOM
  [formatDuration('2018-11','2021-01','en',ref), '2 yrs 3 mos'],   // Inkaweb
  [formatDuration('2019-11','2020-05','en',ref), '7 mos'],         // Aresmkt
  [formatDuration('2022-08',null,'en',ref), '3 yrs 10 mos'],       // Apiki (current)
  [formatDuration('2021-01',null,'en',ref), '5 yrs 5 mos'],        // Freelancer (current)
  [formatDuration('2022-08',null,'es',ref), '3 años 10 meses'],
  [formatDuration('2022-08',null,'pt',ref), '3 anos 10 meses'],
  [formatMonthYear('2022-08','en'), 'Aug 2022'],
  [formatMonthYear('2022-08','es'), 'ago 2022'],
  [formatMonthYear('2022-08','pt'), 'ago 2022'],
]
let ok = true
for (const [got, want] of cases) {
  const pass = got === want
  if (!pass) ok = false
  console.log(`${pass ? 'PASS' : 'FAIL'}: got "${got}" want "${want}"`)
}
process.exit(ok ? 0 : 1)
```

- [ ] **Step 2: Ejecutar el script y verificar que TODO pasa**

Run: `node verify-dates.mjs`
Expected: 10 líneas `PASS:` y exit code 0. Si algo dice `FAIL`, corregir el algoritmo antes de seguir.

- [ ] **Step 3: Portar el algoritmo validado a `src/data/date-utils.ts`**

Crear `src/data/date-utils.ts` con el MISMO algoritmo, ahora tipado:

```ts
import type { Language } from '@/lib/translations'

const MONTHS: Record<Language, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
}

const PRESENT: Record<Language, string> = {
  en: 'Present',
  es: 'Actual',
  pt: 'Atual',
}

const UNITS: Record<Language, { year: [string, string]; month: [string, string] }> = {
  en: { year: ['yr', 'yrs'], month: ['mo', 'mos'] },
  es: { year: ['año', 'años'], month: ['mes', 'meses'] },
  pt: { year: ['ano', 'anos'], month: ['mês', 'meses'] },
}

function parseYM(ym: string): { year: number; month: number } {
  const [year, month] = ym.split('-').map(Number)
  return { year, month }
}

export function formatMonthYear(ym: string, lang: Language): string {
  const { year, month } = parseYM(ym)
  return `${MONTHS[lang][month - 1]} ${year}`
}

export function formatDateRange(startYM: string, endYM: string | null, lang: Language): string {
  const start = formatMonthYear(startYM, lang)
  const end = endYM ? formatMonthYear(endYM, lang) : PRESENT[lang]
  return `${start} - ${end}`
}

export function formatDuration(
  startYM: string,
  endYM: string | null,
  lang: Language,
  refDate: Date
): string {
  const start = parseYM(startYM)
  const end = endYM
    ? parseYM(endYM)
    : { year: refDate.getFullYear(), month: refDate.getMonth() + 1 }
  const totalMonths = (end.year - start.year) * 12 + (end.month - start.month) + 1
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const u = UNITS[lang]
  const parts: string[] = []
  if (years > 0) parts.push(`${years} ${years === 1 ? u.year[0] : u.year[1]}`)
  if (months > 0) parts.push(`${months} ${months === 1 ? u.month[0] : u.month[1]}`)
  if (parts.length === 0) parts.push(`0 ${u.month[1]}`)
  return parts.join(' ')
}
```

- [ ] **Step 4: Commit**

```bash
git add src/data/date-utils.ts verify-dates.mjs
git commit -m "feat: add localized date helpers for CV durations"
```

---

## Task 2: Datos del CV (`src/data/resume.ts`)

**Files:**
- Create: `src/data/resume.ts`

- [ ] **Step 1: Crear `src/data/resume.ts` con tipos + datos completos**

```ts
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

export const cvLabels: Record<
  Language,
  {
    summary: string
    topSkills: string
    techStack: string
    experience: string
    education: string
    print: string
  }
> = {
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
```

- [ ] **Step 2: Verificar que tipa correctamente**

Run: `npx tsc --noEmit`
Expected: sin errores nuevos referidos a `src/data/resume.ts`. (El repo tiene `ignoreBuildErrors: true`; ignorar errores preexistentes de otros archivos, pero `resume.ts` y `date-utils.ts` no deben aparecer.)

- [ ] **Step 3: Commit**

```bash
git add src/data/resume.ts
git commit -m "feat: add multilingual resume data for CV page"
```

---

## Task 3: Componente cliente del CV (`src/components/cv-document.tsx`)

**Files:**
- Create: `src/components/cv-document.tsx`

- [ ] **Step 1: Crear el componente completo**

```tsx
'use client'

import { useLanguage } from '@/context/LanguageContext'
import type { Language } from '@/lib/translations'
import { resume, cvLabels } from '@/data/resume'
import { getAllTechnologies } from '@/data/projects'
import { formatDateRange, formatDuration } from '@/data/date-utils'
import { Mail, Phone, MapPin, Linkedin, Github, Printer } from 'lucide-react'

export default function CvDocument({ buildDate }: { buildDate: string }) {
  const { lang, setLang } = useLanguage()
  const technologies = getAllTechnologies()
  const labels = cvLabels[lang]
  const refDate = new Date(buildDate)

  return (
    <main className="min-h-screen bg-slate-100 print:bg-white py-10 px-4 print:p-0">
      {/* Controles — ocultos al imprimir */}
      <div className="max-w-3xl mx-auto mb-4 flex items-center justify-between print:hidden">
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
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          <Printer size={16} />
          {labels.print}
        </button>
      </div>

      {/* Hoja del CV */}
      <article className="max-w-3xl mx-auto bg-white text-slate-800 rounded-lg shadow-sm print:shadow-none p-8 md:p-10 print:p-0">
        {/* Header */}
        <header className="border-b border-slate-200 pb-5 mb-6">
          <h1 className="text-3xl font-bold text-slate-900">{resume.name}</h1>
          <p className="text-teal-600 font-medium mt-0.5">{resume.title[lang]}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-slate-600">
            <a href={`mailto:${resume.contact.email}`} className="flex items-center gap-1 hover:text-teal-600">
              <Mail size={14} /> {resume.contact.email}
            </a>
            <a href={`tel:${resume.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-1 hover:text-teal-600">
              <Phone size={14} /> {resume.contact.phone}
            </a>
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {resume.contact.location[lang]}
            </span>
            <a href={resume.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-teal-600">
              <Linkedin size={14} /> LinkedIn
            </a>
            <a href={resume.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-teal-600">
              <Github size={14} /> GitHub
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

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sin errores nuevos en `src/components/cv-document.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/cv-document.tsx
git commit -m "feat: add CV document component with language toggle and print"
```

---

## Task 4: Página `/dev/cv` (Server Component) + estilos de impresión

**Files:**
- Create: `src/app/dev/cv/page.tsx`
- Modify: `src/app/globals.css` (final del archivo)

- [ ] **Step 1: Crear `src/app/dev/cv/page.tsx`**

```tsx
import type { Metadata } from 'next'
import CvDocument from '@/components/cv-document'

export const metadata: Metadata = {
  title: 'Nick Granados - CV',
  description: 'Curriculum Vitae of Nick Granados — Full Stack Developer.',
  robots: 'noindex',
}

export default function CvPage() {
  const buildDate = new Date().toISOString()
  return <CvDocument buildDate={buildDate} />
}
```

- [ ] **Step 2: Agregar bloque `@media print` al final de `src/app/globals.css`**

Agregar exactamente esto al final del archivo (después de la última regla existente):

```css
/* CV print styles */
@media print {
  body {
    background: #fff !important;
  }
  @page {
    margin: 1.5cm;
  }
}
```

- [ ] **Step 3: Verificar build (export estático genera la ruta)**

Run: `yarn build`
Expected: build exitoso. En la salida aparece la ruta `/dev/cv` y se genera `out/dev/cv/index.html`.

- [ ] **Step 4: Commit**

```bash
git add src/app/dev/cv/page.tsx src/app/globals.css
git commit -m "feat: add /dev/cv page and print styles"
```

---

## Task 5: Conectar el botón en `/dev`

**Files:**
- Modify: `src/app/dev/page.tsx:53-59`

- [ ] **Step 1: Reemplazar el enlace "Download CV" roto**

Buscar este bloque en `src/app/dev/page.tsx`:

```tsx
          <a
            href="/cv-nick-granados.pdf"
            download
            className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-semibold transition-colors text-sm"
          >
            Download CV
          </a>
```

Reemplazarlo por (nota: `href` con barra final por `trailingSlash: true`, sin `download`):

```tsx
          <a
            href="/dev/cv/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-semibold transition-colors text-sm"
          >
            View / Print CV
          </a>
```

- [ ] **Step 2: Verificar build**

Run: `yarn build`
Expected: build exitoso, sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/app/dev/page.tsx
git commit -m "feat: link /dev CV button to printable /dev/cv page"
```

---

## Task 6: Verificación visual + limpieza

**Files:**
- Delete: `verify-dates.mjs`

- [ ] **Step 1: Levantar el dev server**

Run: `yarn dev`
Abrir `http://localhost:3000/dev/cv/`

- [ ] **Step 2: Verificación funcional (golden path)**

Confirmar manualmente:
- El CV se ve con fondo blanco (hoja centrada), tema claro.
- Toggle EN/ES/PT cambia: summary, bullets, encabezados, tipo de empleo, ubicación, "Present"/"Actual"/"Atual" y las unidades de duración (yrs/años/anos).
- Apiki muestra "Aug 2022 - Present · 3 yrs 10 mos" (o el valor correcto según la fecha actual del build).
- Freelancer muestra "... - Present · 5 yrs 5 mos" (o el correcto).
- Email, teléfono, ubicación, LinkedIn y GitHub aparecen y los links funcionan.
- El tech stack muestra los chips auto-generados (mismos que `/dev`).

- [ ] **Step 3: Verificación de impresión**

Ctrl+P (vista previa de impresión):
- NO aparecen el toggle de idioma ni el botón de imprimir.
- Sale solo la hoja del CV en el idioma seleccionado.
- El nombre sugerido del archivo es "Nick Granados - CV".

- [ ] **Step 4: Verificar el botón desde `/dev`**

Abrir `http://localhost:3000/dev/` → clic en "View / Print CV" → navega a `/dev/cv/` sin 404.

- [ ] **Step 5: Borrar el script descartable y commitear**

```bash
git rm verify-dates.mjs
git commit -m "chore: remove temporary date verification script"
```

---

## Self-Review (cubierto)

- **Spec coverage:** ruta `/dev/cv` (T4), `resume.ts` única fuente + tech stack auto (T2/T3), antigüedad auto build-time (T1/T3/T4 vía `buildDate`), tema claro (T3), print + título PDF (T3/T4), toggle EN/ES/PT (T3), traducciones (T2), conexión desde `/dev` (T5). Trabajo futuro (CV targeted) queda fuera de alcance por diseño — `resume.ts` es estructurado para permitirlo.
- **Sin placeholders:** todos los pasos tienen código/comando concreto.
- **Consistencia de tipos:** `formatDateRange`/`formatDuration`/`formatMonthYear` con misma firma en T1 y uso en T3; `Language` reusado de `@/lib/translations`; `cvLabels`/`resume` definidos en T2 y consumidos en T3 con las mismas propiedades.
