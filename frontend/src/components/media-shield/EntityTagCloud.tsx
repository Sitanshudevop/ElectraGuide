'use client';
import PropTypes from 'prop-types';
import type { EntityResult } from '@/services/nlpService';

interface EntityTagCloudProps {
  entities: EntityResult[];
}

const TYPE_STYLES: Record<
  string,
  { bg: string; border: string; icon: string }
> = {
  PERSON: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-300 dark:border-purple-700',
    icon: '👤',
  },
  ORGANIZATION: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-300 dark:border-blue-700',
    icon: '🏢',
  },
  LOCATION: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-300 dark:border-green-700',
    icon: '📍',
  },
  EVENT: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-300 dark:border-amber-700',
    icon: '📅',
  },
};

/**
 * Renders extracted entities as a styled tag cloud grouped by type.
 *
 * @param {EntityTagCloudProps} props
 * @returns {JSX.Element}
 */
export default function EntityTagCloud({ entities }: EntityTagCloudProps) {
  if (entities.length === 0) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">
            Entity Extraction
          </h3>
          <span className="text-xs font-mono bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800">
            NL API
          </span>
        </div>
        <p className="text-slate-400 text-sm">
          No notable entities detected in this text.
        </p>
      </div>
    );
  }

  // Deduplicate by name
  const unique = entities.filter(
    (e, i, arr) => arr.findIndex((x) => x.name === e.name) === i
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">
          Entity Extraction
        </h3>
        <span className="text-xs font-mono bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800">
          NL API
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {unique.map((entity, idx) => {
          const style = TYPE_STYLES[entity.type] || TYPE_STYLES.EVENT;
          // Scale font size by salience (0.0 to 1.0)
          const fontSize = Math.max(12, Math.round(entity.salience * 20 + 12));

          return (
            <span
              key={`${entity.name}-${idx}`}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-medium transition-transform hover:scale-105 ${style.bg} ${style.border}`}
              style={{ fontSize: `${fontSize}px` }}
              title={`${entity.type} · Salience: ${(entity.salience * 100).toFixed(0)}%`}
            >
              <span aria-hidden="true">{style.icon}</span>
              <span className="text-slate-800 dark:text-slate-200">
                {entity.name}
              </span>
            </span>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
        {Object.entries(TYPE_STYLES).map(([type, style]) => (
          <div
            key={type}
            className="flex items-center gap-1 text-xs text-slate-500"
          >
            <span aria-hidden="true">{style.icon}</span>
            <span className="capitalize">{type.toLowerCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

EntityTagCloud.propTypes = {
  entities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      salience: PropTypes.number.isRequired,
    })
  ).isRequired,
};
