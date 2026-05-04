# Architecture diagrams

## C.2 — Three-tier (Component B app)

```mermaid
flowchart LR
  subgraph t1 [Tier 1 - Browser]
    P["Next.js pages\n/equipment /events /"]
  end
  subgraph t2 [Tier 2 - Next.js server]
    A["API routes\n/api/equipment /api/events /api/weather"]
  end
  subgraph ext [External API]
    O["Open-Meteo\nJSON forecast"]
  end
  subgraph t3 [Tier 3 - Supabase]
    D[("PostgreSQL\nequipment_checkouts\nevents")]
  end
  P <-->|"HTTPS JSON"| A
  A <-->|"SQL via supabase-js"| D
  A -->|"HTTPS GET JSON"| O
```

**Arrow labels:** Browser ↔ Server: HTTP/JSON. Server ↔ Supabase: PostgREST/SQL. Server → Open-Meteo: HTTPS JSON forecast.

## Component E — Boundary map (Part 1)

| Boundary | Data format | Potential error |
|----------|-------------|-----------------|
| User → React UI | clicks, form fields | Validation typo / double submit |
| UI → `/api/events` | HTTP GET + query string | Wrong category param → empty list |
| API route → Supabase | SQL select | RLS / network timeout |
| Supabase → API | JSON rows | Schema drift (missing column) |
| API → Browser | JSON `{ rows }` | Serialization / large payload |

Optional: export a PNG from [Mermaid Live](https://mermaid.live) into `docs/images/component-e-boundaries.png` for Canvas upload.
