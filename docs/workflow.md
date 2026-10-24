# Workflow

This repository is the **source of truth** for design tokens, shared CSS, component specs, and the living demo. Application repos (Vite, Observable notebooks, etc.) consume it; reusable work flows back here.

## Roles

| Repo | Holds |
| ---- | ----- |
| **style-guide** (this repo) | Tokens, `variables.css`, shared component CSS, markdown specs, `demo/` |
| **Application projects** | App routes, data, framework-specific wrappers, one-off UI |

## Start a new project

Pick one approach; both can use the same tokens and class names.

### A. Use this repo as the starting tree

Good when the new app is small or you want docs + demo + app in one place at first.

1. Create a new repository from this one (GitHub **Use this template**, or clone and change remote):

   ```bash
   git clone git@github.com:YOUR_ORG/style-guide.git my-new-app
   cd my-new-app
   git remote rename origin style-guide-upstream   # optional: keep upstream for pulls
   git remote add origin git@github.com:YOUR_ORG/my-new-app.git
   ```

2. Use the included **`app/`** Vite + React starter (`npm install && npm run dev` from the repo root), or add other folders (e.g. `notebooks/` for Observable).

3. Import tokens the same way as the demo:

   ```html
   <link rel="stylesheet" href="../css/variables.css" />
   ```

   ```ts
   import "../css/variables.css"; // or "style-guide/variables.css" after publish/link
   ```

4. When the app outgrows the monorepo, split: publish `style-guide` as a package and make the app depend on it (approach B).

### B. New repo that depends on style-guide

Good when the app is separate from the design system long term.

1. Create an empty app repo (Vite, etc.).

2. Pull in this package (choose one):

   **Local sibling (common in development)**

   ```json
   {
     "dependencies": {
       "style-guide": "file:../style-guide"
     }
   }
   ```

   **npm link**

   ```bash
   cd ../style-guide && npm link
   cd ../my-new-app && npm link style-guide
   ```

   **Git dependency** (no registry)

   ```json
   {
     "dependencies": {
       "style-guide": "github:YOUR_ORG/style-guide#main"
     }
   }
   ```

   **Published package** (when ready)

   ```bash
   npm install style-guide
   ```

3. In app entry:

   ```ts
   import "style-guide/variables.css";
   ```

4. Copy patterns from `docs/components/` and `demo/index.html`; implement with your framework using the same CSS variables and (when added) shared classes.

### Observable

1. Host CSS where notebooks can load it: published npm + unpkg/jsdelivr, static hosting, or raw Git URL for a tagged release.
2. In a notebook, load `variables.css` (and later `components.css`) once.
3. Use HTML/Markdown cells with the same class names and `var(--color-primary)` as Vite apps.
4. Notebook-only experiments stay in Observable; stable patterns get documented here and optional shared CSS.

## Develop components in an application

1. **Use tokens first** — no hard-coded hex; use `var(--color-primary)` etc.
2. **Name for reuse** — if it might appear in another app, avoid app-specific copy and routes in the reusable layer.
3. **Mirror the spec** — add or update `docs/components/<name>.md` when the API or anatomy is settled (even before CSS lands here).

Suggested layout in an app:

```text
my-new-app/
  src/
    components/       # React (or other) wrappers
    styles/           # app-only overrides
```

## Bring components back to style-guide

When a component is used in more than one place—or you know it will be—promote it upstream.

1. **Generalize** — strip app routing, API clients, and product-only strings; keep props/slots documented.
2. **Extract styling**
   - Token-only tweaks → update `css/variables.css` / `tokens/colors.json` if global.
   - Shared look → add classes to `css/components.css` (or `css/components/<name>.css`) using existing variables.
3. **Document** — add or update `docs/components/<name>.md` (anatomy, classes, example HTML).
4. **Demo** — show it in `demo/index.html` (or a future gallery page).
5. **Open a PR** to this repo with a short note: which app proved it out, breaking changes, screenshots if visual.

Checklist before merge:

- [ ] Uses design tokens, not one-off colors
- [ ] Markdown spec matches markup/classes
- [ ] Demo updated
- [ ] `package.json` `exports` updated if new files are part of the public surface

Framework-specific code (React props, hooks) can stay in the app repo or a future `packages/ui-react` package that **depends on** this repo—only portable CSS and docs need to live here.

## Staying in sync

| Direction | How |
| --------- | --- |
| style-guide → apps | Bump dependency (`npm update style-guide`), or pull if using `file:` / git URL |
| apps → style-guide | PR with CSS + docs + demo |
| Token renames | Avoid; if unavoidable, document migration in `docs/colors.md` and bump major version when published |

## Summary

```text
                    ┌─────────────────────┐
                    │   style-guide       │
                    │ tokens + CSS + docs │
                    └──────────┬──────────┘
                               │ import / clone
           ┌───────────────────┼───────────────────┐
           ▼                   ▼                   ▼
     Vite / React         Observable           other
           │                   │                   │
           └───────────────────┴───────────────────┘
                               │ PR reusable CSS + docs
                               ▼
                    ┌─────────────────────┐
                    │   style-guide       │
                    └─────────────────────┘
```
