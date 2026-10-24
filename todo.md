# Style guide — todo

What’s done, what’s left, and suggested order of work.

## Already in place

- [x] Canonical Kiewit / Rook theme in this package (`css/rook/`)
- [x] Rook sync on `npm install` (`file:../style-guide` → `src/lib/`)
- [x] Vite catalog (`npm run dev`): themes, colors, typography, buttons, model card, risk bands
- [x] Workflow docs (new project, contribute back)
- [x] Portable entry `variables.css` for React / Vite

Enough to use day to day with Rook + `app/`.

---

## High priority (make it “real” for the team)

- [x] **Git remote** — [github.com/kaleoyster/style-guide](https://github.com/kaleoyster/style-guide)
- [ ] **Template repository** — Enable on GitHub: Settings → Template repository ([docs/github-template.md](docs/github-template.md))
- [ ] **Distribution beyond `file:..`** — Private npm, GitHub Packages, or `github:org/style-guide#v0.1.0` for machines without sibling folders
- [ ] **Versioning** — Tag releases (e.g. `v0.1.0`) when tokens change; Rook/apps bump the dependency intentionally
- [ ] **Token hygiene** — Single source of truth: generate `tokens/colors.json` from `kiewit-tokens.css` or document “edit tokens CSS first” so JSON doesn’t drift
- [ ] **Catalog ↔ docs** — Link catalog sections to `docs/components/*.md`; add specs as UI is promoted from Rook (chips, tables, forms, etc.)

---

## Medium priority (Observable + Vite consistency)

- [ ] **Optional style layers** — Decide global (theme) vs app-specific (dashboard); move reusable bits into `style-guide`; document optional imports in [docs/theme-rook.md](docs/theme-rook.md)
- [ ] **`css/components.css`** (or per-component files) — Class-based `.sg-*` on tokens so Observable HTML and React share markup without full Observable theme in Vite
- [ ] **Deploy the catalog** — Static host for `app` build (GitHub Pages / internal URL) for non-developers
- [ ] **Rename / scope package** — e.g. `@kiewit/style-guide` to avoid npm name clashes

---

## Lower priority (polish)

- [ ] **CI** — `npm run build:app` on PR; optional lint
- [ ] **Changelog / migration notes** when renaming CSS variables
- [ ] **Visual checks** — Screenshots or Playwright on catalog when theme changes
- [ ] **Retire or redirect `demo/index.html`** — Point README at `npm run dev` as the one gallery
- [ ] **`ModelCard` shared CSS** — Extract from React module when a second app needs the same look in plain HTML

---

## Suggested order

| Step | Task |
| ---- | ---- |
| 1 | Push repo + enable GitHub template |
| 2 | Tag `v0.1.0` + document install for new Vite apps |
| 3 | Promote 1–2 Rook patterns (e.g. chips, card variants) → docs + catalog |
| 4 | Deploy catalog statically |
| 5 | Optional `components.css` + slimmer Vite import path |

---

## README roadmap (mirror)

- [x] Rook / Kiewit theme in `css/rook/`
- [x] Primary / brand tokens (CSS + JSON)
- [x] Markdown: colors, model card
- [x] HTML demo
- [ ] Publish to npm (private or public)
- [x] Vite + React starter / catalog in `app/`
- [ ] Enable **Template repository** on GitHub
