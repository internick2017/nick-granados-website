# CV Multi-Version System — Design Spec

**Date:** 2026-05-22
**Status:** Approved

## Goal

Replace the single-version CV at `/dev/cv` with an extensible multi-version system. The default (Full Stack) version gets rewritten applying impact-first content principles. A WordPress Developer specialized version is added. Future role-specific versions can be added by dropping a new file in `src/data/resumes/`.

---

## Architecture

### Data Layer

```
src/data/
  resume.ts               ← improved default (Full Stack Developer)
  resumes/
    resume-wordpress.ts   ← WordPress Developer specialization
    resume-[slug].ts      ← future versions (one file per target role)
```

- All versions use the existing `ResumeData` type from `resume.ts` — no type changes needed.
- All versions are trilingual (en/es/pt).
- A version registry object maps slug → label → data, consumed by the UI.

```ts
// src/data/resumes/index.ts
export const resumeVersions = {
  default: { label: { en: 'Full Stack', es: 'Full Stack', pt: 'Full Stack' }, data: resume },
  wordpress: { label: { en: 'WordPress', es: 'WordPress', pt: 'WordPress' }, data: resumeWordpress },
}
export type ResumeVersion = keyof typeof resumeVersions
```

### Routing

- `/dev/cv` → renders default version
- `/dev/cv?v=wordpress` → renders WordPress version
- Version param is read client-side via `useSearchParams`. Language selection persists across version switches.

### UI Controls

```
[ EN | ES | PT ]    [ Full Stack | WordPress ]    [ Imprimir PDF ]
```

- Version selector sits between language selector and print button.
- Switching version updates the URL param and re-renders CV content.
- Print button always prints the currently visible version.

---

## Content: Default Version (Full Stack) — Changes

### Title
`Full Stack Developer` — unchanged

### Summary (rewritten)
> "I build full-stack web applications with PHP, WordPress, and React — from custom plugins and REST API integrations to modern front-end interfaces. With 6+ years across agencies, remote teams, and direct clients, I deliver reliable, performance-focused solutions and communicate clearly across time zones."

### topSkills (cleaned)
`WordPress · PHP · JavaScript / React · REST API · Git`

### Bullet rewrites

**CEICOM — "Strengthened skills" → impact bullet:**
> "Delivered full-cycle PHP and WordPress projects — from requirements gathering through deployment — for regional clients."

**Aresmkt — "Established Aresmkt focusing on..." → concrete bullet:**
> "Founded a digital marketing agency, acquiring first clients within 3 months and managing web and campaign projects end-to-end."

**Freelancer — "improved client satisfaction" → specific:**
> "Built custom WordPress themes and plugins for 20+ clients across industries, maintaining a 100% on-time delivery rate."

---

## Content: WordPress Version (New)

### Title
`WordPress Developer`

### Summary
> "I build and scale WordPress platforms — custom plugins, Gutenberg blocks, Carbon Fields and ACF-driven content structures, and REST API integrations. 6+ years of WordPress development including agency work at Apiki and 20+ freelance projects, collaborating with marketing and design teams to ship SEO-friendly, performant sites."

### topSkills
`WordPress · PHP · Gutenberg · Carbon Fields · ACF · WooCommerce · WPML · REST API`

### Experience — Apiki (4 bullets)

1. "Created and customized plugins that increased user engagement by 30% across multiple platforms."
2. "Built custom Gutenberg blocks and Carbon Fields content structures, enabling editors to manage complex page layouts independently."
3. "Developed custom REST API endpoints and WooCommerce integrations that reduced data processing time by 25%."
4. "Maintained WPML-powered multilingual multisite environment with WP-CLI automation for deployments and database management."

### Experience — CEICOM (bullets rewritten)

1. "Spearheaded requirements gathering and solution architecture, aligning project outcomes with client expectations."
2. "Built custom PHP/WordPress solutions using ACF for dynamic content modeling, covering full project lifecycle from client briefing to production deployment."
3. "Delivered and maintained bespoke evaluation and data management systems for regional clients using PHP and WordPress." *(replaces "Strengthened skills")*

### Experience — Freelancer (bullets rewritten)

1. "Completed over 20 WordPress projects with a 100% on-time delivery rate."
2. "Built custom WordPress themes and plugins with ACF integration for clients across retail, services, and education sectors."
3. "Developed expertise in project management, WordPress development, and direct client communication."

### Experience — Aresmkt, Inkaweb
Same as default version (no WordPress-specific changes needed).

---

## Extensibility

To add a new version (e.g. `resume-react.ts`):
1. Create `src/data/resumes/resume-react.ts` with a `ResumeData` export.
2. Add entry to `resumeVersions` in `src/data/resumes/index.ts`.
3. The UI selector picks it up automatically — no component changes needed.

---

## Out of Scope

- PDF generation server-side (print/save via browser is sufficient)
- CMS or admin UI for editing CV content
- More than 2 versions at launch
