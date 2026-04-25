---
title: "VoxAgent — Vibe Coding an Unbiased Civic Assistant: Architecture, Audits, and the Bento-Box Approach"
slug: vibe-coding-voxagent
author: VoxAgent / Deepmind Antigravity
date: 2026-04-25T19:22:20Z
tags: [vibe-coding, agentic-ai, civic-tech, gemini, antigravity, unbiased-ai]
audit_id: vox-blog-audit-1001
version: 1.0.0
reading_time_minutes: 8
---

# TL;DR
* **Unbiased by Design:** VoxAgent engineers neutrality into its core via a rigorous 11-step Unbiased Reasoning Loop rather than relying on prompt assumptions.
* **Bento-Box Architecture:** Utilized a heavily structured XML-based master instruction file (`GEMINI.md`) to bypass massive token limits and enforce rigid guardrails.
* **O(log n) Performance:** Built on Java 17 and Spring Boot, utilizing an `InMemorySourceRegistryAdapter` (TreeMap) for rapid, efficient scaling of civic data.
* **WCAG 2.1 Compliant:** Built on Next.js with a global context toggle translating complex legalese into "Simple Mode" instantly.
* **Live Auditor Guardrails:** Strictly enforces CoT (Chain of Thought) secrecy, releasing only final remediated texts and structured Fairness Scorecards.

# The Problem
Election information is uniquely susceptible to bias, loaded language, and disinformation. Providing citizens with a safe, neutral ground for electoral education requires AI that does not just hallucinate fairness but actively measures, audits, and remediates its own output against statutory guidelines.

# The Vibe Coding Philosophy
Rather than building monolithic, fragile prompts, we employed "Vibe Coding" driven by intent-first architecture. We used a "Bento-Box" XML structure within a single master `GEMINI.md` file. By routing our logic through file-based instructions, we successfully navigated 25k+ character logic limits, delegating specific civic tasks to micro-agents.

# The Bento-Box Architecture
VoxAgent's identity, mission, workforce, audit protocols, and technical stack are neatly compartmentalized into XML nodes (`<agentic_workforce>`, `<bias_audit_protocol>`). This allows the base model to hot-swap contexts without prompt bleed.

# The Agentic Workforce
VoxAgent deploys a swarm of ephemeral micro-agents per session:
- **`grounding_agent`**: Retrieves authoritative data.
- **`audit_agent`**: The strict enforcer of the Bias Audit Protocol.
- **`vision_agent`**: Powers the Media Shield's OCR capabilities for screenshot uploads.
- **Specialists**: Domain agents like `timeline_agent` and `registration_agent` produce canonical, localized outputs.

# The Unbiased Reasoning Loop
Our 11-step pipeline guarantees neutrality:
1. **Ingest & Provenance Collection**
2. **Metadata & Provenance Analysis**
3. **Political Lean Detection**
4. **Proxy Variable & Loaded Language Detection** (e.g., flagging "purge" vs "Special Intensive Revision")
5. **Claim-to-Evidence Mapping**
6. **Candidate Variants and Neutrality Optimization**
7. **Fairness Scorecard Generation**
8. **Automated Remediation and Self-Audit**
9. **Final Packaging & Disclosure** (Enforcing CoT refusal)
10. **Recordkeeping**
11. **Disallowed Outputs & Refusals**

# The Fairness Scorecard
Appended to every civic generation, this machine-readable JSON object exposes transparency without leaking internal deliberation. See the Appendix for the schema.

# Engineering for O(log n)
The backend leverages Hexagonal Architecture. The `SourceRegistryPort` is implemented via the `InMemorySourceRegistryAdapter` using a `TreeMap`, guaranteeing O(log n) time complexity for rapid source validation, even as the knowledge base scales.

# Security & Trust
The Media Shield acts as a honeypot for guardrail testing. When users request internal reasoning logs, the system securely refuses via a hard-coded UI banner, maintaining CoT secrecy and preventing prompt injection attacks. 

# WCAG 2.1 in Practice
The frontend utilizes Next.js and Tailwind CSS with a strict "Civic Tech" aesthetic. We deployed a global `LanguageContext` that dynamically translates complex legal jargon (e.g., "Constituencies") into accessible plain text ("Voting Areas") across all pages instantly.

# Lessons Learned
The primary challenge was balancing AI agency with strict neutrality. The `prompt_optimizer_agent` proved crucial in migrating highly emotive inputs into cold, statutory terminology automatically.

# What's Next
Deployment via Docker to cloud infrastructure, transitioning from in-memory registries to full PostgreSQL persistence, and expanding the Global Comparative Democracy matrix.

---
# Appendix
## Fairness Scorecard Example
```json
{
  "audit_id": "vox-live-99x2",
  "timestamp": "2026-04-25T19:22:20Z",
  "neutrality_score": 62,
  "source_diversity_score": 85,
  "evidence_coverage_pct": 90,
  "loaded_language_score": 45,
  "final_verdict": "REMEDIATE",
  "remediation_actions": ["Replaced 'electoral purges' with 'SIR Deletions'"]
}
```
