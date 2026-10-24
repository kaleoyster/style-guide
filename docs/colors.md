# Colors

Brand colors come from the **Rook** theme (`css/rook/brand-tokens.css`). Portable aliases live in `css/variables.css`; JSON summary in `tokens/colors.json`.

See [theme-rook.md](./theme-rook.md) for Observable vs Vite imports.

## Brand

| Name | CSS variable | Hex |
| ---- | ------------ | --- |
| Brand yellow | `--brand-yellow` | `#ffd200` |
| Black | `--brand-black` | `#1a1a1a` |
| White | `--brand-white` | `#ffffff` |
| Dark gray | `--brand-dark-gray` | `#2c2c2c` |

## Portable aliases (React / shared components)

| Token | CSS variable | Maps to |
| ----- | ------------ | ------- |
| Primary | `--color-primary` | `--brand-yellow` |
| Primary hover | `--color-primary-hover` | `#fbbf24` |
| Primary on-color | `--color-primary-fg` | `--brand-black` |
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

For charts, risk bands, and Observable `--theme-*` variables, use the names in `brand-tokens.css` directly.
