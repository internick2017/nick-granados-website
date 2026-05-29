# Projects Section Redesign — Spec

**Date:** 2026-05-28
**Status:** Approved

## Problem

The current projects section renders all projects in a stacked vertical list where each project occupies a full row (text + image side by side). With 11 projects today and more planned, this creates an excessively long scroll with no way to navigate by interest. The layout also doesn't scale — every new project adds another ~300px of vertical space.

## Decision Summary

| Dimension | Decision |
|-----------|----------|
| Layout | Filter pills + responsive card grid |
| Card style | Visual-first (image 65%, title + tags below) |
| Hover interaction | Dark overlay with Demo and GitHub buttons |
| Categories | Full-Stack, APIs, Frontend, Mobile, WordPress |
| Filter behavior | Single-select, "Todos" resets to all |

## Architecture

### Data layer

Add a `category` field to the `Project` type in `src/data/projects.ts`:

```ts
type Category = 'fullstack' | 'api' | 'frontend' | 'mobile' | 'wordpress'

type Project = {
  // ...existing fields
  category: Category
}
```

Assign categories to all 11 existing projects:

| Project | Category |
|---------|----------|
| Repair Shop | fullstack |
| J.J.J Investments | fullstack |
| Clear Path | fullstack |
| Event Planner API | api |
| DRF Course API | api |
| Laravel Image API | api |
| GramToSpoon | frontend |
| SleepOutside | frontend |
| shadcn/ui Showcase | frontend |
| DoseTime | mobile |
| Lanny Herrera | wordpress |

### Component structure

Replace the existing `src/components/projects.tsx` with:

```
Projects (section wrapper)
├── SectionHeader (title + subtitle — unchanged)
├── FilterBar (filter pills)
│   └── FilterPill × N (one per category + "Todos")
└── ProjectsGrid (responsive grid)
    └── ProjectCard × N
        ├── CardImage (image with overlay on hover)
        │   └── CardOverlay (Demo + GitHub buttons, opacity transition)
        └── CardBody (category label + title + tech tags)
```

No new files needed — all fits cleanly in `projects.tsx` using local state.

### Filter state

Client-side only, no URL params. A single `useState<Category | 'all'>` drives which cards render. Cards outside the active filter are removed from the DOM (not just hidden with CSS) so Framer Motion `AnimatePresence` can animate them in/out.

### Translations

The filter pill labels need translations. Add to the existing translation system:

```ts
// Translations needed per language (es | en | pt):
filters: {
  all:       'Todos'     | 'All'       | 'Todos'
  fullstack: 'Full-Stack'              // equal in all 3
  api:       'APIs'                    // equal in all 3
  frontend:  'Frontend'                // equal in all 3
  mobile:    'Móvil'     | 'Mobile'   | 'Mobile'
  wordpress: 'WordPress'               // equal in all 3
}
demo:        'Ver Demo'  | 'Live Demo' | 'Ver Demo'
github:      'GitHub'                  // equal in all 3
```

## Visual Spec

### FilterBar

- Pills horizontales, `flex-wrap` para mobile
- Pill activa: fondo `#1e3a8a` (navy), texto blanco
- Pill inactiva: fondo blanco, borde `#e2e8f0`, texto `#64748b`
- Hover en inactiva: borde y texto `#0d9488` (teal)
- Transición `0.2s ease` en color/borde

### ProjectsGrid

- 3 columnas en desktop (`lg:grid-cols-3`)
- 2 columnas en tablet (`sm:grid-cols-2`)
- 1 columna en mobile
- `gap-5` entre cards

### ProjectCard

**Image block (65% de la card):**
- Altura fija `h-48` (192px) — consistente en todas las cards independientemente del aspect ratio de la imagen
- `object-cover`, zoom suave `scale-105` en hover de la card
- Overlay: `bg-slate-900/75`, `opacity-0` → `opacity-100` en hover
- Transición overlay: `duration-250`
- Botones en overlay: aparecen con `translateY(6px)` → `translateY(0)` con delay 50ms
  - "↗ Ver Demo": fondo blanco, texto navy, border-radius full
  - "⬡ GitHub": fondo transparente, borde blanco, texto blanco
  - Si no hay `github`, mostrar solo el botón Demo

**Card body:**
- Label de categoría: texto `#0d9488`, `text-xs font-bold uppercase tracking-wide`
- Título: `text-sm font-bold text-slate-900 dark:text-white`
- Tags: pills pequeñas `bg-blue-50 text-blue-800` (dark: `bg-slate-700 text-slate-300`)

### Animaciones (Framer Motion)

- `AnimatePresence mode="popLayout"` en el grid para animar entrada/salida al filtrar
- Cada card: `initial={{ opacity: 0, scale: 0.95 }}` → `animate={{ opacity: 1, scale: 1 }}`
- `exit={{ opacity: 0, scale: 0.95 }}`
- `transition={{ duration: 0.2 }}`
- `layout` prop en cada card para que las restantes se reposicionen suavemente

### Dark mode

- Card background: `dark:bg-slate-700`
- Section background: existente (`dark:bg-slate-800`)
- Tags: `dark:bg-slate-600 dark:text-slate-200`
- Pill inactiva dark: `dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300`

## Constraints

- Static export — no server state, no URL-based filters
- `AnimatePresence` + `layout` from Framer Motion 11 (already installed)
- No new dependencies
- Must preserve the existing `whileInView` entrance animation on the section header

## Out of scope

- Pagination or "load more" (11 cards fit comfortably in a grid; revisit if >20)
- Search / text filter
- Sorting
- Project detail pages
