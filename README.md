# 🗳️ ElectraGuide (VoxAgent) — Google AI Prompt Wars Submission

**The Agentic "Truth Engine" for the Global Election Cycle**

ElectraGuide is a decentralized Civic OS designed to safeguard election integrity through real-time bias auditing, cryptographic security simulations, and multi-national voter intelligence.

🚀 **LIVE DEMO:** [ElectraGuide Live](https://electoralguide-frontend-1008148518956.us-central1.run.app)

---

## 🧠 AI Architecture & Prompt Engineering (Prompt Wars Highlight)

This project was built from the ground up to showcase advanced capabilities of the Gemini API. Instead of a simple wrapper, ElectraGuide acts as an **Agentic Workforce**.

### 1. Model Selection & Optimization
- **Core Engine:** `gemini-flash-latest`
- **Why Flash?** We chose the Flash model to achieve ultra-low latency for our real-time floating chatbot (VoxAssist) while maintaining high-fidelity reasoning for text analysis. Flash provides the perfect balance of speed and intelligence required for a consumer-facing civic platform.

### 2. Structured Output (JSON Schema)
To ensure reliable integration with our React frontend components, we heavily utilize Gemini's structured output capabilities (`responseMimeType: 'application/json'`).
- **Media Shield Analyzer:** When a user submits a news headline, Gemini doesn't return a text paragraph. It returns a strictly typed JSON object containing:
  - `biasRating` (0-100 index)
  - `credibilityScore`
  - `loadedLanguage` (Array of detected manipulative words)
  - `missingContext` (Factual gaps in the submitted text)
  This allows our UI to render beautiful, interactive data visualizations (like Radar and Gauge charts) directly from the AI's "thoughts."

### 3. Strict System Instructions & Hallucination Mitigation
We employ aggressive System Prompts to force the AI into a neutral, factual constraint box, which is critical for election tech.
- **VoxAgent Protocol:** *"You are VoxAgent, an unbiased electoral guide for Indian and global elections. Answer questions about voting processes, candidates, electoral laws, and democratic systems. Always cite which country/region you are referring to. Never express political opinions. Keep answers concise."*
- **Manifesto Auditor Protocol:** Forces the model to extract purely objective platform stances without applying moral judgments, comparing candidates across standard dimensions (Economy, Healthcare, Education).

---

## ✨ Core Features

| Feature | Description |
|---|---|
| 🛡️ **Media Shield** | AI-powered headline bias analyzer using Google Gemini to dissect loaded language. |
| 💬 **VoxAssist Chatbot** | Floating AI chat assistant for quick civic Q&A, adapts to Simple/Expert language modes. |
| ⚖️ **Manifesto Auditor** | Comparative AI analysis of candidate platforms across key societal metrics. |
| 🗺️ **Global Heatmap** | Interactive Google Maps view of active worldwide elections. |
| 🔐 **Security Lab** | Visual simulations of EVM chain-of-custody and cryptographic handshake protocols. |
| 🌐 **Multilingual Support** | Real-time translation into Hindi, Tamil, Telugu, and Bengali via Google Cloud Translation API. |

---

## 🛠️ Tech Stack & Integrations

- **Frontend:** Next.js 16 (App Router), React, TailwindCSS
- **Authentication:** Google Identity Services (One Tap) & Firebase Auth
- **Database:** Firebase Firestore (Realtime Community Polls, User Preferences)
- **AI / ML:** Google Generative AI SDK (`gemini-flash-latest`)
- **Visualizations:** Google Charts API
- **Cloud Infrastructure:** Google Cloud Run

---

## 🚀 Running Locally

### Prerequisites
- Node.js v20+
- A Google Cloud project with the **Generative Language API (Gemini)**, **Maps JavaScript API**, and **Cloud Translation API** enabled.

### Quick Start

```bash
git clone <your-repo-url>
cd ElectraGuide/frontend
npm install
cp .env.example .env.local # Fill in your Google API keys here
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app locally.

---
*Built for Google AI Prompt Wars.*
