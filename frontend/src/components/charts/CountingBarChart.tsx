'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * A bar chart showing live mock constituency-wise vote counts.
 */
export default function CountingBarChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [googleChartsLoaded, setGoogleChartsLoaded] = useState(false);

  useEffect(() => {
    if (!window.google) return;
    
    // Load the Visualization API and the corechart package.
    window.google.charts.load('current', { packages: ['corechart'] });
    window.google.charts.setOnLoadCallback(() => {
      setGoogleChartsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!googleChartsLoaded || !chartRef.current || !window.google) return;

    let timer: ReturnType<typeof setInterval>;

    const drawChart = () => {
      // Create data table
      const data = new window.google.visualization.DataTable();
      data.addColumn('string', 'Party');
      data.addColumn('number', 'Votes (Millions)');
      data.addColumn({ type: 'string', role: 'style' });

      // Initial mock data
      let partyA = 45;
      let partyB = 30;
      let partyC = 15;

      const updateData = () => {
        // Randomly increment votes to simulate live counting
        partyA += Math.random() * 2;
        partyB += Math.random() * 1.5;
        partyC += Math.random() * 1;

        data.removeRows(0, data.getNumberOfRows());
        data.addRows([
          ['Party A', partyA, 'color: #3b82f6'], // blue-500
          ['Party B', partyB, 'color: #ef4444'], // red-500
          ['Party C', partyC, 'color: #22c55e'], // green-500
        ]);

        const options = {
          title: 'Live National Vote Count',
          backgroundColor: 'transparent',
          chartArea: { width: '70%', height: '70%' },
          hAxis: {
            title: 'Total Votes (Millions)',
            minValue: 0,
            textStyle: { color: '#94a3b8' },
            titleTextStyle: { color: '#cbd5e1' },
            gridlines: { color: '#334155' },
          },
          vAxis: {
            textStyle: { color: '#cbd5e1' },
          },
          legend: { position: 'none' as const },
          animation: {
            duration: 1000,
            easing: 'out',
          },
          titleTextStyle: { color: '#f8fafc', fontSize: 16 },
        };

        const chart = new window.google.visualization.BarChart(chartRef.current!);
        chart.draw(data, options);
      };

      // Initial draw
      updateData();

      // Setup interval for live simulation
      timer = setInterval(updateData, 3000);
    };

    drawChart();

    return () => clearInterval(timer);
  }, [googleChartsLoaded]);

  return <div ref={chartRef} className="w-full h-96" />;
}
