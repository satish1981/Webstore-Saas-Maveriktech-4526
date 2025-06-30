import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUsers, FiUserCheck, FiUserPlus, FiTrendingUp } = FiIcons;

const CustomerInsights = () => {
  const customerSegments = [
    { name: 'New Customers', value: 35, color: '#3b82f6' },
    { name: 'Returning', value: 45, color: '#10b981' },
    { name: 'VIP', value: 15, color: '#f59e0b' },
    { name: 'Inactive', value: 5, color: '#ef4444' }
  ];

  const customerBehavior = [
    { month: 'Jan', newCustomers: 120, returningCustomers: 200 },
    { month: 'Feb', newCustomers: 150, returningCustomers: 180 },
    { month: 'Mar', newCustomers: 180, returningCustomers: 220 },
    { month: 'Apr', newCustomers: 200, returningCustomers: 250 },
    { month: 'May', newCustomers: 170, returningCustomers: 280 },
    { month: 'Jun', newCustomers: 190, returningCustomers: 300 }
  ];

  const customerMetrics = [
    {
      title: 'Total Customers',
      value: '2,847',
      change: '+18.2%',
      changeType: 'positive',
      icon: FiUsers,
      color: 'primary'
    },
    {
      title: 'Customer Retention',
      value: '78.5%',
      change: '+5.1%',
      changeType: 'positive',
      icon: FiUserCheck,
      color: 'success'
    },
    {
      title: 'New Customers',
      value: '342',
      change: '+12.8%',
      changeType: 'positive',
      icon: FiUserPlus,
      color: 'secondary'
    },
    {
      title: 'Customer LTV',
      value: '$486',
      change: '+8.9%',
      changeType: 'positive',
      icon: FiTrendingUp,
      color: 'warning'
    }
  ];

  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-success-50 text-success-600',
    secondary: 'bg-secondary-50 text-secondary-600',
    warning: 'bg-warning-50 text-warning-600'
  };

  return (
    <div className="space-y-6">
      {/* Customer Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {customerMetrics.map((metric, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <div className="flex items-center mt-1">
                  <SafeIcon
                    icon={FiTrendingUp}
                    className={`h-3 w-3 mr-1 ${
                      metric.changeType === 'positive' ? 'text-success-500' : 'text-danger-500'
                    }`}
                  />
                  <span className={`text-xs font-medium ${
                    metric.changeType === 'positive' ? 'text-success-700' : 'text-danger-700'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className={`p-2 rounded-lg ${colorClasses[metric.color]}`}>
                <SafeIcon icon={metric.icon} className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Segments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Segments</h3>
          
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {customerSegments.map((segment, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: segment.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{segment.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{segment.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Acquisition */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Acquisition</h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerBehavior}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="newCustomers" fill="#3b82f6" name="New Customers" />
                <Bar dataKey="returningCustomers" fill="#10b981" name="Returning Customers" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">New Customers</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Returning Customers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInsights;