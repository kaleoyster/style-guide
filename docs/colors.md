# Colors

Brand colors come from the **Rook / Kiewit** theme (`css/rook/kiewit-tokens.css`). Portable aliases live in `css/variables.css`; JSON summary in `tokens/colors.json`.

See [theme-rook.md](./theme-rook.md) for Observable vs Vite imports.

## Brand

| Name | CSS variable | Hex |
| ---- | ------------ | --- |
| Kiewit yellow | `--kiewit-yellow` | `#ffd200` |
| Black | `--kiewit-black` | `#1a1a1a` |
| White | `--kiewit-white` | `#ffffff` |
| Dark gray | `--kiewit-dark-gray` | `#2c2c2c` |

## Portable aliases (React / shared components)

| Token | CSS variable | Maps to |
| ----- | ------------ | ------- |
| Primary | `--color-primary` | `--kiewit-yellow` |
| Primary hover | `--color-primary-hover` | `#fbbf24` |
| Primary on-color | `--color-primary-fg` | `--kiewit-black` |
| Page text | `--color-text` | `--kw-text` |
| Muted text | `--color-text-muted` | `--kw-text-muted` |
| Link | `--color-link` | `--kw-link` |

## Usage

```css
@import "style-guide/variables.css";

.cta {
  background: var(--color-primary);
  color: var(--color-primary-fg);
}

.cta:hover {
  background: var(--color-primary-hover);
}
```

```ts
// Vite / React entry
import "style-guide/variables.css";
```

For charts, risk bands, and Observable `--theme-*` variables, use the names in `kiewit-tokens.css` directly.
