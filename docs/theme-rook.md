# Rook theme

The **canonical theme** from the **Rook** Observable Framework project lives in this package under `css/rook/`. Rook syncs these files into `src/lib/` on install so Observable can keep serving them from `./lib/`.

## Files

| File | Use |
| ---- | --- |
| `css/rook/brand-tokens.css` | CSS variables only (dark defaults) |
| `css/rook/brand-theme.css` | Observable dark UI: typography, buttons, layout hooks |
| `css/rook/brand-theme-light.css` | Light mode when `html[data-sg-theme="light"]` |
| `css/rook-observable.css` | Bundle: dark + light theme stylesheets |
| `css/variables.css` | **Vite / React** — tokens + portable `--color-primary*` aliases |
| `js/rook/theme-toggle.js` | Light/dark toggle (`themeInitScript` for Observable `head`) |

## Observable (Rook)

In `observablehq.config.js` (after syncing from this package):

```js
import {themeInitScript} from "./lib/theme-toggle.js";

head: [
  `<script>${themeInitScript}</script>`,
  '<link rel="stylesheet" href="./lib/brand-theme.css">',
  '<link rel="stylesheet" href="./lib/brand-theme-light.css">',
  // …app-specific styles (dashboard, grids, etc.)
].join(""),
```

Light mode: set `data-sg-theme="light"` on `<html>` or use the floating toggle.

## Vite / React

```ts
import "style-guide/variables.css";
import "style-guide/rook/brand-theme-light.css"; // optional, for data-sg-theme light
```

Use `var(--brand-yellow)`, `var(--kw-text)`, or portable `var(--color-primary)`.

## Editing the theme

1. Change tokens in **`css/rook/brand-tokens.css`** (and mirror key values in `tokens/colors.json` if needed).
2. Adjust Observable-only rules in `brand-theme.css` / `brand-theme-light.css`.
3. In Rook: `npm install` (runs theme sync) or `node scripts/sync-style-guide-theme.mjs`.
4. In other apps: bump or reinstall the `style-guide` dependency.

Do not edit copies under `rook/src/lib/brand-theme*.css` by hand—they are overwritten on sync.

## Naming (no vendor-specific tokens in this package)

| Old | New |
| --- | --- |
| `--kiewit-*` | `--brand-*` |
| `data-kiewit-theme` | `data-sg-theme` |
| `kiewit-theme.css` | `brand-theme.css` |
| `.kiewit-header` etc. | `.sg-header` etc. |
