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
