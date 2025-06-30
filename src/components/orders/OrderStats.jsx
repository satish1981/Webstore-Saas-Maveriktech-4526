import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiShoppingBag, FiDollarSign, FiTrendingUp, FiClock, FiCheck, FiTruck, FiRefreshCw } = FiIcons;

const OrderStats = () => {
  // Mock data - replace with actual API data
  const stats = [
    {
      title: 'Total Orders',
      value: '1,247',
      change: '+12.5%',
      changeType: 'positive',
      icon: FiShoppingBag,
      color: 'primary'
    },
    {
      title: 'Order Value',
      value: '$45,230',
      change: '+8.2%',
      changeType: 'positive',
      icon: FiDollarSign,
      color: 'success'
    },
    {
      title: 'Average Order',
      value: '$89.50',
      change: '+3.1%',
      changeType: 'positive',
      icon: FiTrendingUp,
      color: 'secondary'
    },
    {
      title: 'Fulfillment Rate',
      value: '94.2%',
      change: '+1.8%',
      changeType: 'positive',
      icon: FiCheck,
      color: 'warning'
    }
  ];

  const orderBreakdown = [
    { status: 'Pending', count: 23, color: 'warning', icon: FiClock },
    { status: 'Processing', count: 45, color: 'primary', icon: FiRefreshCw },
    { status: 'Shipped', count: 67, color: 'secondary', icon: FiTruck },
    { status: 'Completed', count: 892, color: 'success', icon: FiCheck }
  ];

  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-success-50 text-success-600',
    secondary: 'bg-secondary-50 text-secondary-600',
    warning: 'bg-warning-50 text-warning-600',
    danger: 'bg-danger-50 text-danger-600'
  };

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <SafeIcon 
                    icon={FiTrendingUp} 
                    className={`h-4 w-4 mr-1 ${
                      stat.changeType === 'positive' ? 'text-success-500' : 'text-danger-500'
                    }`} 
                  />
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-success-700' : 'text-danger-700'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                <SafeIcon icon={stat.icon} className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Order Status Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status Breakdown</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {orderBreakdown.map((item, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 ${colorClasses[item.color]}`}>
                <SafeIcon icon={item.icon} className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{item.count}</div>
              <div className="text-sm text-gray-600">{item.status}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default OrderStats;