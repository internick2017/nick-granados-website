# Nick Granados Portfolio — Context for Claude

## Project Goal
This is Nick's **personal portfolio and freelance showcase** — designed to attract clients for:
- Custom web development (Next.js, React, Node.js)
- WordPress sites and customization
- Full-stack web applications

It is also a template that can be adapted for clients, but the primary purpose is showcasing Nick's services.

## Owner
Nick Granados — Full Stack Developer, based in Paraná, Brazil
GitHub: https://github.com/nick-granados

## Stack
- Framework: Next.js 15 (App Router, static export `output: 'export'`)
- Styles: Tailwind CSS 3 with custom palette (Navy #1e3a8a, Teal #0d9488)
- Animations: Framer Motion 11 (whileInView triggers)
- Icons: Lucide React 0.378
- Themes: next-themes 0.3 (class-based dark mode)
- Package manager: Yarn 4.3.1

## Architecture
Single-page portfolio with sections:
`Hero → About → Projects → Skills → Contact → Footer`

- Components: `src/components/`
- Main page: `src/app/page.tsx`
- Layout: `src/app/layout.tsx` (ThemeProvider + Google Ads)
- Styles: `src/app/globals.css`

## Deployment
- **HostGator (cPanel)**: `yarn build` → generates `out/` → auto-deploy via `.cpanel.yml` to `/home1/nickda77/public_html/`
- **Full deploy command**: use `/deploy` (build + commit + push in one step)
- Note: Vercel is no longer used for this project.

## Key constraints
- Static export ONLY — no server functions, no API routes
- `images.unoptimized: true` required in next.config.js
- All content is hardcoded (no CMS)
- `trailingSlash: true` in next.config.js

## Custom commands (use these for common tasks)
- `/deploy "commit message"` — build + commit + push in one step
- `/add-project` — guided flow to add a new project card

## Manual tasks
- Update skills: edit `src/components/skills.tsx`
- Update bio/about: edit `src/components/about.tsx`
- Update hero text: edit `src/components/hero.tsx`

## Available project images
In `public/images/`: `project-gramtospoon.png`, `project-jjj.png`, `project-repairshop.png`, `project-shadcn.png`

## Contact form
Posts to `https://nickgranados.com/send-email.php` (PHP backend hosted on the same HostGator domain). No Next.js API routes — static export.

## Known issues / pending improvements
_(Actualizado 2026-07-12. Los issues anteriores — "demos full-stack sin pulir", "no hay proyectos
WordPress", cold-start de Render, y las credenciales reales hardcodeadas en el seed de JJJ — están
RESUELTOS. El portfolio tiene 17 proyectos, 4 de ellos WordPress: Kindly, ShopGraph, Lanny, Alt Generator.)_

1. **ShopGraph tiene `demo: null`** en `src/data/projects.ts` — agregar el link de demo cuando el plugin
   sea aprobado en WordPress.org (enviado 2026-07-06, en cola de revisión).

