'use client';
import { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc, increment, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';

interface PollData {
  question: string;
  options: Record<string, number>;
}

const FALLBACK_POLL: PollData = {
  question: 'Do you plan to vote in the next election?',
  options: { Yes: 0, No: 0, Undecided: 0 },
};

/**
 * A realtime Community Pulse poll powered by Firestore onSnapshot.
 * Stores votes in Firestore collection "polls" and updates live.
 *
 * @returns {JSX.Element}
 */
export default function CommunityPoll() {
  const [poll, setPoll] = useState<PollData>(FALLBACK_POLL);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const vote = sessionStorage.getItem('electraguide_poll_voted');
      if (vote) {
        setHasVoted(true);
        setSelectedOption(vote);
      }
    }
  }, []);

  useEffect(() => {
    if (!db) return;

    const unsubscribe = onSnapshot(
      doc(db, 'polls', 'community_pulse'),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPoll({
            question: data.question || FALLBACK_POLL.question,
            options: data.options || FALLBACK_POLL.options,
          });
        }
      },
      (error) => {
        console.error('Poll snapshot error (unsubscribing):', error);
        unsubscribe(); // Stop listening to prevent infinite log spam if DB is missing
      }
    );

    return () => unsubscribe();
  }, []);

  const handleVote = async (option: string) => {
    if (hasVoted || !db) return;

    try {
      await setDoc(doc(db, 'polls', 'community_pulse'), {
        [`options.${option}`]: increment(1),
      }, { merge: true });
      setHasVoted(true);
      setSelectedOption(option);
      sessionStorage.setItem('electraguide_poll_voted', option);
    } catch (error) {
      console.error('Vote error:', error);
    }
  };

  const totalVotes = Object.values(poll.options).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full mb-12 bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl" aria-hidden="true">
          📊
        </span>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Community Pulse
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Live · {totalVotes} vote{totalVotes !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6">
        {poll.question}
      </p>

      <div className="space-y-3">
        {Object.entries(poll.options).map(([option, count]) => {
          const percentage =
            totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
          const isSelected = selectedOption === option;

          return (
            <button
              key={option}
              onClick={() => handleVote(option)}
              disabled={hasVoted}
              className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all relative overflow-hidden ${
                isSelected
                  ? 'border-civic-blue bg-blue-50 dark:bg-blue-900/30'
                  : hasVoted
                    ? 'border-slate-200 dark:border-slate-700 cursor-default'
                    : 'border-slate-200 dark:border-slate-700 hover:border-civic-saffron hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {/* Progress bar background */}
              {hasVoted && (
                <div
                  className="absolute inset-y-0 left-0 bg-civic-blue/10 dark:bg-civic-blue/20 transition-all duration-700 rounded-xl"
                  style={{ width: `${percentage}%` }}
                />
              )}
              <div className="relative flex justify-between items-center">
                <span className="text-slate-700 dark:text-slate-300">
                  {option}
                  {isSelected && (
                    <span className="ml-2 text-civic-blue text-xs font-bold">
                      ✓ Your vote
                    </span>
                  )}
                </span>
                {hasVoted && (
                  <span className="font-mono font-bold text-sm text-slate-600 dark:text-slate-400">
                    {percentage}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {!hasVoted && (
        <p className="text-xs text-slate-400 mt-4 text-center">
          Your vote is anonymous and stored securely.
        </p>
      )}
    </div>
  );
}
