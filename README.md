# Dashboard

A dashboard project with a pre-built design theme and reusable CSS component library.

## Color Palette

| Token      | Hex       | Usage                          |
|------------|-----------|--------------------------------|
| `--red`    | `#e74c3c` | Errors, critical issues        |
| `--orange` | `#f39c12` | Warnings, in-progress items    |
| `--green`  | `#27ae60` | Success, completed items       |
| `--blue`   | `#2980b9` | Information, primary actions   |
| `--purple` | `#8e44ad` | Special metrics                |
| `--teal`   | `#1abc9c` | Secondary success metrics      |
| `--dark`   | `#2c3e50` | Body text, headings            |
| `--gray`   | `#95a5a6` | Labels, subtitles              |
| `--light`  | `#ecf0f1` | Light backgrounds              |

## Available CSS Components

- **Header** — dark gradient banner (`.header`)
- **KPI Cards** — metric cards with color-coded numbers (`.kpi-card`)
- **Sections** — content sections with blue left-border headings (`.section`)
- **Cards** — white rounded containers (`.card`)
- **Grids** — 2-column and 3-column responsive layouts (`.grid-2`, `.grid-3`)
- **Callouts** — danger / warning / info / success alerts (`.callout`)
- **Tables** — styled data tables (`.tbl`)
- **Badges** — colored status pills (`.badge`)
- **Progress Bar** — green-to-teal gradient fill (`.progress-bar`)
- **Timeline** — vertical timeline with color-coded dots (`.timeline`)
- **Stats Grid** — key-value metric tiles (`.stats-grid`)
- **Footer** — centered footer text (`.footer`)

## Usage

```bash
python3 -m http.server 8080
```

Open **http://localhost:8080** in your browser.
