import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPackage, FiUsers, FiHardDrive, FiWifi, FiTrendingUp } = FiIcons;

const UsageMetrics = ({ currentPlan }) => {
  // Mock usage data - replace with actual API data
  const usageData = [
    {
      name: 'Products',
      used: 45,
      limit: currentPlan?.limits?.products || 100,
      icon: FiPackage,
      color: 'primary'
    },
    {
      name: 'Storage',
      used: 2.4,
      limit: currentPlan?.limits?.storage || 10,
      unit: 'GB',
      icon: FiHardDrive,
      color: 'secondary'
    },
    {
      name: 'Bandwidth',
      used: 15.2,
      limit: currentPlan?.limits?.bandwidth || 100,
      unit: 'GB',
      icon: FiWifi,
      color: 'success'
    },
    {
      name: 'Team Members',
      used: 3,
      limit: currentPlan?.limits?.teamMembers || 5,
      icon: FiUsers,
      color: 'warning'
    }
  ];

  const getUsagePercentage = (used, limit) => {
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return 'bg-danger-500';
    if (percentage >= 75) return 'bg-warning-500';
    return 'bg-success-500';
  };

  const getUsageTextColor = (percentage) => {
    if (percentage >= 90) return 'text-danger-600';
    if (percentage >= 75) return 'text-warning-600';
    return 'text-success-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Overview</h3>
        <p className="text-sm text-gray-600">Monitor your current usage against plan limits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {usageData.map((metric, index) => {
          const percentage = getUsagePercentage(metric.used, metric.limit);
          
          return (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg bg-${metric.color}-100 mr-3`}>
                    <SafeIcon 
                      icon={metric.icon} 
                      className={`h-5 w-5 text-${metric.color}-600`} 
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{metric.name}</h4>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${getUsageTextColor(percentage)}`}>
                    {percentage.toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>
                    {metric.used}{metric.unit && ` ${metric.unit}`} used
                  </span>
                  <span>
                    {metric.limit}{metric.unit && ` ${metric.unit}`} limit
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`h-2 rounded-full ${getUsageColor(percentage)}`}
                  />
                </div>
              </div>

              {percentage >= 75 && (
                <div className="mt-2 text-xs text-warning-600">
                  {percentage >= 90 ? 'Usage limit almost reached' : 'Approaching usage limit'}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Upgrade prompt if usage is high */}
      {usageData.some(metric => getUsagePercentage(metric.used, metric.limit) >= 80) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg"
        >
          <div className="flex items-center">
            <SafeIcon icon={FiTrendingUp} className="h-5 w-5 text-primary-600 mr-3" />
            <div className="flex-1">
              <h4 className="font-medium text-primary-900">Consider upgrading your plan</h4>
              <p className="text-sm text-primary-700">
                You're approaching your usage limits. Upgrade to get more resources and features.
              </p>
            </div>
            <button className="ml-4 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700">
              Upgrade
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UsageMetrics;