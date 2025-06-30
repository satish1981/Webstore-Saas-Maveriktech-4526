import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../../common/SafeIcon';
import toast from 'react-hot-toast';

const { 
  FiMap, 
  FiDownload, 
  FiRefreshCw, 
  FiCheck, 
  FiClock, 
  FiAlertCircle,
  FiEye,
  FiSettings,
  FiLink,
  FiGlobe
} = FiIcons;

const SitemapManager = () => {
  const [loading, setLoading] = useState(false);
  const [lastGenerated, setLastGenerated] = useState('2 hours ago');
  const [selectedSitemap, setSelectedSitemap] = useState('main');

  const sitemapStatus = {
    totalUrls: 127,
    lastGenerated: '2024-01-15T10:30:00Z',
    status: 'up-to-date',
    size: '12.4 KB',
    errors: 0,
    warnings: 2
  };

  const sitemaps = [
    {
      id: 'main',
      name: 'Main Sitemap',
      url: '/sitemap.xml',
      urls: 127,
      lastModified: '2024-01-15T10:30:00Z',
      status: 'active',
      type: 'index'
    },
    {
      id: 'posts',
      name: 'Blog Posts',
      url: '/sitemap-posts.xml',
      urls: 85,
      lastModified: '2024-01-15T10:30:00Z',
      status: 'active',
      type: 'posts'
    },
    {
      id: 'pages',
      name: 'Static Pages',
      url: '/sitemap-pages.xml',
      urls: 12,
      lastModified: '2024-01-10T08:15:00Z',
      status: 'active',
      type: 'pages'
    },
    {
      id: 'categories',
      name: 'Categories',
      url: '/sitemap-categories.xml',
      urls: 15,
      lastModified: '2024-01-12T14:20:00Z',
      status: 'active',
      type: 'taxonomies'
    },
    {
      id: 'images',
      name: 'Images',
      url: '/sitemap-images.xml',
      urls: 243,
      lastModified: '2024-01-15T10:30:00Z',
      status: 'active',
      type: 'media'
    }
  ];

  const sitemapUrls = [
    {
      url: 'https://yourblog.com/',
      lastmod: '2024-01-15T10:30:00Z',
      changefreq: 'daily',
      priority: '1.0',
      status: 'indexed',
      type: 'page',
      clicks: 1250,
      impressions: 4500
    },
    {
      url: 'https://yourblog.com/blog',
      lastmod: '2024-01-15T08:15:00Z',
      changefreq: 'daily',
      priority: '0.9',
      status: 'indexed',
      type: 'page',
      clicks: 890,
      impressions: 3200
    },
    {
      url: 'https://yourblog.com/blog/complete-guide-ecommerce-seo',
      lastmod: '2024-01-15T10:30:00Z',
      changefreq: 'weekly',
      priority: '0.8',
      status: 'indexed',
      type: 'post',
      clicks: 2450,
      impressions: 8900
    },
    {
      url: 'https://yourblog.com/blog/building-customer-trust',
      lastmod: '2024-01-12T09:15:00Z',
      changefreq: 'weekly',
      priority: '0.8',
      status: 'pending',
      type: 'post',
      clicks: 1890,
      impressions: 6700
    },
    {
      url: 'https://yourblog.com/blog/email-marketing-automation',
      lastmod: '2024-01-10T16:20:00Z',
      changefreq: 'weekly',
      priority: '0.7',
      status: 'draft',
      type: 'post',
      clicks: 0,
      impressions: 0
    }
  ];

  const [settings, setSettings] = useState({
    autoGenerate: true,
    includeDrafts: false,
    includeCategories: true,
    includeTags: true,
    includeImages: true,
    includeVideos: false,
    maxUrls: 50000,
    defaultChangefreq: 'weekly',
    defaultPriority: '0.8',
    splitLargeSitemaps: true,
    maxUrlsPerSitemap: 10000,
    enablePing: true,
    pingSearchEngines: ['google', 'bing', 'yandex']
  });

  const generateSitemap = async (sitemapType = 'all') => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock sitemap generation
      let sitemapXml;
      
      if (sitemapType === 'index') {
        sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.filter(s => s.id !== 'main').map(sitemap => `  <sitemap>
    <loc>https://yourblog.com${sitemap.url}</loc>
    <lastmod>${sitemap.lastModified}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;
      } else {
        sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${sitemapUrls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
      }

      const blob = new Blob([sitemapXml], { type: 'application/xml' });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = sitemapType === 'index' ? 'sitemap-index.xml' : 'sitemap.xml';
      a.click();
      URL.revokeObjectURL(downloadUrl);
      
      setLastGenerated('Just now');
      toast.success('Sitemap generated and downloaded successfully!');
      
      if (settings.enablePing) {
        await pingSearchEngines();
      }
    } catch (error) {
      toast.error('Failed to generate sitemap');
    } finally {
      setLoading(false);
    }
  };

  const pingSearchEngines = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Search engines notified of sitemap update!');
    } catch (error) {
      toast.error('Failed to notify search engines');
    }
  };

  const submitToSearchEngines = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Sitemap submitted to search engines successfully!');
    } catch (error) {
      toast.error('Failed to submit sitemap');
    } finally {
      setLoading(false);
    }
  };

  const validateSitemap = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Sitemap validation completed - no errors found!');
    } catch (error) {
      toast.error('Sitemap validation failed');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'indexed':
        return 'text-success-600 bg-success-50';
      case 'pending':
        return 'text-warning-600 bg-warning-50';
      case 'draft':
        return 'text-gray-600 bg-gray-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'indexed':
        return FiCheck;
      case 'pending':
        return FiClock;
      case 'error':
        return FiAlertCircle;
      default:
        return FiClock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Sitemap Status Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Sitemap Status</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => generateSitemap('all')}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              <SafeIcon icon={loading ? FiRefreshCw : FiMap} className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Generating...' : 'Generate All'}
            </button>
            
            <button
              onClick={validateSitemap}
              disabled={loading}
              className="flex items-center px-4 py-2 text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100"
            >
              <SafeIcon icon={FiCheck} className="h-4 w-4 mr-2" />
              Validate
            </button>
            
            <button
              onClick={submitToSearchEngines}
              disabled={loading}
              className="flex items-center px-4 py-2 text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100"
            >
              <SafeIcon icon={FiGlobe} className="h-4 w-4 mr-2" />
              Submit to Search Engines
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{sitemapStatus.totalUrls}</div>
            <p className="text-sm text-gray-600">Total URLs</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600">{sitemapStatus.totalUrls - sitemapStatus.errors}</div>
            <p className="text-sm text-gray-600">Valid URLs</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-warning-600">{sitemapStatus.warnings}</div>
            <p className="text-sm text-gray-600">Warnings</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{sitemapStatus.errors}</div>
            <p className="text-sm text-gray-600">Errors</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{sitemapStatus.size}</div>
            <p className="text-sm text-gray-600">File Size</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-success-50 rounded-lg">
          <div className="flex items-center">
            <SafeIcon icon={FiCheck} className="h-5 w-5 text-success-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-success-900">Sitemap is up-to-date</p>
              <p className="text-sm text-success-700">Last generated {lastGenerated}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sitemap Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sitemap Files</h3>
          
          <div className="space-y-3">
            {sitemaps.map((sitemap, index) => (
              <motion.div
                key={sitemap.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-200 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiMap} className="h-5 w-5 text-primary-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">{sitemap.name}</h4>
                    <p className="text-sm text-gray-600">{sitemap.urls} URLs • {sitemap.url}</p>
                    <p className="text-xs text-gray-500">
                      Last modified: {new Date(sitemap.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => generateSitemap(sitemap.type)}
                    className="p-2 text-gray-400 hover:text-primary-600 rounded"
                    title="Generate sitemap"
                  >
                    <SafeIcon icon={FiRefreshCw} className="h-4 w-4" />
                  </button>
                  
                  <button
                    className="p-2 text-gray-400 hover:text-primary-600 rounded"
                    title="View sitemap"
                  >
                    <SafeIcon icon={FiEye} className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => {
                      const url = `https://yourblog.com${sitemap.url}`;
                      navigator.clipboard.writeText(url);
                      toast.success('Sitemap URL copied!');
                    }}
                    className="p-2 text-gray-400 hover:text-primary-600 rounded"
                    title="Copy URL"
                  >
                    <SafeIcon icon={FiLink} className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Search Console Integration */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Console Integration</h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Google Search Console</h4>
                <span className="px-2 py-1 text-xs bg-success-100 text-success-700 rounded-full">Connected</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Monitor sitemap indexing status and performance
              </p>
              <button className="text-sm text-primary-600 hover:text-primary-700">
                View in Search Console →
              </button>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Bing Webmaster Tools</h4>
                <span className="px-2 py-1 text-xs bg-warning-100 text-warning-700 rounded-full">Not Connected</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Submit sitemaps to Bing for better visibility
              </p>
              <button className="text-sm text-primary-600 hover:text-primary-700">
                Connect Bing Tools →
              </button>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Yandex Webmaster</h4>
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">Not Connected</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Optimize for Russian search market
              </p>
              <button className="text-sm text-primary-600 hover:text-primary-700">
                Connect Yandex →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sitemap URLs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Sitemap URLs</h3>
            <div className="flex items-center space-x-3">
              <select
                value={selectedSitemap}
                onChange={(e) => setSelectedSitemap(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                {sitemaps.map(sitemap => (
                  <option key={sitemap.id} value={sitemap.id}>
                    {sitemap.name}
                  </option>
                ))}
              </select>
              
              <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                <SafeIcon icon={FiEye} className="h-4 w-4 mr-2" />
                View XML
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Modified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change Frequency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sitemapUrls.map((url, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                      {url.url}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">{url.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(url.lastmod).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {url.changefreq}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {url.priority}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(url.status)}`}>
                      <SafeIcon icon={getStatusIcon(url.status)} className="h-3 w-3 mr-1" />
                      {url.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div className="flex items-center">
                        <SafeIcon icon={FiEye} className="h-3 w-3 mr-1" />
                        {url.impressions.toLocaleString()} impressions
                      </div>
                      <div className="flex items-center">
                        <SafeIcon icon={FiLink} className="h-3 w-3 mr-1" />
                        {url.clicks.toLocaleString()} clicks
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sitemap Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Sitemap Settings</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h4 className="font-medium text-gray-900">Generation Options</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-medium text-gray-900">Auto-generate sitemap</h5>
                  <p className="text-sm text-gray-600">Automatically regenerate when content changes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.autoGenerate}
                    onChange={(e) => setSettings({...settings, autoGenerate: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-medium text-gray-900">Split large sitemaps</h5>
                  <p className="text-sm text-gray-600">Create multiple sitemaps if URL count exceeds limit</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.splitLargeSitemaps}
                    onChange={(e) => setSettings({...settings, splitLargeSitemaps: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-medium text-gray-900">Include images</h5>
                  <p className="text-sm text-gray-600">Add image sitemap information</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.includeImages}
                    onChange={(e) => setSettings({...settings, includeImages: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-medium text-gray-900">Ping search engines</h5>
                  <p className="text-sm text-gray-600">Notify search engines when sitemap updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.enablePing}
                    onChange={(e) => setSettings({...settings, enablePing: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-medium text-gray-900">Default Values</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Change Frequency
                </label>
                <select
                  value={settings.defaultChangefreq}
                  onChange={(e) => setSettings({...settings, defaultChangefreq: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="always">Always</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="never">Never</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Priority
                </label>
                <select
                  value={settings.defaultPriority}
                  onChange={(e) => setSettings({...settings, defaultPriority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="1.0">1.0 (Highest)</option>
                  <option value="0.9">0.9</option>
                  <option value="0.8">0.8</option>
                  <option value="0.7">0.7</option>
                  <option value="0.6">0.6</option>
                  <option value="0.5">0.5 (Medium)</option>
                  <option value="0.4">0.4</option>
                  <option value="0.3">0.3</option>
                  <option value="0.2">0.2</option>
                  <option value="0.1">0.1 (Lowest)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum URLs per sitemap
                </label>
                <input
                  type="number"
                  value={settings.maxUrlsPerSitemap}
                  onChange={(e) => setSettings({...settings, maxUrlsPerSitemap: parseInt(e.target.value)})}
                  min="1000"
                  max="50000"
                  step="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 10,000 URLs per sitemap</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Reset to Defaults
          </button>
          <button className="px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SitemapManager;