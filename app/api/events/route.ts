import { NextRequest, NextResponse } from "next/server";
import { assertCategoryFilter, assertEventRows } from "@/lib/asserts/events";
import { createServerSupabase } from "@/lib/supabase/server";

/** Component E — list events with optional category filter */
export async function GET(req: NextRequest) {
  try {
    const supabase = createServerSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase not configured", rows: [] },
        { status: 503 }
      );
    }

    const category = req.nextUrl.searchParams.get("category");
    assertCategoryFilter(category);

    let q = supabase.from("events").select("*").order("starts_at", { ascending: true });

    if (category && category !== "all") {
      q = q.eq("category", category);
    }

    const { data, error } = await q;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const rows = data ?? [];
    assertEventRows(rows);

    return NextResponse.json({ rows });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Events query failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
