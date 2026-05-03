'use client';
import PropTypes from 'prop-types';
import React from 'react';

interface LeaderboardEntry {
  id: string;
  score: number;
  total: number;
  sessionId: string;
}

interface QuizLeaderboardProps {
  leaderboard: LeaderboardEntry[];
}

export default function QuizLeaderboard({ leaderboard }: QuizLeaderboardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        🏆 Top 5 Scores
      </h2>
      {leaderboard.length > 0 ? (
        <div className="space-y-4">
          {leaderboard.map((entry, idx) => (
            <div
              key={entry.id}
              className="flex justify-between items-center p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
            >
              <div className="flex items-center gap-4">
                <span className="font-bold text-lg text-slate-400">
                  #{idx + 1}
                </span>
                <span className="font-mono text-sm text-slate-600 dark:text-slate-300">
                  {entry.sessionId}
                </span>
              </div>
              <div className="font-bold text-civic-blue dark:text-blue-400">
                {entry.score} / {entry.total}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-500 italic">No scores yet. Be the first!</p>
      )}
    </div>
  );
}

QuizLeaderboard.propTypes = {
  leaderboard: PropTypes.array.isRequired,
};
