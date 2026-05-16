# Portfolio Publicación — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform nickgranados.com into a client-conversion tool with a separate /dev page for recruiters, scalable projects grid, Services section, and SEO basics.

**Architecture:** Central `src/data/projects.ts` is the single source of truth — it drives both the Projects section and the /dev tech stack page. Two distinct pages: main site for clients, /dev for recruiters. All new text goes through the existing translations system (EN/ES/PT).

**Tech Stack:** Next.js 15 static export, TypeScript, Tailwind CSS, Framer Motion, next-themes

---

### Task 1: Create src/data/projects.ts — central data file

**Files:**
- Create: `src/data/projects.ts`

- [ ] **Step 1: Create the file**

```typescript
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
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'SEO', 'Schema.org', 'JSON-LD', 'Responsive Design'],
    github: 'https://github.com/internick2017',
    demo: 'https://gramtospoon.nickgranados.com/',
    image: '/images/project-gramtospoon.png',
  },
  // Nick: add your remaining projects here following the same structure.
  // Available images in public/images/: project-jjj.png, project-repairshop.png, project-shadcn.png
  // For new projects, add the screenshot to public/images/ first.
]

export function getAllTechnologies(): string[] {
  const all = projects.flatMap((p) => p.technologies)
  return [...new Set(all)].sort()
}
```

- [ ] **Step 2: Nick fills in remaining projects**

Open `src/data/projects.ts` and add your remaining projects following the GramToSpoon structure. Each project needs `id`, `translations` (en/es/pt title + description), `technologies`, `github`, `demo`, and `image`.

- [ ] **Step 3: Verify TypeScript**

```bash
yarn tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add central projects data file"
```

---

### Task 2: Update src/lib/translations.ts

Remove `projects.items` (moved to data file). Add `nav.services`, `hero.recruiterLink`, and the full `services` section for all 3 languages.

**Files:**
- Modify: `src/lib/translations.ts`

- [ ] **Step 1: Replace the entire file with this updated version**

