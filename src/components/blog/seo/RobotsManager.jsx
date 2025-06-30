import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../../common/SafeIcon';
import toast from 'react-hot-toast';

const { 
  FiShield, 
  FiDownload, 
  FiRefreshCw, 
  FiCheck, 
  FiAlertCircle,
  FiEye,
  FiCopy,
  FiPlus,
  FiTrash2,
  FiEdit3
} = FiIcons;

const RobotsManager = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  
  const [robotsContent, setRobotsContent] = useState(`User-agent: *
Allow: /

User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 2

Disallow: /admin/
Disallow: /private/
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: *.pdf$
Disallow: /search?*
Disallow: /*?utm_*
Disallow: /api/

Sitemap: https://yourblog.com/sitemap.xml
Sitemap: https://yourblog.com/sitemap-images.xml`);

  const [rules, setRules] = useState([
    {
      id: 1,
      userAgent: '*',
      directive: 'Allow',
      path: '/',
      comment: 'Allow all bots to crawl everything by default'
    },
    {
      id: 2,
      userAgent: 'Googlebot',
      directive: 'Allow',
      path: '/',
      comment: 'Specific rule for Google'
    },
    {
      id: 3,
      userAgent: '*',
      directive: 'Disallow',
      path: '/admin/',
      comment: 'Block admin area'
    },
    {
      id: 4,
      userAgent: '*',
      directive: 'Disallow',
      path: '/private/',
      comment: 'Block private content'
    },
    {
      id: 5,
      userAgent: '*',
      directive: 'Disallow',
      path: '*.pdf$',
      comment: 'Block PDF files'
    }
  ]);

  const [sitemaps, setSitemaps] = useState([
    'https://yourblog.com/sitemap.xml',
    'https://yourblog.com/sitemap-images.xml'
  ]);

  const [crawlDelays, setCrawlDelays] = useState([
    { userAgent: 'Googlebot', delay: 1 },
    { userAgent: 'Bingbot', delay: 2 },
    { userAgent: 'Slurp', delay: 3 }
  ]);

  const commonBots = [
    'Googlebot',
    'Bingbot', 
    'Slurp',
    'DuckDuckBot',
    'Baiduspider',
    'YandexBot',
    'facebookexternalhit',
    'Twitterbot',
    'LinkedInBot',
    'WhatsApp',
    'Applebot'
  ];

  const presetTemplates = [
    {
      name: 'Default Blog',
      description: 'Standard configuration for blogs',
      content: `User-agent: *
Allow: /

Disallow: /admin/
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /search?*
Disallow: /*?utm_*

Sitemap: https://yourblog.com/sitemap.xml`
    },
    {
      name: 'E-commerce Store',
      description: 'Optimized for online stores',
      content: `User-agent: *
Allow: /
Allow: /products/
Allow: /categories/

Disallow: /admin/
Disallow: /cart/
Disallow: /checkout/
Disallow: /account/
Disallow: /search?*
Disallow: /*?utm_*
Disallow: /*?sort=*
Disallow: /*?filter=*

Sitemap: https://yourblog.com/sitemap.xml
Sitemap: https://yourblog.com/sitemap-products.xml`
    },
    {
      name: 'Restrictive',
      description: 'Very limited access for bots',
      content: `User-agent: *
Disallow: /

User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /private/

User-agent: Bingbot
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://yourblog.com/sitemap.xml`
    }
  ];

  const generateRobotsTxt = () => {
    let content = '';
    
    // Group rules by user agent
    const groupedRules = rules.reduce((acc, rule) => {
      if (!acc[rule.userAgent]) {
        acc[rule.userAgent] = [];
      }
      acc[rule.userAgent].push(rule);
      return acc;
    }, {});

    // Generate content
    Object.entries(groupedRules).forEach(([userAgent, userRules]) => {
      content += `User-agent: ${userAgent}\n`;
      
      userRules.forEach(rule => {
        content += `${rule.directive}: ${rule.path}\n`;
      });
      
      // Add crawl delay if exists
      const delay = crawlDelays.find(d => d.userAgent === userAgent);
      if (delay) {
        content += `Crawl-delay: ${delay.delay}\n`;
      }
      
      content += '\n';
    });

    // Add sitemaps
    sitemaps.forEach(sitemap => {
      content += `Sitemap: ${sitemap}\n`;
    });

    setRobotsContent(content);
  };

  const validateRobotsTxt = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation
      const issues = [];
      
      if (!robotsContent.includes('Sitemap:')) {
        issues.push('No sitemap specified');
      }
      
      if (robotsContent.includes('Disallow: /') && !robotsContent.includes('Allow:')) {
        issues.push('Complete disallow without specific allows');
      }
      
      if (issues.length === 0) {
        toast.success('Robots.txt validation passed - no issues found!');
      } else {
        toast.warning(`Found ${issues.length} potential issues`);
      }
    } catch (error) {
      toast.error('Validation failed');
    } finally {
      setLoading(false);
    }
  };

  const downloadRobotsTxt = () => {
    const blob = new Blob([robotsContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Robots.txt downloaded successfully!');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(robotsContent);
    toast.success('Robots.txt copied to clipboard!');
  };

  const addRule = () => {
    const newRule = {
      id: Date.now(),
      userAgent: '*',
      directive: 'Disallow',
      path: '/',
      comment: ''
    };
    setRules([...rules, newRule]);
  };

  const updateRule = (id, field, value) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
  };

  const deleteRule = (id) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const addSitemap = () => {
    setSitemaps([...sitemaps, 'https://yourblog.com/new-sitemap.xml']);
  };

  const updateSitemap = (index, value) => {
    const newSitemaps = [...sitemaps];
    newSitemaps[index] = value;
    setSitemaps(newSitemaps);
  };

  const deleteSitemap = (index) => {
    setSitemaps(sitemaps.filter((_, i) => i !== index));
  };

  const loadTemplate = (template) => {
    setRobotsContent(template.content);
    toast.success(`${template.name} template loaded!`);
  };

  React.useEffect(() => {
    generateRobotsTxt();
  }, [rules, sitemaps, crawlDelays]);

  return (
    <div className="space-y-6">
      {/* Robots.txt Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Robots.txt Manager</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={validateRobotsTxt}
              disabled={loading}
              className="flex items-center px-4 py-2 text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100"
            >
              <SafeIcon icon={loading ? FiRefreshCw : FiCheck} className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Validate
            </button>
            
            <button
              onClick={copyToClipboard}
              className="flex items-center px-4 py-2 text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100"
            >
              <SafeIcon icon={FiCopy} className="h-4 w-4 mr-2" />
              Copy
            </button>
            
            <button
              onClick={downloadRobotsTxt}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <SafeIcon icon={FiDownload} className="h-4 w-4 mr-2" />
              Download
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{rules.length}</div>
            <p className="text-sm text-gray-600">Total Rules</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600">{rules.filter(r => r.directive === 'Allow').length}</div>
            <p className="text-sm text-gray-600">Allow Rules</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-warning-600">{rules.filter(r => r.directive === 'Disallow').length}</div>
            <p className="text-sm text-gray-600">Disallow Rules</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{sitemaps.length}</div>
            <p className="text-sm text-gray-600">Sitemaps</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-success-50 rounded-lg">
          <div className="flex items-center">
            <SafeIcon icon={FiCheck} className="h-5 w-5 text-success-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-success-900">Robots.txt is active</p>
              <p className="text-sm text-success-700">Available at: https://yourblog.com/robots.txt</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <nav className="flex space-x-8 px-6 py-4">
          {[
            { id: 'editor', label: 'Text Editor', icon: FiEdit3 },
            { id: 'rules', label: 'Rule Builder', icon: FiShield },
            { id: 'templates', label: 'Templates', icon: FiCopy }
          ].map((tab) => (
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
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {activeTab === 'editor' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Robots.txt Content</h3>
              <button
                onClick={() => setRobotsContent('')}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Clear All
              </button>
            </div>
            
            <textarea
              value={robotsContent}
              onChange={(e) => setRobotsContent(e.target.value)}
              rows={20}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
              placeholder="Enter your robots.txt content..."
            />
            
            <div className="text-sm text-gray-600">
              <p className="mb-2"><strong>Tips:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use "User-agent: *" to target all bots</li>
                <li>Use "Disallow: /" to block access to specific paths</li>
                <li>Use "Allow: /" to explicitly allow access</li>
                <li>Add "Sitemap:" entries to help bots find your sitemaps</li>
                <li>Use "Crawl-delay:" to control bot crawling speed</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="space-y-6">
            {/* Rules Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Crawling Rules</h3>
                <button
                  onClick={addRule}
                  className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
                  Add Rule
                </button>
              </div>

              <div className="space-y-3">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                    <select
                      value={rule.userAgent}
                      onChange={(e) => updateRule(rule.id, 'userAgent', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="*">All Bots (*)</option>
                      {commonBots.map(bot => (
                        <option key={bot} value={bot}>{bot}</option>
                      ))}
                    </select>

                    <select
                      value={rule.directive}
                      onChange={(e) => updateRule(rule.id, 'directive', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Allow">Allow</option>
                      <option value="Disallow">Disallow</option>
                    </select>

                    <input
                      type="text"
                      value={rule.path}
                      onChange={(e) => updateRule(rule.id, 'path', e.target.value)}
                      placeholder="/path/"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                    />

                    <input
                      type="text"
                      value={rule.comment}
                      onChange={(e) => updateRule(rule.id, 'comment', e.target.value)}
                      placeholder="Comment (optional)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                    />

                    <button
                      onClick={() => deleteRule(rule.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sitemaps Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Sitemaps</h3>
                <button
                  onClick={addSitemap}
                  className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
                  Add Sitemap
                </button>
              </div>

              <div className="space-y-3">
                {sitemaps.map((sitemap, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="url"
                      value={sitemap}
                      onChange={(e) => updateSitemap(index, e.target.value)}
                      placeholder="https://yourblog.com/sitemap.xml"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={() => deleteSitemap(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Crawl Delays Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Crawl Delays</h3>
              <div className="space-y-3">
                {crawlDelays.map((delay, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <select
                      value={delay.userAgent}
                      onChange={(e) => {
                        const newDelays = [...crawlDelays];
                        newDelays[index].userAgent = e.target.value;
                        setCrawlDelays(newDelays);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                    >
                      {commonBots.map(bot => (
                        <option key={bot} value={bot}>{bot}</option>
                      ))}
                    </select>
                    
                    <input
                      type="number"
                      value={delay.delay}
                      onChange={(e) => {
                        const newDelays = [...crawlDelays];
                        newDelays[index].delay = parseInt(e.target.value);
                        setCrawlDelays(newDelays);
                      }}
                      min="1"
                      max="60"
                      className="w-20 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                    />
                    
                    <span className="text-sm text-gray-600">seconds</span>
                    
                    <button
                      onClick={() => {
                        setCrawlDelays(crawlDelays.filter((_, i) => i !== index));
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Preset Templates</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {presetTemplates.map((template, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  
                  <pre className="text-xs bg-gray-50 p-3 rounded border mb-4 overflow-x-auto">
                    <code>{template.content}</code>
                  </pre>
                  
                  <button
                    onClick={() => loadTemplate(template)}
                    className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Use Template
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Custom Template Builder */}
            <div className="border-t pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Common Rules</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Block Common Areas</h5>
                  <div className="space-y-2">
                    {[
                      '/admin/',
                      '/wp-admin/',
                      '/private/',
                      '/search?*',
                      '/*?utm_*'
                    ].map((path, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const newRule = {
                            id: Date.now() + index,
                            userAgent: '*',
                            directive: 'Disallow',
                            path: path,
                            comment: `Block ${path}`
                          };
                          setRules([...rules, newRule]);
                          toast.success(`Added rule to block ${path}`);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border"
                      >
                        Disallow: {path}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Bot-Specific Rules</h5>
                  <div className="space-y-2">
                    {commonBots.slice(0, 5).map((bot, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const newRule = {
                            id: Date.now() + index,
                            userAgent: bot,
                            directive: 'Allow',
                            path: '/',
                            comment: `Allow ${bot} full access`
                          };
                          setRules([...rules, newRule]);
                          toast.success(`Added rule for ${bot}`);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border"
                      >
                        {bot}: Allow /
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Testing & Validation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Testing & Validation</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Test URL Access</h4>
            <div className="space-y-3">
              <input
                type="url"
                placeholder="Enter URL to test (e.g., /admin/dashboard)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                <option value="*">All Bots (*)</option>
                {commonBots.map(bot => (
                  <option key={bot} value={bot}>{bot}</option>
                ))}
              </select>
              <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Test Access
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Validation Results</h4>
            <div className="space-y-2">
              <div className="flex items-center p-3 bg-success-50 rounded-lg">
                <SafeIcon icon={FiCheck} className="h-5 w-5 text-success-600 mr-3" />
                <span className="text-sm text-success-800">Syntax is valid</span>
              </div>
              
              <div className="flex items-center p-3 bg-success-50 rounded-lg">
                <SafeIcon icon={FiCheck} className="h-5 w-5 text-success-600 mr-3" />
                <span className="text-sm text-success-800">Sitemaps are accessible</span>
              </div>
              
              <div className="flex items-center p-3 bg-warning-50 rounded-lg">
                <SafeIcon icon={FiAlertCircle} className="h-5 w-5 text-warning-600 mr-3" />
                <span className="text-sm text-warning-800">Consider adding crawl delays for better performance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotsManager;