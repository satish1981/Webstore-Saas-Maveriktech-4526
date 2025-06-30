import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChromePicker } from 'react-color';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUpload, FiImage, FiType } = FiIcons;

const BrandingEditor = () => {
  const [logo, setLogo] = useState(null);
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState('#8b5cf6');
  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false);
  const [showSecondaryPicker, setShowSecondaryPicker] = useState(false);
  const [selectedFont, setSelectedFont] = useState('inter');

  const fonts = [
    { id: 'inter', name: 'Inter', style: 'font-sans' },
    { id: 'poppins', name: 'Poppins', style: 'font-heading' },
    { id: 'roboto', name: 'Roboto', style: 'font-mono' },
    { id: 'playfair', name: 'Playfair Display', style: 'font-serif' }
  ];

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Brand Identity</h2>
        <p className="text-gray-600">Customize your store's visual identity and branding</p>
      </div>

      <div className="space-y-8">
        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <SafeIcon icon={FiImage} className="h-4 w-4 inline mr-2" />
            Store Logo
          </label>
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              {logo ? (
                <img
                  src={logo}
                  alt="Logo preview"
                  className="h-20 w-20 object-contain border border-gray-200 rounded-lg"
                />
              ) : (
                <div className="h-20 w-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiImage} className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <SafeIcon icon={FiUpload} className="h-4 w-4 mr-2" />
                  Upload Logo
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG up to 2MB. Recommended: 200x200px
              </p>
            </div>
          </div>
        </div>

        {/* Color Scheme */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Color Scheme
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Color */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Primary Color
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowPrimaryPicker(!showPrimaryPicker)}
                  className="w-full h-12 rounded-lg border border-gray-300 flex items-center px-3 space-x-3"
                  style={{ backgroundColor: primaryColor }}
                >
                  <div 
                    className="w-8 h-8 rounded border border-white shadow-sm"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <span className="text-white font-medium">{primaryColor}</span>
                </button>
                {showPrimaryPicker && (
                  <div className="absolute z-10 mt-2">
                    <div
                      className="fixed inset-0"
                      onClick={() => setShowPrimaryPicker(false)}
                    />
                    <ChromePicker
                      color={primaryColor}
                      onChange={(color) => setPrimaryColor(color.hex)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Secondary Color */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Secondary Color
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowSecondaryPicker(!showSecondaryPicker)}
                  className="w-full h-12 rounded-lg border border-gray-300 flex items-center px-3 space-x-3"
                  style={{ backgroundColor: secondaryColor }}
                >
                  <div 
                    className="w-8 h-8 rounded border border-white shadow-sm"
                    style={{ backgroundColor: secondaryColor }}
                  />
                  <span className="text-white font-medium">{secondaryColor}</span>
                </button>
                {showSecondaryPicker && (
                  <div className="absolute z-10 mt-2">
                    <div
                      className="fixed inset-0"
                      onClick={() => setShowSecondaryPicker(false)}
                    />
                    <ChromePicker
                      color={secondaryColor}
                      onChange={(color) => setSecondaryColor(color.hex)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <SafeIcon icon={FiType} className="h-4 w-4 inline mr-2" />
            Typography
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fonts.map((font) => (
              <motion.button
                key={font.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedFont(font.id)}
                className={`p-4 border rounded-lg text-left transition-all ${
                  selectedFont === font.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`text-lg font-medium mb-1 ${font.style}`}>
                  {font.name}
                </div>
                <p className={`text-sm text-gray-600 ${font.style}`}>
                  The quick brown fox jumps over the lazy dog
                </p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Preview
          </label>
          <div className="border border-gray-200 rounded-lg p-6" style={{ backgroundColor: '#f9fafb' }}>
            <div className="text-center">
              {logo && (
                <img src={logo} alt="Logo" className="h-16 mx-auto mb-4" />
              )}
              <h1 
                className="text-2xl font-bold mb-2"
                style={{ color: primaryColor }}
              >
                Your Store Name
              </h1>
              <p className="text-gray-600 mb-4">Welcome to our amazing store</p>
              <button
                className="px-6 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: primaryColor }}
              >
                Shop Now
              </button>
              <button
                className="ml-3 px-6 py-2 rounded-lg border font-medium"
                style={{ 
                  borderColor: secondaryColor,
                  color: secondaryColor
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingEditor;