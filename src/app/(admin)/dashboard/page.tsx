"use client";

import { 
  useDashboard, 
  SummaryCard, 
  BarChart, 
  PieChart, 
  DataGrid 
} from './useDashboard';

export default function Dashboard() {
  // Panggil data dan fungsi dari custom hook kita
  const { 
    transactionColumns, 
    transactionData, 
    salesReport, 
    productCategories 
  } = useDashboard();

  return (
    <main>
      <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

        {/* Section: Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            <SummaryCard
              variant='success'
              title='Total Revenue'
              summary='$24,500'
              description='↑ 12%'
            />

            <SummaryCard
              variant='primary'
              title='Active Users'
              summary='1,240'
              description='↑ 10%'
            />

            <SummaryCard
              variant='warning'
              title='Total Orders'
              summary='456'
              description='↓ 2%'
            />
        </div>

        {/* Section: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <BarChart 
                variant='primary'
                title='Monthly Sales Report'
                labels={salesReport.labels}
                data={salesReport.data}
              />
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <PieChart 
                title='Product Categories'
                labels={productCategories.labels}
                data={productCategories.data}
              />
            </div>
        </div>

        {/* Section: Data Table */}
        <div className="w-full overflow-hidden bg-white rounded-xl shadow-sm">
          <DataGrid 
            title="Transaksi Terbaru"
            columns={transactionColumns}
            data={transactionData}
          />   
        </div>
      </div>
    </main>
  );
}