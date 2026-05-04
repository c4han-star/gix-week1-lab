# Component D.1 — Contract verification log (recorded)

Tests target **`GET /api/weather`** (Open-Meteo proxy). Open-Meteo has **no auth**; row 3 uses **invalid longitude** per course alternative to “missing auth.”

Environment: production build, `npx next start -p 3010`, `curl` from same machine (2026-05-04).

## 1 — Valid input

```bash
curl -sS "http://127.0.0.1:3010/api/weather?lat=47.6062&lon=-122.3321" | head -c 400
```

**Result:** HTTP **200**. JSON includes `daily.time` and `daily.temperature_2m_max` arrays (plus Open-Meteo metadata). Server runs `assertOpenMeteoDailyPayload` in `lib/openMeteo.ts` before responding.

## 2 — Invalid latitude

```bash
curl -sS "http://127.0.0.1:3010/api/weather?lat=999&lon=-122"
```

**Result:** HTTP **400**. Body:

```json
{"error":"latitude must be between -90 and 90"}
```

## 3 — Invalid longitude (third invalid scenario)

```bash
curl -sS "http://127.0.0.1:3010/api/weather?lat=47&lon=999"
```

**Result:** HTTP **400**. Body:

```json
{"error":"longitude must be between -180 and 180"}
```

## Optional — Supabase auth-like failure

Use an incorrect `NEXT_PUBLIC_SUPABASE_ANON_KEY` locally: Supabase SDK returns an error on queries (document message in Canvas; **do not commit** wrong keys).

## Automate

Run `./scripts/verify-contract.sh` while `npm run dev` or `npm run start` is listening on port **3000** (edit `BASE` in script if needed).
