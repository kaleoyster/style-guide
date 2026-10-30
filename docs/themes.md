# Theme catalog

All **named appearances** shipped or referenced by this package. The Vite catalog (`npm run dev`) reads the same registry as code: [`js/themes/catalog.js`](../js/themes/catalog.js) and [`tokens/themes.json`](../tokens/themes.json).

## Named presets (selectable)

| Label | ID | Family | Mode | HTML hook | localStorage |
| ----- | -- | ------ | ---- | --------- | ------------ |
| NBI Rook · Dark | `nbi-rook-dark` | NBI Rook | dark | `data-nbi-theme="dark"` | `nbi-rook-theme` |
| NBI Rook · Light | `nbi-rook-light` | NBI Rook | light | `data-nbi-theme="light"` | `nbi-rook-theme` |
| Rook Legacy · Dark | `rook-legacy-dark` | Rook Legacy | dark | *(no `data-sg-theme`)* | `sw-sg-theme` |
| Rook Legacy · Light | `rook-legacy-light` | Rook Legacy | light | `data-sg-theme="light"` | `sw-sg-theme` |

The catalog app also persists the full preset id under **`sg-theme-preset`** so family + mode restore together.

## Families

### NBI Rook (`nbi-rook`) — canonical

- CSS: [`css/nbi/`](../css/nbi/), bundle [`nbi-observable.css`](../css/nbi-observable.css)
- Toggle: `.nbi-theme-switch`, [`js/nbi/theme-toggle.js`](../js/nbi/theme-toggle.js)
- Details: [theme-nbi.md](theme-nbi.md)

### Rook Legacy (`rook-legacy`) — legacy

- CSS: [`css/rook/`](../css/rook/), bundle [`rook-observable.css`](../css/rook-observable.css)
- Toggle: `.kw-theme-toggle`, [`js/rook/theme-toggle.js`](../js/rook/theme-toggle.js)
- Details: [theme-rook.md](theme-rook.md)
- Older storage alias: `sw-kiewit-theme`

## Platform reference

**Observable · Air** (`observable-air`) — set `theme: "air"` in `observablehq.config.js`. Not defined in this repo; NBI/Rook CSS layers on top of Framework chrome.

## Adding a new theme

1. Add a row to `themeFamilies` (if new family) and `themePresets` in `js/themes/catalog.js`.
2. Mirror preset ids in `tokens/themes.json`.
3. Wire CSS entrypoints and toggle script; document in `docs/theme-*.md`.
4. Preview in the catalog — the **Named theme** control loads presets from the registry.