```typescript
export type Language = 'en' | 'es' | 'pt'

export const translations = {
  en: {
    nav: {
      home: 'Home', about: 'About', services: 'Services', projects: 'Projects', skills: 'Skills', contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm",
      subtitle: "Full Stack Developer · Building web solutions that grow your business",
      viewWork: "View My Work",
      contactMe: "Contact Me",
      recruiterLink: "Are you a recruiter?",
    },
    about: {
      title: "About Me",
      subtitle: "Get to know more about who I am and what I do",
      p1: "I'm a passionate Full Stack Developer with 6+ years of experience building robust, scalable web applications. I specialize in transforming business requirements into high-performance digital solutions using React, Next.js, WordPress, PHP, and more.",
      p2: "I've worked across a wide range of projects — from corporate sites and e-commerce to internal dashboards and REST APIs — always focused on delivering real results for the client.",
      p3: "I believe in clean code, continuous learning, and building software that actually solves problems.",
    },
    services: {
      title: "My Services",
      subtitle: "What I can build for you",
      cta: "Let's talk about your project",
      items: [
        { icon: "🌐", title: "Landing Pages & Corporate Sites", description: "Next.js or WordPress, from design to deploy, responsive and conversion-optimized." },
        { icon: "🛒", title: "E-commerce", description: "WooCommerce or custom store with payment gateway integration." },
        { icon: "⚡", title: "Web Apps / Full Stack", description: "Dashboards, internal systems, REST APIs, and database design." },
        { icon: "🔧", title: "Maintenance & Support", description: "Updates, bug fixes, performance improvements, and monthly support plans." },
      ],
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Real projects, live demos — here's what I've built",
      github: "GitHub",
      liveDemo: "Live Demo",
    },
    skills: {
      title: "Skills & Technologies",
      subtitle: "Here are the technologies I work with and my proficiency levels",
      coreSkills: "Core Skills",
      techTools: "Technologies & Tools",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Ready to start your project? Let's talk.",
      letsConnect: "Let's Connect",
      description: "Tell me about your project or idea and I'll get back to you as soon as possible.",
      emailLabel: "Email", phoneLabel: "Phone", locationLabel: "Location",
      nameLabel: "Name", namePlaceholder: "Your Name",
      emailPlaceholder: "your.email@example.com",
      messageLabel: "Message", messagePlaceholder: "Tell me about your project...",
      send: "Send Message", sending: "Sending...",
      successTitle: "Message sent!",
      successDesc: "Thanks for reaching out. I'll get back to you as soon as possible.",
      sendAnother: "Send another message",
      error: "Something went wrong. Please try again or email me directly.",
    },
    footer: {
      portfolio: "Portfolio",
      tagline: "Building digital solutions that make your business grow.",
      quickLinks: "Quick Links", connect: "Connect", rights: "All rights reserved.",
    },
  },
  es: {
    nav: {
      home: 'Inicio', about: 'Sobre mí', services: 'Servicios', projects: 'Proyectos', skills: 'Habilidades', contact: 'Contacto',
    },
    hero: {
      greeting: "Hola, soy",
      subtitle: "Desarrollador Full Stack · Construyo soluciones web que hacen crecer tu negocio",
      viewWork: "Ver mi trabajo",
      contactMe: "Contáctame",
      recruiterLink: "¿Sos reclutador?",
    },
    about: {
      title: "Sobre mí",
      subtitle: "Conóceme mejor, quién soy y qué hago",
      p1: "Soy un Desarrollador Full Stack con más de 6 años de experiencia construyendo aplicaciones web robustas y escalables. Me especializo en transformar requerimientos de negocio en soluciones digitales de alto rendimiento usando React, Next.js, WordPress, PHP y más.",
      p2: "Trabajé en proyectos muy variados — desde sitios corporativos y e-commerce hasta dashboards internos y APIs REST — siempre enfocado en entregar resultados reales para el cliente.",
      p3: "Creo en el código limpio, el aprendizaje continuo y en construir software que realmente resuelve problemas.",
    },
    services: {
      title: "Mis Servicios",
      subtitle: "Lo que puedo construir para vos",
      cta: "Hablemos de tu proyecto",
      items: [
        { icon: "🌐", title: "Landing Pages y Sitios Corporativos", description: "Next.js o WordPress, desde el diseño hasta el deploy, responsive y optimizado para conversión." },
        { icon: "🛒", title: "E-commerce", description: "WooCommerce o tienda custom con integración de pasarelas de pago." },
        { icon: "⚡", title: "Aplicaciones Web / Full Stack", description: "Dashboards, sistemas internos, APIs REST y diseño de base de datos." },
        { icon: "🔧", title: "Mantenimiento y Soporte", description: "Actualizaciones, corrección de bugs, mejoras de rendimiento y planes de soporte mensual." },
      ],
    },
    projects: {
      title: "Proyectos Destacados",
      subtitle: "Proyectos reales, demos en vivo — esto es lo que construí",
      github: "GitHub",
      liveDemo: "Demo en vivo",
    },
    skills: {
      title: "Habilidades y Tecnologías",
      subtitle: "Estas son las tecnologías con las que trabajo y mis niveles de competencia",
      coreSkills: "Habilidades Principales",
      techTools: "Tecnologías y Herramientas",
    },
    contact: {
      title: "Ponte en Contacto",
      subtitle: "¿Listo para empezar tu proyecto? Hablemos.",
      letsConnect: "Conectemos",
      description: "Contame sobre tu proyecto o idea y te respondo a la brevedad.",
      emailLabel: "Correo", phoneLabel: "Teléfono", locationLabel: "Ubicación",
      nameLabel: "Nombre", namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu.correo@ejemplo.com",
      messageLabel: "Mensaje", messagePlaceholder: "Contame sobre tu proyecto...",
      send: "Enviar mensaje", sending: "Enviando...",
      successTitle: "¡Mensaje enviado!",
      successDesc: "Gracias por contactarme. Te respondo a la brevedad.",
      sendAnother: "Enviar otro mensaje",
      error: "Algo salió mal. Intentá de nuevo o escribime directamente.",
    },
    footer: {
      portfolio: "Portafolio",
      tagline: "Construyendo soluciones digitales que hacen crecer tu negocio.",
      quickLinks: "Enlaces rápidos", connect: "Conectar", rights: "Todos los derechos reservados.",
    },
  },
  pt: {
    nav: {
      home: 'Início', about: 'Sobre', services: 'Serviços', projects: 'Projetos', skills: 'Habilidades', contact: 'Contato',
    },
    hero: {
      greeting: "Olá, sou",
      subtitle: "Desenvolvedor Full Stack · Construo soluções web que fazem seu negócio crescer",
      viewWork: "Ver meu trabalho",
      contactMe: "Fale comigo",
      recruiterLink: "É recrutador?",
    },
    about: {
      title: "Sobre mim",
      subtitle: "Conheça mais sobre quem sou e o que faço",
      p1: "Sou um Desenvolvedor Full Stack com mais de 6 anos de experiência construindo aplicações web robustas e escaláveis. Me especializo em transformar requisitos de negócio em soluções digitais de alto desempenho usando React, Next.js, WordPress, PHP e mais.",
      p2: "Trabalhei em projetos variados — de sites corporativos e e-commerce a dashboards internos e APIs REST — sempre focado em entregar resultados reais para o cliente.",
      p3: "Acredito em código limpo, aprendizado contínuo e em construir software que realmente resolve problemas.",
    },
    services: {
      title: "Meus Serviços",
      subtitle: "O que posso construir para você",
      cta: "Vamos falar do seu projeto",
      items: [
        { icon: "🌐", title: "Landing Pages e Sites Corporativos", description: "Next.js ou WordPress, do design ao deploy, responsivo e otimizado para conversão." },
        { icon: "🛒", title: "E-commerce", description: "WooCommerce ou loja personalizada com integração de meios de pagamento." },
        { icon: "⚡", title: "Aplicações Web / Full Stack", description: "Dashboards, sistemas internos, APIs REST e modelagem de banco de dados." },
        { icon: "🔧", title: "Manutenção e Suporte", description: "Atualizações, correção de bugs, melhorias de desempenho e planos de suporte mensal." },
      ],
    },
    projects: {
      title: "Projetos em Destaque",
      subtitle: "Projetos reais, demos ao vivo — veja o que construí",
      github: "GitHub",
      liveDemo: "Demo ao vivo",
    },
    skills: {
      title: "Habilidades e Tecnologias",
      subtitle: "Estas são as tecnologias com que trabalho e meus níveis de proficiência",
      coreSkills: "Habilidades Principais",
      techTools: "Tecnologias e Ferramentas",
    },
    contact: {
      title: "Entre em Contato",
      subtitle: "Pronto para iniciar seu projeto? Vamos conversar.",
      letsConnect: "Vamos nos Conectar",
      description: "Me conte sobre seu projeto ou ideia e responderei o mais breve possível.",
      emailLabel: "E-mail", phoneLabel: "Telefone", locationLabel: "Localização",
      nameLabel: "Nome", namePlaceholder: "Seu nome",
      emailPlaceholder: "seu.email@exemplo.com",
      messageLabel: "Mensagem", messagePlaceholder: "Me conte sobre seu projeto...",
      send: "Enviar mensagem", sending: "Enviando...",
      successTitle: "Mensagem enviada!",
      successDesc: "Obrigado pelo contato. Responderei o mais breve possível.",
      sendAnother: "Enviar outra mensagem",
      error: "Algo deu errado. Tente novamente ou me envie um e-mail diretamente.",
    },
    footer: {
      portfolio: "Portfólio",
      tagline: "Construindo soluções digitais que fazem seu negócio crescer.",
      quickLinks: "Links Rápidos", connect: "Conectar", rights: "Todos os direitos reservados.",
    },
  },
}

export type Translations = typeof translations.en
```

