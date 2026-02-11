# Orders API

Serverless function that appends customer orders to `data/store-data.json` in your GitHub repo. Used so the Admin Dashboard shows orders from **any device or browser**.

## Deploy (Vercel)

1. Connect this repo to [Vercel](https://vercel.com).
2. In **Project → Settings → Environment Variables**, add:

| Variable         | Description |
|------------------|-------------|
| `GITHUB_TOKEN`   | GitHub Personal Access Token with `repo` scope |
| `GITHUB_OWNER`   | GitHub username or organization |
| `GITHUB_REPO`    | Repository name (e.g. `tist`) |
| `GITHUB_BRANCH`  | Optional; default `main` |

3. Deploy. The Orders API URL will be `https://<your-project>.vercel.app/api/orders`.

## Configure the store

In **Admin Dashboard → GitHub Sync**, set **Orders API URL** to the URL above and save. Sync to GitHub so the live site has this URL; then customer orders will be sent to the API and written to `data/store-data.json`.

## Endpoint

- **POST /api/orders** — Body: JSON order `{ fullName, phone, city, notes?, items, total, date }`. Responds `200 { ok: true, id }` on success. CORS allows any origin.

## Security

- The token is used only on the server (env). Do not expose it in the frontend.
- The API does not require customer authentication; it accepts POST from your storefront only.
