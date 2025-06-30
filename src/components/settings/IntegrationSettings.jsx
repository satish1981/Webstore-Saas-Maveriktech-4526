import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiLink, FiSettings, FiCheck, FiX, FiExternalLink, FiKey, FiRefreshCw } = FiIcons;

const IntegrationSettings = () => {
  const [loading, setLoading] = useState({});

  const integrations = [
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Accept payments and manage subscriptions',
      icon: '💳',
      category: 'Payments',
      connected: true,
      status: 'active',
      features: ['Payment processing', 'Subscription billing', 'Webhooks'],
      settings: {
        publishableKey: 'pk_test_...',
        webhookUrl: 'https://yourstore.com/webhooks/stripe'
      }
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Email marketing and automation',
      icon: '📧',
      category: 'Marketing',
      connected: true,
      status: 'active',
      features: ['Email campaigns', 'Audience sync', 'Automation'],
      settings: {
        apiKey: 'abcd1234-...',
        audienceId: '12345'
      }
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Track website performance and user behavior',
      icon: '📊',
      category: 'Analytics',
      connected: false,
      status: 'inactive',
      features: ['Traffic tracking', 'Conversion goals', 'Custom events'],
      settings: {
        trackingId: '',
        enhanced: false
      }
    },
    {
      id: 'facebook-pixel',
      name: 'Facebook Pixel',
      description: 'Track conversions and optimize ads',
      icon: '📱',
      category: 'Marketing',
      connected: false,
      status: 'inactive',
      features: ['Conversion tracking', 'Custom audiences', 'Ad optimization'],
      settings: {
        pixelId: '',
        accessToken: ''
      }
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect with 5000+ apps and automate workflows',
      icon: '⚡',
      category: 'Automation',
      connected: true,
      status: 'active',
      features: ['Workflow automation', '5000+ app integrations', 'Custom triggers'],
      settings: {
        webhookUrl: 'https://hooks.zapier.com/...',
        activeZaps: 3
      }
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications in your Slack workspace',
      icon: '💬',
      category: 'Communication',
      connected: false,
      status: 'inactive',
      features: ['Real-time notifications', 'Custom channels', 'Team collaboration'],
      settings: {
        webhookUrl: '',
        channel: '#general'
      }
    }
  ];

  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [integrationData, setIntegrationData] = useState(integrations);

  const handleConnect = async (integrationId) => {
    try {
      setLoading(prev => ({ ...prev, [integrationId]: true }));
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIntegrationData(prev => 
        prev.map(integration => 
          integration.id === integrationId 
            ? { ...integration, connected: true, status: 'active' }
            : integration
        )
      );
      
      toast.success('Integration connected successfully');
    } catch (error) {
      toast.error('Failed to connect integration');
    } finally {
      setLoading(prev => ({ ...prev, [integrationId]: false }));
    }
  };

  const handleDisconnect = async (integrationId) => {
    try {
      setLoading(prev => ({ ...prev, [integrationId]: true }));
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIntegrationData(prev => 
        prev.map(integration => 
          integration.id === integrationId 
            ? { ...integration, connected: false, status: 'inactive' }
            : integration
        )
      );
      
      toast.success('Integration disconnected');
    } catch (error) {
      toast.error('Failed to disconnect integration');
    } finally {
      setLoading(prev => ({ ...prev, [integrationId]: false }));
    }
  };

  const handleTest = async (integrationId) => {
    try {
      setLoading(prev => ({ ...prev, [`test-${integrationId}`]: true }));
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Integration test successful');
    } catch (error) {
      toast.error('Integration test failed');
    } finally {
      setLoading(prev => ({ ...prev, [`test-${integrationId}`]: false }));
    }
  };

  const categories = [...new Set(integrations.map(i => i.category))];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success-600 bg-success-50';
      case 'inactive':
        return 'text-gray-600 bg-gray-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* API Keys */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <SafeIcon icon={FiKey} className="h-5 w-5 mr-2" />
              API Keys
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Manage your API keys for external integrations.
            </p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100">
            Generate New Key
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Production API Key</h4>
              <p className="text-sm text-gray-600">For live integrations and production use</p>
              <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                sk_live_••••••••••••••••••••••••••••••••
              </code>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                Copy
              </button>
              <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                Revoke
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Test API Key</h4>
              <p className="text-sm text-gray-600">For development and testing</p>
              <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                sk_test_••••••••••••••••••••••••••••••••
              </code>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                Copy
              </button>
              <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                Revoke
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations by Category */}
      {categories.map(category => (
        <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {integrationData
              .filter(integration => integration.category === category)
              .map((integration) => (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{integration.name}</h4>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                      </div>
                    </div>
                    
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(integration.status)}`}>
                      {integration.connected ? (
                        <SafeIcon icon={FiCheck} className="h-3 w-3 inline mr-1" />
                      ) : (
                        <SafeIcon icon={FiX} className="h-3 w-3 inline mr-1" />
                      )}
                      {integration.status}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {integration.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {integration.connected ? (
                      <>
                        <button
                          onClick={() => setSelectedIntegration(integration)}
                          className="flex items-center px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded"
                        >
                          <SafeIcon icon={FiSettings} className="h-3 w-3 mr-1" />
                          Configure
                        </button>
                        <button
                          onClick={() => handleTest(integration.id)}
                          disabled={loading[`test-${integration.id}`]}
                          className="flex items-center px-3 py-1 text-sm text-primary-600 hover:bg-primary-50 rounded disabled:opacity-50"
                        >
                          <SafeIcon 
                            icon={loading[`test-${integration.id}`] ? FiRefreshCw : FiExternalLink} 
                            className={`h-3 w-3 mr-1 ${loading[`test-${integration.id}`] ? 'animate-spin' : ''}`} 
                          />
                          Test
                        </button>
                        <button
                          onClick={() => handleDisconnect(integration.id)}
                          disabled={loading[integration.id]}
                          className="flex items-center px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                        >
                          {loading[integration.id] ? (
                            <SafeIcon icon={FiRefreshCw} className="h-3 w-3 mr-1 animate-spin" />
                          ) : (
                            <SafeIcon icon={FiX} className="h-3 w-3 mr-1" />
                          )}
                          Disconnect
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleConnect(integration.id)}
                        disabled={loading[integration.id]}
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50"
                      >
                        {loading[integration.id] ? (
                          <SafeIcon icon={FiRefreshCw} className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <SafeIcon icon={FiLink} className="h-4 w-4 mr-2" />
                        )}
                        Connect
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      ))}

      {/* Integration Configuration Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedIntegration(null)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{selectedIntegration.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedIntegration.name} Settings
                    </h3>
                    <p className="text-sm text-gray-600">{selectedIntegration.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                {Object.entries(selectedIntegration.settings).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {typeof value === 'boolean' ? (
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked={value}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Enable {key}</span>
                      </label>
                    ) : (
                      <input
                        type={key.toLowerCase().includes('key') || key.toLowerCase().includes('token') ? 'password' : 'text'}
                        defaultValue={value}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder={`Enter ${key}`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
                  Save Settings
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationSettings;