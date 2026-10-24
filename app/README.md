# Application starter (`app/`)

Vite + React **style guide catalog** — previews tokens, light/dark theme, and shared components. Consumes the root **`style-guide`** package via npm workspaces.

## Run

From the repository root:

```bash
npm install
npm run dev
```

Or from this folder:

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm run build
```

## New projects from the template

After you **Use this template** on GitHub (see [docs/github-template.md](../docs/github-template.md)):

1. Rename the repo and update remotes as needed.
2. Keep developing tokens in the root package; build product UI under `app/` or add more workspaces later.
3. Promote reusable CSS and docs to the root; keep app-only code here.
