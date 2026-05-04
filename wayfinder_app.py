# GIX Wayfinder — campus resources prototype (Component E).
from __future__ import annotations

import re
from typing import Any

import streamlit as st

# Structured campus resources; fields chosen for wayfinding + filtering.
RESOURCES: list[dict[str, Any]] = [
    {
        "name": "Makerspace / Fab Lab",
        "category": "Make",
        "area": "Building main floor",
        "details": "3D printers, laser cutter, hand tools; safety orientation required.",
        "hint": "Look for orange safety signage near the tool cages.",
    },
    {
        "name": "Bike storage",
        "category": "Transit",
        "area": "Ground level near bike racks",
        "details": "Covered racks; bring your own lock; overnight not guaranteed.",
        "hint": "West entrance alcove.",
    },
    {
        "name": "Free printing (quota)",
        "category": "Services",
        "area": "Student lounge printers",
        "details": "Follow cohort printing policy; large jobs should be submitted off-peak.",
        "hint": "Check printer labels for queue names.",
    },
    {
        "name": "Quiet study nook",
        "category": "Study",
        "area": "Upper mezzanine",
        "details": "Small tables; please keep voice volume low; no food.",
        "hint": "Past the stairs, turn toward the windows.",
    },
    {
        "name": "Equipment checkout",
        "category": "Equipment",
        "area": "Coordinator desk hours",
        "details": "Borrow kits with ID; return same day unless loan approved.",
        "hint": "Ask in Slack #facilities before walking over.",
    },
    {
        "name": "Wellness / lactation room",
        "category": "Facilities",
        "area": "Ask staff for current room number",
        "details": "Book via shared calendar where posted; respect posted limits.",
        "hint": "Door may be labeled Wellness—keep knock-soft policy.",
    },
    {
        "name": "Kitchen / microwave",
        "category": "Facilities",
        "area": "Common kitchenette",
        "details": "Clean up after use; label food; no strong odors in shared fridge.",
        "hint": "Near the student lounge.",
    },
]


def assert_resources_integrity(resources: list[dict[str, Any]]) -> None:
    """Validate resource records on load (Component E: data integrity assert)."""
    for item in resources:
        assert "name" in item and item["name"], "Every resource must have a non-empty name"
        assert "category" in item and item["category"], "Every resource must have a category"


assert_resources_integrity(RESOURCES)


def normalize(s: str) -> str:
    return s.casefold()


def filter_resources(query: str, category: str | None) -> list[dict[str, Any]]:
    q = normalize(query.strip())
    out: list[dict[str, Any]] = []
    for r in RESOURCES:
        if category and r["category"] != category:
            continue
        blob = normalize(f"{r['name']} {r['category']} {r['area']} {r['details']} {r['hint']}")
        if not q or re.search(re.escape(q), blob):
            out.append(r)
    return out


def main() -> None:
    st.title("GIX Wayfinder")
    st.markdown("Find **makerspace**, **bikes**, **printing**, and **quiet spots** with search + filters.")

    categories = sorted({r["category"] for r in RESOURCES})

    st.sidebar.header("Filter")
    cat = st.sidebar.selectbox("Category", ["All"] + categories)

    search = st.text_input("Search campus resources", placeholder="e.g. bike, print, laser")

    selected_cat = None if cat == "All" else cat
    matches = filter_resources(search, selected_cat)

    st.header("Results")
    if not matches:
        st.warning("No resources match—try a broader search or pick **All** categories.")
        return

    for r in matches:
        with st.expander(r["name"], expanded=True):
            st.write(f"**Category:** {r['category']}")
            st.write(f"**Area:** {r['area']}")
            st.write(r["details"])
            st.caption(f"Wayfinding hint: {r['hint']}")


if __name__ == "__main__":
    main()
