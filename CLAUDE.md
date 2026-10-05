@AGENTS.md
@docs/design-system/README.md

# Repskill website

- **Design system is mandatory.** Before building or changing any UI, read the relevant files in `docs/design-system/`
  (color, typography, layout, components, motion, imagery). It is derived from `docs/brand/repskill-brand-guidelines.pdf`;
  if they conflict, the PDF wins and the design-system doc should be updated.
- Use the Tailwind tokens from `src/app/globals.css` (`bg-brand-orange`, `text-h2`, `rounded-card`, `shadow-float`, …), never
  raw hex or arbitrary font sizes in components. Micro sizes are only allowed inside UI-mockup illustrations.
- Static export (`output: "export"`): no server features (Server Actions, route handlers using Request,
  rewrites/redirects/headers, proxy, default image optimization).
- All copy/data lives in `src/content/`; components in `src/components/` only render it. Navigation is the single source in
  `src/content/navigation.ts`.
- Animations: reuse `Reveal` / `Stagger` from `src/components/motion/`; import from `motion/react`.
- Old site content for reference: `docs/legacy/pages/*.html` (data is in each file's `renderVals()` script).
- If a new reusable pattern or token is introduced, document it in `docs/design-system/` in the same change.
- Before finishing: `npm run lint && npm run typecheck && npm run build`.

## Parallel sessions & worktrees

Several Claude sessions may work on this repo at the same time. These rules keep them from overwriting each other.

- **One session = one workspace.** The main folder (on `main`) belongs to the primary session. Every additional
  session (tests, experiments, a second task) works in its own worktree: use `EnterWorktree` with a short task slug as
  the name (e.g. `pricing-copy`, `test-form`). The branch becomes `worktree-<name>`.
- Never edit, commit, or run `git checkout`/`reset` in another session's folder. Stay inside your own worktree.
- Each worktree needs its own `npm install` (`node_modules` is not shared). Run the dev server on a unique port:
  main uses 3000, worktrees use `npm run dev -- -p 3001`, `3002`, …
- Commit small and often on the worktree branch. Git stash is shared by all worktrees: never use bare
  `git stash` / `git stash pop`; use a WIP commit instead.
- Files most likely to conflict between sessions: `src/content/navigation.ts`, `src/app/globals.css`, `src/lib/cn.ts`,
  `docs/design-system/*`, `CLAUDE.md`. Keep edits there minimal and mention them in the summary.
- **Getting work into `main`:** `git fetch origin && git rebase origin/main`, then
  `npm run lint && npm run typecheck && npm run build` must pass. Then either push the branch and open a Pull Request on
  GitHub (CI runs on PRs), or merge into `main` locally — only when the user asks.
- **Deploy = push to `main`** (GitHub Actions publishes to GitHub Pages automatically). Push to `main` only when the user
  explicitly asks to deploy. Never push worktree branches straight to `main`.
- When the task is done: after the merge, leave with `ExitWorktree` → `remove`. If the work is not merged yet, use `keep`.
