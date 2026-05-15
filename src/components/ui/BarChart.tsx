import { Bar } from 'react-chartjs-2';

interface BarChartProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'success' | 'warning';
  labels : string[];
  data : number[];
  title : string;
}

const BarChart = ({ variant = 'primary', title, labels, data }: BarChartProps) => {
  
  const variants = {
    primary: '#3b82f6',
    danger: '#ef4444', 
    success: '#22c55e',
    warning: '#f59e0b',
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: variants[variant], 
      },
    ],
  };

  return (
   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-700 mb-4">{title}</h3>
        <div className="h-64">
            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
    </div>
  );
};

export default BarChart;