'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { generateSessionId } from '@/utils/helpers';
import { traceAsync } from '@/services/perfService';
import QuizActive from '@/components/quiz/QuizActive';
import QuizComplete from '@/components/quiz/QuizComplete';
import QuizLeaderboard from '@/components/quiz/QuizLeaderboard';

const QUIZ_QUESTIONS = [
  {
    q: "Which democracy uses the 'Summary Revision' process for voter roll maintenance?",
    options: ['USA', 'India', 'UK', 'Australia'],
    ans: 1,
  },
  {
    q: 'In the M3-EVM protocol, how long is the VVPAT slip visible to the voter?',
    options: ['5 seconds', '10 seconds', '7 seconds', '15 seconds'],
    ans: 2,
  },
  {
    q: 'What form is required to object to a name on the electoral roll in India?',
    options: ['Form 6', 'Form 7', 'Form 8', 'Form 9'],
    ans: 1,
  },
];

interface LeaderboardEntry {
  id: string;
  score: number;
  total: number;
  sessionId: string;
}

/**
 * The Quiz page.
 * Tests user knowledge on electoral processes and saves scores to Firebase Firestore.
 *
 * @returns {JSX.Element} The rendered Quiz component.
 */
export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  /**
   * Fetches the top 5 quiz scores from the Firestore leaderboard.
   * Defined as a standalone async function so it can be re-called after a score save.
   *
   * @returns {Promise<void>} Resolves when the leaderboard is fetched and set in state.
   */
  const fetchLeaderboard = async () => {
    if (!db) return;
    try {
      await traceAsync('firestore_quiz_leaderboard', async () => {
        const q = query(
          collection(db!, 'quiz_results'),
          orderBy('score', 'desc'),
          limit(5)
        );
        const querySnapshot = await getDocs(q);
        const scores: LeaderboardEntry[] = [];
        querySnapshot.forEach((doc) => {
          scores.push({ id: doc.id, ...doc.data() } as LeaderboardEntry);
        });
        setLeaderboard(scores);
      });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  useEffect(() => {
    const loadLeaderboard = async () => {
      await fetchLeaderboard();
    };
    void loadLeaderboard();
    // fetchLeaderboard is stable — defined outside effect to allow re-use after score save
  }, []);

  /**
   * Saves the user's quiz score to Firestore and updates the leaderboard.
   *
   * @param {number} finalScore - The user's final score.
   * @returns {Promise<void>} Resolves when the score is successfully saved.
   */
  const saveScore = async (finalScore: number) => {
    if (!db) return;
    setIsSaving(true);
    setSaveMessage('');
    try {
      const sessionId = generateSessionId();
      await addDoc(collection(db, 'quiz_results'), {
        score: finalScore,
        total: QUIZ_QUESTIONS.length,
        sessionId,
        timestamp: serverTimestamp(),
      });
      setSaveMessage('Score saved successfully!');
      void fetchLeaderboard();
    } catch (error) {
      console.error('Error saving score:', error);
      setSaveMessage('Failed to save score.');
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Handles progressing to the next question or finishing the quiz.
   *
   * @returns {void}
   */
  const handleNext = async () => {
    let newScore = score;
    if (selected === QUIZ_QUESTIONS[current].ans) {
      newScore = score + 1;
      setScore(newScore);
    }
    setSelected(null);
    if (current + 1 < QUIZ_QUESTIONS.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
      await saveScore(newScore);
    }
  };

  const handleRetake = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setSaveMessage('');
  };

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link
        href="/"
        className="inline-flex items-center text-civic-blue dark:text-blue-400 hover:underline mb-8 font-medium focus:ring-2 focus:ring-civic-blue rounded-md px-2 py-1"
      >
        ← Back to Dashboard
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-4xl" aria-hidden="true">
          🧠
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Electoral <span className="text-pink-500">Knowledge Quiz</span>
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 mb-8">
        {finished ? (
          <QuizComplete
            score={score}
            total={QUIZ_QUESTIONS.length}
            isSaving={isSaving}
            saveMessage={saveMessage}
            handleRetake={handleRetake}
          />
        ) : (
          <QuizActive
            current={current}
            total={QUIZ_QUESTIONS.length}
            question={QUIZ_QUESTIONS[current]}
            selected={selected}
            setSelected={setSelected}
            handleNext={handleNext}
          />
        )}
      </div>

      <QuizLeaderboard leaderboard={leaderboard} />
    </main>
  );
}
