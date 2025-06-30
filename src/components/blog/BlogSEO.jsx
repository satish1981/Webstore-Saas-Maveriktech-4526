import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import SchemaGenerator from './seo/SchemaGenerator';
import SitemapManager from './seo/SitemapManager';
import RobotsManager from './seo/RobotsManager';
import SEOAnalyzer from './seo/SEOAnalyzer';

const { 
  FiSearch, 
  FiCode, 
  FiMap, 
  FiShield, 
  FiBarChart3,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle
} = FiIcons;

const BlogSEO = () => {
  const [activeTab, setActiveTab] = useState('analyzer');

  const tabs = [
    { id: 'analyzer', label: 'SEO Analyzer', icon: FiBarChart3 },
    { id: 'schema', label: 'Schema Generator', icon: FiCode },
    { id: 'sitemap', label: 'Sitemap Manager', icon: FiMap },
    { id: 'robots', label: 'Robots.txt', icon: FiShield }
  ];

  const seoOverview = {
    score: 85,
    issues: 3,
    warnings: 7,
    passed: 24,
    lastScan: '2 hours ago'
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analyzer':
        return <SEOAnalyzer />;
      case 'schema':
        return <SchemaGenerator />;
      case 'sitemap':
        return <SitemapManager />;
      case 'robots':
        return <RobotsManager />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* SEO Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">SEO Overview</h3>
            <p className="text-sm text-gray-600">Last updated {seoOverview.lastScan}</p>
          </div>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100">
            <SafeIcon icon={FiRefreshCw} className="h-4 w-4 mr-2" />
            Run SEO Scan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-16 h-16 mb-3">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - seoOverview.score / 100)}`}
                  className={`${
                    seoOverview.score >= 80 ? 'text-success-500' : 
                    seoOverview.score >= 60 ? 'text-warning-500' : 'text-danger-500'
                  } transition-all duration-1000 ease-out`}
                />
              </svg>
              <span className={`absolute text-lg font-bold ${
                seoOverview.score >= 80 ? 'text-success-600' : 
                seoOverview.score >= 60 ? 'text-warning-600' : 'text-danger-600'
              }`}>
                {seoOverview.score}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-900">SEO Score</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-danger-50 rounded-full mb-3 mx-auto">
              <SafeIcon icon={FiAlertCircle} className="h-8 w-8 text-danger-600" />
            </div>
            <div className="text-2xl font-bold text-danger-600">{seoOverview.issues}</div>
            <p className="text-sm text-gray-600">Critical Issues</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-warning-50 rounded-full mb-3 mx-auto">
              <SafeIcon icon={FiAlertCircle} className="h-8 w-8 text-warning-600" />
            </div>
            <div className="text-2xl font-bold text-warning-600">{seoOverview.warnings}</div>
            <p className="text-sm text-gray-600">Warnings</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-success-50 rounded-full mb-3 mx-auto">
              <SafeIcon icon={FiCheckCircle} className="h-8 w-8 text-success-600" />
            </div>
            <div className="text-2xl font-bold text-success-600">{seoOverview.passed}</div>
            <p className="text-sm text-gray-600">Passed Checks</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <nav className="flex space-x-8 px-6 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <SafeIcon icon={tab.icon} className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
};

export default BlogSEO;