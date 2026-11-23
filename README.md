# 🌿 BreatheWell — Urban Air Quality Assistant

> **A clean, minimal, and calm Progressive Web App that helps Indian urban families beat severe winter smog with hyper-local AQI insights, AI-powered daily plans, and practical indoor air tools.**

[![React](https://img.shields.io/badge/React-18-61dafb?style=flat&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat&logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![Google Gemini](https://img.shields.io/badge/Gemini_1.5_Flash-API-4285f4?style=flat&logo=google)](https://ai.google.dev)
[![WAQI](https://img.shields.io/badge/WAQI-Live_AQI-00b050?style=flat)](https://waqi.info)

---

## What It Does

BreatheWell is an India-first air quality companion built for urban families. It combines:

- **Live CPCB AQI data** from the WAQI API for 8 major Indian cities (Delhi, Mumbai, Bengaluru, Kolkata, Hyderabad, Chennai, Pune, Ahmedabad)
- **Personalised household risk engine** — scores every family member (Aarav, Priya, Dadaji, etc.) against CPCB AQI bands using their age and health condition
- **AI health guidance** via Google Gemini 2.5 Flash, grounded in WHO/CPCB/ICMR protocols with a local RAG fallback when offline
- **Indoor air toolkit** — home checklist, Corsi-Rosenthal DIY filter guide, and an air purifier CADR room sizer
- **Low-emission commute tracker** — log metro/cycle/WFH habits, earn streaks and CO₂ savings badges
- **Bilingual support** — full English and Hindi (हिंदी) UI with one-tap language toggle
- **PDF export** — download the family's daily smog plan as a PDF

---

## Architecture

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full data flow, directory structure, API integration details, and scientific references.

```
User → React UI ↔ AppContext
                ↕                     ↕
         aqiService.ts           geminiService.ts
         (WAQI API live)         (Gemini 2.5 Flash)
                ↕                     ↓ fallback
         riskEngine.ts           aiAssistant.ts (local RAG)
         (personalised plan)
```

---

## Tech Stack

| Category | Tool |
|----------|------|
| Framework | React 18 + TypeScript 5 |
| Build | Vite 5 (Rollup, `< 200 kB` gzipped bundle) |
| Styling | Tailwind CSS 3 (utility-first, zero runtime CSS) |
| Charts | Recharts (SVG diurnal AQI forecast) |
| AI | Google Gemini 2.5 Flash REST API |
| AQI Data | WAQI REST API (8 Indian city stations) |
| PDF | jsPDF (100% client-side, no server) |
| State | React Context + `localStorage` (PWA-ready, offline-capable) |

---

## Setup — Step by Step

### Prerequisites
- **Node.js** v18 or above (`node -v`)
- **npm** v9 or above (`npm -v`)
- A free **WAQI API token** from [aqicn.org/data-platform/token](https://aqicn.org/data-platform/token/)
- A **Google Gemini API key** from [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/breathewell.git
cd breathewell
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` and fill in your keys:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_WAQI_API_TOKEN=your_waqi_token_here
VITE_APP_ENV=development
```

> **Note:** The app works without API keys — it falls back to a seasonal AQI estimate and a local grounded RAG for AI answers.

### 4. Run locally
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 5. Production build
```bash
npm run build
npm run preview
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_GEMINI_API_KEY` | Recommended | Google Gemini 2.5 Flash API key for AI health Q&A |
| `VITE_WAQI_API_TOKEN` | Recommended | WAQI token for live station AQI data |
| `VITE_APP_ENV` | Optional | `development` or `production` |

Copy `.env.example` → `.env` and fill in your values. **Never commit `.env` to Git.**

---

## Features vs PRD Checklist

| PRD Feature | Status |
|-------------|--------|
| CPCB 6-band AQI scale (0–500) | ✅ |
| Live WAQI API feed for 8 Indian cities | ✅ |
| Offline AQI fallback with seasonal estimate | ✅ |
| Diurnal AQI curve (nocturnal inversion + solar mixing) | ✅ |
| Personalised risk engine per household member | ✅ |
| Family vulnerability profiles (Aarav, Priya, Dadaji) | ✅ |
| Daily smog plan (best outdoor window, mask, ventilation) | ✅ |
| PDF smog plan export (jsPDF) | ✅ |
| Google Gemini 2.5 Flash AI assistant | ✅ |
| Local RAG fallback (CPCB/WHO/ICMR grounded) | ✅ |
| Medical triage escalation routing | ✅ |
| Indoor toolkit (checklist, CADR calculator, Corsi-Rosenthal DIY) | ✅ |
| Low-emission commute tracker + CO₂/PM2.5 saved | ✅ |
| Habit streaks and achievement badges | ✅ |
| Route planner with exposure score comparison | ✅ |
| Weekly AQI report view | ✅ |
| English ↔ Hindi bilingual toggle | ✅ |
| Senior mode (larger text) | ✅ |
| Text-to-speech audio narration | ✅ |
| PWA service worker registration | ✅ |
| DPDP Act 2023 compliance (all PII stays in localStorage) | ✅ |
| Bundle size < 200 kB gzipped | ✅ (58 kB gzipped) |
| Responsive layout (mobile + desktop) | ✅ |

---

## Project Structure

```
promptwars/
├── docs/
│   └── ARCHITECTURE.md         System architecture, data flow, API details
├── src/
│   ├── components/             UI components (pure presentation)
│   ├── context/AppContext.tsx   Central React state (AQI, household, language)
│   ├── services/               Business logic + API integrations
│   │   ├── aqiService.ts       WAQI API, CPCB AQI calc, diurnal curve
│   │   ├── geminiService.ts    Gemini 2.5 Flash REST integration
│   │   ├── aiAssistant.ts      Local grounded RAG fallback
│   │   ├── riskEngine.ts       Personalised risk + smog plan engine
│   │   └── trackerService.ts   Habit logger + CO₂ calculator
│   ├── data/                   Static domain data (hacks, routes, personas)
│   ├── types/index.ts          TypeScript data contracts
│   ├── utils/pdfGenerator.ts   jsPDF client-side export
│   └── i18n/translations.ts    EN + HI string tables
├── .env.example                Environment variable template (commit this)
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Gemini API Integration (Sponsor Tech)

BreatheWell uses Google Gemini 2.5 Flash as the AI backbone for the **Ask BreatheWell** chat drawer.

**How it's integrated (`src/services/geminiService.ts`):**

1. **Context-grounded system prompt** — every request injects live AQI, city, dominant pollutant, weather conditions, and each household member's age + health condition
2. **CPCB/WHO/ICMR protocol injection** — medical guidelines are embedded in the system prompt to prevent hallucinated advice
3. **Emergency triage routing** — keywords like "chest pain" or "breathing difficulty" trigger immediate escalation messaging
4. **15-second `AbortController` timeout** — prevents hanging on slow connections
5. **Structured JSON response parsing** — extracts `replyText`, `isWarning`, and `suggestedQuestions`
6. **Automatic fallback** — if Gemini is unavailable, the local RAG in `aiAssistant.ts` answers from the embedded knowledge base

**Runtime API key entry** — users can paste their Gemini API key directly in the chat drawer (stored only in `localStorage`, never sent anywhere except the Gemini endpoint).

---

## Privacy & Compliance

- All household data (member names, ages, health conditions) is stored exclusively in **`localStorage`** — no PII ever leaves the user's device
- AQI context sent to Gemini contains **only health condition categories**, not names
- API keys are managed via `.env` and runtime input, never hardcoded
- Compliant with **India's Digital Personal Data Protection Act 2023 (DPDP Act)**

---

## Scientific References

| Standard | Applied To |
|----------|-----------|
| CPCB National AQI (2014) | AQI calculation, 6-band colour scale |
| WHO Air Quality Guidelines 2021 | Risk thresholds (PM2.5: 15 µg/m³ annual, 25 µg/m³ 24h) |
| ICMR Child Health Guidelines | Paediatric risk multipliers (< 12 years) |
| BIS IS 9473 / NIOSH N95 | Mask recommendation logic |
| Corsi & Rosenthal (2021) | DIY Corsi-Rosenthal box CADR formula |
| IMD Meteorological Bulletins | Nocturnal thermal inversion diurnal curve model |

---

## License

MIT © BreatheWell Team — Hackathon Project
