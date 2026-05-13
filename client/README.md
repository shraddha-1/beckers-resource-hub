# Becker's Resource Hub — Design & Development Decisions

## What this is

A content asset portal built on top of Becker's Healthcare's design system.
Visitors can browse, filter, and register for webinars, whitepapers, and
podcasts curated for hospital and health system executives.

## How to run

Terminal 1 — start the backend:
```bash
cd asset-lead-gen-interview-take-home-main
npm run dev
# Backend runs on http://localhost:3000
```

Terminal 2 — start the frontend:
```bash
cd asset-lead-gen-interview-take-home-main/client
npm run dev
# Frontend runs on http://localhost:5173
```

---

## Brand decisions

### Name — "Becker's Resource Hub"

Follows their exact naming convention across all properties:
Becker's Hospital Review, Becker's Clinical Leadership,
Becker's Dental + DSO Review. Descriptive, institutional,
no invented words. "Resource Hub" communicates the product's
purpose immediately to a time-poor executive audience.

### Logo treatment — Fira Sans uppercase

Looking at their actual sites, the product name is always
in bold Fira Sans, not Noto Serif. The serif is reserved
for article headlines and editorial content. The logo uses:

- "BECKER'S ——" in 9px uppercase gray Fira Sans
- A horizontal rule — their exact wordmark pattern
- "RESOURCE HUB" in 20px bold uppercase red Fira Sans

### Color usage — strictly their palette

Their system has three color families: navy, red, ice/gray.
We used no invented colors. Every color references a design
system variable from `colors_and_type.css`.

---

## Navigation decisions

### Two-row navigation

Mirrors their exact site pattern:
- Top row: site switcher + Subscribe CTA
- Bottom row: logo + primary nav (sticky)

The site switcher lists all Becker's properties with
Resource Hub as the first, active item. This establishes
the product as a Becker's sub-brand immediately.

### Subscribe as the primary CTA — not Browse Library

Becker's business model is newsletter subscriptions and
lead generation. Subscribe appears in three places:

1. Top utility bar — always visible, red pill button
2. Hero section — ghost button secondary CTA
3. Full newsletter section at page bottom

Browse Library is secondary. Converting a visitor to a
subscriber is more valuable to the business than a
one-time content download.

### Resources dropdown replaces Browse Library button

"Resources" in the nav and "Browse Library" as a separate
button pointed to the same page. That's redundant and
creates visual noise. The Resources dropdown contains
all four content types plus All Resources — one entry
point, clear hierarchy.

---

## Listing page decisions

### Horizontal rows, not cards

Target audience is C-suite executives — CFOs, CIOs, CEOs.
They read Bloomberg terminals, Epic dashboards, and
financial reports daily. They are comfortable with
information-dense interfaces and scan horizontally.

Card grids with large padding feel consumer-grade for
this audience. Rows let them read more assets per screen
and find what they need faster.

### "Load more" pagination — not infinite scroll

The API returns all 10 assets in a single response.
We show 5 at a time with a "Load more (X remaining)"
button. Here is why we chose this over infinite scroll:

**Why not infinite scroll:**
- Infinite scroll removes the user's sense of position
  in the list. They cannot tell how much content exists
  or where they are in it.
- For a 10-item list, infinite scroll provides zero
  benefit and adds implementation complexity.
- Healthcare executives are goal-oriented browsers,
  not passive content consumers. They want to see the
  full scope of available content before committing.

**Why load more works here:**
- The count "Load more (5 remaining)" tells the user
  exactly how much content exists before they click.
- It preserves scroll position — the user stays where
  they are, new content appears below.
- It is a single line of state: `page` increments by 1,
  `paginated = filtered.slice(0, page * PAGE_SIZE)`.
- When filters change, page resets to 1 automatically
  so the user always sees the most relevant results
  at the top.

**How it works with filters:**