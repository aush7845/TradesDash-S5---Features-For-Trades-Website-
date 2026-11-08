# TradesDash: Group 3, Student 5 (Frontend, Week 1)

Screens: **Features** (`/features`) and **For Trades** (`/for-trades`) from the Marketing Website module.

Stack: React 18, React Router, Tailwind CSS v4, lucide-react. Palette is in `src/index.css` (handout section 7.3).

## Run
```
npm install
npm run dev
```
Open http://localhost:5173/#/features

## Routes
| Route | Screen | Owner |
|---|---|---|
| `/features` | Features | G3-S5 |
| `/for-trades` | For Trades | G3-S5 |

Homepage and Pricing belong to G3-S4. The Start Free Trial buttons have no link yet; connect them after merge.

## Quick view (no dev server)
```
npm run build
```
Then double-click `dist/index.html`. It is one standalone file and opens directly in the browser.
Do not open the root `index.html`: that is the source file and needs `npm run dev`.

---

# Backend (Node + Express + MongoDB)

Folder: `server/`. The Features and For Trades pages now load their content from MongoDB through the API, and the "Start your free trial" form at the bottom of each page saves leads to MongoDB.

## Run (2 terminals)

1. Make sure MongoDB is running locally, **or** create a free cluster on MongoDB Atlas and copy its connection string.
2. Backend:
```
cd server
npm install
cp .env.example .env      # Windows: copy .env.example .env   (then edit MONGODB_URI and ADMIN_API_KEY)
npm run seed              # fills the database with the Features + Trades content
npm run dev               # API on http://localhost:5000
```
3. Frontend (from the project folder, not `server/`):
```
npm install
npm run dev               # http://localhost:5173/#/features
```
In dev, Vite forwards `/api/*` to port 5000, so no extra frontend config is needed.

## Database collections

| Collection | What it holds |
|---|---|
| `features` | Features page content (slug, icon, name, title, text, points, shot, order, published) |
| `trades` | For Trades page content (slug, icon, name, tagline, problems, solutions, order, published) |
| `leads` | Free trial signups (name, email (unique), trade, source, status: new / contacted / converted) |

`icon` is a lucide icon **name** (e.g. `"Mic"`). If you add a new one, also add it in `src/lib/icons.js`.
`shot` picks the mock screenshot on the Features page: `voice`, `invoice`, `whatsapp` or `certificate`.

## API

Public:

| Method | URL | |
|---|---|---|
| GET | `/api/health` | server + DB status |
| GET | `/api/features` , `/api/features/:slug` | published features, sorted by `order` |
| GET | `/api/trades` , `/api/trades/:slug` | published trades |
| POST | `/api/leads` | body `{ "email": "...", "name": "...", "trade": "..." }` (email required, 10 requests / 15 min per IP) |

Admin: send the header `x-api-key: <ADMIN_API_KEY from .env>`:

| Method | URL | |
|---|---|---|
| POST | `/api/features` , `/api/trades` | create |
| PUT | `/api/features/:slug` , `/api/trades/:slug` | update (send only the fields to change; `"published": false` hides it) |
| DELETE | `/api/features/:slug` , `/api/trades/:slug` | delete |
| GET | `/api/leads?status=new&page=1&limit=20` | list signups |
| PATCH | `/api/leads/:id` | body `{ "status": "contacted" }` |
| DELETE | `/api/leads/:id` | delete |

Example:
```
curl http://localhost:5000/api/leads -H "x-api-key: YOUR_KEY"
```

## Seed

`npm run seed` only adds missing items (it never overwrites edits). `npm run seed:reset` wipes features + trades and re-adds the originals.

## Deploying

- Set `CLIENT_ORIGIN` in the backend env to your website URL (comma separate several).
- Build the frontend with `VITE_API_URL=https://your-api-url npm run build`.
- If you open `dist/index.html` by double-click (file://), the browser sends origin `null`: add `null` to `CLIENT_ORIGIN` for local testing only, and run the build with `VITE_API_URL=http://localhost:5000`.
- Never commit `server/.env`. It is already ignored by `.gitignore`.
