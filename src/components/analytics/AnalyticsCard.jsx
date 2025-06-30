import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTrendingUp, FiTrendingDown } = FiIcons;

const AnalyticsCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  color = 'primary', 
  subtitle,
  loading = false 
}) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-success-50 text-success-600',
    secondary: 'bg-secondary-50 text-secondary-600',
    warning: 'bg-warning-50 text-warning-600',
    danger: 'bg-danger-50 text-danger-600'
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="animate-pulse">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
          
          {change && (
            <div className="flex items-center mt-2">
              <SafeIcon
                icon={changeType === 'positive' ? FiTrendingUp : FiTrendingDown}
                className={`h-4 w-4 mr-1 ${
                  changeType === 'positive' ? 'text-success-500' : 'text-danger-500'
                }`}
              />
              <span className={`text-sm font-medium ${
                changeType === 'positive' ? 'text-success-700' : 'text-danger-700'
              }`}>
                {change}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <SafeIcon icon={icon} className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsCard;