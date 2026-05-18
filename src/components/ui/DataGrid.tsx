"use client"; 

interface DataGridProps {
  title: string;
  columns: { key: string; label: string }[];
  data: any[]; 
}

const DataGrid = ({ title, columns, data }: DataGridProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h3 className="font-bold text-gray-800 text-lg tracking-tight">{title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">Manage and monitor your data entries</p>
        </div>
        <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-[10px] font-bold uppercase tracking-widest border border-gray-200">
          {data.length} Total Items
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-50/80 text-gray-500 text-[11px] uppercase tracking-[0.15em]">
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-4 font-bold border-b border-gray-100">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-gray-600 whitespace-nowrap group-hover:text-gray-900">
                      {/* Badge Logic yang Lebih Dinamis */}
                      {row[col.key] === 'Completed' || row[col.key] === 'Success' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                          {row[col.key]}
                        </span>
                      ) : row[col.key] === 'Pending' || row[col.key] === 'Waiting' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
                          {row[col.key]}
                        </span>
                      ) : (
                        <span className="font-medium">{row[col.key]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-400 italic">
                  No data available in this table.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-end">
        <div className="flex gap-2">
           <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30" disabled>
             <i className="fas fa-chevron-left text-xs"></i>
           </button>
           <button className="p-2 text-gray-400 hover:text-gray-600">
             <i className="fas fa-chevron-right text-xs"></i>
           </button>
        </div>
      </div>
    </div>
  );
};

export default DataGrid;