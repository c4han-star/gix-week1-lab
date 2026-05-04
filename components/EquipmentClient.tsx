"use client";

import { useCallback, useEffect, useState } from "react";

type CheckoutRow = {
  id: string;
  item_name: string;
  borrower_name: string;
  checked_out_at: string;
  due_at: string | null;
  returned_at: string | null;
  status: string;
  notes: string | null;
};

export function EquipmentClient() {
  const [rows, setRows] = useState<CheckoutRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [itemName, setItemName] = useState("");
  const [borrowerName, setBorrowerName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/equipment");
      const data = (await res.json()) as { rows?: CheckoutRow[]; error?: string };
      if (!res.ok) {
        setError(data.error ?? `HTTP ${res.status}`);
        setRows([]);
        return;
      }
      setRows(data.rows ?? []);
    } catch {
      setError("Network error — could not reach the server.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      const due_at =
        dueDate.trim() === ""
          ? null
          : new Date(dueDate).toISOString();
      const res = await fetch("/api/equipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item_name: itemName,
          borrower_name: borrowerName,
          due_at,
          status: "out",
          notes: notes.trim() || null,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setFormError(data.error ?? `Could not save (${res.status})`);
        return;
      }
      setItemName("");
      setBorrowerName("");
      setDueDate("");
      setNotes("");
      await load();
    } catch {
      setFormError("Could not submit — check your connection.");
    } finally {
      setSubmitting(false);
    }
  }

  async function markReturned(id: string) {
    setError(null);
    try {
      const res = await fetch(`/api/equipment/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "returned" }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? `Update failed (${res.status})`);
        return;
      }
      await load();
    } catch {
      setError("Network error while updating.");
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Equipment checkouts</h1>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70 max-w-prose">
          Track borrowed gear (based on Maason&apos;s checkout workflow). Add a row or mark an item returned.
        </p>
      </div>

      <section className="rounded-xl border border-black/10 dark:border-white/15 p-4 sm:p-6 bg-black/[0.02] dark:bg-white/[0.03]">
        <h2 className="font-medium mb-4">New checkout</h2>
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            <span>Item</span>
            <input
              required
              className="rounded border border-black/15 dark:border-white/20 bg-transparent px-3 py-2 min-h-[44px]"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. Sony A7 kit"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Borrower</span>
            <input
              required
              className="rounded border border-black/15 dark:border-white/20 bg-transparent px-3 py-2 min-h-[44px]"
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
              placeholder="Team / name"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            <span>Due (optional)</span>
            <input
              type="datetime-local"
              className="rounded border border-black/15 dark:border-white/20 bg-transparent px-3 py-2 min-h-[44px] max-w-md"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            <span>Notes</span>
            <textarea
              className="rounded border border-black/15 dark:border-white/20 bg-transparent px-3 py-2 min-h-[88px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Return instructions, kit contents…"
            />
          </label>
          {formError && (
            <p className="text-sm text-red-600 dark:text-red-400 sm:col-span-2" role="alert">
              {formError}
            </p>
          )}
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-foreground text-background px-4 py-2.5 min-h-[44px] text-sm font-medium disabled:opacity-50"
            >
              {submitting ? "Saving…" : "Check out"}
            </button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="font-medium mb-3">Active & recent checkouts</h2>
        {loading && <p className="text-sm text-black/60">Loading…</p>}
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 mb-3" role="alert">
            {error}
          </p>
        )}
        {!loading && rows.length === 0 && !error && (
          <p className="text-sm text-black/60">No rows yet — add a checkout above.</p>
        )}
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full min-w-[640px] text-sm border-collapse">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/15 text-left">
                <th className="py-2 pr-4 font-medium">Item</th>
                <th className="py-2 pr-4 font-medium">Borrower</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 pr-4 font-medium">Due</th>
                <th className="py-2 font-medium w-36">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-black/5 dark:border-white/10">
                  <td className="py-3 pr-4 align-top">{r.item_name}</td>
                  <td className="py-3 pr-4 align-top">{r.borrower_name}</td>
                  <td className="py-3 pr-4 align-top capitalize">{r.status}</td>
                  <td className="py-3 pr-4 align-top text-black/70 dark:text-white/70">
                    {r.due_at ? new Date(r.due_at).toLocaleString() : "—"}
                  </td>
                  <td className="py-3 align-top">
                    {r.status !== "returned" ? (
                      <button
                        type="button"
                        onClick={() => void markReturned(r.id)}
                        className="rounded-md border border-black/20 dark:border-white/25 px-3 py-2 min-h-[44px] text-xs hover:bg-black/5 dark:hover:bg-white/10"
                      >
                        Mark returned
                      </button>
                    ) : (
                      <span className="text-black/50 text-xs">Returned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