- [ ] **Step 2: Verify TypeScript — no implicit any, no missing keys**

```bash
yarn tsc --noEmit
```
Expected: no errors. If TypeScript complains about missing keys in es/pt, those keys are in en but not in es/pt — add them.

- [ ] **Step 3: Commit**

```bash
git add src/lib/translations.ts
git commit -m "feat: add services, recruiter link and nav translations; update copy to client-focused tone"
```

---

### Task 3: Refactor src/components/projects.tsx to use data file

**Files:**
- Modify: `src/components/projects.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { projects } from '@/data/projects'

export default function Projects() {
  const { t, lang } = useLanguage()

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary-text dark:text-white mb-4">
            {t.projects.title}
          </h2>
          <p className="text-lg text-brand-secondary-text dark:text-slate-300">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-700 rounded-2xl overflow-hidden shadow-brand"
            >
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div>
                  <h3 className="text-2xl font-bold text-brand-primary-text dark:text-white mb-4 leading-tight">
                    {project.translations[lang].title}
                  </h3>
                  <p className="text-brand-primary-text/80 dark:text-slate-300 mb-6 leading-relaxed text-base">
                    {project.translations[lang].description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs rounded-full font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-brand-primary-text hover:text-brand-accent transition-colors font-semibold text-sm">
                        <Github size={18} />
                        <span>{t.projects.github}</span>
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-brand-primary-text hover:text-brand-accent transition-colors font-semibold text-sm">
                        <ExternalLink size={18} />
                        <span>{t.projects.liveDemo}</span>
                      </a>
                    )}
                  </div>
                </div>
                <div className="relative rounded-lg overflow-hidden border border-brand-secondary/20 shadow-sm">
                  <Image
                    src={project.image}
                    alt={project.translations[lang].title}
                    layout="responsive"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
yarn tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Start dev server and visually verify projects section**

```bash
yarn dev
```
Open http://localhost:3000. Scroll to Projects section. Verify: all projects appear with correct title, description, technologies, GitHub link, and Live Demo link. Switch languages with EN/ES/PT switcher — titles and descriptions should change.

- [ ] **Step 4: Commit**

```bash
git add src/components/projects.tsx
git commit -m "refactor: projects component uses central data file"
```

---

### Task 4: Update src/components/navigation.tsx — add Services link

**Files:**
- Modify: `src/components/navigation.tsx`

- [ ] **Step 1: Add services to navItems array**

Find the `navItems` array (line 17) and add the services entry between about and projects:

```tsx
const navItems = [
  { name: t.nav.home, href: '#hero' },
  { name: t.nav.about, href: '#about' },
  { name: t.nav.services, href: '#services' },
  { name: t.nav.projects, href: '#projects' },
  { name: t.nav.skills, href: '#skills' },
  { name: t.nav.contact, href: '#contact' },
]
```

- [ ] **Step 2: Verify nav shows Services**

With `yarn dev` running, open http://localhost:3000. Verify "Services" (or "Servicios" / "Serviços") appears in the navbar. Clicking it should scroll to `#services` (section doesn't exist yet — it will 404-scroll, that's OK for now).

