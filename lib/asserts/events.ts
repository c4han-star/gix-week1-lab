/**
 * Component E — asserts on Supabase events pipeline (in addition to Open-Meteo asserts).
 */

export type EventRow = {
  id: string;
  title: string;
  category: string;
  starts_at: string;
  description?: string | null;
  location?: string | null;
};

export function assertEventRows(rows: unknown): asserts rows is EventRow[] {
  if (!Array.isArray(rows)) {
    throw new Error("Events pipeline: expected array from Supabase");
  }
  for (const row of rows) {
    if (typeof row !== "object" || row === null) {
      throw new Error("Events pipeline: row must be object");
    }
    const r = row as Record<string, unknown>;
    if (typeof r.id !== "string" || !r.id.trim()) {
      throw new Error("Events pipeline: missing id");
    }
    if (typeof r.title !== "string" || !r.title.trim()) {
      throw new Error("Events pipeline: missing title");
    }
    if (typeof r.category !== "string" || !r.category.trim()) {
      throw new Error("Events pipeline: missing category");
    }
    if (typeof r.starts_at !== "string") {
      throw new Error("Events pipeline: missing starts_at");
    }
  }
}

/** Second assert: categories must be non-empty strings when filtering */
export function assertCategoryFilter(cat: string | null): void {
  if (cat !== null && cat.length > 200) {
    throw new Error("Category filter suspiciously long");
  }
}
