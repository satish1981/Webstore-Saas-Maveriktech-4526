import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import DashboardLayout from '../../components/layout/DashboardLayout';
import AnalyticsCard from '../../components/analytics/AnalyticsCard';
import RevenueChart from '../../components/analytics/RevenueChart';
import ConversionFunnel from '../../components/analytics/ConversionFunnel';
import TrafficSources from '../../components/analytics/TrafficSources';
import CustomerInsights from '../../components/analytics/CustomerInsights';
import ProductAnalytics from '../../components/analytics/ProductAnalytics';
import GeographicAnalytics from '../../components/analytics/GeographicAnalytics';
import RealTimeAnalytics from '../../components/analytics/RealTimeAnalytics';

const { 
  FiBarChart3, 
  FiDollarSign, 
  FiUsers, 
  FiTrendingUp, 
  FiShoppingCart, 
  FiEye,
  FiGlobe,
  FiActivity,
  FiDownload,
  FiCalendar
} = FiIcons;

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiBarChart3 },
    { id: 'revenue', label: 'Revenue', icon: FiDollarSign },
    { id: 'customers', label: 'Customers', icon: FiUsers },
    { id: 'products', label: 'Products', icon: FiShoppingCart },
    { id: 'traffic', label: 'Traffic', icon: FiEye },
    { id: 'geographic', label: 'Geographic', icon: FiGlobe },
    { id: 'realtime', label: 'Real-Time', icon: FiActivity }
  ];

  const overviewStats = [
    {
      title: 'Total Revenue',
      value: '$45,230',
      change: '+12.5%',
      changeType: 'positive',
      icon: FiDollarSign,
      color: 'primary',
      subtitle: 'Last 30 days'
    },
    {
      title: 'Total Orders',
      value: '1,247',
      change: '+8.2%',
      changeType: 'positive',
      icon: FiShoppingCart,
      color: 'success',
      subtitle: 'Last 30 days'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '+0.8%',
      changeType: 'positive',
      icon: FiTrendingUp,
      color: 'secondary',
      subtitle: 'Average'
    },
    {
      title: 'Active Customers',
      value: '2,847',
      change: '+15.3%',
      changeType: 'positive',
      icon: FiUsers,
      color: 'warning',
      subtitle: 'This month'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewStats.map((stat, index) => (
                <AnalyticsCard key={index} {...stat} />
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RevenueChart />
              <ConversionFunnel />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrafficSources />
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-success-900">Best Performing Day</p>
                      <p className="text-xs text-success-700">Wednesday generated 40% more revenue</p>
                    </div>
                    <SafeIcon icon={FiTrendingUp} className="h-6 w-6 text-success-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-warning-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-warning-900">Top Traffic Source</p>
                      <p className="text-xs text-warning-700">Organic search drives 45% of traffic</p>
                    </div>
                    <SafeIcon icon={FiGlobe} className="h-6 w-6 text-warning-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-primary-900">Customer Retention</p>
                      <p className="text-xs text-primary-700">78% of customers return within 30 days</p>
                    </div>
                    <SafeIcon icon={FiUsers} className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'revenue':
        return (
          <div className="space-y-6">
            <RevenueChart />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AnalyticsCard
                title="Monthly Recurring Revenue"
                value="$28,450"
                change="+18.2%"
                changeType="positive"
                icon={FiDollarSign}
                color="primary"
              />
              <AnalyticsCard
                title="Average Order Value"
                value="$89.50"
                change="+5.1%"
                changeType="positive"
                icon={FiShoppingCart}
                color="success"
              />
              <AnalyticsCard
                title="Revenue per Visitor"
                value="$2.84"
                change="+12.8%"
                changeType="positive"
                icon={FiTrendingUp}
                color="secondary"
              />
            </div>
          </div>
        );
      
      case 'customers':
        return <CustomerInsights />;
      
      case 'products':
        return <ProductAnalytics />;
      
      case 'traffic':
        return (
          <div className="space-y-6">
            <TrafficSources />
            <ConversionFunnel />
          </div>
        );
      
      case 'geographic':
        return <GeographicAnalytics />;
      
      case 'realtime':
        return <RealTimeAnalytics />;
      
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Comprehensive insights and performance metrics</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <SafeIcon 
                icon={FiCalendar} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
              />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            
            <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <SafeIcon icon={FiDownload} className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <nav className="flex space-x-8 px-6 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700 border-primary-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <SafeIcon icon={tab.icon} className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;