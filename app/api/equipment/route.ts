import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createServerSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase not configured", rows: [] },
        { status: 503 }
      );
    }
    const { data, error } = await supabase
      .from("equipment_checkouts")
      .select("*")
      .order("checked_out_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ rows: data ?? [] });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerSupabase();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
    }

    const body = (await req.json()) as {
      item_name?: string;
      borrower_name?: string;
      due_at?: string | null;
      status?: string;
      notes?: string | null;
    };

    if (!body.item_name?.trim() || !body.borrower_name?.trim()) {
      return NextResponse.json(
        { error: "item_name and borrower_name are required" },
        { status: 400 }
      );
    }

    let dueAt: string | null = null;
    if (body.due_at != null && body.due_at !== "") {
      const t = new Date(body.due_at);
      if (Number.isNaN(t.getTime())) {
        return NextResponse.json({ error: "due_at must be a valid date" }, { status: 400 });
      }
      dueAt = t.toISOString();
    }

    const status = body.status ?? "out";
    if (!["out", "returned", "overdue"].includes(status)) {
      return NextResponse.json({ error: "invalid status" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("equipment_checkouts")
      .insert({
        item_name: body.item_name.trim(),
        borrower_name: body.borrower_name.trim(),
        due_at: dueAt,
        status,
        notes: body.notes ?? null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ row: data });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Invalid JSON body" },
      { status: 400 }
    );
  }
}
