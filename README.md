# TECHIN 510 — `lab-5-c4han-star` (GitHub Classroom)

This is the **GIX-Luyao** GitHub Classroom repository for your assignment line (`lab-5-c4han-star`).

## Week 5 — Full stack (default course track)

For the **Week 5** full-stack module, follow **`lab-manual.md`** and course submission instructions (submit on `main`).

## Week 1 — Agentic coding lab (Streamlit) — also in this repo

The following files support the **Week 1** interview + Streamlit lab (Components A–E): `COMPONENT_A.md`, `app.py`, `wayfinder_app.py`, `SUBMISSION_REPORT.md` / `SUBMISSION_REPORT.pdf`, `screenshots/`, etc.

### Prerequisites

- Python 3.11+
- A virtual environment (recommended)

### Setup (Week 1 apps)

```bash
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate.bat
pip install -r requirements.txt
```

### Run — Component B (`app.py`)

```bash
streamlit run app.py
```

**GIX Asset Return & BlueTally Field Guide** — search, category filter, **Home / About**, theme in `.streamlit/config.toml`.

### Run — Component E (`wayfinder_app.py`)

```bash
streamlit run wayfinder_app.py
```

**GIX Wayfinder** — campus resources, search + filter, empty state, data `assert` in code.

### Week 1 project layout

| Path | Purpose |
|------|---------|
| `COMPONENT_A.md` | Interview notes + **problem statement** |
| `app.py` | Component B |
| `wayfinder_app.py` | Component E |
| `SUBMISSION_REPORT.md` / `.pdf` | Written report + PDF for Canvas |
| `screenshots/component-b-home.png` | Smoke-test screenshot |
| `requirements.txt` | Python dependencies |
| `.streamlit/config.toml` | Streamlit theme |

No API keys required for the Week 1 Streamlit work.