- [ ] **Step 3: Commit**

```bash
git add src/components/navigation.tsx
git commit -m "feat: add services link to navigation"
```

---

### Task 5: Create src/components/services.tsx — new Services section

**Files:**
- Create: `src/components/services.tsx`

- [ ] **Step 1: Create the file**

```tsx
'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function Services() {
  const { t } = useLanguage()

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary-text dark:text-white mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-brand-primary-text/80 dark:text-slate-300">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {t.services.items.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-brand hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-base font-bold text-brand-primary-text dark:text-white mb-2 leading-tight">
                {service.title}
              </h3>
              <p className="text-brand-primary-text/70 dark:text-slate-300 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg font-semibold transition-colors"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {t.services.cta} →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/services.tsx
git commit -m "feat: add Services section component"
```

---

### Task 6: Update src/components/hero.tsx — add recruiter link

**Files:**
- Modify: `src/components/hero.tsx`

- [ ] **Step 1: Add recruiter link below social icons**

Find the closing `</motion.div>` of the social icons block (around line 68) and add this paragraph before it closes:

```tsx
          {/* Recruiter link */}
          <p className="mt-6 text-sm text-brand-primary-text/40 dark:text-slate-600">
            {t.hero.recruiterLink}{' '}
            <a href="/dev" className="text-brand-accent hover:underline">
              /dev →
            </a>
          </p>
```

The full updated social icons + recruiter link section (replace everything from `<div className="flex justify-center space-x-6` to its closing `</div>`):

```tsx
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center space-x-6 text-brand-primary-text/80">
              <a href="https://github.com/internick2017" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/nick-granados" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="mailto:hello@nickgranados.com" className="hover:text-brand-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
            <p className="text-sm text-brand-primary-text/40 dark:text-slate-600">
              {t.hero.recruiterLink}{' '}
              <a href="/dev" className="text-brand-accent hover:underline">/dev →</a>
            </p>
          </div>
```

