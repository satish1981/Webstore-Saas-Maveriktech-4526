import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiGlobe, FiCheck, FiX, FiExternalLink, FiShield } = FiIcons;

const DomainSettings = () => {
  const [customDomain, setCustomDomain] = useState('');
  const [subdomain, setSubdomain] = useState('awesome-store');
  const [domainStatus, setDomainStatus] = useState('available');

  const checkDomainAvailability = () => {
    // Mock domain check - replace with actual API call
    setTimeout(() => {
      setDomainStatus(Math.random() > 0.5 ? 'available' : 'taken');
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Domain Settings</h2>
        <p className="text-gray-600">Configure your store's web address and SSL settings</p>
      </div>

      <div className="space-y-8">
        {/* Free Subdomain */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <SafeIcon icon={FiGlobe} className="h-4 w-4 inline mr-2" />
            Free Maverik Subdomain
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="your-store-name"
            />
            <span className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-600">
              .maverik.app
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500">
              Your store will be accessible at: https://{subdomain}.maverik.app
            </p>
            <button
              onClick={checkDomainAvailability}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Check Availability
            </button>
          </div>
          {domainStatus === 'available' && (
            <div className="flex items-center mt-2 text-success-600">
              <SafeIcon icon={FiCheck} className="h-4 w-4 mr-1" />
              <span className="text-sm">Available</span>
            </div>
          )}
          {domainStatus === 'taken' && (
            <div className="flex items-center mt-2 text-danger-600">
              <SafeIcon icon={FiX} className="h-4 w-4 mr-1" />
              <span className="text-sm">Not available</span>
            </div>
          )}
        </div>

        {/* Custom Domain */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Custom Domain (Pro Plan)
          </label>
          <input
            type="text"
            value={customDomain}
            onChange={(e) => setCustomDomain(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="www.yourstore.com"
          />
          <p className="text-xs text-gray-500 mt-1">
            Connect your own domain name for a professional appearance
          </p>
        </div>

        {/* SSL Certificate */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              <SafeIcon icon={FiShield} className="h-4 w-4 inline mr-2" />
              SSL Certificate
            </label>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
              <SafeIcon icon={FiCheck} className="h-3 w-3 mr-1" />
              Active
            </span>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Free SSL Certificate</p>
                <p className="text-xs text-gray-600">Automatically generated and renewed</p>
              </div>
              <SafeIcon icon={FiShield} className="h-8 w-8 text-success-500" />
            </div>
          </div>
        </div>

        {/* Domain Setup Instructions */}
        {customDomain && (
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Domain Setup Instructions</h4>
            <div className="text-sm text-blue-800 space-y-2">
              <p>To connect your custom domain, add these DNS records:</p>
              <div className="bg-white rounded border p-3 font-mono text-xs">
                <div>Type: CNAME</div>
                <div>Name: www</div>
                <div>Value: cname.maverik.app</div>
              </div>
              <div className="bg-white rounded border p-3 font-mono text-xs">
                <div>Type: A</div>
                <div>Name: @</div>
                <div>Value: 185.199.108.153</div>
              </div>
            </div>
          </div>
        )}

        {/* Current Domain Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Current Store URL
          </label>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">
                https://{subdomain}.maverik.app
              </p>
              <p className="text-sm text-gray-600">Your store is live at this address</p>
            </div>
            <a
              href={`https://${subdomain}.maverik.app`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Visit Store
              <SafeIcon icon={FiExternalLink} className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainSettings;