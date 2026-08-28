Execute the full deploy workflow for the Nick Granados portfolio site.

## Deploy Workflow

Follow these steps in order:

### Step 1 — Verify working state
- Check `git status` to see what files changed
- Show a brief summary of changes to the user

### Step 2 — Build (pre-flight check)
Run `yarn build` in the project root.
- If build fails, STOP and report the error. Do NOT proceed to commit/push.
- If build succeeds, confirm `out/index.html` exists.
- Note: this local build is only a pre-flight check. The `out/` directory is gitignored and is
  NOT what ships. CI rebuilds from source after the push (see Step 4). Building locally first
  is what stops a broken commit from ever reaching `master`.

### Step 3 — Stage and commit
- Run `git add -A`
- Ask the user for a commit message OR generate one based on the changed files
- If the user passes a message as `$ARGUMENTS`, use that directly. Example: `/deploy "feat: add new project card"`
- Commit format: conventional commits (feat/fix/chore/style/docs)

### Step 4 — Push
- Run `git push`
- Confirm push succeeded
- Tell the user the site deploys to **HostGator**, not Vercel (Vercel is no longer used for this
  project). The push to `master` triggers the GitHub Actions workflow `.github/workflows/deploy.yml`
  ("Build & Deploy to HostGator"), which reinstalls dependencies, runs `yarn build`, and uploads
  `out/*` over SFTP to `/home1/nickda77/nickgranados.com`. Expect roughly 2-3 minutes, not 1.
- The deploy only fires on pushes to `master`. Pushing any other branch builds nothing and
  publishes nothing.
- If the user wants to watch it or a deploy seems stuck, point them to the Actions tab:
  https://github.com/internick2017/nick-granados-website/actions

### Error handling
- If any step fails, stop immediately and report what went wrong
- Never push if build failed
- Never push if commit failed
- A green local build does not mean the deploy succeeded. If the user reports the live site is
  stale, check the Actions run before touching the code: the failure is usually in CI (a missing
  or rotated `SSH_HOST` / `SSH_USERNAME` / `SSH_PRIVATE_KEY` secret, or the SFTP step timing out),
  not in the build.

### Repo note
The GitHub Action is the ONLY deploy mechanism. An older cPanel-git route (`.cpanel.yml`, deploying
to `/home1/nickda77/public_html/`) was superseded by the Action in April 2026; the dead file was
deleted on 2026-08-27. Some plan documents under `docs/` still describe that old route — they are
historical records. If a deploy misbehaves, look at the Actions run, never at cPanel config.