- [ ] **Step 2: Verify hero shows recruiter link**

With `yarn dev` running, open http://localhost:3000. Verify the recruiter link appears below the social icons. Clicking `/dev →` should navigate to `/dev` (page doesn't exist yet — will 404, that's OK).

- [ ] **Step 3: Commit**

```bash
git add src/components/hero.tsx
git commit -m "feat: add recruiter link to hero"
```

---

### Task 7: Update src/app/page.tsx — wire Services component and update metadata

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import type { Metadata } from 'next'
import Hero from '@/components/hero'
import About from '@/components/about'
import Services from '@/components/services'
import Projects from '@/components/projects'
import Skills from '@/components/skills'
import Contact from '@/components/contact'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Nick Granados - Full Stack Developer',
  description: 'Full Stack Developer with 6+ years of experience. I build landing pages, e-commerce, web apps, and WordPress sites for businesses.',
  keywords: ['full stack developer', 'web development', 'wordpress', 'react', 'next.js', 'freelance', 'landing page', 'e-commerce'],
  authors: [{ name: 'Nick Granados' }],
  creator: 'Nick Granados',
  robots: 'index, follow',
  openGraph: {
    title: 'Nick Granados - Full Stack Developer',
    description: 'I build landing pages, e-commerce, web apps, and WordPress sites for businesses. 6+ years of experience.',
    url: 'https://nickgranados.com',
    siteName: 'Nick Granados',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Nick Granados - Full Stack Developer',
    description: 'I build landing pages, e-commerce, web apps, and WordPress sites for businesses.',
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation />
      <Hero />
      <Services />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Verify full page renders correctly**

With `yarn dev` running, open http://localhost:3000. Verify the page order: Hero → Services (4 cards) → About → Projects → Skills → Contact. The nav "Services" link should scroll to the Services section. Switch languages — all sections should update.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire Services component and add Open Graph metadata"
```

---

### Task 8: Create src/app/dev/page.tsx — recruiter page

**Files:**
- Create: `src/app/dev/page.tsx`

Note: Add your CV as `public/cv-nick-granados.pdf` before deploying if you want the Download CV button to work. If not ready, the button links to LinkedIn instead.

- [ ] **Step 1: Create the file**

```tsx
import { getAllTechnologies } from '@/data/projects'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nick Granados — Developer Profile',
  description: 'Full Stack Developer with 6+ years of experience. WordPress, PHP, React, Next.js, Laravel, and more.',
  robots: 'noindex',
}

