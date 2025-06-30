import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import toast from 'react-hot-toast';

const { 
  FiSettings,
  FiSave,
  FiRefreshCw,
  FiGlobe,
  FiMail,
  FiBell,
  FiShield,
  FiUsers,
  FiImage,
  FiType,
  FiLayout,
  FiCalendar,
  FiTag,
  FiMessageCircle,
  FiEye,
  FiCode,
  FiDatabase
} = FiIcons;

const BlogSettings = () => {
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('general');

  const [settings, setSettings] = useState({
    // General Settings
    blogTitle: 'My Awesome Blog',
    blogDescription: 'A blog about technology, business, and innovation',
    blogUrl: 'https://yourblog.com',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MMMM d, yyyy',
    timeFormat: '12h',
    postsPerPage: 10,
    excerptLength: 150,
    
    // Content Settings
    allowComments: true,
    moderateComments: true,    
    requireCommentApproval: false,
    allowGuestComments: true,
    enableRatings: false,
    enableSocialSharing: true,
    enableRelatedPosts: true,
    relatedPostsCount: 4,
    enableReadingTime: true,
    enableTableOfContents: true,
    enablePrintView: false,
    
    // SEO Settings
    enableSEO: true,
    autoGenerateMetaDescription: true,
    enableOpenGraph: true,
    enableTwitterCards: true,
    enableSchemaMarkup: true,
    enableBreadcrumbs: true,
    enableSitemap: true,
    enableRobotsTxt: true,
    sitemapUpdateFrequency: 'daily',
    
    // Media Settings
    enableImageOptimization: true,
    enableLazyLoading: true,
    enableWebP: true,
    maxImageWidth: 1200,
    imageQuality: 85,
    enableImageCaptions: true,
    enableImageZoom: false,
    enableGalleries: true,
    
    // Performance Settings
    enableCaching: true,
    cacheExpiration: 3600,
    enableMinification: true,
    enableGzip: true,
    enableCDN: false,
    cdnUrl: '',
    enableAMP: false,
    enablePWA: false,
    
    // Security Settings
    enableCSRF: true,
    enableXSSProtection: true,
    enableSQLInjectionProtection: true,
    enableBruteForceProtection: true,
    maxLoginAttempts: 5,
    lockoutDuration: 900,
    enableTwoFactor: false,
    requireStrongPasswords: true,
    
    // Email Settings
    emailNotifications: true,
    emailNewComments: true,
    emailNewSubscribers: true,
    emailWeeklyDigest: true,
    emailProvider: 'smtp',
    smtpHost: '',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    fromEmail: 'noreply@yourblog.com',
    fromName: 'My Awesome Blog',
    
    // Social Settings
    enableSocialLogin: false,
    facebookAppId: '',
    googleClientId: '',
    twitterApiKey: '',
    linkedinClientId: '',
    enableSocialComments: false,
    socialCommentProvider: 'disqus',
    disqusShortname: '',
    
    // Analytics Settings
    enableAnalytics: true,
    googleAnalyticsId: '',
    googleTagManagerId: '',
    facebookPixelId: '',
    enableHotjar: false,
    hotjarId: '',
    enableCrazyEgg: false,
    crazyEggId: '',
    
    // Advanced Settings
    enableCustomCSS: false,
    customCSS: '',
    enableCustomJS: false,
    customJS: '',
    enableCustomHeaders: false,
    customHeaders: '',
    enableAPIAccess: true,
    apiRateLimit: 1000,
    enableWebhooks: false,
    webhookUrl: '',
    enableBackups: true,
    backupFrequency: 'weekly',
    backupRetention: 30
  });

  const sections = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'content', label: 'Content', icon: FiType },
    { id: 'seo', label: 'SEO', icon: FiGlobe },
    { id: 'media', label: 'Media', icon: FiImage },
    { id: 'performance', label: 'Performance', icon: FiRefreshCw },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'email', label: 'Email', icon: FiMail },
    { id: 'social', label: 'Social', icon: FiUsers },
    { id: 'analytics', label: 'Analytics', icon: FiEye },
    { id: 'advanced', label: 'Advanced', icon: FiCode }
  ];

  const handleSave = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title
                </label>
                <input
                  type="text"
                  value={settings.blogTitle}
                  onChange={(e) => updateSetting('blogTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog URL
                </label>
                <input
                  type="url"
                  value={settings.blogUrl}
                  onChange={(e) => updateSetting('blogUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Description
              </label>
              <textarea
                value={settings.blogDescription}
                onChange={(e) => updateSetting('blogDescription', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => updateSetting('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) => updateSetting('timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Posts per Page
                </label>
                <input
                  type="number"
                  value={settings.postsPerPage}
                  onChange={(e) => updateSetting('postsPerPage', parseInt(e.target.value))}
                  min="1"
                  max="50"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Content Settings</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Comments</h4>
                
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.allowComments}
                      onChange={(e) => updateSetting('allowComments', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Allow comments on posts</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.moderateComments}
                      onChange={(e) => updateSetting('moderateComments', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Moderate comments</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.allowGuestComments}
                      onChange={(e) => updateSetting('allowGuestComments', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Allow guest comments</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Features</h4>
                
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enableSocialSharing}
                      onChange={(e) => updateSetting('enableSocialSharing', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable social sharing</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enableRelatedPosts}
                      onChange={(e) => updateSetting('enableRelatedPosts', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Show related posts</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enableReadingTime}
                      onChange={(e) => updateSetting('enableReadingTime', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Show reading time</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enableTableOfContents}
                      onChange={(e) => updateSetting('enableTableOfContents', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable table of contents</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt Length (words)
                </label>
                <input
                  type="number"
                  value={settings.excerptLength}
                  onChange={(e) => updateSetting('excerptLength', parseInt(e.target.value))}
                  min="50"
                  max="500"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Related Posts Count
                </label>
                <input
                  type="number"
                  value={settings.relatedPostsCount}
                  onChange={(e) => updateSetting('relatedPostsCount', parseInt(e.target.value))}
                  min="2"
                  max="8"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        );

      case 'seo':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">SEO Settings</h3>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enableSEO}
                  onChange={(e) => updateSetting('enableSEO', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Enable SEO features</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.autoGenerateMetaDescription}
                  onChange={(e) => updateSetting('autoGenerateMetaDescription', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Auto-generate meta descriptions</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enableOpenGraph}
                  onChange={(e) => updateSetting('enableOpenGraph', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Enable Open Graph tags</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enableSchemaMarkup}
                  onChange={(e) => updateSetting('enableSchemaMarkup', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Enable Schema markup</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enableSitemap}
                  onChange={(e) => updateSetting('enableSitemap', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Auto-generate sitemap</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sitemap Update Frequency
              </label>
              <select
                value={settings.sitemapUpdateFrequency}
                onChange={(e) => updateSetting('sitemapUpdateFrequency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        );

      case 'media':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Media Settings</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Image Optimization</h4>
                
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enableImageOptimization}
                      onChange={(e) => updateSetting('enableImageOptimization', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable image optimization</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enableLazyLoading}
                      onChange={(e) => updateSetting('enableLazyLoading', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable lazy loading</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enableWebP}
                      onChange={(e) => updateSetting('enableWebP', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Convert to WebP format</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Image Settings</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Image Width (px)
                  </label>
                  <input
                    type="number"
                    value={settings.maxImageWidth}
                    onChange={(e) => updateSetting('maxImageWidth', parseInt(e.target.value))}
                    min="800"
                    max="2000"
                    step="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Quality (%)
                  </label>
                  <input
                    type="range"
                    value={settings.imageQuality}
                    onChange={(e) => updateSetting('imageQuality', parseInt(e.target.value))}
                    min="60"
                    max="100"
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600 mt-1">{settings.imageQuality}%</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Settings</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Caching</h4>
                
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enableCaching}
                      onChange={(e) => updateSetting('enableCaching', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable caching</span>
                  </label>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cache Expiration (seconds)
                    </label>
                    <input
                      type="number"
                      value={settings.cacheExpiration}
                      onChange={(e) => updateSetting('cacheExpiration', parseInt(e.target.value))}
                      min="300"
                      max="86400"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Optimization</h4>
                
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enableMinification}
                      onChange={(e) => updateSetting('enableMinification', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Minify CSS/JS</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enableGzip}
                      onChange={(e) => updateSetting('enableGzip', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable Gzip compression</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enableCDN}
                      onChange={(e) => updateSetting('enableCDN', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Use CDN</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Protection</h4>
                
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enableCSRF}
                      onChange={(e) => updateSetting('enableCSRF', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">CSRF Protection</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enableXSSProtection}
                      onChange={(e) => updateSetting('enableXSSProtection', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">XSS Protection</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enableBruteForceProtection}
                      onChange={(e) => updateSetting('enableBruteForceProtection', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Brute Force Protection</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Login Security</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => updateSetting('maxLoginAttempts', parseInt(e.target.value))}
                    min="3"
                    max="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lockout Duration (seconds)
                  </label>
                  <input
                    type="number"
                    value={settings.lockoutDuration}
                    onChange={(e) => updateSetting('lockoutDuration', parseInt(e.target.value))}
                    min="300"
                    max="3600"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Analytics Settings</h3>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enableAnalytics}
                  onChange={(e) => updateSetting('enableAnalytics', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Enable analytics tracking</span>
              </label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Analytics ID
                </label>
                <input
                  type="text"
                  value={settings.googleAnalyticsId}
                  onChange={(e) => updateSetting('googleAnalyticsId', e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Tag Manager ID
                </label>
                <input
                  type="text"
                  value={settings.googleTagManagerId}
                  onChange={(e) => updateSetting('googleTagManagerId', e.target.value)}
                  placeholder="GTM-XXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook Pixel ID
                </label>
                <input
                  type="text"
                  value={settings.facebookPixelId}
                  onChange={(e) => updateSetting('facebookPixelId', e.target.value)}
                  placeholder="123456789012345"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hotjar Site ID
                </label>
                <input
                  type="text"
                  value={settings.hotjarId}
                  onChange={(e) => updateSetting('hotjarId', e.target.value)}
                  placeholder="1234567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Advanced Settings</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    checked={settings.enableCustomCSS}
                    onChange={(e) => updateSetting('enableCustomCSS', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700">
                    Enable Custom CSS
                  </label>
                </div>
                {settings.enableCustomCSS && (
                  <textarea
                    value={settings.customCSS}
                    onChange={(e) => updateSetting('customCSS', e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                    placeholder="/* Add your custom CSS here */"
                  />
                )}
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    checked={settings.enableCustomJS}
                    onChange={(e) => updateSetting('enableCustomJS', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700">
                    Enable Custom JavaScript
                  </label>
                </div>
                {settings.enableCustomJS && (
                  <textarea
                    value={settings.customJS}
                    onChange={(e) => updateSetting('customJS', e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                    placeholder="// Add your custom JavaScript here"
                  />
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Rate Limit (requests/hour)
                  </label>
                  <input
                    type="number"
                    value={settings.apiRateLimit}
                    onChange={(e) => updateSetting('apiRateLimit', parseInt(e.target.value))}
                    min="100"
                    max="10000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Backup Retention (days)
                  </label>
                  <input
                    type="number"
                    value={settings.backupRetention}
                    onChange={(e) => updateSetting('backupRetention', parseInt(e.target.value))}
                    min="7"
                    max="365"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Settings Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex flex-col items-center p-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <SafeIcon icon={section.icon} className="h-5 w-5 mb-1" />
              <span className="text-xs">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Settings Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderSection()}
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            <SafeIcon icon={loading ? FiRefreshCw : FiSave} className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      {/* Settings Export/Import */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup & Restore</h3>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => {
              const dataStr = JSON.stringify(settings, null, 2);
              const dataBlob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(dataBlob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'blog-settings.json';
              link.click();
              URL.revokeObjectURL(url);
              toast.success('Settings exported successfully!');
            }}
            className="flex items-center px-4 py-2 text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100"
          >
            <SafeIcon icon={FiDownload} className="h-4 w-4 mr-2" />
            Export Settings
          </button>
          
          <label className="flex items-center px-4 py-2 text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 cursor-pointer">
            <SafeIcon icon={FiUpload} className="h-4 w-4 mr-2" />
            Import Settings
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    try {
                      const importedSettings = JSON.parse(event.target.result);
                      setSettings(importedSettings);
                      toast.success('Settings imported successfully!');
                    } catch (error) {
                      toast.error('Invalid settings file');
                    }
                  };
                  reader.readAsText(file);
                }
              }}
            />
          </label>
          
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all settings to defaults?')) {
                // Reset to defaults logic here
                toast.success('Settings reset to defaults');
              }
            }}
            className="flex items-center px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
          >
            <SafeIcon icon={FiRefreshCw} className="h-4 w-4 mr-2" />
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogSettings;