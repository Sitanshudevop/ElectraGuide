'use client';
import Link from 'next/link';
import { useState } from 'react';

const QUIZ_QUESTIONS = [
  {
    q: "Which democracy uses the 'Summary Revision' process for voter roll maintenance?",
    options: ["USA", "India", "UK", "Australia"],
    ans: 1
  },
  {
    q: "In the M3-EVM protocol, how long is the VVPAT slip visible to the voter?",
    options: ["5 seconds", "10 seconds", "7 seconds", "15 seconds"],
    ans: 2
  },
  {
    q: "What form is required to object to a name on the electoral roll in India?",
    options: ["Form 6", "Form 7", "Form 8", "Form 9"],
    ans: 1
  }
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const handleNext = () => {
    if (selected === QUIZ_QUESTIONS[current].ans) setScore(score + 1);
    setSelected(null);
    if (current + 1 < QUIZ_QUESTIONS.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link href="/" className="inline-flex items-center text-civic-blue dark:text-blue-400 hover:underline mb-8 font-medium focus:ring-2 focus:ring-civic-blue rounded-md px-2 py-1">
        ← Back to Dashboard
      </Link>
      
      <div className="flex items-center gap-4 mb-8">
        <span className="text-4xl" aria-hidden="true">🧠</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Electoral <span className="text-pink-500">Knowledge Quiz</span>
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
        {finished ? (
          <div className="text-center py-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Quiz Complete!</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              You scored <span className="font-bold text-civic-blue dark:text-blue-400">{score}</span> out of {QUIZ_QUESTIONS.length}.
            </p>
            <button onClick={() => { setCurrent(0); setScore(0); setFinished(false); }} className="mt-8 bg-civic-saffron text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition-colors">
              Retake Quiz
            </button>
          </div>
        ) : (
          <div>
            <p className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">
              Question {current + 1} of {QUIZ_QUESTIONS.length}
            </p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              {QUIZ_QUESTIONS[current].q}
            </h2>
            <div className="space-y-3">
              {QUIZ_QUESTIONS[current].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelected(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all ${
                    selected === idx 
                      ? 'border-civic-blue bg-blue-50 dark:bg-blue-900/30 text-civic-blue dark:text-blue-300' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-civic-saffron hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="mt-8 text-right">
              <button 
                disabled={selected === null}
                onClick={handleNext} 
                className="bg-civic-blue text-white font-bold py-3 px-8 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                {current === QUIZ_QUESTIONS.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
