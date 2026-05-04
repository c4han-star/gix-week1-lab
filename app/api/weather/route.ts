import { NextRequest, NextResponse } from "next/server";
import { fetchOpenMeteoForecast } from "@/lib/openMeteo";

/** Server-side Open-Meteo proxy — avoids CORS; includes contract asserts in lib/openMeteo.ts */
export async function GET(req: NextRequest) {
  try {
    const lat = Number(req.nextUrl.searchParams.get("lat") ?? "47.6062");
    const lon = Number(req.nextUrl.searchParams.get("lon") ?? "-122.3321");

    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return NextResponse.json(
        { error: "lat and lon must be numbers" },
        { status: 400 }
      );
    }

    const data = await fetchOpenMeteoForecast(lat, lon);
    return NextResponse.json(data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Weather fetch failed";
    const status = msg.includes("latitude") || msg.includes("longitude") ? 400 : 502;
    return NextResponse.json({ error: msg }, { status });
  }
}
