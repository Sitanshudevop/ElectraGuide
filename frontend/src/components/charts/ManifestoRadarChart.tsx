'use client';
import { useEffect, useRef } from 'react';

const DIMENSIONS = [
  'Economy',
  'Healthcare',
  'Education',
  'Environment',
  'Governance',
];

const PARTY_DATA = [
  {
    name: 'TMC',
    color: '#16a34a',
    values: [78, 62, 70, 55, 68],
  },
  {
    name: 'BJP',
    color: '#f97316',
    values: [72, 68, 75, 50, 74],
  },
];

/**
 * Converts polar coordinates to cartesian (SVG) coordinates.
 */
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

/**
 * Builds an SVG polygon path string from data values.
 */
function buildPath(values: number[], cx: number, cy: number, maxR: number) {
  const step = 360 / values.length;
  return (
    values
      .map((v, i) => {
        const r = (v / 100) * maxR;
        const { x, y } = polarToCartesian(cx, cy, r, i * step);
        return `${i === 0 ? 'M' : 'L'}${x},${y}`;
      })
      .join(' ') + ' Z'
  );
}

/**
 * A custom SVG-based radar/spider chart comparing parties across 5 policy dimensions.
 * Google Charts does not support radar charts, so this is rendered as a pure SVG.
 *
 * @returns {JSX.Element}
 */
export default function ManifestoRadarChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const cx = 200;
  const cy = 200;
  const maxR = 150;
  const rings = [0.2, 0.4, 0.6, 0.8, 1.0];
  const step = 360 / DIMENSIONS.length;

  useEffect(() => {
    // Animate polygon paths on mount
    const svg = svgRef.current;
    if (!svg) return;
    const paths = svg.querySelectorAll('.radar-path');
    paths.forEach((path) => {
      const el = path as SVGPathElement;
      const length = el.getTotalLength();
      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = `${length}`;
      el.style.transition = 'stroke-dashoffset 1.2s ease-out';
      requestAnimationFrame(() => {
        el.style.strokeDashoffset = '0';
      });
    });
  }, []);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
        <span aria-hidden="true">🕸️</span> Policy Dimension Comparison
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Radar chart comparing party positions across 5 key sectors (scores out
        of 100)
      </p>

      <div className="flex justify-center">
        <svg
          ref={svgRef}
          viewBox="0 0 400 400"
          className="w-full max-w-md"
          aria-label="Radar chart comparing TMC and BJP across policy dimensions"
        >
          {/* Concentric ring grid */}
          {rings.map((scale) => (
            <polygon
              key={scale}
              points={DIMENSIONS.map((_, i) => {
                const { x, y } = polarToCartesian(
                  cx,
                  cy,
                  maxR * scale,
                  i * step
                );
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="0.5"
              opacity="0.4"
            />
          ))}

          {/* Axis lines */}
          {DIMENSIONS.map((dim, i) => {
            const { x, y } = polarToCartesian(cx, cy, maxR, i * step);
            return (
              <g key={dim}>
                <line
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke="#94a3b8"
                  strokeWidth="0.5"
                  opacity="0.4"
                />
                {/* Labels */}
                <text
                  x={polarToCartesian(cx, cy, maxR + 20, i * step).x}
                  y={polarToCartesian(cx, cy, maxR + 20, i * step).y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-600 dark:fill-slate-300"
                  fontSize="11"
                  fontWeight="600"
                >
                  {dim}
                </text>
              </g>
            );
          })}

          {/* Party polygons */}
          {PARTY_DATA.map((party) => (
            <path
              key={party.name}
              className="radar-path"
              d={buildPath(party.values, cx, cy, maxR)}
              fill={party.color}
              fillOpacity="0.15"
              stroke={party.color}
              strokeWidth="2.5"
            />
          ))}

          {/* Data point dots */}
          {PARTY_DATA.map((party) =>
            party.values.map((v, i) => {
              const r = (v / 100) * maxR;
              const { x, y } = polarToCartesian(cx, cy, r, i * step);
              return (
                <circle
                  key={`${party.name}-${i}`}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={party.color}
                  stroke="white"
                  strokeWidth="1.5"
                />
              );
            })
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mt-4">
        {PARTY_DATA.map((party) => (
          <div key={party.name} className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: party.color }}
            ></span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {party.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
