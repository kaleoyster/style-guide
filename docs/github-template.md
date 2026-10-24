# GitHub template repository

Use this repo as a **template** so each new project starts with tokens, docs, demo, and the `app/` starter.

## One-time setup (maintainers)

1. Push this repository to GitHub (`kaleoyster/style-guide` or your chosen name).
2. On GitHub: **Settings** → check **Template repository**.
3. (Optional) Set **Description** to: *Shared design tokens, CSS variables, docs, and Vite/React app starter.*
4. (Optional) Add topics: `design-system`, `style-guide`, `vite`, `react`.

No extra files are required; GitHub only needs the template flag on the repo.

## Create a new project from the template

1. On GitHub: open the template repo → **Use this template** → **Create a new repository**.
2. Name the new repo (e.g. `my-product-app`).
3. Clone your new repo:

   ```bash
   git clone git@github.com:kaleoyster/my-product-app.git
   cd my-product-app
   npm install
   npm run dev
   ```

4. Customize:
   - **Tokens / palette** — `css/variables.css`, `tokens/colors.json`
   - **Specs** — `docs/`
   - **Product UI** — `app/src/`

## Pull token updates from upstream

If you kept the original style-guide as upstream:

```bash
git remote add upstream git@github.com:kaleoyster/style-guide.git
git fetch upstream
git merge upstream/main   # or rebase; resolve conflicts in tokens/docs
```

## Split later

When the app should be its own repo only:

1. Create a new repository for the app.
2. Move `app/` contents (or the whole app workspace).
3. Depend on published `style-guide` or a git URL instead of the workspace:

   ```json
   "style-guide": "github:kaleoyster/style-guide#main"
   ```

See [workflow.md](./workflow.md) for import options and contributing components back.
