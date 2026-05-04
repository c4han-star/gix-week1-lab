import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

/** PATCH — update checkout status (e.g. mark returned) */
export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createServerSupabase();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
    }

    const { id } = await ctx.params;
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "missing id" }, { status: 400 });
    }

    const body = (await req.json()) as {
      status?: string;
      notes?: string | null;
    };

    const status = body.status;
    if (!status || !["out", "returned", "overdue"].includes(status)) {
      return NextResponse.json({ error: "invalid status" }, { status: 400 });
    }

    const patch: Record<string, unknown> = { status };
    if (status === "returned") {
      patch.returned_at = new Date().toISOString();
    }
    if (body.notes !== undefined) {
      patch.notes = body.notes;
    }

    const { data, error } = await supabase
      .from("equipment_checkouts")
      .update(patch)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    return NextResponse.json({ row: data });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Invalid JSON body" },
      { status: 400 }
    );
  }
}
