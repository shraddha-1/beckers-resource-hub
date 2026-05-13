# Becker's Resource Hub

A content asset portal built for the Becker's Healthcare UX Engineer take-home. Browse, filter, and register for webinars, whitepapers, and podcasts curated for health system executives.

---

## Running locally

You need **two terminal windows** running at the same time.

### Step 1 — Install and start the backend

```bash
npm install
npm run dev
```

You should see:

```
[assetService] Loaded 10 assets and 10 signups from stub data
Server listening on port 3000
```

Keep this terminal open.

### Step 2 — Install and start the frontend

Open a second terminal window in the same folder.

```bash
cd client
npm install
npm run dev
```

You should see:

```
➜  Local:   http://localhost:5173/
```

### Step 3 — Open the app

Go to **http://localhost:5173** in your browser.

> If you see a blank page or data is not loading, make sure the backend terminal from Step 1 is still running.

---

## Requirements

- Node.js v18 or higher
- npm v9 or higher

Check your versions:

```bash
node --version
npm --version
```

Download Node.js at https://nodejs.org if needed.

---

## Pages

| Page | URL | What it does |
|------|-----|--------------|
| Homepage | `/` | Featured assets, recently viewed, newsletter |
| Resource library | `/assets` | Browse, filter, search, paginate |
| Asset detail | `/assets/:id` | Full brief, content gate, registration |
| Design decisions | `/decisions` | Documents every design and technical decision |

---

## Project structure

```
├── src/                     # Backend — Express + TypeScript
│   └── data/
│       ├── assets.json      # 10 stub assets
│       └── persons.json     # Known registrants
│
└── client/                  # Frontend — React + Vite
    └── src/
        ├── components/      # Nav, Footer, Badge, ContentGate, etc.
        ├── data/
        │   └── flagship.json  # Demo asset shown on homepage only
        ├── lib/
        │   ├── api.js         # All API calls
        │   ├── assetHelpers.js
        │   ├── recentlyViewed.js
        │   └── unlocks.js
        └── pages/
            ├── Home.jsx
            ├── Listing.jsx
            ├── AssetDetail.jsx
            ├── Signup.jsx
            └── Decisions.jsx
```

---

## API

The backend runs on `http://localhost:3000`. All responses wrap data in `{ data: T }` on success and `{ error: string }` on failure.

### GET /assets
Returns all assets.

```bash
curl http://localhost:3000/assets
```

### GET /assets/:id
Returns a single asset.

```bash
curl http://localhost:3000/assets/5af0e596b3c7e95aaafe42e01222f91666354f9152238bcf443b2c4c4ac46cfa
```

### POST /assets/:id/signup
Registers a person. Idempotent — same person + same asset always returns the same record.

```bash
curl -X POST http://localhost:3000/assets/5af0e596b3c7e95aaafe42e01222f91666354f9152238bcf443b2c4c4ac46cfa/signup \
  -H "Content-Type: application/json" \
  -d '{
    "person": {
      "firstName": "Jane",
      "lastName": "Smith",
      "jobTitle": "CFO",
      "companyName": "Acme Health",
      "email": "jane.smith@acme.com"
    }
  }'
```

Returns `400` with `{ "error": "person is required" }` if the person field is missing.


---

## Key decisions

Full reasoning is on the `/decisions` page. Short version:

- **Rows not cards** on the listing page — matches the information-dense interfaces this audience uses daily
- **Pagination over infinite scroll** — page state lives in the URL so the back button restores position
- **Verb-matched CTAs** — Register, Watch, Download, Listen instead of generic Sign Up
- **Blur-time validation** — each field validates when the user leaves it, not on submit
- **Inline confirmation** — form transforms in place after signup, primary CTA returns user to the asset
- **Content gate before signup** — full editorial brief visible before asking for contact details
- **URL-based filter state** — every filter writes to URL params so back button and sharing work correctly
- **localStorage personalization** — recently viewed (up to 3) and form pre-fill across sessions
- **Vite proxy** — all API calls use `/api/assets`, no CORS config needed on the backend

---

## Accessibility

Built to WCAG 2.1 AA throughout. Highlights:

- Skip to main content link
- `:focus-visible` outlines on all interactive elements
- `aria-live` on result counts and confirmations
- `aria-pressed` on filter chips and sort buttons
- `role="img"` with `aria-label` on all badges
- `role="alert"` on form errors and API errors
- Minimum 44×44px touch targets on all buttons
- All color combinations pass AA contrast (most pass AAA)

Full contrast audit with ratios is on the `/decisions` page.