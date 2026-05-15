interface TitleProps {
  titleType?: 'danger' | 'primary' | 'default';
  title: string;
  subtitle?: string; // Tambahan opsional untuk deskripsi singkat
}

const Title = ({ titleType = 'primary', title, subtitle }: TitleProps) => {
  const types = {
    danger: 'bg-red-50 text-red-700 border-red-200',
    primary: 'bg-blue-600 text-white border-blue-700 shadow-sm',
    default: 'bg-gray-50 text-gray-700 border-gray-200'
  };

  return (
    <div className={`
      mb-6 p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all
      ${types[titleType]} 
    `}>
      <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-[0.2em]">
        {title}
      </h2>
      
      {subtitle && (
        <p className={`mt-1 text-[10px] sm:text-xs font-medium opacity-80 uppercase tracking-wider`}>
          {subtitle}
        </p>
      )}

    </div> 
  );
};

export default Title;