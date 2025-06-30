import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSearch, FiTag, FiFileText, FiImage } = FiIcons;

const SEOSettings = () => {
  const [seoData, setSeoData] = useState({
    title: 'My Awesome Store - Premium Digital Products',
    description: 'Discover amazing digital products and services at unbeatable prices. From courses to templates, we have everything you need to grow your business.',
    keywords: 'digital products, online courses, business templates, marketing tools',
    ogImage: ''
  });

  const handleChange = (field, value) => {
    setSeoData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSeoData(prev => ({ ...prev, ogImage: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">SEO Settings</h2>
        <p className="text-gray-600">Optimize your store for search engines and social media</p>
      </div>

      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <SafeIcon icon={FiFileText} className="h-4 w-4 inline mr-2" />
            Page Title
          </label>
          <input
            type="text"
            value={seoData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter your page title"
            maxLength="60"
          />
          <div className="flex justify-between mt-1">
            <p className="text-xs text-gray-500">This appears in search results and browser tabs</p>
            <span className={`text-xs ${seoData.title.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>
              {seoData.title.length}/60
            </span>
          </div>
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <SafeIcon icon={FiSearch} className="h-4 w-4 inline mr-2" />
            Meta Description
          </label>
          <textarea
            value={seoData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Write a compelling description of your store"
            maxLength="160"
          />
          <div className="flex justify-between mt-1">
            <p className="text-xs text-gray-500">Brief description shown in search results</p>
            <span className={`text-xs ${seoData.description.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
              {seoData.description.length}/160
            </span>
          </div>
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <SafeIcon icon={FiTag} className="h-4 w-4 inline mr-2" />
            Keywords
          </label>
          <input
            type="text"
            value={seoData.keywords}
            onChange={(e) => handleChange('keywords', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="keyword1, keyword2, keyword3"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate keywords with commas. Focus on 3-5 relevant terms.
          </p>
        </div>

        {/* Social Media Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <SafeIcon icon={FiImage} className="h-4 w-4 inline mr-2" />
            Social Media Image (Open Graph)
          </label>
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              {seoData.ogImage ? (
                <img
                  src={seoData.ogImage}
                  alt="Social media preview"
                  className="h-24 w-32 object-cover border border-gray-200 rounded-lg"
                />
              ) : (
                <div className="h-24 w-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiImage} className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Upload Image
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Recommended: 1200x630px. This image appears when your store is shared on social media.
              </p>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Search Result Preview
          </label>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
              {seoData.title || 'Your Store Title'}
            </div>
            <div className="text-green-700 text-sm">
              https://yourstore.maverik.app
            </div>
            <div className="text-gray-700 text-sm mt-1">
              {seoData.description || 'Your store description will appear here...'}
            </div>
          </div>
        </div>

        {/* SEO Tips */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">SEO Tips</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Keep your title under 60 characters for better visibility</li>
            <li>• Write compelling descriptions that encourage clicks</li>
            <li>• Use relevant keywords naturally in your content</li>
            <li>• Add high-quality images with descriptive alt text</li>
            <li>• Ensure your site loads quickly on all devices</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SEOSettings;