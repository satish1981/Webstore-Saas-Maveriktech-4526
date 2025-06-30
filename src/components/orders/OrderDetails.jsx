import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import toast from 'react-hot-toast';

const { FiX, FiEdit3, FiSend, FiDownload, FiRefreshCw, FiTruck, FiCheck, FiClock, FiUser, FiMapPin, FiCreditCard, FiPackage, FiMail, FiPhone } = FiIcons;

const OrderDetails = ({ order, onClose, onUpdateOrder }) => {
  const [editingStatus, setEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState(order?.status || '');
  const [trackingNumber, setTrackingNumber] = useState(order?.trackingNumber || '');
  const [customerNote, setCustomerNote] = useState('');
  const [loading, setLoading] = useState(false);

  if (!order) return null;

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'warning' },
    { value: 'processing', label: 'Processing', color: 'primary' },
    { value: 'shipped', label: 'Shipped', color: 'secondary' },
    { value: 'delivered', label: 'Delivered', color: 'success' },
    { value: 'completed', label: 'Completed', color: 'success' },
    { value: 'cancelled', label: 'Cancelled', color: 'danger' }
  ];

  const orderTimeline = [
    {
      status: 'Order Placed',
      date: order.createdAt,
      description: 'Order was successfully placed',
      completed: true
    },
    {
      status: 'Payment Confirmed',
      date: order.paymentStatus === 'paid' ? order.createdAt : null,
      description: 'Payment has been processed',
      completed: order.paymentStatus === 'paid'
    },
    {
      status: 'Processing',
      date: order.status === 'processing' || order.status === 'shipped' || order.status === 'completed' ? order.updatedAt : null,
      description: 'Order is being prepared',
      completed: ['processing', 'shipped', 'completed'].includes(order.status)
    },
    {
      status: 'Shipped',
      date: order.status === 'shipped' || order.status === 'completed' ? order.updatedAt : null,
      description: order.trackingNumber ? `Tracking: ${order.trackingNumber}` : 'Order has been shipped',
      completed: ['shipped', 'completed'].includes(order.status)
    },
    {
      status: 'Delivered',
      date: order.status === 'completed' ? order.updatedAt : null,
      description: 'Order has been delivered',
      completed: order.status === 'completed'
    }
  ];

  const handleUpdateStatus = async () => {
    if (!newStatus) return;

    setLoading(true);
    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedOrder = {
        ...order,
        status: newStatus,
        trackingNumber: trackingNumber,
        updatedAt: new Date().toISOString()
      };
      
      onUpdateOrder(updatedOrder);
      setEditingStatus(false);
      toast.success('Order status updated successfully');
    } catch (error) {
      toast.error('Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  const handleSendCustomerNote = async () => {
    if (!customerNote.trim()) return;

    setLoading(true);
    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Note sent to customer');
      setCustomerNote('');
    } catch (error) {
      toast.error('Failed to send note');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Pending';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Order Details - {order.id}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setEditingStatus(true)}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <SafeIcon icon={FiEdit3} className="h-4 w-4 mr-2" />
                  Update Status
                </button>
                
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <SafeIcon icon={FiX} className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Order Status & Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Order Status</h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      <SafeIcon icon={getStatusIcon(order.status)} className="h-4 w-4 mr-2" />
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  {/* Order Timeline */}
                  <div className="space-y-4">
                    {orderTimeline.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 ${
                          item.completed ? 'bg-success-100 text-success-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          <SafeIcon icon={item.completed ? FiCheck : FiClock} className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {item.status}
                            </h4>
                            <span className="text-sm text-gray-500">
                              {formatDate(item.date)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                      <SafeIcon icon={FiDownload} className="h-4 w-4 mr-2" />
                      Download Invoice
                    </button>
                    <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                      <SafeIcon icon={FiMail} className="h-4 w-4 mr-2" />
                      Email Customer
                    </button>
                    <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                      <SafeIcon icon={FiRefreshCw} className="h-4 w-4 mr-2" />
                      Process Refund
                    </button>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <SafeIcon icon={FiUser} className="h-5 w-5 mr-2" />
                    Customer Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <img
                        src={order.customer.avatar}
                        alt={order.customer.name}
                        className="h-10 w-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{order.customer.name}</p>
                        <p className="text-sm text-gray-600">{order.customer.email}</p>
                      </div>
                    </div>
                    
                    {order.customer.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <SafeIcon icon={FiPhone} className="h-4 w-4 mr-2" />
                        {order.customer.phone}
                      </div>
                    )}
                  </div>
                </div>

                {order.shippingAddress && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <SafeIcon icon={FiMapPin} className="h-5 w-5 mr-2" />
                      Shipping Address
                    </h3>
                    <div className="text-sm text-gray-600">
                      <p>{order.shippingAddress.street}</p>
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                      </p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-100">
                      <tr>
                        <td colSpan="3" className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                          Total:
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                          ${order.total.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <SafeIcon icon={FiCreditCard} className="h-5 w-5 mr-2" />
                  Payment Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Payment Status:</p>
                    <p className="font-medium text-gray-900 capitalize">{order.paymentStatus}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Payment Method:</p>
                    <p className="font-medium text-gray-900">Credit Card</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Transaction ID:</p>
                    <p className="font-medium text-gray-900">txn_1234567890</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Amount:</p>
                    <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Customer Communication */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Send Note to Customer</h3>
                <div className="space-y-4">
                  <textarea
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="Type a message to send to the customer..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button
                    onClick={handleSendCustomerNote}
                    disabled={loading || !customerNote.trim()}
                    className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50"
                  >
                    <SafeIcon icon={FiSend} className="h-4 w-4 mr-2" />
                    {loading ? 'Sending...' : 'Send Note'}
                  </button>
                </div>
              </div>
            </div>

            {/* Status Update Modal */}
            {editingStatus && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Update Order Status</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        {statusOptions.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {(newStatus === 'shipped' || order.trackingNumber) && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tracking Number
                        </label>
                        <input
                          type="text"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          placeholder="Enter tracking number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setEditingStatus(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateStatus}
                      disabled={loading}
                      className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50"
                    >
                      {loading ? 'Updating...' : 'Update Status'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default OrderDetails;