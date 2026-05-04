# Week 5 Lab — Next.js, Supabase, Open-Meteo

Full-stack app for **TECHIN 510**: equipment checkout tracking (interview: Maason / returns pain points), **Open-Meteo** weather with JSON contract asserts, and **GIX events** from Supabase with category filters.

## Stack

- **Next.js 16** (App Router, API routes)
- **Supabase** (PostgreSQL) — tables `equipment_checkouts`, `events`
- **Tailwind CSS**
- External API: [Open-Meteo](https://open-meteo.com/) (no API key)

## Setup

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your Supabase URL + anon key (Project Settings → API)
```

Run SQL in [supabase/schema.sql](supabase/schema.sql) in the Supabase SQL Editor (disable RLS on these tables for the lab, or add permissive policies).

```bash
npm run dev
# http://localhost:3000
```

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Development server (Turbopack) |
| `npm run build`| Production build               |
| `npm run start`| Production server              |
| `npm run lint` | `tsc --noEmit` typecheck       |

## Routes

| Path              | Description                                      |
|-------------------|--------------------------------------------------|
| `/`               | Home — weather strip + links                     |
| `/equipment`      | List / add checkouts, mark returned              |
| `/events`         | Events cards + category filter                   |
| `/api/weather`    | Open-Meteo proxy (`lat`, `lon` query params)     |
| `/api/equipment`  | GET list, POST create                            |
| `/api/equipment/[id]` | PATCH status (e.g. returned)               |
| `/api/events`     | GET list, optional `?category=`                  |

## Deployment (Vercel)

1. Push this repo to GitHub and import the project in [Vercel](https://vercel.com).
2. Add environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (same names as in `.env.local`).
3. Deploy. Confirm the live site loads **without** exposing `.env` in the browser bundle (only `NEXT_PUBLIC_*` are client-visible by design; never paste service role keys).

### Deployment URL (grading)

**Replace with your production URL after deploying:**

`https://YOUR-PROJECT.vercel.app`

## Submission docs

- [docs/SUBMISSION.md](docs/SUBMISSION.md) — Components A–E, D.1 contract table, C.3 decision log, AI log, reflection
- [docs/COMPONENT_A.md](docs/COMPONENT_A.md) — Build mandate + touchpoints (Maason)
- [docs/component-e-testing.md](docs/component-e-testing.md) — Component E asserts + error scenarios
- [docs/architecture.md](docs/architecture.md) — C.2 three-tier + Component E boundary map (Mermaid)

## Schema

See [supabase/schema.sql](supabase/schema.sql) for `equipment_checkouts` and `events` definitions and sample seed rows.
