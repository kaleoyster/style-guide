# Style guide

**Repository:** [github.com/kaleoyster/style-guide](https://github.com/kaleoyster/style-guide)

Shared **design tokens** (CSS variables), **JSON tokens**, and **markdown** documentation. The **Rook / Kiewit** theme (`css/rook/`) is the canonical brand source; the Rook Observable app syncs it on `npm install` (see [docs/theme-rook.md](docs/theme-rook.md)).

## Contents

- `css/rook/` — Kiewit theme (Observable + tokens)
- `css/variables.css` — portable tokens for Vite/React (`--color-primary` → Kiewit yellow)
- `tokens/colors.json` — brand palette for tooling
- `docs/` — color and component specs
- `demo/index.html` — static preview (open in a browser)
- `app/` — Vite + React starter (imports this package via workspaces)

## Local preview

```bash
open demo/index.html
```

Or serve the repo root (e.g. `npx serve .`) and open `/demo/`.

### Style guide catalog (Vite + React)

```bash
npm install
npm run dev
```

Opens a **catalog** page: themes, colors, typography, buttons, model card, risk bands. See [app/README.md](app/README.md).

## Use in a project

### npm link (while developing this repo)

```bash
cd /path/to/style-guide
npm link

cd /path/to/your-app
npm link style-guide
```

### Install (after publish)

```bash
npm install style-guide
```

### CSS

```css
@import "style-guide/variables.css";
```

```ts
// Vite / React entry
import "style-guide/variables.css";
```

### Docs

Read `docs/colors.md`, [docs/theme-rook.md](docs/theme-rook.md), and `docs/components/model-card.md`.

## Roadmap

- [x] Rook / Kiewit theme in `css/rook/`
- [x] Primary / brand tokens (CSS + JSON)
- [x] Markdown: colors, model card
- [x] HTML demo
- [ ] Publish to npm (private or public)
- [x] Vite + React starter in `app/` (`ModelCard` example)
- [ ] Enable **Template repository** on GitHub ([guide](docs/github-template.md))

## Package exports

| Import | File |
| ------ | ---- |
| `style-guide/variables.css` | `css/variables.css` (Vite/React) |
| `style-guide/rook-observable.css` | Full Observable theme bundle |
| `style-guide/rook/kiewit-theme.css` | Dark theme + components |
| `style-guide/tokens/colors.json` | `tokens/colors.json` |

Edit tokens in `css/rook/kiewit-tokens.css`; keep portable alias names in `variables.css` stable.

## Workflow

This repo is the **central home** for design tokens, shared CSS, component specs, and the demo.

| Step | What to do |
| ---- | ---------- |
| **New project** | **Clone/template** this repo and add your app folders, **or** create a separate repo and **import** `style-guide` (`file:../style-guide`, `npm link`, git dependency, or npm after publish). |
| **Build UI** | Use tokens and docs from here; build framework components in the app (Vite/React, Observable HTML, etc.). |
| **Promote upstream** | When a component is reusable, open a PR here with shared CSS, `docs/components/*.md`, and a demo snippet. |

Full details: [docs/workflow.md](docs/workflow.md) · PR checklist: [docs/contributing-components.md](docs/contributing-components.md) · GitHub template: [docs/github-template.md](docs/github-template.md) · Backlog: [todo.md](todo.md)

```bash
# Example: separate Vite app consuming a local clone
# my-vite-app/package.json → "style-guide": "file:../style-guide"
import "style-guide/variables.css";
```
