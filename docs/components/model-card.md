# Model card

A compact summary of a model: identity, short description, and primary action. Documented here first; implement in React (or another framework) using the shared CSS variables.

## Anatomy

1. **Title** — model name (`--font-family-sans`, semibold)
2. **Description** — one or two lines of supporting text
3. **Meta** (optional) — tags, version, or provider
4. **Action** (optional) — link or button using `--color-primary`

## Layout

- Padding: `--space-4`
- Gap between blocks: `--space-3`
- Corner radius: `--radius-md`
- Border or shadow: `--shadow-sm` on a white or `--color-primary-50` background

## Example (HTML + tokens only)

```html
<link rel="stylesheet" href="../css/variables.css" />

<article
  class="model-card"
  style="
    font-family: var(--font-family-sans);
    padding: var(--space-4);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    max-width: 20rem;
  "
>
  <h2 style="margin: 0 0 var(--space-2); font-size: 1.125rem">Example model</h2>
  <p style="margin: 0 0 var(--space-3); color: #475569; line-height: var(--line-height-base)">
    Short description of what this model does.
  </p>
  <a
    href="#"
    style="color: var(--color-primary); font-weight: 600; text-decoration: none"
    >Open application</a
  >
</article>
```

## React

Reference implementation: `app/src/components/ModelCard.tsx` (app workspace; promote shared CSS here when stable).

- Props: `title`, `description`, optional `meta`, `actionHref` / `onAction`, `actionLabel`
- Styles: CSS modules using `var(--color-primary)` etc., not hard-coded brand hex
- When reused across apps, extract classes to `css/components.css` in this package and document them above
