'use client';
import { useEffect, useRef, useCallback } from 'react';
import Script from 'next/script';
import PropTypes from 'prop-types';

interface QuizPieChartProps {
  score: number;
  total: number;
}

/**
 * A Google Charts pie chart showing correct vs incorrect answers.
 * Displayed on the quiz results screen after completion.
 *
 * @param {QuizPieChartProps} props
 * @param {number} props.score - The number of correct answers.
 * @param {number} props.total - The total number of questions.
 * @returns {JSX.Element}
 */
export default function QuizPieChart({ score, total }: QuizPieChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const googleRef = useRef<typeof google | null>(null);

  const drawChart = useCallback(() => {
    if (!googleRef.current || !chartRef.current) return;
    const g = googleRef.current;

    const dataTable = g.visualization.arrayToDataTable([
      ['Category', 'Count'],
      ['Correct', score],
      ['Incorrect', total - score],
    ]);

    const chart = new g.visualization.PieChart(chartRef.current);
    chart.draw(dataTable, {
      title: 'Your Quiz Performance',
      titleTextStyle: { fontSize: 14, bold: true },
      colors: ['#22c55e', '#ef4444'],
      backgroundColor: 'transparent',
      chartArea: { width: '90%', height: '80%' },
      pieHole: 0.4,
      legend: { position: 'bottom', textStyle: { fontSize: 12 } },
      animation: { startup: true, duration: 1000, easing: 'out' },
      pieSliceTextStyle: { fontSize: 14, bold: true },
    });
  }, [score, total]);

  const handleGoogleLoad = useCallback(() => {
    const g = (window as Window & { google?: typeof google }).google;
    if (!g) return;
    g.charts.load('current', { packages: ['corechart'] });
    g.charts.setOnLoadCallback(() => {
      googleRef.current = g;
      drawChart();
    });
  }, [drawChart]);

  // Redraw if Google Charts is already loaded (e.g., on retake)
  useEffect(() => {
    if (googleRef.current) {
      drawChart();
    }
  }, [drawChart]);

  return (
    <div className="mt-6">
      <Script
        src="https://www.gstatic.com/charts/loader.js"
        strategy="afterInteractive"
        onLoad={handleGoogleLoad}
      />
      <div
        ref={chartRef}
        className="w-full h-[280px]"
        role="img"
        aria-label={`Pie chart: ${score} correct, ${total - score} incorrect`}
      />
    </div>
  );
}

QuizPieChart.propTypes = {
  score: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
