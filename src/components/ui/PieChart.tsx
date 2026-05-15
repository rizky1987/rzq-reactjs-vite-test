import { Pie } from 'react-chartjs-2';

interface PieChartProps {
  labels: string[];
  data: number[];
  title: string;
}

const PieChart = ({ title, labels, data }: PieChartProps) => {
  
  const dashboardColors = [
    '#3b82f6', '#ef4444', '#f59e0b', '#22c55e', '#6366f1', 
    '#a855f7', '#ec4899', '#f97316', '#06b6d4', '#14b8a6', 
    '#10b981', '#84cc16', '#f43f5e', '#8b5cf6', '#0ea5e9', 
    '#d946ef', '#64748b', '#71717a', '#78350f', '#000000'
  ];

  const pieData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: dashboardColors,
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const options = {
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
      }
    },
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      {/* Header: Ukuran teks adaptif */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 text-base sm:text-lg tracking-tight">
          {title}
        </h3>
        <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 uppercase tracking-widest font-semibold">
          Category Distribution
        </p>
      </div>

      {/* Chart Wrapper: Tinggi responsif 
          - h-64 (256px) di mobile agar tidak memakan layar
          - sm:h-72 (288px) di layar sedang
          - lg:h-80 (320px) di layar besar
      */}
      <div className="relative h-64 sm:h-72 lg:h-80 w-full flex justify-center items-center">
        <Pie data={pieData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;