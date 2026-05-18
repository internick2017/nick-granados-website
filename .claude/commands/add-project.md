Add a new project to the Nick Granados portfolio.

## Add Project Workflow

All project data lives in `src/data/projects.ts`. Adding a project here automatically updates both the Projects section on the main site and the tech stack on the `/dev` recruiter page.

### Step 1 — Gather info

If `$ARGUMENTS` is empty, ask the user for the following (one message, numbered list):

1. **Project ID / slug** — lowercase, no spaces (e.g., `gramtospoon`, `repairshop`)
2. **Title in English**
3. **Title in Spanish**
4. **Title in Portuguese**
5. **Description in English** — 1-2 sentences
6. **Description in Spanish**
7. **Description in Portuguese**
8. **Technologies** — comma-separated list (e.g., `React, Node.js, PostgreSQL, Tailwind CSS`)
9. **GitHub URL** — or "none" if private
10. **Live demo URL** — or "none" if not deployed
11. **Image filename** — see Step 2 first

If `$ARGUMENTS` is provided, parse the info from it and fill in what's missing.

### Step 2 — Check available images

Read the `public/images/` directory and list the files so the user can pick one. Show which images are already in use by reading `src/data/projects.ts`.

### Step 3 — Edit src/data/projects.ts

Read `src/data/projects.ts` first, then append the new project object to the `projects` array following the existing structure:

```typescript
{
  id: 'project-id',
  translations: {
    en: { title: 'Title EN', description: 'Description EN' },
    es: { title: 'Title ES', description: 'Description ES' },
    pt: { title: 'Title PT', description: 'Description PT' },
  },
  technologies: ['Tech1', 'Tech2', 'Tech3'],
  github: 'https://github.com/internick2017/repo' , // or null
  demo: 'https://demo.url/', // or null
  image: '/images/project-filename.png',
},
```

Use `null` (not a string) for github/demo when the user says "none".

### Step 4 — Verify

Run `yarn tsc --noEmit` to confirm no TypeScript errors.

Remind the user:
- New technologies from this project are **automatically included** in the `/dev` recruiter page — no extra steps needed.
- Run `/deploy "feat: add [project name] project"` to push live.
