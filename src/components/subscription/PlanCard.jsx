import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCheck, FiX, FiCrown, FiZap } = FiIcons;

const PlanCard = ({ plan, currentPlan, onSelectPlan, loading, popular = false }) => {
  const isCurrentPlan = currentPlan?.id === plan.id;
  const isUpgrade = currentPlan && plan.price > currentPlan.price;
  const isDowngrade = currentPlan && plan.price < currentPlan.price;

  const getPlanIcon = (planType) => {
    switch (planType) {
      case 'enterprise':
        return FiCrown;
      case 'professional':
        return FiZap;
      default:
        return FiCheck;
    }
  };

  const getButtonText = () => {
    if (isCurrentPlan) return 'Current Plan';
    if (isUpgrade) return 'Upgrade';
    if (isDowngrade) return 'Downgrade';
    return 'Select Plan';
  };

  const getButtonStyle = () => {
    if (isCurrentPlan) {
      return 'bg-gray-100 text-gray-600 cursor-not-allowed';
    }
    if (popular || isUpgrade) {
      return 'bg-primary-600 text-white hover:bg-primary-700';
    }
    return 'bg-gray-100 text-gray-900 hover:bg-gray-200';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative bg-white border-2 rounded-xl p-6 transition-all ${
        popular
          ? 'border-primary-500 shadow-lg'
          : isCurrentPlan
          ? 'border-success-500 shadow-md'
          : 'border-gray-200 hover:border-primary-300'
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      {isCurrentPlan && (
        <div className="absolute -top-4 right-4">
          <span className="bg-success-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            Current
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-3">
          <SafeIcon 
            icon={getPlanIcon(plan.type)} 
            className={`h-8 w-8 ${popular ? 'text-primary-600' : 'text-gray-600'}`} 
          />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {plan.name}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {plan.description}
        </p>
        
        <div className="flex items-baseline justify-center mb-2">
          <span className="text-4xl font-bold text-gray-900">
            ${plan.price}
          </span>
          <span className="text-gray-600 ml-1">
            /{plan.interval}
          </span>
        </div>
        
        {plan.originalPrice && plan.originalPrice > plan.price && (
          <div className="text-sm text-gray-500">
            <span className="line-through">${plan.originalPrice}</span>
            <span className="ml-2 text-success-600 font-medium">
              Save ${plan.originalPrice - plan.price}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <SafeIcon 
              icon={feature.included ? FiCheck : FiX} 
              className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${
                feature.included ? 'text-success-500' : 'text-gray-400'
              }`} 
            />
            <span className={`text-sm ${
              feature.included ? 'text-gray-700' : 'text-gray-400'
            }`}>
              {feature.name}
              {feature.limit && (
                <span className="text-gray-500 ml-1">({feature.limit})</span>
              )}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => !isCurrentPlan && onSelectPlan(plan)}
        disabled={isCurrentPlan || loading}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${getButtonStyle()}`}
      >
        {loading ? 'Processing...' : getButtonText()}
      </button>

      {plan.trialDays && !isCurrentPlan && (
        <p className="text-xs text-gray-500 text-center mt-2">
          {plan.trialDays}-day free trial
        </p>
      )}
    </motion.div>
  );
};

export default PlanCard;