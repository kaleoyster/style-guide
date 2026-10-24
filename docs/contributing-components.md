# Contributing components from an app

Use this when moving UI from an application repo into **style-guide**.

## What belongs here

| Include | Keep in the app |
| ------- | ---------------- |
| CSS variables and shared classes | Business logic, data fetching |
| Markdown specs and HTML examples | Framework components (unless you add a separate `ui-react` package later) |
| Demo snippets | Routes, env config, tests for app behavior |

## Steps

1. Open or create `docs/components/<component-name>.md` (props, anatomy, accessibility notes).
2. Add or extend shared CSS under `css/` using `var(--*)` tokens.
3. Add a minimal example to `demo/index.html`.
4. If the file is imported by consumers, add an entry to `package.json` → `exports`.
5. Open a pull request; link the app PR or issue where the component was first built.

## PR description template

```markdown
## Component
Name: 

## Origin
App/repo: 

## Changes
- [ ] docs/components/...
- [ ] css/...
- [ ] demo/index.html
- [ ] package exports (if needed)

## Screenshots
(optional)
```
