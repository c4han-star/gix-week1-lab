# GIX Week 1 Lab — Streamlit projects

This repo supports **Component A** (interview synthesis in `COMPONENT_A.md`), **Component B** (**Asset Return & BlueTally Field Guide** in `app.py`), and **Component E** (Wayfinder in `wayfinder_app.py`).

## Prerequisites

- Python 3.11+
- A virtual environment (recommended)

## Setup

```bash
cd gix-week1-lab
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate.bat
pip install -r requirements.txt
```

## Run — Component B (`app.py`)

```bash
streamlit run app.py
```

Opens the **GIX Asset Return & BlueTally Field Guide** (search, category filter, **Home / About**, themed via `.streamlit/config.toml`). Content reflects the **post-launch asset desk / BlueTally** problem from your Component A notes—not live integration with BlueTally.

## Run — Component E (`wayfinder_app.py`)

```bash
streamlit run wayfinder_app.py
```

Opens **GIX Wayfinder** with searchable campus resources, category filter, empty-state messaging, and a data-integrity `assert` (see `wayfinder_app.py`).

## Project layout

| Path | Purpose |
|------|---------|
| `COMPONENT_A.md` | Interview notes, bottleneck summary, **problem statement** |
| `app.py` | Component B Streamlit app |
| `wayfinder_app.py` | Component E Wayfinder app |
| `SUBMISSION_REPORT.md` | Full written report (source) |
| `SUBMISSION_REPORT.pdf` | **Canvas PDF** (export of the report) |
| `screenshots/component-b-home.png` | Component D smoke-test screenshot |
| `requirements.txt` | Python dependencies |
| `.streamlit/config.toml` | Streamlit theme (Level 5 stretch) |

## Reproducibility

No API keys. Same `pip install -r requirements.txt` and `streamlit run …` on macOS, Linux, or Windows.
