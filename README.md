# SecureGov — Demo Site

Public demo landing page for **SecureGov** by CyberHealth: AI-powered governance
automation for policies, risks, controls and evidence, for businesses operating in
Europe. All product data shown on the site is fictional.

## Stack

```
securegov-demo-site/
  backend/   FastAPI + Motor (async MongoDB) + Pydantic v2
  frontend/  Vite + React 19 + TypeScript + Tailwind v4
  tests/     Playwright end-to-end workspace
  render.yaml  Render Blueprint (API + static site)
```

The frontend always calls relative `/api/*` paths. In development Vite proxies them
to the backend on port 8001; on Render the static site rewrites them to the API
service (see `render.yaml`).

## Run locally

Requirements: Python 3.12, Node 22+ and (optionally) MongoDB on `localhost:27017`.

**Backend**

```bash
cd backend
python -m venv .venv
.venv/Scripts/activate        # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
```

Create `backend/.env`:

```
MONGO_URL=mongodb://localhost:27017
DB_NAME=securegov
CORS_ORIGINS=*
```

```bash
uvicorn server:app --host 127.0.0.1 --port 8001 --reload
```

**Frontend**

```bash
cd frontend
npm install
npm run dev                   # http://localhost:3000
```

Without MongoDB the site still runs; only the demo-request and "talk to a person"
forms fail to save.

## API

| Method | Path                    | Purpose                                  |
| ------ | ----------------------- | ---------------------------------------- |
| GET    | `/api/`                 | Health check                             |
| POST   | `/api/demo-requests`    | "Book a live demo" form                  |
| GET    | `/api/demo-requests`    | List demo requests                       |
| POST   | `/api/support-messages` | Support chat "talk to a person" form     |
| GET    | `/api/support-messages` | List support messages                    |

## Deploy (Render)

1. Create a free MongoDB Atlas cluster, a database user, and allow access from
   `0.0.0.0/0`. Copy the connection string.
2. In Render: **New → Blueprint**, pick this repository, and paste the connection
   string as `MONGO_URL` when prompted.
3. If Render gives the API a URL other than `https://securegov-api.onrender.com`,
   update the `/api/*` rewrite destination in `render.yaml`.

Every push to `main` redeploys both services.

## Editing content

Most copy — modules, features, use cases, security points, pricing, roadmap and
the support chat FAQs — lives in `frontend/src/content.ts`. The overview video and
poster are in `frontend/public/video/`.
