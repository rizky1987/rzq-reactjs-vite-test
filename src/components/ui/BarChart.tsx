"use client";

import { useEffect, useRef } from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'danger' | 'success' | 'warning';
  labels: string[];
  data: number[];
  title: string;
}

const BarChart = ({ variant = 'primary', title, labels, data, className, ...props }: BarChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const colors = {
    primary: '#3b82f6',
    danger: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
  };

  useEffect(() => {
    Chart.register(
      CategoryScale,
      LinearScale,
      BarElement,
      BarController,
      Title,
      Tooltip,
      Legend
    );

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: title,
              data: data,
              backgroundColor: colors[variant],
              borderRadius: 4,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            },
            scales: {
              x: { 
                type: 'category', 
                grid: { display: false } 
              },
              y: { 
                beginAtZero: true,
                ticks: { precision: 0 }
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [labels, data, variant, title]); 

  return (
    <div 
      className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${className || ''}`}
      {...props}
    >
      <h3 className="font-bold text-gray-700 mb-4">{title}</h3>
      <div className="h-64">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default BarChart;