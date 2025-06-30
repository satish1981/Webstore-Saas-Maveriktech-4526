import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ThemeSelector from '../../components/store/ThemeSelector';
import BrandingEditor from '../../components/store/BrandingEditor';
import SEOSettings from '../../components/store/SEOSettings';
import DomainSettings from '../../components/store/DomainSettings';

const { FiPalette, FiSettings, FiGlobe, FiSearch, FiEye } = FiIcons;

const StoreBuilder = () => {
  const [activeTab, setActiveTab] = useState('theme');

  const tabs = [
    { id: 'theme', label: 'Theme', icon: FiPalette },
    { id: 'branding', label: 'Branding', icon: FiSettings },
    { id: 'seo', label: 'SEO', icon: FiSearch },
    { id: 'domain', label: 'Domain', icon: FiGlobe },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'theme':
        return <ThemeSelector />;
      case 'branding':
        return <BrandingEditor />;
      case 'seo':
        return <SEOSettings />;
      case 'domain':
        return <DomainSettings />;
      default:
        return <ThemeSelector />;
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
            <h1 className="text-2xl font-bold text-gray-900">Store Builder</h1>
            <p className="text-gray-600">Customize your store's appearance and settings</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <SafeIcon icon={FiEye} className="h-4 w-4 mr-2" />
              Preview Store
            </button>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
              Save Changes
            </button>
          </div>
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
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <SafeIcon icon={tab.icon} className="h-4 w-4 mr-3" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StoreBuilder;