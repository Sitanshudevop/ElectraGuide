# 🗳️ ElectraGuide — Your Unbiased Election Companion

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12-orange?logo=firebase)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**ElectraGuide** (also known as VoxAgent) is an interactive, non-partisan civic education platform designed to guide voters through India's democratic process. It provides tools for understanding election timelines, verifying media bias, exploring EVM security, and testing your electoral knowledge — all in one place.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ **Global Election Heatmap** | Interactive Google Maps view of active worldwide elections with live status popups |
| 🛡️ **Media Shield** | AI-powered headline bias analyzer using Google Gemini (bias rating, credibility score, loaded language detection) |
| 🧠 **Interactive Quiz** | Electoral knowledge quiz with Firestore-backed global leaderboard |
| 📅 **Election Timeline** | Key milestones, deadlines, and gazette notifications for the 2026 election cycle |
| 🔒 **Security Lab** | Visual simulations of EVM chain-of-custody, VVPAT verification, and cryptographic handshake protocols |
| 🌐 **Multilingual Support** | Real-time translation into Hindi, Tamil, Telugu, and Bengali via Google Cloud Translation API |
| ⚖️ **Fairness Scorecard** | Built-in neutrality audit panel confirming the platform's non-partisan stance |
| 💬 **VoxAssist Chatbot** | Floating AI chat assistant for quick civic Q&A, adapts to Simple/Expert language modes |
| 🔐 **Google Sign-In** | Firebase Authentication for personalized quiz score tracking |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [TailwindCSS 4](https://tailwindcss.com/) |
| **Database** | [Firebase Firestore](https://firebase.google.com/docs/firestore) |
| **Auth** | [Firebase Authentication](https://firebase.google.com/docs/auth) (Google Sign-In) |
| **Analytics** | [Firebase Analytics](https://firebase.google.com/docs/analytics) |
| **AI** | [Google Gemini API](https://ai.google.dev/) (`gemini-1.5-flash`) |
| **Maps** | [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript) |
| **Translation** | [Google Cloud Translation API v2](https://cloud.google.com/translate/docs/reference/rest) |
| **Testing** | [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) + [Cypress](https://www.cypress.io/) |
| **Linting** | [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) |

---

## ☁️ Google Services Used

### Firebase
- **Authentication** — Google Sign-In popup flow for user accounts.
- **Firestore** — Stores quiz results and powers the leaderboard (`quiz_results` collection).
- **Analytics** — Tracks page views across all App Router routes via `FirebaseAnalytics` component.

### Google Maps JavaScript API
- Powers the **Global Election Heatmap** on the homepage with a dark-themed interactive map, custom markers, and InfoWindow popups for each active election.

### Google Gemini API (`gemini-1.5-flash`)
- Powers the **Media Shield** bias analyzer. Sends article text to Gemini with a structured prompt and parses the returned JSON to display bias rating, credibility score, loaded language, and missing context.

### Google Cloud Translation API (v2)
- Powers the **multilingual navbar selector**. Translates all visible page text on the fly using a MutationObserver, with `sessionStorage` caching to minimize API calls.

---

## 🚀 Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v20 or later
- [npm](https://www.npmjs.com/) v9 or later
- A Google Cloud project with the following APIs enabled:
  - Maps JavaScript API
  - Cloud Translation API
  - Gemini AI API (via Google AI Studio)
- A Firebase project with Firestore and Authentication configured

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ElectraGuide/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your real API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual keys. See `.env.example` for descriptions of each variable and where to obtain them.

> ⚠️ **Important**: Never commit `.env.local` to source control. It is already listed in `.gitignore`.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Running Tests

### Unit & Component Tests (Jest + React Testing Library)

```bash
npm run test
```

Run in watch mode during development:

```bash
npm run test:watch
```

### End-to-End Tests (Cypress)

First, ensure the development server is running (`npm run dev`), then in a separate terminal:

```bash
# Open the Cypress interactive test runner
npm run cypress:open

# Run all E2E specs headlessly (CI mode)
npm run cypress:run
```

The E2E test suite covers three core user flows:
1. **Quiz Workflow** — Homepage → Click quiz tile → Answer question → Advance to Question 2
2. **Media Shield Workflow** — Submit a headline → Mocked Gemini API response → Scorecard renders
3. **Timeline Workflow** — Visit timeline → Verify election milestone entries are visible

---

## 🔧 Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Start Next.js development server (Turbopack) |
| `build` | `npm run build` | Build the production bundle |
| `start` | `npm run start` | Start the production server |
| `lint` | `npm run lint` | Run ESLint across all source files |
| `format` | `npm run format` | Format all source files with Prettier |
| `test` | `npm run test` | Run the full Jest test suite |
| `test:watch` | `npm run test:watch` | Run Jest in interactive watch mode |
| `cypress:open` | `npm run cypress:open` | Open the Cypress interactive runner |
| `cypress:run` | `npm run cypress:run` | Run all Cypress E2E specs headlessly |

---

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout with global providers & ErrorBoundary
│   ├── page.tsx          # Homepage (heatmap + dashboard)
│   ├── quiz/             # Electoral Knowledge Quiz
│   ├── media-shield/     # AI Bias Analyzer
│   ├── timeline/         # Election Timeline
│   ├── security/         # EVM Security Lab
│   └── ...               # Other informational pages
├── components/           # Reusable UI components
│   ├── home/             # HomeHeader, GlobalHeatmap, DashboardGrid
│   ├── quiz/             # QuizActive, QuizComplete, QuizLeaderboard
│   ├── media-shield/     # AuditorForm, OcrUploader, AuditResults
│   ├── security/         # EvmChain, CryptoHandshake, VvpatTimer
│   ├── TopNav.tsx        # Global navigation bar with language selector
│   ├── VoxAssist.tsx     # Floating chatbot assistant
│   └── ErrorBoundary.tsx # Global error boundary
├── context/
│   ├── AuthContext.tsx   # Firebase auth state provider
│   └── LanguageContext.tsx # Simple mode + multilingual translation
├── services/
│   └── translationService.ts # Google Cloud Translation API client
├── utils/
│   └── helpers.ts        # Pure utility functions (PDF height, session ID)
└── firebase.ts           # Firebase app initialization
```

---

## 🌐 Live Demo

> 🔗 [https://frontend-1008148518956.europe-west1.run.app](https://frontend-1008148518956.europe-west1.run.app)

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
