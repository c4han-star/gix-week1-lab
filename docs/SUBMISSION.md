# Lab 5 submission checklist

## Component A

- **Interview:** script, synthesis, touchpoints in [COMPONENT_A.md](COMPONENT_A.md)
- **System map (digital, in repo):** [images/system-map-maason.svg](images/system-map-maason.svg)  
  Add `docs/images/system-map-maason-photo.jpg` only if Canvas requires a hand-drawn scan.

## Component B

- **Tech stack:** Next.js + Supabase — shared persistent data, multi-page UI, deployable to Vercel; fits staff-facing workflows better than a single-user Streamlit session.
- **Schema:** [../supabase/schema.sql](../supabase/schema.sql) — `equipment_checkouts`, `events`
- **Responsive design:** [RESPONSIVE_DESIGN.md](RESPONSIVE_DESIGN.md) — checklist table + fix (table horizontal scroll)
- **Deployment URL:** publish via [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md), then paste the live link into root [README.md](../README.md#deployment-url-grading)

## Component C

### C.2 diagram

- **SVG:** [images/c2-three-tier.svg](images/c2-three-tier.svg)
- **Mermaid source:** [architecture.md](architecture.md)

### C.3 Design decision log

| Field | Entry |
|-------|--------|
| **Decision** | Validate Open-Meteo JSON with **`assertOpenMeteoDailyPayload`** immediately after fetch ([`lib/openMeteo.ts`](../lib/openMeteo.ts)). |
| **Alternatives considered** | Trust JSON without checks; or validate only in the UI. |
| **Why you chose this** | External APIs change — failing fast on the server avoids silent UI bugs and matches Component D contract testing. |
| **Trade-off** | Extra code + throws on unexpected shapes (needs user-facing error handling). |
| **When would you choose differently?** | If the vendor published a stable OpenAPI client we trusted, we might shrink asserts to edge cases only. |

## Component D — D.1 Contract tests (`GET /api/weather`)

**Recorded curl output:** [D1_CONTRACT_VERIFICATION.md](D1_CONTRACT_VERIFICATION.md)  
**Automation:** `npm run verify:contract` → [../scripts/verify-contract.sh](../scripts/verify-contract.sh) (server on port 3000)

Open-Meteo has **no auth**; scenario 3 uses **invalid longitude** as the third invalid case (per manual).

| # | Test case | Input | Expected | Actual | HTTP | Pass/Fail |
|---|-----------|-------|----------|--------|------|-----------|
| 1 | Valid | `lat=47.6062&lon=-122.3321` | 200 + `daily` arrays | 200, JSON with forecast | 200 | Pass |
| 2 | Invalid lat | `lat=999` | 400 + error message | latitude range error | 400 | Pass |
| 3 | Invalid lon | `lon=999` | 400 + error message | longitude range error | 400 | Pass |

**External API asserts:** [`assertOpenMeteoDailyPayload`](../lib/openMeteo.ts)

**Error-handling:** API routes catch range errors → JSON `{ error }`; Supabase missing env → **503** on equipment/events.

## Component E

- **UI:** `/events` — category filter → `/api/events?category=…`
- **Architecture map:** [images/component-e-boundaries.svg](images/component-e-boundaries.svg) + [architecture.md](architecture.md) boundary table
- **Testing:** [component-e-testing.md](component-e-testing.md)

## Grading handoff

- **Deploy:** [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md)
- **Secrets for instructor:** [CANVAS_SECRETS.md](CANVAS_SECRETS.md)

## AI usage log (3 interactions)

| # | Prompt (summary) | Output | AI assumption | Failure mode | What I would change |
|---|------------------|--------|----------------|--------------|---------------------|
| 1 | Scaffold Next + Supabase lab app | Folder layout, API routes | Assumed default ports / env names | Wrong env var names | Specify `NEXT_PUBLIC_SUPABASE_URL` exactly |
| 2 | Generate SQL for equipment + events | `schema.sql` | Assumed UUID ids | Migration mismatch if UUID extension missing | Ask for “vanilla Supabase SQL editor” compatibility |
| 3 | Add contract asserts for weather JSON | `assertOpenMeteoDailyPayload` | Assumed only `temperature_2m_max` needed | More fields required later → assert too strict | Name fields we rely on in UI explicitly |

## Reflection

Moving from Streamlit to Next.js separates UI, route handlers, and the database cleanly, but wiring env vars and build tooling took longer than a single-file Python app. The system map made Maason’s cross-system handoffs visible in a way bullet notes did not—especially mobile touchpoints for chasing returns. Streamlit remains ideal for quick solo analytics demos; Next.js + Supabase fits multi-page staff tools that must stay hosted and consistent for a cohort.
