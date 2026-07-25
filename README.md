# UrbanPulse Kosovo

A polished mobile-first smart city demo connecting residents with municipal services, community events, civic reporting, jobs, youth programmes, and Kosovo–U.S. collaboration opportunities.

Built as a capstone demo by six **EAGLE Kosovo** students. Uses realistic mock data — no backend or paid services required.

## Setup

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

### Other scripts

```bash
npm run build    # Typecheck + production build
npm run preview  # Preview the production build
```

## Tech stack

- React + Vite + TypeScript
- Tailwind CSS
- React Router
- Lucide React
- Recharts
- localStorage for reports, preferences, and saved items

## Features

- **Home dashboard** — greeting, weather hero, critical alert, urban vitals, city services, events & opportunities previews, quick actions
- **Public services** — status cards and live alert feed with Critical / Maintenance / Information filters
- **Report an issue** — validated form with image preview, anonymous toggle, and localStorage persistence
- **My reports** — submitted + preloaded sample reports with status tracking
- **Events** — category tabs, featured Kosovo–U.S. Youth Collaboration Forum, save & register flows
- **Jobs & opportunities** — internships, volunteering, youth programmes, Kosovo–U.S. listings (no salaries)
- **Profile** — bilingual preferences (Shqip / English), municipality & alert settings, saved activity, Reset Demo Data
- **Global search** — grouped results across services, alerts, events, and opportunities
- **Responsive layout** — bottom nav on mobile, sidebar on desktop

## Municipalities

Prishtina · Prizren · Peja · Gjakova · Mitrovica · Gjilan · Ferizaj · Podujeva · Istog · Deçan · Fushë Kosovë · Vushtrri · Suhareka · Lipjan · Obiliq · Drenas

## Demo mode

All data is mock. Use **Reset Demo Data** on the Profile page to clear localStorage and restore sample reports and default preferences.

## Project structure

```
src/
  components/   # Reusable UI (header, cards, forms, modals)
  context/      # App state, language, toasts, localStorage
  data/         # Mock alerts, services, events, opportunities
  i18n/         # English & Albanian strings
  pages/        # Route screens
  types/        # Shared TypeScript interfaces
  utils/        # Storage helpers
```
