import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCreditCard, FiDownload, FiEdit3, FiPlus, FiTrash2, FiCheck, FiX } = FiIcons;

const BillingSettings = () => {
  const [loading, setLoading] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);

  const currentPlan = {
    name: 'Professional',
    price: 79,
    billing: 'monthly',
    nextBilling: '2024-02-15',
    features: [
      'Unlimited products',
      'Advanced analytics',
      'Priority support',
      'Custom domain'
    ]
  };

  const paymentMethods = [
    {
      id: 1,
      type: 'visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: 2,
      type: 'mastercard',
      last4: '8888',
      expiryMonth: 8,
      expiryYear: 2024,
      isDefault: false
    }
  ];

  const billingHistory = [
    {
      id: 'inv_001',
      date: '2024-01-15',
      description: 'Professional Plan - Monthly',
      amount: 79.00,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'inv_002',
      date: '2023-12-15',
      description: 'Professional Plan - Monthly',
      amount: 79.00,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'inv_003',
      date: '2023-11-15',
      description: 'Starter Plan - Monthly',
      amount: 29.00,
      status: 'paid',
      downloadUrl: '#'
    }
  ];

  const handleSetDefault = async (cardId) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Default payment method updated');
    } catch (error) {
      toast.error('Failed to update payment method');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Payment method removed');
    } catch (error) {
      toast.error('Failed to remove payment method');
    } finally {
      setLoading(false);
    }
  };

  const getCardIcon = (type) => {
    switch (type) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      default:
        return '💳';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-success-600 bg-success-50';
      case 'pending':
        return 'text-warning-600 bg-warning-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
          <button className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100">
            Upgrade Plan
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <SafeIcon icon={FiCreditCard} className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">{currentPlan.name} Plan</h4>
                <p className="text-gray-600">
                  ${currentPlan.price}/{currentPlan.billing}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {currentPlan.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <SafeIcon icon={FiCheck} className="h-4 w-4 text-success-500 mr-2" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-3">Billing Information</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Next billing date:</span>
                <span className="font-medium text-gray-900">
                  {new Date(currentPlan.nextBilling).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium text-gray-900">${currentPlan.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Billing cycle:</span>
                <span className="font-medium text-gray-900 capitalize">{currentPlan.billing}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
          <button
            onClick={() => setShowAddCard(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
          >
            <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
            Add Payment Method
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 border rounded-lg ${
                card.isDefault ? 'border-primary-200 bg-primary-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getCardIcon(card.type)}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      •••• •••• •••• {card.last4}
                    </p>
                    <p className="text-xs text-gray-500">
                      Expires {card.expiryMonth}/{card.expiryYear}
                    </p>
                  </div>
                </div>

                {card.isDefault && (
                  <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                    Default
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {!card.isDefault && (
                  <button
                    onClick={() => handleSetDefault(card.id)}
                    disabled={loading}
                    className="px-3 py-1 text-xs font-medium text-primary-600 hover:bg-primary-50 rounded"
                  >
                    Set as Default
                  </button>
                )}
                <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded">
                  <SafeIcon icon={FiEdit3} className="h-3 w-3 mr-1 inline" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCard(card.id)}
                  disabled={loading || card.isDefault}
                  className="px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                >
                  <SafeIcon icon={FiTrash2} className="h-3 w-3 mr-1 inline" />
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Card Form */}
        {showAddCard && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Add New Payment Method</h4>
              <button
                onClick={() => setShowAddCard(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiX} className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowAddCard(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
                Add Card
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Download All
          </button>
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {billingHistory.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{invoice.description}</div>
                    <div className="text-sm text-gray-500">Invoice #{invoice.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium">
                      <SafeIcon icon={FiDownload} className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Billing Address */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              defaultValue="Acme Corporation"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax ID
            </label>
            <input
              type="text"
              defaultValue="12-3456789"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              defaultValue="123 Business Street"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              defaultValue="New York"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
            Update Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;