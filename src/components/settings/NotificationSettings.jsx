import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiBell, FiMail, FiSmartphone, FiMessageSquare, FiDollarSign, FiPackage, FiUsers, FiTrendingUp } = FiIcons;

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    email: {
      orders: true,
      customers: true,
      products: false,
      marketing: true,
      security: true,
      reports: false,
      system: true
    },
    push: {
      orders: true,
      customers: false,
      products: false,
      marketing: false,
      security: true,
      reports: false,
      system: true
    },
    sms: {
      orders: false,
      customers: false,
      products: false,
      marketing: false,
      security: true,
      reports: false,
      system: false
    }
  });

  const [loading, setLoading] = useState(false);

  const notificationTypes = [
    {
      id: 'orders',
      title: 'Order Notifications',
      description: 'New orders, payment confirmations, shipping updates',
      icon: FiPackage,
      color: 'text-primary-600'
    },
    {
      id: 'customers',
      title: 'Customer Activity',
      description: 'New customers, support requests, reviews',
      icon: FiUsers,
      color: 'text-success-600'
    },
    {
      id: 'products',
      title: 'Product Updates',
      description: 'Low stock alerts, product performance',
      icon: FiPackage,
      color: 'text-warning-600'
    },
    {
      id: 'marketing',
      title: 'Marketing & Analytics',
      description: 'Campaign results, conversion reports',
      icon: FiTrendingUp,
      color: 'text-secondary-600'
    },
    {
      id: 'security',
      title: 'Security Alerts',
      description: 'Login attempts, suspicious activity',
      icon: FiBell,
      color: 'text-red-600'
    },
    {
      id: 'reports',
      title: 'Reports & Insights',
      description: 'Weekly reports, revenue summaries',
      icon: FiTrendingUp,
      color: 'text-indigo-600'
    },
    {
      id: 'system',
      title: 'System Updates',
      description: 'Platform updates, maintenance notifications',
      icon: FiMessageSquare,
      color: 'text-gray-600'
    }
  ];

  const handleToggle = (channel, type) => {
    setSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [type]: !prev[channel][type]
      }
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Notification settings updated successfully');
    } catch (error) {
      toast.error('Failed to update notification settings');
    } finally {
      setLoading(false);
    }
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
        enabled ? 'bg-primary-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <SafeIcon icon={FiBell} className="h-5 w-5 mr-2" />
            Notification Preferences
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Choose how you want to be notified about important events.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 pr-4">
                  <span className="text-sm font-medium text-gray-900">Notification Type</span>
                </th>
                <th className="text-center py-3 px-4">
                  <div className="flex flex-col items-center">
                    <SafeIcon icon={FiMail} className="h-4 w-4 text-gray-600 mb-1" />
                    <span className="text-xs font-medium text-gray-900">Email</span>
                  </div>
                </th>
                <th className="text-center py-3 px-4">
                  <div className="flex flex-col items-center">
                    <SafeIcon icon={FiSmartphone} className="h-4 w-4 text-gray-600 mb-1" />
                    <span className="text-xs font-medium text-gray-900">Push</span>
                  </div>
                </th>
                <th className="text-center py-3 pl-4">
                  <div className="flex flex-col items-center">
                    <SafeIcon icon={FiMessageSquare} className="h-4 w-4 text-gray-600 mb-1" />
                    <span className="text-xs font-medium text-gray-900">SMS</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {notificationTypes.map((type) => (
                <motion.tr
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hover:bg-gray-50"
                >
                  <td className="py-4 pr-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-100 rounded-lg mr-3">
                        <SafeIcon icon={type.icon} className={`h-4 w-4 ${type.color}`} />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{type.title}</h4>
                        <p className="text-xs text-gray-500">{type.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <ToggleSwitch
                      enabled={settings.email[type.id]}
                      onChange={() => handleToggle('email', type.id)}
                    />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <ToggleSwitch
                      enabled={settings.push[type.id]}
                      onChange={() => handleToggle('push', type.id)}
                    />
                  </td>
                  <td className="py-4 pl-4 text-center">
                    <ToggleSwitch
                      enabled={settings.sms[type.id]}
                      onChange={() => handleToggle('sms', type.id)}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Email Frequency */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Email Frequency
        </h3>
        
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="emailFrequency"
              value="immediate"
              defaultChecked
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-3 text-sm text-gray-900">
              Immediate - Get notified as soon as events happen
            </span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="emailFrequency"
              value="daily"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-3 text-sm text-gray-900">
              Daily Digest - Receive a summary once per day
            </span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="emailFrequency"
              value="weekly"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-3 text-sm text-gray-900">
              Weekly Summary - Get updates once per week
            </span>
          </label>
        </div>
      </div>

      {/* Do Not Disturb */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Do Not Disturb
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Quiet Hours</p>
              <p className="text-sm text-gray-600">Pause non-urgent notifications during these hours</p>
            </div>
            <ToggleSwitch enabled={true} onChange={() => {}} />
          </div>
          
          <div className="grid grid-cols-2 gap-4 ml-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <input
                type="time"
                defaultValue="22:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input
                type="time"
                defaultValue="08:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-4">
        <button className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          Reset to Defaults
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;