Execute the full deploy workflow for the Nick Granados portfolio site.

## Deploy Workflow

Follow these steps in order:

### Step 1 — Verify working state
- Check `git status` to see what files changed
- Show a brief summary of changes to the user

### Step 2 — Build
Run `yarn build` in the project root.
- If build fails, STOP and report the error. Do NOT proceed to commit/push.
- If build succeeds, confirm `out/index.html` exists.

### Step 3 — Stage and commit
- Run `git add -A`
- Ask the user for a commit message OR generate one based on the changed files
- If the user passes a message as `$ARGUMENTS`, use that directly. Example: `/deploy "feat: add new project card"`
- Commit format: conventional commits (feat/fix/chore/style/docs)

### Step 4 — Push
- Run `git push`
- Confirm push succeeded
- Remind the user that Vercel will auto-deploy in ~1 minute

### Error handling
- If any step fails, stop immediately and report what went wrong
- Never push if build failed
- Never push if commit failed
