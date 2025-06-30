import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatsCard from '../../components/dashboard/StatsCard';
import RecentOrders from '../../components/dashboard/RecentOrders';
import SalesChart from '../../components/dashboard/SalesChart';
import TopProducts from '../../components/dashboard/TopProducts';

const { FiDollarSign, FiShoppingBag, FiUsers, FiTrendingUp } = FiIcons;

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,426',
      change: '+12.5%',
      changeType: 'positive',
      icon: FiDollarSign,
      color: 'primary'
    },
    {
      title: 'Orders',
      value: '1,247',
      change: '+8.2%',
      changeType: 'positive',
      icon: FiShoppingBag,
      color: 'success'
    },
    {
      title: 'Customers',
      value: '892',
      change: '+15.3%',
      changeType: 'positive',
      icon: FiUsers,
      color: 'secondary'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-2.1%',
      changeType: 'negative',
      icon: FiTrendingUp,
      color: 'warning'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </motion.div>

        {/* Charts and Data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <SalesChart />
          </motion.div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TopProducts />
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <RecentOrders />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;