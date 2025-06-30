import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPackage, FiClock, FiCheck, FiTruck } = FiIcons;

const RecentOrders = () => {
  const orders = [
    {
      id: '#ORD-001',
      customer: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      product: 'Premium Course Bundle',
      amount: '$199.00',
      status: 'completed',
      date: '2 hours ago'
    },
    {
      id: '#ORD-002',
      customer: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
      product: 'Digital Marketing Guide',
      amount: '$49.00',
      status: 'processing',
      date: '4 hours ago'
    },
    {
      id: '#ORD-003',
      customer: 'Mike Davis',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      product: 'Design Templates Pack',
      amount: '$29.00',
      status: 'shipped',
      date: '6 hours ago'
    },
    {
      id: '#ORD-004',
      customer: 'Emily Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      product: 'Business Consultation',
      amount: '$299.00',
      status: 'pending',
      date: '8 hours ago'
    },
    {
      id: '#ORD-005',
      customer: 'David Brown',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      product: 'SEO Toolkit',
      amount: '$79.00',
      status: 'completed',
      date: '1 day ago'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return FiCheck;
      case 'processing':
        return FiPackage;
      case 'shipped':
        return FiTruck;
      case 'pending':
        return FiClock;
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
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <p className="text-sm text-gray-600">Latest customer orders and their status</p>
          </div>
          <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
            View all
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{order.id}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={order.avatar}
                      alt={order.customer}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      {order.customer}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{order.product}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-gray-900">{order.amount}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                    <SafeIcon icon={getStatusIcon(order.status)} className="h-3 w-3 mr-1" />
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{order.date}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;