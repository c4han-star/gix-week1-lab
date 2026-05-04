"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const CATEGORIES = [
  { value: "all", label: "All categories" },
  { value: "career", label: "Career" },
  { value: "workshop", label: "Workshop" },
  { value: "guest_lecture", label: "Guest lecture" },
  { value: "social", label: "Social" },
] as const;

type EventRow = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  starts_at: string;
  location: string | null;
};

export function EventsClient() {
  const [category, setCategory] = useState<string>("all");
  const [rows, setRows] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = useMemo(() => {
    const u = new URLSearchParams();
    if (category && category !== "all") u.set("category", category);
    return u.toString();
  }, [category]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/events?${query}`);
      const data = (await res.json()) as { rows?: EventRow[]; error?: string };
      if (!res.ok) {
        setError(data.error ?? `HTTP ${res.status}`);
        setRows([]);
        return;
      }
      setRows(data.rows ?? []);
    } catch {
      setError("Network error — could not load events.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">GIX events</h1>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70 max-w-prose">
          Filter by category — data comes from Supabase via{" "}
          <code className="text-xs bg-black/5 dark:bg-white/10 px-1 rounded">/api/events</code>.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="text-sm font-medium" htmlFor="cat">
          Category
        </label>
        <select
          id="cat"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded border border-black/15 dark:border-white/20 bg-transparent px-3 py-2 min-h-[44px] max-w-xs"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-sm text-black/60">Loading…</p>}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && rows.length === 0 && (
        <p className="text-sm text-black/60">No events in this category.</p>
      )}

      <ul className="grid gap-4 sm:grid-cols-2">
        {rows.map((e) => (
          <li
            key={e.id}
            className="rounded-xl border border-black/10 dark:border-white/15 p-4 bg-black/[0.02] dark:bg-white/[0.03]"
          >
            <div className="text-xs uppercase tracking-wide text-black/50 dark:text-white/50">
              {e.category.replace("_", " ")}
            </div>
            <h2 className="mt-1 font-semibold text-lg leading-snug">{e.title}</h2>
            <p className="mt-2 text-sm text-black/75 dark:text-white/75 line-clamp-4">
              {e.description ?? "—"}
            </p>
            <dl className="mt-3 grid gap-1 text-sm text-black/70 dark:text-white/70">
              <div>
                <dt className="inline font-medium">When: </dt>
                <dd className="inline">{new Date(e.starts_at).toLocaleString()}</dd>
              </div>
              {e.location && (
                <div>
                  <dt className="inline font-medium">Where: </dt>
                  <dd className="inline">{e.location}</dd>
                </div>
              )}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
