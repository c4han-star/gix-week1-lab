# Lab 5 submission checklist

## Component B

- **Tech stack:** Next.js + Supabase — multiple pages, persistent shared data, deployment path to Vercel; TypeScript matches a staff-facing web workflow better than a single-user Streamlit session.
- **Schema:** See [../supabase/schema.sql](../supabase/schema.sql) — `equipment_checkouts` (checkout/return workflow), `events` (title, category, starts_at, location, …).
- **Responsive design:** Navigation wraps on narrow screens; tables use horizontal scroll (`overflow-x-auto`); buttons use `min-h-[44px]` for touch. **Issue fixed:** table overflow clipped on iPhone width — added horizontal scroll container.
- **Deployment URL:** See root [README.md](../README.md#deployment-url-grading). Replace placeholder with your Vercel URL.

## Component C

### C.2 diagram

Digital version: [architecture.md](architecture.md) (Mermaid). Hand-drawn alternative: add photo under `docs/images/`.

### C.3 Design decision log

| Field | Entry |
|-------|--------|
| **Decision** | Validate Open-Meteo JSON with **`assertOpenMeteoDailyPayload`** immediately after fetch ([`lib/openMeteo.ts`](../lib/openMeteo.ts)). |
| **Alternatives considered** | Trust JSON without checks; or validate only in the UI. |
| **Why you chose this** | External APIs change — failing fast on the server avoids silent UI bugs and matches Component D contract testing. |
| **Trade-off** | Extra code + throws on unexpected shapes (needs user-facing error handling). |
| **When would you choose differently?** | If the vendor published a stable OpenAPI client we trusted, we might shrink asserts to edge cases only. |

## Component D — D.1 Contract tests (Open-Meteo via `/api/weather`)

Open-Meteo does not use auth; scenario 3 uses **third invalid input** per manual (invalid longitude) instead of missing auth.

| # | Test case | Input description | Expected outcome | Actual outcome | Status code | Pass/Fail |
|---|-----------|-------------------|------------------|----------------|-------------|-----------|
| 1 | Valid input | `GET /api/weather?lat=47.6062&lon=-122.3321` | 200, JSON with `daily.temperature_2m_max` array | 200, arrays present after assert | 200 | Pass |
| 2 | Invalid input | `lat=999` (out of range) | Error payload / 400 | Message contains latitude range | 400 | Pass |
| 3 | Third invalid input | `lon=999` (out of range) | Error payload / 400 | Longitude range error | 400 | Pass |

**External API asserts:** [`assertOpenMeteoDailyPayload`](../lib/openMeteo.ts) — validates `daily.time` and `daily.temperature_2m_max` arrays.

**Error-handling note:** UI and API routes wrap fetch in `try/catch`; invalid range returns JSON error instead of crashing the Node process. If Supabase env vars are missing, equipment/events return **503** with a clear message.

### Supabase “wrong key” (optional local check)

If you paste a **wrong** anon key in `.env.local`, Supabase client calls fail with an error from the SDK (treat as auth-like failure for learning purposes). Do not commit keys.

## Component E

- **Working UI:** `/events` with category `<select>` → calls `/api/events?category=…`.
- **Architecture map:** See [architecture.md](architecture.md) boundary table.
- **Testing write-up:** [component-e-testing.md](component-e-testing.md).

## Component A deliverables

Interview notes + system map sketch: add files under `docs/images/` and link here.

- `docs/images/system-map-maason.png` — **(add your scan)**  
- Summary notes: [COMPONENT_A.md](COMPONENT_A.md)

## AI usage log (3 interactions)

| # | Prompt (summary) | Output | AI assumption | Failure mode | What I would change |
|---|------------------|--------|----------------|--------------|---------------------|
| 1 | Scaffold Next + Supabase lab app | Folder layout, API routes | Assumed default ports / env names | Wrong env var names | Specify `NEXT_PUBLIC_SUPABASE_URL` exactly |
| 2 | Generate SQL for equipment + events | `schema.sql` | Assumed UUID ids | Migration mismatch if UUID extension missing | Ask for “vanilla Supabase SQL editor” compatibility |
| 3 | Add contract asserts for weather JSON | `assertOpenMeteoDailyPayload` | Assumed only `temperature_2m_max` needed | More fields required later → assert too strict | Name fields we rely on in UI explicitly |

## Reflection

Moving from Streamlit to Next.js separates UI, route handlers, and the database cleanly, but wiring env vars and build tooling took longer than a single-file Python app. The system map made Maason’s cross-system handoffs visible in a way bullet notes did not—especially mobile touchpoints for chasing returns. Streamlit remains ideal for quick solo analytics demos; Next.js + Supabase fits multi-page staff tools that must stay hosted and consistent for a cohort.
