import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import DashboardLayout from '../../components/layout/DashboardLayout';
import AccountSettings from '../../components/settings/AccountSettings';
import SecuritySettings from '../../components/settings/SecuritySettings';
import NotificationSettings from '../../components/settings/NotificationSettings';
import BillingSettings from '../../components/settings/BillingSettings';
import IntegrationSettings from '../../components/settings/IntegrationSettings';
import TeamSettings from '../../components/settings/TeamSettings';

const { 
  FiUser, 
  FiShield, 
  FiBell, 
  FiCreditCard, 
  FiLink, 
  FiUsers,
  FiSettings,
  FiSave
} = FiIcons;

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const tabs = [
    { 
      id: 'account', 
      label: 'Account', 
      icon: FiUser,
      description: 'Personal information and preferences'
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: FiShield,
      description: 'Password and security settings'
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: FiBell,
      description: 'Email and push notification preferences'
    },
    { 
      id: 'billing', 
      label: 'Billing', 
      icon: FiCreditCard,
      description: 'Subscription and payment methods'
    },
    { 
      id: 'integrations', 
      label: 'Integrations', 
      icon: FiLink,
      description: 'Third-party apps and services'
    },
    { 
      id: 'team', 
      label: 'Team', 
      icon: FiUsers,
      description: 'Team members and permissions'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'billing':
        return <BillingSettings />;
      case 'integrations':
        return <IntegrationSettings />;
      case 'team':
        return <TeamSettings />;
      default:
        return <AccountSettings />;
    }
  };

  const currentTab = tabs.find(tab => tab.id === activeTab);

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
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <SafeIcon icon={FiSettings} className="h-7 w-7 mr-3" />
              Settings
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your account settings and preferences
            </p>
          </div>

          {hasUnsavedChanges && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center space-x-3"
            >
              <span className="text-sm text-warning-600">You have unsaved changes</span>
              <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
                <SafeIcon icon={FiSave} className="h-4 w-4 mr-2" />
                Save All Changes
              </button>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-start px-3 py-3 text-sm font-medium rounded-lg transition-colors text-left ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <SafeIcon 
                      icon={tab.icon} 
                      className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${
                        activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'
                      }`} 
                    />
                    <div>
                      <div className="font-medium">{tab.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5 hidden lg:block">
                        {tab.description}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Quick Stats */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Account Status</span>
                    <span className="text-success-600 font-medium">Active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Plan</span>
                    <span className="font-medium">Professional</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Team Members</span>
                    <span className="font-medium">4/10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Storage Used</span>
                    <span className="font-medium">2.3GB/10GB</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* Tab Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <SafeIcon icon={currentTab.icon} className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{currentTab.label}</h2>
                  <p className="text-sm text-gray-600">{currentTab.description}</p>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {renderTabContent()}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;