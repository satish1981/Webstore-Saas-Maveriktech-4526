import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiDownload, FiCreditCard, FiCheck, FiX, FiClock } = FiIcons;

const BillingHistory = () => {
  const [loading, setLoading] = useState(false);

  // Mock billing history data
  const billingHistory = [
    {
      id: 'inv_001',
      date: '2024-01-15',
      description: 'Professional Plan - Monthly',
      amount: 79.00,
      status: 'paid',
      invoiceUrl: '#',
      paymentMethod: '**** 4242'
    },
    {
      id: 'inv_002',
      date: '2023-12-15',
      description: 'Professional Plan - Monthly',
      amount: 79.00,
      status: 'paid',
      invoiceUrl: '#',
      paymentMethod: '**** 4242'
    },
    {
      id: 'inv_003',
      date: '2023-11-15',
      description: 'Starter Plan - Monthly',
      amount: 29.00,
      status: 'paid',
      invoiceUrl: '#',
      paymentMethod: '**** 4242'
    },
    {
      id: 'inv_004',
      date: '2023-10-15',
      description: 'Professional Plan - Monthly',
      amount: 79.00,
      status: 'failed',
      invoiceUrl: '#',
      paymentMethod: '**** 4242'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return FiCheck;
      case 'failed':
        return FiX;
      case 'pending':
        return FiClock;
      default:
        return FiClock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-success-600 bg-success-50';
      case 'failed':
        return 'text-danger-600 bg-danger-50';
      case 'pending':
        return 'text-warning-600 bg-warning-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const handleDownloadInvoice = async (invoiceId) => {
    setLoading(true);
    // Mock download - replace with actual implementation
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
        <p className="text-sm text-gray-600">View and download your invoices</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {billingHistory.map((invoice) => (
              <motion.tr
                key={invoice.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(invoice.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {invoice.description}
                    </div>
                    <div className="text-sm text-gray-500">
                      Invoice #{invoice.id}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  ${invoice.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(invoice.status)}`}>
                    <SafeIcon 
                      icon={getStatusIcon(invoice.status)} 
                      className="h-3 w-3 mr-1" 
                    />
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <SafeIcon icon={FiCreditCard} className="h-4 w-4 mr-2 text-gray-400" />
                    {invoice.paymentMethod}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDownloadInvoice(invoice.id)}
                    disabled={loading}
                    className="flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium disabled:opacity-50"
                  >
                    <SafeIcon icon={FiDownload} className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {billingHistory.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiCreditCard} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No billing history</h3>
          <p className="text-gray-600">Your billing history will appear here once you have transactions.</p>
        </div>
      )}
    </div>
  );
};

export default BillingHistory;