export default function DevPage() {
  const technologies = getAllTechnologies()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Nick Granados</h1>
        <p className="text-teal-400 text-lg font-medium mb-1">Full Stack Developer</p>
        <p className="text-slate-400 text-sm mb-10">
          6+ years of experience · Paraná, Brazil · Available for freelance part-time
        </p>

        <div className="bg-slate-800 rounded-xl p-6 mb-8 text-left border border-slate-700">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-teal-900/40 text-teal-400 text-xs rounded-full font-medium border border-teal-700/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://github.com/internick2017"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/nick-granados"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href="/cv-nick-granados.pdf"
            download
            className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-semibold transition-colors text-sm"
          >
            Download CV
          </a>
        </div>

        <p className="text-slate-500 text-xs mt-10">
          Looking for a project?{' '}
          <a href="/" className="text-teal-400 hover:underline">
            See my portfolio →
          </a>
        </p>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Verify /dev page**

With `yarn dev` running, open http://localhost:3000/dev. Verify: name, title, tech stack tags (from your projects data), three buttons. The stack should reflect exactly the technologies from your projects in `src/data/projects.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/app/dev/page.tsx
git commit -m "feat: add /dev page for recruiters with auto-generated tech stack"
```

---

### Task 9: Create public/sitemap.xml and public/robots.txt

**Files:**
- Create: `public/sitemap.xml`
- Create: `public/robots.txt`

- [ ] **Step 1: Create sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nickgranados.com/</loc>
    <lastmod>2026-05-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 2: Create robots.txt**

```
User-agent: *
Allow: /
Disallow: /dev/

Sitemap: https://nickgranados.com/sitemap.xml
```

- [ ] **Step 3: Commit**

```bash
git add public/sitemap.xml public/robots.txt
git commit -m "feat: add sitemap.xml and robots.txt for SEO"
```

---

### Task 10: Update .claude/commands/add-project.md

The `/add-project` command must now write to `src/data/projects.ts` instead of `src/components/projects.tsx`, and ask for translations in all 3 languages.

**Files:**
- Modify: `.claude/commands/add-project.md`

- [ ] **Step 1: Replace the entire file**

```markdown
Add a new project to the Nick Granados portfolio.

## Add Project Workflow

The user wants to add a new project. All project data lives in `src/data/projects.ts`.

### Step 1 — Gather info
If `$ARGUMENTS` is empty, ask the user for:
1. **Project ID** — short slug, e.g., `my-awesome-app` (used as unique key)
2. **Title (EN)** — English title
3. **Title (ES)** — Spanish title  
4. **Title (PT)** — Portuguese title
5. **Description (EN)** — 1-2 sentences in English
6. **Description (ES)** — 1-2 sentences in Spanish
7. **Description (PT)** — 1-2 sentences in Portuguese
8. **Technologies** — comma-separated list (e.g., React, Node.js, PostgreSQL)
9. **GitHub URL** — or "none" if private
10. **Live demo URL** — or "none" if not deployed
11. **Image** — check `public/images/` for available images and let user choose, or ask for new filename

### Step 2 — Check available images
Read `public/images/` directory and list files. Show user what's available. If a new image is needed, remind user to add it to `public/images/` first.

### Step 3 — Edit src/data/projects.ts
Read `src/data/projects.ts` first.
Add the new project entry to the `projects` array following the existing structure:

```typescript
{
  id: 'project-id',
  translations: {
    en: { title: 'Title EN', description: 'Description EN.' },
    es: { title: 'Title ES', description: 'Description ES.' },
    pt: { title: 'Title PT', description: 'Description PT.' },
  },
  technologies: ['Tech1', 'Tech2'],
  github: 'https://github.com/...' or null,
  demo: 'https://...' or null,
  image: '/images/project-xxx.png',
},
```

### Step 4 — Verify
Run `yarn tsc --noEmit` to verify TypeScript is happy.
Confirm the project was added. Remind user:
- The new project's technologies are now automatically included in `/dev` page stack.
- Run `/deploy "feat: add [project name] project"` to push live.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/commands/add-project.md
git commit -m "feat: update add-project command to use central data file"
```

---

### Task 11: Full build and deploy

- [ ] **Step 1: Run full build**

```bash
yarn build
```
Expected: Build completes with no errors. The `out/` directory is generated including `out/dev/index.html`.

- [ ] **Step 2: Verify the out/dev directory was generated**

```bash
ls out/dev/
```
Expected: `index.html` present.

- [ ] **Step 3: Check sitemap and robots are in out/**

```bash
ls out/sitemap.xml out/robots.txt
```
Expected: both files present.

- [ ] **Step 4: Deploy**

```
/deploy "feat: add Services section, /dev recruiter page, scalable projects grid, and SEO basics"
```

- [ ] **Step 5: Verify live site**

Open https://nickgranados.com — verify Services section appears. Open https://nickgranados.com/dev — verify tech stack loads. Open https://nickgranados.com/sitemap.xml — verify it's accessible.

---

### Task 12: External Setup (Manual — Nick does these)

These are not code tasks. Do them once after the site is deployed.

- [ ] **Google Search Console**
  1. Go to https://search.google.com/search-console
  2. Add property → URL prefix → `https://nickgranados.com`
  3. Verify ownership (DNS record or HTML file — choose DNS if you have cPanel access)
  4. Sitemaps → Submit `https://nickgranados.com/sitemap.xml`

- [ ] **LinkedIn profile optimization**
  1. Update headline to match the site hero: "Full Stack Developer · Landing Pages, E-commerce & Web Apps"
  2. Add nickgranados.com to the website field
  3. Post the first project with live demo link (use GramToSpoon or your best project)

- [ ] **Upwork or Workana profile** (pick one to start)
  1. Create a profile matching the /dev page tech stack
  2. Use the same project screenshots as portfolio samples
  3. Set your hourly rate and availability (part-time)
