# GIX Asset Return & BlueTally Field Guide — Streamlit lab app (TECHIN 510 Week 1).
# Grounded in staff interview notes on post-launch returns, checkout reconciliation,
# and BlueTally intake (central table, Makerspace/IT routing, accessories vs assets).
# Manual edit: sidebar primary label was changed from "Browse" to "Go to" for clarity.
from __future__ import annotations

import re

import streamlit as st

# --- FAQs derived from Component A interview themes (14 entries) ---
FAQ_ENTRIES = [
    {
        "category": "End-of-Launch Returns",
        "question": "What happens at the central return table after launch?",
        "answer": "Teams bring hardware to the table (e.g. 3rd floor). Staff run down a master list, ask whether each item is present, collect it, then decide routing (Makerspace, IT, discard/other) before entering into BlueTally.",
    },
    {
        "category": "End-of-Launch Returns",
        "question": "Why is return night stressful for staff?",
        "answer": "Checkout returns and newly purchased returns are often handled as two parallel mental tracks—item-by-item verification plus manual BlueTally entry—which duplicates effort and slows the line.",
    },
    {
        "category": "BlueTally",
        "question": "What is BlueTally used for in this workflow?",
        "answer": "It is the system of record for what is on campus: assets with locations and status (e.g. ready to deploy), separate from day-of clipboard checks.",
    },
    {
        "category": "BlueTally",
        "question": "What is the difference between an Asset and an Accessory?",
        "answer": "Assets are unique tracked items and typically carry an 8-digit UW barcode. Accessories are interchangeable (e.g. common cables) and are usually counted in bulk, not individually serialized.",
    },
    {
        "category": "BlueTally",
        "question": "When do barcodes usually get applied today?",
        "answer": "Often at return intake—labels are printed and applied after items show up, which means purchase-to-return tracking can be late and return night bears the full data-entry burden.",
    },
    {
        "category": "Check-In / Check-Out",
        "question": "What does staff do first when a team walks up?",
        "answer": "They reconcile what was checked out to the team, scan or look up those records, check items back in, then pivot to handling newly purchased items that also need labeling and BlueTally entry.",
    },
    {
        "category": "Check-In / Check-Out",
        "question": "Why does it feel like “two passes” through the same pile?",
        "answer": "Because checkout returns and purchase returns follow related but distinct mental checklists—both are manual—which encourages duplicate touches on the same table shift.",
    },
    {
        "category": "Routing & Disposition",
        "question": "How do staff decide Makerspace vs IT vs discard?",
        "answer": "Today it blends intuition and familiarity with the gear. The interview flagged this as a place where clearer rules would reduce disagreement and rework.",
    },
    {
        "category": "Routing & Disposition",
        "question": "What goes wrong when routing is ambiguous?",
        "answer": "Items may sit in the wrong bay, get double-ordered next quarter, or show “returned” in one list but not actually be shelf-ready in BlueTally.",
    },
    {
        "category": "Accessories & Kits",
        "question": "How should small or interchangeable items be logged?",
        "answer": "If it must be uniquely tracked, barcode the container; if interchangeable, treat as accessories with counts rather than per-serial tracking.",
    },
    {
        "category": "Accessories & Kits",
        "question": "How should multi-part kits (e.g. cameras) be handled?",
        "answer": "Complex kits need a checklist mindset—body, lens, batteries, charger—because partial returns read as “complete” unless someone verifies each line.",
    },
    {
        "category": "Accountability & Tips",
        "question": "What reliability issues came up in the interview?",
        "answer": "Gear left unattended on desks, missing pieces despite a verbal “all good,” and confusion when teams split who carries what back to the table.",
    },
    {
        "category": "Accountability & Tips",
        "question": "What accountability habits help staff?",
        "answer": "Direct handoff to named staff at the table beats anonymous drop-offs; pairing physical counts with BlueTally states catches mismatches earlier.",
    },
    {
        "category": "Improvement Ideas",
        "question": "What is the “biggest opportunity” mentioned for fixing the bottleneck?",
        "answer": "Assign barcodes and enter assets into BlueTally at purchase time when possible—so return night is reconciliation, not first-time creation for every line item.",
    },
]

CATEGORIES = sorted({entry["category"] for entry in FAQ_ENTRIES})


def normalize_text(text: str) -> str:
    return text.casefold()


def filter_entries(query: str, category: str | None) -> list[dict]:
    q = normalize_text(query.strip())
    out: list[dict] = []
    for entry in FAQ_ENTRIES:
        if category and entry["category"] != category:
            continue
        haystack = normalize_text(
            f"{entry['question']} {entry['answer']} {entry['category']}"
        )
        if not q or re.search(re.escape(q), haystack):
            out.append(entry)
    return out


def render_home(category_selection: str) -> None:
    st.title("GIX Asset Return & BlueTally Field Guide")
    st.markdown(
        "Quick answers for **teams** and **desk staff** on post-launch returns, "
        "**checkout vs purchased items**, and how **BlueTally** fits—based on your program interview notes."
    )

    st.header("Search")
    search = st.text_input(
        "Find an answer",
        placeholder="e.g. barcode, Makerspace, kit, checkout",
        label_visibility="visible",
    )

    selected_category = None if category_selection == "All" else category_selection
    results = filter_entries(search, selected_category)

    st.header("Matching questions")
    if not results:
        st.info(
            "No entries match that query—try a shorter keyword or clear the category filter."
        )
        return

    for entry in results:
        with st.expander(entry["question"], expanded=False):
            st.caption(f"Category: {entry['category']}")
            st.write(entry["answer"])


def render_about() -> None:
    st.title("About this project")
    st.header("What this app is for")
    st.write(
        "This prototype is a **searchable field guide** for the asset-return problem "
        "you captured in Component A: reconciling **checked-out gear** and **purchased items**, "
        "routing to **Makerspace / IT / discard**, and reducing **manual BlueTally** thrash at the table. "
        "Built with Streamlit for the Week 1 agentic-coding lab—it explains the situation; it does **not** "
        "integrate with BlueTally itself."
    )
    st.header("Links")
    st.markdown("- [GIX](https://gixnetwork.org/) — Global Innovation Exchange")


def main() -> None:
    st.sidebar.markdown("### Go to")
    page = st.sidebar.radio(
        "Section",
        ["Home", "About"],
        label_visibility="collapsed",
    )

    category_selection = "All"
    if page == "Home":
        st.sidebar.markdown("### Browse by category")
        category_selection = st.sidebar.selectbox(
            "Category",
            ["All"] + CATEGORIES,
            label_visibility="collapsed",
        )
        st.sidebar.caption("Combine category with search to narrow results.")

    if page == "Home":
        render_home(category_selection)
    else:
        render_about()


if __name__ == "__main__":
    main()
