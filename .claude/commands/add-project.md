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

If `$ARGUMENTS` is provided, parse the info from it and fill in what's missing.

### Step 2 — Take screenshot automatically

If the user provided a **live demo URL** (not "none"), use the `browse` skill to capture a real screenshot:

```bash
# Resolve browse binary
B="$HOME/.claude/skills/gstack/browse/dist/browse"
_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
[ -n "$_ROOT" ] && [ -x "$_ROOT/.claude/skills/gstack/browse/dist/browse" ] && B="$_ROOT/.claude/skills/gstack/browse/dist/browse"

# Navigate, wait for full load, screenshot
$B goto <demo-url>
$B viewport 1280x800
$B wait --networkidle
$B screenshot "public/images/project-<slug>.png"
```

Replace `<demo-url>` and `<slug>` with the actual values. The image is saved to `public/images/project-<slug>.png`.

After taking the screenshot, read the file with the Read tool so the user can see it and confirm it looks good. If the page needs scrolling or a better section is visible at a different scroll position, use:
```bash
$B scroll ".hero"   # or any selector that positions the view better
$B screenshot "public/images/project-<slug>.png"
```

If the demo URL requires login or the screenshot is blank/broken, fall back to **Step 2b**.

#### Step 2b — Fallback: check available images

If browse is not available or the screenshot failed, read the `public/images/` directory and list the files so the user can pick one. Show which images are already in use by reading `src/data/projects.ts`.

Set `image` to the chosen filename.

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
  image: '/images/project-<slug>.png',
},
```

Use `null` (not a string) for github/demo when the user says "none".

### Step 4 — Verify

Run `yarn tsc --noEmit` to confirm no TypeScript errors.

Remind the user:
- New technologies from this project are **automatically included** in the `/dev` recruiter page — no extra steps needed.
- Run `/deploy "feat: add [project name] project"` to push live.
