# Projects Section Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the stacked vertical project list with a filterable card grid — filter pills by category, visual-first cards, and a hover overlay with Demo/GitHub buttons.

**Architecture:** Single `useState` for the active filter drives which cards are shown. `AnimatePresence mode="popLayout"` from Framer Motion handles entry/exit animations. No new files — changes touch `projects.ts` (data), `translations.ts` (i18n), and `projects.tsx` (component).

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 3, Framer Motion 11, Lucide React

**Spec:** `docs/specs/2026-05-28-projects-section-redesign.md`

---

## Task 1: Add `Category` type and extend `Project` type

**Files:**
- Modify: `src/data/projects.ts` (lines 1–19, the type block)

- [ ] **Step 1: Add `Category` export and `category` field to `Project` type**

Replace the current type block at the top of `src/data/projects.ts`:

```ts
// src/data/projects.ts

export type Category = 'fullstack' | 'api' | 'frontend' | 'mobile' | 'wordpress'

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
  category: Category
}
```

- [ ] **Step 2: Verify TypeScript catches missing `category` fields**

Run:
```bash
cd "f:/proyects-to-sell/portfolio-template/nick-granados-website"
yarn tsc --noEmit 2>&1 | head -30
```

Expected: Multiple errors like `Property 'category' is missing in type...` — one per project object. This confirms the type guard is working before we fill in the values.

---

## Task 2: Assign categories to all 11 projects

**Files:**
- Modify: `src/data/projects.ts` — add `category` field to each project object

- [ ] **Step 1: Add `category` to each project in `src/data/projects.ts`**

Add the `category` field immediately after the `image` field in each project. The complete mapping:

| id | category |
|----|----------|
| `gramtospoon` | `'frontend'` |
| `repairshop` | `'fullstack'` |
| `jjj-investments` | `'fullstack'` |
| `lanny-herrera` | `'wordpress'` |
| `dose-time` | `'mobile'` |
| `event-planner-api` | `'api'` |
| `clear-path` | `'fullstack'` |
| `sleepouside` | `'frontend'` |
| `drf-course-api` | `'api'` |
| `laravel-image-api` | `'api'` |
| `shadcn-nextjs` | `'frontend'` |

For example, the `gramtospoon` project becomes:

```ts
{
  id: 'gramtospoon',
  translations: { ... },
  technologies: [...],
  github: 'https://github.com/internick2017',
  demo: 'https://gramtospoon.nickgranados.com/',
  image: '/images/project-gramtospoon.png',
  category: 'frontend',
},
```

Apply the same pattern to all 11 projects using the mapping table above.

- [ ] **Step 2: Confirm TypeScript errors are gone**

Run:
```bash
cd "f:/proyects-to-sell/portfolio-template/nick-granados-website"
yarn tsc --noEmit 2>&1 | head -20
```

Expected: No output (zero errors). If there are remaining errors about `category`, check for a missing or misspelled field in one of the projects.

- [ ] **Step 3: Commit**

```bash
cd "f:/proyects-to-sell/portfolio-template/nick-granados-website"
git add src/data/projects.ts
git commit -m "feat: add category field to Project type and all project entries"
```

---

## Task 3: Add filter translations to all 3 languages

**Files:**
- Modify: `src/lib/translations.ts` — add `filters` object under `projects` in `en`, `es`, and `pt`

- [ ] **Step 1: Update `en.projects` in `src/lib/translations.ts`**

Replace the existing `projects` block in the `en` object:

```ts
projects: {
  title: "Featured Projects",
  subtitle: "Real projects, live demos — here's what I've built",
  github: "GitHub",
  liveDemo: "Live Demo",
  filters: {
    all: "All",
    fullstack: "Full-Stack",
    api: "APIs",
    frontend: "Frontend",
    mobile: "Mobile",
    wordpress: "WordPress",
  },
},
```

- [ ] **Step 2: Update `es.projects`**

```ts
projects: {
  title: "Proyectos Destacados",
  subtitle: "Proyectos reales, demos en vivo — esto es lo que construí",
  github: "GitHub",
  liveDemo: "Demo en vivo",
  filters: {
    all: "Todos",
    fullstack: "Full-Stack",
    api: "APIs",
    frontend: "Frontend",
    mobile: "Móvil",
    wordpress: "WordPress",
  },
},
```

- [ ] **Step 3: Update `pt.projects`**

```ts
projects: {
  title: "Projetos em Destaque",
  subtitle: "Projetos reais, demos ao vivo — veja o que construí",
  github: "GitHub",
  liveDemo: "Demo ao vivo",
  filters: {
    all: "Todos",
    fullstack: "Full-Stack",
    api: "APIs",
    frontend: "Frontend",
    mobile: "Mobile",
    wordpress: "WordPress",
  },
},
```

- [ ] **Step 4: Verify no TypeScript errors**

```bash
cd "f:/proyects-to-sell/portfolio-template/nick-granados-website"
yarn tsc --noEmit 2>&1 | head -20
```

Expected: No output.

- [ ] **Step 5: Commit**

