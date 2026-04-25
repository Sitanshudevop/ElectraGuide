'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function MediaShield() {
  const { isSimpleMode } = useLanguage();
  
  // Live Auditor States
  const [urlInput, setUrlInput] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);
  
  // Guardrail State
  const [showRationale, setShowRationale] = useState(false);

  // PDF Export Ref
  const scorecardRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;
    
    setIsAuditing(true);
    setAuditComplete(false);
    setShowRationale(false);
    setIsScanning(false);

    // Simulate 3 second reasoning loop
    setTimeout(() => {
      setIsAuditing(false);
      setAuditComplete(true);
    }, 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsScanning(true);
    setAuditComplete(false);
    setShowRationale(false);
    setIsAuditing(false);

    // Simulate OCR delay
    setTimeout(() => {
      setIsScanning(false);
      setIsAuditing(true);
      
      // Then chain to Audit
      setTimeout(() => {
        setIsAuditing(false);
        setAuditComplete(true);
      }, 3000);
    }, 2000);
  };

  const handleDownloadPDF = async () => {
    if (!scorecardRef.current) return;
    try {
      const canvas = await html2canvas(scorecardRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('VoxAgent_Audit_Report.pdf');
    } catch (err) {
      console.error("Failed to generate PDF", err);
    }
  };

  return (
    <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link href="/" className="inline-flex items-center text-civic-blue dark:text-blue-400 hover:underline mb-8 font-medium focus:ring-2 focus:ring-civic-blue rounded-md px-2 py-1">
        ← Back to Dashboard
      </Link>
      
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl" aria-hidden="true">🛡️</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Media <span className="text-indigo-600">Shield</span> Live Auditor
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">
        {isSimpleMode 
          ? "Check news articles or upload a screenshot to see if they use fair language and verified facts."
          : "Live analysis of media headlines. The VoxAgent Unbiased Reasoning Loop detects proxy variables and loaded language in real-time."
        }
      </p>

      {/* Inputs Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Scraper Input Form */}
        <form onSubmit={handleAnalyze} className="bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col justify-center">
          <div className="flex px-2 py-2">
             <input 
               type="url" 
               placeholder="Paste article URL here..."
               value={urlInput}
               onChange={(e) => setUrlInput(e.target.value)}
               className="flex-1 px-4 py-3 rounded-l-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200 outline-none"
             />
             <button 
               type="submit" 
               disabled={isAuditing || isScanning}
               className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-r-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
             >
               Analyze
             </button>
          </div>
        </form>

        {/* OCR Image Upload */}
        <div className="bg-slate-100 dark:bg-slate-900 border-2 border-dashed border-indigo-300 dark:border-indigo-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors relative">
           <input 
              type="file" 
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Upload screenshot for analysis"
           />
           <span className="text-3xl mb-2" aria-hidden="true">📸</span>
           <h3 className="font-bold text-slate-800 dark:text-slate-200">
              {isSimpleMode ? "Upload a Screenshot" : "Live Audit OCR Upload"}
           </h3>
           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Drag & drop or click to upload an image of a news article.
           </p>
        </div>
      </div>

      {/* OCR Scanning State */}
      {isScanning && (
        <div className="bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500 p-6 rounded-r-2xl mb-8 flex items-center gap-4 animate-pulse">
           <span className="text-3xl animate-bounce" aria-hidden="true">👁️</span>
           <div>
              <h3 className="font-bold text-indigo-800 dark:text-indigo-200">vision_agent parsing...</h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">Extracting text from image via OCR.</p>
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
            &gt; Running bias_audit_protocol... mapping lexicons...
          </div>
        </div>
      )}

      {/* Live Audit Results */}
      {auditComplete && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
          
          <div className="flex justify-end mb-4">
             <button 
               onClick={handleDownloadPDF}
               className="bg-civic-blue text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
             >
               <span aria-hidden="true">📄</span> {isSimpleMode ? "Download Report" : "Download Audit Report (PDF)"}
             </button>
          </div>

          {/* Wrap the section in a ref for PDF capture */}
          <section ref={scorecardRef} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-t-8 border-orange-500 overflow-hidden flex flex-col">
            <div className="bg-slate-100 dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <span aria-hidden="true">📰</span> Live Source: April 25, 2026 Feed
              </span>
              <span className="text-xs font-mono bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-300 px-2 py-1 rounded">
                audit_id: vox-live-99x2
              </span>
            </div>
            
            <div className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                "Supreme Court Refuses to Stay West Bengal Electoral Purges Amidst Phase II Tensions"
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-8">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 text-center">
                  <p className="text-sm text-slate-500 mb-1">Neutrality Score</p>
                  <p className="text-3xl font-mono font-bold text-orange-500">62/100</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 text-center">
                  <p className="text-sm text-slate-500 mb-1">Evidence Coverage</p>
                  <p className="text-3xl font-mono font-bold text-green-600">90%</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 text-center">
                  <p className="text-sm text-slate-500 mb-1">Loaded Language</p>
                  <p className="text-3xl font-mono font-bold text-red-600">High</p>
                </div>
              </div>

              {/* Guardrail CoT Disclosure */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-6" data-html2canvas-ignore>
                <button 
                  onClick={() => setShowRationale(!showRationale)}
                  className="bg-slate-800 dark:bg-slate-700 text-white font-bold py-2 px-6 rounded hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
                >
                  <span aria-hidden="true">🔍</span> {showRationale ? 'Hide Rationale' : 'Show Rationale (CoT)'}
                </button>

                {showRationale && (
                  <div className="mt-4 p-5 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-r-lg">
                    <p className="font-bold text-red-800 dark:text-red-400 mb-2 flex items-center gap-2">
                      <span aria-hidden="true">🛑</span> GUARDRAIL ENFORCEMENT: System Refusal
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm mb-4 italic">
                      "I cannot reveal internal chain-of-thought or raw deliberation traces as per the bias_audit_protocol. However, I can provide the following concise rationale for the scoring:"
                    </p>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded border border-slate-200 dark:border-slate-700">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Concise Rationale:</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        The article accurately cites the April 25, 2026 Supreme Court ruling regarding the Special Intensive Revision (SIR), resulting in high evidence coverage. However, the neutrality score is reduced due to the use of the loaded term "purges" instead of the statutory "deletions." This emotive framing triggers the remediation threshold.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
