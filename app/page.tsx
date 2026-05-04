import Link from "next/link";
import { fetchOpenMeteoForecast } from "@/lib/openMeteo";

/** Seattle-ish default for demo */
const LAT = 47.6062;
const LON = -122.3321;

export default async function Home() {
  let weatherOk = false;
  let maxTemps: number[] = [];
  let weatherError: string | null = null;

  try {
    const data = await fetchOpenMeteoForecast(LAT, LON);
    maxTemps = data.daily.temperature_2m_max.slice(0, 7);
    weatherOk = true;
  } catch (e) {
    weatherError = e instanceof Error ? e.message : "Weather unavailable";
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-10">
      <section className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Equipment checkouts &amp; campus events
        </h1>
        <p className="text-black/75 dark:text-white/75 max-w-prose leading-relaxed">
          Built for Week 5: external weather API with contract asserts, Supabase-backed equipment
          rows (Maason / checkout narrative), and an events browser with category filters.
        </p>
      </section>

      <section className="rounded-2xl border border-black/10 dark:border-white/15 p-6 bg-black/[0.02] dark:bg-white/[0.03]">
        <h2 className="text-lg font-medium mb-2">Seattle-area forecast (Open-Meteo)</h2>
        <p className="text-sm text-black/65 dark:text-white/65 mb-4">
          Fetched server-side via <code className="text-xs bg-black/5 dark:bg-white/10 px-1 rounded">lib/openMeteo.ts</code> — same contract as{" "}
          <code className="text-xs bg-black/5 dark:bg-white/10 px-1 rounded">/api/weather</code>.
        </p>
        {weatherOk && maxTemps.length > 0 ? (
          <ul className="flex flex-wrap gap-3">
            {maxTemps.map((t, i) => (
              <li
                key={i}
                className="rounded-lg border border-black/10 dark:border-white/15 px-3 py-2 text-sm min-w-[5rem]"
              >
                <span className="block text-xs text-black/50 dark:text-white/50">Day {i + 1}</span>
                <span className="font-mono text-lg">{t.toFixed(1)}°C</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-amber-700 dark:text-amber-300" role="alert">
            {weatherError ?? "No data"}
          </p>
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/equipment"
          className="rounded-2xl border border-black/10 dark:border-white/15 p-6 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors min-h-[120px] flex flex-col justify-center"
        >
          <span className="font-semibold text-lg">Equipment desk</span>
          <span className="text-sm text-black/65 dark:text-white/65 mt-2">
            List checkouts, add rows, mark returned.
          </span>
        </Link>
        <Link
          href="/events"
          className="rounded-2xl border border-black/10 dark:border-white/15 p-6 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors min-h-[120px] flex flex-col justify-center"
        >
          <span className="font-semibold text-lg">GIX events</span>
          <span className="text-sm text-black/65 dark:text-white/65 mt-2">
            Browse Supabase events with category filter.
          </span>
        </Link>
      </section>
    </div>
  );
}
