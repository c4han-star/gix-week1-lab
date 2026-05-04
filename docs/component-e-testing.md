# Component E — Testing & validation

## Assert statements (events + Supabase pipeline)

Implemented in code (run on every successful GET):

1. **`assertCategoryFilter`** — [`lib/asserts/events.ts`](../lib/asserts/events.ts) — rejects absurdly long category query strings before hitting Supabase.
2. **`assertEventRows`** — same file — after fetch, verifies each row has `id`, `title`, `category`, `starts_at`.

These run in [`app/api/events/route.ts`](../app/api/events/route.ts).

## Three error / failure scenarios (manual tests)

| # | Failure | What we did | Expected | Actual |
|---|---------|-------------|----------|--------|
| 1 | Supabase missing | Stop `NEXT_PUBLIC_SUPABASE_*` in `.env.local` (or use empty values), restart dev server, open `/equipment` or `/events` | UI shows error JSON message / friendly empty state, API returns **503** | **503** `{ "error": "Supabase not configured" }`; pages show alert text |
| 2 | Invalid weather latitude | `GET /api/weather?lat=999&lon=-122` | **400** or range error from server | **400** `{ "error": "latitude must be between -90 and 90" }` (via Open-Meteo fetch guard) |
| 3 | Bad equipment POST | `POST /api/equipment` with `{}` or missing names | **400** validation | **400** `{ "error": "item_name and borrower_name are required" }` |

## Security

- Secrets only in `.env.local` / Vercel dashboard — see `.env.example` for variable names.
- No service role key in the repo; only `NEXT_PUBLIC_*` anon key for client-safe access with RLS off for lab tables (per course troubleshooting).
