import { useState } from 'react';

export const useDashboard = () => {
  const [salesReport] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [4000, 4500, 5100, 4900, 6200, 7500]
  });

  const [productCategories] = useState({
    labels: ['Electronics', 'Apparel', 'Footwear', 'Accessories'],
    data: [40, 25, 20, 15]
  });

  const [transactionColumns] = useState([
    { key: 'id', label: 'ID Transaksi' },
    { key: 'customer', label: 'Pelanggan' },
    { key: 'amount', label: 'Total' },
    { key: 'status', label: 'Status' }
  ]);

  const [transactionData] = useState([
    { id: 'TX-001', customer: 'Budi Santoso', amount: '$150.00', status: 'Success' },
    { id: 'TX-002', customer: 'Siti Rahma', amount: '$240.50', status: 'Pending' },
    { id: 'TX-003', customer: 'Randi Wijaya', amount: '$85.00', status: 'Success' },
  ]);

  return {
    salesReport,
    productCategories,
    transactionColumns,
    transactionData
  };
};