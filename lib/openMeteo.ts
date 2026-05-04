/**
 * Open-Meteo public API (no auth) — external REST integration for Component B + contract asserts (Component D).
 * Docs: https://open-meteo.com/en/docs
 */

export type OpenMeteoDaily = {
  time: string[];
  temperature_2m_max: number[];
};

export type OpenMeteoResponse = {
  daily: OpenMeteoDaily;
};

const BASE = "https://api.open-meteo.com/v1/forecast";

/** Component D — asserts validate API "contract" shape after fetch */
export function assertOpenMeteoDailyPayload(data: unknown): asserts data is OpenMeteoResponse {
  if (typeof data !== "object" || data === null) {
    throw new Error("Open-Meteo: expected object JSON root");
  }
  const o = data as Record<string, unknown>;
  if (!("daily" in o) || typeof o.daily !== "object" || o.daily === null) {
    throw new Error("Open-Meteo contract: missing daily");
  }
  const daily = o.daily as Record<string, unknown>;
  if (!Array.isArray(daily.time)) {
    throw new Error("Open-Meteo contract: daily.time must be array");
  }
  if (!Array.isArray(daily.temperature_2m_max)) {
    throw new Error("Open-Meteo contract: daily.temperature_2m_max must be array");
  }
}

export async function fetchOpenMeteoForecast(
  latitude: number,
  longitude: number
): Promise<OpenMeteoResponse> {
  if (latitude < -90 || latitude > 90) {
    throw new RangeError("latitude must be between -90 and 90");
  }
  if (longitude < -180 || longitude > 180) {
    throw new RangeError("longitude must be between -180 and 180");
  }

  const url = `${BASE}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&timezone=auto`;
  const res = await fetch(url, { next: { revalidate: 600 } });

  if (!res.ok) {
    throw new Error(`Open-Meteo HTTP ${res.status}`);
  }

  let json: unknown;
  try {
    json = await res.json();
  } catch {
    throw new Error("Open-Meteo returned non-JSON body");
  }

  assertOpenMeteoDailyPayload(json);
  return json;
}
