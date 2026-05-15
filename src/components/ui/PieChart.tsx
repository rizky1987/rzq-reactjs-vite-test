"use client";

import { useEffect, useRef } from 'react';
// Kita pakai library inti Chart.js langsung untuk kestabilan maksimal
import {
  Chart,
  ArcElement,
  PieController, // Wajib ada untuk render manual Pie Chart
  Tooltip,
  Legend,
  Title
} from 'chart.js';

interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  labels: string[];
  data: number[];
  title: string;
}

const PieChart = ({ title, labels, data, className, ...props }: PieChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const dashboardColors = [
    '#3b82f6', '#ef4444', '#f59e0b', '#22c55e', '#6366f1', 
    '#a855f7', '#ec4899', '#f97316', '#06b6d4', '#14b8a6', 
    '#10b981', '#84cc16', '#f43f5e', '#8b5cf6', '#0ea5e9', 
    '#d946ef', '#64748b', '#71717a', '#78350f', '#000000'
  ];

  useEffect(() => {
    // 1. Registrasi modul inti khusus Pie Chart di sisi klien
    Chart.register(
      ArcElement,
      PieController,
      Tooltip,
      Legend,
      Title
    );

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (ctx) {
        // 2. Hancurkan instance grafik lama jika ada sebelum re-render
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        // 3. Inisialisasi Pie Chart baru secara manual
        chartRef.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor: dashboardColors,
                borderWidth: 2,
                borderColor: '#ffffff',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom' as const,
                labels: {
                  usePointStyle: true,
                  padding: 20,
                  font: {
                    size: 11,
                  },
                },
              },
              tooltip: {
                padding: 12,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              },
            },
          },
        });
      }
    }

    // Cleanup saat komponen dicopot (unmount)
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [labels, data, title]); // Grafik akan di-update otomatis jika props berubah

  return (
    <div 
      className={`bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full ${className || ''}`}
      {...props}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 text-base sm:text-lg tracking-tight">
          {title}
        </h3>
        <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 uppercase tracking-widest font-semibold">
          Category Distribution
        </p>
      </div>

      {/* Chart Wrapper */}
      <div className="relative h-64 sm:h-72 lg:h-80 w-full flex justify-center items-center">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default PieChart;