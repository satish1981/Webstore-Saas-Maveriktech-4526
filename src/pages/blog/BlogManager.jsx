import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import DashboardLayout from '../../components/layout/DashboardLayout';
import BlogList from '../../components/blog/BlogList';
import BlogEditor from '../../components/blog/BlogEditor';
import BlogAnalytics from '../../components/blog/BlogAnalytics';
import BlogSEO from '../../components/blog/BlogSEO';
import BlogSettings from '../../components/blog/BlogSettings';

const { 
  FiEdit3, 
  FiPlus, 
  FiBarChart3, 
  FiSearch, 
  FiSettings, 
  FiFileText,
  FiTrendingUp,
  FiEye,
  FiFilter
} = FiIcons;

const BlogManager = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const tabs = [
    { id: 'posts', label: 'Posts', icon: FiFileText, count: 42 },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart3 },
    { id: 'seo', label: 'SEO Tools', icon: FiSearch },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  const handleNewPost = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingPost(null);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <BlogList
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onEditPost={handleEditPost}
          />
        );
      case 'analytics':
        return <BlogAnalytics />;
      case 'seo':
        return <BlogSEO />;
      case 'settings':
        return <BlogSettings />;
      default:
        return null;
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
            <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
            <p className="text-gray-600">Create and manage your blog content with advanced SEO tools</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <SafeIcon icon={FiTrendingUp} className="h-4 w-4 mr-2" />
              View Blog
            </button>
            <button
              onClick={handleNewPost}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
            >
              <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
              New Post
            </button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
                <p className="text-sm text-success-600 mt-1">+5 this month</p>
              </div>
              <SafeIcon icon={FiFileText} className="h-8 w-8 text-primary-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">12.4K</p>
                <p className="text-sm text-success-600 mt-1">+18% this month</p>
              </div>
              <SafeIcon icon={FiEye} className="h-8 w-8 text-success-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Read Time</p>
                <p className="text-2xl font-bold text-gray-900">3.2m</p>
                <p className="text-sm text-warning-600 mt-1">-5% this month</p>
              </div>
              <SafeIcon icon={FiTrendingUp} className="h-8 w-8 text-secondary-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">SEO Score</p>
                <p className="text-2xl font-bold text-gray-900">87%</p>
                <p className="text-sm text-success-600 mt-1">+12% this month</p>
              </div>
              <SafeIcon icon={FiSearch} className="h-8 w-8 text-warning-600" />
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <nav className="flex space-x-8 px-6 py-4 border-b border-gray-200">
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
                {tab.count && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Filters for Posts tab */}
          {activeTab === 'posts' && (
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="relative flex-1 max-w-md">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search posts..."
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiFilter} className="h-4 w-4 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="all">All Posts</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>

        {/* Blog Editor Modal */}
        {showEditor && (
          <BlogEditor
            post={editingPost}
            onClose={handleCloseEditor}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default BlogManager;