```bash
cd "f:/proyects-to-sell/portfolio-template/nick-granados-website"
git add src/lib/translations.ts
git commit -m "feat: add project filter translations (en/es/pt)"
```

---

## Task 4: Rewrite the Projects component

**Files:**
- Modify: `src/components/projects.tsx` — full replacement

- [ ] **Step 1: Replace `src/components/projects.tsx` with the new implementation**

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { projects, type Category } from '@/data/projects'

type Filter = Category | 'all'

const FILTER_KEYS = ['all', 'fullstack', 'api', 'frontend', 'mobile', 'wordpress'] as const
type FilterKey = (typeof FILTER_KEYS)[number]

export default function Projects() {
  const { t, lang } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<Filter>('all')

  const filtered =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary-text dark:text-white mb-4">
            {t.projects.title}
          </h2>
          <p className="text-lg text-brand-secondary-text dark:text-slate-300">
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {FILTER_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key as Filter)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors duration-200 ${
                activeFilter === key
                  ? 'bg-brand-primary border-brand-primary text-white'
                  : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300 hover:border-brand-accent hover:text-brand-accent dark:hover:border-brand-accent dark:hover:text-brand-accent'
              }`}
            >
              {t.projects.filters[key as FilterKey]}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="group bg-white dark:bg-slate-700 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-600 shadow-sm hover:-translate-y-1 transition-transform duration-200"
              >
                {/* Image + hover overlay */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.translations[lang].title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay — desktop only (touch devices have no hover) */}
                  <div className="absolute inset-0 bg-slate-900/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center justify-center gap-3">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 bg-white text-brand-primary font-bold text-xs rounded-full translate-y-2 group-hover:translate-y-0 transition-transform duration-200 hover:bg-slate-100"
                      >
                        <ExternalLink size={13} />
                        {t.projects.liveDemo}
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 bg-transparent border border-white text-white font-bold text-xs rounded-full translate-y-2 group-hover:translate-y-0 transition-transform duration-200 delay-75 hover:bg-white/10"
                      >
                        <Github size={13} />
                        {t.projects.github}
                      </a>
                    )}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-accent mb-1">
                    {t.projects.filters[project.category as FilterKey]}
                  </p>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 leading-snug">
                    {project.translations[lang].title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-blue-50 dark:bg-slate-600 text-blue-800 dark:text-slate-200 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 bg-blue-50 dark:bg-slate-600 text-blue-800 dark:text-slate-200 text-xs rounded-full">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Mobile-only links (overlay not visible on touch) */}
                  <div className="flex gap-3 sm:hidden">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-semibold text-brand-accent hover:underline"
                      >
                        <ExternalLink size={12} />
                        {t.projects.liveDemo}
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-brand-accent hover:underline"
                      >
                        <Github size={12} />
                        {t.projects.github}
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd "f:/proyects-to-sell/portfolio-template/nick-granados-website"
yarn tsc --noEmit 2>&1 | head -30
```

Expected: No output.

- [ ] **Step 3: Run the dev server and verify visually**

```bash
cd "f:/proyects-to-sell/portfolio-template/nick-granados-website"
yarn dev
```

Open `http://localhost:3000` and check:
- [ ] 11 cards visible in a 3-column grid when "All" is selected
- [ ] Clicking "Full-Stack" shows only 3 cards (Repair Shop, JJJ, Clear Path) with animation
- [ ] Clicking "APIs" shows 3 cards (Event Planner, DRF, Laravel Image)
- [ ] Clicking "Frontend" shows 3 cards (GramToSpoon, SleepOutside, shadcn)
- [ ] Clicking "Mobile" shows 1 card (DoseTime)
- [ ] Clicking "WordPress" shows 1 card (Lanny Herrera)
- [ ] Hovering a card on desktop shows the dark overlay with Demo/GitHub buttons
- [ ] Overlay buttons are hidden on mobile (< 640px width — check with DevTools)
- [ ] Mobile-only links (Demo + GitHub text) appear below the tags on small screens
- [ ] Dark mode looks correct (toggle the sun/moon icon)
- [ ] Category label in teal appears above the project title in each card
- [ ] Tags that exceed 4 show a `+N` badge

- [ ] **Step 4: Run production build**

```bash
cd "f:/proyects-to-sell/portfolio-template/nick-granados-website"
yarn build
```

Expected: Build succeeds. Static export generates `out/` folder with no errors.

- [ ] **Step 5: Commit**

```bash
cd "f:/proyects-to-sell/portfolio-template/nick-granados-website"
git add src/components/projects.tsx
git commit -m "feat: redesign projects section — filterable card grid with hover overlay"
```

---

## Task 5: Deploy

- [ ] **Step 1: Deploy to HostGator**

```bash
cd "f:/proyects-to-sell/portfolio-template/nick-granados-website"
git push origin master
```

The `.cpanel.yml` CI/CD pipeline will pick up the push, run `yarn build`, and deploy `out/` to `/home1/nickda77/public_html/` via SFTP automatically.

- [ ] **Step 2: Verify on production**

Open `https://nickgranados.com` and repeat the visual checks from Task 4 Step 3 on the live site.
