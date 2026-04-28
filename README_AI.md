# Project Context

## Goal
Ragnarok Design Labs marketing site for a diagnostic studio.
The site presents Ragnarok's audit-first positioning, service funnel, pricing, cases, and contact flow.

## Tech
Static HTML, CSS, and vanilla JS.
Pages are generated from `build-site.mjs`.

## Structure
- `build-site.mjs` = source generator for all pages and shared styling
- `index.html` = generated homepage
- `audit/index.html` = main conversion page
- `sprint/index.html` = sprint offer page
- `build/index.html` = enterprise / build page
- `cases/index.html` = investigation reports page
- `contact/index.html` = request form page
- `principles/index.html` = principles page
- `assets/styles.css` = generated shared styling
- `assets/favicon.svg` = favicon

## Current State
- Multi-page static site is live locally via `http://localhost:4173/`
- Copy and structure were updated to match `Ragnarok_Master_Playbook_v2 (1).docx`
- Audit and Sprint pricing sections use stacked dark cards instead of a 3-column row
- Contact form includes updated system-type options, including Automotive
- Footer has a reveal/parallax treatment near the bottom of the page
- Motion v12 is loaded as the only animation library via jsDelivr ESM and is working across all generated pages for lightweight scroll reveal, curve draw, glow drift, and footer reveal animations
- Project lives at `/Users/kristjankaazonen/Documents/Codex/2026-04-28/Ragnarok Design Labs`

## Recent Decisions
- This is the main working project; ignore the older nested scratch workspace unless needed for recovery
- Pricing on Audit is:
  - Snapshot Audit = `EUR 990`
  - Flow Audit = `EUR 2,400`
  - Structural Sprint = `EUR 6,500`
- System Reconstruction should not appear as a normal Audit package card; it routes to `/build`
- Cases should use clear labels such as `ANONYMISED ENGAGEMENT`, `ILLUSTRATIVE CASE`, and `PRIMARY RESEARCH`

## Next Tasks
- Refine footer parallax/reveal behavior in the live browser if needed
- Continue visual polish and mobile QA across pages
- Add any new copy / section changes from future playbook revisions
- Add real image or report assets if the user provides them

## Notes For Next Chat
- If content or layout changes are needed, edit `build-site.mjs` first, then regenerate the site
- After regenerating, verify in the local browser at `http://localhost:4173/`
- If the browser looks stale, hard refresh because cached CSS can hide recent changes
