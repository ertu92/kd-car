# Repository Guidelines

## Project Structure & Module Organization
This Next.js app uses the App Router. Entry points live in `app/`, with public routes such as `app/inventory` and shared layout assets in `app/layout.tsx` and `app/globals.css`. Backend logic belongs under `app/api/` (for example `app/api/contact/route.ts`) to keep secrets server-side. Reusable UI should sit in `components/`, and static assets go in `public/` so they can be referenced with absolute paths like `/cars/model-x.jpg`. Keep new feature blocks shallow—prefer a new component over nesting deeply inside route folders.

## Build, Test, and Development Commands
Run `npm install` to sync dependencies with `package-lock.json`. Use `npm run dev` for hot-reloading on `http://localhost:3000`. Execute `npm run build` before deployment to emit the `.next/` production bundle, then `npm run start` to smoke-test that bundle locally. Keep lint clean with `npm run lint` (add `--fix` for autoformatting). `npx tsc --noEmit` is optional but helpful to surface strict TypeScript issues that ESLint misses.

## Coding Style & Naming Conventions
Follow the existing two-space indentation, single quotes, and no semicolons across TypeScript and JSX. Components should be functional with explicit prop interfaces. Name components/files in PascalCase (`CarDetailModal.tsx`) and hooks/helpers in camelCase. Tailwind classes read best when ordered from layout to color. Share reusable animations, hooks, and helpers via `components/` or a future `lib/` module rather than duplicating logic.

## Testing Guidelines
Automated coverage is not set up yet; when adding tests, prefer React Testing Library with Jest or Vitest and colocate files as `Component.test.tsx` or under `__tests__/`. Document manual validation steps (responsive layouts, contact form, dark mode) in PR descriptions until tooling lands. API routes must ship with either lightweight unit tests or a written manual test plan before merge.

## Commit & Pull Request Guidelines
Write imperative, scoped commit subjects such as `feat: add booking CTA`, keeping each commit focused. Rebase or squash WIP commits so each PR covers a single reviewable concern. PR descriptions should include a change summary, validation (`npm run lint`, manual device checks), and screenshots or GIFs for UI updates. Link related issues, note any `.env` changes, and tag reviewers responsible for the touched area.

## Environment & Configuration Notes
Copy `env.example` to `.env.local` for SMTP and CARMS credentials; never commit real secrets. Restart `npm run dev` after modifying Tailwind, Next.js, or environment files to refresh generated config. Static assets belong in `public/`, and secrets should only be read inside `app/api/` handlers or server components.
