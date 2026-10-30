# NBI Rook theme (Observable + Vite)

The **canonical** light/dark theme from [nbi-rook](https://github.com/kaleoyster/nbi-rook) lives in `css/nbi/`. It uses `--nbi-*` and `--viz-*` tokens, semantic good/fair/poor roles, and `.nbi-*` layout patterns for dashboards, tools, and the visualization palette page.

## Files

| File | Use |
| ---- | --- |
| `css/nbi/nbi-theme.css` | Full theme: tokens, Observable chrome, all `.nbi-*` components |
| `css/nbi/token-aliases.css` | Maps legacy `--brand-*` / `--kw-*` → NBI (after `nbi-theme.css`) |
| `css/nbi/nbi-utilities.css` | Catalog helpers: `.btn-*`, `.card`, status classes |
| `css/nbi-observable.css` | Single import for Observable (`./lib/nbi-theme.css` sync target) |
| `js/nbi/theme-toggle.js` | `data-nbi-theme`, storage key `nbi-rook-theme`, `themeInitScript` |
| `js/nbi/palette.js` | Plot scales: foundation ramps, categorical/sequential sets, textures |

Legacy split Rook theme (`css/rook/`, `data-sg-theme`) remains for older apps — see [theme-rook.md](theme-rook.md).

## Observable (nbi-rook)

Sync `nbi-theme.css`, `palette.js`, and `theme-toggle.js` into `src/lib/`, then in `observablehq.config.js`:

```js
import {themeInitScript} from "./lib/theme-toggle.js";

head: [
  `<script>${themeInitScript}</script>`,
  '<link rel="stylesheet" href="./lib/nbi-theme.css">',
].join(""),
```

Light mode: `html[data-nbi-theme="light"]` (default dark). The floating `.nbi-theme-switch` button is injected by `themeInitScript`.

## Vite / React

```ts
import "style-guide/css/nbi/nbi-theme.css";
import "style-guide/variables.css";
import "style-guide/css/nbi/token-aliases.css";
import "style-guide/css/nbi/nbi-utilities.css";
import { applyStoredTheme } from "./lib/theme"; // match nbi-rook storage key
applyStoredTheme();
```

Use `var(--nbi-yellow)`, `var(--viz-good)`, or legacy `var(--brand-yellow)` after aliases.

## Editing the theme

1. Change tokens and components in **`css/nbi/nbi-theme.css`** (source of truth).
2. Adjust **`js/nbi/palette.js`** when chart scales change.
3. Run the Vite catalog (`npm run dev`) to preview every `.nbi-*` pattern.
4. Copy updated files into nbi-rook `src/lib/` (or add a sync script mirroring Rook’s style-guide pull).

## Light vs dark

| Role | Dark | Light |
| ---- | ---- | ----- |
| Page | `--nbi-paper` near-black | Warm cream `#f4f0e3` |
| Cards / charts | `--nbi-white` elevated gray | Warm white `#fffdf6` |
| Good | Brand yellow `#ffd200` | Same |
| Poor | Warm white endpoint | Black endpoint (`--viz-neutral-100`) |

Semantic meaning stays fixed when the theme changes; only the neutral endpoint inverts.
