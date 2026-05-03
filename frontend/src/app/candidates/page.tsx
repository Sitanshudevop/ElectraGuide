'use client';
import Link from 'next/link';
import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ManifestoRadarChart from '@/components/charts/ManifestoRadarChart';
import { traceAsync } from '@/services/perfService';

const MANIFESTO_PROMPT = `You are a non-partisan political manifesto analyzer. Analyze party manifesto summaries and return a JSON array. For each party return: { "party_name": "string", "promises": ["array"], "feasibility_score": number(0-100), "sector_breakdown": {"employment":"summary","infrastructure":"summary","education":"summary","healthcare":"summary","other":"summary"}, "strengths": ["array"], "weaknesses": ["array"], "neutrality_assessment": "string" }. Be objective.`;

interface ManifestoAnalysis {
  party_name: string;
  promises: string[];
  feasibility_score: number;
  sector_breakdown: Record<string, string>;
  strengths: string[];
  weaknesses: string[];
  neutrality_assessment: string;
}

/**
 * The Manifesto Audit page with Gemini-powered analysis.
 * @returns {JSX.Element}
 */
export default function Candidates() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyses, setAnalyses] = useState<ManifestoAnalysis[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const manifestos = [
    {
      party: 'All India Trinamool Congress (TMC)',
      color: 'border-green-600',
      summary:
        'Youth Employment: Proposes scaling the "Student Credit Card" scheme limit to ₹15 Lakhs and promises 500,000 new MSME-backed apprenticeships.\nDigital Infrastructure: Pledges to expand "Duare Sarkar" digital portals and free Wi-Fi zones in 100 tier-2 and tier-3 municipalities.',
    },
    {
      party: 'Bharatiya Janata Party (BJP)',
      color: 'border-orange-500',
      summary:
        'Youth Employment: Commits to establishing 50 new Skill India hubs and filling 200,000 vacant state government positions within 18 months.\nDigital Infrastructure: Proposes 100% optical fiber connectivity to all Gram Panchayats and three new IT parks in North Bengal.',
    },
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setErrorMessage('');
    setAnalyses([]);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) throw new Error('Gemini API Key is missing.');
      const parsed = await traceAsync('gemini_manifesto_audit', async () => {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-flash-latest',
          systemInstruction: MANIFESTO_PROMPT,
        });
        const combinedPrompt = manifestos
          .map((m) => `--- ${m.party} ---\n${m.summary}`)
          .join('\n\n');
        const result = await model.generateContent(
          `Analyze these West Bengal 2026 manifestos. Return JSON array:\n\n${combinedPrompt}`
        );
        const responseText = result.response.text();
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        if (!jsonMatch) throw new Error('Could not parse AI response.');
        return JSON.parse(jsonMatch[0]);
      });
      setAnalyses(parsed);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'An error occurred.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link
        href="/"
        className="inline-flex items-center text-civic-blue dark:text-blue-400 hover:underline mb-8 font-medium focus:ring-2 focus:ring-civic-blue rounded-md px-2 py-1"
      >
        ← Back to Dashboard
      </Link>
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl" aria-hidden="true">
          📊
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Manifesto <span className="text-cyan-500">Audit</span>
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
        Objective summaries of the top party manifestos for the West Bengal 2026
        cycle.
      </p>

      <div className="mb-10">
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 shadow-lg flex items-center gap-3"
        >
          <span aria-hidden="true">🧠</span>
          {isAnalyzing ? 'Analyzing with Gemini...' : 'Run AI Manifesto Audit'}
          {isAnalyzing && (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
        </button>
        {errorMessage && (
          <p className="text-red-500 mt-3 text-sm font-medium">
            {errorMessage}
          </p>
        )}
      </div>

      {/* Radar Chart — Policy Dimension Comparison */}
      <div className="mb-12">
        <ManifestoRadarChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {manifestos.map((m, idx) => (
          <section
            key={idx}
            className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border-t-4 ${m.color} flex flex-col`}
          >
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              {m.party}
            </h2>
            <pre className="text-slate-600 dark:text-slate-300 text-sm whitespace-pre-wrap font-sans flex-1">
              {m.summary}
            </pre>
          </section>
        ))}
      </div>

      {analyses.length > 0 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span aria-hidden="true">🤖</span> Gemini AI Analysis
            <span className="text-xs font-mono bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 px-2 py-1 rounded border border-indigo-200 dark:border-indigo-800 ml-2">
              gemini-flash-latest
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {analyses.map((a, idx) => (
              <section
                key={idx}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <div className="bg-slate-100 dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 dark:text-white">
                    {a.party_name}
                  </h3>
                  <span
                    className={`text-2xl font-mono font-bold ${a.feasibility_score > 70 ? 'text-green-600' : a.feasibility_score > 40 ? 'text-orange-500' : 'text-red-600'}`}
                  >
                    {a.feasibility_score}/100
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-slate-500 uppercase tracking-wide mb-2">
                      Key Promises
                    </h4>
                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 text-sm space-y-1">
                      {a.promises.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-500 uppercase tracking-wide mb-2">
                      Sector Breakdown
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(a.sector_breakdown).map(
                        ([sector, detail]) => (
                          <div
                            key={sector}
                            className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700"
                          >
                            <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">
                              {sector}
                            </span>
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                              {detail}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-green-600 mb-1">
                        ✅ Strengths
                      </h4>
                      <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                        {a.strengths.map((s, i) => (
                          <li key={i}>• {s}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-red-600 mb-1">
                        ⚠️ Weaknesses
                      </h4>
                      <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                        {a.weaknesses.map((w, i) => (
                          <li key={i}>• {w}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800 text-sm text-blue-800 dark:text-blue-200">
                    <strong>Neutrality:</strong> {a.neutrality_assessment}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
