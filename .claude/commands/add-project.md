Add a new project to the Nick Granados portfolio.

## Add Project Workflow

The user wants to add a new project to `src/components/projects.tsx`.

### Step 1 — Gather info
If `$ARGUMENTS` is empty, ask the user for:
1. **Project name** — e.g., "My Awesome App"
2. **Short description** — 1-2 sentences about what it does
3. **Technologies used** — list of tech tags (React, Node.js, PostgreSQL, etc.)
4. **GitHub URL** — or "none" if private
5. **Live demo URL** — or "none" if not deployed
6. **Image** — check which images exist in `public/images/` and let the user choose, OR use a placeholder

If `$ARGUMENTS` is provided, try to parse the info from it.

### Step 2 — Check available images
Read `public/images/` and list available project images:
- `project-gramtospoon.png` (already used)
- `project-jjj.png`
- `project-repairshop.png`
- `project-shadcn.png`

Show the user what's available and ask which to use.

### Step 3 — Edit projects.tsx
Read `src/components/projects.tsx` first.
Add the new project to the projects array following the existing data structure.

### Step 4 — Verify
Confirm the new project was added. Remind the user to run `/deploy` to push the change live.
