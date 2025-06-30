import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSearch, FiFilter, FiEye, FiEdit3, FiDownload, FiMoreVertical, FiPackage, FiClock, FiCheck, FiTruck, FiX, FiRefreshCw } = FiIcons;

const OrderList = ({ searchTerm, statusFilter, dateFilter, onViewOrder, onEditOrder }) => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Mock order data - replace with actual API call
  const orders = [
    {
      id: '#ORD-001',
      customer: {
        name: 'John Smith',
        email: 'john@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      },
      items: [
        { name: 'Premium Course Bundle', quantity: 1, price: 199.00 }
      ],
      total: 199.00,
      status: 'completed',
      paymentStatus: 'paid',
      fulfillmentStatus: 'fulfilled',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T14:30:00Z',
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'US'
      },
      trackingNumber: 'TRK123456789'
    },
    {
      id: '#ORD-002',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face'
      },
      items: [
        { name: 'Digital Marketing Guide', quantity: 2, price: 49.00 }
      ],
      total: 98.00,
      status: 'processing',
      paymentStatus: 'paid',
      fulfillmentStatus: 'pending',
      createdAt: '2024-01-14T15:20:00Z',
      updatedAt: '2024-01-14T15:20:00Z'
    },
    {
      id: '#ORD-003',
      customer: {
        name: 'Mike Davis',
        email: 'mike@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
      },
      items: [
        { name: 'Design Templates Pack', quantity: 1, price: 29.00 },
        { name: 'Business Consultation', quantity: 1, price: 299.00 }
      ],
      total: 328.00,
      status: 'shipped',
      paymentStatus: 'paid',
      fulfillmentStatus: 'shipped',
      createdAt: '2024-01-13T09:45:00Z',
      updatedAt: '2024-01-13T16:45:00Z',
      trackingNumber: 'TRK987654321'
    },
    {
      id: '#ORD-004',
      customer: {
        name: 'Emily Wilson',
        email: 'emily@example.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
      },
      items: [
        { name: 'SEO Toolkit', quantity: 1, price: 79.00 }
      ],
      total: 79.00,
      status: 'pending',
      paymentStatus: 'pending',
      fulfillmentStatus: 'pending',
      createdAt: '2024-01-12T11:15:00Z',
      updatedAt: '2024-01-12T11:15:00Z'
    },
    {
      id: '#ORD-005',
      customer: {
        name: 'David Brown',
        email: 'david@example.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
      },
      items: [
        { name: 'Premium Course Bundle', quantity: 1, price: 199.00 }
      ],
      total: 199.00,
      status: 'cancelled',
      paymentStatus: 'refunded',
      fulfillmentStatus: 'cancelled',
      createdAt: '2024-01-11T14:30:00Z',
      updatedAt: '2024-01-11T16:45:00Z'
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return FiCheck;
      case 'processing':
        return FiRefreshCw;
      case 'shipped':
        return FiTruck;
      case 'pending':
        return FiClock;
      case 'cancelled':
        return FiX;
      default:
        return FiPackage;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success-600 bg-success-50';
      case 'processing':
        return 'text-primary-600 bg-primary-50';
      case 'shipped':
        return 'text-secondary-600 bg-secondary-50';
      case 'pending':
        return 'text-warning-600 bg-warning-50';
      case 'cancelled':
        return 'text-danger-600 bg-danger-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-success-600 bg-success-50';
      case 'pending':
        return 'text-warning-600 bg-warning-50';
      case 'failed':
        return 'text-danger-600 bg-danger-50';
      case 'refunded':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Table Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Orders ({filteredOrders.length})
          </h3>
          
          {selectedOrders.length > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                {selectedOrders.length} selected
              </span>
              <button className="px-3 py-1.5 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg">
                Bulk Actions
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
                Export Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {order.id}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </div>
                    {order.trackingNumber && (
                      <div className="text-xs text-primary-600">
                        Track: {order.trackingNumber}
                      </div>
                    )}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={order.customer.avatar}
                      alt={order.customer.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {order.customer.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.customer.email}
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-gray-900">
                    ${order.total.toFixed(2)}
                  </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                    <SafeIcon
                      icon={getStatusIcon(order.status)}
                      className="h-3 w-3 mr-1"
                    />
                    {order.status}
                  </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDate(order.createdAt)}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewOrder(order)}
                      className="p-1 text-gray-400 hover:text-primary-600 rounded"
                      title="View order"
                    >
                      <SafeIcon icon={FiEye} className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEditOrder(order)}
                      className="p-1 text-gray-400 hover:text-primary-600 rounded"
                      title="Edit order"
                    >
                      <SafeIcon icon={FiEdit3} className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-primary-600 rounded" title="More actions">
                      <SafeIcon icon={FiMoreVertical} className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiPackage} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Orders will appear here when customers make purchases'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderList;