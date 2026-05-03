'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { calculatePdfHeight } from '@/utils/helpers';
import { analyzeWithNLP, type NlpAnalysisResult } from '@/services/nlpService';
import { traceAsync } from '@/services/perfService';

import AuditorForm from '@/components/media-shield/AuditorForm';
import OcrUploader from '@/components/media-shield/OcrUploader';
import AuditResults from '@/components/media-shield/AuditResults';
import SentimentMeter from '@/components/media-shield/SentimentMeter';
import EntityTagCloud from '@/components/media-shield/EntityTagCloud';

interface AnalysisResult {
  bias_rating: string;
  loaded_phrases: string[];
  missing_context: string;
  credibility_score: number;
  summary: string;
}

/**
 * The Media Shield page.
 * Analyzes text using two Google AI services:
 * 1. Gemini AI for bias analysis and credibility scoring.
 * 2. Google Cloud Natural Language API for sentiment and entity extraction.
 *
 * @returns {JSX.Element} The rendered MediaShield component.
 */
export default function MediaShield() {
  const { isSimpleMode } = useLanguage();

  const [textInput, setTextInput] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [nlpResult, setNlpResult] = useState<NlpAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [showRationale, setShowRationale] = useState(false);
  const scorecardRef = useRef<HTMLDivElement>(null);

  /**
   * Submits text to both Gemini and NL API in parallel for comprehensive analysis.
   *
   * @param {React.FormEvent} [e] - Optional form event.
   * @returns {Promise<void>}
   */
  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!textInput.trim()) return;

    setIsAuditing(true);
    setAuditComplete(false);
    setShowRationale(false);
    setIsScanning(false);
    setErrorMessage('');
    setAnalysisResult(null);
    setNlpResult(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error(
          'Gemini API Key is missing. Please set NEXT_PUBLIC_GEMINI_API_KEY.'
        );
      }

      // Run Gemini and NL API in parallel with performance tracing
      const geminiPromise = traceAsync('gemini_media_shield', async () => {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-flash-latest',
          generationConfig: { responseMimeType: 'application/json' },
        });

        const systemPrompt = `You are a media bias analyzer. Analyze the given text for: 1) Political bias (left/center/right), 2) Loaded language or emotional manipulation, 3) Missing context, 4) Credibility signals. Return a structured JSON response with exactly these keys: "bias_rating" (string), "loaded_phrases" (array of strings), "missing_context" (string), "credibility_score" (number between 0-100), "summary" (string).`;

        const result = await model.generateContent(
          `${systemPrompt}\n\nText to analyze:\n${textInput}`
        );
        return JSON.parse(result.response.text()) as AnalysisResult;
      });

      const nlpPromise = traceAsync('nlp_media_shield', () =>
        analyzeWithNLP(textInput)
      ).catch((err) => {
        console.error('NLP analysis failed (non-blocking):', err);
        return null;
      });

      const [geminiResult, nlpData] = await Promise.all([
        geminiPromise,
        nlpPromise,
      ]);

      setAnalysisResult(geminiResult);
      setNlpResult(nlpData);
      setAuditComplete(true);
    } catch (err: unknown) {
      const error =
        err instanceof Error ? err : new Error('An unknown error occurred.');
      console.error('Analysis Error:', error);
      setErrorMessage(error.message || 'An error occurred during analysis.');
    } finally {
      setIsAuditing(false);
    }
  };

  /**
   * Handles simulated file upload and OCR text extraction.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The file input change event.
   */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setIsScanning(true);
    setAuditComplete(false);
    setShowRationale(false);
    setIsAuditing(false);
    setErrorMessage('');

    setTimeout(() => {
      setIsScanning(false);
      setTextInput(
        'Simulated OCR extracted text: "Local government plans to implement new zoning laws that will dramatically impact housing prices in suburban areas."'
      );
    }, 2000);
  };

  /**
   * Generates a PDF report of the analysis results.
   *
   * @returns {Promise<void>}
   */
  const handleDownloadPDF = async () => {
    if (!scorecardRef.current) return;
    try {
      const canvas = await html2canvas(scorecardRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = calculatePdfHeight(
        canvas.width,
        canvas.height,
        pdfWidth
      );

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('VoxAgent_Audit_Report.pdf');
    } catch (err) {
      console.error('Failed to generate PDF', err);
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
          🛡️
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Media <span className="text-indigo-600">Shield</span> Live Auditor
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
        {isSimpleMode
          ? 'Check news articles or upload a screenshot to see if they use fair language and verified facts.'
          : 'Dual AI analysis powered by Google Gemini (bias analysis) and Cloud Natural Language API (sentiment & entities).'}
      </p>

      {/* Service Badges */}
      <div className="flex flex-wrap gap-2 mb-10">
        <span className="text-xs font-mono bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
          🧠 Gemini 1.5 Flash — Bias Analysis
        </span>
        <span className="text-xs font-mono bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
          🔬 Cloud NL API — Sentiment &amp; Entities
        </span>
      </div>

      {/* Inputs Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <AuditorForm
          textInput={textInput}
          setTextInput={setTextInput}
          handleAnalyze={handleAnalyze}
          isAuditing={isAuditing}
          isScanning={isScanning}
          errorMessage={errorMessage}
        />
        <OcrUploader
          handleFileUpload={handleFileUpload}
          isSimpleMode={isSimpleMode}
        />
      </div>

      {/* OCR Scanning State */}
      {isScanning && (
        <div className="bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500 p-6 rounded-r-2xl mb-8 flex items-center gap-4 animate-pulse">
          <span className="text-3xl animate-bounce" aria-hidden="true">
            👁️
          </span>
          <div>
            <h3 className="font-bold text-indigo-800 dark:text-indigo-200">
              vision_agent parsing...
            </h3>
            <p className="text-sm text-indigo-600 dark:text-indigo-400">
              Extracting text from image via OCR.
            </p>
          </div>
        </div>
      )}

      {/* Skeleton Loading State */}
      {isAuditing && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 animate-pulse">
          <div className="flex items-center gap-4 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div className="w-12 h-12 bg-indigo-200 dark:bg-indigo-900 rounded-full"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-16 bg-slate-100 dark:bg-slate-900 rounded"></div>
              <div className="h-16 bg-slate-100 dark:bg-slate-900 rounded"></div>
              <div className="h-16 bg-slate-100 dark:bg-slate-900 rounded"></div>
            </div>
          </div>
          <div className="mt-6 text-center text-indigo-600 font-bold font-mono">
            &gt; Running dual AI analysis... Gemini + NL API...
          </div>
        </div>
      )}

      {/* NLP Results — Sentiment Meter + Entity Tag Cloud */}
      {auditComplete && nlpResult && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <SentimentMeter sentiment={nlpResult.sentiment} />
          <EntityTagCloud entities={nlpResult.entities} />
        </div>
      )}

      {/* Gemini Bias Analysis Results */}
      <AuditResults
        auditComplete={auditComplete}
        analysisResult={analysisResult}
        showRationale={showRationale}
        setShowRationale={setShowRationale}
        handleDownloadPDF={handleDownloadPDF}
        scorecardRef={scorecardRef}
        isSimpleMode={isSimpleMode}
      />
    </main>
  );
}
