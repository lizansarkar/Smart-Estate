---
name: frontend-design
description: Frontend design workflow for creating or improving polished, responsive, usable web interfaces in this Next.js project. Use when Codex is asked to design, redesign, beautify, modernize, polish, restyle, improve UX, build frontend screens, create layouts, adjust visual hierarchy, or implement UI components for the smart-estate app.
---

# Frontend Design

## Project Baseline

Work within this app's stack and conventions:

- Next.js 16 app router with React 19.
- Tailwind CSS 4 and existing global styles.
- `lucide-react` for icons.
- Radix/shadcn-style component patterns when present.
- Real estate domain UI: property browsing, listing management, admin workflows, map/gallery/details surfaces, lead/contact flows.

Before changing app code, read the relevant guide in `node_modules/next/dist/docs/` because this Next.js version may differ from common assumptions.

## Workflow

1. Inspect the existing route, component, and style patterns before designing.
2. Identify the primary user job for the screen and make that workflow visible immediately.
3. Reuse local components, tokens, spacing, and interaction patterns before adding new abstractions.
4. Build the actual usable interface first, not a marketing placeholder.
5. Prefer dense, scannable layouts for operational/admin surfaces; use richer imagery and larger presentation only for public property discovery or listing detail views.
6. Verify responsive behavior at mobile and desktop widths, especially text wrapping, image cropping, controls, and sticky/fixed UI.
7. Run the relevant lint/build/check command when practical and report anything that could not be verified.

## Visual Direction

Design for a premium but practical real estate product:

- Use real property imagery, maps, floor plans, galleries, or meaningful data visuals when the screen benefits from media.
- Keep cards to individual repeated items, modals, and framed tools. Avoid nesting cards.
- Use page sections as full-width bands or unframed constrained layouts.
- Keep border radii restrained; use 8px or less unless an existing component requires otherwise.
- Avoid one-note palettes. Balance neutrals with measured accents and status colors.
- Do not use decorative gradient orbs, bokeh blobs, or generic abstract SVG hero art.
- Do not make a landing page when the user asked for an app, tool, dashboard, or workflow.

## Interaction Patterns

- Use lucide icons for common icon buttons and pair unfamiliar icons with accessible labels or tooltips.
- Use segmented controls for modes, tabs for views, toggles or checkboxes for binary options, sliders/steppers/inputs for numeric values, menus for option sets, and swatches for colors.
- Make repeated workflows efficient: filters, sort controls, search, empty states, loading states, error states, and clear next actions.
- Ensure focus states, keyboard reachability, and meaningful alt text for important imagery.
- Keep dynamic content from causing layout shift by using stable dimensions, aspect ratios, grid tracks, and min/max constraints.

## Text And Layout Rules

- Keep visible copy task-focused; do not explain the UI's design choices or keyboard shortcuts in the app.
- Reserve hero-scale type for true heroes. Use tighter headings inside cards, panels, sidebars, dashboards, and forms.
- Do not scale font sizes with viewport width.
- Use normal letter spacing unless matching an existing token.
- Make button and card text fit on all target viewports; wrap or resize within reason rather than allowing overlap.
- Check that overlays, sticky headers, dialogs, galleries, and map controls do not cover important content.

## Implementation Notes

- Prefer local data shapes and existing helpers over invented mock schemas.
- Use `next/image` or the project's established media component when working with real images.
- Use `clsx`, `tailwind-merge`, and class variance patterns only if the project already uses them in nearby code.
- Add comments only where a non-obvious interaction or layout constraint needs explanation.
- Keep changes scoped to the requested screen or shared component behavior needed by that screen.

## Final Verification

Before finishing, review:

- Desktop and mobile layout.
- Empty, loading, error, and long-content states when relevant.
- Images, icons, and interactive controls.
- Accessibility basics: labels, focus, contrast, semantic controls.
- Lint/build output, or the reason validation could not run.
