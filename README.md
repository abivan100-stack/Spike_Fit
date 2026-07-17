# Spikefit — The Fitting Room

A rule-based, deterministic track-spike fitting tool. Answer a short guided quiz (or jump straight to your event), and get scored, explained spike recommendations — no external APIs, no ML, just a transparent rules engine over a real shoe catalog.

Vintage-athletics editorial design: paper/cream base, ink tones, retro-sport blue/red accents, Anton/Archivo type, choreographed motion with full `prefers-reduced-motion` support.

## Features

- **Guided quiz** — event, surface, experience, foot strike, budget, and injury history, with a shoe that visually assembles itself as you answer.
- **Quick-Start by Event** — skip the quiz entirely; pick one of 8 event cards (sprints, hurdles, middle distance, distance, cross country, horizontal jumps, high jump, throws) and jump straight to filtered, baseline-scored results. Refine by surface/budget/injury afterward.
- **Anatomy of a Spike** — an interactive, labeled SVG diagram (spike plate, pins, pin count, upper, heel counter, drop, forefoot cushioning, outsole grip) with leader-line callouts on desktop and a tap-to-expand list on mobile. The same glossary copy powers inline tooltips on result cards.
- **Injury-aware results** — selecting shin splints, Achilles/calf, plantar fasciitis, knee, stress-fracture history, or general joint sensitivity actually re-ranks results (never hard-excludes) and adds a plain-English adjustment note to affected cards, with a non-alarming medical disclaimer.
- **Compare view** — side-by-side spec table for up to 3 shortlisted spikes.

## Tech stack

- [Vite](https://vite.dev) + [React](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-based `@theme` config, no `tailwind.config.js`)
- No external UI/animation libraries — motion is hand-rolled CSS keyframes/transitions, matching the original design concept

## Getting started

```bash
cd app
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).

Other scripts (run from `app/`):

```bash
npm run build     # type-check + production build to app/dist
npm run preview   # serve the production build locally
npm run lint       # oxlint
```

## Project structure

```
app/
  src/
    lib/                  # all rules/config live here — nothing is hardcoded in components
      types.ts             # shared domain types (Shoe, Answers, ProfileId, InjuryKey, ...)
      shoes.ts              # the shoe catalog — specs for every model
      eventProfiles.ts       # event -> baseline spike profile rules (used by Quick-Start + quiz)
      injuryRules.ts          # injury -> scoring adjustment + note rules, disclaimer copy
      quizConfig.ts             # guided-quiz question/option config
      scoring.ts                 # scoring engine + "why this fits you" text generation
      glossary.ts                 # anatomy part explanations (diagram + reused tooltips)
    components/
      Landing/               # hero, Quick-Start cards, anatomy diagram, how-it-works
      Quiz/                   # guided quiz steps, incl. multi-select injury step
      Loading/                # assembling-shoe loading screen
      Results/                # result cards, refine panel, compare modal
      shared/                 # shoe illustration/stage, glossary tooltip, disclaimer, magnetic button
    App.tsx                # view state machine (landing / quiz / loading / results)
```

To tune scoring or add a shoe/event/injury rule, edit the relevant file in `src/lib/` — components read from these, they don't hardcode logic.

## Design reference

`project/` contains the original Claude Design handoff bundle (`Spikefit.dc.html` + assets) that the `app/` implementation was built from. It's a static prototype, not runnable — kept for design reference only.
