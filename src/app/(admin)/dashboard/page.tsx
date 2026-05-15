"use client";
import dynamic from 'next/dynamic';

const BarChart = dynamic(() => import('@/components/ui/BarChart'), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" /> 
});

const SummaryCard = dynamic(() => import('@/components/ui/SummaryCard'), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" /> 
});

const PieChart = dynamic(() => import('@/components/ui/PieChart'), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" /> 
});

const DataGrid = dynamic(() => import('@/components/ui/DataGrid'), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" /> 
});

export default function Dashboard() {

  const transactionColumns = [
    { key: 'customer', label: 'Customer' },
    { key: 'product', label: 'Product' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
  ];

  const transactionData = [
    { customer: 'Rizky Dev', product: 'MacBook Pro M3', amount: '$2,499', status: 'Completed' },
    { customer: 'Sarah Connor', product: 'iPhone 15 Pro', amount: '$999', status: 'Pending' },
    { customer: 'Budi Utomo', product: 'Logitech MX Master', amount: '$99', status: 'Completed' },
  ];
  return (
    <main>
        {/* Container Utama: Mengatur padding agar lebih kecil di mobile (p-4) dan besar di desktop (p-6) */}
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
          
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

          {/* 1. Stats Cards (Grid Kecil) 
              - grid-cols-1: 1 kolom di mobile
              - sm:grid-cols-2: 2 kolom di tablet kecil
              - lg:grid-cols-3: 3 kolom di layar lebar
          */}
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

          {/* 2. Charts Section (Grid Grafik)
              - grid-cols-1: Di mobile grafik bertumpuk ke bawah
              - lg:grid-cols-2: Di layar besar grafik bersampingan
          */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <BarChart 
                    variant='primary'
                    title='Monthly Sales Report'
                    labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
                    data={[12, 19, 3, 5, 2, 3]}
                />
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm">
                <PieChart 
                  title='Product Categories'
                  labels={['Electronics', 'Fashion', 'Groceries']}
                  data={[40, 30, 35]}
                />
              </div>
          </div>

          {/* 3. Data Grid (Tabel)
              - Menggunakan overflow-x-auto di dalam komponen DataGrid sangat penting 
                agar tabel bisa di-swipe ke samping di HP tanpa merusak layout.
          */}
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