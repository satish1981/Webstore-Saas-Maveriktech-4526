import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { 
  FiEye, 
  FiUsers, 
  FiClock, 
  FiTrendingUp, 
  FiCalendar, 
  FiDownload,
  FiShare2,
  FiHeart,
  FiMessageCircle
} = FiIcons;

const BlogAnalytics = () => {
  const [dateRange, setDateRange] = useState('30d');

  // Mock analytics data
  const viewsData = [
    { date: '2024-01-01', views: 1200, uniqueVisitors: 890, readTime: 180 },
    { date: '2024-01-02', views: 1450, uniqueVisitors: 1020, readTime: 195 },
    { date: '2024-01-03', views: 1350, uniqueVisitors: 950, readTime: 175 },
    { date: '2024-01-04', views: 1800, uniqueVisitors: 1300, readTime: 210 },
    { date: '2024-01-05', views: 2100, uniqueVisitors: 1500, readTime: 225 },
    { date: '2024-01-06', views: 1950, uniqueVisitors: 1400, readTime: 200 },
    { date: '2024-01-07', views: 2300, uniqueVisitors: 1650, readTime: 240 }
  ];

  const topPosts = [
    {
      title: 'The Complete Guide to E-commerce SEO',
      views: 4500,
      engagement: 85,
      readTime: '8:30',
      shares: 234,
      comments: 45
    },
    {
      title: 'Building Customer Trust Through Social Proof',
      views: 3200,
      engagement: 78,
      readTime: '6:15',
      shares: 189,
      comments: 32
    },
    {
      title: 'Advanced Email Marketing Strategies',
      views: 2800,
      engagement: 72,
      readTime: '12:45',
      shares: 156,
      comments: 28
    },
    {
      title: 'Content Marketing Trends for 2024',
      views: 2400,
      engagement: 68,
      readTime: '5:20',
      shares: 134,
      comments: 21
    },
    {
      title: 'Conversion Rate Optimization Tips',
      views: 2100,
      engagement: 75,
      readTime: '7:10',
      shares: 112,
      comments: 18
    }
  ];

  const trafficSources = [
    { name: 'Organic Search', value: 45, color: '#3b82f6' },
    { name: 'Direct', value: 25, color: '#10b981' },
    { name: 'Social Media', value: 20, color: '#8b5cf6' },
    { name: 'Email', value: 7, color: '#f59e0b' },
    { name: 'Referral', value: 3, color: '#ef4444' }
  ];

  const deviceData = [
    { device: 'Desktop', sessions: 2400, percentage: 55 },
    { device: 'Mobile', sessions: 1600, percentage: 37 },
    { device: 'Tablet', sessions: 350, percentage: 8 }
  ];

  const engagementMetrics = [
    {
      metric: 'Average Read Time',
      value: '3:45',
      change: '+12%',
      changeType: 'positive',
      icon: FiClock
    },
    {
      metric: 'Bounce Rate',
      value: '32%',
      change: '-8%',
      changeType: 'positive',
      icon: FiUsers
    },
    {
      metric: 'Social Shares',
      value: '1,234',
      change: '+25%',
      changeType: 'positive',
      icon: FiShare2
    },
    {
      metric: 'Comments',
      value: '567',
      change: '+15%',
      changeType: 'positive',
      icon: FiMessageCircle
    }
  ];

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Blog Analytics</h3>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <SafeIcon icon={FiCalendar} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <SafeIcon icon={FiDownload} className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {engagementMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.metric}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <SafeIcon 
                    icon={FiTrendingUp} 
                    className={`h-4 w-4 mr-1 ${
                      metric.changeType === 'positive' ? 'text-success-500' : 'text-danger-500'
                    }`} 
                  />
                  <span className={`text-sm font-medium ${
                    metric.changeType === 'positive' ? 'text-success-700' : 'text-danger-700'
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last period</span>
                </div>
              </div>
              <SafeIcon icon={metric.icon} className="h-8 w-8 text-gray-400" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Blog Views Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" hide />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  name="Views"
                />
                <Line 
                  type="monotone" 
                  dataKey="uniqueVisitors" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  name="Unique Visitors"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary-600 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Views</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-success-600 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Unique Visitors</span>
            </div>
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: source.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{source.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{source.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Posts and Device Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performing Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Posts</h3>
          <div className="space-y-4">
            {topPosts.map((post, index) => (
              <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate mb-1">
                    {post.title}
                  </h4>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <SafeIcon icon={FiEye} className="h-3 w-3 mr-1" />
                      {post.views.toLocaleString()} views
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiClock} className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiShare2} className="h-3 w-3 mr-1" />
                      {post.shares} shares
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiMessageCircle} className="h-3 w-3 mr-1" />
                      {post.comments} comments
                    </div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm font-semibold text-gray-900">
                    {post.engagement}%
                  </div>
                  <div className="text-xs text-gray-500">engagement</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Device Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h3>
          <div className="h-32 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deviceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" hide />
                <YAxis dataKey="device" type="category" width={60} fontSize={12} />
                <Tooltip />
                <Bar dataKey="sessions" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {deviceData.map((device, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{device.device}</span>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {device.sessions.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({device.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Engagement Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-success-50 rounded-lg">
            <div className="flex items-center mb-2">
              <SafeIcon icon={FiTrendingUp} className="h-5 w-5 text-success-600 mr-2" />
              <span className="text-sm font-medium text-success-900">Best Performing Day</span>
            </div>
            <p className="text-xs text-success-700">
              Fridays generate 35% more engagement than other weekdays
            </p>
          </div>
          
          <div className="p-4 bg-primary-50 rounded-lg">
            <div className="flex items-center mb-2">
              <SafeIcon icon={FiClock} className="h-5 w-5 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-primary-900">Optimal Post Length</span>
            </div>
            <p className="text-xs text-primary-700">
              Posts with 8-12 minute read time have highest engagement
            </p>
          </div>
          
          <div className="p-4 bg-warning-50 rounded-lg">
            <div className="flex items-center mb-2">
              <SafeIcon icon={FiUsers} className="h-5 w-5 text-warning-600 mr-2" />
              <span className="text-sm font-medium text-warning-900">Audience Growth</span>
            </div>
            <p className="text-xs text-warning-700">
              Your audience has grown 45% this month with quality content
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogAnalytics;