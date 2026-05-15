interface SummaryCardProps {
  variant?: 'primary' | 'danger' | 'success' | 'warning';
  title: string;
  summary: string;
  description: string;
  icon?: React.ReactNode; // Tambahan untuk icon agar lebih visual
}

const SummaryCard = ({ 
  variant = 'primary', 
  title, 
  summary, 
  description, 
  icon 
}: SummaryCardProps) => {
  
  const variantStyles = {
    primary: {
      text: 'text-blue-600',
      bg: 'bg-blue-50',
      icon: 'text-blue-500',
      border: 'border-blue-100'
    },
    danger: {
      text: 'text-red-600',
      bg: 'bg-red-50',
      icon: 'text-red-500',
      border: 'border-red-100'
    },
    success: {
      text: 'text-green-600',
      bg: 'bg-green-50',
      icon: 'text-green-500',
      border: 'border-green-100'
    },
    warning: {
      text: 'text-yellow-600',
      bg: 'bg-yellow-50',
      icon: 'text-yellow-500',
      border: 'border-yellow-100'
    },
  };

  const style = variantStyles[variant];

  return (
    <div className="group w-full h-full bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        {/* Label & Title */}
        <div className="space-y-1">
          <p className="text-[10px] sm:text-xs text-gray-400 uppercase font-extrabold tracking-widest">
            {title}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
            {summary}
          </h2>
        </div>

        {/* Icon Container (Opsional) */}
        {icon && (
          <div className={`p-2.5 rounded-xl ${style.bg} ${style.icon} transition-transform group-hover:scale-110`}>
            {icon}
          </div>
        )}
      </div>

      {/* Description / Trend Indicator */}
      <div className="flex items-center gap-1.5">
        <div className={`flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold ${style.bg} ${style.text} border ${style.border}`}>
          {description}
        </div>
        <span className="text-[10px] sm:text-xs text-gray-400 font-medium">
          since last month
        </span>
      </div>
    </div>
  );
};

export default SummaryCard;