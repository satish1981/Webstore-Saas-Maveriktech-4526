import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import DashboardLayout from '../../components/layout/DashboardLayout';
import OrderStats from '../../components/orders/OrderStats';
import OrderFilters from '../../components/orders/OrderFilters';
import OrderList from '../../components/orders/OrderList';
import OrderDetails from '../../components/orders/OrderDetails';

const { FiPlus, FiRefreshCw } = FiIcons;

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleCloseOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const handleUpdateOrder = (updatedOrder) => {
    // Update order in the list
    console.log('Updated order:', updatedOrder);
    // In a real app, you'd update the orders list here
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting orders...');
  };

  const handleRefresh = () => {
    // Mock refresh functionality
    console.log('Refreshing orders...');
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
            <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600">Track and manage customer orders</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <SafeIcon icon={FiRefreshCw} className="h-4 w-4 mr-2" />
              Refresh
            </button>
            
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
              <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
              Create Order
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <OrderStats />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <OrderFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            onExport={handleExport}
          />
        </motion.div>

        {/* Order List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <OrderList
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            dateFilter={dateFilter}
            onViewOrder={handleViewOrder}
            onEditOrder={handleEditOrder}
          />
        </motion.div>

        {/* Order Details Modal */}
        {showOrderDetails && (
          <OrderDetails
            order={selectedOrder}
            onClose={handleCloseOrderDetails}
            onUpdateOrder={handleUpdateOrder}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default OrderManagement;