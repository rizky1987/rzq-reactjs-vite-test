"use client";

import dynamic from 'next/dynamic';

export const BarChart = dynamic(() => import('@/components/ui/BarChart'), { 
  ssr: false,
  loading: () => typeof window !== 'undefined' ? null : null
});

export const SummaryCard = dynamic(() => import('@/components/ui/SummaryCard'), { 
  ssr: false,
});

export const PieChart = dynamic(() => import('@/components/ui/PieChart'), { 
  ssr: false,
});

export const DataGrid = dynamic(() => import('@/components/ui/DataGrid'), { 
  ssr: false,
});

// 2. Custom Hook utama untuk memanajemen Logika & Data
export function useDashboard() {
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

  const salesReport = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [12, 19, 3, 5, 2, 3]
  };

  const productCategories = {
    labels: ['Electronics', 'Fashion', 'Groceries'],
    data: [40, 30, 35]
  };

  // Di sini kamu bisa menambahkan fungsi fetch API, state filter, dll. di masa depan

  return {
    transactionColumns,
    transactionData,
    salesReport,
    productCategories
  };
}