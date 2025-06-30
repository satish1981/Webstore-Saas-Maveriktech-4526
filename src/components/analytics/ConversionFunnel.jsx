import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiEye, FiMousePointer, FiShoppingCart, FiCreditCard } = FiIcons;

const ConversionFunnel = () => {
  const funnelData = [
    {
      stage: 'Page Views',
      value: 12450,
      percentage: 100,
      icon: FiEye,
      color: 'bg-blue-500'
    },
    {
      stage: 'Product Views',
      value: 8920,
      percentage: 71.6,
      icon: FiMousePointer,
      color: 'bg-indigo-500'
    },
    {
      stage: 'Add to Cart',
      value: 3240,
      percentage: 26.0,
      icon: FiShoppingCart,
      color: 'bg-purple-500'
    },
    {
      stage: 'Checkout',
      value: 1890,
      percentage: 15.2,
      icon: FiCreditCard,
      color: 'bg-pink-500'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Conversion Funnel</h3>
        <p className="text-sm text-gray-600">Track customer journey from view to purchase</p>
      </div>

      <div className="space-y-4">
        {funnelData.map((stage, index) => (
          <motion.div
            key={stage.stage}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${stage.color.replace('bg-', 'bg-').replace('-500', '-100')} flex-shrink-0`}>
                <SafeIcon 
                  icon={stage.icon} 
                  className={`h-5 w-5 ${stage.color.replace('bg-', 'text-')}`} 
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">
                      {stage.value.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({stage.percentage}%)
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`h-2 rounded-full ${stage.color}`}
                  />
                </div>
              </div>
            </div>
            
            {index < funnelData.length - 1 && (
              <div className="ml-8 mt-2 mb-2">
                <div className="w-px h-4 bg-gray-300"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">15.2%</p>
            <p className="text-sm text-gray-600">Overall Conversion Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success-600">+2.3%</p>
            <p className="text-sm text-gray-600">vs Last Month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionFunnel;